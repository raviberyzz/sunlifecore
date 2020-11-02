$(document).ready(function(){
     if( typeof utag_data != 'undefined' && utag_data != null && typeof userProfileHome != 'undefined' && userProfileHome != null ){
		 if (typeof ContextHub !== "undefined") {
			var profileStore   = ContextHub.getStore('profile');
			var requestUser    = profileData.path;
			var contextHubUser = profileStore.getTree().path;
			if (!contextHubUser || contextHubUser !== requestUser) {
				ContextHub.removeItem('profile');
				ContextHub.setItem('profile', profileData);
			}
			//var userProfile = ContextHub.getItem('profile');
			//var userName = userProfile.displayName;
			$('.utility-nav-links ul[role="navigation"] li:first-child a').text(Granite.I18n.get('welcome') + " " + userName);
		}
     }
})