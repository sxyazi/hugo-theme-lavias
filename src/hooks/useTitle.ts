import {useEffect} from "preact/hooks"

export const useTitle = (title?: string) => {
	useEffect(() => {
		if (!title) return
		const prevTitle = document.title

		document.title = title
		return () => document.title = prevTitle
	}, [title])
}
