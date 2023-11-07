const CONST = {
	SELECTOR: {
		externalLink: '.cmp-text .sl-link-external',
		internalLink: '.cmp-text .sl-link-internal',
		pdfLink: '.cmp-text .sl-link-pdf'
	}
}

const TextComp = {
	init: function () {
		TextComp.onDOMready();

		var popoverTriggerList = [].slice.call(document.querySelectorAll('.cmp-text [data-bs-toggle="popover"'))
			var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl)
		})
		TextComp.initPopover();
	},
	onDOMready: function () {
		$(CONST.SELECTOR.externalLink).append('<i class="far fa-external-link"></i>');
		$(CONST.SELECTOR.internalLink).append('<i class="far fa-arrow-circle-right"></i>');

		$(CONST.SELECTOR.pdfLink).prepend('<i class="far fa-file-pdf"></i>');
		
		$('.cmp-text .popover-button').html('<i class="fal fa-info-circle"></i>');

		$(document).on("click", ".popover .btn-close-popover" , function(){
			let popoverElem = $(this).closest(".popover");
			let id = popoverElem.attr('id');
			popoverElem.hide();
			$('[aria-describedby='+id+']').click();
		});
	},
	initPopover: function(){
		const closeBtnHtml = `<span class="popover-close-container"><button type="button" class="btn-close-popover btn-close"><span class="visually-hidden">closeAria</span><i role="presentation" class="fal fa-times"></i></button></span>`;

		var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));

		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			let customConfig = getPopoverConfig(popoverTriggerEl)
			return new bootstrap.Popover(popoverTriggerEl, customConfig)
		});

		function getCustomClass(popoverTriggerElem){
			return getDataAttrContent(popoverTriggerElem, 'bs-title') ? 'sl-popover' : 'sl-popover sl-popover-headless' 
		}

		function getPopoverConfig(popoverTriggerEl){
			return {
				html: true,
				sanitize: false,
				title: generatePopoverHeader(popoverTriggerEl),
				content: getDataAttrContent(popoverTriggerEl, 'bs-content'),
				customClass: getCustomClass(popoverTriggerEl)
			}
		}

		function generatePopoverHeader(popoverTriggerElem) {
			let headerText = getDataAttrContent(popoverTriggerElem, 'bs-title');
			if(headerText) {
				return `${headerText} ${closeBtnHtml}`;
			}
			return `${closeBtnHtml}`;
		}

		function getDataAttrContent(element, dataAttribute) {
			return $(element).data(dataAttribute);
		}
	}

};

$(function () {
	TextComp.init();
});
