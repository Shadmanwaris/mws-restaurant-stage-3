console.log("Registered Successfully")

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
              "/",
              "/index.html",
              "/restaurant.html",
              "/js/dbhelper.js",
              "/js/main.js",
              "/restaurant.html",
              "/img/1.jpg",
              "/img/2.jpg",
              '/img/3.jpg',
              '/img/4.jpg',
              '/img/5.jpg',
              '/img/6.jpg',
              '/img/7.jpg',
              '/img/8.jpg',
              '/img/8.jpg',
              '/img/10.jpg',
              '/manifest.json',
              'img/icons/icon-72x72.png',
              'img/icons/icon-96x96.png',
              'img/icons/icon-128x128.png',
              'img/icons/icon-144x144.png',
              'img/icons/icon-152x152.png',
              'img/icons/icon-192x192.png',
              'img/icons/icon-384x384.png',
              'img/icons/icon-512x512.png',
              '/css/styles.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            if(resp) {
                console.log('Found', event.request, 'in cache')
                return resp;
            }
            else {
                console.log("Not Found", event.request, "still fetching...");
                return fetch(event.request).
                then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache){
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                }).catch(function(err) {
                    console.err(err);
                })
            }
        })
    );
});


