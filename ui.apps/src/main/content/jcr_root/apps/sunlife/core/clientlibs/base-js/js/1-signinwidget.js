var currentSignInForm;
var contingencyWidgetDisplayed = false;
var signinDataCallDone = false;
var providerURL;
var hostname = window.location.hostname;
var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
var sunnetUrl;

//checks hostname to set sunnet url
if(hostname == 'www.sunlife.ca') {
	sunnetUrl = "https://www.sunnet.sunlife.com";
} else if(hostname == 'cmsprod-www.ca.sunlife') {
	sunnetUrl = "https://www.sunnet.sunlife.com";
} else if(hostname == 'www2.sunlife.ca') {
	sunnetUrl = "https://www.sunnet.sunlife.com";
} else if(hostname == 'stage-www.sunlife.ca') {
	sunnetUrl = "https://stage.sunnet.sunlife.com";
} else if(hostname == 'cmsstage-www.ca.sunlife') {
	sunnetUrl = "https://stage.sunnet.sunlife.com";
} else {
	sunnetUrl = "https://sit-www.sunnet.sunlife.com";
}

if (lang == 'fr'){
	providerURL = sunnetUrl + "/masunlife/ca/f/signinInfo.wca";
}
else{
	providerURL = sunnetUrl + "/mysunlife/ca/e/signinInfo.wca"; 
}

$(document).ready(function () {
	// deeplink handler for public pages
	$('a[data-deeplink]').click(function(){
	 console.log("before hiting ping url in mbrportal");
     	 var deepLinkName=$(this).attr('data-deeplink');
		 var pingServiceUrl = sunnetUrl + "/mbrportal/req/externalPingServices/ping";
     	$.ajax({url: pingServiceUrl,xhrFields: {withCredentials: true},

		           
			success: function (data, status, xhr) { 
			console.log("return code "+xhr.status);
			var response;
			try{
		       response = JSON.parse(data);
			    if(xhr.status=="200"&&response.status=="OK")
	            {
	               window.location.href = sunnetUrl +"/redirectBreak.html?RedirectBreak=1&LINK=PPHP_GBC&FC="+deepLinkName;
		        }
			}
			catch(e)
			{
				$('#signin-widget-modal').on('shown.bs.modal', function() {
                updateSignInFormFromDeeplink('form_signon',deepLinkName);
               });
				$("#signin-widget-modal").modal("show");
			  	
			}			         
		
	 },
			  error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus+ " Error: " + errorThrown);
				$('#signin-widget-modal').on('shown.bs.modal', function() {
                updateSignInFormFromDeeplink('form_signon',deepLinkName);
               });
				$("#signin-widget-modal").modal("show");
    } 
    });
	return false;
	 });

});


function InStr(strMainString, strSubPhrase) {
    var iEndPos;
    var iMainLength = strMainString.length;
    var iSubLength = strSubPhrase.length;
    for (i = 0; i < iMainLength; i++) {
        if (i + iSubLength > iMainLength)
            iEndPos = iMainLength;
        else
            iEndPos = i + iSubLength;
        if (strSubPhrase == strMainString.substring(i, iEndPos)) return i;
    }
    return -1;
}

function getBrowserInfo() {
    var getBrowserInfo;
    /* Determine Browser Type and Version */
    var userAgent = navigator.userAgent;
    var browserName = "UNKNOWNBROWSER"; //value to be stored in bName cookie
    var browserVersion = "";
    var bVersionMajor, bVersionMinor;
    var iSearchPos = -1;

    if (InStr(userAgent, "MSIE") >= 0) {
        browserName = "MSIE";
        iSearchPos = InStr(userAgent, "MSIE");

    } else if (InStr(userAgent, "Trident") >= 0 && InStr(userAgent, "rv") >= 0) {
        browserName = "rv";
        iSearchPos = InStr(userAgent, "rv");

    } else if (InStr(userAgent, "Firefox") >= 0) {
        browserName = "FIREFOX";
        iSearchPos = InStr(userAgent, "Firefox");

    } else if (InStr(userAgent, "Safari") >= 0) {
        browserName = "SAFARI";
        iSearchPos = InStr(userAgent, "Safari");

    } else if (InStr(userAgent, "Netscape6") >= 0) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape6") + 1;

    } else if (InStr(userAgent, "Netscape") >= 0) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape");

    } else if ((InStr(userAgent, "Mozilla") >= 0) && (browserVersion >= 4)) {
        browserName = "NETSCAPE";
        iSearchPos = InStr(userAgent, "Netscape");

    } else if (InStr(userAgent, "Opera") >= 0) {
        browserName = "OPERA";
        iSearchPos = InStr(userAgent, "Opera");

    } else if (InStr(userAgent, "BlackBerry") >= 0) {
        browserName = "BLACKBRY";

    } else if (InStr(userAgent, "Nokia") >= 0) {
        browserName = "NOKIA";
    }


    /* Blackberry user agent has a completely different format from other browsers */
    var strOS;
    if (browserName == "BLACKBRY") {
        iSearchPos = InStr(userAgent, "BlackBerry") + 10;
        var agentStr = userAgent.substring(iSearchPos);
        strOS = "BB" + agentStr.split('/')[0];
        var vBV = agentStr.split('/')[1].split('.');
        bVersionMajor = vBV[0];
        bVersionMinor = vBV[1];
        browserVersion = vBV[0] + "." + vBV[1];
    } else if (browserName == "NOKIA") {
        iSearchPos = InStr(userAgent, "Nokia") + 5;
        var agentStr = userAgent.substring(iSearchPos);
        strOS = "NK" + agentStr.split('/')[0];
        var vBV = agentStr.split('/')[1].split('.');
        bVersionMajor = vBV[0];
        bVersionMinor = vBV[1];
        browserVersion = vBV[0] + "." + vBV[1];
    } else {
        browserVersion = navigator.appVersion;
        /* Determine Major and Minor version */
        if (iSearchPos >= 0) {
            if (browserName == "rv") {
				browserVersion = userAgent.substring(iSearchPos+3, iSearchPos + 7);
				browserName = "MSIE";
			}else{
				iSearchPos = iSearchPos + browserName.length + 1; //search the value after the browser ID in the userAgent string
				browserVersion = userAgent.substring(iSearchPos, iSearchPos + 3);
			}
            var vBV = browserVersion.split('.');
            bVersionMajor = vBV[0];
            bVersionMinor = vBV[1];
        }

        /* Determine Operating System */
		/*
        if (InStr(userAgent, "Windows NT 5.2") >= 0) {
            strOS = "Win2003";
        } else if (InStr(userAgent, "Windows NT 5.0") >= 0) {
            strOS = "Win2000";
        } else if ((InStr(userAgent, "Windows XP") >= 0) || (InStr(userAgent, "Windows NT 5.1") >= 0)) {
            strOS = "WinXP";
        } else if ((InStr(userAgent, "Windows 98") >= 0) || (InStr(userAgent, "Win98") >= 0)) {
            strOS = "Win98";
        } else if (InStr(userAgent, "Windows 95") >= 0) {
            strOS = "Win95";
        } else if (InStr(userAgent, "Windows NT") >= 0) {
            strOS = "WinNT";
        } else if (InStr(userAgent, "Windows 3.1") >= 0) {
            strOS = "Win3.1";
        } else if (InStr(userAgent, "Windows") >= 0) {
            strOS = "WinXP";
        } else if ((InStr(userAgent, "Macintosh") >= 0) || (InStr(userAgent, "Mac OS X") >= 0)) {
            strOS = "WinXP";
        } else if (InStr(userAgent, "Linux") >= 0) {
            strOS = "Linux";
        } else if (InStr(userAgent, "X11") >= 0) {
            strOS = "UNIX";
        } else if (InStr(userAgent, "BlackBerry") >= 0) {
            var iOSPos = InStr(userAgent, "BlackBerry");
            // If Blackberry OS5 or lower, then expect to see useragent like:  BlackBerry9700/5.0.0.442 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100 
            // If Blackberry OS6 or higher, then expect to see useragent like:  
            //     Mozilla/5.0 (BlackBerry; U; BlackBerry 9810; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.261 Mobile Safari/534.11+ 
            if (iOSPos == 0) {
                strOS = userAgent.substring(iOSPos + 10, InStr(userAgent.substring(iOSPos + 10), "/"));
            } else {
                var iBBModel = InStr(userAgent, " BlackBerry ") + 12;
                strOS = "BB" + userAgent.substr(iBBModel, InStr(userAgent.substr(iBBModel), ";"));
            }
        } else {
            strOS = "Unknown Browser";
        }*/
		
		if(InStr(userAgent, "Windows NT 5.2") >= 0  || InStr(userAgent, "Windows NT 5.0") >= 0 || InStr(userAgent, "Windows XP") >= 0 || InStr(userAgent, "Windows NT 5.1") >= 0 || InStr(userAgent, "Windows 98") >= 0 || InStr(userAgent, "Win98") >= 0 || InStr(userAgent, "Windows 95") >= 0 || InStr(userAgent, "Windows NT") >= 0 || InStr(userAgent, "Windows 3.1") >= 0 || InStr(userAgent, "Windows") >= 0 || InStr(userAgent, "Macintosh") >= 0 || InStr(userAgent, "Mac OS X") >= 0 || InStr(userAgent, "X11") >= 0 || InStr(userAgent, "BlackBerry") >= 0){
            strOS = userAgent;
        }else{
			strOS = "Unknown Browser";
		}
    }

    /* Determine local time */
    var timeZone;
    var dtime;
    var date = new Date();

    timeZone = Math.round((240 - date.getTimezoneOffset()) / 15) / 4.0;
    dtime = escape(date.toLocaleString());


    /* Determine Screen Size */
    var screenRes = screen.width + ' x ' + screen.height;
    var colorDepth = screen.colorDepth;


    /* Determine Browser Size */
    var browRes;
    if (document.layers) {
        browRes = window.innerWidth + 'x' + window.innerHeight;
    } else {
        browRes = document.body.clientWidth + ' x ' + document.body.clientHeight;
    }

    return "&OS=" + strOS + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&screenRes=" + screenRes;

    //return	"&browRes=" + browRes + "&OS=" + encodeURIComponent(strOS) + "&tzone=" + timeZone + "&date=" + dtime + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&browserVersMaj=" + encodeURIComponent(bVersionMajor) + "&browserVersMin=" + encodeURIComponent(bVersionMinor) + "&screenRes=" + screenRes + "&colorDepth=" + colorDepth;

}

/*** Start Browser check values ****/

function getBrowserValues(parameter) {
    var browserInfo = getBrowserInfo();
    var browserValues = browserInfo.split('&');

    for (var i = 0; i < browserValues.length; i++) {
        var browserParam = browserValues[i].split('=');
        if (browserParam[0] == parameter) {
            return browserParam[1];
        }
    }

}

// similar to "updateSidnInForm", but handles deeplinks
function updateSignInFormFromDeeplink(formName,deepLinkName) {

  setTimeout(function() {
      if (!signinDataCallDone) {
          displayContingencyWidget();
      }
  }, 5000);

   currentSignInForm = formName;
   
    try {
      
          var rpc = new easyXDM.Rpc({
              remote: providerURL+"?deepLink="+deepLinkName
          }, {
              local: {
                  signinInfo: function(successFn, errorFn) {}
              },
      
              remote: {
                  signinInfo: {}
              }
          });
      
      } catch (err) {
          //show some error widget
        //  alert(err.message);
      	displayContingencyWidget();
}
   
   rpc.signinInfo(success, error);

}

     
function updateSignInForm(formName) {

  setTimeout(function() {
      if (!signinDataCallDone) {
          displayContingencyWidget();
          //console.log('after xmd load');
      }
  }, 5000);

    
   currentSignInForm = formName;
   
    try {
      
          var rpc = new easyXDM.Rpc({
              remote: providerURL
          }, {
              local: {
                  signinInfo: function(successFn, errorFn) {}
              },
      
              remote: {
                  signinInfo: {}
              }
          });
      
      } catch (err) {
          //show some error widget
        //  alert(err.message);
      	displayContingencyWidget();
      	/*
          if (currentSignInForm == "form_signon") {
              $("#contigency-widget").show();
          } else if (currentSignInForm == "form_signon_mobile") {
              $("#contigency-widget-mobile").show();
      
          } else if (currentSignInForm == "form_signon_pinbar"){
              $("#contigency-widget-pinbar").show();
          }*/
}
   
   rpc.signinInfo(success, error);
   
   /* fix for iOS 11 issue with modal-open */
   if (currentSignInForm == "form_signon_mobile") {
	 		var ua = navigator.userAgent;   		  
	 		if (InStr(ua, "iPhone")>= 0 && InStr(ua, "OS 11_") >= 0) {
	 			$("body").addClass("iOSCursorFix");
	 		}
	 }


}


function success(data) {

    signinDataCallDone = true;
    if (currentSignInForm == "form_signon") {
        apology="APOL_HTML";
		genralerror="generalError";
    } else if (currentSignInForm == "form_signon_mobile") {
        apology="APOL_HTML_mobile";
		genralerror="generalError_mobile";
    } else {
        apology="APOL_HTML_pinbar";
		genralerror="generalError_pinbar";
    }

    if (!contingencyWidgetDisplayed) {
	if(data!=null){
		var decodedApologyOn=decodeURIComponent(data.apologyOn);
        if (decodedApologyOn == 'true') {		
            // if (data.apologyOn) {
            var decodedApologyMessage=decodeURIComponent(data.apologyMessage);
            console.log(decodedApologyMessage);
            if(decodedApologyMessage.indexOf('MFA_TRANSMIT')>-1){
                console.log('apology-transmit');
                displayContingencyWidget();
            }else{
                decodedApologyMessage=decodedApologyMessage.replace(/\+/g,' ');
                $("#" + currentSignInForm + " #" +apology).html(decodedApologyMessage);
                $("#" + currentSignInForm + " #" +genralerror ).parent(".form-group").addClass("has-error");
                $("#" + currentSignInForm + " #" +genralerror ).css("display","block");
                //disable form fields  as we are on apology...
                $("#" + currentSignInForm + " input").prop('disabled', function(i, v) {
                    return true;
                });
            }
        } else {
			var decodedSMagentValue=decodeURIComponent(data.smagentname);
			var decodedClientIP=decodeURIComponent(data.clientIp);
			var decodedRealMOID=decodeURIComponent(data.realmoid);

            $("#" + currentSignInForm + " input[name=SMAGENTNAME]").val(decodedSMagentValue);
            $("#" + currentSignInForm + " input[name=REALMOID]").val(decodedRealMOID);
            $("#" + currentSignInForm + " input[name=ClientIP]").val(decodedClientIP);

            //if saveIdAvailable is true, populate user id with ******

            if (data.saveIdAvailable == 'true') {

				//added to decode encrypted save id
				var decodedSaveIdValue=decodeURIComponent(data.encryptedSaveId);
                //save the encrypted value of user ID into the hidden field.
                $("#" + currentSignInForm + " input[name=ESAVEID]").val(decodedSaveIdValue);
                // put asteriks for visible user ID field.
               

                if (currentSignInForm == "form_signon") {
                    $("#" + currentSignInForm + " #USER").val("***********");
                } else if (currentSignInForm == "form_signon_mobile") {
                    $("#" + currentSignInForm + " #accessIDMobile").val("***********");

                }

                $("#" + currentSignInForm + " input[name=LOGONUSINGSAVEID]").val("TRUE");
                //ensure the 'remember me' check box is checked, since there is a saved ID available.
               

				
                if (currentSignInForm == "form_signon") {
                 $("#" + currentSignInForm + " #rememberIDModal").prop("checked", true);
                } else if (currentSignInForm == "form_signon_mobile") {
                  $("#" + currentSignInForm + " #rememberIDMobile").prop("checked", true);

                }

            }

            //browser details updation


            $("#" + currentSignInForm + " input[name=SCREENRES]").val(getBrowserValues('screenRes'));
            $("#" + currentSignInForm + " input[name=BROWSERID]").val(getBrowserValues('browserId'));
            $("#" + currentSignInForm + " input[name=BROWSERVER]").val(getBrowserValues('browserVersionId'));
            $("#" + currentSignInForm + " input[name=BROWSERDESC]").val(getBrowserValues('OS'));

            //enable  form fields which are disabled by default--this is for homepage
            $("#" + currentSignInForm + " input").prop('disabled', function(i, v) {
                return false;
            });



        }

        hideLoadingImage();
            $( "#signinclose" ).focus();
	}
	

    }

}



function error(data) {
    displayContingencyWidget();
    //alert("error occurred: " + data);
}
//called when input field 'remember me' is checked. 
function remember(me) {
    if (!me.checked) {
        $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("FALSE");
        //$("#signin-widget-modal input[name=ESAVEID]").attr("value",'');

    } else {
        $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("TRUE");
    }
    //$("#signin-widget-modal input[name=LOGONUSINGSAVEID]").val("FALSE");
}


function displayContingencyWidget() {
    signinDataCallDone = true;
    contigencyWidgetDisplayed = true;
    if (currentSignInForm == "form_signon") {
        $("#signin-widget").hide();
        $("#contigency-widget").show();

    } else if (currentSignInForm == "form_signon_mobile") {
        $("#signin-widget-modal-mobile").hide();
        $("#contigency-widget-mobile").show();


    } else {
        $("#signin-widget-modal-pinbar").hide();
        $("#contigency-widget-pinbar").show();

    }
	
    hideLoadingImage();

}


function hideLoadingImage() {
    if (currentSignInForm == "form_signon") {
        $(".loading").hide();
    } else if (currentSignInForm == "form_signon_mobile") {
        $(".loading-mobile").hide();
    } else {
        $(".loading-pinbar").hide();
    }

}

function signInClick(){
		//alert('index.js');
    	utag.link({
            "ev_action": "signin",
  			"ev_title": "homepage sign in",
  			"ev_type": "authenticate"
        });
   }

var isSubmitted;
isSubmitted = false;

function CheckClicks(lang) {
        signInClick();
        console.log('inside widget');
		if( isSubmitted == true ) {
				if (lang=="f")
						alert('Veuillez patienter pendant que nous soumettons vos renseignements.');
				else
						alert('Please wait while we submit your information');
				return false;
		} else {
	  		isSubmitted = true;
				var idField;
				var id;
				var i;
				var IsSaveId=false;
				var idLen;

				//idField= $("#" + currentSignInForm + " input[name=USER]");
				id=$("#" + currentSignInForm + " input[name=USER]").val();
				idLen=id.length;
				for (i=0;i<idLen;i++) {
						if (id.charAt(i)!='*') {
								IsSaveId=false;
								if(id.charAt(i)=='&') {
									id=id.replace('&',':');
								} else if(id.charAt(i)=='!') {
									id=id.replace('!',';');
								}
						} else if (id.charAt(i)=='*') {
								if (i==0) IsSaveId=true;
								id=id.replace('*','!');
						}
				}
				if (IsSaveId){			
				 $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val('TRUE');
				
				}
				
				$("#" + currentSignInForm + " input[name=USER]").val(id);

				//document.form_signon.submit();
				return true;
		}
}

/* End Sunlife ca phase 2 ****/
