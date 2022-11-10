/// <reference lib="webworker" />

export type {}
declare const self: ServiceWorkerGlobalScope
const SW_VERSION = '%SW_VERSION%'

// @ts-ignore
const isDev = () => SW_VERSION === 'dev'
const cachedOnlyOnce = (path: string) => {
	path = path.split('/').pop() ?? ''  // filename

	// manifest.json
	if (path === 'manifest.json') {
		return true
	}
	// favicon*.png
	if (path.startsWith('favicon') && path.endsWith('.png')) {
		return true
	}
	// [name].[hash].[js,json,css]
	if (/.+\.[a-z0-9]{8}\.(js|json|css)$/.test(path)) {
		return true
	}
	return false
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

	const swr = request.headers.get('x-swr')
	return event.respondWith(async function () {
		const cached = await caches.match(request)
		if (cached && cachedOnlyOnce(url.pathname)) {
			return cached
		}

		const fresh = fetch(request).then(resp => {
			if (resp.status < 400)
				caches.open(SW_VERSION).then(cache => cache.put(request, resp.clone()))
			if (swr && cached && resp.status < 400)
				resp.clone().arrayBuffer().then(async (buf: ArrayBuffer) => {
					const client = await self.clients.get(event.clientId)
					client?.postMessage({type: 'SWR', version: SW_VERSION, path: url.pathname, buf}, [buf])
				})

			return resp.clone()
		})
		return cached ?? fresh
	}())
})
