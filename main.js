console.log('hello depuis main')
const technosDiv = document.querySelector('#technos')

function loadTechnologies (technos) {
  fetch('http://localhost:3001/technos')
    .then(response => {
      response.json().then(technos => {
        const allTechnos = technos
          .map(
            t =>
              `<dl><dt>${t.name}</dt> <dd class="ml-2">${
                t.description
              } <br><a class="" href="${t.url}">${t.url
                .split('https://')
                .join('')}</a></dd> </dl>    `
          )
          .join('')

        technosDiv.innerHTML = allTechnos
      })
    })
    .catch(console.error)
}

loadTechnologies(technos)

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => console.log('service worker trouvé'))
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

if (window.Notification && window.Notification !== 'denied') {
  Notification.requestPermission(perm => {
    if (perm === 'granted') {
      const options = {
        body: 'je suis le corps de la notification',
        icon: 'icon/apple-icon-76x76-dunplab-manifest-32518.png'
      }
      const notif = new Notification('Ceci est une notification ', options)
    } else {
      alert('notifications refusées')
    }
  })
}

// caches.open('other-caches')
