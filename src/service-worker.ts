/// <reference lib="webworker" />
export type {}
declare const self: ServiceWorkerGlobalScope
const SW_VERSION = '%SW_VERSION%'

// @ts-ignore
const isDev = () => SW_VERSION === 'dev'

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
		return event.respondWith(fetch(request))
	}

	const swr = request.headers.get('x-swr')
	return event.respondWith(async function () {
		const cached = await caches.match(request)
		const fresh = fetch(request).then(resp => {
			if (resp.status < 400)
				caches.open(SW_VERSION).then(cache => cache.put(request, resp.clone()))
			if (swr && cached && resp.status < 400)
				resp.clone().arrayBuffer().then(async (buf: ArrayBuffer) => {
					const client = await self.clients.get(event.clientId)
					client?.postMessage({type: 'SWR', path: url.pathname, buf}, [buf])
				})

			return resp.clone()
		})

		return cached ?? fresh
	}())
})
