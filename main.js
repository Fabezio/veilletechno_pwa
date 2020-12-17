
console.log('hello depuis main')
const technosDiv = document.querySelector('#technos')

function loadTechnologies (technos) {
  fetch('http://localhost:3001/technos')
    .then(response => {
      response.json()
        .then(technos => {
          const allTechnos = technos.map(t => `<dl><dt>${t.name}</dt> <dd class="ml-2">${t.description} <br><a class="" href="${t.url}">${t.url.split('https://').join('')}</a></dd> </dl>    `)
            .join('')

          technosDiv.innerHTML = allTechnos
        })
    })
    .catch(console.error)
}

loadTechnologies(technos)

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js')
    .then(
      () => console.log('service worker trouvé')
    )
    .catch(err => console.error())
}

const veilletech = 'veille-techno'
if (window.caches) {
  console.log('cache trouvé')
  // caches.open(veilletech).then((cache) => {
  //     cache.addAll([
  //         'index.html',
  //         'style.css',
  //         'main.js',
  //     ])
  // })
  // caches.keys().then(console.log)
} else {
  console.log('pas de cache?')
}

// caches.open('other-caches')
