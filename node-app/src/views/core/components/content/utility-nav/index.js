console.log('utility-nav loaded');
$(document).ready(function(){
    $("#language-btn-container,#sunLanguageCrossBtn").click(function(){
        $("#sun-search").hide();
        $("#sun-language").toggle();
    });
    $("#search-btn").click(function(){
        $("#sun-language").hide();
        $("#sun-search").toggle();
    });
});