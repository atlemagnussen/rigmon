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
const Xmrig = require('./miner/xmrig.js');

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
                for(var i=rig.miners.length-1; i>=0; i--) {
                    var minerConf = rig.miners[i];
                    logger.info(`rig ${r}-${minerConf.no} ${minerConf.type} - is enabled ${minerConf.enabled}`);
                    if (minerConf.enabled) {
                        if (minerConf.type === "claymore") {
                            var claymoreMiner = new Claymore(r, minerConf, wss);
                            miners.push(claymoreMiner);
                        } else if (minerConf.type === "ewbf") {
                            var ewbfMiner = new Ewbf(r, minerConf, wss);
                            miners.push(ewbfMiner);
                        } else if (minerConf.type === "xmrig") {
                            var xmrig = new Xmrig(r, minerConf, wss);
                            miners.push(xmrig);
                        }
                    } else {
                        rig.miners.splice(i, 1);
                    }
                }
            }
        }
    }
}

// api
router.get('/', (req, res) => {
    res.json({ message: 'This is the api' });
});

router.get('/config', (req, res) => {
    res.json(config);
});

router.get('/status', (req, res) => {
    var minersData = [];
    miners.forEach(function(miner) {
        var data = miner.latestData;
        minersData.push(data);
    });
    res.json(minersData);
});

router.get('/status/:id', (req, res) => {
    let minerData = null;
    let id = req.params.id;
    miners.forEach((miner) => {
        if (miner.rigUniqueId === id) {
            minerData = miner.latestData;
        }
    });
    if (minerData) {
        res.json(minerData);
    } else {
        res.status(404).send(`Rig id ${id} not found`);
    }
});

app.use('/api', router);
server.listen(config.port, () => {
    logger.info('Listening on %d', server.address().port);
});
