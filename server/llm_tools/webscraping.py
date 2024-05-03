from typing import Dict, Any
from langchain.tools.base import BaseTool
from bs4 import BeautifulSoup
import requests

class WebScrapingTool(BaseTool):
    name = "WebScraper"
    description = (
        "A tool that scrapes a webpage and returns the text content. "
        "The input should be a URL to scrape."
    )

    def _run(self, url: str) -> str:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raises a HTTPError if the response was an HTTP error (4xx or 5xx)
            soup = BeautifulSoup(response.text, 'html.parser')
            return soup.get_text()
        except requests.exceptions.RequestException as e:
            return f"Error: {e}"
        except Exception as e:
            return f"An unexpected error occurred: {e}"

    async def _arun(self, url: str):
        # Asynchronous version of _run method (if applicable)
        pass

    def run(self, url: str) -> Dict[str, Any]:
        text = self._run(url)
        return {"text": text}