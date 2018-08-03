const VERSION = '1.0.4';

const CACHE_NAME = 'DeviceRentalSystem_' + VERSION;

const ROOT = "./";
const CACHE_FILE = [
    ROOT,
    ROOT + 'index.html',
    ROOT + 'assets/js/bundle.js',
    ROOT + 'assets/js/vendor.js'
];
const DEVICE_IMAGES = [
    ROOT + "assets/images/device/android_AQUOS_SERIE.png",
    ROOT + "assets/images/device/android_HUAWEI_P10_lite.png",
    ROOT + "assets/images/device/android_URBANO_L03.png",
    ROOT + "assets/images/device/android_Xperia_AX_SO-01E.png",
    ROOT + "assets/images/device/feature_202SH.png",
    ROOT + "assets/images/device/feature_AQUOS_SHOT.png",
    ROOT + "assets/images/device/feature_GRANTIA.png",
    ROOT + "assets/images/device/iPad_4.png",
    ROOT + "assets/images/device/iPad_Air.png",
    ROOT + "assets/images/device/iphone_5_s.png",
    ROOT + "assets/images/device/iphone_5.png",
    ROOT + "assets/images/device/iphone_6_plus.png",
    ROOT + "assets/images/device/iphone_6.png",
    ROOT + "assets/images/device/other_Surface_Pro_3.png"
];
const FONTS = [
    ROOT + "assets/font/NotoSansCJKjp-DemiLight.woff",
    ROOT + "assets/font/NotoSansCJKjp-DemiLight.woff2",
    ROOT + "assets/font/NotoSansCJKjp-Bold.woff",
    ROOT + "assets/font/NotoSansCJKjp-Bold.woff2",
    ROOT + "assets/font/RobotoMono-Regular.woff",
    ROOT + "assets/font/RobotoMono-Regular.woff2",
    ROOT + "assets/font/RobotoMono-Bold.woff",
    ROOT + "assets/font/RobotoMono-Bold.woff2"
];

let CACHE = CACHE_FILE.concat(DEVICE_IMAGES);
    CACHE = CACHE.concat(FONTS);

let CheckFile =[];
for (var i = 0; i < CACHE.length; i++) {
    let url = CACHE[i];
        url = url.split("/");
        url = url[ url.length - 1 ];
    CheckFile.push(url)
}

self.addEventListener('install', function(event) {

    console.log('ServiceWorker installing');

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('ServiceWorker Caching app shell');
            return cache.addAll(CACHE).then(() => {
                self.skipWaiting();
            });
        })
    );

});

self.addEventListener('activate', function(event) {

    console.log('ServiceWorker activating');

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME) {
                    console.log('ServiceWorker removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();

});

self.addEventListener('fetch', function(event) {

    let url = event.request.url;
        url = url.split("/");
        url = url[ url.length - 1 ];

    if( CheckFile.indexOf(url) != -1 ) {

        event.respondWith(
            caches.match(event.request)
            .then(function(response) {

                if (response) {
                    // return cached file
                    // console.log('cache fetch: ' + event.request.url);
                    return response;
                }

                // make network request
                return fetch(event.request)
                .then(newreq => {
                    // console.log('network fetch: ' + event.request.url);
                    if (newreq.ok) cache.put(event.request, newreq.clone());
                    return newreq;
                })
                // app is offline
                .catch(() => {
                    console.log("offline");
                });
            })

        );

    }

});
