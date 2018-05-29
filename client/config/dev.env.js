var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DAPP_ADDR: '"n1kpLEWv25HkqG33cRLGowiCGXkA3iBXBzP"',
});
