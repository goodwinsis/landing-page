from playwright.sync_api import sync_playwright
import os

LOCAL_FILE = "file://" + os.path.abspath("index.html")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1600, "height": 900})
    page.goto(LOCAL_FILE, wait_until="networkidle")
    page.wait_for_timeout(1500)

    # Scroll to portfolio
    page.evaluate("document.getElementById('portfolio').scrollIntoView({behavior: 'instant', block: 'start'})")
    page.wait_for_timeout(1500)
    page.screenshot(path="/tmp/landing_portfolio.png")

    # Hover over a card
    page.hover('.portfolio__item[data-project="0"]')
    page.wait_for_timeout(500)
    page.screenshot(path="/tmp/landing_portfolio_hover.png")

    # Click to open modal
    page.click('.portfolio__item[data-project="0"]')
    page.wait_for_timeout(3500)  # Wait for all images to load
    page.screenshot(path="/tmp/landing_modal.png")

    # Click next image
    page.click('.modal__nav--next')
    page.wait_for_timeout(500)
    page.screenshot(path="/tmp/landing_modal_next.png")

    # Close modal
    page.click('.modal__close')
    page.wait_for_timeout(500)

    # Mobile modal
    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto(LOCAL_FILE, wait_until="networkidle")
    mobile.wait_for_timeout(1500)
    mobile.evaluate("document.getElementById('portfolio').scrollIntoView({behavior: 'instant'})")
    mobile.wait_for_timeout(800)
    mobile.click('.portfolio__item[data-project="0"]')
    mobile.wait_for_timeout(3500)
    mobile.screenshot(path="/tmp/landing_modal_mobile.png", full_page=False)

    browser.close()
    print("Screenshots saved.")
