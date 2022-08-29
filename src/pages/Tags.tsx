import {Tag, useTags} from '../hooks/useTags'
import {Link, useParams} from 'react-router-dom'
import {Post, usePosts} from '../hooks'
import {formatDate} from '../utils'
import {Layout} from '../components/Layout'
import {Paginator} from '../components/Paginator'

const TagLine = ({tag}: { tag: Tag }) => {
  return (
    <p class="my-2">
      <Link to={tag.link} className="text-pink-600 hover:underline underline-offset-4">{tag.name}</Link>
      <sup class="ml-1 text-slate-500">{tag.count}</sup>
    </p>
  )
}

const PostLine = ({post}: { post: Post }) => {
  return (
    <article className="mb-4">
      <Link to={post.link} className="text-pink-600 hover:underline underline-offset-4">{post.title}</Link>
      <time className="ml-2 text-xs text-slate-500">{formatDate(post.date, 'w, m d, Y')}</time>
    </article>
  )
}

export const Tags = () => {
  const tags = useTags()
  const posts = usePosts()
  const params = useParams()

  return (
    <Layout>
      {params.tag && posts.length > 0 && <>
				<h2 class="font-medium text-xl mb-4">Tag “{params.tag}”:</h2>
        {posts.map((post) => <PostLine post={post}/>)}
			</>}

      {!params.tag && tags.length > 0 && <>
				<h2 class="font-medium text-xl mb-4">Tags:</h2>
        {tags.map((tag) => <TagLine tag={tag}/>)}
			</>}

      <Paginator/>
    </Layout>
  )
}
