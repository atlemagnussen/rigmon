const logger = require('../logger.js').getLogger("tcp");
const config = require('../config.js');
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

        this.socket = new net.Socket();
        this.socket
        .setTimeout(config.minerTimeout)
        .on('data', (data) => {
            this.handleData(data);
        })
        .on('close', () => {
            logger.trace(`${this.rigUniqueId}:: close`);
        })
        .on('timeout', () => {
            var timeoutMsg = `timeout (${config.minerTimeout} ms)`;
            logger.error(-`${this.rigUniqueId}:: ${timeoutMsg}`);
            this.socket.destroy();
            this.emit('minerError', timeoutMsg);
        })
        .on('error', (error) => {
            logger.error(`${this.rigUniqueId}:: error ${error}`);
            this.emit('minerError', error);
        })
        .on('connect', () => {
            logger.trace(`${this.rigUniqueId}:: connected to ${this.socket.remoteAddress} ${this.socket.remotePort}`);
            this.socket.write(request + '\n');
        });
    }

    handleData(data) {
        try {
            var parsedData = JSON.parse(data);
            logger.trace(`${this.rigUniqueId}:: data`);
            this.emit('data', parsedData);
        } catch (e) {
            logger.error(`${this.rigUniqueId}:: error parsing data ${e}`);
            this.emit('minerError', e);
        }
    }

    connect() {
        logger.trace(`${this.rigUniqueId}:: try connect ${this.config.host}:${this.config.port}`);
        this.socket.connect(this.config.port, this.config.host);
    }
}

module.exports = {
    Tcp: Tcp
};
