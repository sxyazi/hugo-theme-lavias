import {Archive, useArchives} from '../hooks'
import {Layout} from '../components/Layout'
import {formatDate} from '../utils'
import {Link} from 'react-router-dom'

const Line = ({archive}: { archive: Archive }) => {
  return (
    <article class="mb-4">
      <Link to={archive.link} className="text-pink-600 hover:underline hover:underline-offset-4">{archive.title}</Link>
      <time class="ml-2 text-xs text-slate-500">{formatDate(archive.date, 'w, m d, Y')}</time>
    </article>
  )
}

export const Archives = () => {
  const archives = useArchives()

  let lastYear: number
  return (
    <Layout>
      <section class="w-2/5">
        {archives.length > 0 && <h2 className="font-medium text-xl mb-4">Archives:</h2>}

        {archives.map((archive) => {
          let newYear = false
          if (lastYear !== archive.year) {
            newYear = true
            lastYear = archive.year
          }

          return (
            <>
              {newYear && <h2 class={`mt-10 mb-5 text-lg`}>{archive.year}</h2>}
              <Line archive={archive}/>
            </>
          )
        })}
      </section>
    </Layout>
  )
}
