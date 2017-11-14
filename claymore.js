const logger = require('./logger.js');
const Rpc = require('./rpc.js');
var moment = require('moment');
require("moment-duration-format");

class Claymore extends Rpc.Tcp {
    constructor(rigName, rigNo, config, refreshMs, wss) {
        var request = JSON.stringify({
                        "id": rigNo,
                        "jsonrpc":"2.0",
                        "method":"miner_getstat1"
                    });
        logger.debug(request);
        super(rigName, config, request, refreshMs);
        this.wss = wss;
        this.on('data', (data) => {
            if (this.wss) {
                var d = this.transform(data);
                logger.debug(d);
                logger.debug("clients: " + this.wss.clients.size);
                this.wss.clients.forEach(function each(ws) {
                    logger.debug("ws.readyState: " + ws.readyState);
                    ws.send(d);
                });
            }
        });
    }
    transform(data) {
        var result = data[this.rigName].result;
        var standard = {
            id: this.rigName,
            version: result[0],
            uptime: moment.duration(parseInt(result[1]), 'minutes').format('d [days,] hh:mm'),
            totalHash: result[2].split(';'),
            detailHash: result[3].split(';'),
            totalHashSecondary: result[4].split(';'),
            detailHashSecondary: result[5].split(';'),
            tempSpeed: result[6].split(';'),
            miningPool: result[7],
            invalidShares: result[8].split(';')
        };
        return JSON.stringify(standard, null, 4);
    }
}

module.exports = Claymore;
