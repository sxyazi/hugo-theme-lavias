import {ComponentChildren, createContext} from 'preact'
import {EMPTY_DOC, parse} from '../utils'
import {useEffect, useRef, useState} from 'preact/hooks'
import {useLocation} from 'react-router-dom'
import NProgress from 'nprogress'

export const AppContext = createContext<{
  source: Document
}>({
  source: EMPTY_DOC,
})

export const AppProvider = ({children}: { children: ComponentChildren }) => {
  const location = useLocation()
  const init = useRef({entry: location.pathname, last: location.pathname}).current
  const [source, setSource] = useState<Document>(parse(document.querySelector('noscript')?.textContent!))

  useEffect(() => {
    NProgress.start()
    if (location.pathname === init.last) {
      NProgress.done()
      return
    } else if (location.pathname === init.entry) {
      init.last = init.entry
      setSource(parse(document.querySelector('noscript')?.textContent!))
      NProgress.done()
      return
    } else {
      init.last = location.pathname
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
    <AppContext.Provider value={{source: source}}>
      {children}
    </AppContext.Provider>
  )
}
