import { useEffect, useState } from "preact/hooks"
import { useSource } from "./useSource"
import { Post } from "./usePost"

export const usePosts = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const source = useSource()

	useEffect(() => {
		setPosts([...source.querySelectorAll("#posts > article")].map(article => {
			const a = article.querySelector(":scope > a")
			const time = article.querySelector(":scope > time")

			return {
				title  : a?.textContent ?? "",
				link   : a?.getAttribute("href") ?? "",
				date   : new Date(time?.getAttribute("datetime") ?? ""),
				summary: article.querySelector(":scope > p")?.textContent ?? undefined,
			}
		}))
	}, [source])
	return posts
}
