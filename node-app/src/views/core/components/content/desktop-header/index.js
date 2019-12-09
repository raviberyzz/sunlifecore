console.log('desktop-header loaded');
$(document).ready(function(){
    $("#language-btn-container, #sunLanguageCrossBtn").click(function(){
        $("#sun-search").hide();
        $("#sun-language").toggle();
    });
    $("#search-btn-container").click(function(){
        $("#sun-language").hide();
        $("#sun-search").toggle();
    });
});