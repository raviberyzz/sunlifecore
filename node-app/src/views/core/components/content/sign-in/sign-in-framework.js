/* sign in framework starts here */
$(document).ready(function () {
   //domain matching for submitting
    function domain() {
        // get host from variable defined in signin.js
        // it is assumed to be defined, if not, then default to prod
        var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
        if (host === null || host === undefined) {
            host = "https://www.sunnet.sunlife.com";
        }   
        // update all the domains
        var signinWidget = $('.mySlfSignIn').html();
        var newString = signinWidget.replace (/(https?:\/\/)(.*?)(\/+?)/g, host + '$3');
        $('.mySlfSignIn').html(newString);   
        // re-initialize these functions
        //signinbuttonclick();	
        // this not getting triggered on shown, so call it explicitly, here
        updateSignInForm('form_signon');
    }
    /* Get the error code from URL and shows in the proper section of Sign In widget starts here */
    if($(".mySlfSignIn").length>0){
        domain();
        function showSignInError() {
            /* Get value of URL parameter */
            function getParameter(param) { 
                var params = window.location.search.substr(1).split('&');            //search=> ?
                for (var i = 0; i < params.length; i++) {
                var p=params[i].split('=');
                    if (p[0] == param) {
                        return decodeURIComponent(p[1]);
                    }
                }
                return false;
            }
            $(".has-error").removeClass("has-error");
            let errorCode = getParameter('EC');
            let errorMSG = $("#generalError").text();
            $("#generalError").html($("#generalError").html().replace(">&nbsp;<","><"));
            $("#generalError").html($("#generalError").html().replace(">&#160;<","><"));
            if($(errorCode).length != 0){
                if (errorMSG.trim() != "") {
                    if ((errorCode != false) && ((errorCode.indexOf("SLSC0012") != -1) || (errorCode.indexOf("SLSC0013") != -1) || (errorCode.indexOf("SLNV0001") !=-1))) {
                        $("#accessIdError").parent().addClass("has-error");
                        $("#accessIdError").html(errorMSG);
                    } else if ((errorCode != false) && (errorCode.indexOf("SLNV0003") != -1)) {
                        $("#passwordError").parent().addClass("has-error");
                        $("#passwordError").html(errorMSG);
                    } else {
                        $("#generalError").parent().addClass("has-error");
                    }               
                } 
            }                     
        }
        showSignInError();
        /* Get the error code from URL and shows in the proper section of Sign In widget ends here */
        /* checking the checkbox on initial load if access id is there*/
        function checkbox(){
            if($(".mySlfSignIn #USER").val()!=undefined && $(".mySlfSignIn #USER").val().length>0){
                $(".mySlfSignIn #rememberID").prop("checked",true);
            }
        }
        setTimeout(checkbox,500);
        /* submit validation starts here */
        /*function initForm() {
                if (document.form_signon.USER.disabled == false) {
                        if (document.form_signon.USER.value != '') {
                                document.form_signon.PASSWORD.focus();
                        } else {
                                document.form_signon.USER.focus();
                        }
                }
                document.form_signon.SAVEIDSUBMISSION.value = "FALSE";
        }*/
        var isSubmitted=false;
        function CheckClick(lang) {
                if( isSubmitted == true ) {
                        if (lang=="f")
                            alert('Veuillez patienter pendant que nous soumettons vos renseignements.');
                        else
                            alert('Please wait while we submit your information');
                        return false;
                } else {
                    isSubmitted = true;
                        var idField,id,i,IsSaveId=false,idLen;
                        idField=document.form_signon.USER;
                        id=$(".mySlfSignIn .form-group #USER").val();
                        if(id && id!=undefined && id!=null){
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
                                $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("TRUE");
                            }
                            $(".mySlfSignIn .form-group #USER").val(id);
                        }
                        //document.form_signon.submit();
                        return true;
                }
        }
        $('.mySlfSignIn input[name="signin"][type="submit"]').click(function(event){
            parsleyAnalytics(event); 
            var $form = $('.mySlfSignIn #form_signon');
            $form.parsley().validate();     
            if ($(".mySlfSignIn #form_signon").parsley().isValid()) {
                let lang=$('html').attr('lang');
                if(lang=='fr'){
                    CheckClick('f');
                }else{
                    CheckClick('e');
                }
            }           
        });
        /* submit validation ends  here */
    }
    //remember me function;
    $(".mySlfSignIn #rememberID").click(function(event){
        if($(this).prop("checked") == false){
            if (document.getElementsByName('ESAVEID')[0].value.length > 0) {
                window.top.location.href = "saveIDRemoveConfirm.wca";
            }
            $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("FALSE");
        }else{
            $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("TRUE");
        }
    });
    //to add classes for flex container to push first div in mobile view
    if($('.mySlfSignIn').length>0){
        $('.mySlfSignIn').closest('.row').addClass('flex-layout-container');
    }

/* sign in framework ends here */
/* mobile app badge logo styling starts here */
    if($('.mySlfSignIn .download-app-wrapper .mobile-app-text img').length>0){
        $('.mySlfSignIn .download-app-wrapper .mobile-app-text').addClass('app-logo');
    }
    if($('.mySlfSignIn').length>0){
        if(($('.mySlfSignIn .download-app-wrapper .mobile-app-text').children().length==undefined) ||
        ($('.mySlfSignIn .download-app-wrapper .mobile-app-text').children().length==0)){
            $('.mySlfSignIn .download-app').addClass('no-text');
        }
    }
/* mobile app badge logo styling ends here */
/* blank errorredirect path starts here */
if($('.mySlfSignIn').length>0){
    if(($('.mySlfSignIn #form_signon input[name="ERRORREDIRPATH"]').attr('value').trim()=='') ||
    ($('.mySlfSignIn #form_signon input[name="ERRORREDIRPATH"]').attr('value').trim()==String.fromCharCode(160)||
    ($('.mySlfSignIn #form_signon input[name="ERRORREDIRPATH"]').attr('value').trim()=='&nbsp;'))){
        let relativePath=window.location.pathname;
        $('.mySlfSignIn #form_signon input[name="ERRORREDIRPATH"]').attr('value',relativePath);
    }
}
/* blank errorredirect path ends here */
/* sign in framework accessibility starts here */
// remember me checkbox enter function
$(".mySlfSignIn #rememberID").keydown(function(e){
    if (e.which==13 ) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let check=$('.mySlfSignIn #rememberID');
        if(check.prop("checked")== false) {
            check.prop("checked",true); 
        }
        else {
            check.prop("checked",false);    
        }
        if($('.mySlfSignIn #rememberID').prop("checked") == false){
            if (document.getElementsByName('ESAVEID')[0].value.length > 0) {
                window.top.location.href = "saveIDRemoveConfirm.wca";
            }
            $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("FALSE");
        }else{
            $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("TRUE");
        }
    }
});
/* skip to sign in option for no sign in component page*/
    if($('body').hasClass('signin-content-page') || $('body').hasClass('signin-home-page')){
        if(!($('.mySlfSignIn').length)){
            if($('.desktop-utility-nav a').attr('href')=='#slfSignIn'){
				$('.desktop-utility-nav a[href="#slfSignIn"]').remove();
            }
        }
    }
/* sign in framework accessibility ends here */
/* Iframe accessibility starts here */
    if($('iframe').length>0){
        let attr=$('iframe').attr('frameborder');
        if(attr!=undefined && attr ){
            $('iframe').removeAttr('frameborder');
        }
    }
/* Iframe accessibility ends here */
//pushing the function to home button o=f sign out page
    let pageLang=$('html').attr('lang');
    if($('span.sign-out-link').length>0){
        if(pageLang=='fr'){
            $('span.sign-out-link').attr('onclick','getCSIUrl("fr")');
        }else{
            $('span.sign-out-link').attr('onclick','getCSIUrl("en")');
        }
    }
});
/* signout fucntionality starts here */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}
function getCSIUrl(lang){
    var cookie = readCookie('CCS');
    var domain = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    var urlPrefix;
    if(port != ""){
        urlPrefix = protocol + '//' + domain + ':' + port;
    } 
    else {
        urlPrefix = protocol + '//' + domain;
    }
    var eURL = '/signin/mysunlife/home.wca';
    var fURL = '/signin/masunlife/home.wca';
    if(cookie != null) {
        var vars = cookie.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(unescape(pair[0]) == 'CSISigninURLe'){
                if (unescape(pair[1]).indexOf(urlPrefix) > -1){
                    eURL = unescape(pair[1]);
                }else{
                    eURL = urlPrefix + unescape(pair[1]);
                }
            } else if(unescape(pair[0]) == 'CSISigninURLf') {
                if (unescape(pair[1]).indexOf(urlPrefix) > -1){
                    fURL = unescape(pair[1]);
                } else {
                    fURL = urlPrefix + unescape(pair[1]);
                }
            }
        }
    }
    if(lang == 'en'){
        window.open(eURL,'_self');
    }else {
        window.open(fURL,'_self');
    }
}
/* signout fucntionality ends here */