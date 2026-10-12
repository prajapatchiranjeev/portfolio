
from pathlib import Path
from playwright.sync_api import sync_playwright
import time

# Portfolio root: D:\portfolio
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "projects"

PROJECTS = [
    ("the-folklore", "https://thefolklore.com/"),
    ("velasca", "https://www.velasca.com/"),
    ("notebook-therapy", "https://notebooktherapy.com/"),
    ("fabdivine", "https://www.fabdivine.com/"),
    ("fabritual", "https://fabritual.com/"),
    ("fabmystic", "https://fabmystic.com/"),
    ("exdells", "https://www.exdells.com/"),
    ("hostnet-india", "https://hostnetindia.com/"),
    ("hostinc", "https://hostinc.in/"),
    ("payrupya", "https://payrupya.in/"),
    ("github", "https://github.com/prajapatchiranjeev"),
    (
        "golo-app",
        "https://play.google.com/store/apps/details?id=com.godropp.load.golo"
    ),
]

DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 390, "height": 844}


def wait_for_page(page):
    """Wait for initial rendering without requiring every network request to finish."""
    try:
        page.evaluate("() => document.fonts.ready")
    except Exception:
        pass

    page.wait_for_timeout(1800)


def load_lazy_content(page):
    """Scroll to load lazy content, then return to the top."""
    try:
        page.evaluate("""
            async () => {
                const delay = ms =>
                    new Promise(resolve => setTimeout(resolve, ms));

                const maxHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                );

                const step = Math.max(300, window.innerHeight * 0.7);

                for (let y = 0; y < maxHeight; y += step) {
                    window.scrollTo(0, y);
                    await delay(100);
                }

                window.scrollTo(0, 0);
                await delay(500);
            }
        """)
    except Exception as error:
        print(f"  Lazy-load warning: {error}")

    page.wait_for_timeout(700)


def open_page(browser, url, viewport, mobile=False):
    context = browser.new_context(
        viewport=viewport,
        screen=viewport,
        device_scale_factor=1,
        is_mobile=mobile,
        has_touch=mobile,
    )

    page = context.new_page()

    try:
        response = page.goto(
            url,
            wait_until="domcontentloaded",
            timeout=60000
        )

        if response:
            print(f"  HTTP status: {response.status}")

        wait_for_page(page)

        return context, page

    except Exception:
        context.close()
        raise


def capture_project(browser, slug, url):
    folder = OUTPUT / slug
    folder.mkdir(parents=True, exist_ok=True)

    print(f"\n[{slug}] {url}")

    # -----------------------------------------
    # 1. DESKTOP VIEWPORT SCREENSHOT
    # -----------------------------------------
    context = None

    try:
        context, page = open_page(
            browser, url, DESKTOP, mobile=False
        )

        page.screenshot(
            path=str(folder / "desktop.jpg"),
            type="jpeg",
            quality=88,
            full_page=False,
            animations="disabled"
        )

        print("  OK desktop.jpg (1440 x 900)")

        # Load lower-page lazy content before full-page capture.
        load_lazy_content(page)

        page.screenshot(
            path=str(folder / "fullpage.jpg"),
            type="jpeg",
            quality=82,
            full_page=True,
            animations="disabled"
        )

        print("  OK fullpage.jpg (full page)")

    except Exception as error:
        print(f"  Desktop capture error: {error}")

    finally:
        if context:
            context.close()

    # -----------------------------------------
    # 2. MOBILE VIEWPORT SCREENSHOT
    # -----------------------------------------
    context = None

    try:
        context, page = open_page(
            browser, url, MOBILE, mobile=True
        )

        # IMPORTANT:
        # Do not scroll the mobile page before this capture.
        # Capture only the initial mobile viewport.
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)

        page.screenshot(
            path=str(folder / "mobile.jpg"),
            type="jpeg",
            quality=88,
            full_page=False,
            animations="disabled"
        )

        print("  OK mobile.jpg (390 x 844 viewport)")

    except Exception as error:
        print(f"  Mobile capture error: {error}")

    finally:
        if context:
            context.close()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)

    success = 0
    failed = 0

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        try:
            for slug, url in PROJECTS:
                try:
                    capture_project(browser, slug, url)
                    success += 1

                except Exception as error:
                    failed += 1
                    print(f"FAILED {slug}: {error}")

        finally:
            browser.close()

    print("\nScreenshot capture completed.")
    print(f"Projects processed: {success}")
    print(f"Projects failed: {failed}")
    print(f"Output directory: {OUTPUT}")


if __name__ == "__main__":
    main()
