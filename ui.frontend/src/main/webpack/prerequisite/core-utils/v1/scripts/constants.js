/* global Suncore */

/**
 * constants.js
 * @fileOverview utility to provide getter in one place for all constants (sans customEvents)
 */
(function(util) {
    'use strict';

    /**
     * constants util
     * @namespace constants
     * @memberof sunCore.util
     */
    util.constants = (function() {
        
        const returnObject = {
            KeyCode: {
                BACKSPACE: 8,
                TAB: 9,
                ENTER_RETURN: 13,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46,
                A: 65,
                Z: 90
            },
            key: {
                ESC:'Escape',
                TAB: 'Tab',
                ENTER_RETURN: 'Enter',
                SHIFT:'Shift'

            },
            i18:{
                en: { // english language
                    opensExternalLink: "opens an external link",
                    opensInternalLink: "opens an internal link",
                    opensPdfFile: "opens a pdf file"
                },
                fr: { // french language
                    opensExternalLink: "ouvre un lien externe",
                    opensInternalLink: "ouvre un lien interne",
                    opensPdfFile: "ouvre un fichier pdf"
                }
            },
            templateString: {
                externalLinkIcon: `<i class="fak fa-external-link icn-hover-hidden" aria-hidden="false"></i>`,
                internalLinkIcon: `<i class="fak fa-chevron-circle-right icn-hover-hidden" aria-hidden="true"></i>`,
                pdfLinkIcon: `<i class="fak fa-pdf icn-hover-hidden" aria-hidden="true"></i>`,
                externalLinkIconSolid: `<i class="fak fa-external-link-hover icn-hover-show" aria-hidden="true"></i>`,
                internalLinkIconSolid: `<i class="fak fa-chevron-circle-right-hover icn-hover-show" aria-hidden="true"></i>`,
                pdfLinkIconSolid: `<i class="fak fa-pdf-hover icn-hover-show" aria-hidden="true"></i>`
            },
        };

        return returnObject;
    })();
})(sunCore.util);