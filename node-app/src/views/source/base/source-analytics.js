/* Source accessibility starts here */
$(document).ready(function(){
	$("#SignIn,#signinbutton").unbind("click");
	/* Removing sign-in refrence starts here */
    if($('.desktop-utility-nav a').attr('href')=='#signinbutton'){
        $('.desktop-utility-nav a[href="#signinbutton"]').remove();
    }
    /* Removing sign-in refrence ends here */
    /* Find people search starts here */
    $('#SignIn,#find-people-button-header,#find-people-button-div,#directory_search').click(function(){
        utag.link({
            ev_type: 'other',
            ev_action: 'clk',
            ev_title: 'find-people-search'
        });      
    });
	/* Find people search ends here */
});
/* Source accessibility ends here */