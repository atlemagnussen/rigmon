const config = require('./config.js');
const logger = require('./logger.js').default;
logger.debug('Booting');

const path = require('path');
const express = require('express');
const http = require('http');
const url = require('url');
const ws = require('ws');
const formatter = require('./miner/formatter.js');
const Claymore = require('./miner/claymore.js');
const Ewbf = require('./miner/ewbf.js');

// static server
const app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'web')));
const server = http.createServer(app);
// web socket
const wss = new ws.Server({ server });
wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    logger.trace("location: " + JSON.stringify(location));
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send(formatter.ws("config", config));
});

var miners = [];
if (config.rigs) {
    for(var r in config.rigs) {
        if(config.rigs.hasOwnProperty(r)) {
            let rig = config.rigs[r];
            if (rig.miners && Array.isArray(rig.miners)) {
                for(var i=0; i<rig.miners.length; i++) {
                    var minerConf = rig.miners[i];
                    logger.info(`rig ${r}-${minerConf.no} ${minerConf.type}`);
                    if (minerConf.type === "claymore") {
                        var claymoreMiner = new Claymore(r, minerConf, wss);
                        miners.push(claymoreMiner);
                    } else if (minerConf.type === "ewbf") {
                        var ewbfMiner = new Ewbf(r, minerConf, wss);
                        miners.push(ewbfMiner);
                    }
                }
            }
        }
    }
}

// api
router.get('/', function (req, res) {
    res.json({ message: 'This is the api' });
});

router.get('/config', function (req, res) {
    res.json(config);
});

router.get('/status', function(req, res) {
    var minersData = [];
    miners.forEach(function(miner) {
        var data = miner.latestData;
        minersData.push(data);
    });
    res.json(minersData);
});

app.use('/api', router);
server.listen(config.port, function listening() {
    logger.info('Listening on %d', server.address().port);
});
