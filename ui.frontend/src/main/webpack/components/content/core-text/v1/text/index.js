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
                pdfLink: '.sl-link-pdf[data-class-icon]',
                slLink: '.sl-link',
                faExternalLink:'.fa-external-link',
                faInternalLink:'.fa-arrow-circle-right',
                faPdfFile:'.fa-file-pdf'
            },
            ATTR:{
                title:'title'
            },
            TEMPLATE: {
                infoIcon: '<span class="visually-hidden">%POPUP_TITLE%</span><i class="fal fa-info-circle popover-icon" role="presentation"></i>'
            }
        };

        /**
         * Method to replace template string with accessible text to provide content to screen readers what the popover content contains
         * @function replaceTemplateStringWithAccessibleText
         * @memberof sunCore.comp.text
         * @private
         */
        function replaceTemplateStringWithAccessibleText(){
            return CONSTANT.TEMPLATE.infoIcon.replace('%POPUP_TITLE%', $(CONSTANT.SELECTOR.popoverBtn).attr('data-bs-title'));
        }

        /**
         * Method to add title attribute to icons in text component
         * @function addTitleAttributeToIcons
         * @memberof sunCore.comp.text
         * @private
         */
        function addTitleAttributeToIcons() {
            const lang = util.customEvents.GET_LANGUAGE;
            let i18n;
            switch (lang) {
                case 'fr':
                    i18n = util.constants.i18.fr;
                    break;
                case 'en':
                    i18n = util.constants.i18.en;
                    break;
                default:
                    i18n = util.constants.i18.en;
                    break;
            };
            $(CONSTANT.SELECTOR.slLink).each(function() {
                $(this).find(CONSTANT.SELECTOR.faExternalLink).attr(CONSTANT.ATTR.title, i18n.opens_a_external_link);
                $(this).find(CONSTANT.SELECTOR.faInternalLink).attr(CONSTANT.ATTR.title, i18n.opens_a_internal_link);
                $(this).find(CONSTANT.SELECTOR.faPdfFile).attr(CONSTANT.ATTR.title, i18n.opens_a_pdf_file);
            });
        }

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
            $(CONSTANT.SELECTOR.popoverBtn).html(replaceTemplateStringWithAccessibleText());
        }
        /**
         * Handler called at text initialsation
         * @function init
         * @memberof sunCore.comp.text
         * @public
         */
        function init() {
            appendRequiredIconsHandler();
            addTitleAttributeToIcons();
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