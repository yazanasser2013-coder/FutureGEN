# AI Tools Scraper

This Python script automatically scrapes AI tools from [theresanaiforthat.com](https://theresanaiforthat.com/) and saves them to a JSON file. The scraper runs every 24 hours to capture new AI tools as they are added to the website.

## Features

- **Automatic Scraping**: Scrapes theresanaiforthat.com every 24 hours
- **Smart Scrolling**: Automatically scrolls to the end of the page to load all content
- **Incremental Updates**: Only adds new tools that weren't present in previous runs
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Automatic ChromeDriver Management**: Automatically downloads and manages ChromeDriver
- **Error Handling**: Robust error handling with fallback methods

## Requirements

- Python 3.7+
- Google Chrome browser installed
- Internet connection

## Installation

1. **Clone or download this repository**
2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Run the Continuous Scraper (24-hour loop)

```bash
python scraper.py
```

This will:
- Start scraping immediately
- Save all found AI tools to `tools.json`
- Wait 24 hours
- Automatically scrape again for new tools
- Continue this cycle indefinitely

### Run Once (for testing)

If you want to test the scraper without the 24-hour loop, you can modify the main section of `scraper.py` or create a simple test script.

## How It Works

1. **Page Loading**: Opens theresanaiforthat.com in a headless Chrome browser
2. **Content Loading**: Scrolls to the bottom of the page to ensure all content is loaded
3. **Tool Extraction**: Parses the HTML to find AI tool links and names
4. **Data Processing**: Cleans and formats the extracted data
5. **Storage**: Saves tools to `tools.json` in the following format:
   ```json
   {
       "Tool Name": "https://tool-url.com",
       "Another Tool": "https://another-tool.com"
   }
   ```
6. **Incremental Updates**: On subsequent runs, only adds new tools that weren't present before

## Output

The scraper creates a `tools.json` file containing all discovered AI tools with their names as keys and URLs as values.

## Configuration

### Chrome Options
The scraper runs Chrome in headless mode with optimized settings for web scraping:
- No GUI (headless)
- Disabled GPU acceleration
- Optimized memory usage
- Windows-specific optimizations

### Scrolling Behavior
- Maximum scroll attempts: 50
- Wait time between scrolls: 2 seconds
- Automatic detection of page end

## Troubleshooting

### ChromeDriver Issues
If you encounter ChromeDriver problems:
1. Make sure Google Chrome is installed
2. The script will automatically try multiple fallback methods
3. Check that your Chrome version is compatible

### Common Errors
- **"ChromeDriver not found"**: The script will automatically download it
- **"Page load timeout"**: Check your internet connection
- **"No tools found"**: The website structure may have changed

## File Structure

```
FutureGEN/
├── scraper.py          # Main scraper script
├── tools.json          # Output file with AI tools
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Dependencies

- `selenium`: Web browser automation
- `beautifulsoup4`: HTML parsing
- `webdriver-manager`: Automatic ChromeDriver management
- `requests`: HTTP requests (if needed)
- `lxml`: XML/HTML parser

## Notes

- The scraper runs continuously and will restart automatically if it encounters errors
- All errors are logged with timestamps
- The script is designed to be robust and handle various edge cases
- The 24-hour interval can be modified by changing the `time.sleep(24 * 60 * 60)` value

## Legal Notice

This scraper is for educational and research purposes. Please respect the website's terms of service and robots.txt file. Consider implementing appropriate delays and rate limiting if needed.

## Support

If you encounter issues:
1. Check that all dependencies are installed
2. Ensure Google Chrome is installed and up to date
3. Check your internet connection
4. Review the error messages in the console output
