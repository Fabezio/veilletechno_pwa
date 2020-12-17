console.log('Résumé SW: ')
self.addEventListener('install', evt => {
    console.log("install: " + evt)
})
self.addEventListener('activate', evt => {
    console.log("active: " + evt)
})
self.addEventListener('fetch', evt => {
    console.log('url:', evt.request.url)
})