const logger = require('./logger.js');
const EventEmitter = require('events');

class Rig extends EventEmitter {
    constructor(rigName, refreshMs) {
        super();
        if (!rigName) {
            logger.error("no rig name!");
            throw "no rig name!";
        }
        this.rigName = rigName;
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
        this.emit('refresh', this.rigName);
    }
}

module.exports = Rig;
