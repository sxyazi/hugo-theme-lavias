import {usePost, useTitle} from '../hooks'
import {Layout} from '../components/Layout'
import {useEffect, useRef} from 'preact/hooks'
import {formatDate} from '../utils'

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

	return (
		<Layout className="relative markdown-content markdown-dark-supported">
			{post && <>
				<h1>{post.title}</h1>
				<time className="absolute top-0 text-xs text-slate-500 dark:text-slate-400 transition-opacity opacity-0">
					{formatDate(post.date, 'w, m d, Y')}
				</time>
				<div ref={refContent} dangerouslySetInnerHTML={{__html: post.content!}}></div>
			</>}
		</Layout>
	)
}
