import {render} from 'preact'
import {App} from './App'
import './index.css'
import '@chisato/markdown-css/dist/styles.css'
import 'nprogress/nprogress.css'
import {BrowserRouter} from 'react-router-dom'

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('app') as HTMLElement,
)
