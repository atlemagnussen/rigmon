const config = require('./config.json');
const logger = require('./logger.js');

if (!config.refreshMs || isNaN(config.refreshMs)) {
    config.refreshMs = 5000;
}
if (!config.port || isNaN(config.port)) {
    config.port = 8088;
}
let rigs = 0;
let miners = 0;
if (config.rigs) {
    for(var r in config.rigs) {
        if(config.rigs.hasOwnProperty(r)) {
            rigs++;
            let rig = config.rigs[r];
            if (rig.miners && Array.isArray(rig.miners)) {
                miners += rig.miners.length;
                for(var i=0;i<rig.miners.length;i++) {
                    rig.no = i+1;
                }
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
logger.info("number of rigs:" + rigs);
logger.info("number of miners:" + miners);
module.exports = {
    rigs: config.rigs,
    refreshMs: config.refreshMs,
    port: config.port
};
