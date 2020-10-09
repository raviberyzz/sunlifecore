
var KEY="key";
var PRODUCT="product";
var FREQUENCY="freq";
var AGE="age";
var AMOUNT="amount";
var DATA="data";
var COUNTRY_VN="VN";
var COUNTRY="country";
var DOB="dob";
var FREQUENCY_TEXT="freq_text";
var INVESTMENT_YEAR="investmentYear";
var qc_optgender = "";
var qc_optsmoke = "";
var dd2open = 0;
var dd1open = 0;
var qc_formvalid = false;
var investmentAmountVal = "";
var maxCoverage = "";
var minCoverage = "";
var bandProduct = false;
    function fetching(data){
		
			 setCoverageRange();
             var arrayOfResult = data.split(',');
            var data1 = data.split('||');
			var arrayOfResult = data1[0];
            var arrayOfResult = data1[0].split(',');
			var min = minCoverage.indexOf(",") > -1 ? minCoverage.replace(/\,/g, '') : minCoverage == "" ? 0 : minCoverage;
            var max = maxCoverage.indexOf(",") > -1 ? maxCoverage.replace(/\,/g, '') : maxCoverage == "" ? 1e309 : maxCoverage; //1e309 equals to infinity(set to max value)
            console.log(arrayOfResult,min,max);
			
			//Nan check for PHP data 
                if (((arrayOfResult[0].trim().replace("||", "")).length < 1 || arrayOfResult[0].trim() == "0.0" || arrayOfResult[0].trim() == "NaN" ) && !bandProduct) {
                    showCombinationErrMsg();
                    $('#qc_result').css('display', 'none');
                    $(".qc_loading_ani").hide();
                } else if ( /* arrayOfResult[0].trim()=="0.0" ||*/ parseFloat((arrayOfResult[0].trim().split("||")[0]).length < 1 ? 0 : arrayOfResult[0]) < parseFloat(min) || parseFloat((arrayOfResult[0].trim().split("||")[0]).length < 1 ? 0 : arrayOfResult[0]) > parseFloat(max)) {
                    showCoverageErrMsg();
                    $('#qc_result').css('display', 'none');
                    $(".qc_loading_ani").hide();
                    bandProduct = false;
                } else if ((arrayOfResult[0].split("||").length) > 0) {
                    var data = data.split('||');
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

                    var premiumFreq = $("#qc_q4 option:selected").html();
                    var originalTxt = $("#showInvestmentValue").next('div.item_text').html();
                    $("#showInvestmentValue").html('PHP ' + addCommas(roundAmount(investmentAmountVal, 2)) + '-');
                    var showFreqTxt = $("#showFreq").html(premiumFreq.toLowerCase());
                    var newTxt = ' ' + originalTxt;
                    $("#showInvestmentValue").next('div.item_text').html(newTxt);
                    $('#showMatureAmount').html('PHP ' + addCommas(roundAmount($.trim(data[0]), 2)) + '-');
                    $('#showInvestmentYear').html(getTimeOfInvestment(getProductName()) + '-');
                    $('#productNameDclm').html(getProductName().replace(new RegExp("_", "g"), " "));
                    //Tagging for submit
                    var dobYeaar = localStorage.getItem("dobYearr");
                    var genderVar = localStorage.getItem("genderVall");
                    var paymentDrop = localStorage.getItem("paymentPerr");
                    var priceCh = localStorage.getItem("priceChkk");
                    var smokeRslt = localStorage.getItem("smokeResultt");
                    var url = window.location.href;
                    var prodName = getProductName();
        }

    }
function getPremiumPrice( productName,  key,  val,amount,  age,  countryCode, dob, frequencyTxt, mYear) {
    console.log("product:"+ productName, "key:"+ key, "val:"+ val, "amaount:"+amount,"age"+age, "country"+countryCode,"dob"+dob,"freq:text"+frequencyTxt,"myear"+mYear);
    var key=key;
    let actualValue = "";
    let countrySpecificResponse="";
    var JsonArray = new Array();
		let builder = "";
		let jspData="";
        let hostname=window.location.hostname;
        let path="/content/dam/sunlife/legacy/assets/ph/ph-premiumRates.properties"; // ?logActivity=true
        let url='//'.concat(hostname).concat(path);
        var content='';
        $.ajax({
			type: "GET",
			url: path,
			dataType: "text",
			success: function(data) {
						content=data.toString();
						content1 = content;
						//getting data based on productName
						content=content.split(productName+'=')[1];
						content =content.substring(content,content.indexOf("}")+1); 
						//Json format of data
						contentJson=JSON.parse(content);
						var isCalculable =contentJson["isCalculable"];
						var equation = contentJson["equation"];

						if (isCalculable==="true") {
							console.log("calculable");
							var isBand = contentJson["isBand"];
							console.log(isBand);
							if(isBand==="true") {
								console.log("is_band");
							}
							else {
								console.log("not_is_band");
								if ( JsonArray.length >0  ) {
									console.log("true");
								}
								else {
									var rate=contentJson[key];
									if(countryCode==(COUNTRY_VN)){
										rate = rate*(amount/1000);
									}else{
										rate = (amount*1000)/(rate*val);
									}
									if (equation==="true") {
										 equValue = contentJson[equation];
										 rate = rate*equValue;
									}
									
									//actualValue = BigDecimal.valueOf(rate).toPlainString();
									  actualValue=rate;
									 
								}
							}
							
						}
						else {
							console.log("not_calculable");
						}
						
						/*data=content.split(key)[1];
						data=data.split(":")[1].trim();
						data=data.substring(data,data.indexOf("]")+1);
						data=data.trim();
						data=data.split(",");
							for(let i=0;i<data.length;i++){
								data[i]=data[i].trim();
								let digits = data[i].match(/(\d+)/);
								data[i]=digits[0];
							}
						if (isCalculable=='true') {
							console.log("calculable");              
						} else {
							actualValue=data;
							}*/

						if(countryCode=='ph'  && actualValue > 0 ){
							console.log("ph");
							countrySpecificResponse = getPhResult(key,amount, countryCode,dob,frequencyTxt,mYear,actualValue, content1);
						}
					   
							//console.log(builder.concat(actualValue).concat("||"));
							jspData=builder.concat(actualValue).concat("||");
							console.log(jspData);
							
							
							fetching(jspData);
							
			},
			error : function(error) {
				console.log("properties file not found");
			}
			
		});
		
}

function getPhResult(key,amount, countryCode,dob,frequencyTxt,mYear,calculatedAmount,prop) {
	console.log("ph result fun");
	var response = "";
    var wsUrl =prop.split("Ph_WS"+'=')[1];
	console.log(wsUrl);
	var smoker="Y";
	var gender="";
		if(key!=null){
			 var keyTokens = key.split("_");
			 //if key is like 18_NS_M 
			 if(keyTokens.length > 2){
				 smoker=keyTokens[1] == ("S") ? "Y" : "N";
				 gender=keyTokens[2];
				 
			 }
			 //if key is like 18_M 
			 if(keyTokens.length == 2)
				 gender=keyTokens[1];

			 console.log(keyTokens);
		}
		var jsonRequest =  "{\"questionAndAnswerList\": [{\"question\": \"FLD001\",\"answer\": \""+dob+"\"}, { \"question\": \" FLD002\", \"answer\": \""+gender+"\" },{\"question\": \" FLD003\",\"answer\": \""+smoker+"\" }, {\"question\": \" FLD004\",\"answer\": \""+frequencyTxt+"\"},{ \"question\": \" FLD005\", \"answer\": \""+amount+"\"},{ \"question\": \" FLD006\",\"answer\": \""+mYear+"\" },{ \"question\": \" FLD007\",\"answer\": \""+calculatedAmount+"\"} ]}";
		$.ajax({
                type: "POST",
                url: wsUrl,
            	data: jsonRequest,
                dataType: "text",
           		contenType: "application/json; charset=UTF-8",

            success: function(data){
            console.log(data);
        }, 
               error: function(data){
            console.log(data);
        }   

        });
}


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