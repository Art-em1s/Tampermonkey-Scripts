// ==UserScript==
// @name         MHN Copier
// @version      0.1
// @author       You
// @match        https://steamcommunity.com/profiles/*/inventory/
// @match        https://steamcommunity.com/id/*/inventory/
// @run-at      document-idle
// ==/UserScript==
var i = 0;

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.inventory_item_link')){
        i+=1
    } else if (event.target.matches('.hover_item_name')){
        get_mhn();
    }
}, false);

function get_mhn(){
    var marketHashName;
    if(i==1){
        let app_id = document.getElementsByClassName("games_list_tab active")[0].href.split("#")[1];
        let itemName = document.getElementById("iteminfo0_item_name").textContent;
        if (itemName == "Copied to clipboard"){
            itemName = itemNameStorage;
        }
        try{
            let itemWear = document.getElementById("iteminfo0_item_descriptors").innerHTML.split("Exterior: ")[1].split("</div>")[0];
            marketHashName = itemName+" ("+itemWear+") ";
        } catch(e) {
            marketHashName = itemName;
        }
        copyToClipboard(marketHashName);
        let itemNameStorage = itemName;
        document.getElementById("iteminfo0_item_name").textContent = "Copied to clipboard";
        setTimeout(function(){ document.getElementById("iteminfo0_item_name").textContent = itemNameStorage; }, 1000);
    } else {
        let app_id = document.getElementsByClassName("games_list_tab active")[0].href.split("#")[1];
        let itemName = document.getElementById("iteminfo1_item_name").textContent;
        if (itemName == "Copied to clipboard"){
            itemName = itemNameStorage;
        }
        try{
            let itemWear = document.getElementById("iteminfo1_item_descriptors").innerHTML.split("Exterior: ")[1].split("</div>")[0];
            marketHashName = itemName+" ("+itemWear+") ";
        } catch(e) {
            marketHashName = itemName;
        }
        let buttons = document.getElementById("iteminfo1_item_actions");
        copyToClipboard(marketHashName);
        let itemNameStorage = itemName;
        document.getElementById("iteminfo1_item_name").textContent = "Copied to clipboard";
        setTimeout(function(){ document.getElementById("iteminfo1_item_name").textContent = itemNameStorage; }, 1000);
        i=0;
    };
}