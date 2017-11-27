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
                var minerData = this.formatter(data);
                minerData.state = config.states.running;
                this.setState(config.states.running);
                minerData.lastUpdate = moment().format("YY-MM-DD HH:mm:ss");
                logger.trace(minerData);
                this.updateWssNewData(minerData);
            } catch(e) {
                logger.error(e);
            }
        });

        this.on('minerError', (err) => {
            logger.debug(`${this.rigUniqueId}::onMinerError::${err}`);
            this.setState(config.states.error);
            var errorData = {
                id: this.rigUniqueId,
                lastSeen: this.lastSeen ? this.lastSeen : "never",
                lastUpdate: moment().format("YY-MM-DD HH:mm:ss"),
                state: config.states.error,
                errorMsg: "No connection"
            };
            if (err) {
                errorData.errorMsg += " " + err;
            }
            this.updateWssNewData(errorData);

        });
    }

    setState(newState) {
        this.lastUpdate = new Date();
        if (this.state !== newState) {
            var oldState = this.state;
            if (oldState === config.states.running) {
                this.lastSeen = this.lastUpdate;
            } else if (oldState === config.states.unknown) {
                this.started = this.lastUpdate;
            }
            this.state = newState;
        }
    }

    refresh() {
        this.emit('refresh', this.rigUniqueId);
    }

    updateWssNewData(minerData) {
        this.updateWss("miner", minerData);
    }

    updateWss(type, data) {
        if (this.wss) {
            logger.trace("clients: " + this.wss.clients.size);
            this.wss.clients.forEach(function each(ws) {
                logger.debug("ws.readyState: " + ws.readyState);
                try {
                    var wssStringifiedData = JSON.stringify([type, data]);
                    ws.send(wssStringifiedData);
                } catch (e) {
                    logger.error("Error transmittig to websocket:\n" + e);
                }
            });
        } else {
            logger.error("No websocket!");
        }
    }
}

module.exports = Miner;
