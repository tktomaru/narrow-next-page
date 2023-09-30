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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'transitionPrevPage') {
    // 一つ左のタブに移動する関数
    function moveToLeftTab() {
      chrome.tabs.query({ currentWindow: true }, function (tabs) {
        var currentTabIndex = tabs.findIndex((tab) => tab.active)
        var targetTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length

        chrome.tabs.update(tabs[targetTabIndex].id, { active: true })
      })
    }
    moveToLeftTab()
  }
})
