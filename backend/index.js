const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus().length;
if(cluster.isPrimary || cluster.isMaster) {
  for(let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (signal) console.log(signal)
    if (code !== 0) console.log(code)
  });

}else {

  const express = require('express');
  const cors = require('cors');
  const morgan = require('morgan');
  require('dotenv').config();

  const app = express();
  const port = process.env.PORT || 5000;

  app.use(cors({
    origins: '*'
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  const imageRouter = require('./router/');

  app.use('/', imageRouter);

  app.listen(
    port, 
    () => console.log('server listening on port ' + port)
  );

}
