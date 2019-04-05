/* Server.js - entry point of the applicatione run by typing nodemon server.js or npm run start
 * command previously set in package.json in scripts section
 *
 */
const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app)

// Start the server
server.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});