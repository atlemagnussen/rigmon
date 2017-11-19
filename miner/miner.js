const config = require('../config.js');
const logger = require('../logger.js').getLogger("miner");
const EventEmitter = require('events');
var moment = require('moment');

class Miner extends EventEmitter {
    constructor(rigName, rigNo) {
        super();
        if (!rigName || !rigNo) {
            logger.error("no rig name!");
            throw "no rig name!";
        }
        this.rigName = rigName;
        this.rigNo = rigNo;
        this.state = config.states.unknown;
        this.rigUniqueId = `${rigName}-${rigNo}`;
        this.refreshMsh = config.refreshMs;
        this.lastUpdate = new Date();
        setInterval(() => {
            this.refresh();
        }, this.refreshMsh);

        this.on('data', (data) => {
            try {
                this.lastUpdate = new Date();
                var minerData = this.formatter(data);
                this.setState(config.states.running);
                minerData.lastUpdate = moment().format("YY-MM-DD HH:mm:ss");
                logger.trace(minerData);
                if (this.wss) {
                    logger.trace("clients: " + this.wss.clients.size);
                    this.wss.clients.forEach(function each(ws) {
                        logger.debug("ws.readyState: " + ws.readyState);
                        var wssStringifiedData = JSON.stringify(["miner", minerData]);
                        ws.send(wssStringifiedData);
                    });
                }
            } catch(e) {
                logger.error(e);
            }
        });
    }
    setState(newState) {
        if (this.state !== newState) {
            
        }
    }
    refresh() {
        this.emit('refresh', this.rigUniqueId);
    }
}

module.exports = Miner;
