import {useEffect, useRef} from 'preact/hooks'

export const useTitle = (title?: string) => {
	if (title === undefined) return

	const prevTitleRef = useRef(document.title)
	if (document.title !== title) document.title = title
	useEffect(() => () => document.title = prevTitleRef.current, [])
}
