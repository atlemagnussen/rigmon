const logger = require('./logger.js');
var Rest = require('./rest.js');

class Ewbf extends Rest {
    constructor(rigName, rigNo, config, refreshMs, wss) {
        var request = "getstat";
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
            id: this.rigName,
            version: result[0],
            runningMinutes: result[1],
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

module.exports = Ewbf;
