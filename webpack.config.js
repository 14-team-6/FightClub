const serverConfig = require('./build/webpack.server.config');
const SSRConfig = require('./build/webpack.clientSSR.config');

module.exports = [serverConfig, SSRConfig];
