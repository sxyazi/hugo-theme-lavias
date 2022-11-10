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

		if (navs.length) {
			prevNavs = navs
			setNavs(navs)
		}

	}, [source])
	return navs
}
