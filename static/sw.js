const o="d7b62639",u=t=>{const e=t.split("/").pop()??"";return!!(["favicon.ico","manifest.json"].includes(e)||/.+\.[a-z0-9]{8}\.(js|json|css)$/.test(e)||/^\/?[^\/]+-\d+x\d+\.png$/.test(t))},h=(t,e)=>{if(t.byteLength!==e.byteLength)return!1;const n=new Int8Array(t),s=new Int8Array(e);for(let r=0;r<t.byteLength;r++)if(n[r]!=s[r])return!1;return!0};self.addEventListener("install",t=>{t.waitUntil(self.skipWaiting())});self.addEventListener("activate",t=>{t.waitUntil(async function(){await self.clients.claim(),await caches.keys().then(e=>e.filter(n=>n!==o)).then(e=>Promise.all(e.map(n=>caches.delete(n))))}())});const d=new URL(self.registration.scope).hostname;self.addEventListener("fetch",t=>{const{request:e}=t,n=new URL(t.request.url);if(n.hostname===d)return t.respondWith(async function(){const s=await caches.match(e);if(s&&u(n.pathname))return s;const r=e.headers.get("x-swr")&&(s==null?void 0:s.clone()),f=fetch(e).then(a=>{if(a.status>=400)return a;const l=a.clone();return caches.open(o).then(i=>i.put(e,l)),r&&a.clone().arrayBuffer().then(async i=>{if(h(i,await r.arrayBuffer()))return;const c=await self.clients.get(t.clientId);c==null||c.postMessage({type:"SWR",version:o,path:n.pathname,buf:i},[i])}),a});return s??f}())});
