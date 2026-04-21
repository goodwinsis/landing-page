from playwright.sync_api import sync_playwright
import os

LOCAL_FILE = "file://" + os.path.abspath("index.html")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1600, "height": 900})
    page.goto(LOCAL_FILE, wait_until="networkidle")
    page.wait_for_timeout(1500)

    # Scroll to pricing includes at bottom
    page.evaluate("document.querySelector('.pricing__includes').scrollIntoView({behavior: 'instant', block: 'center'})")
    page.wait_for_timeout(1500)
    page.screenshot(path="/tmp/landing_includes.png")

    browser.close()
