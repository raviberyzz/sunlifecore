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
                popoverCloseBtn: '.btn-close-popover',
                externalLink: '.sl-link-external[data-class-icon]',
                internalLink: '.sl-link-internal[data-class-icon]',
                pdfLink: '.sl-link-pdf[data-class-icon]',
                slLink: '.sl-link',
                faExternalLink:'.fa-external-link',
                faInternalLink:'.fa-arrow-circle-right',
                faPdfFile:'.fa-file-pdf',
                html:'html'
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
            const lang = $(CONSTANT.SELECTOR.html)[0].lang || 'en';
            let i18n = util.constants.i18[lang];
            $(CONSTANT.SELECTOR.slLink).each(function() {
            $(this).find(CONSTANT.SELECTOR.faExternalLink).attr(CONSTANT.ATTR.title, i18n.opensExternalLink);
            $(this).find(CONSTANT.SELECTOR.faInternalLink).attr(CONSTANT.ATTR.title, i18n.opensInternalLink);
            $(this).find(CONSTANT.SELECTOR.faPdfFile).attr(CONSTANT.ATTR.title, i18n.opensPdfFile);
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
		 * Method to close popover on tab press in text comp.
		 * @function updatePopoverBehavior
         * @memberof sunCore.comp.text
		 * @private
		 */
		function updatePopoverBehavior(){
            var popoverTriggerList = [].slice.call(document.querySelectorAll(CONSTANT.SELECTOR.popoverBtn))
            popoverTriggerList.map(function(popoverTriggerEl) {
                popoverTriggerEl.addEventListener('shown.bs.popover', function() {
                    var popover = bootstrap.Popover.getInstance(popoverTriggerEl);
                    document.querySelector(CONSTANT.SELECTOR.popoverCloseBtn).addEventListener('keydown', function(event) {
                        popover.hide();

                    })
                })
            })
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
            updatePopoverBehavior();
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