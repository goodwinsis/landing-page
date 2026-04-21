from playwright.sync_api import sync_playwright
import os

LOCAL_FILE = "file://" + os.path.abspath("index.html")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1600, "height": 900})
    page.goto(LOCAL_FILE, wait_until="networkidle")
    page.wait_for_timeout(1500)

    # Hero
    page.screenshot(path="/tmp/landing_hero.png")

    # Scroll to each section
    sections = ["portfolio", "services", "about", "reviews", "contact"]
    for s in sections:
        page.evaluate(f"document.getElementById('{s}').scrollIntoView({{behavior: 'instant', block: 'start'}})")
        page.wait_for_timeout(1500)  # Wait for reveal animations
        page.screenshot(path=f"/tmp/landing_{s}.png")

    # Mobile
    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto(LOCAL_FILE, wait_until="networkidle")
    mobile.wait_for_timeout(1500)
    mobile.screenshot(path="/tmp/landing_mobile_hero.png")
    mobile.evaluate("document.getElementById('services').scrollIntoView({behavior: 'instant'})")
    mobile.wait_for_timeout(1500)
    mobile.screenshot(path="/tmp/landing_mobile_services.png")

    browser.close()
    print("Screenshots saved.")
