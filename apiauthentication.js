const http = require('http');
const app = require('./app');

// Server Start
const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
