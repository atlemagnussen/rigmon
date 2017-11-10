const Claymore = require('./claymore.js');

const config = require('./config.json');

// logger
const log4js = require('log4js');
log4js.configure(config.log);

const logger = log4js.getLogger('rigmon');

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
        logger.error("Rigs but no miners, quit!");
        return;
    }

} else {
    logger.error("No rigs defined, exit!");
    return;
}

var rpcrig3 = new Claymore(rig3);
var rpcrig2 = new Claymore(rig2);

function poll(){
    rpcrig3.connect();
    rpcrig2.connect();
}

poll();
