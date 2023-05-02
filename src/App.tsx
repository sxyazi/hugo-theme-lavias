import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Archives } from "./pages/Archives"
import { Tags } from "./pages/Tags"
import { Post } from "./pages/Post"
import { useEffect } from "preact/hooks"
import { AppProvider } from "./providers/AppProvider"

export function App() {
	useEffect(() => {
		const onClick = (e: Event) => {
			if (!(e.target instanceof HTMLAnchorElement)) {
				return
			}

			const url = new URL(e.target.href)
			if (url.host !== location.host) {
				e.target.target = "_blank"
				e.target.rel = "noopener"
			}
		}

		document.addEventListener("click", onClick)
		return () => document.removeEventListener("click", onClick)
	}, [])

	return (
		<AppProvider>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/page/:page" element={<Home/>}/>
				<Route path="/tags" element={<Tags/>}/>
				<Route path="/tags/:tag" element={<Tags/>}/>
				<Route path="/archives" element={<Archives/>}/>
				<Route path="*" element={<Post/>}/>
			</Routes>
		</AppProvider>
	)
}
