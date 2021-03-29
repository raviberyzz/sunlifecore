$(document).ready(function () {

    function userName(){
        if($('.adv-search-bar-wrapper')){
             var searchTxt = $('.search-heading').text();
                var firstWord= searchTxt.replace(/ .*/,'')
               var replaceTxt = firstWord + " " + profileData.givenName;
                var userNameHeading = searchTxt.replace(firstWord, replaceTxt);
              $('.search-heading').text(userNameHeading);
        }
    }

    setTimeout(userName,2000)
})