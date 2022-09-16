import {Layout} from '../components/Layout'
import {formatDate, preload} from '../utils'
import {Post, usePosts, useTitle} from '../hooks'
import {useNavigate} from 'react-router-dom'
import {useEffect, useRef} from 'preact/hooks'


const preloadQueue = new Set<string>()
const preloadSucceeded = new Set<string>()

const Line = ({post}: { post: Post }) => {
	const navigate = useNavigate()
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
			class="border p-4 rounded mb-4 cursor-pointer transition-all hover:translate-x-2
              dark:border-slate-600"
			onClick={() => navigate(post.link)}
		>
			<span class="font-medium text-lg text-pink-600 dark:text-pink-400">{post.title}</span>
			<time class="ml-2 text-sm text-slate-400 dark:text-slate-400">{formatDate(post.date!, 'w, m d, Y')}</time>
			<summary class="list-none mt-3 text-slate-700 dark:text-slate-300">{post.summary}</summary>
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
				<h2 class="font-medium text-xl mb-4 dark:text-slate-200">My posts:</h2>
				{posts.map((post) => <Line post={post}/>)}
			</>}
		</Layout>
	)
}
