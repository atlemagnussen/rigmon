const logger = require('./logger.js').getLogger("tcp");
const config = require('./config.js');
var net = require('net');
var Miner = require('./miner.js');

class Tcp extends Miner{
    constructor(rigName, minerConfig, request) {
        super(rigName, minerConfig.no);
        this.on('refresh', (id) => {
            logger.debug(`Refresh ${id}`);
            this.connect();
        });
        this.config = minerConfig;

        this.socket = new net.Socket()
        .setTimeout(config.minerTimeout)
        .on('data', (data) => {
            var parsedData = JSON.parse(data);
            logger.trace("Tcp Data arrived");
            this.emit('data', parsedData);
        })
        .on('close', function() {
            logger.trace('close');
        })
        .on('timeout', function() {
            logger.error('timeout');
        })
        .on('error', function(error) {
            logger.error(error);
        })
        .on('connect', function() {
            logger.trace(`: connected to ${this.remoteAddress} ${this.remotePort}`);
            this.write(request + '\n');
        });
    }

    connect() {
        logger.trace(`connect ${this.config.host}:${this.config.port}`);
        this.socket.connect(this.config.port, this.config.host);
    }
}

module.exports = {
    Tcp: Tcp
};
