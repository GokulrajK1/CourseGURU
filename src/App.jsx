import { useState, useEffect } from 'react'
import './App.css'

function App() {

	const [scraped_data, setScrapedData] = useState({});
	const [processed_data, setProcessedData] = useState({});

	const sendDataToBackend = async (dataToSend) => {
		console.log("Sending");
		console.log(dataToSend);
		try {
		  const response = await fetch("http://127.0.0.1:5000/process-data", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(dataToSend),
		  });
	
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  
		  const data = await response.json();
		  setProcessedData(data);
		} catch (error) {
		  console.error("Error sending data to the backend:", error);
		}
	  };

	const sendScrapeRequestToBackground = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			//TODO Additional checks 
			const activeTab = tabs[0];
			chrome.runtime.sendMessage({ action: "SCRAPE_REQUEST", tabId: activeTab.id }, (response) => {
				if (response.status === "Success") {
					console.log("Success! Data Received:", response.data);
					setScrapedData(response.data);
					sendDataToBackend(response.data);
				} else {
					console.log("Failure!");
				}
			});
		});
	}

	return (
		<div>
			<h1>CourseGURU</h1>
			<h2>Optimize Classes</h2>
			<button onClick={sendScrapeRequestToBackground}>Scrape</button>
			<p>Processed Data: {JSON.stringify(processed_data)}</p>
			<p>Scraped Data: {JSON.stringify(scraped_data)}</p>
		</div>
	)
}

export default App
