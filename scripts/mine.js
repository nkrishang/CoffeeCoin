//imports
const ChainShot = require('../blockComponents/blockchain');

//---

function buildBlock() {

    let block;

    const request = new Request('http://localhost:3042/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'startMining' })
    });

    fetch(request)
        .then(response => {
        block = response;
        }).then(response => {
        const pos = response.blockHeight();
        if(pos > 4) {
            pos = pos % 4;
        };
    });

    const blockElement = document.createElement("div");
    blockElement.className = "card";
    blockElement.style = "width: 18rem;";

    const blockBody = document.createElement("div");
    blockBody.className = "card-body";
    blockElement.appendChild(blockBody);

    const blockNumber = document.createElement('h5');
    blockNumber.className = "card-title";
    blockNumber.id = `block-number-${pos}`;
    blockNumber.innerHTML = `Block #${pos}`
    blockBody.appendChild(blockNumber)

    const prevHash = document.createElement("h6");
    prevHash.className = "card-subtitle mb-2 text-muted";
    prevHash.id = `prev-hash-${pos}`;
    prevHash.innerHTML = `Previous Hash: 0x${block.previousHash}`;
    blockBody.appendChild(prevHash);

    const nonce = document.createElement("p");
    nonce.className = "card-text";
    nonce.id = `nonce-${pos}`;
    nonce.innerHTML = `Nonce: ${block.nonce}`;
    blockBody.appendChild(nonce);

    blockBody.appendChild(document.createElement("br"));

    const transactionTotal = document.createElement("h6");
    transactionTotal.id = `coins-transacted-${pos}`
    transactionTotal.innerHTML = block.total().toString();
    blockBody.appendChild(transactionTotal);

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "#";
    link.innerHTML = "details";
    blockBody.appendChild(link);

    const blockchain = document.getElementById("blockchain");
    blockchain.appendChild(blockElement);

}

function miner() {

    if(ChainShot.mempool.length >= 5) {
        buildBlock();
    } else {
        return;
    };
    
};

setInterval(miner, 30000);