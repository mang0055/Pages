var stepNum = {
    pageNum: 1,
    dataPassed: ""
};
var flipflop=0;
$(document).on("mobileinit", function () {});
$(document).on("ready", function (ev) {
    $('.ui-btn').on("click", function () {
        var usersid = $(this).attr("id");
        if (usersid == 'btn_change') {
            if((flipflop%2)==0){
                $.mobile.changeGlobalTheme("b");    
            }
            else{
                $.mobile.changeGlobalTheme("a");
            }
            flipflop++;
        }
    });
    $("#startShow").on("click", function (ev) {
        ev.preventDefault();
        if (localStorage.getItem("step")) {
            stepNum = JSON.parse(localStorage.getItem("step"))
        }
        var returnPage = "#won" + stepNum.pageNum.toString();
        $.mobile.pageContainer.pagecontainer("change", returnPage)
    });
    $(".nextP").on("click", function (ev) {
        if(stepNum.pageNum>0){
            stepNum.pageNum += 1;
            localStorage.setItem("step", JSON.stringify(stepNum))
        }
        
    });
    $(".backP").on("click", function (ev) {
        if(stepNum.pageNum>1){
        stepNum.pageNum -= 1;
        localStorage.setItem("step", JSON.stringify(stepNum))
        }
        
    })
});
$(function () {
    $("#mypanel").panel();
});
$.mobile.changeGlobalTheme = function (theme) {
    // These themes will be cleared, add more
    // swatch letters as needed.
    var themes = " a b c d e";
    // Updates the theme for all elements that match the
    // CSS selector with the specified theme class.
    function setTheme(cssSelector, themeClass, theme) {
        $(cssSelector)
            .removeClass(themes.split(" ").join(" " + themeClass + "-"))
            .addClass(themeClass + "-" + theme)
            .attr("data-theme", theme);
    }

    // Add more selectors/theme classes as needed.
    setTheme(".ui-mobile-viewport", "ui-overlay", theme);
    setTheme("[data-role='page']", "ui-body", theme);
    setTheme("[data-role='header']", "ui-bar", theme);
    setTheme("[data-role='listview'] > li", "ui-bar", theme);
    setTheme(".ui-btn", "ui-btn-up", theme);
    setTheme(".ui-btn", "ui-btn-hover", theme);
};