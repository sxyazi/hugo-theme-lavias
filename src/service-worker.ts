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

self.addEventListener('fetch', (event: FetchEvent) => {
	const {request} = event
	if (isDev()) {
		return event.respondWith(fetch(request))
	}

	const fresh = fetch(request).then(resp => {
		if (resp.status < 400)
			caches.open(SW_VERSION).then(cache => cache.put(request, resp))
		return resp.clone()
	})
	return event.respondWith(caches.match(request).then(resp => resp ?? fresh))
})
