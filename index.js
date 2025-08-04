// index.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Wordixon search engine backend is running!');
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
