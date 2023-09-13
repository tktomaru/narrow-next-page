document.addEventListener('keydown', function(event) {
    console.log('Down arrow  key=' + event.key  + "  code=" + event.code)
    if (event.key === 'PageDown') {
        console.log('Down arrow pressed')
        // ページの最下部までスクロールされたかをチェック
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('Down arrow pressed and scrolled to bottom')
            // class属性がnext_page_linkである要素を探す
            var nextHref = document.querySelector('.next_page_link');
            if (nextHref) {
                console.log('Down arrow pressed and scrolled to bottom and next page link found')
                // ボタンをクリック
                nextHref.click();
            }
        }
    }
    if (event.key === 'PageUp') {
        console.log('Up arrow pressed')
        // ページの最下部までスクロールされたかをチェック
        if ((window.scrollY) <= 0) {
            console.log('Up arrow pressed and scrolled to bottom')
            // class属性がnext_page_linkである要素を探す
            var nextHref = document.querySelector('.novelnb');
            if (nextHref) {
                nextHref = nextHref.querySelector('a');
                if (nextHref) {
                    console.log('Up arrow pressed and scrolled to bottom and next page link found')
                    // ボタンをクリック
                    nextHref.click();
                }
            }
        }
    }
});
