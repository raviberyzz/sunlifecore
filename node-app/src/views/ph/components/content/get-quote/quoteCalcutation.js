
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
    }
function getPremiumPrice( productName,  key,  val,amount,  age,  countryCode, dob, frequencyTxt, mYear) {
    console.log("product:"+ productName, "key:"+ key, "val:"+ val, "amaount:"+amount,"age"+age, "country"+countryCode,"dob"+dob,"freq:text"+frequencyTxt,"myear"+mYear);
    var key=key;
    let actualValue = "";
    let countrySpecificResponse="";
    var JsonArray = new Array();
    try {
        let hostname=window.location.hostname;
        let path="/content/dam/sunlife/legacy/assets/ph/ph-premiumRates.properties"; // ?logActivity=true
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

        setTimeout(operator,1000);
        function operator(){
            let data='';
			content=content.toString();
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

						console.log(rate);
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
            if(countryCode=='ph' ){
                countrySpecificResponse = getPhResult(key,amount, countryCode,dob,frequencyTxt,mYear,actualValue, content1);
            }
           
                //console.log(builder.concat(actualValue).concat("||"));
                jspData=builder.concat(actualValue).concat("||");
                fetching(jspData,productName,freq);
        }
    } catch (e) {
        console.log(e);
    }
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
