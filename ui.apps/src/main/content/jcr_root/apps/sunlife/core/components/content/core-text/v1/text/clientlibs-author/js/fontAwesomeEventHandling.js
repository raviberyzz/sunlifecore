/**
 * fontAwesomeEventHandling.js
 * @fileOverview Handles focus and blur events on the RTE editor. Inserts a '&nbsp;' character after a fontAwesome icon on focus event 
 * and removes it on the blur event to allow for font selection.
 */
(function ($) {
    "use strict";

    /**
     * When rich text editor is in focus, add a space after any fontAwesome <svg> or <span> tag.
     */
    $(document).on('focus','.cq-RichText-editable', function(){
        let svgElement = $('.cq-RichText-editable').find('svg:last');
        if($(svgElement).parent().get(0)){
            modifySpaceAfterElement(svgElement,"</svg>","<\\/svg>","insert");
        }
        let spanElement = $('.cq-RichText-editable').find('span:last');
        if(spanElement.hasClass('font-awesome-icon')){
            modifySpaceAfterElement(spanElement,"</span>", "<\\/span>","insert");
        }
    });

    /**
     * when rich text editor is blurred, remove any added space after <svg> or <span> tags.
     */
    $(document).on('blur','.cq-RichText-editable', function(){
 		let svgElement = $('.cq-RichText-editable').find('svg:last');
        if($(svgElement).parent().get(0)){
            modifySpaceAfterElement(svgElement,"</svg>","<\\/svg>","remove");
        }
		let spanElement = $('.cq-RichText-editable').find('span:last');
        if(spanElement.hasClass('font-awesome-icon')){
            modifySpaceAfterElement(spanElement,"</span>", "<\\/span>","remove");
        }
 	});

    /**
    * Function to add or remove a space after an <svg> or <span> tag.   
    * @param {String} element Target element
    * @param {String} endTag The end tag to modify
    * @param {String} expression Regex expression
    * @param {String} action The Action to execute; either 'insert' or 'remove'
    * @return void
    */

    function modifySpaceAfterElement(element, endTag, expression, action){
		let elementParent =  $(element).parent().get(0);
		if(elementParent.innerHTML){
			let elementParentInnerHTML = elementParent.innerHTML;
			let suffix = "&nbsp;";
			if(action === 'remove'){
				endTag = endTag + suffix;
				expression = expression + suffix;
				suffix = "";
			}
			if(elementParentInnerHTML.indexOf(endTag) > -1 ){
				let regex = new RegExp(expression, 'g');
				if(action === 'remove'){
                   endTag = endTag.replace("&nbsp;","");
				}
				$(elementParent).html(elementParentInnerHTML.replace(regex, endTag+suffix));
			}
		}
    }

})(Granite.$, Granite);