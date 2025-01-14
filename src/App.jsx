import { useState, useEffect } from 'react'
import './App.css'

function App() {

	const [scraped_data, setScrapedData] = useState({});

	const sendScrapeRequestToBackground = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			//TODO Additional checks 
			const activeTab = tabs[0];
			chrome.runtime.sendMessage({ action: "SCRAPE_REQUEST", tabId: activeTab.id }, (response) => {
				if (response.status === "Success") {
					console.log("Success! Data Received:", response.data);
					setScrapedData(response.data)
				} else {
					console.log("Failure!");
				}
			});
		});
	}

	return (
		<div>
			<h1>CourseGURU</h1>
			<button onClick={sendScrapeRequestToBackground}>Scrape</button>
			<p>Scraped Data: {JSON.stringify(scraped_data)}</p>
		</div>
	)
}

export default App
