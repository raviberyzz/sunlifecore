
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
        let url='https://'.concat(hostname).concat(path);
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
        setTimeout(operator,500);
        function operator(){
            let data='';
            if(productName=='SunHealth_Medical_Essential'){
				content=content.toString();
                content=content.split(productName+'=')[1];
                content =content.substring(content,content.indexOf("}")+1);                
                var isCalculable =content.isCalculable;
                var equation = content.equation;
                key='"'+key+'"';
                data=content.split(key+':[')[1];
                data=data.substring(data,data.indexOf("]"));
                data=data.trim();
                data=data.split(",");
                data=data[0].substring(1,(data[0].length-1))+','+data[1].substring(1,(data[1].length-1))+','+data[2].substring(1,(data[2].length-1))+','+data[3].substring(1,(data[3].length-1));
            }
            else{
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
                console.log(builder.concat(actualValue).concat("||").concat(countrySpecificResponse).toString());
                jspData=builder.concat(actualValue).concat("||").concat(countrySpecificResponse).toString();
                fetching(jspData);
        }
    } catch (e) {
        console.log(e);
    }
}
