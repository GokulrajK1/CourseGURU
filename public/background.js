chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "SCRAPE_REQUEST") {

		chrome.scripting.executeScript({
			target: { tabId: message.tabId },
			files: ["content.js"]
		}, (results) => {
			if (results && results[0] && results[0].result) {
				sendResponse({ status: 'Success', data: results[0].result});
			} else {
				sendResponse({ status: "Failure"})
			}
			
		});

		return true; 
	}
});