import {useCallback, useContext} from 'preact/hooks'
import AppContext from '../contexts/AppContext'

export const useSource = () => {
  const {source} = useContext(AppContext)

  let status = 'pending'
  let result: Document | Error
  let suspender = source.then(
    (r) => {
      result = r
      status = 'success'
    },
    (e) => {
      result = e
      status = 'error'
    },
  )

  return useCallback(
    (): Document => {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      }
      return result as Document
    },
    [source],
  )
}
