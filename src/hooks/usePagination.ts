import { useSource } from "./useSource"
import { useEffect, useState } from "preact/hooks"

export const usePagination = () => {
	const source = useSource()
	const [prev, setPrev] = useState<string | null>()
	const [next, setNext] = useState<string | null>()

	useEffect(() => {
		setPrev(source.querySelector("#prev-page")?.getAttribute("href"))
		setNext(source.querySelector("#next-page")?.getAttribute("href"))
	}, [source])
	return { prev, next }
}
