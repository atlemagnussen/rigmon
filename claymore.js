const logger = require('./logger.js');
const Rpc = require('./rpc.js');

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
            version: result[0],
            runningMinutes: result[1],
            totalHash: result[2],
            detailHash: result[3].split(';'),
            totalHashSecondary: result[4],
            detailHashSecondary: result[5].split(';'),
            tempSpeed: result[6].split(';'),
            miningPool: result[7],
            invalidShares: result[8].split(';')
        };
        return JSON.stringify(standard, null, 4);
    }
}

module.exports = Claymore;
