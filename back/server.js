const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);

// nous affiche le port écouté par le serveur;
console.log(`Node server on PORT: ${server.address().port}`);