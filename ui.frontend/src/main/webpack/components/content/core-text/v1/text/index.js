/**
 * text/index.js
 * Text Component specific JS Module .
 */
(function (core) {
    "use strict";

    /**
     * Text component
     * @namespace text
     * @memberof sunCore.comp
     */
    core.comp.text = (function ($, util) {
        const CONSTANT = {
            SELECTOR: {
                popoverBtn: '.cmp-text .popover-button',
                externalLink: '.sl-link-external[data-class-icon]',
                internalLink: '.sl-link-internal[data-class-icon]',
                pdfLink: '.sl-link-pdf[data-class-icon]'
            },
            TEMPLATE: {
                infoIcon: '<span class="visually-hidden">Informational Popup</span><i class="fal fa-info-circle popover-icon" role="presentation"></i>'
            }
        };

        /**
		 * Method to append icons on the required selected links created in text comp.
		 * @function appendRequiredIconsHandler
         * @memberof sunCore.comp.text
		 * @private
		 */
		function appendRequiredIconsHandler(){
            $(CONSTANT.SELECTOR.externalLink).append(util.constants.templateString.externalLinkIcon, util.constants.templateString.externalLinkIconSolid);
            $(CONSTANT.SELECTOR.internalLink).append(util.constants.templateString.internalLinkIcon, util.constants.templateString.internalLinkIconSolid);
            $(CONSTANT.SELECTOR.pdfLink).prepend(util.constants.templateString.pdfLinkIcon, util.constants.templateString.pdfLinkIconSolid);
            $(CONSTANT.SELECTOR.popoverBtn).html(CONSTANT.TEMPLATE.infoIcon);
        }
        
        /**
         * Handler called at text initialsation
         * @function init
         * @memberof sunCore.comp.text
         * @public
         */
        function init() {
            appendRequiredIconsHandler();
        }

        return {
            init: init,
        };
    })(core.$, core.util);

    /**
     * Initialise text module if given selector is in DOM
     */
    core.util.initialise(core.comp, "text");
})(sunCore);