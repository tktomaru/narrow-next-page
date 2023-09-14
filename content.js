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
    if (window.scrollY <= 0) {
      addLog('scrolled to top')
      clickFunc(text, selectClass)
    }
  }
  function bottom(name, clickFunc, text, selectClass) {
    addLog(`${name}!`)
    // ページの最下部までスクロールされたかをチェック
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addLog('scrolled to bottom')
      clickFunc(text, selectClass)
    }
  }
  function narrowClick(text, selectClass) {
    addLog('hamelonClick')
    // class属性がselectClassである要素を探す
    var nextA = document.querySelectorAll(selectClass)
    for (let i = 0; i < nextA.length; i++) {
      const link = nextA[i]
      if (link.textContent.includes(text)) {
        addLog('■Narrow Next Page clicked')
        link.click()
        break // 最初の次へを見つけたらループを終了します
      }
    }
  }
  function hamelonClick(text, selectClass) {
    addLog('hamelonClick')
    // class属性がselectClassである要素を探す
    var nextHref = document.querySelector(selectClass)
    if (nextHref) {
      // hrefをクリック
      addLog('■HAMELN Next Page clicked')
      nextHref.click()
    }
  }

  function executeFunction(func, parameter, clickFunc, text, selectClass) {
    func(parameter, clickFunc, text, selectClass)
  }

  // ============= ハーメルン用 =============
  if (event.key === 'PageDown') {
    executeFunction(
      bottom,
      'bottom hawmelon',
      hamelonClick,
      '',
      '.next_page_link'
    )
  }
  if (event.key === 'PageUp') {
    executeFunction(top, 'top hawmelon', hamelonClick, '', '.novelnb a')
  }
  // ============= なろう用 =============
  if (event.key === 'PageDown') {
    executeFunction(bottom, 'bottom narrow', narrowClick, '次へ', '.novel_bn a')
  }
  if (event.key === 'PageUp') {
    executeFunction(top, 'top narrow', narrowClick, '前へ', '.novel_bn a')
  }
})
