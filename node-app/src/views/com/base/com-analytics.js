$(document).ready(function () {
    /* baseline video analytics starts here */
    if($('.video_container').length>0){
        let videoScript = document.createElement('script');
        videoScript.type="text/javascript";
		videoScript.setAttribute('src', '/static/slfglobal/globalweb/responsive/scripts/vidyard_event_listener.js');
        $('head')[0].appendChild(videoScript);
    }
    /* baseline video analytics ends here */
    /* baseline error 404 page starts here */
    if(utag_data.page_canonical_url.indexOf('/error/404')!=-1){
        utag_data.page_canonical_url=window.location.hostname+window.location.pathname;
        utag_data.page_canonical_url_default=window.location.hostname+window.location.pathname;
    }
    /* baseline error 404 page ends here */
});