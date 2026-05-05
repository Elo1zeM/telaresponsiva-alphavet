const CACHE_NAME = 'alpha-vet-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/img/logo.png',
    './assets/img/whatsapp.png',
    './assets/img/logopwa.png',
    './assets/img/logopwa512.png',
    './assets/img/bene.webp',
    './assets/img/bravecto.webp',
    './assets/img/castra.webp',
    './assets/img/furolisin.webp',
    './assets/img/happydog.webp',
    './assets/img/predd.webp',
    './assets/img/superfood.webp'
];

// Instala o Service Worker e armazena os arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Alpha Vet: Arquivos em cache com sucesso! 🐾');
            return cache.addAll(ASSETS);
        })
    );
});

// Responde a partir do cache ou busca na rede
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});