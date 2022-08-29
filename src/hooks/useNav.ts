import {useEffect, useState} from 'preact/hooks'
import {useSource} from './useSource'

export type Nav = {
  name: string
  link: string
}

export const useNav = () => {
  const [links, setLinks] = useState<Nav[]>([])
  const source = useSource()

  useEffect(() => {
    setLinks(Array.from(source.querySelectorAll('#nav > a')).map((a) => {
      return {name: a.textContent!, link: a.getAttribute('href')!}
    }))
  }, [source])
  return links
}
