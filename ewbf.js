const logger = require('./logger.js');
var Rest = require('./rest.js');
const formatter = require('./formatter.js');

class Ewbf extends Rest {
    constructor(rigName, config, refreshMs, wss) {
        var request = "getstat";
        logger.trace(request);
        super(rigName, config, request, refreshMs, wss);
        this.wss = wss;
        this.formatter = formatter.ewbf;
    }
}

module.exports = Ewbf;
