const ChainShotDB = require('../server/database');

function getBalance(privateKey) {

    return ChainShotDB.wallets[privateKey].toString();
}

module.exports = getBalance;