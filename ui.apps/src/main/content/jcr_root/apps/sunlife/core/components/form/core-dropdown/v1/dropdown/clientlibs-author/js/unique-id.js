(function($, $document) {

    "use strict"
    $(document).on('dialog-ready', function() { 
        if (!$('.unique-id[name="./id"]').val()) {
            assignRandomValue();
        }
    });
 
    function makeid() {
        let result = '';
        const charactersLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersNumbers = '0123456789';
        const charactersLettersLength = charactersLetters.length;
        const charactersNumbersLength = charactersNumbers.length;
        let counter = 0;
		
        while (counter < 3) {
          result += charactersLetters.charAt(Math.floor(Math.random() * charactersLettersLength));
          counter += 1;
        }

        while (counter < 6) {
          result += charactersNumbers.charAt(Math.floor(Math.random() * charactersNumbersLength));
          counter += 1;
        }

        return result;
	}
 
    function assignRandomValue() {
        var i = makeid();
        $('.unique-id[name="./id"]').attr("value",i);
    }

})($, $(document));