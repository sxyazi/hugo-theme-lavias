import {ComponentChildren, createContext, createRef, RefObject} from 'preact'
import {EMPTY_DIV, parse} from '../utils'
import {useEffect, useRef, useState} from 'preact/hooks'
import {useLocation} from 'react-router-dom'
import NProgress from 'nprogress'

export const AppContext = createContext<{
	source: HTMLElement
	path: RefObject<string>
}>({
	source: EMPTY_DIV,
	path: createRef(),
})

export const AppProvider = ({children}: { children: ComponentChildren }) => {
	const location = useLocation()
	const path = useRef(location.pathname)
	const [source, setSource] = useState<HTMLElement>(document.querySelector('main')!)

	useEffect(() => {
		NProgress.start()
		if (location.pathname === path.current) {
			// @ts-ignore
			fetch(location.pathname, {headers: {'x-swr': '1'}, priority: 'high'}).catch(console.error)
			NProgress.done()
			return
		} else {
			setSource(EMPTY_DIV)
			path.current = location.pathname
		}

		fetch(location.pathname, {
			headers: {'x-swr': '1'},
			// @ts-ignore
			priority: 'high',
		})
			.then(resp => resp.text())
			.then((resp) => parse(resp).querySelector('main')!)
			.then(setSource)
			.finally(() => NProgress.done())

	}, [location])

	useEffect(() => {
		const onMessage = ({data}: MessageEvent) => {
			if (data.type !== 'SWR') return
			if (data.path === location.pathname) {
				const resp = new TextDecoder().decode(data.buf)
				setSource(parse(resp).querySelector('main')!)
			}
		}

		navigator.serviceWorker?.addEventListener('message', onMessage)
		return () => navigator.serviceWorker?.removeEventListener('message', onMessage)

	}, [location])

	return (
		<AppContext.Provider value={{source, path}}>
			{children}
		</AppContext.Provider>
	)
}
