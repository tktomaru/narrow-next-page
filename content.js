document.addEventListener('keydown', function (event) {
  console.log('keydown  key=' + event.key + '  code=' + event.code)
  // ============= ハーメルン用 =============
  if (event.key === 'PageDown') {
    console.log('HAMELN Down arrow pressed')
    // ページの最下部までスクロールされたかをチェック
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('HAMELN Down arrow pressed and scrolled to bottom')
      // class属性がnext_page_linkである要素を探す
      var nextHref = document.querySelector('.next_page_link')
      if (nextHref) {
        console.log(
          'HAMELN Down arrow pressed and scrolled to bottom and next page link found'
        )
        // hrefをクリック
        nextHref.click()
      }
    }
  }
  if (event.key === 'PageUp') {
    console.log('HAMELN Up arrow pressed')
    // ページの最上部までスクロールされたかをチェック
    if (window.scrollY <= 0) {
      console.log('HAMELN Up arrow pressed and scrolled to top')
      // class属性がnovelnbである要素を探す
      var nextLi = document.querySelector('.novelnb')
      if (nextLi) {
        var nextHref = nextLi.querySelector('a')
        if (nextHref) {
          console.log(
            'HAMELN Up arrow pressed and scrolled to top and prev page link found'
          )
          // hrefをクリック
          nextHref.click()
        }
      }
    }
  }

  // ============= なろう用 =============
  if (event.key === 'PageDown') {
    console.log('Narrow Down arrow pressed')
    // ページの最下部までスクロールされたかをチェック
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('Narrow Down arrow pressed and scrolled to bottom')
      // class属性がnovel_bnである要素を探す
      var nextA = document.querySelectorAll('.novel_bn a')
      for (let i = 0; i < nextA.length; i++) {
        const link = nextA[i]
        if (link.textContent.includes('次へ')) {
          link.click()
          break // 最初の次へを見つけたらループを終了します
        }
      }
    }
  }
  if (event.key === 'PageUp') {
    console.log('Narrow Up arrow pressed')
    // ページの最上部までスクロールされたかをチェック
    if (window.scrollY <= 0) {
      // class属性がnovel_bnである要素を探す
      var nextA = document.querySelectorAll('.novel_bn a')
      for (let i = 0; i < nextA.length; i++) {
        const link = nextA[i]
        if (link.textContent.includes('前へ')) {
          link.click()
          break // 最初の次へを見つけたらループを終了します
        }
      }
    }
  }
})
