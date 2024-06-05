const debug = require('debug')('password-manager:server');

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
        // Named pipe
        return val;
    }
  
    if (port >= 0) {
        // Port number
        return port;
    }
  
    return false;
}
  
// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
  
    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
  
//Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = {normalizePort, onError, onListening};