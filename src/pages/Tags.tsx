import {Post, Tag, usePosts, useTags, useTitle} from "../hooks"
import {useParams} from "react-router-dom"
import {formatDate} from "../utils"
import {Layout} from "../components/Layout"
import {Link} from "../components/Link"

const TagLine = ({tag}: { tag: Tag }) => {
	return (
		<p className="my-2">
			<Link to={tag.link}>{tag.name}</Link>
			<sup className="ml-1 text-slate-500 dark:text-slate-400">{tag.count}</sup>
		</p>
	)
}

const PostLine = ({post}: { post: Post }) => {
	return (
		<article className="mb-4">
			<Link to={post.link} className="text-accent-600 hover:underline underline-offset-4">{post.title}</Link>
			<time className="ml-2 text-xs text-slate-500 dark:text-slate-400">{formatDate(post.date!, "w, m d, Y")}</time>
		</article>
	)
}

export const Tags = () => {
	const tags = useTags()
	const posts = usePosts()
	const params = useParams()
	useTitle(params.tag ? `Tag “${params.tag}”` : "Tags")

	return (
		<Layout>
			{params.tag && posts.length > 0 && <>
				<h2 className="font-medium text-xl mb-4 dark:text-slate-200">Tag “{params.tag}”:</h2>
				{posts.map((post, i) => <PostLine key={i} post={post}/>)}
			</>}

			{!params.tag && tags.length > 0 && <>
				<h2 className="font-medium text-xl mb-4 dark:text-slate-200">Tags:</h2>
				{tags.map((tag, i) => <TagLine key={i} tag={tag}/>)}
			</>}
		</Layout>
	)
}
