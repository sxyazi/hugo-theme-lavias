import {useEffect, useState} from 'preact/hooks'
import {useSource} from './useSource'

export type Nav = {
  name: string
  link: string
}

export const useNav = () => {
  const source = useSource()
  const [navs, setNavs] = useState<Nav[]>([])

  useEffect(() => {
    const navs = Array.from(source.querySelectorAll('#nav > a')).map((a) => {
      return {name: a.textContent!, link: a.getAttribute('href')!}
    })

    if (navs.length) {
      setNavs(navs)
    }

  }, [source])
  return navs
}
