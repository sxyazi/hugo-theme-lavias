import {useSource} from './useSource'
import {useEffect, useState} from 'preact/hooks'

export const usePagination = () => {
  const source = useSource()
  const [prev, setPrev] = useState<string | null>(null)
  const [next, setNext] = useState<string | null>(null)

  useEffect(() => {
    setPrev(source.querySelector('#prev-page')?.getAttribute('href') ?? null)
    setNext(source.querySelector('#next-page')?.getAttribute('href') ?? null)
  }, [source])
  return {prev, next}
}
