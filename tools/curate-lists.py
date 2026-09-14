#!/usr/bin/env python3
"""Refill the editorial lists and the front-page featured flags from facts.

    python3 tools/curate-lists.py            # report
    python3 tools/curate-lists.py --write

Each list in data.js keeps its title and blurb; its membership is rebuilt
from the catalogue by a stated rule, so the sets stay honest after any
re-source. Up to eight courses per list, earliest start first, at most two
per school so one large catalogue does not crowd a set out.

  l-ai          subject digital, or a title that names AI / artificial
                intelligence / generative / machine learning
  l-week        five teaching days or fewer, in person
  l-firsttime   titles for new, emerging or first-time managers and leaders
  l-online      format online
  l-finance     subject finance
  l-negotiation subject negotiation, or a title that names negotiation

Featured: one course per school for the eight schools with the most courses:
the in-person course with the highest published fee (USD-equivalent, via
tools/fx.py) among those starting in the first six months of the window —
each school's flagship short programme. These carry `featured: true` and the
front page draws its opening rows from them.
"""

import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fx

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "assets", "js", "data.js")

RULES = {
    "l-ai": lambda c: c["subject"] == "digital" or re.search(
        r"\b(ai|artificial intelligence|generative|machine learning|agentic)\b", c["title"]["en"], re.I),
    "l-week": lambda c: c["days"] <= 5 and c["format"] == "in-person",
    "l-firsttime": lambda c: re.search(
        r"\b(new|emerging|first[- ]time|new manager|frontline|fundamental)\b", c["title"]["en"], re.I),
    "l-online": lambda c: c["format"] == "online",
    "l-finance": lambda c: c["subject"] == "finance",
    "l-negotiation": lambda c: c["subject"] == "negotiation" or re.search(
        r"\bnegotiat", c["title"]["en"], re.I),
}


def load():
    js = ("global.window={};require(%s);"
          "console.log(JSON.stringify(window.MASAR_DATA))" % json.dumps(DATA))
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def pick(courses, rule, cap=8, per_school=2):
    got, per = [], {}
    for c in sorted(courses, key=lambda c: (c["start"], c["title"]["en"])):
        if not rule(c):
            continue
        if per.get(c["school"], 0) >= per_school:
            continue
        per[c["school"]] = per.get(c["school"], 0) + 1
        got.append(c["id"])
        if len(got) >= cap:
            break
    return got


def main():
    write = "--write" in sys.argv
    D = load()
    courses = D["courses"]
    src = open(DATA, encoding="utf-8").read()

    for lid, rule in RULES.items():
        ids = pick(courses, rule)
        print("{:14s} {} courses".format(lid, len(ids)))
        pat = r"(id: '%s',.*?courses: )\[[^\]]*\]" % re.escape(lid)
        rep = r"\1[" + ", ".join("'%s'" % i for i in ids) + "]"
        src, n = re.subn(pat, rep, src, count=1, flags=re.S)
        if n != 1:
            sys.exit("list {} not found in data.js".format(lid))

    by_school = {}
    for c in courses:
        by_school.setdefault(c["school"], []).append(c)
    top = sorted(by_school, key=lambda s: -len(by_school[s]))[:8]
    featured = []
    for s in top:
        pool = [c for c in by_school[s] if c["format"] == "in-person" and c["start"] <= "2027-02-28"]
        pool = pool or [c for c in by_school[s] if c["format"] == "in-person"] or by_school[s]
        best = max(pool, key=lambda c: (fx.to_usd(c["price"], c.get("currency", "USD")), c["start"]))
        featured.append(best["id"])
    print("featured: {}".format(", ".join(featured)))

    src = src.replace(" featured: true,", "")
    for cid in featured:
        src, n = re.subn(r"(id: '%s',[^\n]*\n[^\n]*?)( popularity:)" % re.escape(cid),
                         r"\1 featured: true,\2", src, count=1)
        if n != 1:
            sys.exit("could not flag {} as featured".format(cid))

    if not write:
        print("(dry run — pass --write to apply)")
        return
    open(DATA, "w", encoding="utf-8").write(src)
    print("wrote assets/js/data.js")


if __name__ == "__main__":
    main()
