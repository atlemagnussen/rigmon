var moment = require('moment');
require("moment-duration-format");

class Formatter {
    ws(type, data) {
        var array = [type, data];
        return JSON.stringify(array);
    }

    claymore(data) {
        var result = data.result;
        var totals = result[2].split(';');
        var standard = {
            id: this.rigUniqueId,
            unit: this.config.unit,
            version: result[0],
            miningPool: result[7],
            uptime: moment.duration(parseInt(result[1]), 'minutes').format('d [days,] hh:mm:ss'),
            total: {
                hashRate: totals[0],
                shares: totals[1],
                rejected: totals[2]
            },
            detailHash: result[3].split(';'),
            totalHashSecondary: result[4].split(';'),
            detailHashSecondary: result[5].split(';'),
            tempSpeed: result[6].split(';'),
            invalidShares: result[8].split(';')
        };
        return JSON.stringify(["miner", standard]);
    }

    ewbf(data) {
        let getTotal = function(units, prop) {
            var total = 0;
            if (units && Array.isArray(units)) {
                units.forEach(function(unit) {
                    total += unit[prop];
                });
            }
            return total;
        };
        var startDate = new Date(data.start_time*1000);
        var diff = Math.abs(new Date() - startDate);
        var seconds = Math.floor((diff/1000));
        var units = data.result;

        var standard = {
            id: this.rigUniqueId,
            unit: this.config.unit,
            version: "EWFB Zec miner",
            miningPool: data.current_server,
            uptime: moment.duration(parseInt(seconds), 'seconds').format('d [days,] hh:mm:ss'),
            total: {
                hashRate: getTotal(units, "speed_sps"),
                shares: getTotal(units, "accepted_shares"),
                rejected: getTotal(units, "rejected_shares")
            }
        };
        return JSON.stringify(["miner", standard]);
    }
}

module.exports = new Formatter();
