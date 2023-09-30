// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

function getCurrentTabURL() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('query')
    var currentURL = tabs[0].url
    console.log(currentURL)

    // タブが読み込まれるのを待つ
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      console.log('onUpdated')
      console.log(currentURL)
      if (changeInfo.status === 'complete' && tabId === tabs[0].id) {
        console.log('sendMessage')
        chrome.tabs.sendMessage(tabId, { url: currentURL })
      }
    })
  })
}

// タブの変更があるたびにgetCurrentTabURLを呼び出す
chrome.tabs.onActivated.addListener(getCurrentTabURL)
