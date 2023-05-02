import { useEffect, useState } from "preact/hooks"
import { useSource } from "./useSource"

export type Tag = {
	name: string
	link: string
	count?: number
}

export const useTags = () => {
	const [links, setLinks] = useState<Tag[]>([])
	const source = useSource()

	useEffect(() => {
		setLinks([...source.querySelectorAll("#tags > p")].map(p => {
			const a = p.querySelector(":scope > a")

			return {
				name : a?.textContent ?? "",
				link : a?.getAttribute("href") ?? "",
				count: parseInt(p.querySelector(":scope > sup")?.textContent ?? "") || undefined,
			}
		}))
	}, [source])
	return links
}

