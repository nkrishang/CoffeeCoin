const { response } = require('express');
const updateDir = require('../main_fns/updateDir');

const generateButton = document.getElementById("send-button");

generateButton.addEventListener('click', () => {
    
    console.log('event listener working')
    let username = document.getElementById("enter-username").value;
    let userKeys = genKey();

    
    //Add keys to database
    const params = {
        method: "addKeysToDatabase",
        params: [username, userKeys],
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
        console.log(response[2]);
    }).then(() => {
        let user = response[0];
        let keys = response[1];
        //updating directory html to display updated database
        updateDir(user, keys);
    });
        
    //HTML manipulation

    document.getElementById("input-PrivateKey").value = "0x" + userKeys.privateKey;
    document.getElementById("input-PublicKey").value = `x: 0x${userKeys.publicX}, y: 0x${userKeys.publicY}`;

});

