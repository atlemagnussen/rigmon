const logger = require('../logger.js').getLogger("claymore");
const Rpc = require('./rpc.js');
const formatter = require('./formatter.js');

class Claymore extends Rpc.Tcp {
    constructor(rigName, minerConfig, wss) {
        var request = JSON.stringify({
                        "id": minerConfig.no,
                        "jsonrpc":"2.0",
                        "method":"miner_getstat1"
                    });
        logger.trace(request);
        super(rigName, minerConfig, request);
        this.wss = wss;
        this.formatter = formatter.claymore;
    }
}

module.exports = Claymore;
