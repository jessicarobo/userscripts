// ==UserScript==
// @name         botb custom dev
// @author       Jessica Robo
// @version      0.3
// @namespace    http://battleofthebits.org/
// @description  Alternate layout and css for battleofthebits
// @updateURL    https://github.com/jessicarobo/userscripts/raw/main/botb%20custom.user.js
// @downloadURL  https://github.com/jessicarobo/userscripts/raw/main/botb%20custom.user.js
// @homepage     https://jessicarobo.com
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
// todo: maybe grab the showHide stuff and set an option to default to hidden
//
(function() {
'use strict';
const profilePage = "https://battleofthebits.org/barracks/Profile/Jessica+Robo/"; // ^O^
// user settings
// okay this function sort of turned into a big deal
async function getUserValues() {
//    console.log("DEBUG "+ await GM.listValues());
    var uVals = new Object();
    uVals['jessdateColor'] = await GM.getValue("jessdateColor","inherit");
    uVals['fiteColor'] = await GM.getValue("fiteColor","inherit");
    uVals['logoColor'] = await GM.getValue("logoColor","inherit");
    uVals['jessdateOn'] = await GM.getValue("jessdateOn","on");
    uVals['botbdateOn'] = await GM.getValue("botbdateOn","on");
    uVals['altlayoutOn'] = await GM.getValue("altlayoutOn","on");
    uVals['compactOn'] = await GM.getValue("compactOn","on");
    uVals['burfsOff'] = await GM.getValue("burfsOff","off");
    uVals['bnadOff'] = await GM.getValue("bnadOff","off");
    uVals['entryactOff'] = await GM.getValue("entryactOff","off");
    uVals['battleactOff'] = await GM.getValue("battleactOff","off");
    uVals['actlogOff'] = await GM.getValue("actlogOff","off");
    uVals['recentbrOff'] = await GM.getValue("recentbrOff","off");
    uVals['bgImage'] = await GM.getValue("bgImage","https://battleofthebits.org/disk/debris/botb_bg.png");

    return uVals;
}
var cssOptions; // declaring this for no reason, but maybe later I can handle all this CSS more intelligently
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
           if (uv['botbdateOn'] == "on") {
              var bdate = "inline";
           } else {
              bdate = "none";
           }
// you better make that into a function before you do any more ^

// apparently I need this too oops
// https://nimishprabhu.com/convert-rgb-to-hex-and-hex-to-rgb-javascript-online-demo.html
function rgb2hex(r, g, b) {
    try {
        var rHex = parseInt(r).toString(16).padStart(2, '0');
        var gHex = parseInt(g).toString(16).padStart(2, '0');
        var bHex = parseInt(b).toString(16).padStart(2, '0');
    } catch (e) {
        return false;
    }
    if (rHex.length > 2 || gHex.length > 2 || bHex.length > 2) return false;
    return '#' + rHex + gHex + bHex;
}
// Color lightenin' function
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors (nice)
function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if ( r > 255 ) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if ( b > 255 ) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if ( g > 255 ) g = 255;
    else if ( g < 0 ) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
        // using the above
var defCol = window.getComputedStyle(document.body).getPropertyValue("color");
var defaultCol = defCol.slice(4,17);
var defaultColA = defaultCol.trim().split(/\s*,\s*/);
defaultCol = rgb2hex(defaultColA[0], defaultColA[1], defaultColA[2]); // this is also one of the logo colors
var lighterCol = LightenDarkenColor(defaultCol,30);
var darkerCol = LightenDarkenColor(defaultCol,-30);
        // jeez this should be in the function I guess, oh well too late now

var lCol = window.getComputedStyle(document.querySelector("a")).getPropertyValue("color");
var defaultL = lCol.slice(4,17);
var defaultLA = defaultL.trim().split(/\s*,\s*/);
var defaultLink = rgb2hex(defaultLA[0], defaultLA[1], defaultLA[2]); // I think this is a logo color too
if (uv['logoColor'] == "inherit") {
    uv['logoColor'] = defaultCol;
}
if (uv['fiteColor'] == "inherit") {
    uv['fiteColor'] = defaultLink;
}
var lightL = LightenDarkenColor(uv['logoColor'],30);
var darkL = LightenDarkenColor(uv['logoColor'],-30);
var styles = `
@keyframes jessmorph {
  0% { color: #fc6ab5; }
  25% { color: #fc6ae3; }
  50% { color: #f36afc; }
  75% { color: #fc6ae3; }
  100% { color: #fc6ab5; }
}
@keyframes userglow {
  0% { color: ${defaultCol}; }
  25% { color: ${lighterCol};}
  50% { color: ${defaultCol}; }
  75% { color: ${darkerCol}; }
  100% { color: ${defaultCol}; }
}
@keyframes logomorph {
  0% { color: ${lightL}; }
  25% { color: ${uv['logoColor']}; }
  50% { color: ${darkL}; }
  75% { color: ${uv['logoColor']}; }
  100% { color: ${lightL}; }
}
    .hSeperator.compact {
    height: 15px;
}
    .hMiniSeperator.compact {
    height: 3px;
}
    #jessbeghast {
    color: ${uv['jessdateColor']};
    font-weight: bold;
    margin-top: 1rem;
}
    #jessettings {
    background-color: rgba(16,16,16,0.7);
    color: #dbdbff;
    text-align: center;
    line-height: 120%;
}
    #jessettings ul {
    margin: auto;
    width: 520px;
    text-align: left;
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
    font-weight: normal;
}
    span.countdown {
    display: ${bdate} !important;
}
    body, #pageWrap {
    background-image: url("${uv['bgImage']}");
}
    .jessblurb {
    font-size: 1rem;
    line-height: 1.3rem;
}
    .logo, .logo2 {
    animation: logomorph 4s linear infinite;
}
    .compact .logo, .compact .logo2 {
    height: 38px;
    font-size: 49px;
}
    .robo {
    font-weight: bold;
    animation: jessmorph 5s infinite;
}
    #patreonLink, #bandcampLink {
    display: none;
}
    a[href="${profilePage}"] {
      animation: colorRotate 6s linear 0s infinite;
}

@keyframes colorRotate {
  from {
    color: #6666ff;
  }
  10% {
    color: #0099ff;
  }
  50% {
    color: #00ff00;
  }
  75% {
    color: #ff3399;
  }
  100% {
    color: #6666ff;
  }
}
    .toggler:hover {
    animation: userglow 1s linear infinite;
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
    #footer.compact #footerMSG .footerMenu a {
    padding: 1px 7px 0 0;
}
    .colortest {
    width: 20px;
    height: 20px;
    margin-left: 1rem;
    display: inline-block;
    vertical-align: top;
}
   #MENU + .compact {
   display:none;
}
#battleActBot.compact a + div.hMiniSeperator.compact {
   display: none;
}
`
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
        if (uv['compactOn'] == "on") {
           var divs = document.querySelectorAll("div");
           for (let d = 0; d < divs.length; d++) {
              divs[d].classList.add('compact');
           }
        }
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
// this seems to have made some visual issues with the dropdown menus?
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
           if ( sidebarGuys[h].title == 'Begast XHB' || sidebarGuys[h].title == 'EditProfile') {
              sidebarGuys[h].style.display = 'none';
              var aichplusone = h + 1;
              otherSideSeperators[aichplusone].style.display = 'none';
           }
        }
    }
// uhhhhh let's move this to the bottom
    ultimoFoot.innerHTML += '<a href="http://battleofthebits.bandcamp.com/">Bandcamp</a><a href="https://www.patreon.com/battleofthebits">Patreon</a>';
// hide some seperators... watch it, this might get ugly on subpages
    sideSeperators[2].style.display = 'none';
    sideSeperators[3].style.display = 'none';
// trying to save some vertical space by moving those small "hosted by" messages
        var currentHosts = document.querySelectorAll("a.clearfix > div > span.tiny");
            for (let cH = 0; cH < currentHosts.length; cH++) {
                var desty = currentHosts[cH].parentNode.parentNode.querySelector('div[style="padding-left:72px;"]');
                desty.insertAdjacentHTML("beforeend",'<br><span class="t0">'+currentHosts[cH].innerHTML+'</span>');
                currentHosts[cH].style.display = "none";
                var lastbr = currentHosts[cH].parentNode.querySelector('.jessdate + br');
                if (lastbr != null) { lastbr.style.display = "none"; }
            }
 } // end of the if ... copy-paste ruined the indent
// https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes#1573141
function getHexColor(colorStr) {
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}
function hexListener(fieldid) {
    var target = document.getElementById(fieldid);
    function replaceWithHex(target) {
       if (target.value) {
           console.log(target.value);
           let out = getHexColor(target.value);
           if (out != defaultCol) {
               target.value=out;
           }
       }
    }
    target.addEventListener("blur", function(){
        replaceWithHex(target);
        var colorbox = target.parentNode.querySelector(".colortest")
        colorbox.style.background = target.value;
    });
}
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
<h2>Background image</h2>
<p>Remember, this is only visible for you! Some ideas:</p>
<ul>
<li>https://battleofthebits.org/disk/debris/botb_bg.png</li>
<li>https://opengameart.org/sites/default/files/styles/medium/public/seamless%20space_0.PNG</li>
<li>https://content.mycutegraphics.com/backgrounds/hearts/tiny-cute-hearts-on-black-background.gif</li>
<li>https://vgmusic.com/images/background.jpg</li>
</ul>
<p><input type="url" id="bgImage" name="bgImage" size="40" placeholder="${uv['bgImage']}"></p>
<h2>Layout options</h2>
<p>Show normal botb countdowns? <input type="checkbox" id="botbdateOn" name="botbdateOn" placeholder="${uv['botbdateOn']} value="${uv['botbdateOn']}"></p>
<p>Show calculated date/times? <input type="checkbox" id="jessdateOn" name="jessdateOn" placeholder="${uv['jessdateOn']} value="${uv['jessdateOn']}"></p>
<p>Use alternate layout? <input type="checkbox" id="altlayoutOn" name="altlayout" placeholder="${uv['altlayoutOn']} value="${uv['altlayoutOn']}"></p>
<p>Use compact mode (slightly smaller)? <input type="checkbox" id="compactOn" name="compactOn" placeholder="${uv['compactOn']} value="${uv['compactOn']}"></p>
<h2>Colors</h2>
<p>Date/Time color: <input size="11" placeholder="${uv['jessdateColor']}" id="jessdateColor" name="jessdateColor"><span class="colortest"></span></p>
<p>FITE!! color: <input size="11" placeholder="${uv['fiteColor']}" id="fiteColor" name="fiteColor"><span class="colortest"></span></p>
<p>BotB logo color: <input size="11" placeholder="${uv['logoColor']}" id="logoColor" name="logoColor"><span class="colortest"></span></p>

<hr>
<div id="heartofthesun"><h2>Controls</span></h2>
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
    checkIfTrue("botbdateOn");
    checkIfTrue("jessdateOn");
    checkIfTrue("altlayoutOn");
    checkIfTrue("compactOn");
    checkIfTrue("burfsOff");
    checkIfTrue("entryactOff");
    checkIfTrue("battleactOff");
    checkIfTrue("actlogOff");
    hexListener("jessdateColor");
    hexListener("logoColor");
    hexListener("fiteColor");

    document.getElementById("jessave").addEventListener("click", function(){ jessave(); });
    document.getElementById("jessclear").addEventListener("click", function(){ jessclear(); });
    }
} // end of customSettings();
var settingsCheck = setInterval(customSettings, 1500);


}); // this is the end of what used to be that huge style function & is now a Promise

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

// put your selected text into a variable ... not used yet
// https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text#5379408
   function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
// clicking to hide stuff ... this is a pain because I am used to wrapping the links in their own div or something. also i think botb has jquery but alas
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
        let humanDate = outputDate.toLocaleString("en-us", { timeStyle: "medium", dateStyle: "short" });
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
           let humanDate = outputDate.toLocaleString("en-US", { timeStyle: "medium", dateStyle: "short" });
           document.getElementById("jessbeghast").innerHTML = "Start time: "+humanDate;
           }
       setInterval(recalculate,1000);
       }
// start of Jessica profile page code (useful for debugging and also hiii!)
    if (window.location.href == 'https://battleofthebits.org/barracks/Profile/Jessica+Robo/') {
        var jessProfile = document.querySelector("#profileMenu > div.ajaxContent > div > div > blockquote");
        var jessBlurb = `
<hr>
<p class="jessblurb">If you can see this, it means you installed some version (v0.3) of the userscript above and it
got all the way to the bottom of the page without reporting an error! This doesn't necessarily mean it ran successfully,
just that it works from your computer's perspective :o</span><br>
<p class="jessblurb">This script offers a few customization options in the <a href="https://battleofthebits.org/barracks/Settings/">Settings</a> page.</p>
`
        jessProfile.innerHTML += jessBlurb; // byeee
    }
})();
