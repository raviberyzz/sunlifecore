$(document).ready(function(){
/* Find people search starts here */
    $('#find-people-button-header,#directory_search').click(function(){
        utag.link({
            ev_type: 'other',
            ev_action: 'clk',
            ev_title: 'find-people-search'
        });      
    });
/* Find people search ends here */
});