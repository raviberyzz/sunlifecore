//duration of investment for each product.
function getTimeOfInvestment(productName) {
    var timeOfInvestmentPerProduct = {
        "Sun_StartUp": '10 years',
        "SUN_Fit_and_Well": '10 years',
        "SUN_Safer_Life": '5 years',
        "SUN_Smarter_Life_Elite": '10 years',
        "Sun_Smarter_Life_Elite": '10 years',
        "Sun_MaxiLink_Bright": '5 years',
        "Sun_MaxiLink_Prime": '10 years',
        "SUN_Smarter_Life_Classic": '10 years',
        "Sun_FlexiLink": 'Until maturity',
		"SUN_Cancer_Care":'10 years'
    }
    return timeOfInvestmentPerProduct[productName];
}

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

function initQC() {
    $("#qc_q1_ans").val("");
    $("#qc_q4_ans").val("");
    $("#qc_q5_ans").val("");
    /**
     * 
     */
    $("#product").val(getProductName());
    showProductSpecificElements();
    dd2open = 0;
    $('#qc_q4').find('.qc_dropdown').val('');
}

//display on screen specific elements 
//like for VUL and Traditional products have different frequency value.
function showProductSpecificElements() {
    var productGroup = $("#product optgroup option:selected").parent().attr("label");

    if (productGroup != null && productGroup.toUpperCase() == "TRAD") {
        $("#qc_q4_ans_Frequency_Frequency_Vul").remove();
        $("#qc_q4_ans_Frequency_Trad").removeClass("hidden");
    }
    if (productGroup != null && productGroup.toUpperCase() == "VUL") {
        $("#qc_q4_ans_Frequency_Frequency_Vul").removeClass("hidden");
        $("#qc_q4_ans_Frequency_Trad").remove();
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

//get product name from current page.
function getProductName() {

    var productName = "";
   // var breadcrumbPathArr = utag_data.page_breadcrumb.split("/");
    var breadcrumbPathArr = $("meta[property='og:title']").attr('content');
    productName = breadcrumbPathArr.trim().replace(/ /g, "_");
    return productName;
}

//for sunstartup 'smoker' field will remain hidden.
function isSmokerApplicableForProduct() {

    if ($("#qc_q3").hasClass("hidden")) {
        return false;
    }
    return true;
}

var qc_optgender = "";
var qc_optsmoke = "";
var dd2open = 0;
var dd1open = 0;
var qc_formvalid = false;
var investmentAmountVal = "";
var maxCoverage = "";
var minCoverage = "";
var bandProduct = false;

$(document).ready(function() {

    initQC();

    var options = {
        format: 'dd/mm/yyyy',
        container: $('.qc_main_9col'),
        todayHighlight: true,
        autoclose: true,
        endDate: '+0d'
    };

    if ( $('#qc_main').length > 0 ) {
        $('.form_date').datepicker(options);
        $('.form_date').datepicker()
            .on("show", function(e) {
                if (!$("#qc_q1_ans_main").hasClass("isAns")) {
                    $("#qc_q1_ans_main").addClass("isAns");
                }
            });
    }
    //validate each fields value.
    function checkSubmit() {
        investmentAmountVal = $.trim($("#qc_q5_ans").val()).replace(new RegExp(',', 'g'), '');
        if (investmentAmountVal.indexOf('PHP') > -1) {
            investmentAmountVal = $.trim(investmentAmountVal.split('PHP')[1]);
        }
        if ($("#qc_q1_ans").val() != "" && validateNumericalChar(investmentAmountVal) && qc_optgender != "" && (!isSmokerApplicableForProduct() || qc_optsmoke != "") && $("#qc_q4 select").val() != null) {
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
    //Tagging for Upon selecting a date of birth
    $("#qc_q1_ans").on('change', function() {
        if ($("#qc_q1_ans").val() != null) {
            var dobArr = $("#qc_q1_ans").val().split("/");
            var dobYear = dobArr[2];
            var url = window.location.href;
            var prodName = getProductName();
            //storage
            localStorage.setItem("dobYearr", dobYear);
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 1:first interaction",
                ev_data_two: "" + prodName + ":year of birth=" + dobYear + "",
                page_url: "+url+"
            });
        }
    });

    $("#qc_optionGender1").on('change', function() {
        qc_optgender = "1";
        checkSubmit();
		//Tagging for MAle
		var genderVal  = $('input[name=Gender]:checked').val();
		genderVal = "Male";
        //storage
        localStorage.setItem("genderVall", genderVal);
        var url = window.location.href;
        var prodName = getProductName();
        utag.link({
            ev_type: "calc",
            ev_action: "clk",
            ev_title: "quick quote",
            ev_data_one: "step 2",
            ev_data_two: "" + prodName + ":gender= " + genderVal + "",
            page_url: "+url+"
        });
    });
    $("#qc_optionGender1").parent().on('click', function() {
		 
    });

    $("#qc_optionGender2").on('change', function() {
        qc_optgender = "2";
        checkSubmit();
			var genderVal  = $('input[name=Gender]:checked').val();
			genderVal = "Female";
        //storage
        localStorage.setItem("genderVall", genderVal);
        var url = window.location.href;
        var prodName = getProductName();
        utag.link({
            ev_type: "calc",
            ev_action: "clk",
            ev_title: "quick quote",
            ev_data_one: "step 2",
            ev_data_two: "" + prodName + ":gender= " + genderVal + "",
            page_url: "+url+"
        });
    });
    $("#qc_optionGender2").parent().on('click', function() {
    });

    $("#qc_optionSmoke1").on('change', function() {
        qc_optsmoke = "1";
        checkSubmit();
		//Tagging 
		var smokeResult = "Smoke";
       
        //storage
        localStorage.setItem("smokeResultt", smokeResult);
        var url = window.location.href;
        var prodName = getProductName();
        utag.link({
            ev_type: "calc",
            ev_action: "clk",
            ev_title: "quick quote",
            ev_data_one: "step 3",
            ev_data_two: "" + prodName + ":smoker=" + smokeResult + "",
            page_url: "+url+"
        });
    });
    $("#qc_optionSmoke1").parent().on('click', function() {
		 
    });

    $("#qc_optionSmoke2").on('change', function() {
        qc_optsmoke = "2";
        checkSubmit();
		//tagging
		var smokeResult = "Non-Smoker";
        //storage
        localStorage.setItem("smokeResultt", smokeResult);
        var url = window.location.href;
        var prodName = getProductName();
        utag.link({
            ev_type: "calc",
            ev_action: "clk",
            ev_title: "quick quote",
            ev_data_one: "step 3",
            ev_data_two: "" + prodName + ":smoker=" + smokeResult + "",
            page_url: "+url+"
        });
    });
    $("#qc_optionSmoke2").parent().on('click', function() {
		 

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
        if (oldValue != "" && oldValue != null && validateNumericalChar(roundAmount(oldValue, 2)))
            doInvestmentAmountWellFormat(oldValue);
    });

    $("#qc_q5_ans").on('click', function() {
        var value1 = $("#qc_q5_ans").val();
        if (value1 != "" && value1 != null) {
            var amountWithComma = $.trim(value1.toString().indexOf('PHP') > -1 ? value1.toString().split('PHP')[1] : value1);
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
		var priceChk;
        var url = window.location.href;
        var prodName = getProductName();
        var price = $("#qc_q5_ans").val();
        priceChk = price;
        //storage
		if(priceChk !=""){
        localStorage.setItem("priceChkk", priceChk);
        if (prodName != "Sun_StartUp") {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 5",
                ev_data_two: "" + prodName + ":investment amount=" + priceChk + "",
                page_url: "+url+"
            });
        } else {
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 4",
                ev_data_two: "" + prodName + ":investment amount=" + priceChk + "",
                page_url: "+url+"
            });
        }
		}
    });

    function doInvestmentAmountWellFormat(actualVal) {
        $("#qc_q5_ans").val('PHP ' + addCommas(roundAmount(actualVal, 2)));
    }

    $("#qc_q1_ans").on('blur', function() {
        removeAllAnsCSS();
    });

    $("#qc_q4_ans_Frequency_Trad").on('click', function() {
        validateFrequencyOfInvestment();
		 
    });
    $("#qc_q4_ans_Frequency_Frequency_Vul").on('click', function() {
        validateFrequencyOfInvestment();
		 
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
    $('#qc_q4').find('select').on('change', function() {
        if ($('#qc_q4').find("select:not(:hidden)").val() != null) {
          var paymentPer;
        var paymentPr = $('#qc_q4_ans_Frequency_Trad').children('option:selected').text();
        paymentPer = paymentPr;
		  //storage Payment period
        localStorage.setItem("paymentPerr", paymentPer); 
        var url = window.location.href;
        var prodName = getProductName();	
		if(prodName != "Sun_StartUp"){  
            utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 4",
                ev_data_two: "" + prodName + ":payment period=" + paymentPer + "",
                page_url: "+url+"
            });			
		}else{
		utag.link({
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "quick quote",
                ev_data_one: "step 3",
                ev_data_two: "" + prodName + ":payment period=" + paymentPer + "",
                page_url: "+url+"
            });
		}
        }
    });

    $("#qc_q4_ans").on('blur', function() {
        checkSubmit();
        removeAllAnsCSS();
    });

 function setCoverageRange() {
        var productName = getProductName();
        var age = getAge();
        if (productName == "Sun_MaxiLink_Bright") { //Sun_MaxiLink_Bright Condition
            minCoverage = "400,000.00";
            maxCoverage = "";
            if ((age < 16 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || age > 60) { //change on 11Dec2018
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            }
        } else if (productName == "Sun_MaxiLink_Prime") { //Sun_MaxiLink_Prime Condition
            minCoverage = "700,000.00";
            maxCoverage = "";
            if ((age < 16 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || age > 65) { //change on 11Dec2018			
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            }
        } else if (productName == "Sun_StartUp") { //Sun_StartUp Condition
            minCoverage = "200,000.00";
            maxCoverage = "";
            if (age < 18 || age > 50) { //change on 11Dec2018
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            }
        } else if (productName == "Sun_FlexiLink") { //Sun_FlexiLink Condition
            bandProduct = true;
            if ((age < 16 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || age > 70) {
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            } else if (age > 65 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S" && $.trim($("#qc_q2").find("div label.active").find("input").attr("name")) == "M") {
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            } else if (age >= 0 && age <= 54) {
                maxCoverage = "";
                minCoverage = "250,000.00";
            } else if (age >= 55 && age <= 70) {
                maxCoverage = "";
                minCoverage = "200,000.00";
            }
        } else if (productName == "SUN_Safer_Life") { //SUN_Safer_Life Condition
            bandProduct = true;
            maxCoverage = "";
            minCoverage = "2,000,000.00";
            if (age < 18 || age > 64) { //change on 11Dec2018
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            }
        } else if (productName == "Sun_Smarter_Life_Elite") { //Sun_Smarter_Life_Elite Condition		
            if ((age < 16 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || age > 80) { //change on 11Dec2018
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            } else {
                bandProduct = true;
                maxCoverage = "";
                minCoverage = "400,000.00";
            }
        } else if (productName == "SUN_Fit_and_Well") {
            var higherIssue = false;
            var standardIssue = false;
            if ((age < 16 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || (age > 50 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") || age > 60) { //change on 11Dec2018
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            } else if (age >= 56 && age <= 60 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "NS") {
                higherIssue = true;
                minCoverage = "500,000.00";
                maxCoverage = "15,000,000.00";
            } else if (age <= 55 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "NS" || (age >= 16 && age <= 50 && $.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S")) {
                standardIssue = true;
                minCoverage = "300,000.00";
                maxCoverage = "15,000,000.00";
            } else {
                maxCoverage = "999,999,999,999.00";
                minCoverage = "200,000.00";
            }
        } else if (productName == "SUN_Smarter_Life_Classic") {
            bandProduct = true;
            minCoverage = "400,000.00"; // minimum * 2
            maxCoverage = "";
            if (($.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") && (age < 16 || age > 80)) {
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            } else if (age < 0 || age > 80) {
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
                bandProduct = false;
            }
        }
		else if(productName=="SUN_Cancer_Care"){
			minCoverage = "300,000.00";
			maxCoverage = "6,250,000.00";			
			if (($.trim($("#qc_q3").find("div label.active").find("input").attr("name")) == "S") && (age < 16 || age > 60)) {
                maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed                
		}
		else if(age < 0 || age > 60){
			    maxCoverage = "";
                minCoverage = "";
                //if age is out of said limit. combination error should be displayed
               
		}		
    }

	}

function roundAmount(number, decimalPlace) {
    if (number.indexOf('.') > -1 && number.indexOf('.00') == -1) {
        return parseFloat(Math.round(number * 100) / 100).toFixed(decimalPlace);
    } else if (number.indexOf('.00') > -1) {
        return number;
    } else {
        return number + '.00';
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


    $("#qc_submit .btn").click(function() {
        if (qc_formvalid) {

            $(".qc_returnzero_error_msg").attr("hidden", "");
            $(".qc_loading_ani").show();
            // submit and jump to solution result page here
            var age = getAge();
            var product = $('#product').val();
            if (product == null) {
                product = getProductName();
            }
			var gender = localStorage.getItem("genderVall"); 
            var smoker = localStorage.getItem("smokeResultt");
			if(gender == "Male"){
				gender = "M";
			}else{
				gender= "F";
			}
			if(smoker== "Smoke"){
				smoker="S";
			}else{
				smoker="NS";
			}
           // var gender = $("#qc_q2").find("div label.active").find("input").attr("value");
           // var smoker = $("#qc_q3").find("div label.active").find("input").attr("value");
            //var freq = $("#qc_q4 select").val();
            var freq = $('#qc_q4').find("select:not(:hidden)").val();

            var amount = investmentAmountVal;
            var key = age + '_' + smoker + '_' + gender;

            if (product == "Sun_StartUp")
                key = age + '_' + gender;

            var json = new Object();
            /*json.key = key;
            json.product = product;
            json.freq = freq;
            json.amount = amount;
            json.age = age;*/
            var country = 'ph';
            var freq_text = $('#qc_q4').find("select option:selected").html();
            var dob = $("#qc_q1_ans").val();
            var investmentYear = getTimeOfInvestment(getProductName()).split(' ')[0];
            //jsonData = "data=" + JSON.stringify(json);

            console.log(product, key, freq, amount, age, country, freq_text, dob, investmentYear);

             getPremiumPrice(product,key,freq,amount,age,country,dob,freq_text,investmentYear); 
			

        }

    });

    //set products specific max and min coverage value based on multiple condition .
   
    $(".qc_plan_cta").click(function() {
        if ($("#section_question").offset() != null)
            $('html,body').animate({
                scrollTop: $("#section_question").offset().top
            }, 'easeInSine');
    });
});



$(".qc_plan_cta a").on('click', function() {
    utag.link({
        ev_type: "calc",
        ev_action: "clk",
        ev_title: "quick quote result",
        ev_data_one: "Premium Plan"
    })

});

//add comma 
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
    ) + '.' + (valueAfterDecimal != null ? valueAfterDecimal : '00');
}

// Tagging for clicking facebook
$(".icon-facebook").click(function() {
    utag.link({
        ev_type: "other",
        ev_action: "clk",
        ev_title: "contact-us-form",
        ev_data_one: "facebook share"
    });
});
// Tagging for clicking linkedin
$(".icon-linkedin").click(function() {
    utag.link({
        ev_type: "other",
        ev_action: "clk",
        ev_title: "contact-us-form",
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
});

function advisorTrack() {

    //Tagging for click advisor
    var dobYeaar = localStorage.getItem("dobYearr");
    var genderVar = localStorage.getItem("genderVall");
    var paymentDrop = localStorage.getItem("paymentPerr");
    var priceCh = localStorage.getItem("priceChkk");
    var smokeRslt = localStorage.getItem("smokeResultt");
    var url = window.location.href;
    var prodName = getProductName();
   if (prodName != "Sun_StartUp") {
                        utag.link({
                            ev_type: "calc",
                            ev_action: "clk", 
                            ev_title: "quick quote",
                            ev_data_one: "premium plan", 
                            ev_data_two: "" + prodName + ":year of birth=" + dobYeaar + ":gender=" + genderVar + ":smoker=" + smokeRslt + ":period=" + paymentDrop + ":investment amount=" + priceCh + "",
                            page_url: "+url+"
                        });
                    } else {
                        utag.link({
                            ev_type: "calc",
                            ev_action: "clk", 
                            ev_title: "quick quote",
                            ev_data_one: "premium plan", 
                            ev_data_two: "" + prodName + ":year of birth=" + dobYeaar + ":gender=" + genderVar + ":payment period=" + paymentDrop + ":investment amount=" + priceCh + "",
                            page_url: "+url+"
                        });
                    }
    //On loading tracking
    advisTrackOnLoad();

}

function advisTrackOnLoad() {

    //Tagging for click advisor
    var dobYeaar = localStorage.getItem("dobYearr");
    var genderVar = localStorage.getItem("genderVall");
    var paymentDrop = localStorage.getItem("paymentPerr");
    var priceCh = localStorage.getItem("priceChkk");
    var smokeRslt = localStorage.getItem("smokeResultt");
    var url = window.location.href;
    var prodName = getProductName();
   if (prodName != "Sun_StartUp") {
                        utag.link({
                            ev_type: "other",
                            ev_action: "clk",
                            ev_title: "find_an_advisor", 
                            ev_data_one: "referring tool=quick quote", 
                            ev_data_two: "" + prodName + ":year of birth=" + dobYeaar + ":gender=" + genderVar + ":smoker=" + smokeRslt + ":period=" + paymentDrop + ":investment amount=" + priceCh + "",
                            page_url: "+url+"
                        });
                    } else {
                        utag.link({
                            ev_type: "other",
                            ev_action: "clk",
                            ev_title: "find_an_advisor", 
                            ev_data_one: "referring tool=quick quote", 
                            ev_data_two: "" + prodName + ":year of birth=" + dobYeaar + ":gender=" + genderVar + ":payment period=" + paymentDrop + ":investment amount=" + priceCh + "",
                            page_url: "+url+"
                        });
                    }
}
