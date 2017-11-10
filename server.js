var path = require('path');
var express = require('express');
const net = require('net');

// static server
var port = 8088;
var app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res) {
  res.sendfile(__dirname + './client/index.html');
});

// config file
const config = require('./config.json');
// logger
const log4js = require('log4js');
log4js.configure(config.log);

const logger = log4js.getLogger('rigmon');
logger.debug('Booting');

if (config.rigs) {
    let rigs = 0;
    let miners = 0;
    for(var r in config.rigs) {
        if(config.rigs.hasOwnProperty(r)) {
            rigs++;
            let rig = config.rigs[r];
            if (rig.miners && Array.isArray(rig.miners)) {
                miners += rig.miners.length;
            }
        }
    }

    console.log("rigs:" + rigs + ", miners: " + miners);
    if (miners === 0) {
        logger.error("Rigs but no miners, quit!");
        return;
    }

} else {
    logger.error("No rigs defined, exit!");
    return;
}

logger.info("made it past the checks, let's go!");

router.get('/', function (req, res) {
    res.json({ message: 'no rigs!! Need some websocket here right' });
});

app.use('/api', router);
app.listen(port);
logger.info("Listening on port: " + port);
