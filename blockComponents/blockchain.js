//imports
const Block = require('./block')


const genesisBlock = new Block();

class Blockchain {

    constructor() {

        this.chain = [ genesisBlock ];
        this.mempool = [];

        this.targetDifficulty = BigInt('0x0' + 'f'.repeat(63));
        this.blockTransactionLimit = 5;
    }

    addBlock(block) {
        this.chain.push(block);
    }

    blockHeight() {
        return this.chain.length;
    }

    isValid() {

        for(let i = this.chain.length - 1; i > 0; i--) {

            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];

            if(currentBlock.previousHash.toString() === prevBlock.toHash.toString()) {
                continue;
            } else {
                return false;
            };
        };

        return true;
    }
}

const ChainShot = new Blockchain;

module.exports = ChainShot;