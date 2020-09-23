$(document).ready(function(){
    if(utag_data != null && utag_data != undefined && userInfo != null){
        utag_data['email'] = userInfo.email;
    }
})