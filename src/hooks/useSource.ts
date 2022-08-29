import {useContext} from 'preact/compat'
import {AppContext} from '../providers/AppProvider'
import {useLocation} from 'react-router-dom'
import {EMPTY_DOC} from '../utils'

export const useSource = () => {
  const location = useLocation()
  const {source, path} = useContext(AppContext)

  if (location.pathname !== path.current?.last) {
    return EMPTY_DOC
  }
  return source
}
