const logger = require('./logger.js');
const Rpc = require('./rpc.js');
const formatter = require('./formatter.js');

class Claymore extends Rpc.Tcp {
    constructor(rigName, config, refreshMs, wss) {
        var request = JSON.stringify({
                        "id": config.no,
                        "jsonrpc":"2.0",
                        "method":"miner_getstat1"
                    });
        logger.trace(request);
        super(rigName, config, request, refreshMs);
        this.wss = wss;
        this.formatter = formatter.claymore;
    }
}

module.exports = Claymore;
