# Notes de récupération

Sources extraites le 2026-08-06 depuis le serveur de dev Vite exposé par la
prévisualisation : https://little-zoos-bet.freebuff.dev

## Méthode
1. Le preview FreeBuff expose le serveur Vite en mode développement
   (`/src/main.tsx`, `/package.json`, ...).
2. Les modules TS/TSX servis contiennent une sourcemap inline
   (`//# sourceMappingURL=data:application/json;base64,...`) : le champ
   `sourcesContent` contient le **fichier source original exact** (imports
   `@/...`, commentaires, etc.). Il a été extrait et réécrit.
3. `src/index.css` a été récupéré en version brute (`?raw`) : directives
   Tailwind v4 intactes.
4. Quelques fichiers ont été nettoyés : imports Vite pré-bundlés
   (`/node_modules/.vite/deps/...`) retranscrits en imports normaux,
   scripts injectés par Vite (`/@react-refresh`, `/@vite/client`) et par le
   proxy Cloudflare retirés de `index.html`, fallback HTML retiré de
   `robots.txt`.

## Contenu
- Code source complet du frontend : `src/` (pages, composants, hooks, lib).
- Configuration : `package.json`, `vite.config.ts`, `tsconfig*.json`,
  `eslint.config.js`, `components.json`, `manifest.webmanifest`.
- `src/convex/_generated/api.js` : généré par Convex (régénérer avec
  `npx convex dev`).
- Le backend Convex (`convex/`) et `node_modules/` ne sont pas inclus :
  ils ne sont pas servis par le serveur Vite.

## Pour exécuter
```bash
bun install
cp .env.example .env.local   # valeurs de l'API Convex existante
bun run dev
```
