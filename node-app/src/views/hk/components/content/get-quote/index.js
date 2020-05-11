
$(document).ready(function(){
        /* qc_main.js starts here */
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
          /**
           * 
           */
          dd2open = 0;
          $("#qc_q1_ans").val("");
          $("#qc_q2_ans").val("");
      }
      
      
      function getAge() {
          var age = $("#qc_q1_ans").val();
          return age;
      }
      
      function getSecondQuetionAns() {
      
          return $("#qc_q2_ans").val();
      }
      
      var qc_optgender = "";
      var qc_optsmoke = "";
      var dd2open = 0;
      var dd1open = 0;
      var qc_formvalid = false;
      var langcalc = 'en';
      $(document).ready(
          function() {
              //var locale = $.urlParam('vgnLocale');
              var locale="en_CA";
              if (locale != null) {
                  langcalc = locale.split("_")[0];
              }
      
              initQC();
      
              function checkSubmit() {
                  if (validateAge($("#qc_q1_ans").val()) && validateSecondAns()) {
                      qc_formvalid = true;
      
                      if (!$(".qc_submit_btn a").hasClass("btn-yellow")) {
                          $(".qc_submit_btn a").removeAttr("disabled");
                          $(".qc_submit_btn a").removeClass("btn-blue").addClass(
                              "btn-yellow");
                      }
                  } else {
      
                      qc_formvalid = false;
                      if (!$(".qc_submit_btn a").hasClass("btn-blue")) {
                          $(".qc_submit_btn a").attr("disabled", "disabled");
                          $(".qc_submit_btn a").removeClass("btn-yellow")
                              .addClass("btn-blue");
                      }
                  }
              }
      
              $('.qc_returnzero_error_msg').remove();
              $("#qc_q2_ans").on('click', function() {
                  if (dd2open == 0) {
                      dd2open = 1;
                      $("#qc_q2_ans").addClass("isAns");
                  } else {
                      dd2open = 0;
                      $("#qc_q2_ans").removeClass("isAns");
                      if ($("#qc_q2_ans").val() != null && !$("#qc_q2_ans").hasClass("isAnsOut"))
                          $("#qc_q2_ans").addClass("isAnsOut");
                  }
                  checkSubmit();
              });
              $("#qc_q2_ans").on('change', function() {
                  checkSubmit();
              });
      
              function validateSecondAns() {
                  if ($("#qc_q2_ans").length > 0) {
                      if ($("#qc_q2_ans").val() != null)
                          return true;
                      else
                          return false;
                  } else {
                      return true;
                  }
              }
              //to check whether input is numeric
              $("#qc_q1_ans").keypress(function(event) {
      
                  var value = String.fromCharCode(event.which);
                  if (event.which != 8 && !checkNumeric(value)) {
                      event.preventDefault();
                  }
              });
      
              function checkNumeric(value) {
      
                  var regex = /^[0-9]\d*((\.\d{0,2})?)$/;
                  if (value != "" && regex.test(value)) {
                      return true;
                  } else {
                      return false;
                  }
              }
              //Age limit 0 to 99
              function validateAge(value) {
                  var age1 = parseInt(value);
                  $('.qc_returnzero_error_msg').remove();
                  if ($("#qc_q1_ans").val() == null || $("#qc_q1_ans").val() == "") {
                      return false;
                  } else if (age1 > 99) {
                      var enMsg = "Age range only applies from 0 to 99</div>";
                      var zhMsg = "å¹´é½¡ç¯„åœåªé©ç”¨ç”±0è‡³99";
                      var printMsg = (langcalc == "en") ? enMsg : zhMsg;
                      $('#qc_submit').prev().append("<div class='qc_returnzero_error_msg'>" + printMsg + '</div>');
                      return false;
                  }
                  return true;
              }
      
              function removeAnsCSS(tmp) {
                  $("#qc_q1_ans").removeClass("isAns");
              }
      
              $("#qc_q1_ans").on(
                  'click',
                  function() {
      
                      if ($("#qc_q1_ans").hasClass("isAns")) {
                          $("#qc_q1_ans").removeClass("isAns");
                      }
                      if ($("#qc_q1_ans").val() != "" &&
                          !$("#qc_q1_ans").hasClass("isAnsOut"))
                          $("#qc_q1_ans").addClass("isAnsOut");
                  });
      
              $("#qc_q1_ans").on('click', function() {
                  if ($("#qc_q1_ans").hasClass("isAns")) {
                      $("#qc_q1_ans").removeClass("isAns");
                  } else {
                      $("#qc_q1_ans").addClass("isAns");
                  }
              });
      
      
              $("#qc_q1_ans").on('blur', function() {
                  $("#qc_q1_ans").removeClass("isAns");
      
                  if ($("#qc_q1_ans").val() != "" && $("#qc_q1_ans").val() != null &&
                      !$("#qc_q1_ans").hasClass("isAnsOut"))
                      $("#qc_q1_ans").addClass("isAnsOut");
                  // Tagging for age step 1:first interaction
                  var url = window.location.href;
                  var age = getAge();
                  var productName = getProductName();
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "step 1:first interaction",
                      ev_data_two: "" + productName + ":age=" + age + "",
                      page_url: url
                  });
                  if ($("#qc_q1_ans").val() == "" || $("#qc_q1_ans").val() == null)
                      $("#qc_q1_ans").removeClass("isAnsOut");
      
              });
              $("#qc_q1_ans").change(function() {
                  $('.qc_returnzero_error_msg').remove();
                  checkSubmit();
              });
              $('#qc_q2').find('select').on('change', function() {
                  var productName = getProductName();
              var url = window.location.href;
            var secondDrop = getSecQusAns();
                  if (productName == "SunHealth_Medical_Care") {
                      utag.link({
                          ev_type: "calc",
                          ev_action: "clk",
                          ev_title: "quick quote",
                          ev_data_one: "step 2",
                          ev_data_two: "" + productName + ":gender=" + secondDrop + "",
                          page_url: url
                      });
                  } else {
                      utag.link({
                          ev_type: "calc",
                          ev_action: "clk",
                          ev_title: "quick quote",
                          ev_data_one: "step 2",
                          ev_data_two: "" + productName + ":gender=" + secondDrop + "",
                          page_url: url
                      });
                  }
      
              });
              //start of dynamically making  selected product highlighted with yellow background color and others product with gray color.
              //Assume that max of four products can be shown on screen.
              $("#qc_result1").on('click', function() {
                  if (!$("#qc_result1").hasClass('qc_bg_yellow')) {
                      $("#qc_result1").removeClass('qc_bg_grey');
                      $("#qc_result1").addClass('qc_bg_yellow');
                      $("#qc_result1 div.qc_plan_cta").find('a').removeAttr('disabled');
                      $("#qc_result1 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
                      for (var i = 2; i < 5; i++) {
                          if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow')) {
                              $("#qc_result" + i).removeClass('qc_bg_yellow');
                              $("#qc_result" + i).addClass('qc_bg_grey');
                              //$("#qc_result"+i).find('.qc_plan_cta a').attr('disabled','disabled');//EBUS-83709
                              $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                          }
                      }
                  }
                  // Tagging for click world wide
                  var pageURLTag = $(location).attr("href");
                  var resultYear = $('#qc_result1').find('div.qc_result_plan_title_hightlight').text();
                  var premium = $('#qc_result1').find('div.qc_result_price').text();
                  var secondDrop = getSecQusAns();
                  var age = getAge();
                  var product = getProductName();
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "premium plan",
                      ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + ":result=" + resultYear + ":annual= " + premium + "",
                      page_url: pageURLTag
                  });
                  advsleadClk = false;
              });
              $("#qc_result2").on('click', function() {
                  if (!$("#qc_result2").hasClass('qc_bg_yellow')) {
                      $("#qc_result2").removeClass('qc_bg_grey');
                      $("#qc_result2").addClass('qc_bg_yellow');
                      $("#qc_result2 div.qc_plan_cta").find('a').removeAttr('disabled');
                      $("#qc_result2 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
      
                      for (var i = 1; i < 5; i++) {
                          if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow') && i != 2) {
                              $("#qc_result" + i).removeClass('qc_bg_yellow');
                              $("#qc_result" + i).addClass('qc_bg_grey');
                              //$("#qc_result"+i).find('.qc_plan_cta a').attr('disabled','disabled');//EBUS-83709
      
                              $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                          }
                      }
                  }
                  // Tagging for click world wide exclude the US
                  var pageURLTag = $(location).attr("href");
                  var resultYear = $('#qc_result2').find('div.qc_result_plan_title_hightlight').text();
                  var premium = $('#qc_result2').find('div.qc_result_price').text();
                  var secondDrop = getSecQusAns();
                  var age = getAge();
                  var product = getProductName();
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "premium plan",
                      ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + ":result=" + resultYear + ":annual= " + premium + "",
                      page_url: pageURLTag
                  });
                  advsleadClk = false;
              });
      
              $("#qc_result3").on('click', function() {
                  if (!$("#qc_result3").hasClass('qc_bg_yellow')) {
                      $("#qc_result3").removeClass('qc_bg_grey');
                      $("#qc_result3").addClass('qc_bg_yellow');
                      $("#qc_result3 div.qc_plan_cta").find('a').removeAttr('disabled');
                      $("#qc_result3 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
      
                      for (var i = 1; i < 5; i++) {
                          if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow') && i != 3) {
                              $("#qc_result" + i).removeClass('qc_bg_yellow');
                              $("#qc_result" + i).addClass('qc_bg_grey');
                              //$("#qc_result"+i).find('.qc_plan_cta a').attr('disabled','disabled');//EBUS-83709
      
                              $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                          }
                      }
                  }
                  // Tagging for click world wide exclude the Asia
                  var pageURLTag = $(location).attr("href");
                  var resultYear = $('#qc_result3').find('div.qc_result_plan_title_hightlight').text();
                  var premium = $('#qc_result3').find('div.qc_result_price').text();
                  var secondDrop = getSecQusAns();
                  var age = getAge();
                  var product = getProductName();
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "premium plan",
                      ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + ":result=" + resultYear + ":annual= " + premium + "",
                      page_url: pageURLTag
                  });
                  advsleadClk = false;
              });
      
              $("#qc_result4").on('click', function() {
                  if (!$("#qc_result4").hasClass('qc_bg_yellow')) {
                      $("#qc_result4").removeClass('qc_bg_grey');
                      $("#qc_result4").addClass('qc_bg_yellow');
                      $("#qc_result4 div.qc_plan_cta").find('a').removeAttr('disabled');
                      $("#qc_result4 div.qc_result_plan_title").removeClass('qc_result_plan_title').addClass('qc_result_plan_title_hightlight');
                      for (var i = 1; i < 4; i++) {
                          if ($("#qc_result" + i).length > 0 && $("#qc_result" + i).hasClass('qc_bg_yellow')) {
                              $("#qc_result" + i).removeClass('qc_bg_yellow');
                              $("#qc_result" + i).addClass('qc_bg_grey');
                              //$("#qc_result"+i).find('.qc_plan_cta a').attr('disabled','disabled');//EBUS-83709
                              $("#qc_result" + i + ' div.qc_result_plan_title_hightlight').addClass('qc_result_plan_title').removeClass('qc_result_plan_title_hightlight');
                          }
                      }
                  }
            // Tagging for click world wide exclude the Asia
                  var pageURLTag = $(location).attr("href");
                  var resultYear = $('#qc_result4').find('div.qc_result_plan_title_hightlight').text();
                  var premium = $('#qc_result4').find('div.qc_result_price').text();
                  var secondDrop = getSecQusAns();
                  var age = getAge();
                  var product = getProductName();
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "premium plan",
                      ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + ":result=" + resultYear + ":annual= " + premium + "",
                      page_url: pageURLTag
                  });
                  advsleadClk = false;
      
              }); //End
      
              $("#qc_q2_ans").on('blur', function() {
                  $("#qc_q2_ans").removeClass("isAns");
      
                  if ($("#qc_q2_ans").val() != "" && $("#qc_q2_ans").val() != null &&
                      !$("#qc_q1_ans").hasClass("isAnsOut"))
                      $("#qc_q2_ans").addClass("isAnsOut");
                  //Tagging for question=annual
                  utag.link({
                      ev_type: "calc",
                      ev_action: "clk",
                      ev_title: "quick quote",
                      ev_data_one: "question=annual deductible"
                  });
                  if ($("#qc_q2_ans").val() == "" || $("#qc_q2_ans").val() == null)
                      $("#qc_q2_ans").removeClass("isAnsOut");
              });
      
              //getting from utag
              function getProductName() {
      
                  var productName = "";
                  //var breadcrumbPathArr = utag_data.page_breadcrumb.split("/");
                  //productName = breadcrumbPathArr[breadcrumbPathArr.length - 1].trim().replace(/ /g, "_");
                  productName=$('.titlebar').children().text().trim();
                  if(!productName){
                    productName='SunHealth_Medical_Premier';
                  }
                  return productName;
              }
              $("#qc_submit .btn").click(function() {
                  if (qc_formvalid) {
                      $(".qc_loading_ani").show();
                      // submit and jump to solution result page here
                      var age = getAge();
                      var product = getProductName();
                      var gender = "";
                      var smoker = "";
                      var freq = "0.0";
                      var amount = "0.0";
                      var key = "";
                      var annualeDuct = $("#qc_q2_ans").val();
                      var pageURLTag = $(location).attr("href");
                      // Tagging for Submit Button.
                      var secondDrop = getSecQusAns();
                      if ((age != null) && (annualeDuct != null))
                          if (secondDrop == 'Female' || secondDrop == 'Male')
                              utag.link({
                                  ev_type: "calc",
                                  ev_action: "submit",
                                  ev_title: "quick quote",
                                  ev_data_one: "step 3:last interaction",
                                  ev_data_two: "" + product + ":age=" + age + ":gender =" + secondDrop + "",
                    page_url: pageURLTag 
                              });
                          else
                              utag.link({
                                  ev_type: "calc",
                                  ev_action: "submit",
                                  ev_title: "quick quote",
                                  ev_data_one: "step 3:last interaction",
                                  ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + "",
                                  page_url: pageURLTag
                              });
                      else
                          utag.link({
                              ev_type: "calc",
                              ev_action: "submit",
                              ev_title: "quick quote",
                              ev_data_one: "step 2:last interaction",
                  ev_data_two: "" + product + ":age=" + age + "",
                  page_url: pageURLTag
                                
                          });
                      if (product == 'SunHealth_Medical_Essential')
                          key = getAge();
                      else
                          key = getAge() + '_' + getSecondQuetionAns();
                      var json = new Object();
                      json.key = key;
                      json.product = product;
                      json.freq = freq;
                      json.amount = amount;
                      json.age = age;
                      json.country = 'hk';
                      json.freq_text = '';
                      json.dob = '';
                      json.investmentYear = '';
                      let countryCode='hk';
                      let dob='';
                      let frequencyTxt='';
                      let mYear='';     
                      console.log("JSON:- " + JSON.stringify(json));
                      jsonData = "data=" + JSON.stringify(json);
                      var jspData=getPremiumPrice(product,key,freq,amount,age,countryCode.toLowerCase(),dob,frequencyTxt,mYear);
      
                      if(jspData) {
                          var splitByPipe = jspData.split("||");
                          var amount = splitByPipe[0];
                          var runiqueID = splitByPipe[1]
                          var arrayOfResult = amount.split(',');
                          var uniqueID = runiqueID.substring(0, 8);
                          if ($('#uniqueID').length > 0)
                              $('#uniqueID').remove();
                          $('<input>').attr({
                              type: 'hidden',
                              id: 'uniqueID',
                              value: uniqueID
                          }).appendTo('#qc_container');
                          //if jsp returns only zero and blank
                          if (arrayOfResult.length == 0 || arrayOfResult[0].trim() == "0.0" || arrayOfResult[0].trim() == "") {
                              console.log("return 0 from jsp");
                          } else {
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
      
                              });
                              //appending "/annual" at the end with each price
                              arrayOfResult.forEach(function(value, index) {
                                  var elementItem = index + 1;
                                  if (langcalc == 'en') {
                                      $('#qc_result' + elementItem + ' div.qc_result_price').html('HKD' + addCommas($.trim(value)) + '/ annual');
                                  } else {
                                      $('#qc_result' + elementItem + ' div.qc_result_price').html('æ¯å¹´æ¸¯å…ƒ' + addCommas($.trim(value)));
                                  }
      
                              });
      
                          }
                        }
                      else{
                       console.log('jsp npot loaded'); 
                      }}      
              });
          });
      
      function calcTime(offset) {
          // create Date object for current location
          d = new Date();
          utc = d.getTime() + (d.getTimezoneOffset() * 60000);
          nd = new Date(utc + (3600000 * offset));
          return nd.getHours() + "" + nd.getMinutes() + "" + nd.getSeconds() + "" + nd.getMilliseconds();
      }
      
      //rounding amount
      function roundAmount(number, decimalPlace) {
          var result = Math.pow(10, decimalPlace || 0);
          return Math.round(number * result) / result;
      }
      
      function showEmptyErrMsg() {
          $(".qc_returnzero_error_msg").removeAttr("hidden");;
      }
      $(".qc_plan_cta").click(function() {
          if ($("#section_question").offset() != null) {
              $('html,body').animate({
                  scrollTop: $("#section_question").offset().top
              }, 'easeInSine');
          }
      });
      //add Comma to get formatted amount value
      function addCommas(input) {
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
          );
      }
      
      //triggering Utag event
      $(".qc_plan_cta a").on('click', function() {
          var planName = $(this).parent().parent().children('div:first-child').text();
          utag.link({
              ev_type: "calc",
              ev_action: "clk",
              ev_title: "quick quote result",
              ev_data_one: planName
          });
      
      });
      // For submit button Tagging
      $("#advisor-modal-form #advisor-modal-submit-btnContact").click(function() {
          var pageURLTag = $(location).attr("href");
          var resultYear = $('#qc_result_main').find('div.qc_result_plan_title_hightlight').text();
          var premium = $('#qc_result1').find('div.qc_result_price').text();
          var secondDrop = getSecQusAns();
          var age = getAge();
          var product = getProductName();
          if (advsleadClk == false) {
              utag.link({
                  ev_type: "lead_form",
                  ev_action: "submit",
                  ev_title: "talk-to-an-advisor-lead-gen-form",
                  ev_data_one: "successful submission:tool referrer=quick quote",
                  ev_data_two: "" + product + ":age=" + age + ":gender=" + secondDrop + ":result=" + resultYear + ":annual= " + premium + "",
                  page_url: pageURLTag
              });
          } else {
              if ($(".parsley-errors-list").hasClass("filled")) {
                  // Submit clicked tracked with error
                  if (typeof utag !== 'undefined') {
                      utag.link({
                          ev_type: "lead_form",
                          ev_action: "submit",
                          ev_title: "talk-to-an-advisor-lead-gen-form",
                          ev_data_one: "error",
                          page_url: pageURLTag
                      });
                  }
              } else {
                  // Submit clicked tracked with no error
                  if (typeof utag !== 'undefined') {
                      utag.link({
                          ev_type: "lead_form",
                          ev_action: "submit",
                          ev_title: "talk-to-an-advisor-lead-gen-form",
                          ev_data_one: "successful submission",
                          page_url: pageURLTag
                      });
                  }
              }
          }
      
      });
      //Tagging for facebook
      $(".icon-facebook").click(function() {
        var pageURLTag = $(location).attr("href");
          var product = getProductName();
          utag.link({ 
      ev_type: "calc", 
      ev_action: "clk", 
      ev_title: "quick quote", 
      ev_data_one: "facebook share", 
      ev_data_two: "+product+",
      page_url: pageURLTag 
      });
      });
      //Tagging for linkedin
      $(".icon-linkedin").click(function() {
        var pageURLTag = $(location).attr("href");
          var product = getProductName();
         utag.link({ 
      ev_type: "calc", 
      ev_action: "clk", 
      ev_title: "quick quote", 
      ev_data_one: "linkedin share", 
      ev_data_two: "+product+",
      page_url: pageURLTag 
      });
      });
      //Tagging for twitter
      $(".icon-twitter").click(function() {
        var pageURLTag = $(location).attr("href");
          var product = getProductName();
         utag.link({ 
      ev_type: "calc", 
      ev_action: "clk", 
      ev_title: "quick quote", 
      ev_data_one: "twitter share", 
      ev_data_two: "+product+",
      page_url: pageURLTag 
      });
      });
      //Function for all common /WeHealth ,SunHealth+Medical+Care & WeHealth+Plus.
      function getSecQusAns() {
        
        var secAnsGet;
         secAnsGet = $("#qc_q2_ans").children('option:selected').text();
      
          return  secAnsGet;
      }
        /* qc_main.js ends here */
});