import {Layout} from '../components/Layout'
import {formatDate} from '../utils'
import {Post, usePosts} from '../hooks'
import {useNavigate} from 'react-router-dom'
import {Paginator} from '../components/Paginator'

const Line = ({post}: { post: Post }) => {
  const navigate = useNavigate()

  return (
    <article
      class="border p-4 rounded mb-4 cursor-pointer transition-all hover:translate-x-2"
      onClick={() => navigate(post.link)}
    >
      <span className="font-medium text-lg text-pink-600">{post.title}</span>
      <time class="ml-2 text-sm text-slate-400">{formatDate(post.date, 'w, m d, Y')}</time>
      <summary class="list-none mt-3 text-slate-700">{post.summary}</summary>
    </article>
  )
}

export const Home = () => {
  const posts = usePosts()

  return (
    <Layout>
      {posts.length > 0 && <>
				<h2 className="font-medium text-xl mb-4">My posts:</h2>
        {posts.map((post) => <Line post={post}/>)}
			</>}

      <Paginator/>
    </Layout>
  )
}
