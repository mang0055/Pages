var btn_loadData = {};
var btn_showNext = {};
var jsonData = {};
var currentIndex = 0;
var totalsize;
var tempFlag = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    btn_loadData = document.getElementById("loadBtn");
    btn_showNext = document.getElementById("showBtn")
    btn_loadData.addEventListener('click', loadData);
    btn_showNext.addEventListener('click', next);

});

function loadData() {
    console.log("loadData()");
    var req = new XMLHttpRequest();
    req.open('GET', 'https://raw.githubusercontent.com/mang0055/MAD9014/master/MidTerm/users.json', false);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //users.json is fetched
                parseJson(req.responseText);
            }
        }
    }
    if (btn_loadData.className === 'btn enabled') {
        req.send(null);
    }

}

function parseJson(obj) {
    jsonData = JSON.parse(obj);
    totalsize = jsonData.length;
    btn_loadData.className = "btn disabled";
    btn_loadData.removeEventListener('click', loadData);
    btn_showNext.className = "btn enabled";
}

function next() {
    if (btn_showNext.innerHTML != 'Show Next') {
        console.log("written show next");
        btn_showNext.innerHTML = 'Show Next';
    }

    if (currentIndex < totalsize) {
        setFeedByIndex(currentIndex);
    }
    if (currentIndex === (totalsize - 1)) {
        btn_showNext.removeEventListener('click', next);
        alert('Its End! Refresh the page to see it again.');
    }
    currentIndex++;
    console.log("next()");
}

function setFeedByIndex(index) {
    var outputDiv = document.getElementById("output1");
    outputDiv.innerHTML = '<img src="' + jsonData[index]['image'] + '"><h2>' + toTitleCase(jsonData[index]['firstName']) + ' ' + toTitleCase(jsonData[index]['lastName']) + '</h2><a href="mailto:' + jsonData[index]['email'] + '">' + jsonData[index]['email'] + '</a></div>';
    if (currentIndex != 0) {
        var rightDiv = document.getElementById("output2");
        var data = rightDiv.innerHTML;
        console.log(tempFlag);
        data = data + '<div class="oldData"><div><img src="' + jsonData[index - 1]['thumbnail'] + '"><a href="mailto:' + jsonData[index - 1]['email'] + '">' + toTitleCase(jsonData[index - 1]['firstName']) + ' ' + toTitleCase(jsonData[index - 1]['lastName']) + '</a></div></div>';
        rightDiv.innerHTML = data;
    }
    if (tempFlag > 2) {
        rightDiv.removeChild(rightDiv.childNodes[1]);
    }
    tempFlag++;
}
//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}