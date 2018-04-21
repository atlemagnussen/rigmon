const logger = require('../logger.js').getLogger("xmrig");
var Rest = require('./rest.js');
const formatter = require('./formatter.js');

class Xmrig extends Rest {
    constructor(rigName, minerConfig, wss) {
        var request = "";
        logger.trace(request);
        super(rigName, minerConfig, request);
        this.wss = wss;
        this.formatter = formatter.xmrig;
    }
}

module.exports = Xmrig;
