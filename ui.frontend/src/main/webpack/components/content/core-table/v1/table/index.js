$(document).ready(function () {
    //Function is used to update the table class in all table element inside sl-table class
     function init() {
        const $table = $(".sl-table table");
        $table?.addClass("table")
    }
    init();
});