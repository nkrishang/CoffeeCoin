//imports
const ChainShot = require('../blockComponents/blockchain');
const Block = require('../blockComponents/block');
const SHA256 = require('crypto-js');

const ChainShotDB = require('../server/database');



function mineBlock() {

    // Create block
    const block = new Block();

    // Pop transaction off of mempool and add to the block
    for(let i = 0; i < ChainShot.blockTransactionLimit; i++) {
        block.transactions.push(ChainShot.mempool.pop());
    };
    
    // For each transaction, add/subtract appropriately
    block.transactions.forEach(transaction => {
        ChainShotDB.wallets[transaction.signature] -= transaction.amount;
    
        let recipient;
        for(let x in ChainShotDB.userInfo) {
            if(ChainShotDB.userInfo[x].publicKey === transaction.address) {
                recipient = x;
            } else {
                continue;
            };
        };

        ChainShotDB.wallets[ChainShotDB.userInfo[recipient].privateKey] += transaction.amount;
        ChainShotDB.wallets[ChainShotDB.userInfo[signature]] -= transaction.amount;

    });

    //Setting previous hash
    let previousBlock = ChainShot.chain[ChainShot.chain.length - 1];
    block.prevHash(previousBlock.hash);

    // Sets own hash (proof of work)
    let hash;
    do {

        hash = SHA256(JSON.stringify(block));
        block['nonce'] += 1;

    } while(BigInt("0x" + hash.toString()) > ChainShot.targetDifficulty);
    
    block['hash'] = hash;

    //Add block to blockchain
    ChainShot.addBlock(block);
};


module.exports = mineBlock;