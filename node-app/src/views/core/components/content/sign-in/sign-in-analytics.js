/* sign in framework analytics starts here */
/* inserting error code in url for credential and server validation starts here */
/*function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split('&');
    for(let i=0; i<kvp.length; i++){
        if (kvp[i].indexOf(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }
    // if(i >= kvp.length){
    //     kvp[kvp.length] = [key,value].join('=');
    // }
    kvp=[key,value].join('=');
    let params='';
    let path = window.location.pathname;
    let pageName = path.split("/").pop();
    pageName=pageName.split('?')[0];
    params=pageName+'?'+kvp;
    params=params.replace(',','');
    window.history.replaceState(null, null, params);
    // reload page with new params
    //document.location.search = params;
}*/
function updateQueryStringParameter(key, value) {
    let uri=(location.pathname+location.search).substr(1);
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      let param= uri.replace(re, '$1' + key + "=" + value + '$2');
      param = param.split("?").pop();
      param='?'+param;
      console.log(param);
      window.history.replaceState(null, null, param);
    }
    else {
      let param=uri + separator + key + "=" + value;
      param = param.split("?").pop();
      param='?'+param;
      console.log(param);
      window.history.replaceState(null, null, param);
    }
  }
/* inserting error code in url for credential and server validation ends here */
// this function is kicked off on sign in button click from the sign-in-framework.js file
function parsleyAnalytics(event){
    // for any sign in attempt this tag will be kicked off regardless of error code to track everytime any sign in is attempted
    utag.link({
		"ev_type": "authenticate",
		"ev_action": "signin",
		"ev_title": "AEM sign in - attempt"
	});
    // for only no userId
    let csi="signin - csi - ";
    if(($('.mySlfSignIn #PASSWORD').val()!='' && $('.mySlfSignIn #USER').val()=='') ||
     ($('.mySlfSignIn #PASSWORD').val()!=null && $('.mySlfSignIn #USER').val()==null)){
         let EC='slnv0001';
         let UrlEC='SLNV0001';
         utag.link({ 
            "ev_action": "onpage_impr", 
            "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
            "ev_data_two": "error- username required: "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });       
        updateQueryStringParameter('EC',UrlEC);        
    }
    //for only no password
    if(($('.mySlfSignIn #PASSWORD').val()=='' && $('.mySlfSignIn #USER').val()!='') ||
     ($('.mySlfSignIn #PASSWORD').val()==null && $('.mySlfSignIn #USER').val()!=null)){
         let EC='slnv0003';
         let UrlEC='SLNV0003';
         utag.link({ 
            "ev_action": "onpage_impr", 
            "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
            "ev_data_two": "error- password required: "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
        updateQueryStringParameter('EC',UrlEC);
    }
    //for no userID and password
    if(($('.mySlfSignIn #PASSWORD').val()=='' && $('.mySlfSignIn #USER').val()=='') ||
     ($('.mySlfSignIn #PASSWORD').val()==null && $('.mySlfSignIn #USER').val()==null)){
         let EC='slnv0004';
         let UrlEC='SLNV0004';
         utag.link({ 
            "ev_action": "onpage_impr", 
            "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
            "ev_data_two": "error- not entering any credentials: "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
        updateQueryStringParameter('EC',UrlEC);
    }
}
$(document).ready(function (){
    function getParameter(param) { 
        var params = window.location.search.substr(1).split('&');
        for (var i = 0; i < params.length; i++) {
        var p=params[i].split('=');
            if (p[0] == param) {
                return decodeURIComponent(p[1]);
            }
        }
        return false;
    }
    
    function analyticsTrigger(){
        let errorCode = getParameter('EC');
        let refer = getParameter('refer');
    /* normal sunnet domain analytics starts here */
    // for no UserId only
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0001") != -1) && (refer==false)){
            errorCode=errorCode.trim();
            let EC='slnv0001';
            utag.link({ 
                "ev_action": "onpage_impr", 
                "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
                "ev_data_two": "error- username required: "+EC,
                "ev_title": "signin - "+utag_data.page_category,
                "ev_type": "other"
            });
        }
        //for no Password only
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0003") != -1) && (refer==false)){
            errorCode=errorCode.trim();
            let EC='slnv0003';
            utag.link({ 
                "ev_action": "onpage_impr", 
                "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
                "ev_data_two": "error- password required: "+EC,
                "ev_title": "signin - "+utag_data.page_category,
                "ev_type": "other"
            });
        }
        //for no userID and password both
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0004") != -1) && (refer==false)){
            errorCode=errorCode.trim();
            let EC='slnv0004';
            utag.link({ 
                "ev_action": "onpage_impr", 
                "ev_data_one": "signin - csi - "+utag_data.page_subcategory,
                "ev_data_two": "error- not entering any credentials: "+EC,
                "ev_title": "signin - "+utag_data.page_category,
                "ev_type": "other"
            });
        }
        // invalid user id or password combination
        if ((errorCode!=false) && (errorCode.indexOf("SLSC0099") != -1)  &&(refer==false)){
            errorCode=errorCode.trim();
            let csi="signin - csi - ";
            let EC='slsc0099';
            utag.link({
                "ev_action": "onpage_impr",
                "ev_data_one": csi+utag_data.page_subcategory,
                "ev_data_two": "error- invalid pw/username combination: "+EC,
                "ev_title": "signin - "+utag_data.page_category,
                "ev_type": "other"
            });
            
        }
        /* normal sunnet domain analytics starts here */
        /* CaHome referer starts here */
        // for only no userID
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0001") != -1) && (refer!=undefined && refer!=false)){
            if(refer.indexOf("caHome") != -1){
                errorCode=errorCode.trim();
                let EC='slnv001';
                utag.link({
                    "ev_action": "onpage_impr", 
                    "ev_data_one": "signin - csi - sunlife.ca", 
                    "ev_data_two": "error- username required: "+EC,
                    "ev_title": "signin – sunlife.ca",
                    "ev_type": "other"
                });
            }
        }
        //for no password only
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0003") != -1) && (refer!=undefined && refer!=false)){
            if(refer.indexOf("caHome") != -1){
                errorCode=errorCode.trim();
                let EC='slnv0003';
                utag.link({
                    "ev_action": "onpage_impr", 
                    "ev_data_one": "signin - csi - sunlife.ca", 
                    "ev_data_two": "error- password required: "+EC,
                    "ev_title": "signin – sunlife.ca",
                    "ev_type": "other"
                });
            }
        }
        // for no userId and password Both
        if ((errorCode!=false) && (errorCode.indexOf("SLNV0004") != -1) && (refer!=undefined && refer!=false)){
            if(refer.indexOf("caHome") != -1){
                errorCode=errorCode.trim();
                let EC='slnv0004';
                utag.link({
                    "ev_action": "onpage_impr", 
                    "ev_data_one": "signin - csi - sunlife.ca", 
                    "ev_data_two": "error- not entering any credentials: "+EC,
                    "ev_title": "signin – sunlife.ca",
                    "ev_type": "other"
                });
            }
        }
        //for wrong userID and password combination
        if ((errorCode!=false) && (errorCode.indexOf("SLSC0099") != -1) && (refer!=undefined && refer!=false)){
            if(refer.indexOf("caHome") != -1){
                errorCode=errorCode.trim();
                let EC='slsc0099';
                utag.link({
                    "ev_action": "onpage_impr", 
                    "ev_data_one": "signin - csi - sunlife.ca", 
                    "ev_data_two": "error- invalid pw/username combination: "+EC,
                    "ev_title": "signin – sunlife.ca",
                    "ev_type": "other"
                });
            }
        }
        /* CaHome referer ends here */
    }
    setTimeout(analyticsTrigger,500);
});
/* sign in framework analytics ends here */