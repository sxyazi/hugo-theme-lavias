const r="17173c94";self.addEventListener("install",t=>{t.waitUntil(self.skipWaiting())});self.addEventListener("activate",t=>{t.waitUntil(async function(){await self.clients.claim(),await caches.keys().then(e=>e.filter(s=>s!==r)).then(e=>Promise.all(e.map(s=>caches.delete(s))))}())});const h=new URL(self.registration.scope).hostname;self.addEventListener("fetch",t=>{const{request:e}=t,s=new URL(t.request.url);if(s.hostname!==h)return;const l=e.headers.get("x-swr");return t.respondWith(async function(){const a=await caches.match(e),o=fetch(e).then(n=>(n.status<400&&caches.open(r).then(c=>c.put(e,n.clone())),l&&a&&n.status<400&&n.clone().arrayBuffer().then(async c=>{const i=await self.clients.get(t.clientId);i==null||i.postMessage({type:"SWR",version:r,path:s.pathname,buf:c},[c])}),n.clone()));return a!=null?a:o}())});
