const logger = require('./logger.js');
var net = require('net');
var Rig = require('./rig.js');

class Tcp {
    constructor(rigName, config, req, refreshMs) {
        this.config = config;

        this.rig = new Rig(rigName, refreshMs)
        .on('refresh', (name) => {
            logger.debug(`Refresh ${name}`);
            this.connect();
        });

        this.socket = new net.Socket()
        .on('data', function(data) {
            var d = JSON.parse(data);
            logger.debug(`Refresh ${JSON.stringify(d)}`);
        })
        .on('close', function() {
            console.log('close');
        })
        .on('timeout', function() {
            console.log('timeout');
        })
        .on('error', function() {
            console.log('error');
        })
        .on('connect', function() {
            logger.debug(`: connected to ${this.remoteAddress} ${this.remotePort}`);
            this.write(req + '\n');
        });
    }

    connect() {
        logger.debug(`connect ${this.config.host}:${this.config.port}`);
        this.socket.connect(this.config.port, this.config.host);
    }
}

module.exports = {
    Tcp: Tcp
};
