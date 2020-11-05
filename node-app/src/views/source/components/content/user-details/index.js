$(document).ready(function () {
	if (profileData && typeof ContextHub !== "undefined") {
		//var userProfile = ContextHub.getItem('profile');
		//var userName = userProfile.displayName;
		var welcomeText = $('.utility-nav-links ul[role="navigation"] li:first-child a').text();
		$('.utility-nav-links ul[role="navigation"] li:first-child a').text(welcomeText + " " + userName);
	}
})