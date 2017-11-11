const config = require('./config.js');
const logger = require('./logger.js');
logger.debug('Booting');

const path = require('path');
const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const Claymore = require('./claymore.js');

// static server
const app = express();
var router = express.Router();
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res) {
  res.sendfile(__dirname + './client/index.html');
});
const server = http.createServer(app);
// web socket
const wss = new WebSocket.Server({ server });
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
                        var o = new Claymore(r, miner, config.refreshMs)
                        .on('data', (data) => {
                            logger.debug("clients: " + wss.clients.size);
                            wss.clients.forEach(function each(ws) {
                                logger.debug("ws.readyState: " + ws.readyState);
                                // if (ws.readyState === 3) {
                                //     logger.debug("closing ws");
                                //     return ws.terminate();
                                // }

                                ws.isAlive = false;
                                ws.ping('', false, true);
                                ws.send(JSON.stringify(data));
                            });
                        });
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
