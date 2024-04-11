(function ($) {
    "use strict";

    //when rich text editor is in focus, add a space after any fontAwesome <svg> or <span> tags to allow for font selection
    $(document).on('focus','.cq-RichText-editable', function(){
        let svgElement = $('.cq-RichText-editable').find('svg:last');
        if($(svgElement).parent().get(0)){
			let svgParent =  $(svgElement).parent().get(0);
            let svgParentInnerHTML = svgParent.innerHTML;
            if(svgParentInnerHTML.indexOf("</svg>") > -1 ){
                $(svgParent).html(svgParentInnerHTML.replace(/<\/svg>/g, '</svg>&nbsp;'));
            }
        }
        let spanElement = $('.cq-RichText-editable').find('span:last');
        if(spanElement.hasClass('font-awesome-icon')){
			let spanParent =  $(spanElement).parent().get(0);
            if(spanParent.innerHTML){
                let spanParentInnerHTML = spanParent.innerHTML;
                if(spanParentInnerHTML.indexOf("</span>") > -1 ){
                    $(spanParent).html(spanParentInnerHTML.replace(/<\/span>/g, '</span>&nbsp;'));
                }
            }
        }
    });

    //when rich text editor is blurred, remove any added space after <svg> or <span> tags
    $(document).on('blur','.cq-RichText-editable', function(){
 		let svgElement = $('.cq-RichText-editable').find('svg:last');
        if($(svgElement).parent().get(0)){
			let svgParent =  $(svgElement).parent().get(0);
            let svgParentInnerHTML = svgParent.innerHTML;
            if(svgParentInnerHTML.indexOf("</svg>&nbsp;") > -1 ){
                $(svgParent).html(svgParentInnerHTML.replace(/<\/svg>&nbsp;/g, '</svg>'));
            }
        }
		let spanElement = $('.cq-RichText-editable').find('span:last');
        if(spanElement.hasClass('font-awesome-icon')){
			let spanParent =  $(spanElement).parent().get(0);
            if(spanParent.innerHTML){
                let spanParentInnerHTML = spanParent.innerHTML;
                if(spanParentInnerHTML.indexOf("</span>&nbsp;") > -1 ){
                    $(spanParent).html(spanParentInnerHTML.replace(/<\/span>&nbsp;/g, '</span>'));
                }
            }
        }
 	});

})(Granite.$, Granite);