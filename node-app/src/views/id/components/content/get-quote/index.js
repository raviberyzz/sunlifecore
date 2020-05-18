function openBCPanel() {
    $(".qc_main").slideDown(300, function() {
        setTimeout(function() {
            $("#qc_q1").addClass("qc_q_start");
            $("#qc_q1 #txt").addClass("qc_qt_start");
            if ($(window).width() <= 767)
                $('html,body').animate({
                    scrollTop: $("#qc_container").offset().top - 60
                }, 'easeInSine');
        }, 0.5);
    });
}

var advsleadClk = true;


function initQC() {
    $("#qc_q1_ans").val("");
    $("#qc_q4_ans").val("");
    $("qc_q3_ans_Frequency_Trad").val("");
    $("#qc_q5_ans").val("");
    /**
     * 
     */
    $("#product").val(getProductName());
    //showProductSpecificElements();
    dd2open = 0;
    $('#qc_q4').find('.qc_dropdown').val('');
    $('#qc_q3').find('.qc_dropdown').val('');
}

//display on screen specific elements 
//like for VUL and Traditional products have different frequency value.
function showProductSpecificElements() {
    var productGroup = $("#product optgroup option:selected").parent().attr("label");

    if (productGroup != null && productGroup.toUpperCase() == "TRAD") {
        $("#qc_q4_ans").remove();
        $("#qc_q4_ans").removeClass("hidden");
    }
    if (productGroup != null && productGroup.toUpperCase() == "VUL") {
        $("#qc_q4_ans_Frequency_Frequency_Vul").removeClass("hidden");
        $("#qc_q4_ans").remove();
    }
    if (null != $("#product optgroup option:selected").attr("class")) {
        var selectedEleClassArr = $("#product optgroup option:selected").attr("class").split(' ');
        selectedEleClassArr.forEach(function(a) {
            if (a.indexOf("displayno_") > -1) {
                var hiddenClassId = a.split("displayno_")[1];
                $("#" + hiddenClassId).addClass("hidden");
            }

        });
    }
}
//calculation of age from birthdate.
function getAge() {

    var dobArr = $("#qc_q1_ans").val().split("/");
    var dobDay = dobArr[0];
    var dobMonth = dobArr[1];
    var dobYear = dobArr[2];
    var ageDifMs = Date.now() - new Date("" + dobYear + "-" + dobMonth + "-" + dobDay).getTime();
    var age = Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
    return age;
}

// Function for calculation year only
function getAgeYear() {

    var dobArr = $("#qc_q1_ans").val().split("/");

    var ageYear = new Date(dobArr).getFullYear();
    return ageYear;
}

//Age range between 18 to 70


//get product name from current page.
function getProductName() {

    var productName = "";
    var breadcrumbPathArr = utag_data.page_breadcrumb.split("/");
    productName = breadcrumbPathArr[breadcrumbPathArr.length - 1].trim().replace(/ /g, "_");
    return productName;
}


var qc_optgender = "";
//var qc_optsmoke = "";
var qc_year = 0;
var qc_freq = ""
var dd2open = 0;
var dd1open = 0;
var qc_formvalid = false;
var investmentAmountVal = "";
var maxCoverage = "";
var minCoverage = "";
var bandProduct = false;
var qc_ans_5 = 0;
var band = "";
var product_name = "";

function validateAge(age) {
    var age1 = getAge();
    productName = getProductName();
    $('.qc_returnzero_error_msg').remove();

    if ($("#qc_q1_ans").val() == null || $("#qc_q1_ans").val() == "") {
        return false;
    } else if (age1 > 70 || age1 < 5 && productName == "Term_Life") {

        var enMsg = "Age range only applies from 5 to 70</div>";
        var idMsg = "Rentang usia hanya dari usia 5 hingga 70 tahun";
        var printMsg = (langcalc == "en") ? enMsg : idMsg;
        $('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>" + printMsg + '</div>');
        return false;
    } else if (age1 > 70 || age1 < 18 && productName == "Asuransi_Brilliance_Sejahtera") { // Asuransi_Brilliance_Sejahtera Product Range condition
        var enMsg = "Age range only applies from 18 to 70</div>";
        var idMsg = "Rentang usia hanya dari usia 18 hingga 70 tahun";
        var printMsg = (langcalc == "en") ? enMsg : idMsg;
        $('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>" + printMsg + '</div>');
        return false;
    } else {
        $('.btn-blue-lead.btn[for]').css('pointer-events', 'auto');
    }

    if (band == "band1" && age1 <= 17) {
        $('.qc_returnzero_error_msg').remove();
        var enMsg = "Age should be greater than 17 for this investment</div>";
        var idMsg = "Umur harus lebih dari 17 untuk investasi ini";
        var printMsg = (langcalc == "en") ? enMsg : idMsg;
        $('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>" + printMsg + '</div>');
        return false;
    }
    return true;
}
$(document).ready(function() {

    initQC();

    var options = {
        format: 'dd/mm/yyyy',
        container: $('.qc_main_9col'),
        todayHighlight: true,
        autoclose: true,
        endDate: '+0d'
    };
    $('.form_date').datepicker(options);
    $('.form_date').datepicker()
        .on("show", function(e) {
            if (!$("#qc_q1_ans_main").hasClass("isAns")) {
                $("#qc_q1_ans_main").addClass("isAns");
            }
        });
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        $('#qc_q3_ans_Frequency_Trad').prepend('<option value="" selected="selected" disabled="disabled"></option>');
        $('#qc_q4_ans').prepend('<option value="" selected="selected" disabled="disabled"></option>');
    }
    product_name = getProductName();


    //validate each fields value.
    function checkSubmit() {

        if (product_name == "Term_Life") {
            checkSubmit1(1);
        } else if (product_name == "Asuransi_Brilliance_Sejahtera") {
            checkSubmit1(2);
        }

    }

    function checkSubmit1(product_number) {
        if (product_number == 1 && validateAge($("#qc_q1_ans").val()) == true && qc_optgender != "" && $("#qc_q3_ans_Frequency_Trad").val() != "" && $("#qc_q4_ans").val() != "" && $("#qc_q5_ans").val() != "") {

            //validateAmount($("#qc_q5_ans").val());
            qc_formvalid = true;

            if (!$(".qc_submit_btn a").hasClass("btn-yellow")) {
                $(".qc_submit_btn a").removeAttr("disabled");
                $(".qc_submit_btn a").removeClass("btn-blue").addClass("btn-yellow");
            }

        } else if (product_number == 2 && validateAge($("#qc_q1_ans").val()) == true && qc_optgender != "") {
            qc_formvalid = true;

            if (!$(".qc_submit_btn a").hasClass("btn-yellow")) {
                $(".qc_submit_btn a").removeAttr("disabled");
                $(".qc_submit_btn a").removeClass("btn-blue").addClass("btn-yellow");
            }
        } else {

            qc_formvalid = false;
            if (!$(".qc_submit_btn a").hasClass("btn-blue")) {
                $(".qc_submit_btn a").attr("disabled", "disabled");
                $(".qc_submit_btn a").removeClass("btn-yellow").addClass("btn-blue");
            }
        }
    }

    function validateNumericalChar(value) {

        var regex = /^[0-9]\d*((\.\d{0,2})?)$/;
        if (value != "" && regex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    $("#qc_result1").on('click', function() {
        if (!$("#qc_result1").hasClass('qc_bg_yellow')) {
            $("#qc_result1").removeClass('qc_bg_grey');
            $("#qc_result1").addClass('qc_bg_yellow');
            $("#qc_result1 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
            for (var i = 2; i < 4; i++) {
                if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow')) {
                    $("#qc_result" + i).removeClass('qc_bg_yellow');
                    $("#qc_result" + i).addClass('qc_bg_grey');
                    $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                }
            }
        }
        // Tagging for talk to us Asuransi_Brilliance_Sejahtera
        var premRate = $("#result_1").text().replace(":", "=");
        var urll = window.location.href;
        var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
        var age = getAgeYear();
        var inputText1 = $(".qc_result_plan_title").text();

        if (productName == "Asuransi_Brilliance_Sejahtera") {
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: " " + productName + ":year of birth=" + age + ":gender=Male:result=" + inputText1 + ":" + premRate + "",
                    page_url: "+ urll+"
                });
                advsleadClk = false;
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Female:result=" + inputText1 + ":" + premRate + "",
                    page_url: "+ urll+"
                });
                advsleadClk = false;
            }
        } //Tagging for Term_Life Talk to Us click
        else if (productName == "Term_Life") {
            //Tagging for Term_Life submit
            var sumAssured = $("#qc_q5_ans").val();
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
            var premium = $('#qc_result1').find('div.qc_result_price').text().replace(":", "=");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            }
        }
    });
    $("#qc_result2").on('click', function() {
        if (!$("#qc_result2").hasClass('qc_bg_yellow')) {
            $("#qc_result2").removeClass('qc_bg_grey');
            $("#qc_result2").addClass('qc_bg_yellow');
            $("#qc_result2 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');

            for (var i = 1; i < 4; i++) {
                if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow') && i != 2) {
                    $("#qc_result" + i).removeClass('qc_bg_yellow');
                    $("#qc_result" + i).addClass('qc_bg_grey');

                    $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                }
            }
        }
        // Tagging for talk to us
        var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
        var age = getAgeYear();
        var premRate1 = $("#result_1").text();
        var urll = window.location.href;
        var inputText2 = $(".qc_result_plan_title").text();

        if (productName == "Asuransi_Brilliance_Sejahtera") {
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Male:result=" + inputText2 + ":" + premRate1 + "",
                    page_url: "+ urll+"
                });
                advsleadClk = false;
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Female:result=" + inputText2 + ":" + premRate1 + "",
                    page_url: "+ urll+"
                });
                advsleadClk = false;
            }
        }
        //Tagging for Term_Life Talk to Us Second click
        else if (productName == "Term_Life") {
            //Tagging for Term_Life submit
            var sumAssured = $("#qc_q5_ans").val();
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
            var premium = $('#qc_result2').find('div.qc_result_price').text().replace(":", "=");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            }
        }
    });

    $("#qc_result3").on('click', function() {

        if (!$("#qc_result3").hasClass('qc_bg_yellow')) {
            $("#qc_result3").removeClass('qc_bg_grey');
            $("#qc_result3").addClass('qc_bg_yellow');
            $("#qc_result3 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');

            for (var i = 1; i < 4; i++) {
                if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow') && i != 3) {
                    $("#qc_result" + i).removeClass('qc_bg_yellow');
                    $("#qc_result" + i).addClass('qc_bg_grey');

                    $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                }
            }
        }
        //Tagging for Term_Life Talk to Us click
        else if (productName == "Term_Life") {
            //Tagging for Term_Life submit
            var sumAssured = $("#qc_q5_ans").val();
            var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
            var premium = $('#qc_result3').find('div.qc_result_price').text().replace(":", "=");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();

            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "premium plan",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
                advsleadClk = false;
            }
        }
    });

    function removeAllAnsCSS() {
        $("#qc_q1_ans_main").removeClass("isAns");
        $("#qc_q4_ans").removeClass("isAns");
        $("#qc_q5_ans_main").removeClass("isAns");
        if ($("#qc_q1_ans").val() != "" && !$("#qc_q1_ans_main").hasClass("isAnsOut"))
            $("#qc_q1_ans_main").addClass("isAnsOut");
        if ($("#qc_q1_ans").val() == "")
            $("#qc_q1_ans_main").removeClass("isAnsOut");
        if ($("#qc_q5_ans").val() != "" && !$("#qc_q5_ans_main").hasClass("isAnsOut"))
            $("#qc_q5_ans_main").addClass("isAnsOut");
        if ($("#qc_q5_ans").val() == "")
            $("#qc_q5_ans_main").removeClass("isAnsOut");
        if ($("#qc_q4_ans").val() != null && !$("#qc_q4_ans").hasClass("isAnsOut"))
            $("#qc_q4_ans").addClass("isAnsOut");
        if ($("#qc_q4_ans").val() == null || $("#qc_q4_ans").val() == "")
            $("#qc_q4_ans").removeClass("isAnsOut");
    }

    function removeAnsCSS(tmp) {
        $("#qc_q1_ans").removeClass("isAns");
    }

    $("#qc_q1_ans").on('change', function() {
        if ($("#qc_q1_ans_main").hasClass("isAns")) {
            $("#qc_q1_ans_main").removeClass("isAns");
        }
        if ($("#qc_q1_ans").val() != "" && !$("#qc_q1_ans_main").hasClass("isAnsOut"))
            $("#qc_q1_ans_main").addClass("isAnsOut");
        checkSubmit();
    });

    $("#qc_q1_ans").on('click', function() {
        if ($("#qc_q1_ans_main").hasClass("isAns")) {
            $("#qc_q1_ans_main").removeClass("isAns");
        } else {
            $("#qc_q1_ans_main").addClass("isAns");
        }
    });

    $("#qc_q1_ans").on('change', function() {
        if ($("#qc_q1_ans").val() != null) {
            var url1 = window.location.href;
            var ageA = getAgeYear();
            //Tagging for first interaction Asuransi_Brilliance_Sejahtera
            if (productName == "Asuransi_Brilliance_Sejahtera") {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "step 1:first interaction",
                    ev_data_two: "" + productName + ":year of birth=" + ageA + "",
                    page_url: "+url1+"
                });
            } //Tagging for first interaction Term_Life
            else if (productName == "Term_Life") {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "step 1:first interaction",
                    ev_data_two: "" + productName + ":year of birth=" + ageA + "",
                    page_url: "+url1+"
                });
            }
        }
    });
    $('.qc_button_group label[for="M"]').on('click', function() {
        qc_optgender = "1";
        $("#qc_q3_ans_Frequency_Trad").removeAttr("disabled");
        checkSubmit();
    });
    $("#qc_optionGender1").parent().on('click', function() {
        var url12 = window.location.href;
        var ageB = getAgeYear();
        //Tagging for Second interaction Asuransi_Brilliance_Sejahtera Male
        if (productName == "Asuransi_Brilliance_Sejahtera") {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 2",
                ev_data_two: "" + productName + ":year of birth=" + ageB + ":gender=Male",
                page_url: "+ url12 +"
            });
        } //Tagging for Second interaction Term_Life Male
        else if (productName == "Term_Life") {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 2",
                ev_data_two: "" + productName + ":year of birth=" + ageB + ":gender=Male",
                page_url: "+ url12 +"
            });
        }
    });

    $('.qc_button_group label[for="F"]').on('click', function() {
        qc_optgender = "2";
        $("#qc_q3_ans_Frequency_Trad").removeAttr("disabled");
        checkSubmit();
    });
    $("#qc_optionGender2").parent().on('click', function() {
        var url13 = window.location.href;
        var ageC = getAgeYear();
        //Tagging for Second  interaction Asuransi_Brilliance_Sejahtera Female
        if (productName == "Asuransi_Brilliance_Sejahtera") {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 2",
                ev_data_two: "" + productName + ":year of birth=" + ageC + ":gender=Female",
                page_url: "+ url13 +"
            });
        } //Tagging for Second interaction Term_Life Female
        else if (productName == "Term_Life") {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 2",
                ev_data_two: "" + productName + ":year of birth=" + ageC + ":gender=Female",
                page_url: "+ url13 +"
            });
        }
    });
    $('#qc_q3_ans_Frequency_Trad').on('click', function() {
        checkSubmit();
    });
    $('#qc_q3_ans_Frequency_Trad').on('change', function() {
        if ($("#qc_q3_ans_Frequency_Trad").val() != null) {
            $("#qc_q4_ans").removeAttr("disabled");
            //Tagging for Third interaction Term_Life year
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
            var url1t = window.location.href;
            var aget = getAgeYear();
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            if (productName == "Term_Life") {
                if (gender == 'M') {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 3",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + "",
                        page_url: "+url1t+"
                    });
                } else {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 3",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + "",
                        page_url: "+url1t+"
                    });
                }
            }
        }
    });
    $("#qc_q1_ans").keypress(function(event) {
        var value = String.fromCharCode(event.which);
        if (event.which != 8 && /*value!='/' &&*/ !validateNumericalChar(value)) {
            event.preventDefault();
        }
        var fieldValue = $("#qc_q1_ans").val();
        var valWithoutSlash = fieldValue.replace(new RegExp('/', 'g'), '');
        if (valWithoutSlash.length > 7) {
            event.preventDefault();
        }
        if (valWithoutSlash.length == 2 || valWithoutSlash.length == 4) {
            var output = '';
            output = sliceAndJoin(valWithoutSlash, '/', 2);
            if (valWithoutSlash.length == 4) {
                valWithoutSlash = output;
                output = sliceAndJoin(valWithoutSlash, '/', 5);
            }
            $("#qc_q1_ans").val(output);
        }
    });

    function sliceAndJoin(val, replace, pos) {
        return [val.slice(0, pos), replace, val.slice(pos)].join('');
    }
    $("#qc_q5_ans").on('change keydown paste input', function() {
        checkSubmit();
    });

    $("#qc_q5_ans").keypress(function(event) {
        var value1 = String.fromCharCode(event.which);
        if ((event.which != 8 && !validateNumericalChar(value1) && value1 != '.') || $("#qc_q5_ans").val().length >= 18) {
            event.preventDefault();
        } else {
            checkSubmit();
        }

    });
    $("#qc_q5_ans").on('click', function() {
        if (!$("#qc_q5_ans_main").hasClass("isAns")) {
            $("#qc_q5_ans_main").addClass("isAns");
        }
    });

    $(".qc_btn_calendar_main").on('click', function() {
        if (!$("#qc_q1_ans_main").hasClass("isAns")) {
            $("#qc_q1_ans_main").addClass("isAns");
        }
    });

    $("#qc_q5_ans").on('blur', function() {
        removeAllAnsCSS();

        var oldValue = $.trim($("#qc_q5_ans").val()).replace(new RegExp(',', 'g'), '');
        if (oldValue != "" && oldValue != null && validateNumericalChar(roundAmount(oldValue, 2))) {
            doInvestmentAmountWellFormat(oldValue);
        }
        //Tagging for Fifth interaction Expected sum assured:
        var sumAssured = $("#qc_q5_ans").val();
        var premiumMode = $('#qc_q4_ans').children('option:selected').text();
        var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
        var url1t = window.location.href;
        var aget = getAgeYear();
        var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
        var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
        if (productName == "Term_Life") {
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "step 5",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + "",
                    page_url: "+url1t+"
                });
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "step 5",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + "",
                    page_url: "+url1t+"
                });
            }
        }
    });

    $("#qc_q5_ans").on('click', function() {
        var value1 = $("#qc_q5_ans").val();
        if (value1 != "" && value1 != null) {
            var amountWithComma = $.trim(value1.toString().indexOf('IDR') > -1 ? value1.toString().split('IDR')[1] : value1);
            var amnt = amountWithComma.indexOf(',') > -1 ? amountWithComma.replace(new RegExp(',', 'g'), '') : amountWithComma;
            validateNumericalChar(amnt) ? $("#qc_q5_ans").val(amnt) : $("#qc_q5_ans").val("");
        }

        if (dd1open == 0) {
            dd1open = 1;
            $("#qc_q5_ans").addClass("isAns");
        } else {
            dd1open = 0;

            $("#qc_q5_ans").removeClass("isAns");
        }
    });

    function doInvestmentAmountWellFormat(actualVal) {
        qc_ans_5 = actualVal;
        $(".user_sum_assured").val(actualVal);
        if (langcalc == "en") {
            $("#qc_q5_ans").val('IDR ' + addCommas(roundAmount(actualVal, 2)));
        } else {
            $("#qc_q5_ans").val('Rp ' + addDot(roundAmount(actualVal, 2)));
        }
    }

    $("#qc_q1_ans").on('blur', function() {
        removeAllAnsCSS();
    });

    $("#qc_q4_ans").on('click', function() {
        validateFrequencyOfInvestment();
        if ($("#qc_q4_ans").val() != null) {
            $("#qc_q5_ans").removeAttr("disabled");
        }
    });

    $("#qc_q4_ans").on('change', function() {
        if ($("#qc_q4_ans").val() != null) {
            $("#qc_q5_ans").removeAttr("disabled");
            //Tagging for Fourth interaction Term_Life year annual
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            if (productName == "Term_Life") {
                if (gender == 'M') {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 4",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=10:payment mode=" + premiumMode + "",
                        page_url: "+url1t+"
                    });
                } else {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 4",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=10:payment mode=" + premiumMode + "",
                        page_url: "+url1t+"
                    });
                }
            }
        }
    });


    function validateFrequencyOfInvestment() {
        if (dd2open == 0) {
            dd2open = 1;
            $("#qc_q4_ans").addClass("isAns");
        } else {
            dd2open = 0;
            $("#qc_q4_ans").removeClass("isAns");
            if ($("#qc_q4_ans").val() != null && !$("#qc_q4_ans").hasClass("isAnsOut"))
                $("#qc_q4_ans").addClass("isAnsOut");
        }
        checkSubmit();
    }
    $("#qc_q4_ans").on('blur', function() {
        checkSubmit();
        removeAllAnsCSS();
    });
    $("#qc_submit .btn").click(function() {
        if (qc_formvalid) {
            var product = $('#product').val();
            var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
            var smoker = ""; //$("#qc_q3").find("div label.active").find("input").attr("name");
            var year = $("#qc_q3_ans_Frequency_Trad").val();
            var freq = $("#qc_q4_ans").val();
            //var freq = $('#qc_q4').find("select:not(:hidden)").val();
            var amount = qc_ans_5;
            var age = getAge();
            var key = "";
            //var product ='SunHealth_Medical1_Care';
            if (product == null) {
                product = getProductName();
            }
            if (product == "Term_Life" && validateAmount(qc_ans_5) == true && validateAge($("#qc_q1_ans").val()) == true) {
                key = band + '_' + age + '_' + gender;
                /*if(band=="band1" && year!="10"){
                	$('.qc_returnzero_error_msg').remove();
                	var enMsg="Please select 10 Years for this investment</div>";
                	var idMsg="Silakan pilih 10 Tahun untuk investasi ini";
                	var printMsg = (langcalc=="en")? enMsg : idMsg;
                	$('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>"+printMsg+'</div>');
                 }
                 else{*/
                showResult(key, product, freq, amount, age);
                //}
                //Tagging for Term_Life submit
                var sumAssured = $("#qc_q5_ans").val();
                var premiumMode = $('#qc_q4_ans').children('option:selected').text();
                var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
                var url1t = window.location.href;
                var aget = getAgeYear();
                var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
                if (gender == 'M') {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 6:last interaction",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + "",
                        page_url: "+url1t+"
                    });
                } else {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "clk",
                        ev_title: "quick quote",
                        ev_data_one: "step 6:last interaction",
                        ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female:payment period=" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + "",
                        page_url: "+url1t+"
                    });
                }
            } else if (product == "Asuransi_Brilliance_Sejahtera") {
                key = age + '_' + gender;
                freq = "0.0";
                amount = "0";
                showResult(key, product, freq, amount, age);
                var url2 = window.location.href;
                var ageD = getAgeYear();
                //tagging for Asuransi_Brilliance_Sejahtera
                if (gender == 'M') {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "submit",
                        ev_title: "quick quote",
                        ev_data_one: "step 3:last interaction",
                        ev_data_two: "" + productName + ":year of birth=" + ageD + ":gender=Male",
                        page_url: "+url2+"
                    });
                } else {
                    utag.link({
                        ev_type: "calc",
                        ev_action: "submit",
                        ev_title: "quick quote",
                        ev_data_one: "step 3:last interaction",
                        ev_data_two: "" + productName + ":year of birth=" + ageD + ":gender=Female",
                        page_url: "+ url2+"
                    });

                }
            }
            qc_formvalid = false;
        }

    });

    function showResult(key, product, freq, amount, age) {
        $(".qc_returnzero_error_msg").attr("hidden", "");
        $(".qc_loading_ani").show();
        // submit and jump to solution result page here




        var json = new Object();
        json.key = key;
        json.product = product;
        json.freq = freq;
        json.amount = amount;
        json.age = age;
        json.country = 'id';
        json.freq_text = "";
        json.dob = "";
        json.investmentYear = '';
        //	console.log("JSON:- " + JSON.stringify(json));
        jsonData = "data=" + JSON.stringify(json);


        request.done(function(data) {
            //setCoverageRange();
            var data1 = data.split('||');
            var arrayOfResult = data1[0].split(',');
            console.log(arrayOfResult);

            //Nan check for PHP data 
            if ((arrayOfResult[0].split("||").length) > 0) {

                if ($.trim(data[1]) != '') {
                    var obj = $.parseJSON(data[1]);
                    $('.qc_plan_cta a').attr('href', obj['advisorMatchUrl']);
                }
                /*Fixing issue of dots disappear before the Quote Result is displayed*/
                setTimeout(function() {
                    $(".qc_loading_ani").show();
                }, "2000");
                /*Fixing issue of dots disappear before the Quote Result is displayed*/
                $("#qc_result").slideUp(300, function() {

                    setTimeout(function() {
                        $(".qc_loading_ani").hide();
                        $("#qc_result").slideDown(500);
                    }, "2000");
                    //$(".qc_loading_ani").hide();
                });
                sumAssured = $(".user_sum_assured").val();
                //appending "/month" at the end with each price
                arrayOfResult.forEach(function(value, index) {
                    var elementItem = index + 1;
                    if (product == "Term_Life") {
                        //	var datavalue=addCommas($.trim(value));
                        if (band == 'band1') {
                            $('#qc_result2').hide();
                            $('#qc_result3').hide();
                        } else {
                            $('#qc_result2').show();
                            $('#qc_result3').show();
                        }
                        value = ((value / 100000) * sumAssured) / 1000;
                        var result = getPremium($.trim(value), freq);

                        $('#text_' + elementItem).html(addData_Term_Life(elementItem));
                        $('#result_' + elementItem).html(result);
                    } else if (product == "Asuransi_Brilliance_Sejahtera") {
                        if ($.trim(value) == 'NULL') {
                            $('#icon_' + elementItem).hide();
                            $('#result_' + elementItem).hide();
                        } else {
                            $('#icon_' + elementItem).show();
                            $('#result_' + elementItem).show();
                            if (elementItem == 1 || elementItem == 4) {
                                if (langcalc == 'en') {
                                    $('#result_' + elementItem).html("Premium:<br>IDR " + addCommas($.trim(value)) + " / year");
                                } else {
                                    $('#result_' + elementItem).html("Premi:<br>Rp " + addDot($.trim(value)) + " / tahun");
                                }
                                //$('#result_'+elementItem).html("IDR "+addCommas($.trim(value)/12)+"/month");
                            } else {
                                if (langcalc == 'en') {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addCommas($.trim(value)) + '</b>');
                                } else {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addDot($.trim(value)) + '</b>');
                                }
                            }

                        }
                    }
                });
                if (product == "Asuransi_Brilliance_Sejahtera") {
                    if (!$("#qc_result_2").hasClass('qc_bg_yellow')) {
                        $("#qc_result_2").removeClass('qc_bg_grey');
                        $("#qc_result_2").addClass('qc_bg_yellow');
                        $("#qc_result_2 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
                    }
                } else {
                    change_result_color();
                }

            }
            $(".qc_submit_btn a").attr("disabled", "disabled");
            $(".qc_submit_btn a").removeClass("btn-yellow");
            $(".qc_submit_btn a").addClass("btn-blue");
        });

        request.fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    }

    function change_result_color() {
        var year = $("#qc_q3_ans_Frequency_Trad").val();
        var result = 0;
        if (year == 10) {
            result = 1;
        } else if (year == 15) {
            result = 2;
        } else
            result = 3;

        if (!$("#qc_result" + result).hasClass('qc_bg_yellow')) {
            $("#qc_result" + result).removeClass('qc_bg_grey');
            $("#qc_result" + result).addClass('qc_bg_yellow');
            $("#qc_result" + result + " div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');

            for (var i = 1; i < 4; i++) {
                if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow') && i != result) {
                    $("#qc_result" + i).removeClass('qc_bg_yellow');
                    $("#qc_result" + i).addClass('qc_bg_grey');
                    $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                }
            }
        }
        /* if(product=="Asuransi_Brilliance_Sejahtera"){
        					if(!$("#qc_result2").hasClass('qc_bg_yellow')){
        						$("#qc_result"+result).removeClass('qc_bg_grey');
        						$("#qc_result"+result).addClass('qc_bg_yellow');
        						$("#qc_result"+result+" div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
        					}
        			    }
        			     else
        				 {
        			      change_result_color();
        				 } */
    }

    function getPremium(value1, freq) {
        var lang = false;
        if (langcalc == 'en') {
            lang = true;
        }
        switch (freq) {
            case "1": {
                if (langcalc == 'en') {
                    return "Premium:<br>IDR " + addCommas(Math.round(value1)) + " / year";
                } else {
                    return "Premi:<br>Rp " + addDot(Math.round(value1)) + " / tahun";
                }


            }
            case ".53": {
                if (langcalc == 'en') {
                    return "Premium:<br>IDR " + addCommas(Math.round(value1 * 0.53)) + " / half year";
                } else {
                    return "Premi:<br>Rp " + addDot(Math.round(value1 * 0.53)) + " / enam bulan";
                }

            }
            case ".275": {
                if (langcalc == 'en') {
                    return "Premium:<br>IDR " + addCommas(Math.round(value1 * 0.275)) + " / quarter";
                } else {
                    return "Premi:<br>Rp " + addDot(Math.round(value1 * 0.275)) + " / tiga bulan";
                }

            }
            case ".093333": {
                if (langcalc == 'en') {
                    return "Premium:<br>IDR " + addCommas(Math.round(value1 * 0.093333)) + " / month";
                } else {
                    return "Premi:<br>Rp " + addDot(Math.round(value1 * 0.093333)) + " / bulan";
                }

            }
        }
    }

    $(".qc_plan_cta").click(function() {
        if ($("#section_question").offset() != null)
            $('html,body').animate({
                scrollTop: $("#section_question").offset().top
            }, 'easeInSine');
    });



    function roundAmount(number, decimalPlace) {
        if (number.indexOf('.') > -1 && number.indexOf('.00') == -1) {
            return parseFloat(Math.round(number * 100) / 100).toFixed(decimalPlace);
        } else if (number.indexOf('.00') > -1) {
            return number;
        } else {
            return number;
        }

        //	return (number.indexOf('.')>-1 && number.indexOf('.00')==-1) ?  : number+'.00';
    }

    function showCombinationErrMsg() {
        $(".combinationErrMsg").removeAttr("hidden");
    }

    function showCoverageErrMsg() {
        (maxCoverage == '' || maxCoverage == null) ? $('.maxValueSpan').attr('hidden', 'true'): $('#maxCover').html(maxCoverage);
        $('#minCover').html(minCoverage);
        $(".coverageErrMsg").removeAttr("hidden");
    }

    function validateAmount(value) {
        $('.qc_returnzero_error_msg').remove();
        if (value >= 100000000 && value < 1000000000) {
            band = "band2"
        } else if (value >= 1000000000) {
            band = "band3";
        } else {
            var enMsg = "Minimum sum assured of IDR 100 Million</div>";
            var idMsg = "Uang pertanggungan minimum Rp 100 Juta</div>";
            var printMsg = (langcalc == "en") ? enMsg : idMsg;
            $('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>" + printMsg + '</div>');
            return false;
        }
        return true;
    }
    //add comma 

    function addData(value) {

        switch (value) {
            case 1: {
                if (langcalc == 'en') {
                    return '';
                    break;
                } else {
                    return '';
                    break;
                }


            }
            case 2: {
                if (langcalc == 'en') {
                    return 'Estimated fund value (Year 10):<br /><b>IDR ';
                    break;
                } else {
                    return 'Estimasi nilai dana investasi (tahun ke-10):<br /><b>Rp ';
                    break;
                }
            }
            case 3: {
                if (langcalc == 'en') {
                    return 'Estimated fund value (Year 20):<br /><b>IDR ';
                    break;
                } else {
                    return 'Estimasi nilai dana investasi (tahun ke-20):<br /><b>Rp ';
                    break;

                }
            }
            case 4: {
                if (langcalc == 'en') {
                    return '';
                    break;
                } else {
                    return '';
                    break;
                }
            }
            case 5: {
                if (langcalc == 'en') {
                    return 'Estimated fund value (Year 10):<br /><b>IDR ';
                    break;
                } else {
                    return 'Estimasi nilai dana investasi (tahun ke-10):<br /><b>Rp ';
                    break;
                }
            }
            case 6: {
                if (langcalc == 'en') {
                    return 'Estimated fund value (Year 20):<br /><b>IDR ';
                    break;
                } else {
                    return 'Estimasi nilai dana investasi (tahun ke-20):<br /><b>Rp ';
                    break;

                }
            }
        }
    }

    function addData_Term_Life(value) {

        switch (value) {
            case 1: {
                if (langcalc == 'en') {
                    return 'For early adopters';
                    break;
                } else {
                    return 'Untuk profesional muda';
                    break;
                }


            }
            case 2: {
                if (langcalc == 'en') {
                    return 'For young families';
                    break;
                } else {
                    return 'Untuk keluarga muda';
                    break;
                }
            }
            case 3: {
                if (langcalc == 'en') {
                    return 'For mature families';
                    break;
                } else {
                    return 'Untuk keluarga mapan';
                    break;

                }
            }


        }
    }

    function addDot(value) {
        var valueAfterDecimal = value.toString().split('.')[1];
        var input = value.toString().split('.')[0];
        return (input.toString()).replace(
            /^([-+]?)(0?)(\d+)(.?)(\d+)$/g,
            function(match, sign, zeros, before, decimal, after) {

                var reverseString = function(string) {
                    return string.split('').reverse().join('');
                };

                var insertCommas = function(string) {

                    var reversed = reverseString(string);

                    var reversedWithCommas = reversed.match(/.{1,3}/g).join('.');

                    return reverseString(reversedWithCommas);
                };
                var result = sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
                return result;
            }
        ) + (typeof valueAfterDecimal !== 'undefined' ? "," + valueAfterDecimal : "");
        //+'.'+(valueAfterDecimal!=null?valueAfterDecimal:'00');
    }

    function addCommas(value) {
        var valueAfterDecimal = value.toString().split('.')[1];
        var input = value.toString().split('.')[0];
        return (input.toString()).replace(
            /^([-+]?)(0?)(\d+)(.?)(\d+)$/g,
            function(match, sign, zeros, before, decimal, after) {

                var reverseString = function(string) {
                    return string.split('').reverse().join('');
                };

                var insertCommas = function(string) {

                    var reversed = reverseString(string);

                    var reversedWithCommas = reversed.match(/.{1,3}/g).join(',');

                    return reverseString(reversedWithCommas);
                };
                var result = sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
                return result;
            }
        ) + (typeof valueAfterDecimal !== 'undefined' ? "." + valueAfterDecimal : "");
        //+'.'+(valueAfterDecimal!=null?valueAfterDecimal:'00');
    }
});
//Tagging for Find And Advisor
$("#findAdvisorclk").click(function() {
    var inputText = $(".qc_result_plan_title").text();
    var url = window.location.href;
    var premRate = $("#result_1").text().replace(":", "=");
    var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
    var age = getAgeYear();
    if (advsleadClk == false) {
        if (productName == "Asuransi_Brilliance_Sejahtera") {
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "find an advisor:tool referrer=quick quote",
                    ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Male:result=" + inputText + ":" + premRate + "",
                    page_url: "+ url+"
                });
            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "find an advisor:tool referrer=quick quote",
                    ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Female:result=" + inputText + ":" + premRate + "",
                    page_url: "+ url+"
                });
            }

        } //Tagging for Term_Life find an advisor
        else if (productName == "Term_Life") {
            var sumAssured = $("#qc_q5_ans").val();
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
            var premium = $('#qc_result1').find('div.qc_result_price').text().replace(":", "=");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            if (gender == 'M') {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "find an advisor:tool referrer=quick quote",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male: payment period =" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });

            } else {
                utag.link({
                    ev_type: "calc",
                    ev_action: "clk",
                    ev_title: "quick quote",
                    ev_data_one: "find an advisor:tool referrer=quick quote",
                    ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female: payment period =" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                    page_url: "+url1t+"
                });
            }
        }
    } else {
        utag.link({
            ev_type: "calc",
            ev_action: "clk",
            ev_title: "quick quote",
            ev_data_one: "find an advisor",
            page_url: "+ url+"
        });
    }
});
// For submit button Tagging
$("#leadgen #advisor-modal-submit-btn").click(function() {
    var premRate = $("#result_1").text().replace(":", "=");
    var urllPage = window.location.href;
    var gender = $("#qc_q2").find("div label.active").find("input").attr("name");
    var age = getAgeYear();
    var inputText1 = $(".qc_result_plan_title").text();

    productName = getProductName();

    if (advsleadClk == false) {
        // Check only UTAG fire if productName equals to Asuransi_Brilliance_Sejahtera
        if (productName == "Asuransi_Brilliance_Sejahtera") {
            // Submit clicked tracked with error
            if ($(".parsley-errors-list").hasClass("filled")) {
                if (typeof utag !== 'undefined') {
                    utag.link({
                        ev_type: "lead_form",
                        ev_action: "submit",
                        ev_title: "talk-to-an-advisor-lead-gen-form",
                        ev_data_one: "error",
                        page_url: "+urllPage+"
                    });
                }
            } // parsley-errors-list finished 
            else {
                if (gender == 'M') {
                    // Submit clicked tracked with no error
                    if (typeof utag !== 'undefined') {
                        utag.link({
                            ev_type: "lead_form",
                            ev_action: "submit",
                            ev_title: "talk-to-an-advisor-lead-gen-form",
                            ev_data_one: "successful submission:tool referrer=quick quote",
                            ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Male:result=" + inputText1 + ":" + premRate + "",
                            page_url: "+urllPage+"
                        });
                    }
                } else if (gender == 'F') {
                    if (typeof utag !== 'undefined') {
                        utag.link({
                            ev_type: "lead_form",
                            ev_action: "submit",
                            ev_title: "talk-to-an-advisor-lead-gen-form",
                            ev_data_one: "successful submission:tool referrer=quick quote",
                            ev_data_two: "" + productName + ":year of birth=" + age + ":gender=Female:result=" + inputText1 + ":" + premRate + "",
                            page_url: "+ urllPage+"
                        });
                    }
                }
            }
        } //Start of Term_Life
        else if (productName == "Term_Life") {
            var sumAssured = $("#qc_q5_ans").val();
            var premiumMode = $('#qc_q4_ans').children('option:selected').text();
            var yearCheck = $("#qc_q3_ans_Frequency_Trad").val();
            var url1t = window.location.href;
            var aget = getAgeYear();
            var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
            var premium = $('#qc_result1').find('div.qc_result_price').text().replace(":", "=");
            var paymentPeriod = $("#qc_q3_ans_Frequency_Trad").val();
            // Submit clicked tracked with error
            if ($(".parsley-errors-list").hasClass("filled")) {
                if (typeof utag !== 'undefined') {
                    utag.link({
                        ev_type: "lead_form",
                        ev_action: "submit",
                        ev_title: "talk-to-an-advisor-lead-gen-form",
                        ev_data_one: "error",
                        page_url: "+url1t+"
                    });
                }
            } // parsley-errors-list finished 
            else {
                if (gender == 'M') {
                    // Submit clicked tracked with no error
                    if (typeof utag !== 'undefined') {
                        utag.link({
                            ev_type: "lead_form",
                            ev_action: "submit",
                            ev_title: "talk-to-an-advisor-lead-gen-form",
                            ev_data_one: "successful submission:tool referrer=quick quote",
                            ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Male: payment period =" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                            page_url: "+url1t+"
                        });
                    }
                } else if (gender == 'F') {
                    if (typeof utag !== 'undefined') {
                        utag.link({
                            ev_type: "lead_form",
                            ev_action: "submit",
                            ev_title: "talk-to-an-advisor-lead-gen-form",
                            ev_data_one: "successful submission:tool referrer=quick quote",
                            ev_data_two: "" + productName + ":year of birth=" + aget + ":gender=Female: payment period =" + paymentPeriod + ":payment mode=" + premiumMode + ":expected sum assured=" + sumAssured + ":result=" + resultYear + ":" + premium + "",
                            page_url: "+ url1t+"
                        });
                    }
                }
            }
        }
    } // advsleadClk == false finished 
    else {
        if ($(".parsley-errors-list").hasClass("filled")) {
            // Submit clicked tracked with successful
            if (typeof utag !== 'undefined') {
                utag.link({
                    ev_type: "lead_form",
                    ev_action: "submit",
                    ev_title: "talk-to-an-advisor-lead-gen-form",
                    ev_data_one: "successful submission",
                    page_url: "+ url1t+"
                });
            }
        } else {
            // Submit clicked tracked  no error
            if (typeof utag !== 'undefined') {
                utag.link({
                    ev_type: "lead_form",
                    ev_action: "submit",
                    ev_title: "talk-to-an-advisor-lead-gen-form",
                    ev_data_one: "error",
                    page_url: "+ url1t+"
                })

            }
        }
    }

});

//Tagging for facebook
$(".icon-facebook").click(function() {
    utag.link({
        ev_type: "calc",
        ev_action: "clk",
        ev_title: "bright curator",
        ev_data_one: "facebook share"
    });
});
//Tagging for linkedin
$(".icon-linkedin").click(function() {
    utag.link({
        ev_type: "calc",
        ev_action: "clk",
        ev_title: "bright curator",
        ev_data_one: "linkedin share"
    });
});
//Tagging for twitter
$(".icon-twitter").click(function() {
    utag.link({
        ev_type: "calc",
        ev_action: "clk",
        ev_title: "bright curator",
        ev_data_one: "twitter share"
    });
});f