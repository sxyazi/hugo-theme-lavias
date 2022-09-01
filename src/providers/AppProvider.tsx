import {ComponentChildren, createContext, createRef, RefObject} from 'preact'
import {EMPTY_DIV, parse} from '../utils'
import {useEffect, useRef, useState} from 'preact/hooks'
import {useLocation} from 'react-router-dom'
import NProgress from 'nprogress'

export const AppContext = createContext<{
  source: HTMLElement
  path: RefObject<{ entry: string, last: string }>
}>({
  source: EMPTY_DIV,
  path: createRef(),
})

export const AppProvider = ({children}: { children: ComponentChildren }) => {
  const location = useLocation()
  const path = useRef({entry: location.pathname, last: location.pathname})
  const [source, setSource] = useState<HTMLElement>(document.querySelector('main')!)

  useEffect(() => {
    NProgress.start()
    if (location.pathname === path.current.last) {
      NProgress.done()
      return
    } else if (location.pathname === path.current.entry) {
      path.current.last = path.current.entry
      setSource(document.querySelector('main')!)
      NProgress.done()
      return
    } else {
      path.current.last = location.pathname
    }

    setSource(EMPTY_DIV)
    fetch(location.pathname)
      .then(res => res.text())
      .then((res) => parse(res).querySelector('main')!)
      .then(setSource)
      .finally(() => NProgress.done())

  }, [location])

  return (
    <AppContext.Provider value={{source, path}}>
      {children}
    </AppContext.Provider>
  )
}
