#!/usr/bin/env python3
"""Fetch a short list of pages politely from a GitHub Actions runner.

The authoring sandbox and the crawler's proxies cannot reach some hosts
(notably www.mbsc.edu.sa), so the runner fetches them. For every host the
script first reads robots.txt, saves it, and only fetches a URL that
robots.txt allows for `User-agent: *`; it honours Crawl-delay and otherwise
waits three seconds between requests. Bodies are saved verbatim under
import/fetched/<set>/ with an index.json (url, status, content type, time).

Usage: fetch-pages.py <set> < urls.txt   (one URL per line, blanks ignored)

A request file may also carry directives, one per line:
  @prefix https://host/path/   follow links on fetched HTML pages whose URL
                               starts with this prefix (several allowed)
  @max 150                     page budget for followed links (default 120)
  @depth 2                     how many link hops to follow (default 1)
Followed links never carry a query string or fragment and never point at a
PDF. Every HTML page is also saved as .txt (visible text, scripts and styles
dropped) so a reader need not parse markup.
"""
import hashlib, html, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request, urllib.robotparser
from html.parser import HTMLParser

UA = "MasarIndexFetcher/1.0 (static index build; contact via repository)"
EXT = {"text/html": "html", "application/pdf": "pdf", "text/plain": "txt",
       "application/json": "json", "text/xml": "xml", "application/xml": "xml"}


def get(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


class Text(HTMLParser):
    """Visible text with one line per block element; also collects hrefs."""
    SKIP = {"script", "style", "noscript", "svg", "template"}
    BLOCK = {"p", "div", "li", "h1", "h2", "h3", "h4", "h5", "h6", "tr", "td", "th",
             "br", "section", "article", "header", "footer", "dt", "dd", "ul", "ol", "table"}
    def __init__(self):
        super().__init__(); self.parts, self.links, self._skip = [], [], 0
    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP: self._skip += 1
        if tag in self.BLOCK: self.parts.append("\n")
        if tag == "a":
            for k, v in attrs:
                if k == "href" and v: self.links.append(v)
    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip: self._skip -= 1
        if tag in self.BLOCK: self.parts.append("\n")
    def handle_data(self, data):
        if not self._skip: self.parts.append(data)
    def text(self):
        t = html.unescape("".join(self.parts))
        return re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", t)).strip()


def main():
    out = os.path.join("import", "fetched", sys.argv[1])
    os.makedirs(out, exist_ok=True)
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    prefixes = [l.split(None, 1)[1] for l in lines if l.startswith("@prefix ")]
    budget = int(next((l.split()[1] for l in lines if l.startswith("@max ")), 120))
    depth = int(next((l.split()[1] for l in lines if l.startswith("@depth ")), 1))
    urls = [(l, 0) for l in lines if not l.startswith("@")]
    seen = {u for u, _ in urls}
    robots, index = {}, []
    while urls:
        url, hop = urls.pop(0)
        host = urllib.parse.urlsplit(url).netloc
        if host not in robots:
            rp = urllib.robotparser.RobotFileParser()
            rurl = "https://{}/robots.txt".format(host)
            try:
                st, ct, body = get(rurl)
                text = body.decode("utf-8", "replace")
                rp.parse(text.splitlines())
                open(os.path.join(out, host + ".robots.txt"), "w", encoding="utf-8").write(text)
                index.append({"url": rurl, "status": st, "type": ct, "file": host + ".robots.txt"})
            except Exception as e:  # no robots file: everything allowed
                rp.parse([])
                index.append({"url": rurl, "status": None, "error": str(e)})
            delay = rp.crawl_delay("*") or 0
            robots[host] = (rp, max(3, delay))
            time.sleep(3)
        rp, delay = robots[host]
        if not rp.can_fetch("*", url):
            index.append({"url": url, "status": None, "error": "disallowed by robots.txt"})
            continue
        try:
            st, ct, body = get(url)
            ext = EXT.get(ct.split(";")[0].strip(), "bin")
            slug = re.sub(r"[^a-z0-9]+", "-", urllib.parse.urlsplit(url).path.lower()).strip("-") or "index"
            name = "{}.{}.{}".format(slug[:60], hashlib.sha1(url.encode()).hexdigest()[:8], ext)
            open(os.path.join(out, name), "wb").write(body)
            entry = {"url": url, "status": st, "type": ct, "bytes": len(body), "file": name,
                     "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
            if ext == "html":
                tp = Text(); tp.feed(body.decode("utf-8", "replace"))
                open(os.path.join(out, name[:-5] + ".txt"), "w", encoding="utf-8").write(tp.text())
                entry["text"] = name[:-5] + ".txt"
                if prefixes and hop < depth:
                    for href in tp.links:
                        link = urllib.parse.urljoin(url, href).split("#")[0]
                        if "?" in link or link.lower().endswith(".pdf") or link in seen: continue
                        if any(link.startswith(p) for p in prefixes) and len(seen) < budget + len(lines):
                            seen.add(link); urls.append((link, hop + 1))
            index.append(entry)
        except urllib.error.HTTPError as e:
            index.append({"url": url, "status": e.code, "error": str(e)})
        except Exception as e:
            index.append({"url": url, "status": None, "error": str(e)})
        time.sleep(delay)
    json.dump(index, open(os.path.join(out, "index.json"), "w", encoding="utf-8"), indent=1)
    print(json.dumps(index, indent=1))


if __name__ == "__main__":
    main()
