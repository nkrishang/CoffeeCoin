class Transaction {

    constructor(from, amount, address, signature) {
       
        this.from = from;
        this.amount = amount;
        //recipient public key
        this.address = address;
        //sender private key
        this.signature = signature;
    }
}

function newTransaction(from, amount, address,signature) {
    return new Transaction(from, amount, address, signature);
};

module.exports = newTransaction;