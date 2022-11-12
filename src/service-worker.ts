/// <reference lib="webworker" />

export type {}
declare const self: ServiceWorkerGlobalScope
const SW_VERSION = '%SW_VERSION%'

// @ts-ignore
const isDev = () => SW_VERSION === 'dev'
const cachedOnlyOnce = (path: string) => {
	const file = path.split('/').pop() ?? ''

	// favicon.ico / manifest.json
	if (['favicon.ico', 'manifest.json'].includes(file)) {
		return true
	}

	// [name].[hash].[js,json,css]
	if (/.+\.[a-z0-9]{8}\.(js|json|css)$/.test(file)) {
		return true
	}

	// *-[w]x[h].png at root path
	if (/^\/?[^\/]+-\d+x\d+\.png$/.test(path)) {
		return true
	}

	return false
}
const buffEqual = (a: ArrayBuffer, b: ArrayBuffer) => {
	if (a.byteLength !== b.byteLength) return false

	const dv1 = new Int8Array(a)
	const dv2 = new Int8Array(b)
	for (let i = 0; i < a.byteLength; i++) {
		if (dv1[i] != dv2[i]) return false
	}
	return true
}

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(async function () {
		await self.clients.claim()
		await caches.keys()
			.then(keys => keys.filter(key => key !== SW_VERSION))
			.then(keys => Promise.all(keys.map(key => caches.delete(key))))
	}())
})

const hostname = new URL(self.registration.scope).hostname

self.addEventListener('fetch', (event: FetchEvent) => {
	if (isDev()) {
		return
	}

	const {request} = event
	const url = new URL(event.request.url)
	if (url.hostname !== hostname) {
		return
	}

	return event.respondWith(async function () {
		const cached = await caches.match(request)
		if (cached && cachedOnlyOnce(url.pathname)) {
			return cached
		}

		const swr = request.headers.get('x-swr') && cached?.clone()
		const fresh = fetch(request).then(resp => {
			if (resp.status >= 400)
				return resp

			// Put a copy of the response in the cache.
			const _resp = resp.clone()
			caches.open(SW_VERSION).then(cache => cache.put(request, _resp))

			// If the response is an SWR response, send it to the client.
			if (swr)
				resp.clone().arrayBuffer().then(async (buf: ArrayBuffer) => {
					if (buffEqual(buf, await swr.arrayBuffer())) return
					const client = await self.clients.get(event.clientId)
					client?.postMessage({type: 'SWR', version: SW_VERSION, path: url.pathname, buf}, [buf])
				})

			return resp
		})
		return cached ?? fresh
	}())
})
