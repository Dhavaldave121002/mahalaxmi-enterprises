import http from 'http';

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 5173,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502);
    res.end('Dev server loading... Please refresh in a moment.');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(5174, () => {
  console.log('Proxy server running on port 5174 -> forwarding to 5173');
});
