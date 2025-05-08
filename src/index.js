const Server = require('./server.js');
const {connectDB} = require('./models/sqlite/config/db.js');


connectDB().then(() => {
  console.log('Base de datos conectada.');
}).catch((error) => {
  console.error('Error conectando a la base de datos:', error);
});
const server = new Server("pug");

server.listen();