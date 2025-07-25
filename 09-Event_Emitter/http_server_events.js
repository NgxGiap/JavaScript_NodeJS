const http = require('http');
  const server = http.createServer();

  server.on('request', (req, res) => {
      console.log(`Request received: ${req.method} ${req.url}`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
  });

  server.listen(3000, () => {
      console.log('Server running on port 3000');
  });