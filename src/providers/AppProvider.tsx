import {ComponentChildren, createContext, createRef, RefObject} from 'preact'
import {EMPTY_DOC, parse} from '../utils'
import {useEffect, useRef, useState} from 'preact/hooks'
import {useLocation} from 'react-router-dom'
import NProgress from 'nprogress'

export const AppContext = createContext<{
  source: Document
  path: RefObject<{ entry: string, last: string }>
}>({
  source: EMPTY_DOC,
  path: createRef(),
})

export const AppProvider = ({children}: { children: ComponentChildren }) => {
  const location = useLocation()
  const path = useRef({entry: location.pathname, last: location.pathname})
  const [source, setSource] = useState<Document>(parse(document.querySelector('noscript')?.textContent!))

  useEffect(() => {
    NProgress.start()
    if (location.pathname === path.current.last) {
      NProgress.done()
      return
    } else if (location.pathname === path.current.entry) {
      path.current.last = path.current.entry
      setSource(parse(document.querySelector('noscript')?.textContent!))
      NProgress.done()
      return
    } else {
      path.current.last = location.pathname
    }

    setSource(EMPTY_DOC)
    fetch(location.pathname)
      .then(res => res.text())
      .then((res) => parse(res).querySelector('noscript')?.innerHTML!)
      .then((src) => parse(src))
      .then(setSource)
      .finally(() => NProgress.done())

  }, [location])

  return (
    <AppContext.Provider value={{source, path}}>
      {children}
    </AppContext.Provider>
  )
}
