var KEY = "key";
var PRODUCT = "product";
var FREQUENCY = "freq";
var AGE = "age";
var AMOUNT = "amount";
var DATA = "data";
var COUNTRY_VN = "VN";
var COUNTRY = "country";
var DOB = "dob";
var FREQUENCY_TEXT = "freq_text";
var INVESTMENT_YEAR = "investmentYear";
function addCommas(input) {
  return input
    .toString()
    .replace(/^([-+]?)(0?)(\d+)(.?)(\d+)$/g, function (
      match,
      sign,
      zeros,
      before,
      decimal,
      after
    ) {
      var reverseString = function (string) {
        return string.split("").reverse().join("");
      };

      var insertCommas = function (string) {
        var reversed = reverseString(string);

        var reversedWithCommas = reversed.match(/.{1,3}/g).join(",");

        return reverseString(reversedWithCommas);
      };
      var result =
        sign +
        (decimal
          ? insertCommas(before) + decimal + after
          : insertCommas(before + after));
      return result;
    });
}
function fetching(jspData) {
  let langcalc = $("html").attr("lang");
  var splitByPipe = jspData.split("||");
  var amount = splitByPipe[0];
  var runiqueID = splitByPipe[1];
  var arrayOfResult = amount.split(",");
  var uniqueID = runiqueID.substring(0, 8);
  if ($("#uniqueID").length > 0) $("#uniqueID").remove();
  $("<input>")
    .attr({
      type: "hidden",
      id: "uniqueID",
      value: uniqueID,
    })
    .appendTo("#qc_container");
  //if jsp returns only zero and blank
  if (
    arrayOfResult.length == 0 ||
    arrayOfResult[0].trim() == "0.0" ||
    arrayOfResult[0].trim() == ""
  ) {
    console.log("return 0 from jsp");
  } else {
    /*Fixing issue of dots disappear before the Quote Result is displayed*/
    setTimeout(function () {
      $(".qc_loading_ani").show();
    }, "2000");
    /*Fixing issue of dots disappear before the Quote Result is displayed*/
    $("#qc_result").slideUp(300, function () {
      setTimeout(function () {
        $(".qc_loading_ani").hide();
        $("#qc_result").slideDown(500);
      }, "2000");
    });
    //appending "/annual" at the end with each price
    arrayOfResult.forEach(function (value, index) {
      var elementItem = index + 1;
      if (langcalc == "en-CA") {
        $("#qc_result" + elementItem + " div.qc_result_price").html(
          "HKD" + addCommas($.trim(value)) + "/ annual"
        );
      } else {
        $("#qc_result" + elementItem + " div.qc_result_price").html(
          "每年港元" + addCommas($.trim(value))
        );
      }
    });
  }
}
function getPremiumPrice(
  productName,
  key,
  val,
  amount,
  age,
  countryCode,
  dob,
  frequencyTxt,
  mYear
) {
  var key = key;
  let actualValue = "";
  let countrySpecificResponse = "";
  function getCountForHK() {
    var NUMBER_OF_HITS = 0;
    var currentDate = moment();
    NUMBER_OF_HITS = NUMBER_OF_HITS + 1;
    var uniqueId = "";
    var currentTime = moment();
    var gmtTime = currentTime.tz("Etc/GMT");
    var hkTime = gmtTime.tz("Asia/Hong_Kong");
    //console.log(hkTime.format());
    if (!currentDate.isSame(hkTime, "day")) {
      NUMBER_OF_HITS = 1;
      currentDate = hkTime;
    }
    uniqueId = uniqueId.concat(currentDate.year());
    if (currentDate.month() < 9) {
      uniqueId = uniqueId.concat("0");
      uniqueId = uniqueId.concat(currentDate.month() + 1);
    } else {
      uniqueId = uniqueId.concat(currentDate.month() + 1);
    }
    if (currentDate.date() < 10) {
      uniqueId = uniqueId.concat("0");
      uniqueId = uniqueId.concat(currentDate.date());
    } else {
      uniqueId = uniqueId.concat(currentDate.date());
    }
    uniqueId = uniqueId.concat("00");
    uniqueId = uniqueId.concat(NUMBER_OF_HITS);
    uniqueId = uniqueId.toString();
    return uniqueId;
  }
  let builder = "";
  try {
    let hostname = window.location.hostname;
    let path =
      "/content/dam/sunlife/legacy/assets/hk/hk-premiumRates.properties?logActivity=true";
    let url = "//".concat(hostname).concat(path);
    var content = "";
    function readTextFile(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            content = rawFile.responseText;
            //console.log(allText);
          }
        }
      };
      rawFile.send(null);
    }
    // $.ajax({
    //   url:
    //     "/content/dam/sunlife/legacy/assets/hk/hk-premiumRates.properties?logActivity=true",
    //   success: function (result) {
    //     operator(result);
    //   },
    // });
    readTextFile(url);
    setTimeout(operator, 1000);
    function operator() {
      let data = "";
      if (productName == "SunHealth_Medical_Essential") {
        content = content.toString();
        content = content.split(productName + "=")[1];
        content = content.substring(content, content.indexOf("}") + 1);
        var isCalculable = content.isCalculable;
        var equation = content.equation;
        key = '"' + key + '"';
        data = content.split(key + ":[")[1];
        data = data.substring(data, data.indexOf("]"));
        data = data.trim();
        data = data.split(",");
        data =
          data[0].substring(1, data[0].length - 1) +
          "," +
          data[1].substring(1, data[1].length - 1) +
          "," +
          data[2].substring(1, data[2].length - 1) +
          "," +
          data[3].substring(1, data[3].length - 1);
      } else {
        content = content.toString();
        content = content.split(productName + "=")[1];
        content = content.substring(content, content.indexOf("}") + 1);
        var isCalculable = content.isCalculable;
        var equation = content.equation;
        data = content.split(key)[1];
        data = data.split(":")[1].trim();
        data = data.substring(data, data.indexOf("]") + 1);
        data = data.trim();
        data = data.split(",");
        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].trim();
          let digits = data[i].match(/(\d+)/);
          data[i] = digits[0];
        }
      }
      if (isCalculable == "true") {
        console.log("calculable");
      } else {
        actualValue = data;
      }
      if (countryCode.toLowerCase() == "ph" && actualValue.length() > 0) {
        countrySpecificResponse = sunlife.vgncms.cda.asia.quote.AsiaQuickQuoteCalculation.getPhResult(
          key,
          amount,
          countryCode,
          dob,
          frequencyTxt,
          mYear,
          actualValue,
          prop
        );
      }
      if (countryCode.toLowerCase() == "hk") {
        getCountForHK();
        countrySpecificResponse = getCountForHK();
      }
      console.log(
        builder
          .concat(actualValue)
          .concat("||")
          .concat(countrySpecificResponse)
          .toString()
      );
      jspData = builder
        .concat(actualValue)
        .concat("||")
        .concat(countrySpecificResponse)
        .toString();
      fetching(jspData);
    }
  } catch (e) {
    console.log(e);
  }
}
