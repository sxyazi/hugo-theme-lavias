import {usePost} from '../hooks/usePost'
import {Layout} from '../components/Layout'
import {useEffect, useRef} from 'preact/hooks'
import {formatDate} from '../utils'
import {useTitle} from '../hooks'

export const Post = () => {
	const post = usePost()
	const refContent = useRef<HTMLDivElement>(null)
	useTitle(post?.title)

	useEffect(() => {
		const highlight = (content: HTMLDivElement) => {
			const langAlias: { [key: string]: string } = {'pgsql': 'sql', 'shell': 'bash', 'golang': 'go'}

			for (const element of content.querySelectorAll('pre>code')) {
				if (!element.className.startsWith('language-')) {
					element.className = 'language-plaintext'
					continue
				}

				// Line highlighting
				const regex = /(lang(?:uage)?-.+){([\d,-]+)}/
				const lines = regex.exec(element.className)
				if (lines) {
					(element.parentNode as HTMLPreElement).setAttribute('data-line', lines[2])
					element.className = element.className.replace(regex, '$1')
				}

				const lang = element.className.substring(9)
				if (lang in langAlias) {
					element.className = `language-${langAlias[lang]}`
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
