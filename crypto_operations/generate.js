const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function genKey() {

    const key = ec.genKeyPair();
  
    return {
      privateKey: key.getPrivate().toString(16),
      publicX: key.getPublic().x.toString(16),
      publicY: key.getPublic().y.toString(16), 
    };
};

module.exports = genKey;