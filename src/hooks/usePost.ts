import {useEffect, useState} from 'preact/hooks'
import {Tag} from './useTags'
import {useSource} from './useSource'

export type Post = {
	title: string
	link: string
	date: Date
	content?: string
	summary?: string
	tags?: Tag[]
}

export const usePost = () => {
	const [post, setPost] = useState<Post>()
	const source = useSource()

	useEffect(() => {
		if (!source.querySelector('#post')) {
			return setPost(undefined)
		}

		setPost({
			title: source.querySelector('#post > h1')?.textContent!,
			link: location.href,
			date: new Date(source.querySelector('#post > time')?.getAttribute('datetime')!),
			content: source.querySelector('#post > details')?.innerHTML!,
			tags: Array.from(source.querySelectorAll('#post > ul a')).map((a) => {
				return {name: a.textContent!, link: a.getAttribute('href')!}
			}),
		})
	}, [source])
	return post
}
