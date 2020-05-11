
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

    function getPremiumPrice(productName,key,val,amount,age,countryCode,dob,frequencyTxt,mYear) {
      let actualValue = "";
        let countrySpecificResponse="";
        function getCountForHK(){
                var NUMBER_OF_HITS = 0;
            var currentDate = moment();
            NUMBER_OF_HITS = NUMBER_OF_HITS + 1;
            var uniqueId = "";
            //calendar code goes here
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
            let url="/content/dam/sunlife/legacy/assets/hk/hk-premiumRates.properties?logActivity=true";
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
            if(content){
                content=JSON.stringify(content);
                console.log(content);
            }
            else{
                content='';
                throw new Error('content not found');
            }
            var propContent=content[productName];
            var isCalculable =propContent.isCalculable;
            var equation = propContent.equation;
            if (isCalculable=='true') {
                console.log("calculable");              
            } else { 
                    var jsonArray = propContent[key];
                    for (var i = 0; i < jsonArray.length; i++) {
                        if (i > 0){
                            actualValue = actualValue + "," + jsonArray[i];
                        }
                        else{
                            actualValue = jsonArray[i];
                        }
                    }
                }
            if(countryCode.toLowerCase()=='ph' && actualValue.length() > 0){
                countrySpecificResponse = sunlife.vgncms.cda.asia.quote.AsiaQuickQuoteCalculation.getPhResult(key,amount, countryCode,dob,frequencyTxt,mYear,actualValue,prop);
            }
            if(countryCode.toLowerCase()=='hk'){
                getCountForHK();
                countrySpecificResponse=getCountForHK();
            }
        } catch (e) {
            console.log(e);
        }
        console.log(builder.concat(actualValue).concat("||").concat(countrySpecificResponse).toString());
        return (builder.concat(actualValue).concat("||").concat(countrySpecificResponse).toString());
    }

