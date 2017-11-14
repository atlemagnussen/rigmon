const logger = require('./logger.js');
var Rest = require('./rest.js');
var moment = require('moment');
require("moment-duration-format");

class Ewbf extends Rest {
    constructor(rigName, rigNo, config, refreshMs, wss) {
        var request = "getstat";
        logger.debug(request);
        super(rigName, config, request, refreshMs);
        this.wss = wss;
        this.on('data', (data) => {
            var d = this.transform(data);
            logger.debug(d);
            // if (this.wss) {
            //     var d = this.transform(data);
            //     logger.debug("clients: " + this.wss.clients.size);
            //     this.wss.clients.forEach(function each(ws) {
            //         logger.debug("ws.readyState: " + ws.readyState);
            //         ws.send(d);
            //     });
            // }
        });
    }
    transform(data) {
        var result = data.result;
        var startDate = new Date(data.start_time*1000);
        var diff = Math.abs(new Date() - startDate);
        var seconds = Math.floor((diff/1000));
        var standard = {
            id: this.rigName,
            version: "EWFB Zec miner",
            uptime: moment.duration(parseInt(seconds), 'seconds').format('d [days,] hh:mm')
        };
        return JSON.stringify(standard, null, 4);
    }
}

module.exports = Ewbf;
