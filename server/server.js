const express = require('express');
const app = express();
const cors = require('cors');
const PORT = require('../config');

const ChainShotDB = require('./database');
const getBalance = require('../main_fns/getBalance');
const mineBlock = require('../main_fns/mineBlock');

app.use(cors());
app.use(express.json());



app.post('/', (req, res) => {
  const { method, params }  = req.body;
  
  if(method === 'addKeysToDatabase') {
      
    const [username, userKeys] = params;  

    ChainShotDB.userInfo[username] = userKeys;
    ChainShotDB.wallets["0x" + userKeys.privateKey] = 100;

    const message = `${username}'s keys added to database.`

    res.send([username, userKeys, message]);
    return;
  }

  if(method === 'getUserBalance') {

    if(privateKey in ChainShotDB.wallets) {
      const message = 'Balance: ' + getBalance(privateKey) + " cc";
    } else {
      const message = "Balance: 0 cc";
    };

    res.send(message);
  }

  if(method === 'addNewTransaction') {

    ChainShot.mempool.unshift(transaction);

    const message = `Your transfer of ${transaction.amount} to ${transaction.address} is now being processed.`;

    res.send(message);
  }

  if(method === 'startMining') {

    mineBlock();
    let block = ChainShot.chain[ChainShot.blockHeight() - 1];

    res.send(block);
  }

});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
