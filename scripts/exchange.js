const newTransaction = require('../blockComponents/transactions')

//Getting wallet to show user's balance
const balanceButton = document.getElementById("balance-button");

balanceButton.addEventListener("click", () => {

    const privateKey = document.getElementById("input-PrivateKey").value;

    const params = {
        method: "getBalance",
        params: [privateKey],
        jsonrpc: "2.0",
        id: 1
    }

    const request = new Request('http://localhost:3042/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
    });
  

    fetch(request)
    .then(response => {
        document.getElementById("balance-amount").innerHTML = response;
    }).then(response => {
        document.getElementById("balance").innerHTML = response.balance;
    });

});

// Adding new transaction to blockchain mempool
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {

    let from = document.getElementById("input-from").value;
    let to = document.getElementById("input-to").value;
    let amount = document.getElementById("input-amount").value.toNumber();
    let signKey = document.getElementById("input-sign").value;

    if(!(signKey in wallets)) {

        const failureMessage = document.getElementById("failure");
        failureMessage.style.visibility = 'visible';

    } else {
        
        const transaction = newTransaction(from, to, amount, signKey);

        const params = {
            method: "addNewTransaction",
            params: [transaction],
            jsonrpc: "2.0",
            id: 1
        }
    
        const request = new Request('http://localhost:3042/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
        });

        fetch(request)
        .then(response => {
            document.getElementById("success").visibility = 'visible';
            document.getElementById("success").innerHTML = response;
        });
    };
})