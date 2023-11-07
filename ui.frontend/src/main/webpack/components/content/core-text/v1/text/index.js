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
	},
	onDOMready: function () {
		$(CONST.SELECTOR.externalLink).append('<i class="far fa-external-link"></i>');
		$(CONST.SELECTOR.internalLink).append('<i class="far fa-arrow-circle-right"></i>');
		$(CONST.SELECTOR.pdfLink).prepend('<i class="far fa-file-pdf"></i>');
	}
};

$(function () {
	TextComp.init();
});
