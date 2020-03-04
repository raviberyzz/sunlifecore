var currentSignInForm;
var contingencyWidgetDisplayed = false;
var signinDataCallDone = false;
var providerURL;

var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
if (lang == 'fr'){

providerURL="https://www.sunnet.sunlife.com/masunlife/ca/f/signinInfo.wca"; 

}
else{

providerURL="https://www.sunnet.sunlife.com/mysunlife/ca/e/signinInfo.wca"; 

}

$(document).ready(function () {
	// deeplink handler for public pages
	 $('.deeplink').click(function(){
	 console.log("before hiting ping url in mbrportal");
     	 var deepLinkName=$(this).attr('deepLinkname');

     	$.ajax({url:'https://www.sunnet.sunlife.com/mbrportal/req/externalPingServices/ping',xhrFields: {withCredentials: true},

		           
			success: function (data, status, xhr) { 
			console.log("return code "+xhr.status);
			var response;
			try{
		       response = JSON.parse(data);
			    if(xhr.status=="200"&&response.status=="OK")
	            {
	               window.location.href = "https://www.sunnet.sunlife.com/redirectBreak.html?RedirectBreak=1&LINK=PPHP_GBC&FC="+deepLinkName;
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
            iSearchPos = iSearchPos + browserName.length + 1; //search the value after the browser ID in the userAgent string
            browserVersion = userAgent.substring(iSearchPos, iSearchPos + 3);
            var vBV = browserVersion.split('.');
            bVersionMajor = vBV[0];
            bVersionMinor = vBV[1];
        }

        /* Determine Operating System */
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

    return "&OS=" + encodeURIComponent(strOS) + "&browserId=" + encodeURIComponent(browserName) + "&browserVersionId=" + encodeURIComponent(browserVersion) + "&screenRes=" + screenRes;

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
			decodedApologyMessage=decodedApologyMessage.replace(/\+/g,' ');
				$("#" + currentSignInForm + " #" +apology).html(decodedApologyMessage);
				$("#" + currentSignInForm + " #" +genralerror ).parent(".form-group").addClass("has-error");
				$("#" + currentSignInForm + " #" +genralerror ).css("display","block");
				//disable form fields  as we are on apology...
        $("#" + currentSignInForm + " input").prop('disabled', function(i, v) {
					return true;
				});
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
                    $("#" + currentSignInForm + " #accessIDModal").val("***********");
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

    } else {
        $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("TRUE");
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

function CheckClicks(lang) {
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
				 			
				 $("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("FALSE");
				
				}
				
				$("#" + currentSignInForm + " input[name=USER]").val(id);

				//document.form_signon.submit();
				return true;
		}
}

/* End Sunlife ca phase 2 ****/
// //v1.49 Dec 21: z034
// // merged with the latest mock up + added left nav fix at last
// /*  ===========================================
// ============== * responsive tabs * =============
// =========================================== */

// var fakewaffle = ( function ( $, fakewaffle ) {
// 	'use strict';

// 	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {

// 		fakewaffle.currentPosition = 'tabs';

// 		var tabGroups = $( '.nav-tabs.responsive' );
// 		var hidden    = '';
// 		var visible   = '';
// 		var activeTab = '';

// 		if ( collapseDisplayed === undefined ) {
// 			collapseDisplayed = [ 'xs', 'sm' ];
// 		}

// 		$.each( collapseDisplayed, function () {
// 			hidden  += ' hidden-' + this;
// 			visible += ' visible-' + this;
// 		} );

// 		$.each( tabGroups, function () {
// 			var $tabGroup   = $( this );
// 			var tabs        = $tabGroup.find( 'li a' );
// 			var collapseDiv = $( '<div></div>', {
// 				'class' : 'panel-group responsive' + visible,
// 				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
// 			} );

// 			if(!$tabGroup.hasClass("mobile-tab-group")) {

// 			$.each( tabs, function () {
// 				var $this          = $( this );
// 				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
// 				var newLinkClass   = 'accordion-toggle';
// 				if ((typeof  $(this).parent().attr('class') === 'undefined') || ($(this).parent().attr('class').indexOf('active')== -1)) { // added this for the arrows on the collapsable tabs on mobile
// 					newLinkClass = newLinkClass + ' collapsed';
// 				}
// 				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
// 				var newParentClass = 'panel panel-default';
// 				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

// 				if ( oldLinkClass.length > 0 ) {
// 					newLinkClass += ' ' + oldLinkClass;
// 				}

// 				if ( oldParentClass.length > 0 ) {
// 					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
// 					newParentClass += ' ' + oldParentClass;
// 					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
// 					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
// 				}

// 				if ( $this.parent().hasClass( 'active' ) ) {
// 					activeTab = '#' + newHash;
// 				}

// 				collapseDiv.append(
// 					$( '<div>' ).attr( 'class', newParentClass ).html(
// 						$( '<div>' ).attr( 'class', 'panel-heading' ).html(
// 							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
// 								$( '<a>', {
// 									'class'       : newLinkClass,
// 									'data-toggle' : 'collapse',
// 									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
// 									'href'        : '#' + newHash,
// 									'html'        : $this.html()
// 								} )
// 							)
// 						)
// 					).append(
// 						$( '<div>', {
// 							'id'    : newHash,
// 							'class' : 'panel-collapse collapse'
// 						} )
// 					)
// 				);
// 			} );

// 			$tabGroup.next().after( collapseDiv );
// 			$tabGroup.addClass( hidden );
// 			$( '.tab-content.responsive' ).addClass( hidden );
// 			}
// 		} );


// 		fakewaffle.checkResize();
// 		fakewaffle.bindTabToCollapse();

// 		if ( activeTab ) {
// 			$( activeTab ).collapse( 'show' );
// 		}
// 	};

// 	fakewaffle.checkResize = function () {

// 		if ( $( '.panel-group.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
// 			fakewaffle.tabToPanel();
// 			fakewaffle.currentPosition = 'panel';
// 		} else if ( $( '.panel-group.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
// 			fakewaffle.panelToTab();
// 			fakewaffle.currentPosition = 'tabs';
// 		}

// 	};

// 	fakewaffle.tabToPanel = function () {

// 		var tabGroups = $( '.nav-tabs.responsive' );

// 		$.each( tabGroups, function ( index, tabGroup ) {

// 			// Find the tab
// 			var tabContents = $( tabGroup ).next( '.tab-content' ).find( '.tab-pane' );

// 			$.each( tabContents, function ( index, tabContent ) {
// 				// Find the id to move the element to
// 				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );

// 				// Convert tab to panel and move to destination
// 				$( tabContent )
// 					.removeClass( 'tab-pane' )
// 					.addClass( 'panel-body' )
// 					.appendTo( $( destinationId ) );

// 			} );

// 		} );

// 	};

// 	fakewaffle.panelToTab = function () {

// 		var panelGroups = $( '.panel-group.responsive' );

// 		$.each( panelGroups, function ( index, panelGroup ) {

// 			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
// 			var destination   = $( destinationId ).next( '.tab-content' )[ 0 ];

// 			// Find the panel contents
// 			var panelContents = $( panelGroup ).find( '.panel-body' );

// 			// Convert to tab and move to destination
// 			panelContents
// 				.removeClass( 'panel-body' )
// 				.addClass( 'tab-pane' )
// 				.appendTo( $( destination ) );

// 		} );

// 	};

// 	fakewaffle.bindTabToCollapse = function () {

// 		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
// 		var collapse = $( '.panel-group.responsive' ).find( '.panel-collapse' );

// 		// Toggle the panels when the associated tab is toggled
// 		tabs.on( 'shown.bs.tab', function ( e ) {
// 			var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );
// 			$current.collapse( 'show' );

// 			if ( e.relatedTarget ) {
// 				var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
// 				$previous.collapse( 'hide' );
// 			}
// 		} );

// 		// Toggle the tab when the associated panel is toggled
// 		collapse.on( 'shown.bs.collapse', function ( e ) {

// 			// Activate current tabs
// 			var current = $( e.target ).context.id.replace( /collapse-/g, '#' );
// 			$( 'a[href="' + current + '"]' ).tab( 'show' );

// 			// Update the content with active
// 			var panelGroup = $( e.currentTarget ).closest( '.panel-group.responsive' );
// 			$( panelGroup ).find( '.panel-body' ).removeClass( 'active' );
// 			$( e.currentTarget ).find( '.panel-body' ).addClass( 'active' );

// 		} );
// 	};

// 	$( window ).resize( function () {
// 		fakewaffle.checkResize();
// 	} );

// 	return fakewaffle;
// }( window.jQuery, fakewaffle || { } ) );

// function setResponsiveTabs(){
// 	//commenting out as we have made chaanges
// 	//tabfix();
// 	$("[id^='slf-responsive'] a").click(function(e){
// 		e.preventDefault();
// 		$( this ).tab( 'show' );
// 	});

// 	(function($){
// 			fakewaffle.responsiveTabs( [ 'xs' ] );
// 	})( jQuery );
// }

// setResponsiveTabs();


// /* ===========================================
// ============== * sunlifeca.js * ====================
// =========================================== */
// /* Key Code Constants */
// var ENTER = 13;
// var TAB = 9;
// var DOWN = 40;
// var RIGHT = 39;
// var LEFT = 37;
// var UP = 38;
// var ESC = 27;
// var isResponsive = ($(".container").css("min-width") == "0px");

// function removeMenuHover(){
// 	$('.main-nav > .dropdown').unbind('mouseenter').unbind('mouseleave');
// }

// function setMenuHover(){
// 	var timer = null;
// 	var onhover_timer = null;
// 	var timer_element;
// 	$('.main-nav > .dropdown').hover(function() {
// 		if(!isTouchDevice()){
// 			if($('.nav-item.open').get(0) == $(this).get(0)){
// 				//$('.nav-item.open').removeClass('open');
// 				clearTimeout(timer);
// 				clearTimeout(onhover_timer);
// 				timer = null;
// 			}else{
// 				if(timer == null){
// 					$('.nav-item.open').removeClass('open');
// 					$(this).addClass('open');
// 				}else{
// 						$this = $(this);
// 						onhover_timer = setTimeout(function(){
// 							clearTimeout(timer);
// 							timer = null;
// 							$('.nav-item.open').removeClass('open');
// 							$this.addClass('open');
// 							onhover_timer = null
// 						}, 500);
// 				}
// 			}

// 			//set third level nav hover event
// 			var menucontent = $(this).find('.menu-content').first();
// 			menucontent.find('.dropdown-submenu').hover(function() {
// 				var submenu = $(this).find('ul');
// 				var menucontent = $(this).closest('.menu-content').first();
// 				var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height'))) ;
// 				submenu.css('height', max -6);
// 				menucontent.css('height', max);
// 				var url = document.location.href;
// 				if(url.indexOf('RESP+calculator')>-1){
// 					submenu.css('height', max);
// 					menucontent.css('height', max + 6);
// 				}
// 			},function(){
// 				$(this).find('ul').removeAttr('style');
// 				 $(this).closest('.menu-content').removeAttr('style');
// 			});
// 		}
// 	}, function() {
// 		if(!isTouchDevice() && timer == null && $('.nav-item.open').length > 0 ){
// 			$this = $(this);
// 			timer = setTimeout(function(){
// 				$this.removeClass('open');
// 				timer_element = $this;
// 				timer = null
// 			}, 500);
// 		}
// 		//clear css formatting
// 		var menucontent = $(this).find('.menu-content').first();
// 		menucontent.find('.dropdown-submenu ul').removeAttr('style');
// 	});

// 	$('.main-nav > .dropdown > a').focus(function(e){
// 		if(!isTouchDevice()){
// 			$('.nav-item').trigger('mouseleave');
// 			$(this).closest('.dropdown').trigger('mouseover');
// 		}
// 	});

// 	$('.main-nav > .dropdown > a').click(function(e){
// 		if(!isTouchDevice()){
// 			location.href = this.href;
// 		}
// 		else{
// 			$('.nav-item.open').removeClass('open');
// 			$(this).closest('.nav-item').addClass('open');
// 			var menucontent = $(this).closest('.nav-item').find('.menu-content').first();
// 			menucontent.find('.dropdown-submenu ul').css('height', menucontent.height());
// 			e.stopPropagation();
// 		}
// 	});

// 	$('.menu-content a[data-toggle=dropdown]').click(function(e){
// 		if(!isTouchDevice() && !isMobile()){
// 			location.href = this.href;
// 		}
// 		else{
// 			e.stopPropagation();
// 		}
// 	});

// }

// function isValidName(str) {
// 	var matches = str.match(/\d+/g);
// 	if (matches != null) {
// 			return false;
// 	}
// 	return true;
// }

// function isEmpty(str){
// 	return !$.trim(str);
// }

// function isMobile(size){
// 	var mobile_breakpoint = 1025;
// 	if (!isResponsive)
// 		mobile_breakpoint = 3;

// 	var viewportWidth = size || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// 	if(viewportWidth >= mobile_breakpoint){
// 		return false;
// 	}
// 	else{
// 		return true;
// 	}
// }

// function isXS(){
// 	var mobile_breakpoint = 767;
// 	var viewportWidth = window.innerWidth ;

// 	if(viewportWidth > mobile_breakpoint){
// 		return false;
// 	}
// 	else{
// 		return true;
// 	}
// }

// function isTouchDevice() {
//  return (('ontouchstart' in window)
//       || (navigator.MaxTouchPoints > 0)
//       || (navigator.msMaxTouchPoints > 0));
// }

// function setDesktopOnlyEvents(){
// 	setMenuHover();
// 	$('.navbar').removeClass('mobile');

// 	setNewsListingTab();
// }

// function setNewsListingTab(){
// 	if(isXS()){
// 		if(!$('.news-listing .slf-full-tabs > li.active +  .tab-content').length){
// 			$('.news-listing .tab-content ').insertAfter('.news-listing .slf-full-tabs > li.active');
// 		}
// 	}else{
// 		if(!$('.news-listing > ul +  .tab-content').length){
// 			$('.news-listing .tab-content ').insertAfter('.news-listing > ul');
// 		}
// 	}
// }

// function setMobileOnlyEvents(){
// 	removeMenuHover();
// 	$('.navbar').addClass('mobile');

// 	$('.slf-tab-container .panel .panel-collapse').each(function(){

//     // below code is to ensure first accordion is expanded if a anchored in the URL
//     var url = window.location.href;
// 	if(url.indexOf("#")!=-1){
//      	//selecting the content which needs to be collapsed
// 		var id = url.substring(url.lastIndexOf("#")+1, url.length);
// 		var accordianBody = $(id).attr('href') +".collapse";
//         var firstliid = $('.slf-full-tabs li a').eq(0).attr('id');

//         if(id!=firstliid)
//         {
//                      		  $(this).collapse("hide");
//         }
//         }else{

//         $(this).collapse("hide");
//        }

// 	});

// 	setNewsListingTab();


// 	//set mobile back button events
// 	$('.navbar.mobile .menu-content>div>ul > li.go-back, .language-tab-mobile .go-back').on('click', function(event){
// 		//$('.sidebar-offcanvas').css('top', '0');
// 		$('.main-nav').removeClass('moves-out');
// 		$(this).closest('.dropdown').closable = true;
// 		$(this).closest('.dropdown').removeClass('open');
// 	});
// 	$('.navbar.mobile .menu-content .dropdown-submenu .dropdown-menu .go-back').on('click', function(event){
// 		//$('.sidebar-offcanvas').css('top', '0');
// 		$(this).closest('ul').parent().removeClass('moves-out');
// 		$(this).closest('li').parent().removeClass('moves-out');
// 		$(this).closest('.nav-item').addClass('open');
// 		$(this).closest('.nav-item').removeClass('moves-out');
// 		$(this).closest('.menu-content').removeClass('disableScroll');
// 		event.stopPropagation();
// 	});

// 	//open sub-navigation(s)
// 	$('.navbar.mobile .main-nav > li > .subnav-trigger').on('click', function(event){
// 		if(isMobile()){
// 			event.preventDefault();
// 			$(".main-nav").scrollTop(0);
// 			$('.main-nav').addClass('moves-out');
// 			$(".main-nav .dropdown-menu").scrollTop(0);
// 		}
// 	});
// 	$('.navbar.mobile .subnav-trigger + div .subnav-trigger').on('click', function(event){
// 		if(isMobile()){
// 			event.preventDefault();
// 			$(this).closest('ul').addClass('moves-out');
// 			$(this).closest('li').addClass('moves-out');
// 			$(this).closest('.nav-item').addClass('moves-out');
// 			$(this).closest('.menu-content').addClass('disableScroll');
// 			$(".main-nav .dropdown-menu").scrollTop(0);
// 			event.stopPropagation();
// 		}
// 	});

// 	$('.mobile .dropdown').on({
//     "shown.bs.dropdown": function() { this.closable = true; },
//     "click":             function() { this.closable = false; },
//     "hide.bs.dropdown":  function() { return this.closable;  }
// 	});
// 	// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 	if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 	}
// }

// /*  ===========================================
// ============== * page load event * ===============
// =========================================== */
// jQuery(document).ready(function($){
// 	var viewportWidth = $(document).width();
// 	pageLevelNotify();
// 	 checkCookieExists();
// 	 checkBrowserCookieExists();
// 	 LanguageToggle();

// 	//add content-container class for mobile
// 	$('.row-offcanvas > .col-xs-12').addClass('content-container');
// 	if(!isMobile()){
// 		setDesktopOnlyEvents();
// 	}
// 	else{
// 		setMobileOnlyEvents();
// 	}

// 	//enable tooltips
// 	$('[data-toggle="tooltip"]').tooltip();

// 	//mega menu accessibility
// 	$('.mega-menu-col3 a, .mega-menu-col1 a, .mega-menu-col2 a').on('keydown', function(e) {
// 		if ( e.keyCode == DOWN ) {
// 			// Show sub menu
// 			$(this).parent().next().focus();
// 			$(this).parent().next().find('a').focus();

// 			if($(this).closest('.menu-content').find('a').last().is($(this))){
// 				//$(this).closest('.nav-item').next().find('>a').focus();
// 				//return false;
// 			} else if($(this).parent().parent().find('a').last().is($(this))){
// 				$(this).parent().parent().parent().next().find('a:first').focus();
// 				return false;
// 			}
// 			return false;
// 		}
// 		if ( e.keyCode == UP ) {
// 			// Show sub menu
// 			$(this).prev().find('a').focus();
// 			$(this).parent().prev().find('a').focus();

// 			if($(this).parent().parent().find('a').first().is($(this))){
// 				$(this).parent().parent().parent().prev().find('a:last').focus();
// 				return false;
// 			}
// 			return false;
// 		}
// 		if ( e.keyCode == ESC ) {
// 			// Show sub menu
// 			$(this).closest('.nav-item').find('>a').focus();
// 			$(this).closest('.menu-content').dropdown('toggle');
// 			//return false;
// 		}
// 	});

// 	//if Tab is pressed on the last link in the mega menu section, close the mega menu
// 	//if Shift + Tab was pressed keep the mega menu open and focus on the link above it
// 	$('.nav-item .dropdown-menu:last-child div:last-child li:last-child > a').on('keydown',function(e) {
//  		if (e.keyCode == TAB && !e.shiftKey) { // if Tab was pressed, but not Shift+Tab
// 			if ($(this).closest('.mega-menu-category').length == 0) { //if this isn't the first mega-menu-category under Explore products
// 				$(this).closest('.nav-item').removeClass('open');
// 			}
// 		}
// 	});

// 	// When interacting with a li that has a sub menu
// 	$('.nav-item .dropdown-submenu:has(".dropdown-menu") > a').on('keydown', function(e) {
// 		if ( e.keyCode == RIGHT ) {
// 			// Show sub menu
// 			//$(this).children('ul').addClass('show');

// 			//Reset values before adding new
// 			$(this).parents().find('.dropdown-submenu').removeClass('open');
// 			$(this).parents().find('ul.dropdown-menu').removeAttr('style');
// 			$(this).closest('.menu-content').removeAttr('style');

// 			var submenu = $(this).parent().find('.dropdown-menu');
// 			var menucontent = $(this).closest('.menu-content').first();
// 			var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height')));
// 				submenu.css('height', max -6);
// 				menucontent.css('height', max);
// 			$(this).closest('.dropdown-submenu').addClass('open');
// 			$(this).closest('.dropdown-submenu').find(".dropdown-menu li:not('.go-back')>a:first").focus();
// 			return false;
// 		}
// 	});

// 	// When using the key down/up or shift/tab to leave the mega menu, close the mega menu. 
// 	// Key down events don't work when speech readers are on, so using the opposite approach - 
// 	// when the search or signin buttons are focused, close the mega menu.
// 	$( "#signinbutton, #search-btn" ).focus(function() {
// 			$('.nav-item').removeClass('open');
// 	});

// 	// If key is pressed while on the last link in a sub menu
// 	$('.dropdown-submenu:has(".dropdown-menu") li:last-child > a').on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if (e.keyCode == DOWN ) {
// 			// Close this sub menu
// 			$(this).closest('.dropdown-submenu').removeClass('open');
// 			$(this).closest('.dropdown-menu').parent('li').find('a').focus();
// 			return false;
// 		}
// 	});

// 	$('.nav-item > a').on('keydown', function(e) {
// 		if(e.keyCode == TAB){
// 			$(this).closest('.nav-item').removeClass('open');
// 			$(this).focusout();
// 		}
// 	});


// 	//language region / page notification / search  --  show/hide events (desktop/mobile)
// 	$('.topCollapse').on('show.bs.collapse', function () {
// 		$('.topCollapse > .in').collapse('hide');
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) + 104 +"px");
// 	});
// 	$('.topCollapse').on('hide.bs.collapse', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - 104 +"px");
// 	});
// 	$('.topCollapse .language-region-pad').on('show.bs.collapse', function (e) {
// 		e.stopPropagation();
// 	});
// 	$('#page-notify .alert').on('close.bs.alert', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#page-notify').height() +"px");
// 	});
// 	$('#browser-alert .alert').on('close.bs.alert', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#browser-alert').height() +"px");
// 	});
// 	$(".language-region-pad ul").on('hidden.bs.collapse shown.bs.collapse', function () {
// 		$(this).find("li[aria-expanded='false'] > div a").css("font-weight","normal");
// 		//$(".language-region-pad ul li[aria-expanded='false'] .fa").removeClass("fa-caret-down").addClass("fa-caret-right");
// 		$(this).find("li[aria-expanded='true'] > div a").css("font-weight","bold");
// 		//$(".language-region-pad ul li[aria-expanded='true'] .fa").removeClass("fa-caret-right").addClass("fa-caret-down");
// 	});

// 	//switch views between mobile and desktop
// /*	$("#desktopview-ok-btn").click(function () {
// 		//console.log('desktop view clicked');
// 		$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 	});*/
// 	$("#mobileview-ok-btn").click(function () {
// 		//console.log('mobile view clicked');
// 		$("#viewport").attr('content', 'width=320, initial-scale=1.0');
// 	});

// 	$('.footer [data-toggle="collapse"]').click(function(e){
// 		if (!isXS()) {
// 			e.stopPropagation();
// 		}
// 	});

// 	//Header language accessibility
// 	$('#sun-language').on('shown.bs.collapse', function (e) {
// 		//$(".language-region .language-region-pad:first a:first").focus();
// 		$(this).find(".fa-remove").focus();
// 		if(e.target.id == "sun-language")
// 			$('#language-btn').addClass("language-btn");
// 	});
// 	$('#sun-language').on('hidden.bs.collapse', function () {
// 		$('#language-btn').removeClass("language-btn");
// 	});
// 	$(".language-region a:last").on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if ((e.keyCode == 9)) {
// 			// Close this sub menu
// 			$(this).closest('#sun-language').collapse('toggle');
// 			$("#language-btn").focus();
// 			return false;
// 		}
// 	});

// 	// sun search
// 	$('#sun-search').on('shown.bs.collapse', function () {
// 		//$("#globalSearch").focus();
// 		$(this).find(".fa-remove").focus();
// 		return false;
// 	});

// 	$(".global-search .btn").on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if ((e.keyCode == TAB)) {
// 			// Close this sub menu
// 			$("#sun-search").collapse('toggle');
// 			$(".search-icon-container div").focus();
// 			return false;
// 		}
// 	});

// 	$('#customerSignInDesk').on('shown.bs.collapse', function () {


// 		$("#customerSignInDesk").on('keydown', function(e) {
// 			if(e.keyCode == ESC) {
// 				// Close this sub menu
// 				$("#customerSignInDesk").collapse("toggle");
// 				$('.customer-sign-label').focus();
// 				return false;
// 			}
// 		});

// 		$('#footer-pin-bar .icon-remove').focus();
// 		return false;
// 	});

// 	/* language-toggle: open nav-selected item by default */
// 	if ($(".language-region-pad").find(".nav-selected").parent().parent().attr("data-toggle")=="collapse"){
// 		$(".language-region-pad").find(".nav-selected").parent("ul").parent().click();
// 		$(".language-region-pad").find(".nav-selected").parent("ul").parent().css('font-weight','700');
// 	}

// 	$("#sun-language").find(".collapse").on('shown.bs.collapse', function (e) {
// 		e.stopPropagation();
// 	});

// 	$('.lifestage .fa-remove').click(function(){
// 		$('li').removeClass("active");
// 		$('div').removeClass("active in");

// 		// move focus back to tab, after close
// 		//var temp = $(this);
// 		var labelledby = $(this).parents('.tab-pane').attr('aria-labelledby');
// 		$('#' + labelledby).focus();

// 		// reset the tabindexes
// 		$('a[data-toggle="tab"]').attr('tabindex','-1');
// 		$('#' + labelledby).attr('tabindex','0');
// 	});

// 	// used for "tabs" that refresh the page, when a tab is selected
// 	$('a[data-toggle="reload"]').on('keydown', function (e) {
// 		if(e.keyCode == ENTER){
// 			var temp_tab = $(this);
// 			$(temp_tab.attr("href")).focus();
// 		}
// 		if(e.keyCode == RIGHT){
// 			var temp_tab = $(this);
// 			var nextTab;

// 			if (temp_tab.parent().is(':last-child')) {
// 				nextTab = temp_tab.parent().parent().children().first().children();
// 			} else {
// 				nextTab = $(this).parent().next().children();
// 			}
// 			nextTab.focus();
// 		}
// 		if(e.keyCode == LEFT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			if (temp_tab.parent().is(':first-child')) {
// 				nextTab = temp_tab.parent().parent().children().last().children();
// 			} else {
// 				nextTab = $(this).parent().prev().children();
// 			}
// 			nextTab.focus();
// 		}

// 	});

// 		$(".panel-title").on("click", function(){
// 			var group = $(this).closest(".panel-group");
// 			var targetCollapse = $(this).closest(".panel").find(".panel-collapse");
// 			var collapseElements = group.find(".panel-collapse");
// 			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
// 			var curIndex = collapseElements.index(targetCollapse);
// 			var prevOpenHeight = 0;
// 			if(indexOpen <curIndex){
// 				prevOpenHeight = group.find(".panel-collapse.in").height();
// 			}
// 			var padding = parseInt($(this).closest(".panel-heading").css("paddingTop"));
// 			if($(this).closest(".panel").find(".panel-collapse.in").length === 0){
// 				var offset = $(this).offset();console.log( padding );
// 				$("html, body").animate({
// 					scrollTop :offset.top - $(".mobile-navbar").height() - padding - prevOpenHeight
// 				}, 700);
// 			}
// 		});

// 		$("#accordion-parent .accordion-heading").on("click", function(){
// 			var group = $(this).closest(".panel").parent();
// 			var targetCollapse = $(this).closest(".panel").find(".collapse");
// 			var collapseElements = group.find(".collapse");
// 			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
// 			var curIndex = collapseElements.index(targetCollapse);
// 			var prevOpenHeight = 0;
// 			if(indexOpen <curIndex){
// 				var prevCollapse = group.find(".collapse.in").css("display", "table");
// 				prevOpenHeight = prevCollapse.outerHeight(true);
// 				prevCollapse.css("display", "");
// 			}

// 			if($(this).closest(".panel").find(".collapse.in").length === 0){
// 				var offset = $(this).offset();
// 				$("html, body").animate({
// 					scrollTop :offset.top - $(".mobile-navbar").height() - prevOpenHeight
// 				}, 700);
// 			}
// 		});

// 	// make tab content non-focusable
// 	$('div[role="tabpanel"]').focusout(function() {
// 		$(this).removeAttr('tabindex');
// 	});

// 	$('a[data-toggle="tab"]').on('keydown', function (e) {
// 		if(e.keyCode == ENTER){
// 			var temp_tab = $(this);
// 			temp_tab.tab('show');

// 			$('a[data-toggle="tab"]').attr('tabindex','-1');
// 			temp_tab.attr('tabindex','0');
// 			// why if?  can't remember
// 			$(temp_tab.attr("href")).attr('tabindex','0');
// 			if (temp_tab.is(":focus")) {

// 				$(temp_tab.attr("href")).focus();
// 			}
// 		}

// 		if(e.keyCode == RIGHT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			// if last tab in widget, then wrap to first tab
// 			if (temp_tab.parent().is(':last-child')) {
// 				nextTab = temp_tab.parent().parent().children().first().children();
// 			} else {
// 				nextTab = $(this).parent().next().children();
// 			}
// 			nextTab.focus();
// 			// if on home page, don't show the tab by default
// 			if (temp_tab.parents('.lifestage').length <= 0) {
// 				nextTab.tab('show');
// 			}

// 		}
// 		if(e.keyCode == LEFT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			// if first tab in widget, then wrap to last tab
// 			if (temp_tab.parent().is(':first-child')) {
// 				nextTab = temp_tab.parent().parent().children().last().children();
// 			} else {
// 				nextTab = $(this).parent().prev().children();
// 			}
// 			nextTab.focus();
// 			// if on home page, don't show the tab
// 			if (temp_tab.parents('.lifestage').length <= 0) {
// 				nextTab.tab('show');
// 			}

// 		}
// 	});

// 	$('a[data-toggle="tab"]').on('hidden.bs.tab', function () {
// 		var temp_tab = $(this);
// 		temp_tab.attr('tabindex', '-1');
// 		temp_tab.attr('aria-selected','false');
// 		// need to remove this from <a>, otherwise breaks in Safari on Mac
// 		temp_tab.removeAttr('aria-expanded');

// 		$(temp_tab.attr("href")).attr('aria-hidden','true');
// 		$(temp_tab.attr("href")).attr('aria-expanded','false');
// 		$(temp_tab.attr("href")).removeAttr('tabindex');

// 	});

// 	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
// 		var temp_tab = $(this);
// 		temp_tab.attr('tabindex', '0');
// 		temp_tab.attr('aria-selected','true');
// 		// need to remove this from <a>, otherwise breaks in Safari on Mac
// 		temp_tab.removeAttr('aria-expanded');

// 		$(temp_tab.attr("href")).attr('aria-hidden','false');
// 		$(temp_tab.attr("href")).attr('aria-expanded','true');

// 		// this sets the focus to the first link in the tab panel
// 		//$(temp_tab.attr("href")).find('a:first').focus();

// 		/*
// 		// this forces the focus back to the tab after the last link in the tab panel
// 		$(temp_tab.attr("href")).find('a:last').on('keydown', function(){
// 			$(temp_tab.attr("href")).find('.fa-remove').click();
// 			temp_tab.focus();
// 			return false;
// 		});
// 		*/
// 		$(temp_tab.attr("href")).find('.fa-remove').on('keydown', function(e){
// 				if(e.keyCode== ENTER){
// 					$(temp_tab.attr("href")).find('.fa-remove').click();
// 					temp_tab.focus();
// 					return false;
// 				}
// 			});
// 			// if home page, then set focus to the "x"
// 			if (temp_tab.parents('.lifestage').length > 0) {
// 				$(temp_tab.attr("href")).find('.fa-remove').focus();
// 			}
// 			//$(temp_tab.attr("href")).find('.fa-remove').focus();
// 			return false;
// 		});

// 		/* language/search/pinbar accessibility */
// 		$('#language-btn, #search-btn, #pinbar-signin').on('click keypress', function(e){
// 			$(this).data('clicked', true);
// 			if(e.keyCode == 13 || e.keyCode == 32){
// 				$(this).click();
// 			}
// 		});
// 		if(navigator.userAgent.indexOf("Mac OS X 10_11_") !== -1){//its on a el capitan mac, delay the script
// 			setTimeout(function(){
// 				//adjust column heights to be equal
// 				$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 		      if($(this).closest(".collapse").length >0){
// 		        if($(this).closest(".collapse").hasClass("in") === false ){
// 		          return false;
// 		        }
// 		      }
// 					var columns = $(this).closest(".row").find(".adjust-height");
// 					var maxHeight = Math.max.apply(null, columns.map(function() {
// 							$(this).css("height", "");
// 							return $(this).height();
// 					}).get());
// 					columns.height(maxHeight);
// 				});
// 			}, 100);
// 		}else{
// 			//adjust column heights to be equal
// 			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 	      if($(this).closest(".collapse").length >0){
// 	        if($(this).closest(".collapse").hasClass("in") === false ){
// 	          return false;
// 	        }
// 	      }
// 				var columns = $(this).closest(".row").find(".adjust-height");
// 				var maxHeight = Math.max.apply(null, columns.map(function() {
// 						$(this).css("height", "");
// 						return $(this).height();
// 				}).get());
// 				columns.height(maxHeight);
// 			});
// 		}


//     // //if there are adjust height stuff inside a panel(accordion)
//     // $(".adjust-height").closest(".collapse").on("shown.bs.collapse", function(){
//     //   $(this).find(".adjust-height").each(function(){
//     //     var columns = $(this).closest(".row").find(".adjust-height");
//     //     var maxHeight = Math.max.apply(null, columns.map(function() {
//     //         $(this).css("height", "");
//     //         return $(this).height();
//     //     }).get());
//     //     columns.height(maxHeight);
//     //   });
// 		// });

// 	//adjust column heights to be equal
// 	var maxHeight = Math.max.apply(null, $(".adjust-height").map(function() {
// 			return $(this).height();
// 	}).get());
// 	$(".adjust-height").height(maxHeight);

// 	//if the window has tabs or accordions
// 	//for tabs
// 	$(".slf-full-tabs > li > a").on("shown.bs.tab",function(){
// 		var adjustElements = $($(this).attr("href")).find(".adjust-height");
// 		var maxHeight = 0;
// 		adjustElements.css("height", "");
// 		adjustElements.each(function(){
// 			if($(this).height() > maxHeight){
// 				maxHeight = $(this).height();
// 			}
// 		});
// 		adjustElements.height(maxHeight);
// 		console.log("do you see this?" );
// 	});

// 	//for panels, going to assume the panel can be empty
// 	$(".panel-collapse.collapse, .slf-accordion-plus .collapse").on("shown.bs.collapse", function(){
// 		var adjustElements = $(this).find(".adjust-height");
// 		var maxHeight = 0;
// 		adjustElements.css("height", "");
// 		adjustElements.each(function(){
// 			if($(this).height() > maxHeight){
// 				maxHeight = $(this).height();
// 			}
// 		});
// 		adjustElements.height(maxHeight);
// 	});


// 	/* open accordion on page load */
// 	var url = window.location.href;
// 	if(url.indexOf("#")!=-1){
// 		//selecting the content which needs to be collapsed
// 		var id = url.substring(url.lastIndexOf("#"), url.length);
// 		var accordianBody = $(id).attr('href') +".collapse";
// 		if(id != "#"){
// 			$(accordianBody).collapse("toggle");
// 			//$('#collapse-readyforfuture').addClass('in');
// 			$('#slf-responsive-tab li:first-child a').tab('show');
// 		}
// 	}
// 	url = document.location.toString();
// 	if (url.match('#')) {
// 		var tab_id = url.substring(url.lastIndexOf("#"), url.length);
// 		if(tab_id != "#"){
// 			$('.nav-tabs ' + tab_id).tab('show') ;
// 		}
// 	}

// /* 	$(window).on('hashchange', function(e){
// 		var id = window.location.hash;
// 		if($(id).hasClass('accordion-heading')){
// 			if(id != "#"){
// 				var accordianBody = $(id).attr('href') +".collapse";
// 				$(accordianBody).collapse("show");
// 			}
// 		}
// 	});  */

// 	// Change hash for page-reload
// /* 	$('.nav-tabs a').on('shown.bs.tab', function (e) {
// 			window.location.hash = e.target.hash;
// 	}) */

// 	//show IE browser alert if it is IE
// 	var index = navigator.userAgent.indexOf("MSIE");

// 	if(index!= -1){

// 		var endIndex=navigator.userAgent.indexOf(";", index );
// 		var version = navigator.userAgent.substring(index+4,endIndex);

// 		if(Number(version)<11){

// 			$("#ie-alert").removeClass("hidden");
// 			$("#ie-alert").attr("aria-hidden" , "false");
// 			$("#alert-ie").attr("aria-hidden" , "false");
// 		}
// 	}


// });



// /* ===========================================
// ============== * window resize event * ============
// =========================================== */
// jQuery(document).ready(function($){
// 	var prevWidth = window.innerWidth;
// 	$(window).resize(function() {
// 		//check breakpoint change
// 		if(isMobile(prevWidth) != isMobile()){
// 			if(!isMobile()){
// 				setDesktopOnlyEvents();
// 			}	else {
// 				setMobileOnlyEvents();
// 			}
// 		}
// 		prevWidth = window.innerWidth;

// 			//adjust column heights to be equal
// 			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 				var columns = $(this).closest(".row").find(".adjust-height");
// 				var maxHeight = Math.max.apply(null, columns.map(function() {
// 						$(this).css("height", "");
// 						return $(this).height();
// 				}).get());
// 				columns.height(maxHeight);
// 			});

// 	});

// 	/*  ===========================================
// 	============= * window scroll event * ==============
// 	=========================================== */
// 	/**
// 	* DAGS2595: need to not add mobile header to signin area in some cases
// 	* Moved event handler into ready function
// 	* The mobile logo is part of the top nav collection and output via topNav.jsp
// 	*  if don't need to add logo, assuming the collection will not have the content - which was position LN 3 of the topNav collection
// 	*
// 	**/
// 	// Check if any child elements exist before initializing handler
// 	// the element checked comes from topNav.jsp
// 	if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 		$(window).on('scroll',function(){
// 			//mobile header add logo to customer sign in
// 			topbarheight = $('.mobile-logo').height();
// 			// we round here to reduce a little workload
// 			stop = Math.round($(window).scrollTop());

// 			if (stop > topbarheight) {
// 				if(!($('#sunlife-logo-image-nav-mobile').length)){
// 					$('.navbar-toggle').parent().removeClass('col-xs-4').addClass('col-xs-2');
// 					$('.navbar-toggle').parent().after('<div class=\'col-xs-2 logo-icon\' id=\'sunlife-logo-image-nav-mobile\'><div role=\'math\' tabindex=\'0\' aria-label=\'Sun Life Financial\'><a href=""><svg id=\'sunlife-logo-image-nav-mobile\' class=\'media-middle logo-icon\' width=\'34px\' height=\'34px\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'><image xlink:href=\'//cdn.sunlife.com/static/slfglobal/globalweb/responsive/images/en/logo-icon.svg\' x=\'0\' y=\'0\' height=\'34px\' width=\'34px\'></image> </svg></a></div></div>');
// 				}
// 			} else {
// 				$('#sunlife-logo-image-nav-mobile').remove();
// 				$('.navbar-toggle').parent().removeClass('col-xs-2').addClass('col-xs-4');
// 			}
// 		});
// 	}
// 	// for list-topic bars; create a dropdown for mobile, if a list-topic bar exists
// 	// only for CA site
// 	if (/\/ca\//.test(window.location.href)) {
// 		if ($('.list-topic-bar').length > 0) {
// 			// create the dropdown, if it doesn't exist
// 			if ($('#list-topic-form').length < 1) {
// 				createListTopicDropdown('list-topic');
// 			}
// 		}
// 	}
// });
// /*  ===========================================
// ============== * window load event * =============
// =========================================== */
// $(window).load(function() {

// 	$('body').click(function() {
// 		//if(!isMobile()){
// 			//$('.nav-item').removeClass('open');
// 		//}
// 		$("#customerSignInDesk, #sun-search").click(function(){
// 			$(this).data('clicked', true);
// 		});


// 		if($("#customerSignInDesk").hasClass("in")){
// 			if(!$("#customerSignInDesk").data('clicked'))
// 					$("#customerSignInDesk").collapse("toggle");
// 		}

// 		if($("#sun-search").hasClass("in")){
// 			if(!$("#sun-search").data('clicked'))
// 				$("#sun-search").collapse("toggle");
// 		}

// 		// set focus to search input, after it becomes visible
// 		$('#sun-search').on('shown.bs.collapse', function () {
// 			$("#q-top").focus();
// 		});
// 	});
// });

// var listTopicLabels = {
// 	"en": {"ariaLabel":"Select a topic", defaultLabel: "Select a topic" },
// 	"fr": {"ariaLabel":"selectionne", defaultLabel: "selectionne" }
// };

// /* 
//  - creates a form and select element, from a list element; requires a containing element that has a class that ends with "-bar"
//  - additional styling used to show/hide the relevant element
//  - structure and classes match those currently in use on the CA site (as of Nov 2019); changes to those may require changes here
// */
// function createListTopicDropdown(listTopic) {
// 	if ($('#' + listTopic + '-form').length < 1) {
// 		$('<form id="' + listTopic + '-form" action method="post">').appendTo('.' + listTopic + '-bar');
// 		$('<div class="cta-input-section">').appendTo('#' + listTopic + '-form');
// 		$('<label class="text-regular sr-only" id="label-' + listTopic + '">').appendTo('.cta-input-section');
// 		// set aria label text
// 		if ($('html').attr('lang') == 'fr') {
// 			$('#label-' + listTopic).text(listTopicLabels.fr.ariaLabel);
// 		} else {
// 			$('#label-' + listTopic).text(listTopicLabels.en.ariaLabel);
// 		}
// 		$('<select class="form-control cta-input ' + listTopic + '-dropdown" aria-labelledby="label-' + listTopic + '" />').appendTo('.cta-input-section');
// 		$('.' + listTopic + '-bar a').each(function() {
// 			var ahref = $(this);
// 			var option = $('<option />', {
// 				'value'	: ahref.attr('href'),
// 				'text'	: ahref.text()
// 			}).appendTo('.' + listTopic + '-bar select');
// 			if($(this).parent().attr('class') === 'selected') {
// 				option.attr('selected','selected');
// 			}
// 		});
// 		// change text value of first option
// 		// not needed at moment, so removed, for now.  DAGSS-6964
// 		/*
// 		if ($('html').attr('lang') == 'fr') {
// 			$('.' + listTopic + '-dropdown').children('option:first').text(listTopicLabels.fr.ariaLabel);
// 		} else {
// 			$('.' + listTopic + '-dropdown').children('option:first').text(listTopicLabels.en.ariaLabel);
// 		}
// 		*/
// 		$('<div class="cta-button-section">').appendTo('#' + listTopic + '-form');
// 		$('<button class="btn-blue cta-button" id="' +listTopic + '-btn" type="submit">').appendTo('.cta-button-section');
// 		$('<span class="fa fa-chevron-right">').appendTo('#' + listTopic + '-btn');
// 			$('#' + listTopic + '-btn').click(function() {
// 					$('#' + listTopic + '-form').attr('action', $('.' + listTopic + '-dropdown').val());
// 				});
// 	}
// }	

// // update the domains to match the environment
// $('#signin-widget-modal').on('show.bs.modal', function() {
// 	// get host from variable defined in signin.js
// 	// it is assumed to be defined, if not, then default to prod
// 	var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
// 	if (host === null || host === undefined) {
// 		host = "https://www.sunnet.sunlife.com";
// 	}

// 	// update all the domains
// 	var signinWidget = $('#signin-widget-modal').html();
// 	var newString = signinWidget.replace (/(https?:\/\/)(.*?)(\/+?)/g, host + '$3');
// 	$('#signin-widget-modal').html(newString);
	
// 	// re-initialize these functions
// 	signinbuttonclick();	
// 	// this not getting triggered on shown, so call it explicitly, here
// 	updateSignInForm('form_signon');
// })

function createCookie(name,value,days, isSession) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  if(isSession){
		document.cookie = name+"="+value+"; path=/;";
  } else {
		document.cookie = name+"="+value+expires+"; path=/;";
  }
}
// function readCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for(var i=0;i < ca.length;i++) {
//     var c = ca[i];
//     while (c.charAt(0)==' ') c = c.substring(1,c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//   }
//   return null;
// }
// function pageLevelNotify(){
// $('#page-notify button.close[data-dismiss="alert"]').click(function(){
// createCookie("pageNotification","true",1,false);
// });
// $('#browser-alert button.close[data-dismiss="alert"]').click(function(){
// 	createCookie("browserNotification","true",1,false);
// });
// }
// function checkCookieExists(){
// var cookieExists=readCookie("pageNotification");
// if(cookieExists){
// $("#page-notify").hide();
// }
// else {
// $("#page-notify").show();
// }
// }
// function checkBrowserCookieExists(){
// var cookieExists=readCookie("browserNotification");
// if(cookieExists){
// 	$("#browser-alert").hide();
// }
// else {
// 	$("#browser-alert").show();
// }
// }
function getURLSocialMedia(){
	var d = document;
	var l = d.location;
	var URLSocialMedia = l.href;
	var page_lang=$('html').attr('lang');
	var lang=page_lang+"-CA";
	URLSocialMedia = URLSocialMedia.replace('#', '');
	URLSocialMedia = URLSocialMedia.replace(/[\|]/g, '%7C');
	var prefixWT = 'WT.mc_id=';
	var suffixWT = ':Social:Networks:GenericSite:Sharetoolbar';
	var paraAppend = prefixWT + lang + suffixWT;
	if(URLSocialMedia.indexOf(suffixWT) < 0 && URLSocialMedia.indexOf(encodeURIComponent(suffixWT)) < 0){
		if(URLSocialMedia.indexOf('?') > -1){
			URLSocialMedia = URLSocialMedia + '&' + paraAppend;
		} else {
			URLSocialMedia = URLSocialMedia + '?' + paraAppend;
		}
	}
	return URLSocialMedia;
}
function shareFB() {
var d = document,
    f = 'https://www.facebook.com/share',
    l = d.location,
    e = encodeURIComponent,
    p = '.php?src=bm&v=4&i=1354276539&u=' + e(getURLSocialMedia()) + '&t=' + e(d.title);
try {
    if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host)) throw (0);
    share_internal_bookmarklet(p)
} catch (z) {
    a = function () {
        if (!window.open(f + 'r' + p, 'sharer', 'toolbar=0,status=0,resizable=1,width=626,height=436')) l.href = f + p
    };
    if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
    else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_facebook" });
		}
    }
  return true;
}
}
function shareTwitter() {
(function () {
    window.twttr = window.twttr || {};
    var D = 550,
        A = 450,
        C = screen.height,
        B = screen.width,
        H = Math.round((B / 2) - (D / 2)),
        G = 0,
        F = document,
	l = F.location,
        E;
    if (C > A) {
        G = Math.round((C / 2) - (A / 2))
    }
    //window.twttr.shareWin = window.open('http://twitter.com/share', '', 'left=' + H + ',top=' + G + ',width=' + D + ',height=' + A + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
    window.twttr.shareWin=window.open('https://twitter.com/intent/tweet?&text=' + encodeURIComponent(F.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),'','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
	if(l.href.indexOf("Tools+and+Resources")>-1){
		utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_twitter"    }); 
	}
    //  E = F.createElement('script');
      //E.src = 'http://platform.twitter.com/bookmarklets/share.js?v=1';
      //F.getElementsByTagName('head')[0].appendChild(E)
}());
}
function shareLinkedIn() {
(function () {
    var d = document,
        l = d.location,
        f = 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=' + encodeURIComponent(d.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),
        a = function () {
            if (!window.open(f, 'News', 'width=520,height=570,toolbar=0,location=0,status=0,scrollbars=yes')) {
               // l.href = f;
            }
        };
    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
    } else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",    ev_action: "clk",    ev_title: "share_linkedin" });
		}
    }
})()
return true;
}
function shareGooglePlus() {
	void(window.open('https://plus.google.com/share?ur\l='+encodeURIComponent(getURLSocialMedia()), 'Google','width=600,height=460,menubar=no,location=no,status=no'))
}
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
/*Start of language toggle functionality*/
	// function LanguageToggle() {
	// var langAnchor = document.getElementById("langToggle");
    // var langCodeField = document.getElementById("langToggle_lang");
    // if (langAnchor && langCodeField && langCodeField.value) {
    //     var newLocale = langCodeField.value;
    //     var newUrl = "";
    //     var currUrl = location.href;
//         var hashUrl;
//         if (currUrl.indexOf("#") != -1) {
//             hashUrl = currUrl.split('#');
//         }
//         if (currUrl.indexOf("?") != -1){
//             equalUrl = currUrl.split('?');
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = currUrl + '?vgnLocale=' + newLocale;
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health#sunlanguage
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = hashUrl[0] + '?vgnLocale=' + newLocale + '#' + hashUrl[1];
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//            if(equalUrl[0]=='https://stage-www.ca.sunlife/' ||equalUrl[0] == 'https://stage-www.sunlife.ca/') {
//             	newUrl = "https://stage-www.ca.sunlife/ca?" + 'vgnLocale=' + newLocale  ;
//            }
//            else if (equalUrl[0] == 'https://www.sunlife.ca/' ){
//               newUrl = "https://www.sunlife.ca/ca?" + 'vgnLocale=' + newLocale;
//            }
//            else{
//               newUrl = currUrl + '&vgnLocale=' + newLocale;
//            }
//            // newUrl = currUrl + '&vgnLocale=' + newLocale;
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc#
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = hashUrl[0] + '&vgnLocale=' + newLocale + '#' + hashUrl[1];
//         }
// 		var vgnLocaleVal = getQuerystring("vgnLocale");
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
//                 newUrl = currUrl.replace(vgnLocaleVal, newLocale);
//         }
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
// 		 newUrl = currUrl.replace(vgnLocaleVal, newLocale);
//         }
// 		if(currUrl == 'https://stage-www.sunlife.ca/' || currUrl == 'https://stage-www.sunlife.ca/ca?vgnLocale=en_CA'){
// 			newUrl = "https://stage-www.sunlife.ca/ca?vgnLocale=fr_CA";
// 		}

// 		if(currUrl == 'https://www.sunlife.ca/' || currUrl == 'https://www.sunlife.ca/ca?vgnLocale=en_CA'){
// 			newUrl = "https://www.sunlife.ca/ca?vgnLocale=fr_CA";
// 		}

// 		if(currUrl == 'https://uat-www.ca.sunlife/' || currUrl == 'https://uat-www.ca.sunlife/ca?vgnLocale=en_CA'){
// 			newUrl = "https://uat-www.ca.sunlife/ca?vgnLocale=fr_CA";
// 		}

// 		newUrl =removeParam("pageNo", newUrl);
//         $('li.langToggle a').prop('href', newUrl);
//     }
// }
// /*End of language toggle functionality*/
function getQuerystring(key) {
    var query = window.location.search.substring(1);
    var value = 'null';
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
        	value = pair[1];
            return pair[1];
        }
    }
    return value;
}
// /*Added for vew desktop */
// /** page load event **/
// jQuery(document).ready(function($){
// 	if(!isMobile()){
// 		$( ".mobile-site" ).css('visibility', 'hidden');
// 	}
// 	//Following block of code added for view desktop functionality
// 	$("#desktopview,#desktopviewmobile").click(function (e) {
// 		//reading cookie value for mobile-alert-checkbox
// 		var  checked = readCookie('mobile-alert-checkbox');
// //if user already ticked checkbox for not to see message again it won't show popup-message after desktop-view click
// 		if(checked === 'true') {
// 			$("#toDesktopPopup").modal('hide');
// 			$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 		}else{
// 			//For the first time in session ,after clicking on desktop view link pop-up message appears.Now user ticked checked during proceeding with 'okay' button.
// 			$("#desktopview-ok-btn").click(function () {
// 				//if user ticked checkbox new cookie named 'mobile-alert-checkbox' will be created.
// 				if($('#non-opt-remember').prop('checked')){
// 					createCookie("mobile-alert-checkbox",true,1, true);
// 				}
// 				// after clicking 'desktop-view' link another cookie will create named 'desktopview' and page will appear from top section.
// 				createCookie("desktopview","true",1,true);
// 				$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 			});
// 			$("#toDesktopPopup").modal('show');
// 		}
// 		$('body').scrollTop(0);
// 	});
// 	$("#mobileview").click(function () {

// 		createCookie("desktopview","true",-1);
// 		location.reload(true);	//refresh from server
// 		$('body').scrollTop(0);
// 	});
// 	//Code ends for view desktop functionality
// 	var status = readCookie('desktopview');
// 	// need to hide / unhide view desktop / mobile linkes based on cookie
// 	if(status === 'true') {
// 		 $( ".mobile-site" ).css('visibility', 'visible');
// 	}
// });
// /** Added for Top Navigation Avtive functionality**/
// jQuery(document).ready(function(){
//     var pathName= window.location.pathname ;
// 	//console.log(pathName);
// 	$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){
// 		var strLink =  $(this).attr('href');
// 		if(strLink.indexOf('?') > -1){
// 			//alert('pathName.indexof(?)='+pathName.indexOf('?'));
// 			strLink = strLink.substr(1,(strLink.indexOf('?')-1));
// 			//console.log(strLink);
// 			if(pathName.indexOf(strLink) > -1 ){
// 				//console.log('matched for pathName='+pathName);
// 				$(this).addClass("nav-active");
// 			}
// 		}
// 	});

// });
// /** END for Top Navigation Avtive functionality**/
// /****/
// /*yepnope1.5.x|WTFPL*/
// (function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);






// /*  ===========================================
// ============== * off canvas * ====================
// =========================================== */

// // editor adds extra <ul> which needs to be removed
// function moveHamburgerSearch() {
// 	var hamburgerSearch = $('li.hamburgerSearch');
// 	if (hamburgerSearch.length > 0) {
// 		var hamParent = hamburgerSearch.parent();
// 		hamParent.replaceWith(hamburgerSearch);
// 		//$('.navbar-nav').prepend(hamburgerSearch);
// 		//hamParent.remove();
// 	}
// }

// function moveBodyContentsIn(){
// 	var prev = ".mobile-navbar";
// 	if($("#logo").length){
// 		$("#logo").insertAfter(prev);
// 		prev = "#logo";
// 	}

// 	if($("#breadcrumbs").length){
// 		$("#breadcrumbs").insertAfter(prev);
// 		prev = "#breadcrumbs";
// 	}

// 	if($("#pageheading").length){
// 		$("#pageheading").insertAfter(prev);
// 		prev = "#pageheading";
// 	}

// 	if($("#page-content").length){
// 		$("#page-content").insertAfter(prev);
// 		prev ="#page-content";
// 	}

// 	if($("#footer").length){
// 		$("#footer").insertAfter(prev);
// 		prev ="#footer";
// 	}
// /*
// 	if($("#foot-note").length){
// 		$("#foot-note").insertAfter(prev);
// 		prev ="#foot-note";
// 	}
// */
// 	if(!$("#mobile-top-container").length){
// 		$(".navbar .mobile-navbar").prepend("<div class='col-xs-12' id='mobile-top-container'></div>");
// 		$(".navbar #mobile-top-container").prepend($("#search-top"));
// 		$(".navbar #mobile-top-container").prepend($("#page-notify"));
// 	}
// 		//set mobile logo magin-top
// 		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 		if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 		}
// }
// function moveBodyContentsOut(){
// 	//$("#logo").insertBefore("#footer-pin-bar");
// 	//$("#breadcrumbs").insertBefore("#footer-pin-bar");
// 	//$("#pageheading").insertBefore("#footer-pin-bar");

// 	$("#footer").insertAfter("div[role='banner']");
// 	$("#page-content").insertAfter("div[role='banner']");
// 	$("#pageheading").insertAfter("#global-header");
// 	$("#breadcrumbs").insertAfter("#global-header");
// 	$("#logo").insertAfter("#global-header");

// //	$("#foot-note").insertBefore("#footer-pin-bar");

// 	if($("#mobile-top-container").length){
// 		$("#search-top").insertAfter($("#language-top"));
// 		//$("#page-notify").insertBefore($("#yellow-stripe"));
// 		$("#page-notify").insertBefore($("#language-top"));
// 		$("#mobile-top-container").remove();
// 	}
// }
// /** On page load **/
// jQuery(document).ready(function () {

// 	if(!isMobile()){
// 		moveBodyContentsOut();
// 	}
// 	else{
// 		moveBodyContentsIn();
// 		updateTopOffset();
// 	}

// 	// call function to move hamburgerSearch element
// 	moveHamburgerSearch();

// 	function updateTopOffset(){
// 		//set mobile logo magin-top
// 		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 		if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 		}
// 	}
// 	function isBreakpointChanged(){
// 		return isMobile(prevWidth) != isMobile();
// 	}
// 	$('[data-toggle="offcanvas"]').click(function (event) {
// 		event.preventDefault();
// 		$('.main-nav').removeClass('moves-out');
// 		$('body').toggleClass('off-canvas-active');
//     $('.row-offcanvas').toggleClass('inactive active');
// 		//$('.row-offcanvas').toggleClass('inactive');

// 		if($('.row-offcanvas').hasClass('active')){
// 			//$('.mobile-logo').css('margin-top', '10px');

// 			if(!$(".offcanvas-overlay").length){
// 				$("<div class='offcanvas-overlay'>").css({
// 					position: "absolute",
// 					width: "100%",
// 					height: "100%",
// 					left: 0,
// 					top: 0,
// 					zIndex: 1000000,
// 					background: 'black',
// 					opacity: 0.5,
// 					display: "block"
// 				}).appendTo($(".content-container"));

// 				$(".offcanvas-overlay").click(function(){
// 					$('[data-toggle="offcanvas"]').click();
// 					$(this).remove();
// 					//reset nav
// 					$('.moves-out').removeClass('moves-out');
// 					$("body, html").css('overflow-y', "auto");
// 					//set mobile logo margin-top
// 					//$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 				});
// 			}
// 			$("body, html").css('overflow-y', "hidden");
// 			//$(".content-container").css('position', "fixed");
// 			$('.content-container').bind('touchmove', function(e){e.preventDefault()});
// 		}else{
// 			$('.content-container').unbind('touchmove');
// 			$(".content-container").css('position', "static");
// 		}
// 	});

// 	$("#close-hamburger").click(function(){
// 		$('[data-toggle="offcanvas"]').click();
// 		$(".offcanvas-overlay").remove();
// 		//reset nav
// 		$('.moves-out').removeClass('moves-out');
// 		$("body, html").css('overflow-y', "auto");
// 	});

// 	var prevWidth = window.innerWidth;
// 	/** On page resize **/
// 	$(window).resize(function() {
// 		if(!isMobile()){
// 			if(isBreakpointChanged()){
// 				moveBodyContentsOut();
// 			}
// 			$(".row-offcanvas").removeClass('active');

// 			if($(".offcanvas-overlay").length > 0){
// 				$(".offcanvas-overlay").click();
// 			}
// 		}
// 		else{
// 			if(isBreakpointChanged()){
// 				var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
// 				var ios=navigator.userAgent.match('CriOS');
// 				if(!(isAndroid || ios)){
// 					moveBodyContentsIn();
// 				}
// 			}
// 			updateTopOffset();
// 			if(!isMobile() && !isTouchDevice()){
// 				$('.mobile .nav-item').removeClass('open');
// 			}
// 		}
// 		prevWidth = window.innerWidth;
// 	});
// });
// /** Temp fix for leftnav - fr issue **/
// /*
// $(document).ready(function () {
// 	var ln =$('html').attr('lang');
//     if(ln =="fr") {
// 		if( $('.breadcrumb').length ){
// 			var breadcrumbText= $('.breadcrumb').find('li:nth-child(2)').text();
// 			if($('.left-nav-menu').length){
// 			   $('.left-nav-menu').find('.menu-header strong').html(breadcrumbText);
// 			}
// 		}
// 	}
// });
// function tabfix(){
// 	var tabs = $( '.slf-tab-container:not(.news-listing)' ).find( 'ul.slf-full-tabs > li > a' );
// 	$.each( tabs, function ( index, tab ) {
// 		 var contentID = $(this).attr('href').replace('#', '');
// 		 var contentID_new = contentID + "-content";
// 			$(this).closest('.slf-tab-container').find('.tab-content').find('#' + contentID).attr('id', contentID_new);
// 			$( this ).attr('href', "#"+contentID_new);
// 		 });
// }
// */

// /** ADOBE SEARCH updated global search js on 5th Jan 2018 RM fix**/
// /** SEARCH JS**/

// /* globals jQuery, document, window, __slf_search_config, utag */
// (function ($) {
//     var apiPrefix = __slf_search_config.api_url;

//     var stringsEn = {
//         filter_names: {
//             "": "All",
//             "all": "All",
//             "articles": "Articles",
//             "products": "Products",
//             "tools": "Tools",
//             "videos": "Videos",
//         }
//     }
//     var stringsFr = {
//         filter_names: {
//             "": "Tous",
//             "all": "Tous",
//             "articles": "Articles",
//             "products": "Produits",
//             "tools": "Outils",
//             "videos": "Vidéos",
//         }
//     }
//     /** added on sept 18  **/

//     var stringsZh = {
//             filter_names: {
//                 "": "全部",
//                 "all": "全部",
//                 "articles": "文章",
//                 "products": "產品",
//                 "tools": "工具",
//                 "videos": "影片",
//             }
//     }

//     var stringsZhSG = {
//                     filter_names: {
//                         "": "全部",
//                         "all": "全部",
//                         "articles": "'文章",
//                         "products": "产品",
//                         "tools": "工具",
//                         "videos": "视频",
//                     }
//     }
//     var stringsIn = {
//             filter_names: {
//                 "": "Semua",
//                 "all": "Semua",
//                 "articles": "Artikel",
//                 "products": "Produk",
//                 "tools": "Fitur",
//                 "videos": "Video",
//             }
//     }
//     var stringsVn = {
//         filter_names: {
//             "": "Tất cả",
//             "all": "Tất cả",
//             "articles": "Bài viết",
//             "products": "Sản phẩm",
//             "tools": "Công cụ",
//             "videos": "Video",
//         }
//     }
    
//         var urlParam = getParams();
//                 var strings="";
//                 var vgnLocaleSearch = urlParam.vgnLocale;

//            if(vgnLocaleSearch === "fr_CA" ){
//         	strings=stringsFr;

//             } else if(vgnLocaleSearch === "zh_TW"){
//         		strings=stringsZh;
//             } else if(vgnLocaleSearch === "zh_SG"){
//         		strings=stringsZhSG;
//             }else if(vgnLocaleSearch ==="in_ID"){
//         		strings=stringsIn;
//             }
//             else if(vgnLocaleSearch ==="vi_VN"){
// 	            		strings=stringsVn;
//             }
//         	else{
//         		vgnLocaleSearch ="en_CA";
//         		strings=stringsEn;
// 		}



//     /** end **/

//     //var strings = document.documentElement.lang.indexOf("fr") >= 0 ? stringsFr : stringsEn;

//     var resultTemplate = $($.parseHTML($("#search-result-item").text())).filter(".search-result-item");
//     var filterItemTemplate = $($.parseHTML($("#search-result-filter-item").text())).filter(".check-container");
//     var paginationFirst = $($.parseHTML($("#search-result-pagination-first").text())).filter("li");
//     var paginationItem = $($.parseHTML($("#search-result-pagination-item").text())).filter("li");

//     function apiCall(query) {
//         var deferred = jQuery.Deferred();
//         $.ajax({
//             url: apiPrefix,
//             data: query,
//             dataType: 'jsonp',
//             timeout: 5000,
//             success: function (data) {
//                 deferred.resolve(data);
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 deferred.reject(errorThrown)
//             }
//         });

//         return deferred.promise();
//     }

//     function getParams() {
//         var params = {};
//         if (!window.location.search) return params;
//         window.location.search.substring(1).split("&").map(function (paramStr) {
//             return paramStr.split("=");
//         }).forEach(function (paramArr) {
//             try {
//                 params[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1].replace(/\+/g, '%20'));
//             } catch (e) {
//                 // Do not add malformed param to returned object
//             }
//         });
//         return params;
//     }

//     function resetPage() {
//         $("#search-result-items").empty();
//         $("#search-result-filter-list").empty();
//         $("#search-result-pagination li.pagination-item").remove();
//         $("#search-result-none").hide();
//         $("#search-result-error").hide();
//         $("#search-result-results").hide();
//         $("#search-result-banner-top").hide();
//     }

//     function searchError(err) {
//         resetPage();
//         console.error("Error populating search!"); // eslint-disable-line
//         console.error(err); // eslint-disable-line
//         $("#search-result-error").show();
//     }

//     function getCurrentFilter(filters) {
//         var filtered = filters.filter(function (filter) { return filter.selected; })
//         if (!filtered.length) return "all";
//         return filtered[0].result_type;
//     }
//     function getCurrentPage(pagination) {
//         var filtered = pagination.pages.filter(function (page) { return page.selected === 'true'; })
//         if (!filtered.length) return 1;
//         return Number(filtered[0].page);
//     }

//     function buildSearchString(obj) {
//         return "?" + Object.keys(obj).map(function (key) {
//             if (obj[key] === null || typeof (obj[key]) === 'undefined') return;
//             return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]).replace(/%20/g, '+');
//         }).filter(function (v) { return !!v; }).join("&");
//     }

//     function trackingCall(action, filter, totalResults, searchTerm) {
//         if (!filter) filter = "all";
//         var ev_title;

//         if (action === 'input') ev_title = "onsite search_client input";
//         else if (action === 'input') ev_title = "onsite search_client input";
//         else if (action === 'typeahead') ev_title = "onsite search_typeahead_text";
//         else if (action === 'filter') ev_title = "onsite search_filter";
//         else return;

//         var filterName = stringsEn.filter_names[filter] || stringsEn.filter_names.all;
//         var options = {
//             ev_type: "other",
//             ev_action: "clk",
//             ev_title: ev_title,
//             ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName,
//             page_search_term: searchTerm
//         };
//         try {
//             utag.link(options);
//         } catch(e) {
//             console.log("Couldn't perform utag.link() call.") // eslint-disable-line
//             console.log(options); // eslint-disable-line
//         }
//     }

//     function populateResults(results, originalSearchTerm, action,vgnLocaleSearch) {
//         resetPage();
//         var resultItems = results.resultsets[0].results;
//         var searchTerm = results.general.query;
//         var totalResults = results.general.total;
//         var filters = results.result_types;

//         var currentResultType = null;
//         var currentPage = getCurrentPage(results.pagination[0]);
//         var totalPages = Number(results.general.page_total);

//         if (filters) {
//             currentResultType = getCurrentFilter(filters);
//         }

//         function setupPaginationItem(paginationItems, page) {
//             var el = (page === 1 ? paginationFirst : paginationItem).clone();
//             el.find(".txt").text(page)
//             el.toggleClass("active", page === currentPage)
//             el.find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: page,
// 	       	    vgnLocale: vgnLocaleSearch
//                 }));
//             return paginationItems.add(el);
//         }

//         if (originalSearchTerm !== searchTerm) {
//             $("#search-result-misspelling").show();
//             $("#search-result-misspelling-term").text(searchTerm);
//         } else {
//             $("#search-result-misspelling").hide();
//         }

//         if (!resultItems.length) {
//             $("#search-result-none").show();
//             $("#search-result-none-term").text(searchTerm);
// 			try{
// 				trackingCall(action, currentResultType, totalResults, searchTerm);
// 			}catch (e){
// 				console.log('tracking call failed - no search results');
// 			}
//         } else {
//             trackingCall(action, currentResultType, totalResults, searchTerm);
//             $("#search-result-results").show();
//             $("#search-result-num-results").text(totalResults);
//             $("#search-result-num-plural").toggle(totalResults !== "1");
//             $("#search-result-num-single").toggle(totalResults === "1");
//             var els = resultItems.map(function (result) {
//                 var el = resultTemplate.clone();
//                 el.find("a:not(.search-result-display-url)").attr("href", result.url)
//                     .find(".txt").text(result.title);
//                 if (result['file-type'] !== 'pdf') el.find("a > .fa").remove();
//                 else {
//                     el.find("a").attr("target", "_blank");
//                 }
//                 el.find("p").text(result.desc);
//                 el.find(".search-result-display-url").text(result['display-url'] || result.url)
//                     .attr({
//                         title: result.url,
//                         href: result.url
//                     });
//                 return el;
//             });

//             $("#search-result-items").append(els);

//             if (filters) {
//                 var filterEls = filters.map(function (filter) {
//                     if (!filter || !filter.count) return;

//                     var el = filterItemTemplate.clone();
//                     el.find(".txt").text(strings.filter_names[filter.result_type || "all"])
//                     el.find(".num").text(filter.count)
//                     var linkEl = el.find("a").toggleClass('active', filter.selected)
//                         .attr('href', buildSearchString({
//                             q: results.general.query,
//                             filter: filter.result_type,
//                             action: 'filter',
// 			vgnLocale: vgnLocaleSearch
//                         }))

//                     if (filter.selected) {
//                         linkEl.click(function (event) {
//                             event.preventDefault();
//                         })
//                     }

//                     return el;
//                 }).filter(function (v) { return v; }) ;
//                 $("#search-result-filter-list").append(filterEls);
//                 if (filterEls.length > 1) $("#search-result-filters").show();
// 	                      else $("#search-result-filters").hide();
// 	                  } else {
// 	                      $("#search-result-filters").css("display", "none");
//             }

//             $("#search-results-pagination-previous")
//                 .toggleClass("disabled", currentPage < 2)
//                 .find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: currentPage - 1,
// 		   vgnLocale: vgnLocaleSearch
//                 }));
//             $("#search-results-pagination-next")
//                 .toggleClass("disabled", currentPage >= totalPages)
//                 .find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: currentPage + 1,
// 		     vgnLocale: vgnLocaleSearch
//                 }));
//             var paginationItems = $();


//             paginationItems = setupPaginationItem(paginationItems, 1);

//             if (currentPage >= 5 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

//             var startPage = Math.max(currentPage - 2, 2);
//             var endPage = currentPage + 2;
//             if (currentPage < 3) {
//                 endPage = Math.min(5, totalPages - 1);
//             } else if (totalPages - currentPage < 3) {
//                 startPage = Math.max(totalPages - 4, 2)
//                 endPage = totalPages - 1;
//             }
//             for (var p = startPage; p <= endPage; p++) {
//                 paginationItems = setupPaginationItem(paginationItems, p);
//             }

//             if ((totalPages - currentPage) >= 4 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

//             paginationItems = setupPaginationItem(paginationItems, totalPages);

//             $(paginationItems).insertBefore($("#search-results-pagination-next"));
//             $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
//             $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPages);
//             $("#search-result-pagination").toggle(totalPages > 1);
//             $("#search-result-page-num").text(currentPage);
//             $("#search-result-page-total").text(results.general.page_total);
//         }

//         var topBanners = results.banners.filter(function (banner) { return banner.top; });
//         if (topBanners[0] && topBanners[0].top) {
//             $("#search-result-banner-top").html(topBanners[0].top).show();
//         }

//         var rightBanners = results.banners.filter(function (banner) { return banner.right; });
//         if (rightBanners[0] && rightBanners[0].right) {
//             $("#search-result-banner-right").html(rightBanners[0].right).show();
//         }
//     }

//     function init() {
//         var urlParams = getParams();
//         var searchString = (urlParams.q || urlParams.gq || "").trim();
//         var filter = urlParams.filter || "all";
//         var page = parseInt(urlParams.page);
//         var action = urlParams.action;
// 	var vgnLocaleSearch = urlParams.vgnLocale;
// 	if(document.documentElement.lang.indexOf("fr")>=0){
// 		vgnLocaleSearch = "fr_CA";

// 	} else if(document.documentElement.lang.indexOf("zh")>=0){
// 		if(vgnLocaleSearch == "zh_SG"){
// 			vgnLocaleSearch = "zh_SG";
// 		}else{
// 			vgnLocaleSearch = "zh_TW";
// 		}
// 	} else if(document.documentElement.lang.indexOf("in")>=0){
// 		vgnLocaleSearch = "in_ID";
//     } else if(document.documentElement.lang.indexOf("vi")>=0){
// 		vgnLocaleSearch = "vi_VN";
// 	}
// 	else{
// 		vgnLocaleSearch ="en_CA";
// 		}

//         if (isNaN(page)) page = 1;

//         $("form.slf-search input[name=q]").val(searchString);
//         if (!searchString) {
//             resetPage();
//             return;
//         }
//         apiCall({q: searchString, pt: filter, page: page}).then(function (results) {
//             try {
//                 populateResults(results, searchString, action,vgnLocaleSearch);

//             } catch(e) {
//                 searchError(e);
//             }
//         }, function (err) {
//             searchError(err);
//         });

//         $(".search-filter-btn").click(function () {
//             $("#search-result-filter-toggle").addClass("active");
//             $("#search-result-filter-toggle .btn-close").focus();
//         });
//         $("#search-result-filter-toggle .btn-close").click(function () {
//             $("#search-result-filter-toggle").removeClass("active");
//             $(".search-filter-btn").focus();
//         })

//         $("[data-refocus]").focus(function () {
//             var selector = $(this).attr("data-refocus");
//             var el = $(selector);
//             if (el.length > 0) {
//                 el.eq(0).focus();
//             }
//         })
//     }

//     init();
// }(jQuery));


// /* global.search.js*/

// /* globals jQuery, setTimeout, clearTimeout, __slf_search_config */
// (function ($) {

//     var idCnt = 0;
//     var autoCompletePrefix = __slf_search_config.autocomplete_url;
//     var saytPrefix = __slf_search_config.sayt_url;
//     var autocompleteOptions = {
//         max_results: 10,
//         beginning: 1
//     };

//     function throttle(cb, delay) {
//         var timer = null;
//         return function () {
//             var args = Array.prototype.slice.call(arguments);
//             var thisObj = this;
//             if (timer) clearTimeout(timer);
//             timer = setTimeout(function () {
//                 cb.apply(thisObj, args);
//                 timer = null;
//             }, delay);
//         }
//     }

//     function autocompleteCall(query) {
//         return $.get(autoCompletePrefix, $.extend({ query: query }, autocompleteOptions), null, 'jsonp');
//     }
//     function saytCall(query) {
//         return $.get(saytPrefix, { q: query, type: 'sayt' }, null, 'jsonp');
//     }

//     function setupAutocomplete(form, mobile) {
// 		if (mobile) {
// 			var inputEl = form.find("input[name=q]");
// 			var actionEl = form.find("input[name=action]");
// 			var autocompleteListEl = form.find(".search-autocomplete-list-mobile");
// 			var saytListEl = form.find(".search-sayt-list-mobile");
// 			var dropdownEl = form.find(".search-autocomplete-mobile");
// 			var lastVal = "";
// 			var suggestionIndex = -1;
// 			var suggestions = [];
// 			var idNum = idCnt++;
// 			var listId = "slf-autocomplete-list-mobile-" + idNum;
// 		}
// 		else {
// 		        var inputEl = form.find("input[name=q]");
// 		        var actionEl = form.find("input[name=action]");
// 		        var submitBtn = form.find("input[type=submit]");
// 		        var autocompleteListEl = form.find(".search-autocomplete-list");
// 		        var saytListEl = form.find(".search-sayt-list");
// 		        var dropdownEl = form.find(".search-autocomplete");
// 		        var lastVal = "";
// 		        var suggestionIndex = -1;
// 		        var suggestions = [];
// 		        var idNum = idCnt++;
// 		        var listId = "slf-autocomplete-list-" + idNum;
// 		}
//         var submitLock = false;

//         inputEl[0].autocomplete = 'off';

//         autocompleteListEl.attr("aria-hidden", "true");

//         function updateSelection() {
//             if (suggestionIndex < 0) {
//                 if (inputEl.val() !== lastVal) inputEl.val(lastVal);
//                 actionEl.val("input");
//             } else {
//                 inputEl.val(suggestions[suggestionIndex]);
//                 actionEl.val("typeahead");
//             }
//             autocompleteListEl.children().removeClass("active");
//             if (suggestionIndex >= 0) autocompleteListEl.children().eq(suggestionIndex).addClass("active");
//         }

//         function clickSuggestion(event) {
//             event.preventDefault();
//             var suggestion = $(this).data("slf-search-value");
//             updateEmpty();
//             actionEl.val("typeahead");
//             inputEl.val(suggestion);
//             form.submit();
//         }

//         function updateSuggestions(q, force) {
//             return function (results) {
//                 if (!force && inputEl.val() !== q) return;

//                 suggestions = results.filter(function (r) {
//                     return r !== lastVal;
//                 });
//                 if (!suggestions.length) {
//                     autocompleteListEl.hide();
//                 } else {
//                     autocompleteListEl.show();
//                 }
//                 suggestionIndex = -1;
//                 autocompleteListEl.empty().append(suggestions.map(function (suggestion, i) {
//                     return $("<li role='option'>")
//                         .attr("id", listId + "_" + i)
//                         .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
//                         .data("slf-search-value", suggestion)
//                         .click(clickSuggestion).get(0);
//                 }));
//                 updateSelection();
//             }
//         }

//         function updateSayt(q, force) {
//             return function (results) {
//                 if (!force && inputEl.val() !== q) return;

//                 var arr;
//                 try {
//                      arr = results.results;
//                 } catch(e) {
//                     arr = [];
//                 }

//                 if (!arr.length) saytListEl.hide();
//                 else saytListEl.show();
//                 saytListEl.empty().append(arr.map(function (resultItem) {
//                     return $("<li>").append($("<a class='sayt-link'>").append([
//                         $("<span class='title'>").text(resultItem.title)[0],
//                         $("<span class='desc'>").text(resultItem.desc)[0]
//                     ]).attr("href", resultItem.url));
//                 }))
//             }
//         }

//         function updateEmpty() {
//             updateSuggestions([], true)([]);
//             updateSayt(null, true)();
//         }

//         var getSuggestions = throttle(function () {
//             var v = inputEl.val();
//             if (v === lastVal) return;
//             lastVal = v;
//             if (v) {
//                 autocompleteCall(v).then(updateSuggestions(v));
//                 saytCall(v).then(updateSayt(v))
//             }
//             else updateEmpty();
//         }, 200);

//         inputEl.on('focus', function (event) {
//             var v = inputEl.val();
//             var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
//             if (v && !stillInDropdown) {
//                 lastVal = v;
//                 autocompleteCall(v).then(updateSuggestions(v));
//                 saytCall(v).then(updateSayt(v))
//             } else if (!stillInDropdown) {
//                 lastVal = v;
//             }
//         })
//         form.on('focusout', function (event) {
//             var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget) || event.relatedTarget === inputEl[0];
//             if (!submitLock && !stillInDropdown) setTimeout(function () {
//         updateEmpty();
//       }, 0);

//         });
//         inputEl.on('keydown', function (event) {
//             if (event.key === "ArrowDown" || event.key === "Down") {
//                 event.preventDefault();
//                 if (suggestionIndex + 1 === suggestions.length) suggestionIndex = suggestions.length - 1;
//                 else suggestionIndex += 1;
//                 updateSelection();
//             } else if (event.key === "ArrowUp" || event.key === "Up") {
//                 event.preventDefault();
//                 if (suggestionIndex < 0) suggestionIndex = -1;
//                 else suggestionIndex -= 1;
//                 updateSelection();
//             } else if (event.key === "Escape" || event.key === "Esc") {
//                 event.preventDefault();
//                 updateEmpty();
//             } else if (event.key === 'Enter') {
//                 submitLock = true;
//                 setTimeout(function () {
//                    submitLock = false;
//                 }, 0);
//             } else if (event.key !== 'Tab') {
//             	getSuggestions();
//              }
//         });
        
// 	if (submitBtn) {
// 	        submitBtn.on('mousedown', function () {
//         		submitLock = true;
// 			setTimeout(function () {
//         		        submitLock = false;
// 	        	}, 0);
//         	});
// 	}

//         autocompleteListEl.on('mousedown', function (event) {
//             event.preventDefault();
//         })
//         saytListEl.on('mousedown', function (event) {
//             event.preventDefault();
//         })

//         form.on('submit', function (event) {
//             if (!inputEl.val().trim()) {
//                 event.preventDefault();
//             }
//         });
//     }

//     function init() {
//         $("form.slf-search").each(function (i, form) {
//             form = $(form);
//             if (form.data("slf-search-initialized")) return;
//             form.data("slf-search-initialized", true);
//             setupAutocomplete(form);
//         });
// 	$("form.slf-search-mobile").each(function (i, form) {
//             form = $(form);
//             if (form.data("slf-search-initialized")) return;
//             form.data("slf-search-initialized", true);
//             setupAutocomplete(form, 'mobile');
//         });
// 				// for left nav underline, in IE - "test-decoration-color" does not work in IE.
// 				var activeLeftNav = $(".left-nav-menu .active");
// 				if (null != activeLeftNav) {
// 					var activeText = activeLeftNav.text();
// 					activeLeftNav.html("<span>" + activeText + "</span>");
// 				}
//     }

//     init();
//     $(init);
// }(jQuery));


// /** ADOBE GlobalSEARCH JS ENDS HERE **/
// $( document ).ready(function() {
// 	//bind the CTA box bottom-aligned buttons to the form submission buttons
// 	$('#locate-advisors-btn').click(function(){
// 		var form = $('#locate-advisors-form').parsley({
// 		});
// 		form.validate();
// 		$('#locate-advisors-form').submit();
// 	});
	
// 	$('#find-an-advisor-btn').click(function(){
// 		$('#find-an-advisor-form').submit();
// 	});
	

// //    $('#cta-provider-search-btn').click(function(){
// //		$('#cta-provider-search-form').submit();
// //	});


// 	//set the height of the description box to be equal across all CTA boxes
// 	function setEqualHeight() {
// 		var cta_desc_height = 0;

// 		$(".div-one:not(.not-aligned)").each(function() {
// 				$(this).css('height', 'auto'); //allow box to grow to a default height
// 				if ($(this).height() > cta_desc_height) {
// 						cta_desc_height = $(this).height();
// 				}
// 		});
// 		$(".div-one:not(.not-aligned)").each(function() {
// 				$(this).css("height", cta_desc_height);
// 		});
// 	}

// 	// only adjust the cta box height if they are not stacked, otherwise, no need
// 	if (($(window).width()) > 767) {
// 		setEqualHeight();
// 	}

// 	// if orientation changes, also check if the cta box needs to be adjusted
// 	$(window).on("orientationchange", function(e) {
// 		//a timeout is required because there completion of orientation change cannot be detected
// 		window.setTimeout(function() {
// 				setEqualHeight();
// 		}, 200);
// 	});

// 	//update the Get a quote's form action based on the dropdown selection
// 	$("#get-a-quote-submit, #get-a-quote-btn").click(function() {
// 		var action = $('#select-product').val();
// 		var target = $('#select-product option:selected').data('target');
// 		$("#get-a-quote-form").attr("action", action);
// 		$("#get-a-quote-form").attr("target", target);
// 	});

// 	//validate the CTA Get a quote select dropdown form and trigger the desktop submit button
// 	$("#get-a-quote-btn").click(function() {
// 		var form = $("#get-a-quote-form").parsley({
// 		});
// 		form.validate();
// 		$('#get-a-quote-form').submit();
// 	});

// 	//validate the CTA Newsletter subsribe form
// 	$("#newsletter-subsribe-submit, #newsletter-subsribe-btn").click(function() {
// 		var form = $("#subsribe-newsletter-form").parsley({
// 		});
// 		form.validate();
// 		$('#subsribe-newsletter-form').submit();
// 	});
	

//     //Initiate parley validation for Provide search CTA
//     $("#cta-provider-search-btn").on("click", function() {
// 		var form = $("#cta-provider-search-form").parsley({
// 		});
// 		form.validate();

//            if (form.isValid()) {
//                	$('#cta-provider-search-form').submit();
//            }
// 	});
    
// });


// // LnP newsletter subscribe Story
// //set cookie that expires after a browser session ends
// function setCookie(cname, cvalue, days) {
// 	var d = new Date();
// 	var expires = '';
// 	if (days > 0) {
// 		var time = d.getTime();
// 		var expireTime = time + 1000*60*60*24*days;  // ms * secs * mins * hrs * days
// 		d.setTime(expireTime);
// 		var expires = "expires="+ d.toUTCString();
// 	} else {
// 		var expires = 0; "expires="+ d.toUTCString();
// 	}
// 	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return "";
}

// if (window.location.href.indexOf("/ca/Tools+and+Resources/Money+and+Finances") > -1  //https://www.sunlife.ca/ca/Learn+and+Plan/Money
// 					|| window.location.href.indexOf("/ca/Tools+and+Resources/Health+and+Wellness") > -1) {
     
    $(document).ready(function(){
$(window).scroll(function() {
        //$("#subscribe").modal({show:true});
		if($(window).scrollTop() + $(window).height() >= $(document).height()/2) {
			if (getCookie('subscribecookie') == "") {
				//var url = new URL(window.location.href);
				//var wtmcid = url.searchParams.get("WT.mc_id");
				var wtmcid = getQuerystring("WT.mc_id");
				if ( (wtmcid != null) && (wtmcid.indexOf("Direct:Newsletter") > -1) ) {
					//setCookie('subscribecookie', 'displayed', 180);
					createCookie('subscribecookie', 'displayed', 180, false)
				} else {
					if($("#subscribe").length==1){
						$("#subscribe").modal({show:true});
						//setCookie('subscribecookie', 'displayed', 0);
						// check for IE11: session cookies disabled by default, so for IE, set expiry for 1 day
						if (navigator.userAgent.indexOf("MSIE") > 0) {
							createCookie('subscribecookie', 'displayed', 1, false)
						} else {
							createCookie('subscribecookie', 'displayed', -1, true)
						}
 					}
				}
			}
		}
	});

    });

// $(document).ready(function(){
// 	$("#news-overlay-subscribe").on("click", function() {
// 		var form = $(this).closest("form").parsley({
// 		});
// 		if (form.validate()) {
// 			createCookie('subscribecookie', 'displayed', 180, false)
// 		}
// 	});
// });
// //LnP Subscribe ends

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// } 
/* Tags formatting starts here */
$(document).ready(function(){
    $('body').find("b").replaceWith(function() {
    return $('<strong>', {
        html: this.innerHTML
        });
    });
    var iTag=$('body').find("i").filter(function(){return $(this)});
    iTag.each(function(){
        if($(this).attr("class")){
        }
        else{
            $(this).replaceWith(function() {
                return $('<em>', {
                    html: this.innerHTML
                    });
                });
        }
    });
});
/* Tags formatting ends here */
// /* globals jQuery, document, window, __slf_search_config, utag */
$(document).ready(function () {
    var __slf_search_config = {
        api_url: "https://sp10050fd8.guided.ss-omtrdc.net/",
        autocomplete_url: "https://content.atomz.com/autocomplete/sp10/05/0f/d8/",
        sayt_url: "https://sp10050fd8.guided.ss-omtrdc.net/"
    };
    (function ($) {
        var apiPrefix = __slf_search_config.api_url;
    
        var stringsEn = {
            filter_names: {
                "": "All",
                "all": "All",
                "articles": "Articles",
                "products": "Products",
                "tools": "Tools",
                "videos": "Videos",
            }
        }
        var stringsFr = {
            filter_names: {
                "": "Tous",
                "all": "Tous",
                "articles": "Articles",
                "products": "Produits",
                "tools": "Outils",
                "videos": "Vidéos",
            }
        }
        /** added on sept 18  **/
    
        var stringsZh = {
                filter_names: {
                    "": "全部",
                    "all": "全部",
                    "articles": "文章",
                    "products": "產品",
                    "tools": "工具",
                    "videos": "影片",
                }
        }
    
        var stringsZhSG = {
                        filter_names: {
                            "": "全部",
                            "all": "全部",
                            "articles": "'文章",
                            "products": "产品",
                            "tools": "工具",
                            "videos": "视频",
                        }
        }
        var stringsIn = {
                filter_names: {
                    "": "Semua",
                    "all": "Semua",
                    "articles": "Artikel",
                    "products": "Produk",
                    "tools": "Fitur",
                    "videos": "Video",
                }
        }
        var stringsVn = {
            filter_names: {
                "": "Tất cả",
                "all": "Tất cả",
                "articles": "Bài viết",
                "products": "Sản phẩm",
                "tools": "Công cụ",
                "videos": "Video",
            }
        }
        
            var urlParam = getParams();
                    var strings="";
                    var vgnLocaleSearch = urlParam.vgnLocale;
    
               if(vgnLocaleSearch === "fr_CA" ){
                strings=stringsFr;
    
                } else if(vgnLocaleSearch === "zh_TW"){
                    strings=stringsZh;
                } else if(vgnLocaleSearch === "zh_SG"){
                    strings=stringsZhSG;
                }else if(vgnLocaleSearch ==="in_ID"){
                    strings=stringsIn;
                }
                else if(vgnLocaleSearch ==="vi_VN"){
                            strings=stringsVn;
                }
                else{
                    vgnLocaleSearch ="en_CA";
                    strings=stringsEn;
            }
    
    
    
        /** end **/
    
        //var strings = document.documentElement.lang.indexOf("fr") >= 0 ? stringsFr : stringsEn;
    
        var resultTemplate = $($("#search-result-item").html()).filter(".search-result-item");
        var filterItemTemplate =$($("#search-result-filter-item").html()).filter(".check-container");
        var paginationFirst = $($("#search-result-pagination-first").html()).filter("li");
        var paginationItem = $($("#search-result-pagination-item").html()).filter("li");
    
        function apiCall(query) {
            var deferred = jQuery.Deferred();
            $.ajax({
                url: apiPrefix,
                data: query,
                dataType: 'jsonp',
                timeout: 5000,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    deferred.reject(errorThrown)
                }
            });
    
            return deferred.promise();
        }
    
        function getParams() {
            var params = {};
            if (!window.location.search) return params;
            window.location.search.substring(1).split("&").map(function (paramStr) {
                return paramStr.split("=");
            }).forEach(function (paramArr) {
                try {
                    params[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1].replace(/\+/g, '%20'));
                } catch (e) {
                    // Do not add malformed param to returned object
                }
            });
            return params;
        }
    
        function resetPage() {
            $("#search-result-items").empty();
            $("#search-result-filter-list").empty();
            $("#search-result-pagination li.pagination-item").remove();
            $("#search-result-none").hide();
            $("#search-result-error").hide();
            $("#search-result-results").hide();
            $("#search-result-banner-top").hide();
        }
    
        function searchError(err) {
            resetPage();
            console.error("Error populating search!"); // eslint-disable-line
            console.error(err); // eslint-disable-line
            $("#search-result-error").show();
        }
    
        function getCurrentFilter(filters) {
            var filtered = filters.filter(function (filter) { return filter.selected; })
            if (!filtered.length) return "all";
            return filtered[0].result_type;
        }
        function getCurrentPage(pagination) {
            var filtered = pagination.pages.filter(function (page) { return page.selected === 'true'; })
            if (!filtered.length) return 1;
            return Number(filtered[0].page);
        }
    
        function buildSearchString(obj) {
            return "?" + Object.keys(obj).map(function (key) {
                if (obj[key] === null || typeof (obj[key]) === 'undefined') return;
                return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]).replace(/%20/g, '+');
            }).filter(function (v) { return !!v; }).join("&");
        }
    
        function trackingCall(action, filter, totalResults, searchTerm) {
            if (!filter) filter = "all";
            var ev_title;
    
            if (action === 'input') ev_title = "onsite search_client input";
            else if (action === 'input') ev_title = "onsite search_client input";
            else if (action === 'typeahead') ev_title = "onsite search_typeahead_text";
            else if (action === 'filter') ev_title = "onsite search_filter";
            else return;
    
            var filterName = stringsEn.filter_names[filter] || stringsEn.filter_names.all;
            var options = {
                ev_type: "other",
                ev_action: "clk",
                ev_title: ev_title,
                ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName,
                page_search_term: searchTerm
            };
            try {
                utag.link(options);
            } catch(e) {
                console.log("Couldn't perform utag.link() call.") // eslint-disable-line
                console.log(options); // eslint-disable-line
            }
        }
    
        function populateResults(results, originalSearchTerm, action,vgnLocaleSearch) {
            resetPage();
            var resultItems = results.resultsets[0].results;
            var searchTerm = results.general.query;
            var totalResults = results.general.total;
            var filters = results.result_types;
    
            var currentResultType = null;
            var currentPage = getCurrentPage(results.pagination[0]);
            var totalPages = Number(results.general.page_total);
    
            if (filters) {
                currentResultType = getCurrentFilter(filters);
            }
    
            function setupPaginationItem(paginationItems, page) {
                var el = (page === 1 ? paginationFirst : paginationItem).clone();
                el.find(".txt").text(page)
                el.toggleClass("active", page === currentPage)
                el.find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: page,
                       vgnLocale: vgnLocaleSearch
                    }));
                return paginationItems.add(el);
            }
    
            if (originalSearchTerm !== searchTerm) {
                $("#search-result-misspelling").show();
                $("#search-result-misspelling-term").text(searchTerm);
            } else {
                $("#search-result-misspelling").hide();
            }
    
            if (!resultItems.length) {
                $("#search-result-none").show();
                $("#search-result-none-term").text(searchTerm);
                try{
                    trackingCall(action, currentResultType, totalResults, searchTerm);
                }catch (e){
                    console.log('tracking call failed - no search results');
                }
            } else {
                trackingCall(action, currentResultType, totalResults, searchTerm);
                $("#search-result-results").show();
                $("#search-result-num-results").text(totalResults);
                $("#search-result-num-plural").toggle(totalResults !== "1");
                $("#search-result-num-single").toggle(totalResults === "1");
                var els = resultItems.map(function (result) {
                    var el = resultTemplate.clone();
                    el.find("a:not(.search-result-display-url)").attr("href", result.url)
                        .find(".txt").text(result.title);
                    if (result['file-type'] !== 'pdf') el.find("a > .fa").remove();
                    else {
                        el.find("a").attr("target", "_blank");
                    }
                    el.find("p").text(result.desc);
                    el.find(".search-result-display-url").text(result['display-url'] || result.url)
                        .attr({
                            title: result.url,
                            href: result.url
                        });
                    return el;
                });
    
                $("#search-result-items").append(els);
    
                if (filters) {
                    var filterEls = filters.map(function (filter) {
                        if (!filter || !filter.count) return;
    
                        var el = filterItemTemplate.clone();
                        el.find(".txt").text(strings.filter_names[filter.result_type || "all"])
                        el.find(".num").text(filter.count)
                        var linkEl = el.find("a").toggleClass('active', filter.selected)
                            .attr('href', buildSearchString({
                                q: results.general.query,
                                filter: filter.result_type,
                                action: 'filter',
                vgnLocale: vgnLocaleSearch
                            }))
    
                        if (filter.selected) {
                            linkEl.click(function (event) {
                                event.preventDefault();
                            })
                        }
    
                        return el;
                    }).filter(function (v) { return v; }) ;
                    $("#search-result-filter-list").append(filterEls);
                    if (filterEls.length > 1) $("#search-result-filters").show();
                              else $("#search-result-filters").hide();
                          } else {
                              $("#search-result-filters").css("display", "none");
                }
    
                $("#search-results-pagination-previous")
                    .toggleClass("disabled", currentPage < 2)
                    .find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: currentPage - 1,
               vgnLocale: vgnLocaleSearch
                    }));
                $("#search-results-pagination-next")
                    .toggleClass("disabled", currentPage >= totalPages)
                    .find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: currentPage + 1,
                 vgnLocale: vgnLocaleSearch
                    }));
                var paginationItems = $();
    
    
                paginationItems = setupPaginationItem(paginationItems, 1);
    
                if (currentPage >= 5 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));
    
                var startPage = Math.max(currentPage - 2, 2);
                var endPage = currentPage + 2;
                if (currentPage < 3) {
                    endPage = Math.min(5, totalPages - 1);
                } else if (totalPages - currentPage < 3) {
                    startPage = Math.max(totalPages - 4, 2)
                    endPage = totalPages - 1;
                }
                for (var p = startPage; p <= endPage; p++) {
                    paginationItems = setupPaginationItem(paginationItems, p);
                }
    
                if ((totalPages - currentPage) >= 4 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));
    
                paginationItems = setupPaginationItem(paginationItems, totalPages);
    
                $(paginationItems).insertBefore($("#search-results-pagination-next"));
                $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
                $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPages);
                $("#search-result-pagination").toggle(totalPages > 1);
                $("#search-result-page-num").text(currentPage);
                $("#search-result-page-total").text(results.general.page_total);
            }
    
            var topBanners = results.banners.filter(function (banner) { return banner.top; });
            if (topBanners[0] && topBanners[0].top) {
                $("#search-result-banner-top").html(topBanners[0].top).show();
            }
    
            var rightBanners = results.banners.filter(function (banner) { return banner.right; });
            if (rightBanners[0] && rightBanners[0].right) {
                $("#search-result-banner-right").html(rightBanners[0].right).show();
            }
        }
    
        function init() {
            var urlParams = getParams();
            var searchString = (urlParams.q || urlParams.gq || "").trim();
            var filter = urlParams.filter || "all";
            var page = parseInt(urlParams.page);
            var action = urlParams.action;
        var vgnLocaleSearch = urlParams.vgnLocale;
        if(document.documentElement.lang.indexOf("fr")>=0){
            vgnLocaleSearch = "fr_CA";
    
        } else if(document.documentElement.lang.indexOf("zh")>=0){
            if(vgnLocaleSearch == "zh_SG"){
                vgnLocaleSearch = "zh_SG";
            }else{
                vgnLocaleSearch = "zh_TW";
            }
        } else if(document.documentElement.lang.indexOf("in")>=0){
            vgnLocaleSearch = "in_ID";
        } else if(document.documentElement.lang.indexOf("vi")>=0){
            vgnLocaleSearch = "vi_VN";
        }
        else{
            vgnLocaleSearch ="en_CA";
            }
    
            if (isNaN(page)) page = 1;
    
            $("form.slf-search input[name=q]").val(searchString);
            if (!searchString) {
                resetPage();
                return;
            }
            apiCall({q: searchString, pt: filter, page: page}).then(function (results) {
                try {
                    populateResults(results, searchString, action,vgnLocaleSearch);
    
                } catch(e) {
                    searchError(e);
                }
            }, function (err) {
                searchError(err);
            });
    
            $(".search-filter-btn").click(function () {
                $("#search-result-filter-toggle").addClass("active");
                $("#search-result-filter-toggle .btn-close").focus();
            });
            $("#search-result-filter-toggle .btn-close").click(function () {
                $("#search-result-filter-toggle").removeClass("active");
                $(".search-filter-btn").focus();
            })
    
            $("[data-refocus]").focus(function () {
                var selector = $(this).attr("data-refocus");
                var el = $(selector);
                if (el.length > 0) {
                    el.eq(0).focus();
                }
            })
        }
    
        init();
    }(jQuery));
    
    
    /* global.search.js*/
    
    /* globals jQuery, setTimeout, clearTimeout, __slf_search_config */
    (function ($) {
    
        var idCnt = 0;
        var autoCompletePrefix = __slf_search_config.autocomplete_url;
        var saytPrefix = __slf_search_config.sayt_url;
        var autocompleteOptions = {
            max_results: 10,
            beginning: 1
        };
    
        function throttle(cb, delay) {
            var timer = null;
            return function () {
                var args = Array.prototype.slice.call(arguments);
                var thisObj = this;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    cb.apply(thisObj, args);
                    timer = null;
                }, delay);
            }
        }
    
        function autocompleteCall(query) {
            return $.get(autoCompletePrefix, $.extend({ query: query }, autocompleteOptions), null, 'jsonp');
        }
        function saytCall(query) {
            return $.get(saytPrefix, { q: query, type: 'sayt' }, null, 'jsonp');
        }
    
        function setupAutocomplete(form, mobile) {
            if (mobile) {
                var inputEl = form.find("input[name=q]");
                var actionEl = form.find("input[name=action]");
                var autocompleteListEl = form.find(".search-autocomplete-list-mobile");
                var saytListEl = form.find(".search-sayt-list-mobile");
                var dropdownEl = form.find(".search-autocomplete-mobile");
                var lastVal = "";
                var suggestionIndex = -1;
                var suggestions = [];
                var idNum = idCnt++;
                var listId = "slf-autocomplete-list-mobile-" + idNum;
            }
            else {
                    var inputEl = form.find("input[name=q]");
                    var actionEl = form.find("input[name=action]");
                    var submitBtn = form.find("input[type=submit]");
                    var autocompleteListEl = form.find(".search-autocomplete-list");
                    var saytListEl = form.find(".search-sayt-list");
                    var dropdownEl = form.find(".search-autocomplete");
                    var lastVal = "";
                    var suggestionIndex = -1;
                    var suggestions = [];
                    var idNum = idCnt++;
                    var listId = "slf-autocomplete-list-" + idNum;
            }
            var submitLock = false;
    
            inputEl[0].autocomplete = 'off';
    
            autocompleteListEl.attr("aria-hidden", "true");
    
            function updateSelection() {
                if (suggestionIndex < 0) {
                    if (inputEl.val() !== lastVal) inputEl.val(lastVal);
                    actionEl.val("input");
                } else {
                    inputEl.val(suggestions[suggestionIndex]);
                    actionEl.val("typeahead");
                }
                autocompleteListEl.children().removeClass("active");
                if (suggestionIndex >= 0) autocompleteListEl.children().eq(suggestionIndex).addClass("active");
            }
    
            function clickSuggestion(event) {
                event.preventDefault();
                var suggestion = $(this).data("slf-search-value");
                updateEmpty();
                actionEl.val("typeahead");
                inputEl.val(suggestion);
                form.submit();
            }
    
            function updateSuggestions(q, force) {
                return function (results) {
                    if (!force && inputEl.val() !== q) return;
    
                    suggestions = results.filter(function (r) {
                        return r !== lastVal;
                    });
                    if (!suggestions.length) {
                        autocompleteListEl.hide();
                    } else {
                        autocompleteListEl.show();
                    }
                    suggestionIndex = -1;
                    autocompleteListEl.empty().append(suggestions.map(function (suggestion, i) {
                        return $("<li role='option'>")
                            .attr("id", listId + "_" + i)
                            .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
                            .data("slf-search-value", suggestion)
                            .click(clickSuggestion).get(0);
                    }));
                    updateSelection();
                }
            }
    
            function updateSayt(q, force) {
                return function (results) {
                    if (!force && inputEl.val() !== q) return;
    
                    var arr;
                    try {
                         arr = results.results;
                    } catch(e) {
                        arr = [];
                    }
    
                    if (!arr.length) saytListEl.hide();
                    else saytListEl.show();
                    saytListEl.empty().append(arr.map(function (resultItem) {
                        return $("<li>").append($("<a class='sayt-link'>").append([
                            $("<span class='title'>").text(resultItem.title)[0],
                            $("<span class='desc'>").text(resultItem.desc)[0]
                        ]).attr("href", resultItem.url));
                    }))
                }
            }
    
            function updateEmpty() {
                updateSuggestions([], true)([]);
                updateSayt(null, true)();
            }
    
            var getSuggestions = throttle(function () {
                var v = inputEl.val();
                if (v === lastVal) return;
                lastVal = v;
                if (v) {
                    autocompleteCall(v).then(updateSuggestions(v));
                    saytCall(v).then(updateSayt(v))
                }
                else updateEmpty();
            }, 200);
    
            inputEl.on('focus', function (event) {
                var v = inputEl.val();
                var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
                if (v && !stillInDropdown) {
                    lastVal = v;
                    autocompleteCall(v).then(updateSuggestions(v));
                    saytCall(v).then(updateSayt(v))
                } else if (!stillInDropdown) {
                    lastVal = v;
                }
            })
            form.on('focusout', function (event) {
                var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget) || event.relatedTarget === inputEl[0];
                if (!submitLock && !stillInDropdown) setTimeout(function () {
            updateEmpty();
          }, 0);
    
            });
            inputEl.on('keydown', function (event) {
                if (event.key === "ArrowDown" || event.key === "Down") {
                    event.preventDefault();
                    if (suggestionIndex + 1 === suggestions.length) suggestionIndex = suggestions.length - 1;
                    else suggestionIndex += 1;
                    updateSelection();
                } else if (event.key === "ArrowUp" || event.key === "Up") {
                    event.preventDefault();
                    if (suggestionIndex < 0) suggestionIndex = -1;
                    else suggestionIndex -= 1;
                    updateSelection();
                } else if (event.key === "Escape" || event.key === "Esc") {
                    event.preventDefault();
                    updateEmpty();
                } else if (event.key === 'Enter') {
                    submitLock = true;
                    setTimeout(function () {
                       submitLock = false;
                    }, 0);
                } else if (event.key !== 'Tab') {
                    getSuggestions();
                 }
            });
            
        if (submitBtn) {
                submitBtn.on('mousedown', function () {
                    submitLock = true;
                setTimeout(function () {
                            submitLock = false;
                    }, 0);
                });
        }
    
            autocompleteListEl.on('mousedown', function (event) {
                event.preventDefault();
            })
            saytListEl.on('mousedown', function (event) {
                event.preventDefault();
            })
    
            form.on('submit', function (event) {
                if (!inputEl.val().trim()) {
                    event.preventDefault();
                }
            });
        }
    
        function init() {
            $("form.slf-search").each(function (i, form) {
                form = $(form);
                if (form.data("slf-search-initialized")) return;
                form.data("slf-search-initialized", true);
                setupAutocomplete(form);
            });
        $("form.slf-search-mobile").each(function (i, form) {
                form = $(form);
                if (form.data("slf-search-initialized")) return;
                form.data("slf-search-initialized", true);
                setupAutocomplete(form, 'mobile');
            });
                    // for left nav underline, in IE - "test-decoration-color" does not work in IE.
                    var activeLeftNav = $(".left-nav-menu .active");
                    if (null != activeLeftNav) {
                        var activeText = activeLeftNav.text();
                        activeLeftNav.html("<span>" + activeText + "</span>");
                    }
        }
    
        init();
        $(init);
    }(jQuery));
    
    
    //set the height of the description box to be equal across all CTA boxes
    function setEqualHeight() {
        var cta_desc_height = 0;
    
        $(".div-one:not(.not-aligned)").each(function() {
                $(this).css('height', 'auto'); //allow box to grow to a default height
                if ($(this).height() > cta_desc_height) {
                        cta_desc_height = $(this).height();
                }
        });
        $(".div-one:not(.not-aligned)").each(function() {
                $(this).css("height", cta_desc_height);
        });
        }
    });
        
    // /** ADOBE GlobalSEARCH JS ENDS HERE **/
$(document).ready(function () {

/* Global Variable defining starts here*/

var _locationBreadcrumb=utag_data.page_breadcrumb;
var _pageLanguage=' ';
if(utag_data.page_language){
    _pageLanguage=utag_data.page_language;
}
if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
        var utmSource="slfca-hp";
}
else{
    var utmSource="slfca";
}
var _pageCannonicalURL=' ';
if(utag_data.page_canonical_url_default){   
    _pageCannonicalURL=utag_data.page_canonical_url_default;
}
var _searchPageInputTerm='';
var _searchFilterItem='';
var _searchFilterItemResult='';
var _windowLoaction=$(location).attr('pathname');

/* Global Variable defining ends here*/

// search bar analytics starts here
// Desktop search analytics starts here
    $('#search-btn').click(function () {
        if (($(this).attr('aria-expanded') == undefined) || ($(this).attr('aria-expanded') == "false")) {
            utag.link({ "ev_type" : "other","ev_action" : "clk","ev_title" : "search module expansion"});
            //console.log("search exapansion tracked");
        } 
        else {
            //console.log("search expansion is not tracked");
        }
    });
    $('.search-bar-wrapper button').click(function(){
        var desktop_search_input=$('.search-bar-wrapper .global-search .input-wrapper input').val();
        utag.link({ "ev_type" : "other","ev_action" : "clk","ev_title" : "search module-search","ev_data-one" : desktop_search_input});
    });
    // Desktop search analytics ends here
    // Mobile search analytics starts here
    $('.search-icon-mobile').click(function () {
        var mobile_search_input=$('.hamburger-search .input-wrapper input').val();
        utag.link({"ev_type" : "other","ev_action" : "clk","ev_title" : "search module-search","ev_data-one" : mobile_search_input});
    });
    //Mobile search analytics starts here
// search bar analytics ends here

// Region and language menu analytics starts here
    $('#language-btn').click(function(){
        if($(this).attr('aria-expanded') == "false"){
        utag.link({"asset_type"	: "Module","asset_title"	: "Language Panel","event_type"	: "On Page Impression","event_title"	: "Language Panel Expansion","page_section" : "Language Bar" });
        //   console.log("language panel expansion event tracked sucessfully");

    }
    else {
        //    console.log("language panel expansion event is not tracked");
        }
    });
// Region and language menu analytics ends here

// Sign In Module (Desktop Sign In button) analytics starts here

// For Home Page Only
function SignInHomeButton(){
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "Sign In - Main",
        "event_type"	: "Click",
        "canonical_url" : _pageCannonicalURL,
        "event_title"	: "Sign In",
        "page_section" : "Homepage main signin"
    });
}

$('#signinbutton').click(function(){
    utag.link({"asset_type"	: "Module",
	"asset_title"	: "Sign In - Main",
	"event_type"	: "Click",
	"canonical_url" : _pageCannonicalURL,
	"event_title"	: "Sign In",
	"page_section" :  "Modal"   
    }); 
    if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
        SignInHomeButton();
    } 
    setTimeout(signinmodal,200);
})

// Sign In Module (Desktop Sign In button) analytics ends here

// Sign In Modal (Mobile Sign In button) analytics starts here
$('#SignIn').click(function(){
    utag.link({"asset_type"	: "Module",
	"asset_title"	: "Sign In - Modal",
	"event_type"	: "Click",
	"canonical_url" : _pageCannonicalURL,
	"event_title"	: "Sign In",
	"page_section" : "Modal"
    });
    if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
        SignInHomeButton();
    }
    setTimeout(signinmodal,200);
});
// Sign In Modal (Mobile Sign In button) analytics ends here

// Sign In Modal (Sign-in-modal expansion) analytics starts here
function signinmodal() {
    if ($('#mySignInModal').hasClass('in')){
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Modal",
            "event_type"	: "On Page Impression",
            "event_title"	: "Expansion",
            "page_section" : "Modal"
        });
        //console.log("mobile sign in module expanding is being tracked successfully");        
    }
    else{
        // if modal not found then throwing error
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Modal",
            "event_type"	: "On Page Impression",
            "canonical_url" : _pageCannonicalURL,
            "event_title"	: "Error-" + "Expanding not tracked",
            "page_section" : "Modal"});
            //console.log("mobile sign in module expanding is not being tracked")
            if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
                SignInHomePageError();
            }                  
    }
}
// Home page only
function SignInHomePageError(){
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "Sign In - Main",
        "event_type"	: "On Page Impression",
        "canonical_url" : _pageCannonicalURL,
        "event_title"	: "Error-" + "Expanding not tracked",
        "page_section" : "Homepage main signin"
    });
}
// Sign In Modal (Sign-in-modal expansion) analytics ends here

// Moblie language and region bar analytics starts here
$('.navigation-menu.language-region').click(function(){
	//console.log("Inside languagepanelmobile.");
	if($('.navigation-menu.language-region .second-level-navigation').hasClass('active')){
		utag.link({"asset_type"	: "Module","asset_title"	: "Language Panel","event_type"	: "On Page Impression","event_title"	: "Language Panel Expansion","page_section" : "Language Bar" });
        //console.log("Event fired for mobile lang pannel expansion");
    }
});
// Mobile language and region bar analytics ends here

// Right Navigation analytics starts here
function rightNavAnalytics(btnTxt1){
    var btnTxt=$.trim(btnTxt1);
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "CTA Module",
        "event_type"	: "Click",
        "event_title"	: btnTxt,
        "page_section" : "body-right-rail"
    });
    var adv='advisor';
    if ((btnTxt == 'search') || (btnTxt == 'Search') || (btnTxt.indexOf(adv) != -1)){
        utag.link({
        "utm_source":utmSource, //[INSERT LOCATION OF WIDGET, slfca-hp for homepage]
        "utm_medium":"pcwidget", //[INSERT TYPE OF LINK pcwidget for widget]
        "utm_content":_pageLanguage, //[INSERT CORRECT LANGUAGE en-ca or fr-ca]
        "utm_campaign":"slfca"
        });
    }
} 
$('.right-navigation-wrapper .button-class').click(function(){
    var btnTxt1=$(this).parent().text();
    rightNavAnalytics(btnTxt1);
});
/* For form-button */
    $('.right-navigation-wrapper .cmp-form-button').click(function(){   
    var btnTxt2=$(this).text();
    rightNavAnalytics(btnTxt2);
    });
/* For dropdown */
$('.cmp-form-options--drop-down').siblings().children('.cmp-form-button').click(function(){
    var dropdown=$('.cmp-form-options__field.cmp-form-options__field--drop-down').val();
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "Find a Financial Center",
        "event_type"	: "Click",
        "event_title"	: "Find - " + dropdown,
        "page_section" : "body-right-rail"
    });    
});
// Right Navigation analytics ends here

// Footer Analytics starts here
if ($(window).width() > 1024) {
    $('footer a').click(function(){
        utag.link({
            ev_type: "other",
            ev_action: "clk",
            ev_title: "Footer: Desktop Version"
            });        
    })
}
else{
    $('footer a').click(function(){
        utag.link({
            ev_type: "other",
            ev_action: "clk",
            ev_title: "Footer: Mobile Version"
            });
               
    })
}
// Footer analytics ends here

// CTA Analytics starts here

// CTA Dual starts here

$('.global-module-content-cta-box').find('a').each(function(){
    var linkclicked="";
        $(this).click(function(){
            if($(this).has('img').length>0){
            linkclicked=$(this).find('img').attr('alt');
            }else{
                    linkclicked= $(event.target).text();
                }
        //console.log('event tracked successfully with name-'+linkclicked);
        utag.link({"asset_type"	: "Module","asset_title"	: "Global Module CTA Box","event_type"	: "Click","event_title"	: linkclicked,"page_section" : "Global Module CTA Box"});
        });
});

// CTA Dual ends here

// CTA Triple Home Page starts here
$('#locate-advisors .cmp-form-button').click(function(){
    if ($("#locate-advisors").parsley({}).isValid()) {
        try {
            utag.link({ev_type: "other", ev_action: "clk", ev_title: "homepage - find_an_advisor_module"});
        } catch (e) {
            console.log("the error is "+e);
        }
    }
});

$('#get-a-quote .cmp-form-button').click(function(){
    if ($("#get-a-quote").parsley({}).isValid()) {
        // get the short name for the selected option
        var shortName =  $('#get-a-quote .cmp-form-button').parent().siblings('.options').find('select :selected').attr('data-shortname');
        try {
            utag.link({ev_type: "other", ev_action: "clk", ev_title: "homepage - get_a_quote_module - " + shortName});
        } catch (e) {
            console.log("the error is "+e);
        }
    }

});

$('#cta-provider-search .cmp-form-button').click(function(){
    if ($("#cta-provider-search").parsley({}).isValid()) {
        var textValue = $('#cta-provider-search .cmp-form-button').parent().siblings('.options').find('select :selected').val();
        var groupLabel = $('#cta-provider-search .cmp-form-button').parent().siblings('.options').find('select :selected').parent('optgroup').attr('label');
        try {
            utag.link({ev_type: "other", ev_action: "clk", ev_title: "provider search - homepage preselect", ev_data_one: groupLabel + "_" + textValue});
        } catch (e) {
            console.log("the error is "+e);
        }
    }
});



// CTA Triple Home Page ends here

// CTA Analytics ends here

//Tabs analytics starts here
$('.tabs-wrapper .phone-numbers').click(function(){
   var phone= $(this).html();
   var tab_name=$('.tabs-wrapper .cmp-tabs__tab--active').html();
   utag.link({
	"asset_type"	: "Text",
	"asset_title"	: phone,
	"event_type"	: "Click",
	"event_title"	: "Dial Number",
	"page_section" : tab_name
});

});

//Tabs analytics ends here

// Phone No General Analytics starts here //
    $('.phone-numbers').click(function(){
        var phoneNumber=$(this).text();
        utag.link({
            "asset_type"	: "Text",
            "asset_title"	: phoneNumber,
            "event_type"	: "Click",
            "event_title"	: "Dial Number",
            "page_section" : "Contact Us Section"
        });              
    })
// Phone No General Analytics ends here //

// Search Page Analytics starts here //
if ((_windowLoaction.indexOf("search-result") >= 0) || (_windowLoaction.indexOf("search+result") >=0) || (_windowLoaction.indexOf("search-results") >= 0) || (_windowLoaction.indexOf("search+results") >= 0) || (_windowLoaction.indexOf("html-component") >= 0)){
    if('.search-container'){
        function searchPageVariable(){
            _searchPageInputTerm=$('.search-container .form-group-wrapper input').val();
            _searchFilterItem=$('.search-container .check-container').find('.active').find('.txt').text();
            _searchFilterItemResult=$('.search-container .check-container').find('.active').find('.num').text();
        }
        /* suggestion search_typeahead_text click analytics starts here */
        $('.search-container .search-autocomplete').click(function(){
            localStorage.setItem("searchComplete","true");
        });
        if (localStorage.getItem("searchComplete") === 'true') {
            function searAutoComplete(){
                searchPageVariable();  
                alert(_searchFilterItemResult+"+"+_searchFilterItem+"+"+_searchPageInputTerm);               
                utag.link({ 
                    ev_type: "other", 
                    ev_action: "clk", 
                    ev_title: "onsite search_typeahead_text", 
                    ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                    page_search_term: _searchPageInputTerm
                });
                localStorage.setItem("searchComplete","false");
            }
            setTimeout(searAutoComplete,1000);    
        }       
        /* suggestion search_typeahead_text click analytics starts here */
        /* Filter search_filter trigger analytics starts here */
        $('#search-result-filters #search-result-filter-list').click(function(){
            localStorage.setItem("searchFilter","true");
        });
        if (localStorage.getItem("searchFilter") === 'true') {
            function searchPageFilter(){
                searchPageVariable();
                utag.link({ 
                    ev_type: "other", 
                    ev_action: "clk", 
                    ev_title: "onsite search_filter", 
                    ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                    page_search_term: _searchPageInputTerm
                }); 
                localStorage.setItem("searchFilter","false");
            }
            setTimeout(searchPageFilter,1000);
        }
        /* Filter search_filter trigger analytics ends here */
        /* search_client input Search button trigger analytics starts here */
        $('.search-container .slf-search .button-wrapper button').click(function(){
            localStorage.setItem("searButtonClick","true");      
        });
        if (localStorage.getItem("searButtonClick") === 'true') {
            function abc(){
                searchPageVariable();
                utag.link({ 
                    ev_type: "other", 
                    ev_action: "clk", 
                    ev_title: "onsite search_client input", 
                    ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                    page_search_term: _searchPageInputTerm
                });
                localStorage.setItem("searButtonClick","false");
            }
            setTimeout(abc,800);     
        }    
        /* search_client input Search button trigger analytics starts here */
    }
}
// Search Page Analytics ends here //

});
$(document).ready(function () {
  function set_active(tab)
  {
    var tab_number=$(tab).index();
    var tab_child=tab_number+1;
    $(tab).addClass('cmp-tabs__tab--active');
	  $(tab).attr('aria-selected','true');
    $(tab).siblings().attr('aria-selected','false');
    $(tab).siblings().removeClass('cmp-tabs__tab--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
    $(tab).siblings().attr('tabindex','-1');
  }
  /* Tabs Accessibility Starts Here*/
  $('.tabs-wrapper ol li').keyup(function (event) {

    if (event.keyCode == 39) {
      var temp_tab = $(this);
      var nextTab;
     
      if (temp_tab.is('li:last-child')) {
        nextTab = temp_tab.parent().children().first();
       
       
      } else {
        nextTab = $(this).next();
        
      }
      nextTab.focus();
      set_active(nextTab);
      }
      if (event.keyCode == 37)
      {
        var temp_tab = $(this);
        var prevTab;
       
        if (temp_tab.is('li:first-child')) {
          prevTab = temp_tab.parent().children().last();     
         
        } else {
          prevTab = $(this).prev();
        }
        prevTab.focus();
        set_active(prevTab);
      }
});
/* Tabs Accessibility Ends Here*/

// /* Full Header accessibility starts here */ //This is onhold due to header restructuring
//      $('.search-icon-container').keyup(function (event) {

//         if (event.keyCode == 13) {
//             if ($('#sun-search').hasClass('in')) {
//                 $('#sun-search').removeClass('in');
//                 $("#search-btn").attr('aria-expanded', 'false');
//             }
//             else {
//                 $('#sun-search').css("height","128px");
//                 $('#sun-search').addClass('in');
//                 $("#search-btn").attr('aria-expanded', 'true');
//                 $("#language-btn").attr('aria-expanded', 'false');
//                 $("#sun-language").removeClass('in');
//                 $("#q-top").focus();
//             }
//         }
//     });

//     $('#language-btn-container').keyup(function (event) {
//         if (event.keyCode == 13) {
//             if ($('#sun-language').hasClass('in')) {
//                 $('#sun-language').removeClass('in');
//                 $("#language-btn").attr('aria-expanded', 'false');
//             }
//             else {
//                 $('#sun-language').addClass('in');
//                 $("#language-btn").attr('aria-expanded', 'true');
//                 $("#search-btn").attr('aria-expanded', 'false');
//                 $("#sun-search").removeClass('in');
//                 $(".sunLanguageCrossBtn").focus();
//             }
//         }
//     });
//     $("#search-btn").keydown(function(e){
//         if (e.which == 9 ) {
//             e.preventDefault();
//             $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().focus();
//             if(e.shiftKey){
//               $("#language-btn").focus();
//               e.preventDefault();
//             }
//         }
//     });
//     $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().keydown(function(e){
//         if (e.which == 9 ) {
//             if(e.shiftKey) {
//                 $(".srch-btn").focus();
//                 e.preventDefault();
//             }
//         }
//     });

// /* Full Header accessibility ends here */

/* Footer accessibility starts here */

// $('.links .accordion-heading').keyup(function (event) {
//         if (event.keyCode == 13) {
// 			if($(this).attr('aria-expanded')=='false'){
// 			$(this).attr('aria-expanded','true');
// 			$(this).siblings().css('display','block');
// 			}
// 			else{
// 				$(this).attr('aria-expanded','false');
// 				$(this).siblings().css('display','none');
// 		}
// 	  }
// 	});
/* Footer accessibility ends here */

/* Accordion accessibility starts here */
$('.cmp-accordion__button,.cmp-accordion__panel').mousedown(function(e) {
  if (e.which === 1) {
      $(this).css({'outline':'none'});
  }
});
/* Accordion accessibility ends here */
});

$(document).ready(function () {
  var windowsize = $( window ).width();
  //faCircle();
$(".cmp-text,th,td").each(function(){
    var tool=$(this).find(".tool-tip-box:first");
var $va = "<a href='javascript:void(0)' title='' " + "class= " +'"fa fa-info-circle"' + "> </a>";
  $($va).insertBefore(tool);
    var tool_content= "";
    if($(this).attr('class')==='cmp-text'){
     $(this).children().children(".tool-tip-box").each(function(){
  tool_content = tool_content +"<p>"+ $(this).html()+"</p>";
     });
    }
    else{
    $(this).children(".tool-tip-box").each(function(){
  tool_content = tool_content +"<p>"+ $(this).html()+"</p>";
    });
    }
     $('.fa-info-circle').attr('data-toggle','tooltip');
    if(windowsize>767){
            $('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','right');
        } else {
            $('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','bottom');
        }

     $('.fa-info-circle').attr('data-html','true');
    if($(this).attr('class')==='cmp-text'){
     $(this).find('a').attr('data-original-title',tool_content);
    }
    else{
    $(this).children('a').attr('data-original-title',tool_content);
    }
     $('[data-toggle="tooltip"]').tooltip();
     $('.fa-info-circle').click(function(){
       $('.fa-info-circle').css('text-decoration','none');
     });

});

  function faCircle(){
		$('[data-toggle="tooltip"]').tooltip();
      //$('[data-toggle="tooltip"]').tooltip('update');
        if(windowsize>767){
            //$('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','right');
        } else {
            ///$('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','bottom');
        }
    }
  $( window ).resize( function () {
  $('[data-toggle="tooltip"]').tooltip('hide');
   //$('[data-toggle="tooltip"]').tooltip();
  windowsize = $( window ).width();
  faCircle();
  });
});
$(document).ready(function () {
	if ($(window).width() < 768) {
		$(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
	} else {
		$(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
		} else {
			$(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
		}
	});
});
$(document).ready(function(){
    $('.tabs-wrapper .cmp-tabs__tab--active').attr('aria-selected','true');
    var li_arr=$('.cmp-tabs__tablist').children();
    $('.cmp-tabs__tab').click(function(){
      set_active($(this));
    });
    $('.tab-accordian-heading').click(function(){
        $(this).siblings().toggle();
        $(this).parent().siblings().children('.tab-accordian-heading').siblings().css('display','none');
        $(this).parent().siblings().children('.tab-accordian-heading').attr('aria-expanded', false);
        if ($(this).attr('aria-expanded') == 'true') {
			  $(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });

  function set_active(tab)
  {
    var tab_number=$(tab).index();
    var tab_child=tab_number+1;
    $(tab).addClass('cmp-tabs__tab--active');
	  $(tab).attr('aria-selected','true');
    $(tab).siblings().attr('aria-selected','false');
    $(tab).siblings().removeClass('cmp-tabs__tab--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
    $(tab).siblings().attr('tabindex','-1');
  }
});
function stickyHeader(){
  // sticky header works if table components exists
  if($('.table-responsive').length){
    /* sticky header is implemented for data table only and user can choose to implement sticky header or not by adding
     the class table-stickyheader, sticky header cannot be implemented on comparision table as comparision table opens up
      in pop up modal. */
    if($('.table-stickyheader').length){
      let tableHeader = $(".cmp-table-data-content table tbody tr:first-child");
      let theaderPosition = tableHeader.offset().top;
      let tableBottom = $('.cmp-table-data-content table tbody tr:last-child').offset().top; 
      let tableHeight = theaderPosition + tableBottom -64;
      let position = 0;
      //sticky header function on scroll 
        $(window).on("scroll", function() {
          if (window.pageYOffset > theaderPosition) {
            position = window.pageYOffset - theaderPosition;
            tableHeader.attr("style", "transform: translateY(" + position + "px)");
            //removing the transform property once the page scrolls past the table
            if(window.pageYOffset > tableHeight){
              tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
            }
          } else if (position !== 0) {
            position = 0;
            tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
          }
        });
    }
      // adding logic to dynamically inject sr-only class span tags into icon for screen readers.
      let crossIcon = document.getElementsByClassName('fa-times');
      // getting the icon tags
      let crossLength= crossIcon.length;
      let checkIcon = document.getElementsByClassName('fa-check');
      let checkLength = checkIcon.length;
       for(let i=0;i<crossLength || i<checkLength; i++){
         //looping through the icon class
         if(i<crossLength){
        let val = crossIcon[i].innerText;
        let spanElem = document.createElement("span");
        //creating span elements and changing the inner value of icon tags
        crossIcon[i].innerText = "";
        spanElem.setAttribute("class","sr-only");
        spanElem.innerText=val;
        // appending span tag into icon span tag for screen reader. 
        crossIcon[i].appendChild(spanElem);
      }
      if(i<checkLength){
        let check = checkIcon[i].innerText;
        let spanElement = document.createElement("span");
        checkIcon[i].innerText = "";
        spanElement.setAttribute("class","sr-only");
        spanElement.innerText=check;
        checkIcon[i].appendChild(spanElement);
       }
       } 
 }
}
$(stickyHeader);
$(window).resize(stickyHeader);
$(function(){
   
})
$(document).ready(function () {
	$('.site-level-notification .close-div').click(function () {
		$('.site-level-notification').css('display', 'none');
	});
	$('.site-level-notification .close-div').keyup(function (event) {
		if (event.keyCode == 13) {
			$('.site-level-notification').css('display', 'none');
		}
	});
});
$(document).ready(function () {
  var popHeight = $(window).height();
  $(".subscribe-popup-wrapper").height(popHeight);
  popUpWidth();
  function popUpWidth() {
    var popWidth = $(window).width();
    $(".subscribe-popup-wrapper").width(popWidth);
  };
  $(window).resize(function () {
    popUpWidth();
  });
  $(".cmp-form-button").keydown(function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $(".close-popup").focus();
    }
  });
  //   $("#subscribe").modal({show:true});

});

$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
          updateSignInForm('form_signon');        
    });
    function modalWidth(){
      var winWidth=$(window).width();
      $("#mySignInModal").width(winWidth);
      $("#mySignInModal").addClass('horizontal-middle-align');
    }
    if ($(window).width() > 1024) {
      modalWidth();
    }
    $(window).resize(function() {
      if ($(window).width() > 1024) {
        modalWidth();
      }
    });
    $('.icon-reg').html('');
    var a1=$('#userIdDiv').html();
    if(a1 && a1.indexOf("&nbsp;") != -1){
      var updatedString = a1.replace("&nbsp;", "");
      $('#userIdDiv').html(updatedString);
    } 
    $("#form_signon .btn.btn-blue").click(function(){
      return CheckClicks('e');
    });
    $("#rememberIDModal").click(function(){
      remember(this);
    });
    $('#rememberIDModal').keypress(function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);

      if (keycode == 13) {
          clickCheckBox(this,event);
      }
      event.stopPropagation();
     event.preventDefault();
     return false;
  });
 function clickCheckBox(box,e) {
  $(box).trigger('click');
}
 $(".signin-sponsor").keydown(function(e){
      if (e.which == 9 ) {
     e.preventDefault();
         $('#closeSignInModal').focus();
          e.stopPropagation();
      }
 });
 $("#signinbutton").keydown(function(e){
     if ($('#mySignInModal').hasClass('in')) {
      if (e.which == 9 ) {
       e.preventDefault();
         $('#closeSignInModal').focus();
          e.stopPropagation();
      }
     }
 });
 $("#closeSignInModal").keydown(function(e){
      if (e.which == 13 ) {
         $('#signinbutton').focus();
          e.stopPropagation();
      }
 });
});     


$(document).ready(function () {
    var comp=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return !$(this).hasClass('yellow-horizontal-separator')});
    var child=comp.length;
    var count1=0;
    var cta_index=0;
    comp.each(function()
    {
        count1++;
        if ($(this).hasClass('right-nav-cta'))
        {  
         cta_index=count1;
        }
    });
    

    if (cta_index==0)
    {
        right_nav_width(child);
    }
    else if (cta_index==1)
    {
       var child2=child-1;
       right_nav_width(child2);
       firstfull();
      
    }
    else
    { 
        var childbefore= cta_index-1;
        right_nav_width(childbefore);
        var childafter=child-childbefore;
        for (var i=cta_index-1; i<child; i++)
        {
            $(comp[i]).removeClass('col-sm-6 col-sm-4').addClass('col-sm-12');
        }       
    }
    function right_nav_width(child) 
    {
        if (child==1)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12" )});
    }
    if (child==2)
    {
        
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-6 col-md-12" )});
    }
    if (child==3)
    {
        
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-4 col-md-12" )});
    }
    if (child==4)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-6 col-md-12" )});
    }
    if (child==5)
    {
        if (cta_index==1)
        {
            for (var i=1; i<4; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-4 col-md-12');
            }
            for (var i=4; i<=5; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-6 col-md-12');
            }
        }
        else
        {
            for (var i=0; i<3; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-4 col-md-12');
            }
            for (var i=3; i<=4; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-6 col-md-12');
            }
        }
        
    }
    if (child==6)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-4 col-md-12" )});
    }
        
    }
    function firstfull(){
        $('.right-nav-cta').removeClass('col-sm-6 col-sm-4').addClass('col-sm-12');
    }
    setTimeout( function() {
        maxheight(child, cta_index);
    }, 200 );
    $( window ).resize(function() {
        maxheight(child, cta_index);
    });
    
    //height Function//

    function maxheight(child)
    {
        if (cta_index==0)
        {
           
            getMaxWidth(child);
        }
        else if(cta_index==1)
        {
            getMaxWidth(child-1);
        }
        else
        {
            getMaxWidth(cta_index-1);
        }
        
    }

    function getMaxWidth(child)
    {
        var maxHeight=0;
        var height1=0;
        var height2=0;
        if (( $(window).width() <1025 &&  $(window).width() >767 ))
        {
           
            
            if (child < 4)
            {
               
                comp.each(function(index) {
                    if (cta_index>0)
                    {
                        if (index < cta_index-1)
                        {
                            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                        }
                    }
                    else
                    {
                        if (index > cta_index-1)
                        {
                            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                        }
                    }
                    
                    
                });
                comp.each(function(index) {
                    if (cta_index > 0)
                    {
                        if (index < cta_index-1)
                        {
                            $(this).height(maxHeight);
                            
                        }
                    }
                    else
                    {
                        if (index > cta_index-1)
                        {
                            $(this).height(maxHeight);
                            
                        }
                    }
                   
                    
                });
            }
            else
            {
                if (child==5)
                {
                    height1=height2=0;
                    var row1=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-4')});
                    var row2=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-6')});
                    row1.each(function(index) {
                        
                     height1 =height1 > $(this).height() ? height1 : $(this).height();
                            
                    });
                    row1.each(function(index) {
                           $(this).height(height1);
                           
                           
                    });
                    row2.each(function(index) {
                            var abc = $(this).height();
                            height2 = height2 > $(this).height() ? height2 : $(this).height();
                    });
                   
                    row2.each(function(index) {
                        $(this).height(height2);
                           
                           
                    });
                }
                else
                {
                    var row1_child=child/2;
                    var row1=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-4')});
                    var row2=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-6')});
                    height1=height2=0;
                    row1.each(function(index) {
                        if (index < row1_child)
                        {
                            
                             height1 = height1 > $(this).height() ? height1 : $(this).height();
                            
                        }
                        else
                        {
                             height2 = height2 > $(this).height() ? height2 : $(this).height();
                        }
                        
                    });
                    row1.each(function(index) {
                        if (index < row1_child)
                        {
                            $(this).height(height1+30);
                        }
                        else
                        {
                            $(this).height(height2+30);
                        }
                       
                    });
                    row2.each(function(index) {
                        if (index < row1_child)
                        {
                            
                             height1 = height1 > $(this).height() ? height1 : $(this).height();
                            
                        }
                        else
                        {
                             height2 = height2 > $(this).height() ? height2 : $(this).height();
                        }
                        
                    });
                    row2.each(function(index) {
                        if (index < row1_child)
                        {
                            $(this).height(height1 );
                        }
                        else
                        {
                            $(this).height(height2 );
                        }
                       
                    });
    
                }
            }
        }
        else
        {
            comp.each(function() {
                    $(this).css("height","auto");

            });
        }
    }

    //For legal text Height
    $('.right-navigation-wrapper form .legal-text').parent().css({'text-size':'14px','line-height':'18px'});
     
 });
 
$(document).ready(function () {
    $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().addClass('in');
    $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().siblings().attr('aria-expanded', 'true');
    $('.desktop-region-language-menu-wrapper .content-region .accordion-heading').click(function () {
        if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', 'true');
            $(this).siblings().addClass('in');
        }
        else {
            $(this).attr('aria-expanded', 'false');
            $(this).siblings().removeClass('in');
        }
    });
    // $('.tab-content .accordion-heading').click(function(){
    //     if($(this).attr('aria-expanded') == 'false'){
    //         $(this).attr('aria-expanded','true');
    //         $(this).siblings().addClass('in');
    //     }
    //     else{
    //         $(this).attr('aria-expanded','false');
    //         $(this).siblings().removeClass('in');
    //     }
    // });
    /* mobile navigation code */
    $('.mobile-region-language-menu-wrapper .region-link .accordion-heading').click(function () {
        if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', 'true');
            $(this).siblings().addClass('in');
        }
        else {
            $(this).attr('aria-expanded', 'false');
            $(this).siblings().removeClass('in');
        }
    })
    $('.desktop-region-language-menu-wrapper .slf-tab-region .slf-tab').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.region-present').siblings().css("display", "none");
    $('.language-present').siblings().css("display", "none");
    $(".mobile-header .first").click(function () {
        $('.mobile-header .first').addClass('active');
        $('.mobile-header .second').removeClass('active');
        $('.mobile-header .region-tab').css({ 'display': 'block' });
        $('.mobile-header .language-tab').css({ 'display': 'none' });
    });
    $(".mobile-header .second").click(function () {
        $('.mobile-header .first').removeClass('active');
        $('.mobile-header .second').addClass('active');
        $('.mobile-header .region-tab').css({ 'display': 'none' });
        $('.mobile-header .language-tab').css({ 'display': 'block' });
    });


    /*link farm table code starts here */
    var linkFarm = $(".cmp-linkfarm-table");
    if (linkFarm.length) {
        /*desktop logic start*/
        $(".desktop-linkfarm-table").removeClass('desktop-region-language-menu-wrapper');
        $('.list-unstyled').addClass('in');
        $('.slf-language').remove();
        $('.cross-btn').remove();
        $('.cmp-linkfarm-table .slf-region').removeClass('col-xs-9').addClass('col-xs-12');
        /*desktop logic end */
        $('.cmp-linkfarm-table .col-xs-12').removeClass("mobile-language-region");
        $('.go-back').remove();
        $('.slf-tab-region').remove();
        $('.tab-content .tab-pane').addClass('active');
        $(".region-link").addClass("slf-accordion-arrow");
        $('.cmp-linkfarm-table .tab-content .slf-accordion-arrow .accordion-heading').click(function () {
            if ($(this).attr('aria-expanded') == 'false') {
                $(this).attr('aria-expanded', 'true');
                $(this).siblings().toggle('fast');
            }
            else {
                $(this).attr('aria-expanded', 'false');
                $(this).siblings().toggle('fast');
            }
            $(this).closest('li').siblings().find(".collapse").css("display", "none");
            $(this).closest('li').siblings().find(".accordion-heading").attr("aria-expanded", "false");
            $(this).siblings().find('.collapse').css("display", "block");
            if ($(this).closest(".region-link").find(".collapse").length === 1) {
                var offset = $(this).offset();
                var headerHeight = $('.slf-mobile-header-wrapper').height();
                var scroll = offset.top - headerHeight;
                $("html, body").animate({
                    scrollTop: scroll
                });
            }

        });
            /*hiding the desktop link farm table for mobile view*/
            function resizing(){
                if (window.innerWidth < 767) {
                    $('.desktop-linkfarm-table').attr("style", "display:none!important;");
                    $('.mobile-region-language-menu-wrapper').attr("style", "display:block;");
                }else if(window.innerWidth > 767){
                    $('.desktop-linkfarm-table').attr("style", "display:block;");
                    $('.mobile-region-language-menu-wrapper').attr("style", "display:none;");
                }
            }
               resizing();
            $(window).resize(resizing);

    }
    /*link farm table code ends here */
});
$(document).ready(function(){
    popUpWidth();
    popUpHeight(); 
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
    function popUpHeight(){
      var popHeight=$(document).height();
      $(".popup-modal-wrapper").height(popHeight);
    }
    $(window).resize(function() {
          popUpWidth();
          popUpHeight();
    });
      
  $('a').click(function(){
    var anchorId=$(this).attr('href');
    var anchor=$(this);
    if(anchorId && anchorId.match("^#")){
      $('.popup-modal-wrapper').each(function(index){
        var modalId = $(this).attr('id');
        modalId='#'+modalId;
        if(modalId && anchorId.match(modalId)){
          anchor.attr('data-toggle','modal');
        }
      });
    }
  });
});
$(document).ready(function(){
  
});
$(function(){
 
});

$(document).ready(function () {
   $(".desktop-primary-navigation .nav-item.navigation").hover(function () {
      $(this).addClass('open');
   }, function () {
      $(".desktop-primary-navigation .nav-item.navigation").removeClass("open");
   }
   );
   $(".desktop-primary-navigation .nav-item .menu-content").hover(function () {
      $(this).siblings().addClass('box-class');
   }, function () {
      $(this).siblings().removeClass('box-class');
   }
   );

   $(".desktop-primary-navigation-yellow .nav-item.navigation").hover(function () {
      $(this).addClass('open');
   }, function () {
      $(".desktop-primary-navigation-yellow .nav-item.navigation").removeClass("open");
   }
   );
   $(".desktop-primary-navigation-yellow .nav-item .menu-content").hover(function () {
      $(this).siblings().addClass('box-class-yellow');
   }, function () {
      $(this).siblings().removeClass('box-class-yellow');
   }
   );
   $('.desktop-primary-navigation a[data-toggle=dropdown]').click(function(){
      location.href = this.href;
  })
});
$(document).ready(function () {
    mobileLogoWidth();
    function mobileLogoWidth() {  
    var hamburger=$('.hamburger-menu').width();
    var signbutton=$('.mobile-sign-in-box').width();     
    var windowwidth=$(window).width();
    var logowidth=windowwidth-signbutton-hamburger;
    $('.slf-header-mobile-logo').width(logowidth);
    }      
    $("#hamburgerMenu").click(function () { 
        $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');             
        $('.offcanvas-overlay').addClass('active');
        $('.container').css({'margin-left':'270px'});
        $('body').addClass('overflow-hidden');
        $('.slf-mobile-header-wrapper').css({'position':'static'});
        var windowHeight=$(window).height();
        $('.hamburger-menu-wrapper').height(windowHeight);
    });
    $("#close-hamburger").click(function () {
        $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');      
        $('.offcanvas-overlay').removeClass('active');
        $('.container').css({'margin-left':'0px'});
        $('body').removeClass('overflow-hidden');
        $('.slf-mobile-header-wrapper').css({'position':'fixed'});
    });
    $('.first-level-navigation .navigation-menu').children("a").click(function(){
        if(event.target.parentNode.children[1].className === "third-level-navigation") {
            sessionStorage.scrollPositionSecond = $(this).parent().closest('div').scrollTop();
        } else {
            sessionStorage.scrollPositionFirst = $(this).parent().closest('div').scrollTop();
        }
    });
    $('.second-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $('.third-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionSecond);
    });
    $('.navigation-menu').children("a").click(function(){
        $(this).parent().closest('div').scrollTop(0);
        $(this).siblings("div").addClass('active');         
        $(this).parent().closest('div').css({'overflow-y':'hidden'});
    });
    $('.go-back').click(function(){ 
        $(this).closest("div").removeClass('active');          
        $(this).closest('div').parent().closest('div').css({'overflow-y':'auto'});
    });
    $('.language-region .second-level-navigation .go-back').click(function(){  
        $('.language-region .second-level-navigation').removeClass('active');         
        $('.hamburger-menu-wrapper').css({'overflow-y':'auto'});
        $('.hamburger-menu-wrapper').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $(window).resize(function() {
        function mobileLogoWidth() {  
            var hamburger=$('.hamburger-menu').width();
            var signbutton=$('.mobile-sign-in-box').width();     
            var windowwidth=$(window).width();
            var logowidth=windowwidth-signbutton-hamburger;
            $('.slf-header-mobile-logo').width(logowidth);
            }
        mobileLogoWidth();
        if ($(window).width() > 1024) {
            $('.container').css({'margin-left':'0'});
            $('body').removeClass('overflow-hidden'); 
        }
        else if ($(window).width() < 1025) {
            var windowHeightResize=$(window).height();
            $('.hamburger-menu-wrapper').height(windowHeightResize);
            if ($('.hamburger-menu-wrapper').hasClass('active')){
                $('.container').css({'margin-left':'270px'});
                $('body').addClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({'position':'static'});
            }
            else{
                $('.container').css({'margin-left':'0'}); 
                $('body').removeClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({'position':'fixed'}); 
            } 
        }
    });  
});   
$(document).ready(function(){
  var menuHeight= $('.slf-header-mega-menu2').height();
  var submenuHeight=$('.dropdown-submenu .dropdown-menu').height();
   $( ".dropdown-submenu").hover(
       function(){
           $('.slf-header-mega-menu2').height(submenuHeight+5);
   },function(){
     $('.slf-header-mega-menu2').height(menuHeight);
      }
   );
  });

  /*AEM JS*/
  $(document).ready(function(){
   var menuHeight=0;
 $( ".cmp-dynamic-megamenu .dropdown-submenu ").hover(
     function(){
        menuHeight= $(this).parent().parent().parent().parent().height();
          var submenuHeight=$(this).children('.dropdown-menu').height();
         if ( submenuHeight > menuHeight)
         {
             $('.cmp-dynamic-megamenu').height(submenuHeight+13);
         }
         else
         {
             $(this).children('.dropdown-menu').height(menuHeight);
         }

 },function(){
   $('.cmp-dynamic-megamenu').height(menuHeight);
    }
 );
});


$(document).ready(function(){
   var menuHeight=0;
 $( ".cmp-dynamic-megamenu-grey .dropdown-submenu ").hover(
     function(){
         menuHeight= $(this).parent().parent().parent().parent().height();
          var submenuHeight=$(this).children('.dropdown-menu').height();
         if ( submenuHeight > menuHeight)
         {
             $('.cmp-dynamic-megamenu-grey').height(submenuHeight+13);
         }
          else
         {
             $(this).children('.dropdown-menu').height(menuHeight-10);
         }

 },function(){
   $('.cmp-dynamic-megamenu-grey').height(menuHeight);
    }
 );
});
$(document).ready(function () {
var pathName= window.location.pathname ;
$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){
 var strLink =  $(this).attr('href');
 var split = strLink.indexOf('.html')-1; 
 strLink = strLink.substr(1,(strLink.indexOf('.html')-1));
 var strLink1 = strLink.lastIndexOf('/');
 strLink = strLink.substr(strLink1,split);
 strLink = pathName.indexOf(strLink);
 if(strLink > -1){
     $(this).addClass("nav-active");
 }

})
});
$(document).ready(function () {
	$('footer .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).closest('.col-xs-12').siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').siblings().find('.accordion-heading').attr('aria-expanded', false);
		$(this).closest('.col-xs-12').parent().siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
	});
	var pathName= window.location.pathname;
	$('.editorial-nav-desktop-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selected");
		}
	})
});

/* Node app js*/
// $(document).ready(function () {
	// $('.accordion-heading').click(function () {
	// 	$(this).siblings('.list-div').toggle('collapse');
	// 	$(this).parent().parent().siblings().children().children('.list-div').css('display', 'none');
	// 	$(this).parent().parent().siblings().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
	// 	if ($(this).attr('aria-expanded') == 'true') {
	// 		$(this).attr('aria-expanded', false);
	// 	}
	// 	else if ($(this).attr('aria-expanded') == 'false') {
	// 		$(this).attr('aria-expanded', true);
	// 	}
	// });
// });
$(document).ready(function () {
    life_moments_fix();
    $(window).resize(function () {
		life_moments_fix();
    });
    $('.blue-background-wrapper').find('.life-moments-wrapper-desktop .list-unstyled').children('li').children('a').each(function(){
        var text=$(this).text();
        var lastWord=text.split(" ").pop();
        var index=text.indexOf(lastWord);
        text=text.substr(0,index);
        $(this).text("");
        lastWord=lastWord.toUpperCase();
        var html="<span>"+text+"</span>"+"<br><strong>"+lastWord+"</strong>";
        $(this).append(html);
    });
    $('.yellow-background-wrapper').find('.life-moments-wrapper-desktop .list-unstyled').children('li').children('a').each(function(){
        var text=$(this).text();
        var lastWord=text.split(" ").pop();
        var index=text.indexOf(lastWord);
        text=text.substr(0,index);
        $(this).text("");
        lastWord=lastWord.toLowerCase();
        var html="<span>"+text+"</span>"+"<br><strong>"+lastWord+"</strong>";
        $(this).append(html);
    });
    function life_moments_fix(){
        var pageWidth=$(window).width();
        if(pageWidth>=768){
            $('.yellow-background-wrapper').siblings('.layout-container').css('position','absolute');
            $('.yellow-background-wrapper').siblings('.layout-container').css('width','95%');
            $('.yellow-background-wrapper').siblings('.layout-container').addClass('horizontal-middle-align');
            $('.yellow-background-wrapper').siblings('.layout-container').css('margin-top','-18px');
            $('.yellow-background-wrapper').css('z-index','-1');
            var layoutHeight=$('.yellow-background-wrapper').siblings('.layout-container').height();
            $('.yellow-background-wrapper').css('padding-top',layoutHeight);
            $('.yellow-background-wrapper').css('padding-bottom',"27px");
        }
        else{
            $('.yellow-background-wrapper').siblings('.layout-container').css('position','');
            $('.yellow-background-wrapper').siblings('.layout-container').css('width','100%');
			$('.yellow-background-wrapper').siblings('.layout-container').removeClass('horizontal-middle-align');
            $('.yellow-background-wrapper').siblings('.layout-container').css('margin-top','0px');
			$('.yellow-background-wrapper').css('z-index','0');
            $('.yellow-background-wrapper').css('padding-top','48px');
            $('.yellow-background-wrapper').css('padding-bottom',"48px");
        }
    }
})
$(document).ready(function(){
    $('.cmp-navigation__item--level-1 .cmp-navigation__group').css('display','none');
    $('.cmp-navigation__item--level-1').has('ul').children('a').css({'border':'none','font-weight' : 400});
    $('.cmp-navigation__item--level-1').children('ul').children('li').not('.cmp-navigation__item--active').children('a').css({'border':'none','font-weight' : 400});
    if($('.cmp-navigation__group .cmp-navigation__item--active').hasClass('cmp-navigation__item--level-1')){
        $('.cmp-navigation__group .cmp-navigation__item--active').children('.cmp-navigation__group').css({'display':'block'});
        $('.cmp-navigation__group .cmp-navigation__item--active').children('.cmp-navigation__group').siblings().attr('aria-expanded',true);
    }
    $('.cmp-navigation__item--level-1 .cmp-navigation__item-link').click(function(){
        $(this).siblings('.cmp-navigation__group').toggle('collapse');
        $(this).parent().siblings().children('.cmp-navigation__group').css('display','none');
        $(this).parent().siblings().children('.cmp-navigation__group').siblings('a').attr('aria-expanded',false);        
        if($(this).attr('aria-expanded')=='true'){
            $(this).attr('aria-expanded',false);
        }
        else if($(this).attr('aria-expanded')=='false'){
            $(this).attr('aria-expanded',true);
        }
    });
});


$(document).ready(function () {
    if($('.search-container .search-bottom')){
        $('.search-container .search-bottom .close-div').remove();
    }
    if('.search-bottom .search-bar-wrapper'){
        $('.search-bottom .search-bar-wrapper').attr('id','');
    }
    if($('.search-container')){
        setTimeout(twoDigit,1000);
        function twoDigit(){
            var paginationItem=$('#search-result-pagination').children().filter(function(){return $(this).hasClass('pagination-item')});
            paginationItem.each(function(){
                var digit=$(this).children("a").find('.txt').text();
                var digitCount=0;
                while(digit!=0){
                    digit=parseInt(digit/10);
                    digitCount++;
                }
                if(digitCount>=2){
                    $(this).children("a").css({'padding':'5px 6.4px'});
                }
            });
        }
    }
});
$(document).ready(function(){
    // $( ".highlight-text" ).one( "mousemove mousehover keydown scroll", function( event ) {
    //     alert( "The " + event.type + " event happened!" );
    //     a();
    //   });
    function highlighted(){ 
        $(".highlight-text").each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass("active-text"); 
          } 
        });  
    }
    $(window).scroll(function(event) {
        highlighted();     
      });
      setTimeout(highlighted,800);     
});
(function($) {  
    $.fn.visible = function(partial) {     
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;     
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop)); 
    };    
  })(jQuery);
$(document).ready(function () {
    $(".desktop-header-wrapper #sun-search").removeClass('in');
    $(".signIn-button").attr('maxlength', '30');
    function langTrue(){
        $('#language-btn').addClass('lang-true');
    }
    $('#language-btn-container').click(function () {
        if ($('#sun-search').hasClass('in')) {
           searchClose();
        }
    });
    $('#search-btn').click(function () {
        if ($('#sun-language').hasClass('in')) {
            $("#language-btn").attr('aria-expanded', 'false');
            $("#sun-language").removeClass('in');
            setTimeout(langOff,150);
        }
    });
    function langOff(){
        $('#language-btn').removeClass('lang-true');
    }
    $('#language-btn-container').click(function () {
        if ($('#language-btn').attr('aria-expanded') == 'true') {
            $("#language-btn").attr('aria-expanded', 'false');
            setTimeout(langOff,150);
        }
        else {
            $("#language-btn").attr('aria-expanded', 'true');
            setTimeout(langTrue,230);
        }
    });
    $('.sunLanguageCrossBtn').click(function () {
        $("#language-btn").attr('aria-expanded', 'false');
    });
      
    $(document).mouseup(function(e){
    var searchBar = $("#sun-search");
    if($('#sun-search').hasClass('in')){
        if (e.which === 1) {
            if (!searchBar.is(e.target) && searchBar.has(e.target).length === 0){
                searchClose();
                setTimeout(searchClose,500);
                event.stopImmediatePropagation();
            }
        }
    }
    });
    function searchClose(){
        $("#search-btn").attr('aria-expanded', 'false');
        $('#sun-search').removeClass('in');
    }
    $('.desktop-region-language-menu-wrapper .sunLanguageCrossBtn').click(function(){
        $('#language-btn').removeClass('lang-true');
    });

      // open the full header menu on focus for screen readers. 
      $('.nav-active').on("focus", function(){
        $('.dropdown').removeClass("open");
        $(this).parent().addClass("open");
    })
});

$(function(){
    //dynamically injecting script tag
    let scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', 'https://play.vidyard.com/embed/v4.js');
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
})
$(document).ready(function () {
	//for footer
	if ($(window).width() < 768) {
		$('footer .social-link-icon-wrapper').css({ "padding": "0" });
	} else {
		var teaser_height = $('footer .teaser').height();
		$('footer .social-link-icon-wrapper').css({ "padding": "16px 15px 16px 0" });
		$('footer .social-link-icon-wrapper').height(teaser_height);
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$('footer .social-link-icon-wrapper').css({ "padding": "0" });
		} else {
			var teaser_height = $('footer .teaser').height();
			$('footer .social-link-icon-wrapper').css({ "padding": "16px 15px 16px 0" });
			$('footer .social-link-icon-wrapper').height(teaser_height);
		}
	});

	// for equal height
	var eachHeight = 0;
	var eachComponent = $('.cta-content-icon-wrapper .container-component');
	eachComponent.each(function () {
		eachHeight = eachHeight > $(this).height() ? eachHeight : $(this).height();

	});

	eachComponent.each(function () {
		$(this).height(eachHeight);
	});

	//for tool card
	var link_height = 0;
	var tool_card_link = $('.tool-card-wrapper .cmp-container').children().find('.cmp-text');
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {

			link_height = link_height > $(this).height() ? link_height : $(this).height();
		}

	});
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {
			$(this).height(link_height);
		}

	});

	var taeser_height = 0;
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	var taeser_height = 0;
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	//for editorial article
    var editorial_teaser_height=0;
	var editorial_teaser = $('.editorial-articles-wrapper').find('.teaser');

    editorail_height();

    function editorail_height()
    {
        if ($(window).width() > 767)
        {
            editorial_teaser.each(function (index) {
            editorial_teaser_height = editorial_teaser_height > $(this).height() ? editorial_teaser_height : $(this).height();
            });
            editorial_teaser.each(function (index) {
            $(this).height(editorial_teaser_height);
            });
        }
        else
        {
             editorial_teaser.each(function (index) {
            $(this).css('height','auto');
            });
        }

    }

	//for CTA_Height
	// var cta_height = 0;
	// if (($(window).width() > 767)) {
	// 	$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background,.cta-three-column-wrapper').each(function () {
	// 		cta_height = $(this).parents('.layout-container').height();
	// 		$(this).children().height(cta_height);
	// 	});
	// 	var counter = 0;
	// 	$('.yellow-icon-white-background').each(function () {
	// 		if (counter === 0) {
	// 			cta_height = $(this).parents('.layout-container').height();
	// 		} else {
	// 			cta_height = $(this).parents('.layout-container').height() - 2;
	// 		}
	// 		$(this).children().height(cta_height);
	// 		counter++;
	// 	});

	// }
	// else {
	// 	$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background,.cta-three-column-wrapper').each(function () {
	// 		$(this).children().css('height', 'auto');
	// 	});
	// }

	var cta_icon_text = $('.no-padding .yellow-icon-white-background').children().find('.icon-text');
	cta_icon_text.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	cta_icon_text.each(function (index) {
		$(this).height(taeser_height);

	});

	//CTA Padding FIX.

	cta_padding_fix();

	$(window).resize(function () {
		cta_padding_fix();
	});

	function cta_padding_fix() {
		if (($(window).width() > 767)) {
			if ($('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').hasClass('no-padding')) {
			}
			else {
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().css('padding', ' 0px 10px 0px 10px');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().first().css('padding-left', '0');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().last().css('padding-right', '0');
			}
		}
		else {
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().css('padding', '0');
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().last().children().css('margin-bottom', '0');
		}

	}

	 //Tool card padding fix.
	 tool_card_padding_fix();

	 $(window).resize(function () {
		 tool_card_padding_fix();
	 });
 
	 function tool_card_padding_fix() {
		 if (($(window).width() > 1024)) {
			 if ($('.tool-card-wrapper').parents('.layout-container').hasClass('no-padding')) {
			 }
			 else {
				 $('.tool-card-wrapper').parents('.layout-container').children().children().css('padding', ' 0px 10px 0px 10px');
				 $('.tool-card-wrapper').parents('.layout-container').children().children().first().css('padding-left', '0');
				 $('.tool-card-wrapper').parents('.layout-container').children().children().last().css('padding-right', '0');
			 }
		 }
		 else {
			 $('.tool-card-wrapper').parents('.layout-container').children().children().css('padding', '0px 10px');
			 //$('.tool-card-wrapper').parents('.layout-container').children().children().last().children().css('margin-bottom', '0');
		 }
 
 
	 }
 
	
    //subscribe_legal_text

	subscribe_legal_text();
	$(window).resize(function () {
		subscribe_legal_text();
	});

	function subscribe_legal_text()
    {
        if (($(window).width() < 1025))
        {
            $('.subscribe-main-content-wrapper .legal-text').parents('.text').css('width','100%');
        }
        else
        {
			$('.subscribe-main-content-wrapper .legal-text').parents('.text').css('width','66.66%');
        }

    }

});
(function() {
    "use strict";

    var NS = "cmp";
    var IS = "carousel";

    var keyCodes = {
        SPACE: 32,
        END: 35,
        HOME: 36,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40
    };

    var selectors = {
        self: "[data-" +  NS + '-is="' + IS + '"]'
    };

    var properties = {
        /**
         * Determines whether the Carousel will automatically transition between slides
         *
         * @memberof Carousel
         * @type {Boolean}
         * @default false
         */
        "autoplay": {
            "default": false,
            "transform": function(value) {
                return !(value === null || typeof value === "undefined");
            }
        },
        /**
         * Duration (in milliseconds) before automatically transitioning to the next slide
         *
         * @memberof Carousel
         * @type {Number}
         * @default 5000
         */
        "delay": {
            "default": 5000,
            "transform": function(value) {
                value = parseFloat(value);
                return !isNaN(value) ? value : null;
            }
        },
        /**
         * Determines whether automatic pause on hovering the carousel is disabled
         *
         * @memberof Carousel
         * @type {Boolean}
         * @default false
         */
        "autopauseDisabled": {
            "default": false,
            "transform": function(value) {
                return !(value === null || typeof value === "undefined");
            }
        }
    };

    /**
     * Carousel Configuration
     *
     * @typedef {Object} CarouselConfig Represents a Carousel configuration
     * @property {HTMLElement} element The HTMLElement representing the Carousel
     * @property {Object} options The Carousel options
     */

    /**
     * Carousel
     *
     * @class Carousel
     * @classdesc An interactive Carousel component for navigating a list of generic items
     * @param {CarouselConfig} config The Carousel configuration
     */
    function Carousel(config) {
        var that = this;

        if (config && config.element) {
            init(config);
        }

        /**
         * Initializes the Carousel
         *
         * @private
         * @param {CarouselConfig} config The Carousel configuration
         */
        function init(config) {
            // prevents multiple initialization
            config.element.removeAttribute("data-" + NS + "-is");

            setupProperties(config.options);
            cacheElements(config.element);

            that._active = 0;
            that._paused = false;

            if (that._elements.item) {
                refreshActive();
                bindEvents();
                resetAutoplayInterval();
                refreshPlayPauseActions();
            }

            if (window.Granite && window.Granite.author && window.Granite.author.MessageChannel) {
                /*
                 * Editor message handling:
                 * - subscribe to "cmp.panelcontainer" message requests sent by the editor frame
                 * - check that the message data panel container type is correct and that the id (path) matches this specific Carousel component
                 * - if so, route the "navigate" operation to enact a navigation of the Carousel based on index data
                 */
                new window.Granite.author.MessageChannel("cqauthor", window).subscribeRequestMessage("cmp.panelcontainer", function(message) {
                    if (message.data && message.data.type === "cmp-carousel" && message.data.id === that._elements.self.dataset["cmpPanelcontainerId"]) {
                        if (message.data.operation === "navigate") {
                            navigate(message.data.index);
                        }
                    }
                });
            }
        }

        /**
         * Caches the Carousel elements as defined via the {@code data-carousel-hook="ELEMENT_NAME"} markup API
         *
         * @private
         * @param {HTMLElement} wrapper The Carousel wrapper element
         */
        function cacheElements(wrapper) {
            that._elements = {};
            that._elements.self = wrapper;
            var hooks = that._elements.self.querySelectorAll("[data-" + NS + "-hook-" + IS + "]");

            for (var i = 0; i < hooks.length; i++) {
                var hook = hooks[i];
                var capitalized = IS;
                capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
                var key = hook.dataset[NS + "Hook" + capitalized];
                if (that._elements[key]) {
                    if (!Array.isArray(that._elements[key])) {
                        var tmp = that._elements[key];
                        that._elements[key] = [tmp];
                    }
                    that._elements[key].push(hook);
                } else {
                    that._elements[key] = hook;
                }
            }
        }

        /**
         * Sets up properties for the Carousel based on the passed options.
         *
         * @private
         * @param {Object} options The Carousel options
         */
        function setupProperties(options) {
            that._properties = {};

            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    var property = properties[key];
                    var value = null;

                    if (options && options[key] != null) {
                        value = options[key];

                        // transform the provided option
                        if (property && typeof property.transform === "function") {
                            value = property.transform(value);
                        }
                    }

                    if (value === null) {
                        // value still null, take the property default
                        value = properties[key]["default"];
                    }

                    that._properties[key] = value;
                }
            }
        }

        /**
         * Binds Carousel event handling
         *
         * @private
         */
        function bindEvents() {
            if (that._elements["previous"]) {
                that._elements["previous"].addEventListener("click", function() {
                    navigate(getPreviousIndex());
                });
            }

            if (that._elements["next"]) {
                that._elements["next"].addEventListener("click", function() {
                    navigate(getNextIndex());
                });
            }

            var indicators = that._elements["indicator"];
            if (indicators) {
                for (var i = 0; i < indicators.length; i++) {
                    (function(index) {
                        indicators[i].addEventListener("click", function(event) {
                            navigateAndFocusIndicator(index);
                        });
                    })(i);
                }
            }

            if (that._elements["pause"]) {
                if (that._properties.autoplay) {
                    that._elements["pause"].addEventListener("click", onPauseClick);
                }
            }

            if (that._elements["play"]) {
                if (that._properties.autoplay) {
                    that._elements["play"].addEventListener("click", onPlayClick);
                }
            }

            that._elements.self.addEventListener("keydown", onKeyDown);

            if (!that._properties.autopauseDisabled) {
                that._elements.self.addEventListener("mouseenter", onMouseEnter);
                that._elements.self.addEventListener("mouseleave", onMouseLeave);
            }
        }

        /**
         * Handles carousel keydown events
         *
         * @private
         * @param {Object} event The keydown event
         */
        function onKeyDown(event) {
            var index = that._active;
            var lastIndex = that._elements["indicator"].length - 1;

            switch (event.keyCode) {
                case keyCodes.ARROW_LEFT:
                case keyCodes.ARROW_UP:
                    event.preventDefault();
                    if (index > 0) {
                        navigateAndFocusIndicator(index - 1);
                    }
                    break;
                case keyCodes.ARROW_RIGHT:
                case keyCodes.ARROW_DOWN:
                    event.preventDefault();
                    if (index < lastIndex) {
                        navigateAndFocusIndicator(index + 1);
                    }
                    break;
                case keyCodes.HOME:
                    event.preventDefault();
                    navigateAndFocusIndicator(0);
                    break;
                case keyCodes.END:
                    event.preventDefault();
                    navigateAndFocusIndicator(lastIndex);
                    break;
                case keyCodes.SPACE:
                    if (that._properties.autoplay && (event.target !== that._elements["previous"] && event.target !== that._elements["next"])) {
                        event.preventDefault();
                        if (!that._paused) {
                            pause();
                        } else {
                            play();
                        }
                    }
                    if (event.target === that._elements["pause"]) {
                        that._elements["play"].focus();
                    }
                    if (event.target === that._elements["play"]) {
                        that._elements["pause"].focus();
                    }
                    break;
                default:
                    return;
            }
        }

        /**
         * Handles carousel mouseenter events
         *
         * @private
         * @param {Object} event The mouseenter event
         */
        function onMouseEnter(event) {
            clearAutoplayInterval();
        }

        /**
         * Handles carousel mouseleave events
         *
         * @private
         * @param {Object} event The mouseleave event
         */
        function onMouseLeave(event) {
            resetAutoplayInterval();
        }

        /**
         * Handles pause element click events
         *
         * @private
         * @param {Object} event The click event
         */
        function onPauseClick(event) {
            pause();
            that._elements["play"].focus();
        }

        /**
         * Handles play element click events
         *
         * @private
         * @param {Object} event The click event
         */
        function onPlayClick() {
            play();
            that._elements["pause"].focus();
        }

        /**
         * Pauses the playing of the Carousel. Sets {@code Carousel#_paused} marker.
         * Only relevant when autoplay is enabled
         *
         * @private
         */
        function pause() {
            that._paused = true;
            clearAutoplayInterval();
            refreshPlayPauseActions();
        }

        /**
         * Enables the playing of the Carousel. Sets {@code Carousel#_paused} marker.
         * Only relevant when autoplay is enabled
         *
         * @private
         */
        function play() {
            that._paused = false;

            // If the Carousel is hovered, don't begin auto transitioning until the next mouse leave event
            var hovered = false;
            if (that._elements.self.parentElement) {
                hovered = that._elements.self.parentElement.querySelector(":hover") === that._elements.self;
            }
            if (that._properties.autopauseDisabled || !hovered) {
                resetAutoplayInterval();
            }

            refreshPlayPauseActions();
        }

        /**
         * Refreshes the play/pause action markup based on the {@code Carousel#_paused} state
         *
         * @private
         */
        function refreshPlayPauseActions() {
            setActionDisabled(that._elements["pause"], that._paused);
            setActionDisabled(that._elements["play"], !that._paused);
        }

        /**
         * Refreshes the item markup based on the current {@code Carousel#_active} index
         *
         * @private
         */
        function refreshActive() {
            var items = that._elements["item"];
            var indicators = that._elements["indicator"];

            if (items) {
                if (Array.isArray(items)) {
                    for (var i = 0; i < items.length; i++) {
                        if (i === parseInt(that._active)) {
                            items[i].classList.add("cmp-carousel__item--active");
                            items[i].removeAttribute("aria-hidden");
                            indicators[i].classList.add("cmp-carousel__indicator--active");
                            indicators[i].setAttribute("aria-selected", true);
                            indicators[i].setAttribute("tabindex", "0");
                        } else {
                            items[i].classList.remove("cmp-carousel__item--active");
                            items[i].setAttribute("aria-hidden", true);
                            indicators[i].classList.remove("cmp-carousel__indicator--active");
                            indicators[i].setAttribute("aria-selected", false);
                            indicators[i].setAttribute("tabindex", "-1");
                        }
                    }
                } else {
                    // only one item
                    items.classList.add("cmp-carousel__item--active");
                    indicators.classList.add("cmp-carousel__indicator--active");
                }
            }
        }

        /**
         * Focuses the element and prevents scrolling the element into view
         *
         * @param {HTMLElement} element Element to focus
         */
        function focusWithoutScroll(element) {
            var x = window.scrollX || window.pageXOffset;
            var y = window.scrollY || window.pageYOffset;
            element.focus();
            window.scrollTo(x, y);
        }

        /**
         * Retrieves the next active index, with looping
         *
         * @private
         * @returns {Number} Index of the next carousel item
         */
        function getNextIndex() {
            return that._active === (that._elements["item"].length - 1) ? 0 : that._active + 1;
        }

        /**
         * Retrieves the previous active index, with looping
         *
         * @private
         * @returns {Number} Index of the previous carousel item
         */
        function getPreviousIndex() {
            return that._active === 0 ? (that._elements["item"].length - 1) : that._active - 1;
        }

        /**
         * Navigates to the item at the provided index
         *
         * @private
         * @param {Number} index The index of the item to navigate to
         */
        function navigate(index) {
            if (index < 0 || index > (that._elements["item"].length - 1)) {
                return;
            }

            that._active = index;
            refreshActive();

            // reset the autoplay transition interval following navigation, if not already hovering the carousel
            if (that._elements.self.parentElement) {
                if (that._elements.self.parentElement.querySelector(":hover") !== that._elements.self) {
                    resetAutoplayInterval();
                }
            }
        }

        /**
         * Navigates to the item at the provided index and ensures the active indicator gains focus
         *
         * @private
         * @param {Number} index The index of the item to navigate to
         */
        function navigateAndFocusIndicator(index) {
            navigate(index);
            focusWithoutScroll(that._elements["indicator"][index]);
        }

        /**
         * Starts/resets automatic slide transition interval
         *
         * @private
         */
        function resetAutoplayInterval() {
            if (that._paused || !that._properties.autoplay) {
                return;
            }
            clearAutoplayInterval();
            that._autoplayIntervalId = window.setInterval(function() {
                if (document.visibilityState && document.hidden) {
                    return;
                }
                var indicators = that._elements["indicators"];
                if (indicators !== document.activeElement && indicators.contains(document.activeElement)) {
                    // if an indicator has focus, ensure we switch focus following navigation
                    navigateAndFocusIndicator(getNextIndex());
                } else {
                    navigate(getNextIndex());
                }
            }, that._properties.delay);
        }

        /**
         * Clears/pauses automatic slide transition interval
         *
         * @private
         */
        function clearAutoplayInterval() {
            window.clearInterval(that._autoplayIntervalId);
            that._autoplayIntervalId = null;
        }

        /**
         * Sets the disabled state for an action and toggles the appropriate CSS classes
         *
         * @private
         * @param {HTMLElement} action Action to disable
         * @param {Boolean} [disable] {@code true} to disable, {@code false} to enable
         */
        function setActionDisabled(action, disable) {
            if (!action) {
                return;
            }
            if (disable !== false) {
                action.disabled = true;
                action.classList.add("cmp-carousel__action--disabled");
            } else {
                action.disabled = false;
                action.classList.remove("cmp-carousel__action--disabled");
            }
        }
    }

    /**
     * Reads options data from the Carousel wrapper element, defined via {@code data-cmp-*} data attributes
     *
     * @private
     * @param {HTMLElement} element The Carousel element to read options data from
     * @returns {Object} The options read from the component data attributes
     */
    function readData(element) {
        var data = element.dataset;
        var options = [];
        var capitalized = IS;
        capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
        var reserved = ["is", "hook" + capitalized];

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];

                if (key.indexOf(NS) === 0) {
                    key = key.slice(NS.length);
                    key = key.charAt(0).toLowerCase() + key.substring(1);

                    if (reserved.indexOf(key) === -1) {
                        options[key] = value;
                    }
                }
            }
        }

        return options;
    }

    /**
     * Document ready handler and DOM mutation observers. Initializes Carousel components as necessary.
     *
     * @private
     */
    function onDocumentReady() {
        var elements = document.querySelectorAll(selectors.self);
        for (var i = 0; i < elements.length; i++) {
            new Carousel({ element: elements[i], options: readData(elements[i]) });
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var body             = document.querySelector("body");
        var observer         = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // needed for IE
                var nodesArray = [].slice.call(mutation.addedNodes);
                if (nodesArray.length > 0) {
                    nodesArray.forEach(function(addedNode) {
                        if (addedNode.querySelectorAll) {
                            var elementsArray = [].slice.call(addedNode.querySelectorAll(selectors.self));
                            elementsArray.forEach(function(element) {
                                new Carousel({ element: element, options: readData(element) });
                            });
                        }
                    });
                }
            });
        });

        observer.observe(body, {
            subtree: true,
            childList: true,
            characterData: true
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());



$(document).ready(function(){
	$('.social-link-icon-wrapper .fa-facebook-square').click(shareFB);
    $('.social-link-icon-wrapper .fa-twitter-square').click(shareTwitter);
    $('.social-link-icon-wrapper .fa-linkedin-square').click(shareLinkedIn);
/* for height fixing of multiple links */
if('.breadcrumb'){
    $('.breadcrumb .social-link-icon-wrapper').addClass('vertical-middle-align');
    $('.breadcrumb .right-area .side-text').addClass('vertical-middle-align');
    $('.breadcrumb .right-area .social-link-icon-wrapper .side-text').removeClass('vertical-middle-align');
    var liArray=$('.breadcrumb .left-area ol').children('li');
    if(($('.breadcrumb .left-area ol').children('li')) && ($('.breadcrumb .left-area ol').children('li').length>5)){
        var nextPosition=liArray[4];
        $(nextPosition).after("<br>");
    }   
    function leftHeightFun(){
        var leftHeight=$('.breadcrumb .left-area').height();
        $('.breadcrumb .right-area').height(leftHeight);
    }
    setTimeout(leftHeightFun,150);  
}
});

$(document).ready(function(){
        //Polldaddy library
        (function(d,c,j){
            if(!document.getElementById(j)){
                var pd=d.createElement(c),s;
                pd.id=j;
                pd.src=('https:'==document.location.protocol)?'https://polldaddy.com/js/rating/rating.js':'http://i0.poll.fm/js/rating/rating.js';
                s=document.getElementsByTagName(c)[0];
                s.parentNode.insertBefore(pd,s);
            }
        }
        (document,'script','pd-rating-js'));
})
//Version 2.0 - 2016.03.51
var iconMarkerCorporate = '/static/ca/Find%20an%20advisor/images/icon_google-maps_office-building.png';
var iconMarkerStandard = '/content/dam/sunlife/icon_google-maps_expert.png';
var exists = false;
var advisorInfo;
if(typeof(advisorInfoMap) != 'undefined') {
    advisorInfo = advisorInfoMap.map;
}
if(typeof(advisorInfo) !== 'undefined'){
	exists = true;
}
$(document).ready(function () {
    //Get page language
    if($('.row-advisor').length){
        var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
        var loadMap = false;
        var pageLabelData = {
            'en': {	
                'phone' : 'Phone:',
                'cell': 'Cell:',
                'moreinfo' : 'More Info',
                'email': 'Email:'
                },
            'fr': {	
                'phone' : 'TÃ©lÃ©phone :',
                'cell': 'Cellulaire :',
                'moreinfo' : 'Plus dâ€™infos',
                'email': 'Courriel :'
                }
        };
        //rssFeed();	
        if(exists){
        //setupAdvisorBio();
        //setupAdvCookie();
    
        //Google large map link event
        $("#largeGoogleMap").on("click", function(e){
            window.open('//maps.google.com/maps?q=@' + advisorInfo.lat + ',' + advisorInfo.lng + '&hl='+ lang +'&z=14&f=q',null,'width=900,height=600,left=50,top=50,scrollbars=yes,resizable=yes');
            e.preventDefault();
        });
    
        //Init Google map
        function initMap(){
            //Set google map option
            var mapOptions = {
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_TOP
                }    
            };	
            //Create a map
            var map = new google.maps.Map(document.getElementById('GoogleMapDiv'), mapOptions);
    
            //Use lat & lng
            if (advisorInfo.lat != "" && advisorInfo.lng != "" && advisorInfo.lat != "0" && advisorInfo.lng != "0"){	
                createMaker( map );
            }
            //Use Geoorder
            else {
                getGeocoder( map);
            }
        }
    
        //Create Marker 
        function createMaker(map){
            var pos = new google.maps.LatLng(advisorInfo.lat, advisorInfo.lng);
            map.setCenter(pos);
            map.setZoom(14);	 
            
            var advIcon = advisorInfo.type == "ADVISOR" ? iconMarkerStandard : iconMarkerCorporate;
            
            var marker = new google.maps.Marker({position: pos, map :map, icon: advIcon });
            marker.infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'mouseover', function(e) {
               // If we can extract a map from the info window,
               // it's already open.  So, no need to re-open it.
               var infomap = marker.infowindow.getMap();
               if( infomap == null || typeof infomap == "undefined" ){
                var advname = cleanString(advisorInfo.name)  ;
                var addressFormated = cleanString(advisorInfo.address) ;
        
                var mapHtml = "<b>" + advname + "</b><br/>" + addressFormated + "<br/>" ;
                if( undefined!=advisorInfo.phone && advisorInfo.phone!=""){
                    mapHtml = mapHtml + pageLabelData[lang]['phone'] + " " + advisorInfo.phone ;
    
                }
                if( undefined!=advisorInfo.cell && advisorInfo.cell!=""){
                    mapHtml = mapHtml + " | "  + pageLabelData[lang]['cell'] + " " + advisorInfo.cell ;
                }
    
                if( undefined!=advisorInfo.email && advisorInfo.email!=""){
                    mapHtml = mapHtml + "<br/>" + pageLabelData[lang]['email'] +  " " + "<a href='mailto:"+advisorInfo.email+ "'>" +advisorInfo.email+ "</a>";
                }
               marker.infowindow.setContent(mapHtml);
               marker.infowindow.open(map, this);
               }
               });	
        }
        
        function cleanString(input){
            var output = "";
            output = input.replace("\\u00e8","Ã¨").replace("\\u00E8","Ã¨").replace("\\u00e0","Ã ").replace("\\u00e2","Ã¢").replace("\\u00e4","Ã¤").replace("\\u00e7","Ã§").replace("\\u00e9","Ã©").replace("\\u00E9","Ã©").replace("\\u00ea","Ãª").replace("\\u00eb","Ã«").replace("\\u00ee","Ã®").replace("\\u00ef","Ã¯").replace("\\u00f4","Ã´").replace("\\u00f6","Ã¶").replace("\\u00f9","Ã¹").replace("\\u00fb","Ã»").replace("\\u00fc","Ã¼").replace("\\u00AE","Â®").replace("\\u00F4","Ã´");
            
            return output ;
        }
    
        //Geocorder - from address
        function getGeocoder(map){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': advisorInfo.address}, function(results, status) {    
                if (status == google.maps.GeocoderStatus.OK) {
                    //Set the lat / lng
                    advisorInfo.lat = results[0].geometry.location.lat();
                    advisorInfo.lng = results[0].geometry.location.lng();
                    createMaker( map );
                }
                else {
                    //Default location
                    advisorInfo.lat = 57;
                    advisorInfo.lng = -105;
                    createMaker( map );
                }
            });
        }
        }
        //Google map accordion event
        $('#map-title').on("click", function(){
            var asset_title = "hide map";
            if($(this).attr('aria-expanded') == "false"){
                if ( loadMap == false ){
                    googleMapApiInit();
                }
                asset_title = "show map";
            }
            utag.link({
                "asset_type"	: "accordion",
                "asset_title"	: asset_title,
                "event_type"	: "Click",
                "event_title"	: "page interaction",
                "page_section"  : "map"});        
        });
        //Load Google map JS
        function googleMapApiInit() {
            var googleLangs = ["en", "fr"];
            if (!jQuery.inArray(lang, googleLangs)) {
                lang = 'en';
            }
    
            //Load Google api with language
            google.load('maps', '3.x', {
                'other_params': 'client=gme-sunlife&libraries=geometry&language=' + lang,
                'callback': initMap
            });
            loadMap = true;
        }
    
        
    // Setup Advisor Details
    function setupAdvisorBio() {
        var maxChars = 300;
        $('.row-advisor-desc-bio').each(function() {
            var bio = $(this).text();
            if( bio.length > maxChars ) {
                var shortBio = bio.substring(0, maxChars);
                var fullBio = bio.substring(maxChars);
                // If the last char is a space character, we're done.
                for( var x = shortBio.length-1; shortBio[x] !== ' ' && x >= 0; x-- ) {
                    fullBio = shortBio[x] + fullBio;
                    shortBio = shortBio.substring(0, shortBio.length-1);
                }
                // Create More Info button
                var btn = '<a href="#" data-toggle="row-advisor-desc-bio-full" class="row-advisor-desc-bio-toggle">'+pageLabelData[lang]['moreinfo']+'</a>';
                fullBio = '<span class="row-advisor-desc-bio-full">' + fullBio + '</span>';
                $(this).html(shortBio+fullBio+btn);
                // Setup the event handler for the More Info button
                $(this).find('.row-advisor-desc-bio-toggle').on('click', function(e) {
                    e.preventDefault();
                    $(this).siblings($('.'+$(this).data('toggle'))).toggleClass('js-enable');
                    $(this).remove();
                });
            }
        });
    }	
    }
    }
);
$(document).ready(function(){
    $('.accordion-container .cmp-accordion__header').click(function(){
        if($(this).siblings('.accordion-container .cmp-accordion__panel').hasClass('in')){
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion-container .cmp-accordion__panel').removeClass('in');
        }
        else{     
            $('.accordion-container .cmp-accordion__panel').removeClass('in');
            $('.accordion-container .cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion-container .cmp-accordion__panel').addClass('in');
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    });
    $('.expand-collapse .cmp-accordion__header').click(function(){
        if($(this).siblings('.expand-collapse .cmp-accordion__panel').hasClass('in')){
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.expand-collapse .cmp-accordion__panel').removeClass('in');
        }
        else{     
            $(this).siblings('.expand-collapse .cmp-accordion__panel').addClass('in');
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    });
    /* For first open accordion */
    var accLength=$('.accordion-container .cmp-accordion__item').length;
    var acc=$('.accordion-container .cmp-accordion__item');
    if($('.accordion-container').hasClass('first-open')){
        if(accLength>1){
            var firstAcc=acc[0];
            $(firstAcc).find('.cmp-accordion__panel').addClass('in');
            $(firstAcc).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    }
    
    /* for Link list */
    $('.cmp-accordion__panel .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').css('display', 'none');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });
});




$(document).ready(function () {
	$('.editorial-nav-mobile-wrapper .cmp-form-button').addClass('fa fa-chevron-right');
		var pathName= window.location.pathname ;
		$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field').find('option').each(function(){
		var strLink =  $(this).attr('value');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).attr("selected","selected");
		}
	})
	$('.editorial-nav-mobile-wrapper .cmp-form-button').click(function(){
		var link_selected=$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field--drop-down').val();
		window.location.href=link_selected;
		return false;
	});

	 //Sunscribe Pop Up
	 subscribe_popup_form();
	 $(window).resize(function () {
		 subscribe_popup_form();
	 });
 
	 function subscribe_popup_form(){
		 if ($(window).width() > 767)
		 {
			 $('.subscribe-popup-form-wrapper form .text').first().css('width','25%');
			 $('.subscribe-popup-form-wrapper form .text').last().css('width','50%');
		 }
		 else
		 {
			 $('.subscribe-popup-form-wrapper form .text').first().css('width','100%');
			 $('.subscribe-popup-form-wrapper form .text').last().css('width','100%');
		 }
	 }

	 //CTA Form
	cta_form();
	$(window).resize(function () {
		cta_form();
	});

   function cta_form()
   {
	   if ($(window).width() > 1024)
	   {
		   $('.cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');
		   $('.cta-form-wrapper form .cmp-form-button').each(function(){
			$(this).html($(this).val());
           });
	   }
	   else
	   {
		   $('.cta-form-wrapper form .cmp-form-button').html('');
		   $('.cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');
	   }
   }
   //Home CTA Form
   home_cta_form();
   $(window).resize(function () {
	   home_cta_form();
   });
   
  function home_cta_form()
  {
	  if ($(window).width() > 767)
	  {
		  $('.home-cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');
		  $('.home-cta-form-wrapper form .cmp-form-button').each(function(){
			$(this).html($(this).val());
          });
	  }
	  else
	  {
		  $('.home-cta-form-wrapper form .cmp-form-button').html('');
		  $('.home-cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');
	  }
  }

});
