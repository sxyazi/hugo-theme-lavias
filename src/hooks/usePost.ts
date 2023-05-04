import { useEffect, useState } from "preact/hooks"
import { Tag } from "./useTags"
import { useSource } from "./useSource"

export type Post = {
	id: string
	title: string
	link: string
	date?: Date
	content?: string
	summary?: string
	tags?: Tag[]
}

export const usePost = () => {
	const [post, setPost] = useState<Post>()
	const source = useSource()

	useEffect(() => {
		if (!source.querySelector("#post")) {
			return setPost(undefined)
		}

		const time = source.querySelector("#post > time")
		setPost({
			id     : source.querySelector("#post > span")?.textContent ?? "",
			title  : source.querySelector("#post > h1")?.textContent ?? "",
			link   : location.href,
			date   : time ? new Date(time.getAttribute("datetime")!) : undefined,
			content: source.querySelector("#post > div")?.innerHTML ?? "",
			tags   : [...source.querySelectorAll("#post > ul a")].map(a => {
				return { name: a.textContent!, link: a.getAttribute("href")! }
			}),
		})
	}, [source])
	return post
}
