/* id vendor js */
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();

}

$(document).ready(function() {
    $("#masterProcastinator").hide();
    $("#seniorProcastinator").hide();
    $("#lowProcastinator").hide();

    $(".primary-yellow-button-form button #procastinatorData").css("color", "white ");
    $("#procastinatorData").attr('disabled', 'disabled');
    $("#procastinatorData").css("background-color", "#cccccc");
    $("#procastinatorData").css("cursor", "default ");

    var input = document.querySelectorAll('select[id^="procrastinatorOption"]');
    for (var i = 0; i < input.length; i++) {
        input[i].addEventListener('change', function(event) {
            event.preventDefault();
            var divsValueCheck = [...document.querySelectorAll('select[id^="procrastinatorOption"]')].map(sel => sel.value);
            if (divsValueCheck.includes("0")) {
                $("#procastinatorData").attr('disabled', 'disabled');
                $("#procastinatorData").css("background-color", "#cccccc");
                $("#procastinatorData").css("cursor", "default ");

            } else {

                $(".primary-yellow-button-form button #procastinatorData").css("color", "white ");
                $("#procastinatorData").removeAttr('disabled');
                $("#procastinatorData").css("background-color", "rgb(255, 203, 5)");
                $("#procastinatorData").css("cursor", "pointer ");
                $("#procastinatorData").click(function() {
                    var total = 0;
                    var resTotal = document.querySelectorAll('select[id^="procrastinatorOption"]').forEach(sel => total += +sel.value);
                    var parsedTotal = parseInt(total);
                    if (parsedTotal >= 25 && parsedTotal <= 30) {
                        $("#procastinator_tool").hide();
                        $(window).scrollTop(0);
                        $("#masterProcastinator").show();
                        $("#seniorProcastinator").hide();
                        $("#lowProcastinator").hide();
                    } else if (parsedTotal >= 16 && parsedTotal <= 24) {
                        $("#procastinator_tool").hide();
                        $(window).scrollTop(0);
                        $("#masterProcastinator").hide();
                        $("#lowProcastinator").hide();
                        $("#seniorProcastinator").show()
                    } else if (parsedTotal >= 10 && parsedTotal <= 15) {
                        $("#procastinator_tool").hide();
                        $("#masterProcastinator").hide();
                        $("#seniorProcastinator").hide();
                        $(window).scrollTop(0);
                        $("#lowProcastinator").show();
                    }
                    $("#procrastinatorSocial  .fa-facebook-square").attr('onclick', 'shareFB()');
                    $("#procrastinatorSocial .fa-linkedin-square").attr('onclick', 'shareLinkedIn()');
                    $('#procrastinatorSocial .fa-copy').attr('onclick', 'copyToClipboard("#copyURL")');
                    if (window.innerWidth <= 768) {

                        if ($('#procrastinatorSocial  img').attr("alt") === "procrastinatorDesktopOnly") {
                            $('#procrastinatorSocial  img').hide();
                        }
                    }

                })
            }

        })
    }
})