$(document).ready(function(){
     if( typeof utag_data != 'undefined' && utag_data != null && typeof userInfo != 'undefined' && userInfo != null ){
         utag_data['user_buildinglocation'] = userInfo.buildingLocation;
		 utag_data['user_businessgroup'] = userInfo.businessGroup;
		 utag_data['user_businessunit'] = userInfo.businessUnit;
		 utag_data['user_fullname'] = userInfo.userName;
		 utag_data['user_joblevel'] = userInfo.jobLevel;
		 utag_data['user_userid'] = userInfo.acf2;
     }
})