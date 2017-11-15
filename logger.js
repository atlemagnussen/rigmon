// config file
const config = require('./config.json');
// logger
const log4js = require('log4js');
log4js.configure(config.log);
const logger = log4js.getLogger('server');
logger.debug('Init logger');

module.exports = {
    default: logger,
    getLogger: log4js.getLogger
};
