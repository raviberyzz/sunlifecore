/* sign in framework starts here */
$(document).ready(function () {
    /* Get the error code from URL and shows in the proper section of Sign In widget starts here */
    if($(".mySlfSignIn").length>0){
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
        /* Get the error code from URL and shows in the proper section of Sign In widget starts here */
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
        function CheckClicks(lang) {
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
                                $(".mySlfSignIn input[name=SAVEIDSUBMISSION]").val("TRUE");;
                            }
                            $(".mySlfSignIn .form-group #USER").val(id);
                        }
                        //document.form_signon.submit();
                        return true;
                }
        }
        $('input[name="signin"][type="submit"]').click(function(event){
            event.preventDefault();
            CheckClicks('e');
        });
        /* submit validation ends  here */
    }
});
/* sign in framework ends here */