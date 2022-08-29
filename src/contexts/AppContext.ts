import {createContext} from 'preact'

const AppContext = createContext<{
  source: Promise<Document>
}>({
  source: new Promise(() => void 0),
})

export default AppContext
