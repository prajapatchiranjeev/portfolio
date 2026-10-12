"""
Capture desktop and mobile screenshots for every project listed in js/projects-data.js.

Run from your portfolio root folder:
    python tools/capture-screenshots.py

Expected project data format:
    project({
        slug: "the-folklore",
        name: "The Folklore",
        url: "https://thefolklore.com/",
        ...
    });

Screenshots are saved to:
    assets/projects/<slug>/desktop.jpg
    assets/projects/<slug>/mobile.jpg
"""

from pathlib import Path
import re
import sys
import time

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "js" / "projects-data.js"
OUTPUT_DIR = ROOT / "assets" / "projects"

DESKTOP_VIEWPORT = {"width": 1440, "height": 1000}
MOBILE_VIEWPORT = {"width": 390, "height": 844}
NAVIGATION_TIMEOUT_MS = 60000


def read_projects():
    if not DATA_FILE.exists():
        raise FileNotFoundError(
            f"Could not find {DATA_FILE}. Run this script from your portfolio's tools folder "
            "or make sure js/projects-data.js exists."
        )

    source = DATA_FILE.read_text(encoding="utf-8")
    # Each project is declared as project({ ... }); in the supplied project data.
    blocks = re.findall(r"project\s*\(\s*\{(.*?)\}\s*\)", source, flags=re.S)
    projects = []

    for block in blocks:
        slug_match = re.search(r"""slug\s*:\s*["']([^"']+)["']""", block)
        url_match = re.search(r"""url\s*:\s*["'](https?://[^"']+)["']""", block)
        name_match = re.search(r"""name\s*:\s*["']([^"']+)["']""", block)

        if not slug_match or not url_match:
            continue

        projects.append({
            "slug": slug_match.group(1).strip(),
            "url": url_match.group(1).strip(),
            "name": name_match.group(1).strip() if name_match else slug_match.group(1).strip(),
        })

    # Avoid duplicate slugs if the data file contains repeated entries.
    unique = {}
    for project in projects:
        unique[project["slug"]] = project
    return list(unique.values())


def capture(page, project, viewport, output_path, label):
    page.set_viewport_size(viewport)
    try:
        response = page.goto(
            project["url"],
            wait_until="domcontentloaded",
            timeout=NAVIGATION_TIMEOUT_MS,
        )
        try:
            page.wait_for_load_state("networkidle", timeout=15000)
        except PlaywrightTimeoutError:
            # Many commercial sites keep analytics/connections open; continue anyway.
            pass
        page.wait_for_timeout(1800)

        output_path.parent.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(output_path), full_page=True, type="jpeg", quality=85)

        status = f"HTTP {response.status}" if response else "No response status"
        print(f"  OK {label}: {output_path.relative_to(ROOT)} ({status})")
        return True
    except Exception as exc:
        print(f"  FAILED {label} for {project['url']}: {exc}")
        return False


def main():
    try:
        projects = read_projects()
    except Exception as exc:
        print(f"ERROR: {exc}")
        sys.exit(1)

    if not projects:
        print(f"No projects found in {DATA_FILE}. Check that entries use project({{ slug: ..., url: ... }}).")
        sys.exit(1)

    print(f"Found {len(projects)} projects in {DATA_FILE.relative_to(ROOT)}")
    print(f"Screenshots will be saved under: {OUTPUT_DIR.relative_to(ROOT)}")
    print("The script will create/replace desktop.jpg and mobile.jpg for each project.\n")

    successes = 0
    failures = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        desktop_page = browser.new_page(viewport=DESKTOP_VIEWPORT, device_scale_factor=1)
        mobile_page = browser.new_page(
            viewport=MOBILE_VIEWPORT,
            device_scale_factor=1,
            is_mobile=True,
            has_touch=True,
        )

        for index, project in enumerate(projects, start=1):
            print(f"[{index}/{len(projects)}] {project['name']} — {project['url']}")
            folder = OUTPUT_DIR / project["slug"]

            if capture(desktop_page, project, DESKTOP_VIEWPORT, folder / "desktop.jpg", "desktop"):
                successes += 1
            else:
                failures += 1

            if capture(mobile_page, project, MOBILE_VIEWPORT, folder / "mobile.jpg", "mobile"):
                successes += 1
            else:
                failures += 1

        browser.close()

    print("\nFinished.")
    print(f"Successful screenshots: {successes}")
    print(f"Failed screenshots: {failures}")
    print(f"Output folder: {OUTPUT_DIR}")
    if failures:
        print("If a site failed, check its URL/network access and rerun the script.")


if __name__ == "__main__":
    main()
