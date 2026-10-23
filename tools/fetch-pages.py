#!/usr/bin/env python3
"""Fetch a short list of pages politely from a GitHub Actions runner.

The authoring sandbox and the crawler's proxies cannot reach some hosts
(notably www.mbsc.edu.sa), so the runner fetches them. For every host the
script first reads robots.txt, saves it, and only fetches a URL that
robots.txt allows for `User-agent: *`; it honours Crawl-delay and otherwise
waits three seconds between requests. Bodies are saved verbatim under
import/fetched/<set>/ with an index.json (url, status, content type, time).

Usage: fetch-pages.py <set> < urls.txt   (one URL per line, blanks ignored)
"""
import hashlib, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request, urllib.robotparser

UA = "MasarIndexFetcher/1.0 (static index build; contact via repository)"
EXT = {"text/html": "html", "application/pdf": "pdf", "text/plain": "txt",
       "application/json": "json", "text/xml": "xml", "application/xml": "xml"}


def get(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


def main():
    out = os.path.join("import", "fetched", sys.argv[1])
    os.makedirs(out, exist_ok=True)
    urls = [u.strip() for u in sys.stdin.read().split() if u.strip()]
    robots, index = {}, []
    for url in urls:
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
            index.append({"url": url, "status": st, "type": ct, "bytes": len(body), "file": name,
                          "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
        except urllib.error.HTTPError as e:
            index.append({"url": url, "status": e.code, "error": str(e)})
        except Exception as e:
            index.append({"url": url, "status": None, "error": str(e)})
        time.sleep(delay)
    json.dump(index, open(os.path.join(out, "index.json"), "w", encoding="utf-8"), indent=1)
    print(json.dumps(index, indent=1))


if __name__ == "__main__":
    main()
