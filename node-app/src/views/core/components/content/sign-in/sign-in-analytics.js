/* sign in framework analytics starts here */
/* inserting error code in url for credential and server validation starts here */
function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split('&');
    for(let i=0; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
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
}
/* inserting error code in url for credential and server validation ends here */
function parsleyAnalytics(event){
    // for only no userId
    let csi="signin - csi \\";
    if(($('.mySlfSignIn #PASSWORD').val()!='' && $('.mySlfSignIn #USER').val()=='') ||
     ($('.mySlfSignIn #PASSWORD').val()!=null && $('.mySlfSignIn #USER').val()==null)){
         let EC='slnv0001';
         let UrlEC='SLNV0001';
        utag.link({
            "ev_action": "onpage_impr",
            "ev_data_one": csi+utag_data.page_subcategory,
            "ev_data_two": "username required - "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
        insertParam('EC', UrlEC);
    }
    //for only no password
    if(($('.mySlfSignIn #PASSWORD').val()=='' && $('.mySlfSignIn #USER').val()!='') ||
     ($('.mySlfSignIn #PASSWORD').val()==null && $('.mySlfSignIn #USER').val()!=null)){
         let EC='slnv0003';
         let UrlEC='SLNV0003';
        utag.link({
            "ev_action": "onpage_impr",
            "ev_data_one": csi+utag_data.page_subcategory,
            "ev_data_two": "password required - "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
        insertParam('EC', UrlEC);
    }
    //for no userID and password
    if(($('.mySlfSignIn #PASSWORD').val()=='' && $('.mySlfSignIn #USER').val()=='') ||
     ($('.mySlfSignIn #PASSWORD').val()==null && $('.mySlfSignIn #USER').val()==null)){
         let EC='slnv0004';
         let UrlEC='SLNV0004';
        utag.link({
            "ev_action": "onpage_impr",
            "ev_data_one": csi+utag_data.page_subcategory,
            "ev_data_two": "not entering any credentials - "+EC,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
        insertParam('EC', UrlEC);
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
    let errorCode = getParameter('EC');   
    // invalid user id or password combination
    if ((errorCode!=false) && (errorCode.indexOf("SLSC0099") != -1)){
        errorCode=errorCode.trim();
        let csi="signin - csi \\";
        utag.link({
            "ev_action": "onpage_impr",
            "ev_data_one": csi+utag_data.page_subcategory,
            "ev_data_two": "invalid pw/username combination - "+errorCode,
            "ev_title": "signin - "+utag_data.page_category,
            "ev_type": "other"
        });
    }
});
/* sign in framework analytics ends here */