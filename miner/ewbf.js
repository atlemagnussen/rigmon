const logger = require('../logger.js').getLogger("ewbf");
var Rest = require('./rest.js');
const formatter = require('./formatter.js');

class Ewbf extends Rest {
    constructor(rigName, minerConfig, wss) {
        var request = "getstat";
        logger.trace(request);
        super(rigName, minerConfig, request);
        this.wss = wss;
        this.formatter = formatter.ewbf;
    }
}

module.exports = Ewbf;
