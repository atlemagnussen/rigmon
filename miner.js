const logger = require('./logger.js');
const EventEmitter = require('events');

class Miner extends EventEmitter {
    constructor(rigName, rigNo, refreshMs, wss, formatter) {
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
        this.on('data', (data) => {
            var minerData = this.formatter(data);
            logger.trace(minerData);
            if (this.wss) {
                logger.trace("clients: " + this.wss.clients.size);
                this.wss.clients.forEach(function each(ws) {
                    logger.debug("ws.readyState: " + ws.readyState);
                    ws.send(minerData);
                });
            }
        });
    }
    refresh() {
        this.emit('refresh', this.rigUniqueId);
    }
}

module.exports = Miner;
