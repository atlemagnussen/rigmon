const logger = require('./logger.js');
const EventEmitter = require('events');

class Rig extends EventEmitter {
    constructor(rigName, rigNo, refreshMs) {
        super();
        if (!rigName) {
            logger.error("no rig name!");
            throw "no rig name!";
        }
        this.rigName = rigName;
        this.rigNo = rigNo;
        this.rigUniqueId = `${rigName}-${rigNo}`;
        if (isNaN(refreshMs)) {
            logger.error(`'${refreshMs}' is not an integer`);
            refreshMs = 5000;
        }
        this.refreshMsh = refreshMs;
        setInterval(() => {
            this.refresh();
        }, this.refreshMsh);
    }
    refresh() {
        this.emit('refresh', this.rigUniqueId);
    }
}

module.exports = Rig;
