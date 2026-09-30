#!/usr/bin/env python3
"""Pre-merge catalogue gates for a scraped batch.

    python3 tools/catalogue-gates.py import/batch-scraped.json

merge-catalogue.py aborts wholesale on any violation, which is right for a
hand-curated batch but wrong for a scrape: a scrape legitimately contains
courses the catalogue does not model (multi-week programmes, repeat sessions
of one course, a title already in the catalogue). This filter applies the
same factual gates merge-catalogue enforces and moves the violations to the
batch's .rejected.csv with reasons, so the merge runs clean and every
exclusion stays on record:

  * a printed day count outside 1-400 (a null count is allowed: the record
    carries the school's own duration line instead)
  * a printed fee implausible per day / out of range on the USD equivalent
    (fx.py); a null fee is allowed and prints "not published"
  * later sessions of a course already kept (one course per title, at its
    next upcoming start; a dated session beats an undated one)
  * titles already present in assets/js/data.js for the same school (two
    schools may each run a "Corporate Finance"; one school may not list it twice)
"""

import csv
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fx

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "assets", "js", "data.js")


def norm(t):
    # keep identical to merge-catalogue.py's norm()
    return re.sub(r"[^a-z0-9 ]", "", t.lower()).strip()


def existing_titles():
    """(school id, normalised title) pairs already in data.js."""
    src = open(DATA, encoding="utf-8").read()
    out = set()
    for m in re.finditer(r"school: '([^']+)'.*?title: \{\s*\n?\s*en: '([^']+)'", src, re.S):
        out.add((m.group(1), norm(m.group(2))))
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    path = sys.argv[1]
    batch = json.load(open(path, encoding="utf-8"))
    taken = existing_titles()

    # earliest start wins for each title within the batch
    best = {}
    for c in batch:
        k = (c["school"], norm(c["title"]["en"]))
        cur = best.get(k)
        if cur is None or (c["start"] and (not cur["start"] or c["start"] < cur["start"])):
            best[k] = c

    keep, drop = [], []
    for c in batch:
        k = (c["school"], norm(c["title"]["en"]))
        why = []
        days = c.get("days")
        if days is not None and (not isinstance(days, int) or not 1 <= days <= 400):
            why.append("days outside catalogue range ({})".format(days))
        price = c.get("price")
        usd = fx.to_usd(price, c.get("currency", "USD")) if isinstance(price, int) else None
        if price is not None and usd is None:
            why.append("price/currency unusable")
        elif usd is not None:
            if not 100 <= usd <= 120000:
                why.append("USD-equivalent price out of range ({:.0f})".format(usd))
            elif isinstance(days, int):
                # IMD's two-day board programmes list at 6,600–8,600 CHF; a
                # 20-day online programme at 920 USD is 46 a day. Both are real.
                per_day = usd / max(days, 1)
                if not 30 <= per_day <= 6000:
                    why.append("{:.0f} USD/day implausible ({} {} over {} days)".format(
                        per_day, price, c.get("currency", "USD"), days))
        if best[k] is not c:
            why.append("later session ({}) of a kept course".format(c["start"]))
        elif k in taken:
            why.append("title already in the catalogue")
        if why:
            drop.append((c, "; ".join(why)))
        else:
            keep.append(c)
            taken.add(k)

    json.dump(keep, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    rej = path + ".rejected.csv"
    with open(rej, "a", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        for c, why in drop:
            w.writerow([c["id"], c["title"]["en"], why])
    print("{} kept in {}; {} filed to {}".format(len(keep), path, len(drop), rej))


if __name__ == "__main__":
    main()
