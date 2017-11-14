const logger = require('./logger.js');
var Rest = require('./rest.js');
var moment = require('moment');
require("moment-duration-format");

class Ewbf extends Rest {
    constructor(rigName, rigNo, config, refreshMs, wss) {
        var request = "getstat";
        logger.debug(request);
        super(rigName, rigNo, config, request, refreshMs);
        this.wss = wss;
        this.on('data', (data) => {
            var d = this.transform(data);
            logger.debug(d);
            if (this.wss) {
                logger.debug("clients: " + this.wss.clients.size);
                this.wss.clients.forEach(function each(ws) {
                    logger.debug("ws.readyState: " + ws.readyState);
                    ws.send(d);
                });
            }
        });
    }
    transform(data) {
        var startDate = new Date(data.start_time*1000);
        var diff = Math.abs(new Date() - startDate);
        var seconds = Math.floor((diff/1000));
        var units = data.result;

        var standard = {
            id: this.rigUniqueId,
            unit: this.config.unit,
            version: "EWFB Zec miner",
            uptime: moment.duration(parseInt(seconds), 'seconds').format('d [days,] hh:mm'),
            total: {
                hashRate: this.getTotal(units, "speed_sps"),
                shares: this.getTotal(units, "accepted_shares"),
                rejected: this.getTotal(units, "rejected_shares")
            }
        };
        return JSON.stringify(standard, null, 4);
    }
    getTotal(units, prop) {
        var total = 0;
        if (units && Array.isArray(units)) {
            units.forEach(function(unit) {
                total += unit[prop];
            });
        }
        return total;
    }
}

module.exports = Ewbf;
