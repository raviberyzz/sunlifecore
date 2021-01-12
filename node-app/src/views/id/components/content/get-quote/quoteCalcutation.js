
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

    function fetching(data,productName,freq){
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
                var product=productName;
                sumAssured = $(".user_sum_assured").val();
                var langCalc=$('html').attr('lang');
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
                                if (langCalc=='en-CA') {
                                    $('#result_' + elementItem).html("Premium:<br>IDR " + addCommas($.trim(value)) + " / year");
                                } else {
                                    $('#result_' + elementItem).html("Premi:<br>Rp " + addDot($.trim(value)) + " / tahun");
                                }
                                //$('#result_'+elementItem).html("IDR "+addCommas($.trim(value)/12)+"/month");
                            } else {
                                if (langCalc=='en-CA') {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addCommas($.trim(value)) + '</b>');
                                } else {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addDot($.trim(value)) + '</b>');
                                }
                            }

                        }
                    }
					else if(product == "(Rider)_Sun_Medical_Platinum"){
						 if ($.trim(value) == 'NULL') {
                            $('#icon_' + elementItem).hide();
                            $('#result_' + elementItem).hide();
                        } else {
                            $('#icon_' + elementItem).show();
                            $('#result_' + elementItem).show();
                            if (elementItem == 1 || elementItem == 4) {
                                if (langCalc=='en-CA') {
                                    $('#result_' + elementItem).html("Premium:<br>IDR " + addCommas($.trim(value)) + " / year");
                                } else {
                                    $('#result_' + elementItem).html("Premi:<br>Rp " + addDot($.trim(value)) + " / tahun");
                                }
                                //$('#result_'+elementItem).html("IDR "+addCommas($.trim(value)/12)+"/month");
                            } else {
                                if (langCalc=='en-CA') {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addCommas($.trim(value)) + '</b>');
                                } else {
                                    $('#result_' + elementItem).html('' + addData(elementItem) + addDot($.trim(value)) + '</b>');
                                }
                            }

                        }
					}
                  else if(product == "Asuransi_X-Tra_Active_Pro" || product == "Asuransi_X-Tra_Active_Plus") {
                        if ($.trim(value) == 'NULL') {
                            $('#icon_' + elementItem).hide();
                            $('#result_' + elementItem).hide();
                        } else {
                            $('#icon_' + elementItem).show();
                            $('#result_' + elementItem).show();
                            if (langCalc=='en-CA') {
                                    $('#result_' + elementItem).html("Rp" + addCommas($.trim(value)));
                                } else {
                                    $('#result_' + elementItem).html("Rp" + addCommas($.trim(value)));
                                }
                        }
                    }

                });
                if (product == "Asuransi_Brilliance_Sejahtera" || product == "(Rider)_Sun_Medical_Platinum" || product == "Asuransi_X-Tra_Active_Pro" || product == "Asuransi_X-Tra_Active_Plus") {
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
            $(".qc_submit_btn a").removeClass("enable");
            $(".qc_submit_btn a").addClass("disable");
    }
function getPremiumPrice(productName,key,freq,amount,age,countryCode,dob,frequencyTxt,mYear) {
    var key=key;
    let actualValue = "";
    let countrySpecificResponse="";
    function getCountForHK(){
        var NUMBER_OF_HITS = 0;
        var currentDate = moment();
        NUMBER_OF_HITS = NUMBER_OF_HITS + 1;
        var uniqueId = "";
        var currentTime = moment();
        var gmtTime = currentTime.tz("Etc/GMT");
        var hkTime = gmtTime.tz("Asia/Hong_Kong");
        //console.log(hkTime.format());
        if(!currentDate.isSame(hkTime, 'day')){
            NUMBER_OF_HITS = 1;
            currentDate = hkTime;
        }
        uniqueId = uniqueId.concat(currentDate.year());
        if(currentDate.month()<9){
            uniqueId = uniqueId.concat('0');
            uniqueId = uniqueId.concat(currentDate.month()+1);
        }
        else{
            uniqueId = uniqueId.concat(currentDate.month()+1);
        }
        if(currentDate.date()<10){
            uniqueId = uniqueId.concat('0');
            uniqueId = uniqueId.concat(currentDate.date());
        }
        else{
            uniqueId = uniqueId.concat(currentDate.date());
        }
        uniqueId = uniqueId.concat('00');
        uniqueId = uniqueId.concat(NUMBER_OF_HITS);
        uniqueId=uniqueId.toString();
        return uniqueId;
        }
    let builder='';
    try {
        let hostname=window.location.hostname;
        let path="/content/dam/sunlife/legacy/assets/id/id-premiumRates.properties"; // ?logActivity=true
        let url='//'.concat(hostname).concat(path);
        var content='';
        function readTextFile(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        content = rawFile.responseText;
                        //console.log(allText);
                    }
                }
            }
            rawFile.send(null);
        }
        readTextFile(url);
            // $.ajax({
            //   url:
            //     "/content/dam/sunlife/legacy/assets/id/id-premiumRates.properties?logActivity=true",
            //   success: function (result) {
            //     operator(result);
            //   },
            // });
        setTimeout(operator,3000);
        function operator(){
            let data='';
				content=content.toString();
                content=content.split(productName+'=')[1];
                content =content.substring(content,content.indexOf("}")+1);                
                var isCalculable =content.isCalculable;
                var equation = content.equation;
                data=content.split(key)[1];
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
                }
            if(countryCode.toLowerCase()=='ph' && actualValue.length() > 0){
                countrySpecificResponse = sunlife.vgncms.cda.asia.quote.AsiaQuickQuoteCalculation.getPhResult(key,amount, countryCode,dob,frequencyTxt,mYear,actualValue,prop);
            }
            if(countryCode.toLowerCase()=='hk'){
                getCountForHK();
                countrySpecificResponse=getCountForHK();
            }
                //console.log(builder.concat(actualValue).concat("||"));
                jspData=builder.concat(actualValue).concat("||");
                fetching(jspData,productName,freq);
        }
    } catch (e) {
        console.log(e);
    }
}
