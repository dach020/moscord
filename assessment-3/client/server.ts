import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync } from 'fs';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
const compression = require('compression');
import {join} from 'path';
import 'localstorage-polyfill';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const PORT = process.env.PORT || 4001;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

const domino = require('domino');
const templateA = readFileSync(join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(templateA);
global['localStorage'] = localStorage;
global['window'] = win;
global['Event'] = win.Event;
global['document'] = win.document;
global['Document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {
    req,
    res,
    providers: [
      { provide: 'REQUEST', useValue: (req) },
      { provide: 'RESPONSE', useValue: (res) },
    ]
  });
});

app.use(compression());
// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
