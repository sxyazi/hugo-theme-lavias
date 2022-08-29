import {useSource} from './useSource'

export const usePagination = () => {
  const source = useSource()

  return {
    prev: source.querySelector('#prev-page')?.getAttribute('href') ?? null,
    next: source.querySelector('#next-page')?.getAttribute('href') ?? null,
  }
}
