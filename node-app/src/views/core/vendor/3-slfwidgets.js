// V1.1 Nov 23, 2015 - a211
/* advisor match & region selection forms  */
function amSubmit(){
	var $input = $("#find-advisor-surname");
	var $name = $input.val();
	if(isValidName($name) && !isEmpty($name)){
		$("#advisorMatch").submit();
	} else {
		$input.closest('.form-group').addClass('has-error');
		var helpBlock = $input.closest('form').find('.help-block');
		helpBlock.removeClass('hidden').html( helpBlock.data("msg"));		
		$input.css('margin-bottom', 0);
		return false;	
	}
}
function regionSubmit(){
	var $input = $("#find-advisor-region");
	var $name = $input.val();
	if(isEmpty($name)){
		$input.closest('.form-group').addClass('has-error');
		var helpBlock = $input.closest('form').find('.help-block');
		helpBlock.removeClass('hidden').html( helpBlock.data("msg"));		
		return false;
	} else {
		$("#financialCenter").submit();
	}
}
$('[name=advisorMatch]').on('submit', function(e){
	if ( amSubmit() == false ){
		e.preventDefault();	
	}	
}); 
	
	$('[name=financialCenter]').on('submit', function(e){
	if ( regionSubmit() == false ){
		e.preventDefault();	
	}	
});