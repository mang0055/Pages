var data;
var violation_category = [];
var list_violation_by_category = [];

document.addEventListener("DOMContentLoaded", function (event) {
    loadData();
});

function loadData() {
    console.log("loadData()");
    var req = new XMLHttpRequest();
    req.open('GET', 'data/dev-challenge-data.csv', false);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                init(req.responseText);
            }
        }
    };

    req.send(null);
}


function init(reqText) {
    // Convert CSV data to Json
    data = CSV2JSON(reqText);

    // Extract Violation Categories
    violation_category = getViolationCategories();

    //Prepare Data
    prepareData();

    showData();
}

function prepareData() {
    var totalViolationsCategories = violation_category.length;
    var totalViolations = data.length;

    // Iterate all violations and put into its respective categories
    for (var v = 0; v < totalViolationsCategories; v++) {
        var cv = []
        for (var i = 1; i < totalViolations; i++) {
            if (violation_category[v] == data[i].violation_category) {
                cv.push(data[i]);
            }
        }
        var violation = '{"cat_name":"' + violation_category[v] + '", "data":' + JSON.stringify(cv) + '}';
        list_violation_by_category.push(JSON.parse(violation));
    }
}

function showData() {
    showViolationsOnEachCategory();
    showRecentViolation();
}

function showViolationsOnEachCategory() {

    for (var i = 0; i < list_violation_by_category.length; i++) {
        var cat_name = list_violation_by_category[i].cat_name;
        var cat_violation = list_violation_by_category[i].data;
        var no_of_cat_violations = cat_name + ' = <strong>' + cat_violation.length + '</strong></br>';
        document.getElementById("output1").innerHTML += no_of_cat_violations;
    }

}

function showRecentViolation() {

    for (var i = 0; i < list_violation_by_category.length; i++) {
        var cat_name = list_violation_by_category[i].cat_name;
        var dates = [];
        for (var j = 0; j < list_violation_by_category[i].data.length; j++) {
            if (list_violation_by_category[i].data[j].violation_date != null) {
                dates.push(Date.parseExact(list_violation_by_category[i].data[j].violation_date, "yyyy-MM-dd H:mm"));
            }
        }
        var sorted = dates.sort(sortDates);
        var minDate = sorted[0];
        var maxDate = sorted[sorted.length - 1];

        document.getElementById("output2").innerHTML += '<strong>' + cat_name + '</strong> </br> <strong> Earliest:: </strong>' + minDate + ' <strong> Latest:: </strong>' + maxDate + '</br></br>';
    }

}

function sortDates(a, b) {
    return a.getTime() - b.getTime();
}

function getViolationCategories() {
    var vc = [];
    var totalViolations = data.length;

    for (var i = 1; i < totalViolations; i++) {
        vc.push(data[i].violation_category);
    }
    return vc.unique();
}

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return JSON.parse(str);
}

Array.prototype.contains = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

//https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}
