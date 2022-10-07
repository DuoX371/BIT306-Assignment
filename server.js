const http = require('http');

//use express to create a server
const app = require('./backend/app');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`)
})
