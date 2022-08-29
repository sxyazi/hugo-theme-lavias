import {Route, Routes, useLocation} from 'react-router-dom'
import {Home} from './pages/Home'
import {Archives} from './pages/Archives'
import {Tags} from './pages/Tags'
import {Post} from './pages/Post'
import {useEffect, useRef, useState} from 'preact/hooks'
import AppContext from './contexts/AppContext'
import {parse} from './utils'
import {Suspense} from 'preact/compat'
import NProgress from 'nprogress'

export function App() {
  const location = useLocation()
  const init = useRef({entry: location.pathname, last: location.pathname}).current
  const [source, setSource] = useState<Promise<Document>>(
    () => Promise.resolve(parse(document.querySelector('noscript')?.textContent!)),
  )

  useEffect(() => {
    NProgress.start()

    if (location.pathname === init.last) {
      NProgress.done()
      return
    } else if (location.pathname === init.entry) {
      init.last = init.entry
      return setSource(Promise
        .resolve(parse(document.querySelector('noscript')?.textContent!))
        .finally(() => NProgress.done()))
    } else {
      init.last = location.pathname
    }

    setSource(fetch(location.pathname)
      .then(res => res.text())
      .then((res) => parse(res).querySelector('noscript')?.innerHTML!)
      .then((src) => parse(src))
      .finally(() => NProgress.done()))

  }, [location])

  return (
    <Suspense fallback={<></>}>
      <AppContext.Provider value={{source}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tags" element={<Tags/>}/>
          <Route path="/tags/:tag" element={<Tags/>}/>
          <Route path="/archives" element={<Archives/>}/>
          <Route path="*" element={<Post/>}/>
        </Routes>
      </AppContext.Provider>
    </Suspense>
  )
}
