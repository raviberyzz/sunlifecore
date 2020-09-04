var currentSignInForm;
var contingencyWidgetDisplayed = false;
var signinDataCallDone = false;
var providerURL;
var clientIntialForgotaccess = $("#forgot_access").attr("href");
var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en';
var sunnetUrl;

//checks hostname to set sunnet url
if (hostname == 'www.sunlifeglobalinvestments.com') {
	sunnetUrl = "https://www.sunnet.sunlife.com";
} else if (hostname == 'cmsstage-sunlifeglobalinvestments.ca.sunlife') {
	sunnetUrl = "https://stage.sunnet.sunlife.com";
} else if (hostname == 'stage-www.sunlifeglobalinvestments.com') {
	sunnetUrl = "https://stage.sunnet.sunlife.com";
} else {
	sunnetUrl = "https://sit-www.sunnet.sunlife.com";
}

// By default assign Advisor URL

if (lang == 'fr') {
	providerURL = sunnetUrl + "/signin/slgiadv/f/signinInfo.wca";
}
else {
	providerURL = sunnetUrl + "/signin/slgiadv/e/signinInfo.wca";
}

function handleUserSelection(selectedVal) {
	var url, targetPath, errorPath, forgotPassword, forgotAccess, saveidentity, esaveid, clientip;
	//Forget Access 
	if (selectedVal == 'ADVISOR') {
		saveidentity = "SLGIADV";
		esaveid = "";
		clientip = "";
		url = (lang == "fr")
			? "/Slgi/signin/slgiadv/forgotAccessId?vgnLocale=fr_CA"
			: "/Slgi/signin/slgiadv/forgotAccessId?vgnLocale=en_CA";

		// Change Hidden input val
		forgotAccess = "#";
		$("#forgot_access").attr("href", url);
	}
	else if (selectedVal == 'SLGIINV') {
		saveidentity = "SLGIINV";
		esaveid = "";
		clientip = "";



		$("#forgot_access").attr("href", clientIntialForgotaccess);
	}
	//Forget Password
	if (selectedVal == 'ADVISOR') {
		var str = $("#forgot_password").attr("href");
		var newStr = str.replace("/slgipubinv/", "/slgipubadv/");
		$("#forgot_password").attr("href", newStr);
	}
	else if (selectedVal == 'SLGIINV') {
		var str = $("#forgot_password").attr("href");
		var newStr1 = str.replace("/slgipubadv/", "/slgipubinv/");
		$("#forgot_password").attr("href", newStr1);
	};

	// Hidden Input Element Error Path
	if (selectedVal == 'ADVISOR') {
		url = (lang == "fr")
			? "/slgiadv/f/signinInfo.wca"
			: "/slgiadv/e/signinInfo.wca";
		errorPath = (lang == "fr")
			? "/signin/slgiadv/f/home.wca"
			: "/signin/slgiadv/e/home.wca";

		providerURL = (lang == 'fr')
			? sunnetUrl + "/signin/slgiadv/f/signinInfo.wca"
			: sunnetUrl + "/signin/slgiadv/e/signinInfo.wca";

		// Change Hidden input val
		targetPath = "/slgiadv/advisorSignInAction.wca";


		//$("#form_signon").attr("action", url);
	}
	else if (selectedVal == 'SLGIINV') {
		url = (lang == "fr")
			? sunnetUrl + "/masunlife/slgiinv/f/signinInfo.wca"
			: sunnetUrl + "/mysunlife/slgiinv/e/signinInfo.wca";

		providerURL = (lang == 'fr')
			? sunnetUrl + "/masunlife/slgiinv/f/signinInfo.wca"
			: sunnetUrl + "/mysunlife/slgiinv/e/signinInfo.wca";

		errorPath = (lang == "fr")
			? "/signin/slgiinv/f/home.wca"
			: "/signin/slgiinv/e/home.wca"
		targetPath = "/slgiinv/investorSignInAction.wca";


		//$("#form_signon").attr("action", url);
	}
	$('input[id=target-path]').val(targetPath);
	$('input[id=error-path]').val(errorPath);
	$('input[id=save-identity]').val(saveidentity);
	$('input[name=ESAVEID]').val(esaveid);
	$('input[id=ClientIP]').val(clientip);
	$("#" + currentSignInForm + " #rememberIDModal").prop(
		"checked",
		false
	);
	$("#" + currentSignInForm + " #accessIDModal").val(
		""
	);

}

$(document).ready(function () {

	
	$(document).on("click", "#forgot_access, #forgot_password", function (event) {
		var isValid = true;
		$('input[data-link-required]').each(function () {
			if ($(this).parsley().validate() !== true) { event.preventDefault(); isValid = false; }
			else {
				var isValid = true;
			}
		});
	});

	$(document).on("click", "input[type=submit]", function (event) {
		var rememberMeControl = $('#rememberIDModal')[0];

		if (rememberMeControl.checked) {
			localStorage.removeItem('userRole');
			//localStorage.setItem('remberMeFlag', '0');
			var selectedUserType = $("input[type=radio][name=DOMAIN]:checked").val();
			localStorage.setItem('userRole', selectedUserType);
			remember(rememberMeControl);
		}
	});

	$("#signin-widget-modal").on("show.bs.modal", function (event) {
		// Read Local Storage and set radio option
		$("#signinclose").focus();
		var selectedUserType = localStorage.getItem("userRole");
		$("input[name=DOMAIN][value='" + selectedUserType + "']").prop("checked", true);
		handleUserSelection(selectedUserType);
	});

	$(document).on('change', 'input[type=radio][name=DOMAIN]', function () {
		handleUserSelection(this.value);
		updateSignInForm('form_signon');
	});




	// deeplink handler for public pages
	/* $('.deeplink').click(function () {
																	console.log("before hiting ping url in mbrportal");
																	var deepLinkName = $(this).attr('deepLinkname');

																	$.ajax({
																																	url: 'https://dev-www.sunnet.sunlife.com/mbrportal/req/externalPingServices/ping', xhrFields: { withCredentials: true },


																																	success: function (data, status, xhr) {
																																																	console.log("return code " + xhr.status);
																																																	var response;
																																																	try {
																																																																	response = JSON.parse(data);
																																																																	if (xhr.status == "200" && response.status == "OK") {
																																																																																	window.location.href =
																																																																																																	"https://www.sunnet.sunlife.com/redirectBreak.html?RedirectBreak=1&LINK=PPHP_GBC&FC=" +
																																																																																																	deepLinkName;
																																																																	}
																																																	} catch (e) {
																																																																	$("#signin-widget-modal").on("shown.bs.modal", function () {
																																																																																	updateSignInFormFromDeeplink(
																																																																																																	"form_signon",
																																																																																																	deepLinkName
																																																																																	);
																																																																	});
																																																																	$("#signin-widget-modal").modal("show");
																																																	}
																																	},
																																	error: function (XMLHttpRequest, textStatus, errorThrown) {
																																																	console.log("Status: " + textStatus + " Error: " + errorThrown);
																																																	$("#signin-widget-modal").on("shown.bs.modal", function () {
																																																																	updateSignInFormFromDeeplink("form_signon", deepLinkName);
																																																	});
																																																	$("#signin-widget-modal").modal("show");
																																	}
																	});
																	return false;
	}); */

});

/* var section = ''; //setup on page load
var url = ''; //setup on page load
var assetTitle = ''; //setup on page load
var pageSection = ''; //setup on page load */

/* function handleTrackingSetup(data) {

    section = data.id;

    url = data.url;

    //add vgn locale parameter
    if (typeof url != "undefined" && $('html').attr('lang') == 'en') {
        url = updateQueryStringParameter(url, 'vgnLocale', 'en');
    } else if (typeof url != "undefined") {
        url = updateQueryStringParameter(url, 'vgnLocale', 'fr');
    }

    assetTitle = '';
    page_section = '';
    if (section == 'loginFrameTop') {
        assetTitle = 'Sign In - Modal';
        pageSection = 'Modal';
    } else if (section == 'loginFrameBottom') {
        assetTitle = 'Sign In - Pinbar';
        pageSection = 'Pinbar';
    } else { // home
        assetTitle = 'Sign In - Main';
        pageSection = 'Homepage main signin';
    }

    // if EC exists in query param
    if (getQueryParamExists('EC')) {
        var ec = getQueryParamExists('EC');
        var obj = {
            title: 'ERROR-' + ec,
            type: 'On Page Impression'
        };
        handleTrackingEvent(obj);
    }
}

// return value of query parameter, false if it doesn't exist.
function getQueryParamExists(paramName) {

    var urlParams = pmcParseParamsFromUrl();
    var queryParamName = paramName;
    var pValue = false;
    if (urlParams[queryParamName]) {
       pValue = unescape(urlParams[queryParamName]);
    }

    return pValue;

}

function pmcParseParamsFromUrl() {
    var params = {};
    var parts = window.location.search.substr(1).split('\x26');
    for (var i = 0; i < parts.length; i++) {
        var keyValuePair = parts[i].split('=');
        var key = unescape(keyValuePair[0]);
        params[key] = keyValuePair[1] ? unescape(keyValuePair[1].replace(/\+/g, '')) : keyValuePair[1];
    }
    return params;
}

function handleTrackingEvent(data) {
    var type = data.type;
    var eventTitle = data.title

    utag.link({
        "asset_type": "Module",
        "asset_title": assetTitle,
        "event_type": type,
        "canonical_url": url,
        "event_title": eventTitle,
        "page_section": pageSection
    });
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
} */
/* Added by zx32 and z291 for Sunlife ca phase 2 ****/


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
		strOS = "BB" + agentStr.split("/")[0];
		var vBV = agentStr.split("/")[1].split(".");
		bVersionMajor = vBV[0];
		bVersionMinor = vBV[1];
		browserVersion = vBV[0] + "." + vBV[1];
	} else if (browserName == "NOKIA") {
		iSearchPos = InStr(userAgent, "Nokia") + 5;
		var agentStr = userAgent.substring(iSearchPos);
		strOS = "NK" + agentStr.split("/")[0];
		var vBV = agentStr.split("/")[1].split(".");
		bVersionMajor = vBV[0];
		bVersionMinor = vBV[1];
		browserVersion = vBV[0] + "." + vBV[1];
	} else {
		browserVersion = navigator.appVersion;
		/* Determine Major and Minor version */
		if (iSearchPos >= 0) {
			iSearchPos = iSearchPos + browserName.length + 1; //search the value after the browser ID in the userAgent string
			browserVersion = userAgent.substring(iSearchPos, iSearchPos + 3);
			var vBV = browserVersion.split(".");
			bVersionMajor = vBV[0];
			bVersionMinor = vBV[1];
		}

		/* Determine Operating System */
		if (InStr(userAgent, "Windows NT 5.2") >= 0) {
			strOS = "Win2003";
		} else if (InStr(userAgent, "Windows NT 5.0") >= 0) {
			strOS = "Win2000";
		} else if (
			InStr(userAgent, "Windows XP") >= 0 ||
			InStr(userAgent, "Windows NT 5.1") >= 0
		) {
			strOS = "WinXP";
		} else if (
			InStr(userAgent, "Windows 98") >= 0 ||
			InStr(userAgent, "Win98") >= 0
		) {
			strOS = "Win98";
		} else if (InStr(userAgent, "Windows 95") >= 0) {
			strOS = "Win95";
		} else if (InStr(userAgent, "Windows NT") >= 0) {
			strOS = "WinNT";
		} else if (InStr(userAgent, "Windows 3.1") >= 0) {
			strOS = "Win3.1";
		} else if (InStr(userAgent, "Windows") >= 0) {
			strOS = "WinXP";
		} else if (
			InStr(userAgent, "Macintosh") >= 0 ||
			InStr(userAgent, "Mac OS X") >= 0
		) {
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
				strOS = userAgent.substring(
					iOSPos + 10,
					InStr(userAgent.substring(iOSPos + 10), "/")
				);
			} else {
				var iBBModel = InStr(userAgent, " BlackBerry ") + 12;
				strOS =
					"BB" +
					userAgent.substr(
						iBBModel,
						InStr(userAgent.substr(iBBModel), ";")
					);
			}
		} else {
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
	var screenRes = screen.width + " x " + screen.height;
	var colorDepth = screen.colorDepth;

	/* Determine Browser Size */
	var browRes;
	if (document.layers) {
		browRes = window.innerWidth + "x" + window.innerHeight;
	} else {
		browRes = document.body.clientWidth + ' x ' + document.body.clientHeight;
	}

	return (
		"&OS=" +
		encodeURIComponent(strOS) +
		"&browserId=" +
		encodeURIComponent(browserName) +
		"&browserVersionId=" +
		encodeURIComponent(browserVersion) +
		"&screenRes=" +
		screenRes
	);

	//return               "&browRes=" + browRes + "&OS=" + encodeURIComponent(strOS) + "&tzone=" + timeZone + "&date=" + dtime + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&browserVersMaj=" + encodeURIComponent(bVersionMajor) + "&browserVersMin=" + encodeURIComponent(bVersionMinor) + "&screenRes=" + screenRes + "&colorDepth=" + colorDepth;
}

/*** Start Browser check values ****/

function getBrowserValues(parameter) {
	var browserInfo = getBrowserInfo();
	var browserValues = browserInfo.split("&");

	for (var i = 0; i < browserValues.length; i++) {
		var browserParam = browserValues[i].split("=");
		if (browserParam[0] == parameter) {
			return browserParam[1];
		}
	}
}

// similar to "updateSidnInForm", but handles deeplinks
/* function updateSignInFormFromDeeplink(formName, deepLinkName) {

                setTimeout(function () {
                                if (!signinDataCallDone) {
                                                displayContingencyWidget();
                                }
                }, 5000);

                currentSignInForm = formName;

                try {
                                var rpc = new easyXDM.Rpc(
                                                {
                                                                remote: providerURL + "?deepLink=" + deepLinkName
                                                },
                                                {
                                                                local: {
                                                                                signinInfo: function (successFn, errorFn) { }
                                                                },

                                                                remote: {
                                                                                signinInfo: {}
                                                                }
                                                }
                                );
                } catch (err) {
                                //show some error widget
                                //  alert(err.message);
                                displayContingencyWidget();
                }

                rpc.signinInfo(success, error);

} */

function updateSignInForm(formName) {
	setTimeout(function () {
		if (!signinDataCallDone) {
			displayContingencyWidget();
		}
	}, 5000);


	currentSignInForm = formName;

	try {

		var rpc = new easyXDM.Rpc({

			remote: providerURL
		}, {
			local: {
				signinInfo: function (successFn, errorFn) { }
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

}


function success(data) {

	signinDataCallDone = true;
	if (currentSignInForm == "form_signon") {
		apology = "APOL_HTML";
		genralerror = "generalError";
	} else if (currentSignInForm == "form_signon_mobile") {
		apology = "APOL_HTML_mobile";
		genralerror = "generalError_mobile";
	} else {
		apology = "APOL_HTML_pinbar";
		genralerror = "generalError_pinbar";
	}

	if (!contingencyWidgetDisplayed) {
		if (data != null) {
			var decodedApologyOn = decodeURIComponent(data.apologyOn);
			if (decodedApologyOn == "true") {
				// if (data.apologyOn) {

				var decodedApologyMessage = decodeURIComponent(
					data.apologyMessage
				);
				decodedApologyMessage = decodedApologyMessage.replace(
					/\+/g,
					" "
				);
				$("#" + currentSignInForm + " #" + apology).html(
					decodedApologyMessage
				);
				$("#" + currentSignInForm + " #" + genralerror)
					.parent(".form-group")
					.addClass("has-error");
			} else {
				var decodedSMagentValue = decodeURIComponent(data.smagentname);
				var decodedClientIP = decodeURIComponent(data.clientIp);
				var decodedRealMOID = decodeURIComponent(data.realmoid);

				$("#" + currentSignInForm + " input[name=SMAGENTNAME]").val(
					decodedSMagentValue
				);
				$("#" + currentSignInForm + " input[name=REALMOID]").val(
					decodedRealMOID
				);
				$("#" + currentSignInForm + " input[name=ClientIP]").val(
					decodedClientIP
				);

				//if saveIdAvailable is true, populate user id with ******

				if (data.saveIdAvailable == "true") {
					//added to decode encrypted save id
					var decodedSaveIdValue = decodeURIComponent(
						data.encryptedSaveId
					);
					//save the encrypted value of user ID into the hidden field.
					$("#" + currentSignInForm + " input[name=ESAVEID]").val(
						decodedSaveIdValue
					);
					// put asteriks for visible user ID field.

					if (currentSignInForm == "form_signon") {
						$("#" + currentSignInForm + " #accessIDModal").val(
							"***********"
						);
					} else if (currentSignInForm == "form_signon_mobile") {
						$("#" + currentSignInForm + " #accessIDMobile").val(
							"***********"
						);
					}

					$(
						"#" +
						currentSignInForm +
						" input[name=LOGONUSINGSAVEID]"
					).val("TRUE");
					//ensure the 'remember me' check box is checked, since there is a saved ID available.

					if (currentSignInForm == "form_signon") {
						$("#" + currentSignInForm + " #rememberIDModal").prop(
							"checked",
							true
						);
					} else if (currentSignInForm == "form_signon_mobile") {
						$("#" + currentSignInForm + " #rememberIDMobile").prop(
							"checked",
							true
						);
					}
				}

				//browser details updation

				$("#" + currentSignInForm + " input[name=SCREENRES]").val(
					getBrowserValues("screenRes")
				);
				$("#" + currentSignInForm + " input[name=BROWSERID]").val(
					getBrowserValues("browserId")
				);
				$("#" + currentSignInForm + " input[name=BROWSERVER]").val(
					getBrowserValues("browserVersionId")
				);
				$("#" + currentSignInForm + " input[name=BROWSERDESC]").val(
					getBrowserValues("OS")
				);

				//enable  form fields which are disabled by default--this is for homepage
				$("#" + currentSignInForm + " input").prop("disabled", function (
					i,
					v
				) {
					return false;
				});
			}

			hideLoadingImage();
			$("#signinclose").focus();
			/* var selectedUserType = localStorage.getItem("userRole");
			$("input[name=DOMAIN][value='"+ selectedUserType +"']").prop("checked",true);

			handleUserSelection(selectedUserType); */

			/* alert("Testing"); */
		}
	}
}

function error(data) {
	displayContingencyWidget();
	//alert("error occurred: " + data);
}
//called when input field 'remember me' is checked.
function remember(me) {
	if (me.checked && $("#accessIDModal").val().charAt(0) != '*') {
		$("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val(
			"TRUE"
		);
	} else {
		$("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val(
			"FALSE"
		);
	}
}

function displayContingencyWidget() {
	signinDataCallDone = true;
	contigencyWidgetDisplayed = true;
	if (currentSignInForm == "form_signon") {
		$("#signin-widget").hide();
		$("#contigency-widget").show();
	} else if (currentSignInForm == "form_signon_mobile") {
		$("#signin-widget-mobile").hide();
		$("#contigency-widget-mobile").show();
	} else {
		$("#signin-widget-pinbar").hide();
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

var isSubmitted;
isSubmitted = false;

/* function CheckClicks(lang) {
                if (isSubmitted == true) {
                                if (lang == "f")
                                                alert(
                                                                "Veuillez patienter pendant que nous soumettons vos renseignements."
                                                );
                                else alert("Please wait while we submit your information");
                                return false;
                } else {
                                isSubmitted = true;
                                var idField;
                                var id;
                                var i;
                                var IsSaveId = false;
                                var idLen;

                                //idField= $("#" + currentSignInForm + " input[name=USER]");
                                id = $("#" + currentSignInForm + " input[name=USER]").val();
                                idLen = id.length;
                                for (i = 0; i < idLen; i++) {
                                                if (id.charAt(i) != "*") {
                                                                IsSaveId = false;
                                                                if (id.charAt(i) == "&") {
                                                                                id = id.replace("&", ":");
                                                                } else if (id.charAt(i) == "!") {
                                                                                id = id.replace("!", ";");
                                                                }
                                                } else if (id.charAt(i) == "*") {
                                                               if (i == 0) IsSaveId = true;
                                                                id = id.replace("*", "!");
                                                }
                                }
                                if (IsSaveId) {
                                                $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val(
                                                                "FALSE"
                                                );
                                }
                                $("#" + currentSignInForm + " input[name=USER]").val(id);
                                //document.form_signon.submit();
                                return true;
                }
} */



var userRoleGet = localStorage.getItem("userRole");
var remberMeFlagGet = localStorage.getItem("remberMeFlag");
if (userRoleGet == "ADVISOR" && remberMeFlagGet == "1") {
	$("#ADVISOR").attr('checked', 'checked');
}
else if (userRoleGet == "INVESTOR" && remberMeFlagGet == "1") {
	$("#SLGIINV").attr('checked', 'checked');
}


function signInModalEve() {
	utag.link({ "asset_type": "Module", "asset_title": "Sign In - Main", "event_type": "Click", "event_title": "Sign In", "page_section": "Homepage main signin" });
}




/* End Sunlife ca phase 2 ****/
