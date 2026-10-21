/* Pré-visite usine — fonctionnement hors connexion.
   Augmenter VERSION à chaque nouveau déploiement de index.html. */
const VERSION = "previsite-v6";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./image-document/logo-ac.png",
  "./image-application/icone-installation-192.png",
  "./image-application/icone-installation-512.png"
];
const JSPDF = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    try { const r = await fetch(JSPDF, {mode:"cors"}); if (r.ok) await c.put(JSPDF, r); } catch (err) {}
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Page : réseau d'abord (mises à jour), cache si hors connexion
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await caches.open(VERSION); c.put("./index.html", r.clone());
        return r;
      } catch (err) {
        return (await caches.match("./index.html")) || Response.error();
      }
    })());
    return;
  }
  // Ressources (jsPDF, polices, icônes) : cache d'abord, puis réseau mis en cache
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r && (r.ok || r.type === "opaque")) { const c = await caches.open(VERSION); c.put(req, r.clone()); }
      return r;
    } catch (err) { return Response.error(); }
  })());
});
