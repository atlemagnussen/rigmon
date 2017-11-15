const logger = require('./logger.js').getLogger("miner");
const EventEmitter = require('events');
const config = require('./config.js');

class Miner extends EventEmitter {
    constructor(rigName, rigNo) {
        super();
        if (!rigName || !rigNo) {
            logger.error("no rig name!");
            throw "no rig name!";
        }
        this.rigName = rigName;
        this.rigNo = rigNo;
        this.rigUniqueId = `${rigName}-${rigNo}`;
        this.refreshMsh = config.refreshMs;
        setInterval(() => {
            this.refresh();
        }, this.refreshMsh);

        this.on('data', (data) => {
            try {
                var minerData = this.formatter(data);
                logger.trace(minerData);
                if (this.wss) {
                    logger.trace("clients: " + this.wss.clients.size);
                    this.wss.clients.forEach(function each(ws) {
                        logger.debug("ws.readyState: " + ws.readyState);
                        ws.send(minerData);
                    });
                }
            } catch(e) {
                logger.error(e);
            }
        });
    }
    refresh() {
        this.emit('refresh', this.rigUniqueId);
    }
}

module.exports = Miner;
