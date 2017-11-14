const logger = require('./logger.js');
var http = require('http');
var Rig = require('./rig.js');

class Rest extends Rig{
    constructor(rigName, config, request, refreshMs) {
        super(rigName, refreshMs);
        this.on('refresh', (name) => {
            logger.debug(`Refresh ${name}`);
            this.get();
        });
        this.config = config;
        this.baseUrl = `http://${config.host}:${config.port}`;
        this.request = request;
    }

    get() {
        logger.debug(`${this.baseUrl}/${this.request}`);
    }
}

module.exports = Rest;
