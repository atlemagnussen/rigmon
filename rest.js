const logger = require('./logger.js');
var http = require('http');
var Rig = require('./rig.js');

class Rest extends Rig {
    constructor(rigName, config, request, refreshMs) {
        super(rigName, config.no, refreshMs);
        this.on('refresh', (id) => {
            logger.debug(`Refresh ${id}`);
            this.get();
        });
        this.config = config;
        this.baseUrl = `http://${config.host}:${config.port}`;
        this.request = request;
        this.requestUrl = `${this.baseUrl}/${this.request}`;
    }

    get() {
        logger.debug(this.requestUrl);
        http.get(this.requestUrl, (res) => {
            const {
                statusCode
            } = res;
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
            }
            if (error) {
                logger.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    logger.debug(parsedData);
                    logger.trace("Http Data arrived");
                    this.emit('data', parsedData);
                } catch (e) {
                    logger.error(e.message);
                }
            });
        }).on('error', (e) => {
            logger.error(`Got error: ${e.message}`);
        });
    }
}

module.exports = Rest;
