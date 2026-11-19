# AGENTS.md

## Project Overview
DayTech is a static HTML website (laptop store) with no build step, no backend, and no external dependencies. It consists of HTML pages, CSS stylesheets, and images.

## Running the App
- Two services in `docker-compose.base44.yml`:
  - `web` — `nginx:alpine` on host port 3000, serving the static site from `/usr/share/nginx/html` and proxying `/api/` to the API service (`nginx.conf` is mounted over the default server block).
  - `api` — `node:22-alpine` running `api/server.js` with `node --watch` (no dependencies, no npm install needed).
- Source is bind-mounted read-only, so edits appear instantly; the API restarts itself on file changes.
- API routes: `GET /api/health`, `GET /api/products`, `GET /api/products/:id`. Product data lives in `api/products.json`.
- Healthchecks use `127.0.0.1` (not `localhost`): inside the containers `localhost` resolves to IPv6 and the servers listen on IPv4 only.
- No build step, no migrations, no seeds.

## Verification
- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` should return 200.
- Entry point is `index.html`. Other pages: about.html, contact.html, login.html, registration.html, buy.html, payment.html, products.html, and brand pages (dell.html, asus.html, lenovo.html, rog.html, vivo.html).
- `products.html` renders its cards client-side from `GET /api/products`; if it shows "Sorry, products could not be loaded", check the `api` service health and that nginx is proxying `/api/`.

## Notes
- The repo root directory permissions must be world-readable (755) for nginx to serve files. If a 403 Forbidden appears, run `chmod 755 . && chmod -R a+rX .`.
- No external services or credentials are required.
