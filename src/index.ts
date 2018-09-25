import cluster from 'cluster';
import express from 'express';
import fs from 'fs';
import { cpus } from 'os';
import loadConfig from './config';
import monitor from './monitor';
import setupRoutes from './spacechop';

// read initial config.
let config = loadConfig();
// create server.
const app = express();
app.disable('x-powered-by');

// create and setup router.
let router = express.Router();
// Setup routes for the SpaceChop service.
setupRoutes(config, router, monitor);
// Enable reloading of routes runtime by using a simple router that we switch out.
app.use((req, res, next) => {
  // pass through requests to the router.
  router(req, res, next);
});

if (cluster.isMaster) {
  const workers = cpus().length;
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
} else {
  // Re-Initialize routes when new config is loaded.
  fs.watchFile('/config.yml', { interval: 1000 }, async () => {
    console.info('Reloading config...');
    router = express.Router();
    config = loadConfig();
    setupRoutes(config, router, monitor);
  });

  app.get('/_health', (_, res) => {
    res.end(monitor.getMetrics());
  });

  // start listening on port.
  app.listen(3000, () => console.info('Listening on port 3000'));
}
