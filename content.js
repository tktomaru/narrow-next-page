window.addEventListener('load', function (event) {
  console.log('Page load completed')
  let logs = JSON.parse(sessionStorage.getItem('logs')) || [] // 保存されたログを取得

  if (logs.length > 0) {
    console.log('==== Saved Logs Start  ====')
    logs.forEach((log) => console.log(log)) // 保存されたログを出力
    console.log('==== Saved Logs End ====')
    logs = [] // 一度出力したらログをクリア
    sessionStorage.setItem('logs', JSON.stringify(logs)) // クリアしたログを保存
  }
})

document.addEventListener('keydown', function (event) {
  let logs = JSON.parse(sessionStorage.getItem('logs')) || [] // 保存されたログを取得
  function addLog(log) {
    logs.push(log) // ログを配列に追加
    console.log(log) // コンソールに出力
    // ログの配列を保持し、他のページに遷移しても参照可能
    sessionStorage.setItem('logs', JSON.stringify(logs))
  }
  addLog('keydown  key=' + event.key + '  code=' + event.code)

  function top(name, clickFunc, text, selectClass) {
    addLog(`${name}!`)
    // ページの最上部までスクロールされたかをチェック
    if (window.scrollY <= 50) {
      addLog('scrolled to top')
      clickFunc(text, selectClass)
    }
  }
  function bottom(name, clickFunc, text, selectClass) {
    addLog(`${name}!`)
    // ページの最下部までスクロールされたかをチェック
    if (
      window.innerHeight + window.scrollY + 50 >=
      document.body.offsetHeight
    ) {
      addLog('scrolled to bottom')
      clickFunc(text, selectClass)
    }
  }
  function every(name, clickFunc, text, selectClass) {
    addLog(`${name}!`)
    clickFunc(text, selectClass)
  }
  function clickClassIncluceText(text, selectClass) {
    addLog('clickClassIncluceText')
    // class属性がselectClassである要素を探す
    var nextA = document.querySelectorAll(selectClass)
    for (let i = 0; i < nextA.length; i++) {
      const link = nextA[i]
      if (link.textContent.includes(text)) {
        addLog('clickClassIncluceText Next Page clicked')
        link.click()
        break // 最初の次へを見つけたらループを終了します
      }
    }
  }
  function clickClass(text, selectClass) {
    addLog('clickClass')
    // class属性がselectClassである要素を探す
    var nextHref = document.querySelector(selectClass)
    if (nextHref) {
      // hrefをクリック
      addLog('clickClass Next Page clicked')
      nextHref.click()
    }
  }

  function executeFunction(func, parameter, clickFunc, text, selectClass) {
    func(parameter, clickFunc, text, selectClass)
  }

  // console.log(window.location.href)
  currentDomain = new URL(window.location.href).host
  console.log('currentDomain:', currentDomain)
  // ============= ハーメルン用 =============
  if (currentDomain == 'syosetu.org') {
    if (event.key === 'PageDown') {
      executeFunction(
        bottom,
        'bottom hawmelon',
        clickClass,
        '',
        '.next_page_link'
      )
    }
    if (event.key === 'PageUp') {
      executeFunction(top, 'top hawmelon', clickClass, '', '.novelnb a')
    }
  }
  // ============= なろう用 =============
  if (currentDomain == 'ncode.syosetu.com') {
    if (event.key === 'PageDown') {
      executeFunction(
        bottom,
        'bottom narrow',
        clickClassIncluceText,
        '次へ',
        '.novel_bn a'
      )
    }
    if (event.key === 'PageUp') {
      executeFunction(
        top,
        'top narrow',
        clickClassIncluceText,
        '前へ',
        '.novel_bn a'
      )
    }
  }
  // ============= 応用情報用 =============
  if (currentDomain == 'www.ap-siken.com') {
    // 数値キーで問題回答
    if (event.key === '1') {
      executeFunction(every, '応用', clickClassIncluceText, 'ア', '.selectBtn')
    }
    if (event.key === '2') {
      executeFunction(every, '応用', clickClassIncluceText, 'イ', '.selectBtn')
    }
    if (event.key === '3') {
      executeFunction(every, '応用', clickClassIncluceText, 'ウ', '.selectBtn')
    }
    if (event.key === '4') {
      executeFunction(every, '応用', clickClassIncluceText, 'エ', '.selectBtn')
    }
    // 数値キーの下のボタンでページ移動
    if (event.key === 'q') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    if (event.key === 'r') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    // キーボードの下のほうのボタンで回答
    if (event.key === 'z') {
      executeFunction(every, '応用', clickClassIncluceText, 'ア', '.selectBtn')
    }
    if (event.key === 'x') {
      executeFunction(every, '応用', clickClassIncluceText, 'イ', '.selectBtn')
    }
    if (event.key === 'c') {
      executeFunction(every, '応用', clickClassIncluceText, 'ウ', '.selectBtn')
    }
    if (event.key === 'v') {
      executeFunction(every, '応用', clickClassIncluceText, 'エ', '.selectBtn')
    }
    // キーボードの下のほうのボタンの一つ上で次のページ
    if (event.key === 'a') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    if (event.key === 'g') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    // PageDownボタンで次のページ
    if (event.key === 'PageDown') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    // PageUpボタンで次のページ
    if (event.key === 'PageUp') {
      executeFunction(every, 'every 応用', clickClass, '', '.submit')
    }
    // bボタンで左のタブへ
    if (event.key === 'b') {
      chrome.runtime.sendMessage({
        action: 'transitionPrevPage',
      })
    }
  }
})

// // 現在のタブのURLを取得
// var currentURL = window.location.href

// // メッセージを送信
// chrome.runtime.sendMessage({ action: 'getCurrentURL', url: currentURL })

// var currentDomain = ''
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   var receivedURL = message.url
//   console.log('Received URL:', receivedURL)
//   if (receivedURL !== '') {
//     currentDomain = new URL(receivedURL).host
//     console.log('currentDomain:', currentDomain)
//   }
// })
