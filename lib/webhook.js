'use strict';

const
  fs = require('fs'),
  url = require('url'),
  bodyParser = require('body-parser'),
  app = require('express')(),
  http = require('http'),
  https = require('https');

app.use(bodyParser());

module.exports = (bot, opt) => {

  const token = '/' + bot.token;

  let
    host = opt.host || '0.0.0.0',
    port = opt.port || 443,
    key = opt.key && fs.readFileSync(opt.key),
    cert = opt.cert && fs.readFileSync(opt.cert);

  // Create server
  const server = key && cert ?
    https.createServer({ key, cert }, app) :
      http.createServer(app);

  // Request listener
  app.post(token, function(req, res) {
    bot.receiveUpdates([req.body]);
  });

  // Start server
  server.listen(port, host, x => {
    console.log(`[bot.webhook] started${ key ? ' secure' : ''} server on "${ host }:${ port }"`);
  });
};
