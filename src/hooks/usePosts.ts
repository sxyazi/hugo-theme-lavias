import {useEffect, useState} from 'preact/hooks'
import {useSource} from './useSource'

export type Post = {
  title: string
  link: string
  date: Date
  summary?: string
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const source = useSource()

  useEffect(() => {
    setPosts(Array.from(source().querySelectorAll('#posts > article')).map((article) => {
      const a = article.querySelector(':scope > a')
      const time = article.querySelector(':scope > time')

      return {
        title: a?.textContent!,
        link: a?.getAttribute('href')!,
        date: new Date(time?.getAttribute('datetime')!),
        summary: article.querySelector(':scope > details')?.textContent ?? undefined,
      }
    }))
  }, [source])
  return posts
}
