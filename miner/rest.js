const logger = require('../logger.js').getLogger("rest");
var http = require('http');
var Miner = require('./miner.js');

class Rest extends Miner {
    constructor(rigName, minerConfig, request) {
        super(rigName, minerConfig.no);
        this.on('refresh', (id) => {
            logger.debug(`Refresh ${id}`);
            this.get();
        });
        this.config = minerConfig;
        this.baseUrl = `http://${minerConfig.host}:${minerConfig.port}`;
        this.request = request;
        this.requestUrl = `${this.baseUrl}/${this.request}`;
    }

    get() {
        logger.trace(this.requestUrl);
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
                    logger.trace(parsedData);
                    logger.trace("Http Data arrived");
                    this.emit('data', parsedData);
                } catch (e) {
                    logger.error(e.message);
                }
            });
        }).on('error', (e) => {
            this.emit('minerError', e.message);
            logger.error(`Got error: ${e.message}`);
        });
    }
}

module.exports = Rest;
