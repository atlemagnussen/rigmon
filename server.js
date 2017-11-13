const config = require('./config.js');
const logger = require('./logger.js');
logger.debug('Booting');

const path = require('path');
const express = require('express');
const http = require('http');
const url = require('url');
const ws = require('ws');
const Claymore = require('./claymore.js');

// static server
const app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'app')));
app.get('/', function(req, res) {
    logger.debug("sending app index.html");
    res.sendfile(__dirname + './app/index.html');
});
const server = http.createServer(app);
// web socket
const wss = new ws.Server({ server });
wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    logger.debug("location: " + JSON.stringify(location));
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('Hello from server!');
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
                        var o = new Claymore(r, rig.no, miner, config.refreshMs, wss);
                        rigObj.push(o);
                    }
                }
            }
        }
    }
}

// api
router.get('/', function (req, res) {
    res.json({ message: 'no rigs!! Need some websocket here right' });
});

app.use('/api', router);
server.listen(config.port, function listening() {
    logger.info('Listening on %d', server.address().port);
});
