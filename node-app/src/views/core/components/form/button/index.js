//Adding role=button
$('span').each(function () {
	var checkspan = ($("span").hasClass("button-class"));
	if(checkspan) {
        $("span.button-class").parent().attr("role","button");
    }
});