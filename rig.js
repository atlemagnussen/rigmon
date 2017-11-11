const EventEmitter = require('events');

class Rig extends EventEmitter {
    constructor(rigName, refreshMs) {
        super();
        this.rigName = rigName;
        if (isNaN(refreshMs)) {
            console.log(`'${refreshMs}' is not an integer`);
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
