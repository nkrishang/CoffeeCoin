class Block {

    constructor() {
        this.transactions =  [];
        this.hash = null;
        this.previousHash = null;
        this.nonce = 0;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    prevHash(hash) {
        this.previousHash = hash;
    }

    total() {

        let transactionArr = this.transactions.map(x => x.amount.toNumber());
        let total = transactionArr.reduce((acc, val) => acc+val);

        return total;
    }
};

module.exports = Block;