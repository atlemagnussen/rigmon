// config file
const config = require('./config.json');
// logger
const logger = require('./logger.js');
logger.debug('Booting');


var path = require('path');
var express = require('express');
const Claymore = require('./claymore.js');


// static server
var port = 8088;
var app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res) {
  res.sendfile(__dirname + './client/index.html');
});


var rig2 = {
    "host": "57.57.57.6",
    "port": 3333
};
var rig3 = {
    "host": "57.57.57.7",
    "port": 3333
};
var rigs = {
    r2: new Claymore("rig2", rig2, 2000),
    r3: new Claymore("rig3", rig3, 5000)
};

router.get('/', function (req, res) {
    res.json({ message: 'no rigs!! Need some websocket here right' });
});

app.use('/api', router);
app.listen(port);
logger.info("Listening on port: " + port);
