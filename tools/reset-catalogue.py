#!/usr/bin/env python3
"""Empty the catalogue before a full re-source.

    python3 tools/reset-catalogue.py            # report what would go
    python3 tools/reset-catalogue.py --write

Removes every record from the `schools` and `courses` arrays in
assets/js/data.js and clears the `courses` membership of every list, leaving
the taxonomies (subjects, formats, languages, regions), the list titles and
blurbs, and the FX block untouched. merge-catalogue.py then refills the
arrays from a batch, and curate-lists.py refills the lists from the new
catalogue.

Written for the 2026-09 re-source, when every course sourced from an
aggregator had to be replaced by the same facts read from the schools' own
pages; the old records stay in git history.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "assets", "js", "data.js")


def array_span(src, name):
    m = re.search(r"const {} = \[".format(name), src)
    if not m:
        sys.exit("Could not find `const {} = [` in data.js".format(name))
    start = m.end() - 1
    depth = 0
    for i in range(start, len(src)):
        if src[i] == "[":
            depth += 1
        elif src[i] == "]":
            depth -= 1
            if depth == 0:
                return start + 1, i
    sys.exit("Unbalanced brackets in the {} array".format(name))


def main():
    write = "--write" in sys.argv
    src = open(DATA, encoding="utf-8").read()
    for name in ("courses", "schools"):
        lo, hi = array_span(src, name)
        n = len(re.findall(r"\bid: '", src[lo:hi]))
        print("{}: {} records".format(name, n))
        src = src[:lo] + "\n  " + src[hi:]
    src, n = re.subn(r"(\n\s*courses: )\[[^\]]*\]", r"\1[]", src)
    print("lists cleared: {}".format(n))
    if not write:
        print("(dry run — pass --write to apply)")
        return
    open(DATA, "w", encoding="utf-8").write(src)
    print("wrote assets/js/data.js")


if __name__ == "__main__":
    main()
