import {useContext} from 'preact/compat'
import {AppContext} from '../providers/AppProvider'

export const useSource = () => {
  const {source} = useContext(AppContext)
  return source
}
