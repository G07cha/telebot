'use strict';

const
  fs = require('fs'),
  url = require('url'),
  bodyParser = require('body-parser'),
  app = require('express')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = (bot, opt) => {

  const token = '/' + bot.token;

  let
    host = opt.host || '0.0.0.0',
    port = opt.port || 443;

  // Request listener
  app.post(token, function(req, res) {
    bot.receiveUpdates([req.body]);
    res.sendStatus(200);
  });

  // Start server
  app.listen(port, x => {
    console.log(`[bot.webhook] started server on "${ host }:${ port }"`);
  });
};
