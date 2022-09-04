import {render} from 'preact'
import {App} from './App'
import './main.css'
import '@chisato/markdown-css/dist/styles.css'
import 'nprogress/nprogress.css'
import {BrowserRouter} from 'react-router-dom'
import {registerSW} from 'virtual:sw-plugin'

render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.querySelector('app')!,
)

registerSW().catch(console.error)

setTimeout(() => import('./prism').catch(console.info))
