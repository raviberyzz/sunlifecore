//Adding role=button
$('span').each(function () {
	var checkspan = ($("span").hasClass("button-class"));
	if(checkspan) {
        console.log(checkspan);
         $("span.button-class").attr("role","button");

    }
});