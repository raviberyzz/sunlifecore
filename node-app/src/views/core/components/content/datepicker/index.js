 //window.onload = rememberForm;
//  var pageLabelData = {
//   'en': {	
//     'errorMessageDateEmpty' : 'Please enter a valid date range.',
//     'errorMessageDateInvalidRange': 'Start date cannot be later than the end date. Please enter a valid date range.',
//     'serviceUnavailableMessage'  : 'serviceUnavailableMessage - en '
//     },
//   'fr': {	
//     'errorMessageDateEmpty' : 'Veuillez entrer une plage de dates valide.',
//     'errorMessageDateInvalidRange': 'La date de dÃ©but ne peut pas Ãªtre postÃ©rieure Ã  la date de fin. Veuillez entrer une plage de dates valide.',
//     'serviceUnavailableMessage'  : 'serviceUnavailableMessage - fr '
//     }
// };

$(document).ready(function () {
  // determine the max date, that is not a weekend
  var today = new Date();
/*		
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dd = yesterday.getDate();
*/
  if (today.getDay() == 0) {
    today.setDate(today.getDate() - 2);
  }
  if (today.getDay() == 6) {
    today.setDate(today.getDate() - 1);
  }
/*
  dd = yesterday.getDate();
  var mm = yesterday.getMonth() + 1;
  var yyyy = yesterday.getFullYear();
*/		
      $('#startDate').datepicker({
      next: '#endDate', // The date in '#startdate' must be before or equal to the date in '#enddate'
      theme: 'bootstrap',
      weekDayFormat: 'narrow',
      daysOfWeekDisabled: [0, 6],
      outputFormat: 'M/d/yyyy',
  //max: mm + '/' + dd + '/' + yyyy,
  max: (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear(),
  isCurrentDateDisabled:true,
      gainFocusOnConstruction:false
      });
      $('#endDate').datepicker({
      previous: '#startDate', // The date in '#enddate' must be after or equal to the date in '#startdate'
      theme: 'bootstrap',
      weekDayFormat: 'narrow',
      daysOfWeekDisabled: [0, 6],
      outputFormat: 'M/d/yyyy',
  //max: mm + '/' + dd + '/' + yyyy,
  max: (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear(),
  isCurrentDateDisabled:true,
      gainFocusOnConstruction:false
      });
   $('#startDateMobile, #endDateMobile').attr('type', 'hidden');
   $('#datepicker-mobile').hide();
   if (isTouchDevice()) {
       $('#startDate, #endDate').attr('type', 'hidden');
       $('#datepicker-desktop').hide();
       $('#datepicker-mobile').show();
       $('#startDateMobile, #endDateMobile').attr('type', 'date');
   }

// $('#submit').on("click", function(){
//   var formValidated = validateForm() ;
//   console.log("formValidated >>"+formValidated);
  
//   if(formValidated === true){
    
//     var selectedExchangeID = $( "#stockSymbol option:selected").val();
//     console.log("selectedExchangeID="+selectedExchangeID);
//     var sDate =  $( "#startDate").val() ;
//     var eDate = $( "#endDate").val() ;
//           //var sDateMbl = $("#startDateMobile").val();
//     var sDateMblRaw = new Date($("#startDateMobile").val());
//     //var sDateMblMonth = sDateMblRaw.getMonth() + 1;
//     var sDateMbl = (sDateMblRaw.getMonth() + 1) + "/" + (sDateMblRaw.getDate() + 1) + "/" + sDateMblRaw.getFullYear();
//     var eDateMblRaw = new Date($("#endDateMobile").val());
//     //var eDateMblMonth = eDateMblRaw.getMonth() + 1;
//     var eDateMbl = (eDateMblRaw.getMonth() + 1) + "/" + (eDateMblRaw.getDate() + 1) + "/" + eDateMblRaw.getFullYear();
//           var sDateFinal = isTouchDevice() ? sDateMbl : sDate;
//           var eDateFinal = isTouchDevice() ? eDateMbl : eDate;
//           // var wsUrl =  '/static/Global/Investors/getStockHistory.'+selectedExchangeID+'.xml' + '?id_exchange=' +selectedExchangeID+'&start=' +sDate+ '&end='+ eDate;
//           //var wsUrl = '/getStockHistory.wca?id_exchange=' + selectedExchangeID + '&start=' + sDate + '&end=' + eDate;
//           var wsUrl = '/getStockHistory.wca?id_exchange=' + selectedExchangeID + '&start=' + sDateFinal + '&end=' + eDateFinal;

//     console.log("wsUrl="+wsUrl);
//           console.log("mobile start date" + sDateMbl)
//           console.log("mobile end date" + eDateMbl)
//     var isWorkingDay = false ;
//     var isErrorwithWS = false ;
//     var startDateClosingPrice = "";
//     var endDateClosingPrice = "" ;
//     $.ajax({
//       type: "GET",
//       url: wsUrl,
//       dataType: "xml",
//       success: function(data) {
//         if ($(data).find('date').length){
//         console.log('date node length='+$(data).find('date').length);
//         if ($(data).find('date').length){
//           // date node exists
//           // check if need to poin to first one
//           $(data).find("date").each(function() {
//             var $this = $(this) ;
//             if ($this.find("close").length && $this.find("close").length > 0){
//               var quotedate = $this.find("quotedate").text();
//               console.log('quotedate='+quotedate+", sDate="+sDateFinal+", eDate="+eDateFinal);


//               if(new Date(quotedate).getTime() === new Date(sDateFinal).getTime() ){	
//                 startDateClosingPrice = $this.find("close").text();
//               }
              

//               if(new Date(quotedate).getTime() === new Date(eDateFinal).getTime() ){	
//                 endDateClosingPrice = $this.find("close").text();
//               }					
              
//             }else{
//               console.log('No data for this date');
//             }		
//           });
          
//           if(startDateClosingPrice != ""  &&  endDateClosingPrice != ""){
//             console.log('startDateClosingPrice='+startDateClosingPrice+',	endDateClosingPrice='+endDateClosingPrice);		
//             document.getElementById("resultRow").style.display = "block";		
//             document.getElementById("resultRow").style.visibility = "visible";
//             calculateInvestmentNew(startDateClosingPrice, endDateClosingPrice);
//           }else{
//             console.log('No data for start or end date .. display error msg');
//              document.getElementById("invCalcResult").style.display = "none";
//              document.getElementById("notWorkingDayMessage").style.display = "block";
//              document.getElementById("notWorkingDayMessage").style.visibility = "visible";
//           }
//         }else{
//           console.log('cccc');	
//         }
        
//         }else{
//           console.log('No data for this date');

//         }
//       },
//       error: function() {
//         isErrorwithWS = true ;
//         console.log("The XML File could not be processed correctly.");

//       }
//     });		

    
//   }else{
//     console.log ("formValidated is false");
//   }
//   return false;
// });	

});

// function calculateInvestmentNew(startDateClosingPrice, endDateClosingPrice) {
//   var noOfShares = "";
//   var sDateCP = startDateClosingPrice ; //document.investmentCalulator.startDateClosingPrice_h.value;
//   var eDateCP = endDateClosingPrice; //document.investmentCalulator.endDateClosingPrice_h.value;
//   var investedAmnt = $( "#amount").val(); //document.investmentCalulator.investedAmnt_h.value;
//   var investedShares = $( "#share").val(); //document.investmentCalulator.investedShare_h.value;
//   if (investedAmnt != "") {
//       noOfShares = parseFloat(investedAmnt / sDateCP);
//       noOfShares = noOfShares.toFixed(2);
//   } else {
//       noOfShares = parseFloat(investedShares);
//       noOfShares = noOfShares.toFixed(2);
//   }
//   var change = parseFloat(eDateCP - sDateCP);
//   var totalInvestment = parseFloat(noOfShares * eDateCP);
//   var pctChange = parseFloat((change / sDateCP) * 100);
//   displayResultTable(sDateCP, eDateCP, noOfShares, totalInvestment, pctChange);
// }


// function validateForm() {
// var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
//   var invalidForm = false;
//    if (isTouchDevice()) {
//        console.log('inside mobile validation')
//        var sDateMblStr = document.investmentCalulator.startDateMobile.value;
//        var eDateMblStr = document.investmentCalulator.endDateMobile.value;
//        if (sDateMblStr == "" || eDateMblStr == "") {
//            document.getElementById("errorMessageDateMobile").className = "";
//            document.getElementById("errorMessageDateMobile").innerHTML = pageLabelData[lang]['errorMessageDateEmpty']; //"Please enter a valid date range.";
//            document.getElementById("errorMessageDateMobile").style.visibility = "visible";
//            invalidForm = true;
//            $('html,body').animate({scrollTop: $('#stockSymbol').offset().top-200}, 200, function() {
//               // $('#startDateMobile').focus();
//            });
           
         

           
//        } else {
//            var startDateMbl = new Date(sDateMblStr);
//            var endDateMbl = new Date(eDateMblStr);
//            if (startDateMbl > endDateMbl) {
//                document.getElementById("errorMessageDateMobile").className = "";
//                document.getElementById("errorMessageDateMobile").innerHTML = pageLabelData[lang]['errorMessageDateInvalidRange'];
//                document.getElementById("errorMessageDateMobile").style.visibility = "visible";
//                document.getElementById("errorMessageDateMobile").style.display = "block";
//                invalidForm = true;
//                   //$('html,body').animate({scrollTop: $('#stockSymbol').offset().top}, 200, function() {
//                     //      $('#startDateMobile').focus();
//                   //});
//                  // $( "#startDateMobile" ).focus();
//               $('html,body').animate({scrollTop: $('#stockSymbol').offset().top-200}, 200, function() {
//               // $('#startDateMobile').focus();
//            });
           
//               // $( "#startDateMobile" ).focus();
//            } else {
//                document.getElementById("errorMessageDateMobile").style.visibility = "hidden";
//                document.getElementById("errorMessageDateMobile").style.display = "none";
//            }
//        }
//    } else {
//   var sDateStr = document.investmentCalulator.startDate.value;
//   var eDateStr = document.investmentCalulator.endDate.value;
//   if (sDateStr == "" || eDateStr == "") {
//   document.getElementById("errorMessageDate").className = "";
//   document.getElementById("errorMessageDate").innerHTML =  pageLabelData[lang]['errorMessageDateEmpty'];	//"Please enter a valid date range.";
//       document.getElementById("errorMessageDate").style.visibility = "visible";
//       invalidForm = true;
//       $( "#startDate" ).focus();
//   } else {
//       var startDate = new Date(sDateStr);
//       var endDate = new Date(eDateStr);
//       if (startDate > endDate) {
//     document.getElementById("errorMessageDate").className = "";
//           document.getElementById("errorMessageDate").innerHTML =  pageLabelData[lang]['errorMessageDateInvalidRange']; 
//           document.getElementById("errorMessageDate").style.visibility = "visible";
//     document.getElementById("errorMessageDate").style.display = "block";
//           invalidForm = true;
//           $( "#startDate" ).focus();
//       } else {
//     document.getElementById("errorMessageDate").style.visibility = "hidden";
//     document.getElementById("errorMessageDate").style.display = "none";
//   }
//   }
//    }
//   if (document.getElementById('investmentShare').checked) {
//       var share = document.investmentCalulator.share.value;
//       if (share == "" || isNaN(share)) {
//     document.getElementById("errorMessageShare").className = "";
//           document.getElementById("errorMessageShare").style.visibility = "visible";
//     document.getElementById("errorMessageShare").style.display = "block";
//           $("#errorMessageShare" ).scrollToMe();
//           $("#share").focus();
//           invalidForm = true;
        
//       } else {
    
//           document.getElementById("errorMessageShare").style.visibility = "hidden";
//     document.getElementById("errorMessageShare").style.display = "none";
//       }
//   } else {
//       var amount = document.investmentCalulator.amount.value;
//       if (amount == "" || isNaN(amount)) {
//     document.getElementById("errorMessageAmnt").className = "";
//           document.getElementById("errorMessageAmnt").style.display = "block";
//      document.getElementById("errorMessageAmnt").style.visibility = "visible";
//           $("#errorMessageAmnt" ).scrollToMe();
//           $("#amount").focus();
//           invalidForm = true;
//       } else {
//           document.getElementById("errorMessageAmnt").style.display = "none";
//     document.getElementById("errorMessageAmnt").style.visibility = "hidden";
//       }
//   }
//   if (invalidForm) {
//       document.getElementById("invCalcResult").style.display = "none";
//       document.getElementById("notWorkingDayMessage").style.display = "none";
//       return false;
//   } else{
//   // hide all error mags
//   document.getElementById("errorMessageDate").style.visibility = "hidden";
//   document.getElementById("errorMessageDate").style.display = "none";
//    document.getElementById("errorMessageShare").style.visibility = "hidden";
//    document.getElementById("errorMessageShare").style.display = "none";
//    document.getElementById("errorMessageAmnt").style.visibility = "hidden";
//    document.getElementById("errorMessageAmnt").style.display = "none";
//   document.getElementById("notWorkingDayMessage").style.display = "none";
//   document.getElementById("notWorkingDayMessage").style.visibility = "hidden";
//   // now return true
//   return true;
// };
// }

// function extractNumber(obj) {
//   var temp = obj.value;
//   var reg0Str = '^[0-9]{0,9}\.[0-9]{0,2}$';
//   var reg1Str = '^[0-9]{0,9}$';
//   var reg0 = new RegExp(reg0Str);
//   var reg1 = new RegExp(reg1Str);
//   if (reg1.test(temp)) return true;
//   if (reg0.test(temp)) return true;
//   var reg1Str = '[^0-9\.]';
//   var reg1 = new RegExp(reg1Str, 'g');
//   temp = temp.replace(reg1, '');
//   var reg3 = /\./g;
//   var reg3Array = reg3.exec(temp);
//   if (reg3Array != null) {
//       var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
//       reg3Right = reg3Right.replace(reg3, '');
//       reg3Right = reg3Right.substring(0, 2);
//       var reg3Left = temp.substring(0, reg3Array.index);
//       if (reg3Left.length > 9) reg3Left = reg3Left.substring(0, 9);
//       temp = reg3Left + '.' + reg3Right;
//   } else {
//       if (temp.length > 9) {
//           temp = temp.substring(0, 9);
//       }
//   }
//   obj.value = temp;
// }

// function blockNonNumbers(obj, e) {
//   var key;
//   var isCtrl = false;
//   var keychar;
//   var reg;
// // FF registers some keycodes as 0; if so, use e.which
// if ((e.keyCode != 0) && (e.keyCode != undefined)) {
//   key = e.keyCode;
//   isCtrl = e.ctrlKey;
// } else {
//   key = e.which;
//   isCtrl = e.ctrlKey;
// }

//   if (isNaN(key)) return true;
//   keychar = String.fromCharCode(key);
// // FF will register the backspace and tab, and enter this function, which won't allow it to escape; explicit check to exit
// // 8 = backspace; 9 = tab key
//   if (key == 8 || key == 9 || isCtrl) {
//       return true;
//   }
//   reg = /\d/;
//   var isFirstD = keychar == '.' && obj.value.indexOf('.') == -1;
//   var isLimitReached = false;
//   if (reg.test(keychar)) {
//       var deciPos = obj.value.indexOf('.');
//       if (deciPos < 0) {
//           if (obj.value.length >= 9) isLimitReached = true;
//       }
//   }
// var retVal = isFirstD || (reg.test(keychar) && !isLimitReached);
// return retVal;
// }


// function changeCurrencyFormat(val) {

// var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
//  if(lang=='en'){

//   if (val == "TSX") {
//     document.getElementById("amountLabel").innerHTML = "Amount invested (C$)";
//   } else {
//     document.getElementById("amountLabel").innerHTML = "Amount invested (US$)";
//   }
// }else{
//   if (val == "TSX") {
//     document.getElementById("amountLabel").innerHTML = "Somme placÃ©e ($ CA)";
//   } else {
//     document.getElementById("amountLabel").innerHTML = "Somme placÃ©e ($ US)";
//   }

// }


// }



// function displayResultTable(sDateCP, eDateCP, noOfCommonShares, investmentValue, pctChange) {
//   sDateCP = '$' + numberFormat(sDateCP);
//   eDateCP = '$' + numberFormat(eDateCP);
//   noOfCommonShares = numberFormat(noOfCommonShares);
//   investmentValue = '$' + numberFormat(investmentValue);
//   if (pctChange > 0) pctChange = '+' + numberFormat(pctChange) + '%';
//   else pctChange = numberFormat(pctChange) + '%';
//   document.getElementById('sDate_closingPrice').innerHTML = sDateCP;
//   document.getElementById('eDate_closingPrice').innerHTML = eDateCP;
//   document.getElementById('no_of_shares').innerHTML = noOfCommonShares;
//   document.getElementById('inv_value').innerHTML = investmentValue;
//   document.getElementById('pct_chng').innerHTML = pctChange;
//   document.getElementById("invCalcResult").style.display = "block";
// }

// function numberFormat(number) {
//   number = parseFloat(number);
//   number = number.toFixed(2);
//   var numStr = number + '';
//   splitNumber = numStr.split('.');
//   significantNumber = splitNumber[0];
// var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
//  if(lang=='en'){
//    fraction = splitNumber.length > 1 ? '.' + splitNumber[1] : '.00';
//  }else{
//   fraction = splitNumber.length > 1 ? ',' + splitNumber[1] : '.00';
//  }
   
//   var rgx = /(\d+)(\d{3})/;
//   while (rgx.test(significantNumber)) {
     
//   if(lang=='en'){
//      significantNumber = significantNumber.replace(rgx, '$1' + ',' + '$2');
//    }else{
//     significantNumber = significantNumber.replace(rgx, '$1' + ' ' + '$2');
//    }
//   }
//   var result = significantNumber + fraction;
//   return result;
// }

// function enableShareText(){ 
// document.investmentCalulator.share.disabled=false; 
// document.investmentCalulator.amount.value=""; 
// document.investmentCalulator.amount.disabled=true; 
// document.getElementById("errorMessageAmnt").style.display = "none"; 
// $("#investmentAmount").attr("aria-checked", false);
// $("#investmentShare").attr("aria-checked", true);	
// }

// function enableAmountText() {
//    document.investmentCalulator.amount.disabled = false;
//    document.investmentCalulator.amount.value = "1000.00";
//    document.investmentCalulator.share.value = "";
//    document.investmentCalulator.share.disabled = true;
//    document.getElementById("errorMessageShare").style.visibility = "hidden";
// document.getElementById("investmentAmount").setAttribute("aria-checked", true);
// document.getElementById("investmentShare").setAttribute("aria-checked", false);	 
// }

function isTouchDevice() {
   return (('ontouchstart' in window) ||
       (navigator.MaxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

jQuery.fn.extend({scrollToMe: function() {
var x = jQuery(this).offset().top;
$('html').scrollTop(x);
}
});