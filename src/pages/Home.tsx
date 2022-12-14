import {Layout} from '../components/Layout'
import {formatDate, preload} from '../utils'
import {Post, usePosts, useTitle} from '../hooks'
import {useEffect, useRef} from 'preact/hooks'
import {Link} from '../components/Link'


const preloadQueue = new Set<string>()
const preloadSucceeded = new Set<string>()

const Line = ({post}: { post: Post }) => {
	const refArticle = useRef<HTMLElement>(null)

	// Preload on background when mouse is entering
	useEffect(() => {
		const el = refArticle.current
		if (!el) return

		const onMouseEnter = (event: MouseEvent) => {
			if (preloadQueue.has(post.link) || preloadSucceeded.has(post.link))
				return

			preloadQueue.add(post.link)
			fetch(post.link)
				.then(() => preloadSucceeded.add(post.link))
				.finally(() => preloadQueue.delete(post.link))
		}

		el.addEventListener('mouseenter', onMouseEnter)
		return () => el.removeEventListener('mouseenter', onMouseEnter)

	}, [refArticle.current])

	return (
		<article
			ref={refArticle}
			class="mb-6 p-4 rounded-md relative transition-all sm:hover:translate-x-2 shadow drop-shadow
							dark:drop-shadow-none will-change-transform bg-white dark:bg-slate-800"
		>
			<Link to={post.link} className="block w-full h-full absolute inset-0"/>
			<span class="font-medium text-lg text-accent-600 dark:text-accent-400 mr-2">{post.title}</span>
			<time class="text-sm whitespace-nowrap text-slate-400 dark:text-slate-400">
				{formatDate(post.date!, 'w, m d, Y')}
			</time>
			<summary class="list-none mt-3 text-slate-700 dark:text-slate-300 line-clamp-3">{post.summary}</summary>
		</article>
	)
}

export const Home = () => {
	const posts = usePosts()
	useTitle(document.querySelector('title')?.dataset?.site)

	useEffect(() => {
		posts.length > 0 && preload(posts[0].link, 'auto')
		posts.length > 1 && preload(posts[1].link, 'auto')
	}, [posts])

	return (
		<Layout>
			{posts.length > 0 && <>
				<h2 class="font-medium text-xl mb-6 dark:text-slate-200">My posts:</h2>
				{posts.map((post) => <Line post={post}/>)}
			</>}
		</Layout>
	)
}
