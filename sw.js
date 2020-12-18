const cacheName = "veille-techno"
function shiftStr(obj, str) {
    return obj.split(`https://${str}`).join('')
}

console.log('Résumé SW: ')
self.addEventListener('install', evt => {
    // console.log("install: " + evt)
    caches.open(cacheName).then(cache => {
        cache.addAll([
            "index.html",
            "main.js",
            "contact.html",
            "contact.js",
            "new-techno.js",
            "new-techno.html",
            "style.css"
        ])
    })
})
self.addEventListener('activate', evt => {
    console.log("active: " + evt)
})
self.addEventListener('fetch', evt => {
    if (!navigator.onLine) {
        const headers = { headers: { "Content-Type": "text/html; charset=utf-8" } }
        evt.respondWith(new Response("<h1  class='alert alert-error'>Pas de connexion </h1><p>Veuillez vous reconnecter<p> ", headers))
    }
    console.log('url:', evt.request.url)
    evt.respondWith(
        caches.match(evt.request).then(res => {
            if (res) {
                console.log(`fetched url: ${evt.request.url} ${res}`)
                // console.log(res)
                return res
            }
            return fetch(evt.request).then(newRes => {
                console.log(`url récupérée sur le réseau puis mise en cache: ${evt.request.url} ${newRes}`)
                caches.open(cacheName).then(cache => cache.put(evt.request, newRes))
                return newRes.clone()
            })
        })
    )
})

