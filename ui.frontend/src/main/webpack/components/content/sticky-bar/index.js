$(document).ready(function () {
    $("#stickyBarLinks li a").click(function () {
        $("#stickyBarLinks li a").removeClass("active");
        $(this).addClass("active");
    });
});