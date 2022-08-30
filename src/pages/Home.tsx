import {Layout} from '../components/Layout'
import {formatDate} from '../utils'
import {Post, usePosts} from '../hooks'
import {useNavigate} from 'react-router-dom'

const Line = ({post}: { post: Post }) => {
  const navigate = useNavigate()

  return (
    <article
      class="border p-4 rounded mb-4 cursor-pointer transition-all hover:translate-x-2
              dark:border-slate-600"
      onClick={() => navigate(post.link)}
    >
      <span className="font-medium text-lg text-pink-600 dark:text-pink-400">{post.title}</span>
      <time class="ml-2 text-sm text-slate-400 dark:text-slate-400">{formatDate(post.date, 'w, m d, Y')}</time>
      <summary class="list-none mt-3 text-slate-700 dark:text-slate-300">{post.summary}</summary>
    </article>
  )
}

export const Home = () => {
  const posts = usePosts()

  return (
    <Layout>
      {posts.length > 0 && <>
				<h2 className="font-medium text-xl mb-4 dark:text-slate-200">My posts:</h2>
        {posts.map((post) => <Line post={post}/>)}
			</>}
    </Layout>
  )
}
