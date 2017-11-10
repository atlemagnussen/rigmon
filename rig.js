const EventEmitter = require('events');

class Rig extends EventEmitter {
    constructor(refreshMs) {
        super();
        this.refreshMsh = refreshMs ? refreshMs : 5000;
        setInterval((function(){
            this.emit('refresh');
        }).bind(this), this.refreshMsh);
    }
    refresh() {
        this.emit('refresh');
    }
}

module.exports = Rig;
