// ==UserScript==
// @name         botb custom
// @namespace    http://battleofthebits.org/
// @version      0.1
// @description  Alternate layout and css for battleofthebits. Not done, sorry.
// @author       Jessica Robo
// @match        https://battleofthebits.org/*
// @exclude      https://battleofthebits.org/disk/*
// @exclude      https://battleofthebits.org/battle/Tally/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // Your CSS as text
var styles = `
@keyframes morph {
  0% { color: #fc6ab5; }
  25% { color: #fc6ae3; }
  50% { color: #f36afc; }
  75% { color: #fc6ae3; }
  100% { color: #fc6ab5; }
}
    .hSeperator {
    height: 16px;
}
    .hMiniSeperator {
    height: 4px;
}
    #jessbeghast {
    color: #06cc06;
    font-weight: bold;
    margin-top: 1rem;
}
    .jessdate {
    color: #06cc06;
}
    body, #pageWrap {
    background-image: url("https://opengameart.org/sites/default/files/styles/medium/public/seamless%20space_0.PNG");
}
    .logo2 {
    animation: morph 5s infinite;
}
    #patreonLink, #bandcampLink {
    display: none;
}
    div .fright .alignR {
    width:220px;
}
`
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
// end of stolen code, or end of that particular stolen code anyway, lul
// start of page cleanup
    const matches = document.querySelectorAll("span.countdown");
    var now = Date.now();
    let patreon = document.querySelector("[href='https://www.patreon.com/battleofthebits']");
    let avatarLink = document.querySelector("#homeMenu > div > div > div.botbrAvatar > a");
    let bandcamp = document.querySelector("[href='http://battleofthebits.bandcamp.com']");
    const sideSeperators = document.querySelectorAll("#SIDE_BOX div.hSeperator");
    const otherSideSeperators = document.querySelectorAll("#homeMenu > div > div > div.hMiniSeperator");
    console.log(otherSideSeperators);
    patreon.id = 'patreonLink';
    bandcamp.id = 'bandcampLink';
    let butts = document.querySelectorAll("div.menu_butt");
    let frights = document.querySelectorAll("div.fright.alignR");
    let iframeGuys = document.querySelectorAll("iframe");
    let footGuys = document.querySelectorAll(".footerMenu");
    // hide the youtube song of the day
    var youtubes = "#";
    if (iframeGuys.length > 0 ) {
        var ultimoHombre = iframeGuys[iframeGuys.length -1];
        var youtubeEmbed = ultimoHombre.getAttribute("src");
        youtubes = youtubeEmbed.replace("embed/","watch?v=")
        ultimoHombre.parentNode.style.display = 'none';
    }
    var ultimoFoot = footGuys[footGuys.length -1];
// hide some seperators... watch it, this might get ugly on subpages
    sideSeperators[2].style.display = 'none';
    sideSeperators[3].style.display = 'none';
    // widen some divs so the dates fit
for (let j = 0; j < frights.length; j++) {
  frights[j].style.width = "220px";
}
// reorganize the topbar
    butts[0].innerHTML = butts[4].innerHTML; // Arena
    var placeholder1 = butts[2].innerHTML; // not pictured: forum
    var placeholder2 = butts[3].innerHTML; //
    butts[2].innerHTML = butts[5].innerHTML; // Rax
    butts[3].innerHTML = butts[6].innerHTML; // Chats
    butts[4].innerHTML = placeholder1; // Browser
    butts[5].innerHTML = placeholder2; // Lyceum
    butts[6].innerHTML = '<a class="tab boxLink hButt" id="fight" title="BEGAST" href="https://battleofthebits.org/battle_xhb/BEGAST/" style="color:#ec2a2a;">FIGHT </a>'; // BEGAST!
    butts[7].innerHTML = butts[8].innerHTML; // Radio
    butts[8].innerHTML = '<a class="tab boxLink hButt" title="Random Node Goto-er" href="/index/RNG">?</a>'; // random page
    butts[8].insertAdjacentHTML('afterend','<div class="menu_butt"><a class="tab boxLink hButt" title="Entry of the Day" href="'+youtubes+'">!</a></div>'); // Entry of the day
// reorganize the sidebar, but try to check to see if it even exists first
    if (document.getElementById("homeMenu")) {
    var sidebarGuys = document.querySelectorAll("#homeMenu > div > div > a");
    avatarLink.href = "https://battleofthebits.org/barracks/EditProfile";
        for (let h = 0; h < sidebarGuys.length; h++) {
            console.log(sidebarGuys[h]);
           if (sidebarGuys[h].title == 'HomeBunk' || sidebarGuys[h].title == 'Begast XHB' || sidebarGuys[h].title == 'EditProfile') {
              sidebarGuys[h].style.display = 'none';
              var aichplusone = h + 1;
              otherSideSeperators[aichplusone].style.display = 'none';
           }
        }
    }
// uhhhhh let's move this shit to the bottom
    ultimoFoot.innerHTML += '<a href="http://battleofthebits.bandcamp.com/">Bandcamp</a><a href="https://www.patreon.com/battleofthebits">Patreon</a>';
// start of general countdown code
    for (let i = 0; i < matches.length; i++) {
        let botbSeconds = matches[i].getAttribute("data-countdown");
        let target = now + (botbSeconds * 1000);
        let outputDate = new Date(target);
        let humanDate = outputDate.toLocaleString("en-US");
        if( target != now ) {
            matches[i].insertAdjacentHTML('afterend','<br><span class="jessdate">'+humanDate+'</span>');
        }
    }

// start of special beghast code
    console.log(document.title);
    if (document.title == 'BEGAST teh ONE HOUR BATTLE!!') {
       var xpath2 = "//span[text()='(n00bs still get latist points)']";
       var preSetup = document.evaluate(xpath2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
       preSetup.insertAdjacentHTML('afterend','<div id="jessbeghast"></div>');
       function recalculate() {
           var now = Date.now();
           var hour = document.getElementsByName("start_hour")[0].value * 1000 * 3600;
           var min = document.getElementsByName("start_min")[0].value * 1000 * 60;
           var target = now + hour + min;
           let outputDate = new Date(target);
           let humanDate = outputDate.toLocaleString("en-US", {timeZoneName: "short"});
           document.getElementById("jessbeghast").innerHTML = "Start time: "+humanDate;
           }
       setInterval(recalculate,1000);
       }
})();