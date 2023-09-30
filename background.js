// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === 'getCurrentURL') {
//     var currentURL = message.url
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       var tabId = tabs[0].id
//       chrome.tabs.sendMessage(tabId, { action: 'updateURL', url: currentURL })
//     })
//   }
// })
