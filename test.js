const config = require('./config.js');
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

var rigObj = []
if (config.rigs) {
    for(var r in config.rigs) {
        if(config.rigs.hasOwnProperty(r)) {
            let rig = config.rigs[r];
            if (rig.miners && Array.isArray(rig.miners)) {
                for(var i=0; i<rig.miners.length; i++) {
                    var miner = rig.miners[i];
                    if (miner.type === "claymore") {
                        var o = new Claymore(r, miner, config.refreshMs);
                        rigObj.push(o);
                    }
                }
            }
        }
    }
}


router.get('/', function (req, res) {
    res.json({ message: 'no rigs!! Need some websocket here right' });
});

app.use('/api', router);
app.listen(port);
logger.info("Listening on port: " + port);
