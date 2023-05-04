import { useEffect, useState } from "preact/hooks"

type Count = {
	page: number
	total: number
}

export const useCount = (id?: string) => {
	const [count, setCount] = useState<Count | null>(null)

	useEffect(() => {
		if (!id) return

		const params = new URLSearchParams({ id, domain: location.hostname })
		fetch(`https://core-services.vercel.app/count?${params.toString()}`)
			.then(resp => {
				if (resp.status !== 200) throw new Error(resp.statusText)
				return resp.json() as Promise<Count>
			}).then(resp => {
				setCount(resp)
			}).catch(e => {
				console.error(e)
			})
	}, [id])

	return count
}

