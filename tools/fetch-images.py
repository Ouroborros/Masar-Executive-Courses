#!/usr/bin/env python3
"""Fetch openly licensed photographs from Wikimedia Commons for the site.

Two modes, both meant to run on a GitHub Actions runner (the authoring
sandbox has no route to Commons):

  candidates  For every key in TERMS, search Commons, keep files whose
              licence is CC BY / CC BY-SA / CC0 / public domain, wide enough
              and landscape, and save up to N small previews plus a JSON
              record of author, licence and source page under
              import/img-candidates/.
  final       Read import/img-picks.json ({key: candidate_index}), download
              the chosen originals, write 1800px and 900px JPEGs to
              assets/img/ and a credits file assets/img/credits.json.

Every photograph the site shows must be traceable to this credits file.
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "MasarSiteImageFetcher/1.0 (static site build; contact via repository)"
OK_LICENCES = re.compile(r"^(CC BY(-SA)? [1-4]\.0|CC0|Public domain|PDM)", re.I)

# key -> search terms tried in order until candidates are found
TERMS = {
  # schools
  "school-mit":      ["MIT Sloan School of Management building", "MIT Sloan E62 building"],
  "school-imd":      ["IMD Lausanne campus", "IMD business school Lausanne building"],
  "school-kellogg":  ["Kellogg Global Hub Northwestern", "Kellogg School of Management building"],
  "school-hks":      ["Harvard Kennedy School building", "Harvard Kennedy School courtyard"],
  "school-stanford": ["Knight Management Center Stanford", "Stanford Graduate School of Business building"],
  "school-haas":     ["Haas School of Business Berkeley building", "Chou Hall Berkeley Haas"],
  "school-stern":    ["Kaufman Management Center NYU Stern", "NYU Stern School of Business building"],
  "school-ross":     ["Ross School of Business building Ann Arbor", "Stephen M. Ross School of Business"],
  "school-nus":      ["NUS Business School Mochtar Riady Building", "National University of Singapore Kent Ridge campus", "University Town NUS Singapore", "National University of Singapore campus"],
  "school-agsm":     ["AGSM building UNSW Kensington", "UNSW Business School building"],
  "school-cbs":      ["Copenhagen Business School Solbjerg Plads", "Copenhagen Business School Kilen building"],
  "school-smith":    ["Goodes Hall Queen's University", "Queen's University Kingston Grant Hall"],
  "school-sauder":   ["Henry Angus Building UBC Sauder", "UBC Sauder School of Business building"],
  "school-stgallen": ["University of St. Gallen main building", "Universität St. Gallen Hauptgebäude"],
  "school-ccl":      ["Center for Creative Leadership Greensboro", "Greensboro North Carolina downtown skyline", "Greensboro Historical Museum", "Greensboro North Carolina Elm Street"],
  # places
  "city-riyadh":     ["Riyadh skyline King Abdullah Financial District", "Riyadh skyline night"],
  "city-jeddah":     ["Jeddah corniche skyline", "Al-Balad Jeddah rawashin"],
  "city-cambridge":  ["Charles River Cambridge Massachusetts skyline", "MIT Great Dome Charles River"],
  "city-lausanne":   ["Lausanne Lake Geneva view", "Lausanne Ouchy Lake Geneva"],
  "city-singapore":  ["Singapore Marina Bay skyline", "Singapore skyline dusk"],
  "city-copenhagen": ["Copenhagen Nyhavn", "Copenhagen harbour skyline"],
  "city-sydney":     ["Sydney Harbour Opera House", "Sydney skyline Circular Quay"],
  "city-vancouver":  ["Vancouver skyline mountains", "Vancouver Coal Harbour skyline"],
  "city-newyork":    ["Manhattan skyline Washington Square Park", "Washington Square Arch New York"],
  "city-kingston":   ["Kingston Ontario waterfront", "Kingston Ontario City Hall"],
  "city-annarbor":   ["Ann Arbor Michigan downtown", "University of Michigan Law Quad"],
  "city-evanston":   ["Evanston Illinois lakefront", "Northwestern University campus Lake Michigan"],
  "city-berkeley":   ["Sather Tower Berkeley campus", "UC Berkeley campus Campanile"],
  "city-stanford":   ["Stanford University Main Quad", "Hoover Tower Stanford"],
  "city-stgallen":   ["St. Gallen Abbey", "Stiftsbezirk St. Gallen"],
  "city-greensboro": ["Greensboro North Carolina downtown", "Greensboro skyline"],
  # textures for section grounds
  "texture-najd":    ["Najd mud brick architecture Diriyah", "At-Turaif Diriyah mud brick wall"],
  "texture-sadu":    ["Al Sadu weaving", "Sadu weaving Bedouin textile"],
}

PAUSE = 1.5   # seconds between API calls: Commons answers 429 to a burst

def api(params):
  params = dict(params, format="json")
  url = API + "?" + urllib.parse.urlencode(params)
  req = urllib.request.Request(url, headers={"User-Agent": UA})
  for attempt in range(7):
    try:
      with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read().decode("utf-8"))
      time.sleep(PAUSE)
      return data
    except urllib.error.HTTPError as e:
      if e.code == 429 and attempt < 6:
        wait = int(e.headers.get("Retry-After") or 0) or 15 * (attempt + 1)
        print(f"  429 from Commons, waiting {wait}s", flush=True)
        time.sleep(wait); continue
      if attempt == 6: raise
      time.sleep(3 * (attempt + 1))
    except Exception:  # noqa: BLE001
      if attempt == 6: raise
      time.sleep(3 * (attempt + 1))

def fetch(url):
  req = urllib.request.Request(url, headers={"User-Agent": UA})
  for attempt in range(7):
    try:
      with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
      time.sleep(PAUSE)
      return data
    except urllib.error.HTTPError as e:
      if e.code == 429 and attempt < 6:
        wait = int(e.headers.get("Retry-After") or 0) or 20 * (attempt + 1)
        print(f"  429 fetching {url[-40:]}, waiting {wait}s", flush=True)
        time.sleep(wait); continue
      if attempt == 6: raise
      time.sleep(3 * (attempt + 1))
    except Exception:  # noqa: BLE001
      if attempt == 6: raise
      time.sleep(3 * (attempt + 1))

def rendition(title, width):
  """A server-side rendition at one of the standard widths (Commons refuses
  bulk downloads of originals and asks for these instead)."""
  q = api({"action": "query", "prop": "imageinfo", "titles": title, "iiprop": "url", "iiurlwidth": width})
  for pg in q.get("query", {}).get("pages", {}).values():
    ii = (pg.get("imageinfo") or [None])[0]
    if ii and ii.get("thumburl"): return ii["thumburl"]
  raise RuntimeError("no rendition for " + title)

def search(term, limit=10):
  q = api({"action": "query", "list": "search", "srsearch": term + " filetype:bitmap",
           "srnamespace": 6, "srlimit": limit})
  return [h["title"] for h in q.get("query", {}).get("search", [])]

def info(titles, thumb=640):
  out = []
  for i in range(0, len(titles), 20):
    chunk = titles[i:i+20]
    q = api({"action": "query", "prop": "imageinfo", "titles": "|".join(chunk),
             "iiprop": "url|size|mime|extmetadata", "iiurlwidth": thumb})
    for p in q.get("query", {}).get("pages", {}).values():
      ii = (p.get("imageinfo") or [None])[0]
      if not ii: continue
      md = ii.get("extmetadata", {})
      g = lambda k: re.sub(r"<[^>]+>", "", md.get(k, {}).get("value", "") or "").strip()
      out.append({
        "title": p["title"], "url": ii["url"], "thumb": ii.get("thumburl"),
        "width": ii.get("width", 0), "height": ii.get("height", 0), "mime": ii.get("mime", ""),
        "licence": g("LicenseShortName"), "licence_url": g("LicenseUrl"),
        "author": g("Artist"), "credit": g("Credit"),
        "page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(p["title"].replace(" ", "_")),
      })
  return out

def usable(c):
  if c["mime"] not in ("image/jpeg", "image/png"): return False
  if not OK_LICENCES.match(c["licence"] or ""): return False
  w, h = c["width"], c["height"]
  if w < 1400 or h < 700: return False
  r = w / float(h)
  return 1.15 <= r <= 2.4

def candidates(root, per=6):
  """KEYS=a,b in the environment restricts the pass to those keys and merges
  the result into an existing candidates.json instead of replacing it."""
  os.makedirs(root, exist_ok=True)
  only = [k for k in os.environ.get("KEYS", "").split(",") if k]
  path = os.path.join(root, "candidates.json")
  report = json.load(open(path)) if only and os.path.exists(path) else {}
  for key, terms in TERMS.items():
    if only and key not in only: continue
    picked = []
    try:
      for term in terms:
        titles = search(term)
        if not titles: continue
        picked = [c for c in info(titles) if usable(c)][:per]
        if picked: break
    except Exception as e:  # noqa: BLE001 — one key must not sink the run
      print(f"{key}: failed ({e})", flush=True)
    d = os.path.join(root, key); os.makedirs(d, exist_ok=True)
    for n, c in enumerate(picked):
      try:
        open(os.path.join(d, f"{n}.jpg"), "wb").write(fetch(c["thumb"]))
      except Exception as e:  # noqa: BLE001
        c["thumb_error"] = str(e)
      time.sleep(0.8)
    report[key] = picked
    print(f"{key}: {len(picked)} candidates", flush=True)
  json.dump(report, open(path, "w"), indent=1, ensure_ascii=False)

def final(cands_path, picks_path, out):
  from PIL import Image, ImageOps
  cands = json.load(open(cands_path)); picks = json.load(open(picks_path))
  os.makedirs(out, exist_ok=True)
  credits = {}
  for key, pick in picks.items():
    # a pick is an index into the key's own candidates, or "otherkey:index"
    # when a better photograph sits under another search key
    src_key, idx = (str(pick).split(":") + [None])[:2] if ":" in str(pick) else (key, pick)
    c = cands[src_key][int(idx)]
    raw = fetch(rendition(c["title"], 2048))
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert("RGB")
    for w, suffix in ((1800, ""), (900, "-s")):
      r = w / float(im.width)
      im2 = im if r >= 1 else im.resize((w, max(1, round(im.height * r))), Image.LANCZOS)
      im2.save(os.path.join(out, f"{key}{suffix}.jpg"), "JPEG", quality=80, optimize=True, progressive=True)
    credits[key] = {k: c[k] for k in ("title", "author", "licence", "licence_url", "page")}
    print(f"{key}: {c['title']}", flush=True)
    time.sleep(0.4)
  # a photograph no longer picked does not linger on the site
  for name in os.listdir(out):
    stem = name[:-4].removesuffix("-s")
    if name.endswith(".jpg") and stem not in picks:
      os.remove(os.path.join(out, name)); print(f"removed {name}", flush=True)
  json.dump(credits, open(os.path.join(out, "credits.json"), "w"), indent=1, ensure_ascii=False)

if __name__ == "__main__":
  mode = sys.argv[1] if len(sys.argv) > 1 else "candidates"
  if mode == "candidates":
    candidates("import/img-candidates")
  elif mode == "final":
    final("import/img-candidates/candidates.json", "import/img-picks.json", "assets/img")
  else:
    sys.exit("mode must be candidates or final")
