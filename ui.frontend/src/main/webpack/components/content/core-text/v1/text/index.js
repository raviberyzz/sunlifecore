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

		$('.cmp-text .popover-button').html('<span class="visually-hidden">Informational Popup</span><i class="fal fa-info-circle" role="presentation"></i>');

		function getPopoverId(element) {
			let popoverElem = $(element).closest(".popover");
			let id = popoverElem.attr('id');
			return [popoverElem, id];
		}

		$(document).on("click", ".popover .btn-close-popover", function () {
			let [popoverElem, id] = getPopoverId($(this));
			popoverElem.hide();
			$('[aria-describedby=' + id + ']').click().focus();
		});
		$(document).on("keydown", '.popover .btn-close-popover', function (event) {
			if (event.key === 'Escape') {
				event.preventDefault();
				let [popoverElem, id] = getPopoverId($(this));
				popoverElem.hide();
				$('[aria-describedby=' + id + ']').click().focus();
			}
			else if (event.key == 'Tab' && event.shiftKey) {
				event.preventDefault();
				let [popoverElem, id] = getPopoverId($(this));
				$('[aria-describedby=' + id + ']').focus();
			}
			else if (event.key == 'Tab') {
				let [popoverElem, id] = getPopoverId($(this));
				let selectableElements = [].slice.call(document.querySelectorAll('select, input, textarea, button, a'));
				selectableElements.find((value, index) => {
					if(value.getAttribute("aria-describedby") === id){
						event.preventDefault();
						selectableElements[index + 1].focus();
					}
				})
			}
		});
		$(document).on("keydown", '.popover-button', function (event) {
			let popOverId = $(this).attr('aria-describedby');
			if (event.key == 'Escape') {
				event.preventDefault();
				$(this).click().focus();
			}
			else if (event.key == 'Tab' && popOverId !== undefined && !event.shiftKey) {
				event.preventDefault();
				$('#' + popOverId + ' .btn-close-popover').focus();
			}
		});
	},
	initPopover: function(){
		const closeBtnHtml = `<span class="popover-close-container"><button type="button" class="btn-close-popover btn-close"><span class="visually-hidden">close</span><i role="presentation" class="fal fa-times"></i></button></span>`;

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
