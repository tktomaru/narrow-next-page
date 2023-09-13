window.addEventListener('load', function (event) {
  console.log('Page load completed')
  let logs = JSON.parse(sessionStorage.getItem('logs')) || [] // 保存されたログを取得

  if (logs.length > 0) {
    console.log('==== Saved Logs Start ====')
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

  // ============= ハーメルン用 =============
  if (event.key === 'PageDown') {
    addLog('HAMELN Down arrow pressed')
    // ページの最下部までスクロールされたかをチェック
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addLog('HAMELN Down arrow pressed and scrolled to bottom')
      // class属性がnext_page_linkである要素を探す
      var nextHref = document.querySelector('.next_page_link')
      if (nextHref) {
        // hrefをクリック
        addLog('■HAMELN Next Page clicked')
        nextHref.click()
      }
    }
  }
  if (event.key === 'PageUp') {
    addLog('HAMELN Up arrow pressed')
    // ページの最上部までスクロールされたかをチェック
    if (window.scrollY <= 0) {
      addLog('HAMELN Up arrow pressed and scrolled to top')
      // class属性がnovelnbである要素を探す
      var nextLi = document.querySelector('.novelnb')
      if (nextLi) {
        var nextHref = nextLi.querySelector('a')
        if (nextHref) {
          // hrefをクリック
          addLog('■HAMELN Previous Page clicked')
          nextHref.click()
        }
      }
    }
  }

  // ============= なろう用 =============
  if (event.key === 'PageDown') {
    addLog('Narrow Down arrow pressed')
    // ページの最下部までスクロールされたかをチェック
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addLog('Narrow Down arrow pressed and scrolled to bottom')
      // class属性がnovel_bnである要素を探す
      var nextA = document.querySelectorAll('.novel_bn a')
      for (let i = 0; i < nextA.length; i++) {
        const link = nextA[i]
        if (link.textContent.includes('次へ')) {
          addLog('■Narrow Next Page clicked')
          link.click()
          break // 最初の次へを見つけたらループを終了します
        }
      }
    }
  }
  if (event.key === 'PageUp') {
    addLog('Narrow Up arrow pressed')
    // ページの最上部までスクロールされたかをチェック
    if (window.scrollY <= 0) {
      addLog('Narrow Up arrow pressed and scrolled to top')
      // class属性がnovel_bnである要素を探す
      var nextA = document.querySelectorAll('.novel_bn a')
      for (let i = 0; i < nextA.length; i++) {
        const link = nextA[i]
        if (link.textContent.includes('前へ')) {
          addLog('■Narrow Previous Page clicked')
          link.click()
          break // 最初の次へを見つけたらループを終了します
        }
      }
    }
  }
})
