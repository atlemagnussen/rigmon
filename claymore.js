const logger = require('./logger.js');
const Rpc = require('./rpc.js');

class Claymore extends Rpc.Tcp {
    constructor(rigName, config, refreshMs) {
        var request = '{"id":0,"jsonrpc":"2.0","method":"miner_getstat1"}';
        super(rigName, config, request, refreshMs);
        this.on('data', () => {
            logger.trace("Claymore data arrived");
        });
    }
}

module.exports = Claymore;
