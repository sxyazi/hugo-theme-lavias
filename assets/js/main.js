;(function () {
  var tocNav = document.querySelector('#TableOfContents')
  var mainContainer = document.querySelector('#container')
  var backToTopBtn = document.querySelector('#back-to-top')
  var progressIv = 0,
    progressBar = null,
    progressRate = 0,
    progressOffset = 0

  var pjax = function (href) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      var parser = new DOMParser(),
        doc = parser.parseFromString(xhr.responseText, 'text/html'),
        container = doc.querySelector('#container')

      if (!container) return
      mainContainer.classList.remove('transition')
      mainContainer.innerHTML = container.innerHTML
      window.scrollTo({ top: 0 })

      if (href != location.pathname) {
        history.pushState(null, '', href)
      }

      setTimeout(function () {
        mainContainer.classList.add('transition')
        progress(100)
      })
    })

    progress(50)
    xhr.open('GET', href)
    xhr.send()
  }

  var progress = function (rate) {
    progressBar = document.querySelector('#progressBar')
    if (progressBar && rate <= progressRate) {
      document.body.removeChild(progressBar)
      progressBar = null
    }
    if (!progressBar) {
      progressBar = document.createElement('div')
      progressBar.id = 'progressBar'
      document.body.appendChild(progressBar)
    }

    clearInterval(progressIv)
    if (rate >= 100) {
      progressBar.className = 'blur'
      progressBar.addEventListener('transitionend', function () {
        progressBar && (document.body.removeChild(progressBar), (progressBar = null))
      })

      return setTimeout(function () {
        progressBar && (document.body.removeChild(progressBar), (progressBar = null))
      }, 500)
    }

    ;(progressRate = rate),
      (progressOffset = 0),
      (progressIv = setInterval(function () {
        progressBar.style.width = progressRate + '%'
        progressOffset = Math.min(5, progressOffset + Math.random() / 10)
        progressRate = Math.min(85, progressRate + (100 - progressRate) / 2) + progressOffset
      }, 50))
  }

  window.addEventListener('scroll', function () {
    var pageOffset = document.documentElement.scrollTop || document.body.scrollTop

    tocNav && (tocNav.style.top = Math.max(50, 120 - pageOffset) + 'px')
    backToTopBtn && (backToTopBtn.style.visibility = pageOffset > 200 ? 'visible' : 'hidden')
  })

  window.addEventListener('click', function (e) {
    if (e.target.tagName != 'A') return
    e.preventDefault()

    var href = e.target.getAttribute('href')
    if (/^https?:\/\//.test(href)) {
      return window.open(e.target.href)
    }

    if (href != location.pathname) pjax(href)
  })

  window.addEventListener('load', function (e) {
    mainContainer.classList.add('transition')
  })

  history.scrollRestoration = 'manual'
  window.addEventListener('popstate', function (e) {
    pjax(location.pathname)
  })

  backToTopBtn.addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    backToTopBtn.style.display = 'none'
    setTimeout(function () {
      backToTopBtn.style.display = 'inline'
    }, 1000)
  })
})()
