$(document).ready(function () {
    /* baseline video analytics starts here */
    if($('.video_container').length>0){
        let videoScript = document.createElement('script');
        videoScript.type="text/javascript";
		videoScript.setAttribute('src', '/content/dam/sunlife/legacy/assets/slfglobal/globalweb/responsive/scripts/vidyard_event_listener.js');
        $('head')[0].appendChild(videoScript);
    }
    /* baseline video analytics ends here */
    /* baseline error 404 page starts here */
    if(utag_data.page_canonical_url.indexOf('/error/404')!=-1){
        var error_script = document.createElement('script');
        error_script.type = 'text/javascript';
        error_script.text = 'utag_data["page_canonical_url"] ="'+window.location.hostname+window.location.pathname+'"; \n \
                        utag_data["page_canonical_url_default"] ="'+window.location.hostname+window.location.pathname+'";';
        let syncTag=$('head script[src^="//tags.tiqcdn.com/utag/sunlife/"][src$="utag.sync.js"]');
        //document.head.appendChild(error_script);
        if(syncTag.length>0){
            syncTag.before(error_script);
        }
    }
    /* baseline error 404 page ends here */
    /* Modal forgot password starts here */
    $('#userIdForgot').click(function(){        
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: "forgot password"
        });            
    });
    /* Modal forgot password ends here */
    /* Modal register now analytics starts here */
    $('#userIdRegiste').click(function(){
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: "register now"
        });        
    });
    /* Modal register now analytics ends here */

});
/* Successful modal login starts here */
function successLoginAnalytics(){
    utag.link({ 
        ev_type: "authenticate", 
        ev_action: "clk", 
        ev_title: "sign in", 
        ev_data_one: "login successful"
    }); 
}
/* Successful modal login ends here */