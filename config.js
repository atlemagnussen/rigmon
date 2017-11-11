const config = require('./config.json');
const logger = require('./logger.js');

if (!config.refreshMs || isNaN(config.refreshMs)) {
    config.refreshMs = 5000;
}
if (!config.port || isNaN(config.port)) {
    config.port = 8088;
}

if (config.rigs) {
    let rigs = 0;
    let miners = 0;
    for(var r in config.rigs) {
        if(config.rigs.hasOwnProperty(r)) {
            rigs++;
            let rig = config.rigs[r];
            if (rig.miners && Array.isArray(rig.miners)) {
                miners += rig.miners.length;
            }
        }
    }

    console.log("rigs:" + rigs + ", miners: " + miners);
    if (miners === 0) {
        let err = "Rigs but no miners, quit!";
        logger.error(err);
        throw err;
    }

} else {
    let err = "No rigs defined, exit!";
    logger.error(err);
    throw err;
}

module.exports = {
    rigs: config.rigs,
    refreshMs: config.refreshMs,
    port: config.port
};
