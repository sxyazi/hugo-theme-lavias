import { usePost, useTitle } from "../hooks"
import { Layout } from "../components/Layout"
import { useEffect, useRef } from "preact/hooks"
import { formatDate } from "../utils"
import { useContext } from "preact/compat"
import { AppContext } from "../providers/AppProvider"
import { InvertLightness } from "../components/InvertLightness"
import { useCount } from "../hooks/useCount"

export const Post = () => {
	const post = usePost()
	const refContent = useRef<HTMLDivElement>(null)
	useTitle(post?.title)

	useEffect(() => {
		const highlight = (content: HTMLDivElement) => {
			const langAlias: { [key: string]: string } = { pgsql: "sql", shell: "bash", golang: "go" }

			for (const el of content.querySelectorAll("pre>code")) {
				if (!el.className.startsWith("language-")) {
					el.className = "language-plaintext"
					continue
				}

				// Line highlighting
				const regex = /(lang(?:uage)?-.+){([\d,-]+)}/
				const lines = regex.exec(el.className)
				if (lines) {
					(el.parentNode as HTMLPreElement).dataset.line = lines[2]
					el.className = el.className.replace(regex, "$1")
				}

				const lang = el.className.slice(9)
				if (lang in langAlias) {
					el.className = `language-${langAlias[lang]}`
				}
			}

			void import("../prism").then(({ highlightAllUnder }) => {
				refContent.current && highlightAllUnder(refContent.current)
			})
		}

		if (post && refContent.current) {
			highlight(refContent.current)
		}
	}, [post])

	useEffect(() => {
		const renderMath = async (content: HTMLDivElement) => {
			import("katex/dist/katex.min.css")

			return (await import("katex/contrib/auto-render")).default(content, {
				output    : "html",
				delimiters: [
					{ left: "$$", right: "$$", display: true },
					{ left: "$", right: "$", display: false },
				],
				throwOnError: false,
			})
		}

		if (post && refContent.current) {
			renderMath(refContent.current).catch(console.error)
		}
	}, [post])

	const count = useCount(post?.id)
	const { dark } = useContext(AppContext)
	return (
		<Layout className={`relative markdown-content ${dark ? "markdown-content-dark" : ""}`}>
			<InvertLightness/>
			{post && <>
				<h1>{post.title}</h1>
				<span className="absolute top-0 text-xs text-slate-500
												 dark:text-slate-400 transition-opacity opacity-0 pointer-events-none">
					{post.date ? <time>{formatDate(post.date, "w, m d, Y")}</time> : <></>}
					{count ? <span>{post.date ? " · " : ""}{count.page} view</span> : <></>}
				</span>
				<div ref={refContent} dangerouslySetInnerHTML={{ __html: post.content! }}></div>
			</>}
		</Layout>
	)
}
