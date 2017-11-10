var path = require('path');
var express = require('express');
const Rpc = require('./rpc.js');
const log4js = require('log4js');

// config file
const config = require('./config.json');
// logger

log4js.configure(config.log);

const logger = log4js.getLogger('rigmon');
logger.debug('Booting');

// static server
var port = 8088;
var app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res) {
  res.sendfile(__dirname + './client/index.html');
});


var req = '{"id":0,"jsonrpc":"2.0","method":"miner_getstat1"}';
var rig2 = {
    "host": "57.57.57.6",
    "port": 3333
};
var rig3 = {
    "host": "57.57.57.7",
    "port": 3333
};
var rigs = {
    r3: new Rpc.Tcp(rig3, req),
    r2: new Rpc.Tcp(rig2, req)
};

router.get('/', function (req, res) {
    res.json({ message: 'no rigs!! Need some websocket here right' });
});

app.use('/api', router);
app.listen(port);
logger.info("Listening on port: " + port);
