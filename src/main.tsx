import {render} from 'preact'
import {App} from './App'
import './main.css'
import '@chisato/markdown-css/dist/styles.css'
import 'nprogress/nprogress.css'
import {BrowserRouter} from 'react-router-dom'

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.querySelector('app')!,
)
