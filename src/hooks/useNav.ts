import {useEffect, useState} from 'preact/hooks'
import {useSource} from './useSource'

export type Nav = {
	name: string
	link: string
}

let prevNavs: Nav[] = []

export const useNav = () => {
	const source = useSource()
	const [navs, setNavs] = useState<Nav[]>(prevNavs)

	useEffect(() => {
		const navs = Array.from(source.querySelectorAll('#nav > a')).map((a) => {
			return {name: a.textContent!, link: a.getAttribute('href')!}
		})
		if (!navs.length) return

		// We assume that the nav is always the same,
		// to avoid unnecessary re-renders and re-preloads.
		if (!prevNavs.length) {
			setNavs(prevNavs = navs)
		}

	}, [source])
	return navs
}
