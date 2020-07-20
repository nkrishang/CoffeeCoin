function updateDir(username, userKeys) {

    let directory_row = document.createElement("ul");
    directory_row.className = "list-group list-group-horizontal";

    document.getElementById("body-list").appendChild(directory_row)
    
    let item_username = document.createElement("li");
    item_username.className = "list-group-item";
    item_username.innerHTML = username

    directory_row.appendChild(item_username); 

    let item_userKey = document.createElement("li");
    item_userKey.className = "list-group-item";
    item_userKey.innerHTML = `x: 0x${userKeys.publicX}, y: 0x${userKeys.publicY}`;
    
    directory_row.appendChild(item_userKey);

};



module.exports = updateDir;