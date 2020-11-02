$(document).ready(function () {
	if (profileData && typeof ContextHub !== "undefined") {
		ContextHub.removeItem('profile');
		ContextHub.setItem('profile', profileData);
		//var userProfile = ContextHub.getItem('profile');
		//var userName = userProfile.displayName;
		$('.utility-nav-links ul[role="navigation"] li:first-child a').text(Granite.I18n.get('welcome') + " " + userName);
	}
})