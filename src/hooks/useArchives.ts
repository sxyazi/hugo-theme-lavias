import {useEffect, useState} from 'preact/hooks'
import {useSource} from './useSource'

export type Archive = {
  title: string
  link: string
  date: Date
  year: number
}

export const useArchives = () => {
  const [archives, setArchives] = useState<Archive[]>([])
  const source = useSource()

  useEffect(() => {
    setArchives(Array.from(source().querySelectorAll('#archives > article')).map((article) => {
      const a = article.querySelector(':scope > a')
      const date = new Date(article.querySelector(':scope > time')?.getAttribute('datetime')!)

      return {
        title: a?.textContent!,
        link: a?.getAttribute('href')!,
        date: date,
        year: date.getFullYear(),
      }
    }))
  }, [source])
  return archives
}
