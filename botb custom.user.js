// ==UserScript==
// @name         botb custom
// @namespace    http://battleofthebits.org/
// @version      0.2
// @description  Alternate layout and css for battleofthebits. Not done, sorry! Look up Tampermonkey if you don't understand how to use this.
// @author       Jessica Robo
// @match        https://battleofthebits.org/*
// @exclude      https://battleofthebits.org/disk/*
// @exclude      https://battleofthebits.org/battle/Tally/*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue
// @grant        GM.listValues
// ==/UserScript==
//
// some background ideas:
// https://opengameart.org/sites/default/files/styles/medium/public/seamless%20space_0.PNG
// https://content.mycutegraphics.com/backgrounds/hearts/tiny-cute-hearts-on-black-background.gif
// https://battleofthebits.org/disk/debris/botb_bg.png
// https://vgmusic.com/images/background.jpg
//
(function() {
'use strict';
// user settings
async function getUserValues() {
    var uVals = new Object();
    uVals['jessdateColor'] = await GM.getValue("jessdateColor","inherit");
    uVals['fiteColor'] = await GM.getValue("fiteColor","inherit");
    uVals['jessdateOn'] = await GM.getValue("jessdateOn","on");
    uVals['altlayoutOn'] = await GM.getValue("altlayoutOn","on");
    uVals['burfsOff'] = await GM.getValue("burfsOff","off");
    uVals['bnadOff'] = await GM.getValue("bnadOff","off");
    uVals['entryactOff'] = await GM.getValue("entryactOff","off");
    uVals['battleactOff'] = await GM.getValue("battleactOff","off");
    uVals['actlogOff'] = await GM.getValue("actlogOff","off");
    uVals['recentbrOff'] = await GM.getValue("recentbrOff","off");
    uVals['bgImage'] = await GM.getValue("bgImage","https://battleofthebits.org/disk/debris/botb_bg.png");

    return uVals;
}
var uv = Promise.resolve(getUserValues());
    uv.then((idklol) => {
       var irlydklol = Object.create(idklol);
       return irlydklol;
    })
        .then((ope) => {
           var uv = ope;
           if (uv['jessdateOn'] == "on") {
              var jdate = "inline";
           } else {
              jdate = "none";
           }
        var styles = `
@keyframes jessmorph {
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
    color: ${uv['jessdateColor']};
    font-weight: bold;
    margin-top: 1rem;
}
    #jessettings {
    background-color: rgba(16,16,16,0.6);
    color: #dbdbff;
    text-align: center;
}
    .savemsg {
    display: inline;
}
    #jessettings hr {
    margin: 3px auto;
}
    #jessettings h2 {
    margin: auto;
    font-size: 2em;
    line-height: 2.1em;
    font-weight: normal;
}
    .jessdate {
    color: ${uv['jessdateColor']};
    display: ${jdate};
}
    body, #pageWrap {
    background-image: url("${uv['bgImage']}");
}
    .jessblurb {
    font-size: 1rem;
    line-height: 1.3rem;
}
    .logo, .logo2 {
    animation: jessmorph 5s infinite;
}
    .robo {
    font-weight: bold;
    animation: jessmorph 5s infinite;
}
    #patreonLink, #bandcampLink {
    display: none;
}
    div .fright .alignR {
    width:220px;
}
    .toggler:hover {
    animation: jessmorph 2s infinite;
    cursor: pointer;
}
    #heartofthesun {
    margin: 0px auto;
    width: 560px;
    text-align: center;
}
    #jessave, #jessclear {
    font-size: 120%;
    padding: .3em;
    margin: auto 2em;
    width: 120px;
    height: 60px;
}
    .savemsg, .delmsg {
    color: #ff4444;
    font-weight: bold;
}
    #fight {
    color: ${uv['fiteColor']};
}
`
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    if (uv['altlayoutOn'] == "on") {
// hide the youtube song of the day
    var youtubes = "#";
    if (iframeGuys.length > 0 ) {
        var ultimoHombre = iframeGuys[iframeGuys.length -1];
        var youtubeEmbed = ultimoHombre.getAttribute("src");
        youtubes = youtubeEmbed.replace("embed/","watch?v=")
        ultimoHombre.parentNode.style.display = 'none';
    }

// reorganize the topbar
    butts[0].innerHTML = butts[4].innerHTML; // Arena
    var placeholder1 = butts[2].innerHTML; // not pictured: forum
    var placeholder2 = butts[3].innerHTML; //
    butts[2].innerHTML = butts[5].innerHTML; // Rax
    butts[3].innerHTML = butts[6].innerHTML; // Chats
    butts[4].innerHTML = placeholder1; // Browser
    butts[5].innerHTML = placeholder2; // Lyceum
    butts[6].innerHTML = '<a class="tab boxLink hButt" id="fight" title="BEGAST" href="https://battleofthebits.org/battle_xhb/BEGAST/">FITE!! </a>'; // BEGAST!
    butts[7].innerHTML = butts[8].innerHTML; // Radio
    butts[8].innerHTML = '<a class="tab boxLink hButt" title="Random Node Goto-er" href="/index/RNG">?</a>'; // random page
    butts[8].insertAdjacentHTML('afterend','<div class="menu_butt"><a class="tab boxLink hButt" title="Entry of the Day" href="'+youtubes+'">!</a></div>'); // Entry of the day
// reorganize the sidebar, but try to check to see if it even exists first
    if (document.getElementById("homeMenu")) {
    var sidebarGuys = document.querySelectorAll("#homeMenu > div > div > a");
    avatarLink.href = "https://battleofthebits.org/barracks/EditProfile";
        for (let h = 0; h < sidebarGuys.length; h++) {
           if (sidebarGuys[h].title == 'HomeBunk' || sidebarGuys[h].title == 'Begast XHB' || sidebarGuys[h].title == 'EditProfile') {
              sidebarGuys[h].style.display = 'none';
              var aichplusone = h + 1;
              otherSideSeperators[aichplusone].style.display = 'none';
           }
        }
    }
// uhhhhh let's move this shit to the bottom
    ultimoFoot.innerHTML += '<a href="http://battleofthebits.bandcamp.com/">Bandcamp</a><a href="https://www.patreon.com/battleofthebits">Patreon</a>';
// hide some seperators... watch it, this might get ugly on subpages
    sideSeperators[2].style.display = 'none';
    sideSeperators[3].style.display = 'none';
    // widen some divs so the dates fit
    for (let j = 0; j < frights.length; j++) {
        frights[j].style.width = "220px";
    }
 } // end of the if ... copy-paste ruined the indent

        function customSettings() {
   if (window.location.href == 'https://battleofthebits.org/barracks/Settings/' && document.body.contains(document.getElementById("jessettings")) == false) {
        var botbSettings = document.querySelector("#homeMenu > div.ajaxContent.grid_8 > div > div.inner.clearfix");
        var settingsMenu = `
<hr>
<div id="jessettings">
<h2>jessettings</h2>
<p>Hiiii~ so these are <span class="robo tb1">secret extra settings</span> for my BotB userscript.</p>
<p>For colors, you can input either an HTML color name (chartreuse) or a hex code (#7fff00).</p>
<p>Consider <a href="https://www.paypal.com/donate?hosted_button_id=KT9LV9P26H324">donating</a> if you found this script useful or amusing ^O^</p>
<hr>
<p>Background image (remember, only you can see this): <input type="url" id="bgImage" name="bgImage" size="40" placeholder="${uv['bgImage']}"></p>
<p>Show calculated date/times? <input type="checkbox" id="jessdateOn" name="jessdateOn" placeholder="${uv['jessdateOn']} value="${uv['jessdateOn']}"></p>
<p>Use alternate layout? <input type="checkbox" id="altlayoutOn" name="altlayout" placeholder="${uv['altlayoutOn']} value="${uv['altlayoutOn']}"></p>
<p>Date/Time color: <input size="14" placeholder="${uv['jessdateColor']}" id="jessdateColor" name="jessdateColor"></p>
<p>FITE!! color: <input size="14" placeholder="${uv['fiteColor']}" id="fiteColor" name="fiteColor"></p>

<hr>
<div id="heartofthesun"><p><span class="tb2">Controls</span></p>
<p><button id="jessave">Save changes</button> <button id="jessclear">Delete data</button></p>
<br>
</div>
</div>
`
// something for later, maybe
// <p>Hide Burfdays? <input type="checkbox" name="burfs" value="none" id="burfsOff" placeholder="${uv['burfsOff']}"></p>
//<p>Hide Entry Activity? <input type="checkbox" name="entryact" id="entryactOff" placeholder="${uv['entryactOff']}"></p>
//<p>Hide Battle Activity? <input type="checkbox" name="battleact" id="battleactOff" placeholder="${uv['battleactOff']}"></p>
//<p>Hide Recent Battles? <input type="checkbox" name="battleact" id="recentbrOff" placeholder="${uv['recentbrOff']}"></p>
//<p>Hide Activity Log? <input type="checkbox" name="actlog" id="actlogOff"  placeholder="${uv['actlogOff']}"></p>
function checkIfTrue(target) {
    if (uv[target] == "on") {
        document.getElementById(target).checked = true;
    }
}
    botbSettings.innerHTML += settingsMenu;
    checkIfTrue("jessdateOn");
    checkIfTrue("altlayoutOn");
    checkIfTrue("burfsOff");
    checkIfTrue("entryactOff");
    checkIfTrue("battleactOff");
    checkIfTrue("actlogOff");

    document.getElementById("jessave").addEventListener("click", function(){ jessave(); });
    document.getElementById("jessclear").addEventListener("click", function(){ jessclear(); });
    }
} // end of customSettings();
var settingsCheck = setInterval(customSettings, 2000);


}); // this is the end of what used to be that huge style function

// start of special settings editor code
async function jessave() {
    var inputGuys = document.querySelectorAll("#jessettings > p > input");
    var sName, sValue, sPlaceholder, sId;
    for (let z = 0; z < inputGuys.length; z++) {
        sId = inputGuys[z].id;
        sPlaceholder = inputGuys[z].getAttribute("placeholder");
        sValue = inputGuys[z].value;
        // logic :o
        if (inputGuys[z].checked == true) {
            await GM.setValue(sId,"on");
        } else
        if (inputGuys[z].checked == false && inputGuys[z].type == "checkbox") { // seriously?
            await GM.setValue(sId,"off");
        } else
        if (sValue != "" && sValue != sPlaceholder) {
            await GM.setValue(sId,sValue);
        }
    }
    await document.getElementById("jessettings").insertAdjacentHTML("beforeend",'<span class="savemsg">Saved (maybe)</span>');
    setTimeout(function(){ document.querySelector(".savemsg").style.display = 'none'; }, 3000);
}
async function jessclear() {
    var arrayOfKeys = await GM.listValues();
    for (let y = 0; y < arrayOfKeys.length; y++) {
       await GM.deleteValue(arrayOfKeys[y]);
    }
    document.getElementById("jessettings").insertAdjacentHTML("beforeend",'<span class="delmsg">Deleted (maybe)</span>');
    setTimeout(function(){ document.querySelector(".delmsg").style.display = 'none'; }, 3000);
}

// start of page cleanup, declaring things
const matches = document.querySelectorAll("span.countdown"); // you can tell I did this first
var now = Date.now();
let patreon = document.querySelector("[href='https://www.patreon.com/battleofthebits']");
let avatarLink = document.querySelector("#homeMenu > div > div > div.botbrAvatar > a");
let bandcamp = document.querySelector("[href='http://battleofthebits.bandcamp.com']");
const sideSeperators = document.querySelectorAll("#SIDE_BOX > div.hSeperator");
const otherSideSeperators = document.querySelectorAll("#homeMenu > div > div > div.hMiniSeperator");
patreon.id = 'patreonLink';
bandcamp.id = 'bandcampLink';
let butts = document.querySelectorAll("div.menu_butt");
var frights = document.querySelectorAll("div.fright.alignR");
var iframeGuys = document.querySelectorAll("iframe");
var footGuys = document.querySelectorAll(".footerMenu");
var ultimoFoot = footGuys[footGuys.length -1];
// make Recent Activity into the same kind of span as the other collapsible things
var recentAL = document.evaluate("//span[contains(text(), 'Recent Activity..')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (recentAL != null) {
    recentAL.classList.add("tb2");
    recentAL.innerText = "Activity Log"; // had to rename this to stop it from breaking
}
var teeTwos = document.querySelectorAll("div > div.inner.clearfix > span.t2, div > div.inner.clearfix > span.tb2"); // will this burn me if I leave the main page?

// clicking to hide stuff ... this is a pain because I am used to wrapping the links in their own div or something
//  https://stackoverflow.com/questions/16308779/how-can-i-hide-show-a-div-when-a-button-is-clicked ; but this is pretty standard stuff
    function showHide(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block') {
          e.style.display = 'none';
       } else {
          e.style.display = 'block';
       }
    }
    function goInDiv(source,destination) {
        var mooom = source.parentNode;
        var moveThis = mooom.querySelectorAll("a.inner.boxLink, div.hMiniSeperator, div.t0:not(.padL):not(.fright)");
        source.classList.add("toggler");
        source.insertAdjacentHTML('afterend','<div id="'+destination+'">');
        var divOut = document.getElementById(destination);
        var mt;
        for (mt = 0; mt < moveThis.length; mt++) {
            divOut.appendChild(moveThis[mt]);
        }
        // if you moved the radio button into a div, put it back
        var speakerGuy = document.querySelectorAll("#"+destination+" > a.speakerPopout");
        if(speakerGuy[0] !== undefined){
          mooom.insertBefore(speakerGuy[0],divOut);
         }
    }
// get the collapsible t2s
    for (let t2 = 0; t2 < teeTwos.length; t2++) {
        switch (teeTwos[t2].innerText) {
            case 'BotBr Burfdays':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("burf");
                }, false);
                goInDiv(teeTwos[t2],"burf");
                break;
            case 'Bulletins, News & Development':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("bnad");
                }, false);
                goInDiv(teeTwos[t2],"bnad");
                break;
            case 'Recent Battles':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("recentBR");
                }, false);
                goInDiv(teeTwos[t2],"recentBR");
                break;
            case 'Entry Activity':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("entryActBot");
                }, false);
                goInDiv(teeTwos[t2],"entryActBot");
                break;
            case 'Battle Activity':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("battleActBot");
                }, false);
                goInDiv(teeTwos[t2],"battleActBot");
                break;
            case 'Activity Log':
                teeTwos[t2].addEventListener("click", function(){
                    showHide("recentAL");
                }, false);
                goInDiv(teeTwos[t2],"recentAL");
                break;
            case ' Call to Arms': // puke, that whitespace almost made me cry :(
                teeTwos[t2].addEventListener("click", function(){
                    showHide("callTA");
                }, false);
                goInDiv(teeTwos[t2],"callTA");
                break;
        }
    }

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
// start of Jessica profile page code (useful for debugging and also hiii!)
    if (window.location.href == 'https://battleofthebits.org/barracks/Profile/Jessica+Robo/') {
        var jessProfile = document.querySelector("#profileMenu > div.ajaxContent > div > div > blockquote");
        var jessBlurb = `
<hr>
<p class="jessblurb">If you can see this, it means you installed some version (v0.2) of the userscript above and it
got all the way to the bottom of the page without reporting an error! This doesn't necessarily mean it ran successfully,
just that it works from your computer's perspective :o</span><br>
<p class="jessblurb">This script offers a few customization options in the <a href="https://battleofthebits.org/barracks/Settings/">Settings</a> page.</p>
`
        jessProfile.innerHTML += jessBlurb; // byeee
    }
})();
