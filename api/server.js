const http = require('node:http');
const products = require('./products.json');

const PORT = Number(process.env.PORT) || 4000;

function sendJson(res, status, body) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
}

function handle(req, res) {
    if (req.method !== 'GET') {
        return sendJson(res, 405, { error: 'Method not allowed' });
    }

    const { pathname } = new URL(req.url, 'http://localhost');

    if (pathname === '/api/health') {
        return sendJson(res, 200, { status: 'ok' });
    }

    if (pathname === '/api/products') {
        return sendJson(res, 200, { products });
    }

    const match = pathname.match(/^\/api\/products\/([^/]+)$/);
    if (match) {
        const product = products.find((p) => p.id === decodeURIComponent(match[1]));
        return product
            ? sendJson(res, 200, product)
            : sendJson(res, 404, { error: 'Product not found' });
    }

    sendJson(res, 404, { error: 'Not found' });
}

http.createServer(handle).listen(PORT, '0.0.0.0', () => {
    console.log(`DayTech API listening on http://0.0.0.0:${PORT}`);
});
