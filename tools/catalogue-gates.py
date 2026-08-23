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

  * days outside 2-20 (the catalogue is scoped to short courses)
  * price implausible per day / out of range on the USD equivalent (fx.py)
  * later sessions of a course already kept (one course per title, at its
    next upcoming start)
  * titles already present in assets/js/data.js (near-duplicate rule)
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
    src = open(DATA, encoding="utf-8").read()
    # pair() in merge-catalogue emits both single-line `title: { en: '...'`
    # and a wrapped form with `en:` on its own line.
    found = re.findall(r"title: \{\s*\n?\s*en: '([^']+)'", src)
    return {norm(t) for t in found}


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    path = sys.argv[1]
    batch = json.load(open(path, encoding="utf-8"))
    taken = existing_titles()

    # earliest start wins for each title within the batch
    best = {}
    for c in batch:
        k = norm(c["title"]["en"])
        if k not in best or c["start"] < best[k]["start"]:
            best[k] = c

    keep, drop = [], []
    for c in batch:
        k = norm(c["title"]["en"])
        why = []
        days = c.get("days")
        if not isinstance(days, int) or not 2 <= days <= 20:
            why.append("days outside catalogue range ({})".format(days))
        usd = fx.to_usd(c["price"], c.get("currency", "USD")) \
            if isinstance(c.get("price"), int) else None
        if usd is None:
            why.append("price/currency unusable")
        else:
            per_day = usd / max(days if isinstance(days, int) else 1, 1)
            if not 300 <= usd <= 60000:
                why.append("USD-equivalent price out of range ({:.0f})".format(usd))
            elif not 120 <= per_day <= 3500:
                why.append("{:.0f} USD/day implausible ({} {} over {} days)".format(
                    per_day, c["price"], c.get("currency", "USD"), days))
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
