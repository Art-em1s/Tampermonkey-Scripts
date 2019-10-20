// ==UserScript==
// @name         Empire Arc Withdrawer
// @version      0.1
// @author       Artemis
// @match        https://csgoempire.com/withdraw
// @grant        none
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';
    var goodArcana = ["Feast of Abscession", "Manifold Paradox", "Fractal Horns of Inner Abysm"]
    var isPaused = true;
    var uBal;

    window.addEventListener('load', function() {
        awaitLoader();
        var check = setInterval(function(){
            if (isPaused === false){
                clearInterval(check);
                uBal = parseFloat(document.querySelector("#app > div.site-layout.site-layout--chat-open.site-layout--trades-open.site-layout--inventory > div.site-layout__head.w-full.z-60 > div.w-full.bg-dark-grey-3.hidden.xl\\:block > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div > span > span").innerText.replace(",",""));
                console.log("Current Balance: "+uBal);
                if (uBal>20.00){
                    selectDota();
                    priceRangeSelector();
                } else {
                    console.log("Balance is >20, exiting to prevent bugs.");
                }
            }
        },250)
        }, false);

    function awaitLoader(){
        try{
            let i=0
            var check = setInterval(function(){
                i++;
                var loader = document.querySelector("#page-scroll > div.page-layout__inner > div > div:nth-child(2) > div > div > svg");
                var pCounter = document.querySelector("#app > div.chat.h-full.bg-dark-grey-3.z-20.chat--open > div > div.tool-bar.flex.items-center.justify-between.pl-4.bg-black-c > div > span").textContent.trim();
                if (loader!=null || pCounter == "0 Online"){
                    console.log("Waiting...");
                } else {
                    console.log("Page has loaded.");
                    clearInterval(check);
                    isPaused = false;
                    return;
                }
            },1000);
        } catch(e){
            setTimeout(function(){location.reload();}, 3000);
        }
    }

    function checkModal(){
        try{
            if (document.querySelector("#app > div:nth-child(8) > div > div > div.v--modal-box.v--modal > div.v--modal-close-button.absolute.border-5.border-dark-grey-4.bg-slate-dark.rounded-full > button")){
                document.querySelector("#app > div:nth-child(8) > div > div > div.v--modal-box.v--modal > div.v--modal-close-button.absolute.border-5.border-dark-grey-4.bg-slate-dark.rounded-full > button").click()
            }
        } catch(e){}
    }

    function priceRangeSelector(){
        document.querySelector("#page-scroll > div.page-layout__inner > div > div:nth-child(1) > div.px-5.py-6.hidden.md\\:block > div.flex.flex-wrap.justify-between > div.flex.flex-wrap.items-center > div.price-range-compact.flex.items-center.mr-4.xxl\\:mr-6.mb-4 > div.v-popover > span").click();
        setTimeout(function(){
            document.getElementsByClassName("tooltip-inner popover-inner")[0].children[0].children[3].click();
        }, 200);
        console.log("Price range set to 25-100 coins");
        setTimeout(function(){iterItems()}, 250);
    }

    function selectDota(){
        var app = document.querySelector("#page-scroll > div.page-layout__inner > div > div:nth-child(1) > div.px-5.py-6.hidden.md\\:block > div.flex.flex-wrap.items-center.-ml-2.-mb-2 > div:nth-child(3) > div:nth-child(1) > button");
        if(!app.className.includes("gold")){
            console.log("Selecting Dota Items.");
            app.click()
        }
    }

    function iterItems(){
        var check = setInterval(function(){
            checkModal();
            var loader = document.querySelector("#page-scroll > div.page-layout__inner > div > div:nth-child(2) > div > div > svg");
            var pCounter = document.querySelector("#app > div.chat.h-full.bg-dark-grey-3.z-20.chat--open > div > div.tool-bar.flex.items-center.justify-between.pl-4.bg-black-c > div > span").textContent.trim();
            if (loader!=null || pCounter == "0 Online"){
                console.log("Waiting...");
            } else {
                console.log("Inv has loaded.");
                clearInterval(check);
                var items = document.getElementsByClassName("item");
                var len = items.length;
                if (len>=1){
                    console.log(len+" items to check");
                    let validWithdrawal = false;
                    for (var i = 0; i < len; i++) {
                        let itemName = items[i].children[0].children[0].children[1].innerText;
                        let itemPrice = items[i].children[0].children[1].children[0].children[0].children[1].innerText;
                        if (goodArcana.includes(itemName) && uBal >= itemPrice){
                            console.log(itemName+" : "+itemPrice+"\nBalance: "+uBal);
                            uBal-=itemPrice;
                            if(validWithdrawal===false){
                                validWithdrawal = true;
                            }
                            items[i].click();
                        } else {
                            items[i].style.display = "none";
                        }
                    }
                    if (validWithdrawal === true){
                        sendWithdrawalRequest();
                    } else {
                        console.log("No good arcs currently available. Refreshing in 30 seconds.");
                        setTimeout(function(){location.reload();}, 30000);
                    }
                } else {
                    console.log("No items currently available. Refreshing in 30 seconds.");
                    setTimeout(function(){location.reload();}, 30000);
                }
            }
        },1000);
    }

    function killPage(){
        function closeWindow() {
            setTimeout(function() {
                window.close();
            }, 250);
        }

        window.onload = closeWindow();
    }

    function sendWithdrawalRequest(){
        var tradelink = "https://steamcommunity.com/tradeoffer/new/?partner=247990751&token=9sv51DVl";
        document.querySelector("#app > div.trades-sidebar.z-30.trades-sidebar--open > div > div.trades-sidebar__foot.bg-dark-grey-4 > div > button").click();
        setTimeout(function(){var tradelinkInput = document.querySelector("#trade-url").value;
        if (tradelinkInput != tradelink){
            tradelinkInput = tradelink;
        }
        document.querySelector("#app > div:nth-child(8) > div > div > div.v--modal-box.v--modal > div.p-4.md\\:p-6.text-light-grey-2.text-center > div > div.flex.-ml-2 > div:nth-child(2) > button").click();}, 500);
        setTimeout(function(){location.reload();}, 30000);
    }
})();