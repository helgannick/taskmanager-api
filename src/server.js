import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!')
})

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
