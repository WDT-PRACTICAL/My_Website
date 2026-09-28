# AGENTS.md

## Project Overview
DayTech is a static HTML website (laptop store) with no build step, no backend, and no external dependencies. It consists of HTML pages, CSS stylesheets, and images.

## Running the App
- Served via `docker-compose.base44.yml` using `nginx:alpine` on host port 3000.
- Source is bind-mounted read-only at `/usr/share/nginx/html`, so edits appear instantly on refresh — no rebuild needed.
- No build step, no migrations, no seeds.

## Verification
- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` should return 200.
- Entry point is `index.html`. Other pages: about.html, contact.html, login.html, registration.html, buy.html, payment.html, and brand pages (dell.html, asus.html, lenovo.html, rog.html, vivo.html).

## Notes
- The repo root directory permissions must be world-readable (755) for nginx to serve files. If a 403 Forbidden appears, run `chmod 755 . && chmod -R a+rX .`.
- No external services or credentials are required.
