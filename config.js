const config = require('./config/config.json');

if (!config.refreshMs || isNaN(config.refreshMs)) {
    config.refreshMs = 5000;
}
if (!config.minerTimeout || isNaN(config.minerTimeout)) {
    config.minerTimeout = 1000;
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
                    let miner = rig.miners[i];
                    miner.no = i+1;
                }
            }
        }
    }

    console.log("rigs:" + rigs + ", miners: " + miners);
    if (miners === 0) {
        let err = "Rigs but no miners, quit!";
        console.error(err);
        throw err;
    }

} else {
    let err = "No rigs defined, exit!";
    console.error(err);
    throw err;
}

module.exports = {
    rigs: config.rigs,
    refreshMs: config.refreshMs,
    minerTimeout: config.minerTimeout,
    port: config.port,
    log: config.log
};
