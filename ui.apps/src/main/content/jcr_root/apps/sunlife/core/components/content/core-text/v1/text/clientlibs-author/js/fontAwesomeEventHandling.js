/**
 * fontAwesomeEventHandling.js
 * @fileOverview Handles focus event on the RTE editor. Inserts a '&nbsp;' character after  
 * the last fontAwesome icon on focus event to allow for font selection.
 */
(function ($) {
    "use strict";

    /**
     * When rich text editor is in focus, add a space after any fontAwesome <svg> or <span> tags.
     */
    $(document).on('focus','.cq-RichText-editable', function(){
        setTimeout(function() { 
            const $svgElement = $('.cq-RichText-editable').find('svg:last');
            if($($svgElement).parent().get(0)){
                modifySpaceAfterElement($svgElement,"</svg>","<\\/svg>");
            }
            const $spanElement = $('.cq-RichText-editable').find('span:last');
            if($spanElement.hasClass('font-awesome-icon')){
                modifySpaceAfterElement($spanElement,"</span>", "<\\/span>");
            }
        }, 500);
    });

    /**
    * Function to add a space after an <svg> or <span> tag.   
    * @param {String} element Target element
    * @param {String} endTag The end tag to modify
    * @param {String} expression Regex expression
    * @return void
    */

    function modifySpaceAfterElement(element, endTag, expression){
       const $elementParent =  $(element).parent().get(0);
       if($elementParent.innerHTML){
           const $elementParentInnerHTML = $elementParent.innerHTML;
 		   const suffix = "&nbsp;";
           if($elementParentInnerHTML.indexOf(endTag+suffix) === -1  && $elementParentInnerHTML.indexOf(endTag) > -1){
                const regex = new RegExp(expression, 'g');
                $($elementParent).html($elementParentInnerHTML.replace(regex, endTag+suffix));
           }
       }
    }

})(Granite.$, Granite);