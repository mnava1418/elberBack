import app from '../app'
import http from 'http'
import initFireBase from '../loaders/firebase.loader';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening = () => {
  console.info('Listening on port...', port)
}

const port = normalizePort('4040');

const startServer = () => {
  app.set('port', port);
  const server = http.createServer(app);

  //loaders
  initFireBase()

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

startServer()