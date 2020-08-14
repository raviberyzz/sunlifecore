$(document).ready(function(){
    var userProfile = JSON.parse(localStorage.getItem("ContextHubPersistence"));
    var userName = userProfile.store.profile.displayName;
   $('.utility-nav-links ul[role="navigation"] li:first-child a').text("welcome" + " " + userName);
})