import {usePost, useTitle} from '../hooks'
import {Layout} from '../components/Layout'
import {useEffect, useRef} from 'preact/hooks'
import {formatDate} from '../utils'
import {useContext} from 'preact/compat'
import {AppContext} from '../providers/AppProvider'
import {InvertLightness} from '../components/InvertLightness'

export const Post = () => {
	const post = usePost()
	const refContent = useRef<HTMLDivElement>(null)
	useTitle(post?.title)

	useEffect(() => {
		const highlight = (content: HTMLDivElement) => {
			const langAlias: { [key: string]: string } = {'pgsql': 'sql', 'shell': 'bash', 'golang': 'go'}

			for (const el of content.querySelectorAll('pre>code')) {
				if (!el.className.startsWith('language-')) {
					el.className = 'language-plaintext'
					continue
				}

				// Line highlighting
				const regex = /(lang(?:uage)?-.+){([\d,-]+)}/
				const lines = regex.exec(el.className)
				if (lines) {
					(el.parentNode as HTMLPreElement).setAttribute('data-line', lines[2])
					el.className = el.className.replace(regex, '$1')
				}

				const lang = el.className.substring(9)
				if (lang in langAlias) {
					el.className = `language-${langAlias[lang]}`
				}
			}

			import('../prism').then(({highlightAllUnder}) => {
				refContent.current && highlightAllUnder(refContent.current)
			})
		}

		if (post && refContent.current) {
			highlight(refContent.current)
		}

	}, [post, refContent.current])

	useEffect(() => {
		const renderMath = async (content: HTMLDivElement) => {
			import('katex/dist/katex.min.css')

			return (await import('katex/contrib/auto-render')).default(content, {
				output: 'html',
				delimiters: [
					{left: '$$', right: '$$', display: true},
					{left: '$', right: '$', display: false},
				],
				throwOnError: false,
			})
		}

		if (post && refContent.current) {
			renderMath(refContent.current).catch(console.error)
		}

	}, [post, refContent.current])

	const {dark} = useContext(AppContext)
	return (
		<Layout className={`relative markdown-content ${dark ? 'markdown-content-dark' : ''}`}>
			<InvertLightness/>
			{post && <>
				<h1>{post.title}</h1>
				{post.date ? <time
					className="absolute top-0 text-xs text-slate-500 dark:text-slate-400 transition-opacity opacity-0 pointer-events-none">
					{formatDate(post.date, 'w, m d, Y')}
				</time> : <></>}
				<div ref={refContent} dangerouslySetInnerHTML={{__html: post.content!}}></div>
			</>}
		</Layout>
	)
}
