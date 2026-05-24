self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Simple fetch interception for PWA to be installable
  // A real offline cache strategy can be implemented here later
});
