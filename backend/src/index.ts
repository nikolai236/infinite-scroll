import cluster from 'node:cluster';
import * as os from 'node:os';
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import router from './router/index.js';

const cpus = os.cpus().length;
config();

if(cluster.isPrimary || cluster.isMaster) {
  for(let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (signal) console.log(signal)
    if (code !== 0) console.log(code)
  });

} else {

  const app = express();
  const port = process.env.PORT || 5000;

  app.use(cors({
    origin: '*'
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));


  app.use('/', router);

  app.listen(
    port, 
    () => console.log('server listening on port ' + port)
  );

}
