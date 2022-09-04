export const EMPTY_DIV = document.createElement('div')

export const parse = (s: string) => {
	const parser = new DOMParser()
	return parser.parseFromString(s, 'text/html')
}

export const preload = (url: string, priority: 'auto' | 'low' = 'low') => {
	// @ts-ignore
	fetch(url, {priority}).catch(console.info)
}

export const formatDate = (date: Date, format: string) => {
	return format.replace(/[Ymdw]/g, ($0) => {
		switch ($0) {
			case 'Y':
				return String(date.getFullYear())
			case 'm':
				return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]
			case 'd':
				return String(date.getDate())
			case 'w':
				return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
			default:
				return $0
		}
	})
}
