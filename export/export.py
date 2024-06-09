import base64
import os
import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, WebDriverException

# Check if command-line argument is provided
if len(sys.argv) < 2:
    print("Please provide a command-line argument.")
    sys.exit(1)

# Get the command-line argument
n = int(sys.argv[1])


# Set up Selenium with a headless browser
webdriver_service = Service(ChromeDriverManager().install())
chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)


for i in range(1, n + 1):
    # Construct the URL
    url = f"http://localhost:5500/src/?f={i}"

    try:
        # Navigate to the URL
        driver.get(url)
        time.sleep(5)
    except Exception as e:
        print(f"Failed to navigate to {url}. Error: {e}")
        continue

    try:
        # Get the canvas element
        canvas = driver.find_element(By.TAG_NAME, "canvas")
    except NoSuchElementException:
        print(f"No canvas element found on {url}")
        continue

    canvas_base64 = driver.execute_script(
        "return arguments[0].toDataURL('image/png').substring(21);", canvas
    )
    canvas_png = base64.b64decode(canvas_base64)

    # Save the PNG
    png_path = os.path.join("toPrint/", f"{i}.png")
    with open(png_path, "wb") as f:
        f.write(canvas_png)


# Close the browser
driver.quit()
