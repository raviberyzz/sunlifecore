$(document).ready(function(){
	var contextHubData = localStorage.getItem("ContextHubPersistence");
    if(contextHubData) {
		var userProfile = JSON.parse(localStorage.getItem("ContextHubPersistence"));
		var userName = userProfile.store.profile.displayName;
		$('.utility-nav-links ul[role="navigation"] li:first-child a').text("Welcome" + " " + userName);
	}
})