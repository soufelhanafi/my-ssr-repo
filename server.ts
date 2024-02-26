/* eslint-disable no-underscore-dangle */
import 'zone.js/node';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';

import AppServerModule from './src/main.server';

const domino = require('domino-ext');
import 'localstorage-polyfill';
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/maritymain/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');
  const win = domino.createWindow(indexHtml.toString());
  global.window = win;
  global.document = win.document;
  global.navigator = win.navigator;
  // global.crypto = win.crypto;

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res) => {
    try {
      res.render('index', {
        req,
        res,
        providers: [
          {
            provide: 'REQUEST',
            useValue: req,
          },
          {
            provide: 'RESPONSE',
            useValue: res,
          },
        ],
      });
    } catch (e: any) {
      console.log(e.message);
      res.send('Error');
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 8080;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on ${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __non_webpack_require__: NodeRequire;

const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default AppServerModule;
