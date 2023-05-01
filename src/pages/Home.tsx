import {Layout} from "../components/Layout"
import {formatDate, preload} from "../utils"
import {Post, type Sakura, usePosts, useSakura, useTitle} from "../hooks"
import {useEffect, useRef} from "preact/hooks"
import {Link} from "react-router-dom"

const preloadQueue = new Set<string>()
const preloadSucceeded = new Set<string>()

const Line = ({post, sakura}: { post: Post, sakura: Sakura }) => {
	const refArticle = useRef<HTMLElement>(null)

	// Preload on background when mouse is entering
	useEffect(() => {
		const el = refArticle.current!
		const onMouseEnter = () => {
			sakura.start(refArticle)
			if (preloadQueue.has(post.link) || preloadSucceeded.has(post.link))
				return

			preloadQueue.add(post.link)
			fetch(post.link)
				.then(() => preloadSucceeded.add(post.link))
				.finally(() => preloadQueue.delete(post.link))
		}
		const onMouseLeave = () => sakura.stop()

		el.addEventListener("mouseenter", onMouseEnter)
		el.addEventListener("mouseleave", onMouseLeave)
		return () => {
			el.removeEventListener("mouseenter", onMouseEnter)
			el.removeEventListener("mouseleave", onMouseLeave)
		}
	}, [])

	return (
		<article ref={refArticle} className="my-12 relative">
			<Link to={post.link} className="block w-full h-full absolute inset-0"/>
			<span className="font-medium text-lg text-accent-600 dark:text-accent-400 mr-2">{post.title}</span>
			<time className="text-sm whitespace-nowrap text-slate-400 dark:text-slate-400">
				{formatDate(post.date!, "w, m d, Y")}
			</time>
			<summary className="list-none mt-3 text-slate-700 dark:text-slate-300 line-clamp-3">{post.summary}</summary>
		</article>
	)
}

export const Home = () => {
	const refCanvas = useRef<HTMLCanvasElement>(null)

	const posts = usePosts()
	const sakura = useSakura({canvas: refCanvas})
	useTitle(document.querySelector("title")?.dataset?.site)

	useEffect(() => {
		posts.length > 0 && preload(posts[0].link, "auto")
		posts.length > 1 && preload(posts[1].link, "auto")
	}, [posts])

	return (
		<Layout>
			<canvas ref={refCanvas} className="fixed z-10 pointer-events-none"></canvas>
			{posts.length > 0 && <>
				<h2 className="font-medium text-xl mb-6 dark:text-slate-200">My posts:</h2>
				{posts.map((post, i) => <Line key={i} post={post} sakura={sakura}/>)}
			</>}
		</Layout>
	)
}
