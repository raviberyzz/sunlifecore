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
                DELETE: 46
            },
            key: {
                ESC:'Escape',
                TAB: 'Tab',
                ENTER_RETURN: 'Enter',
                SHIFT:'Shift'

            },
            i18:{
                en: { // english language
                    opens_a_external_link: "opens a external link",
                    opens_a_internal_link: "opens a internal link",
                    opens_a_pdf_file: "opens a pdf file"
                },
                fr: { // french language
                    opens_a_external_link: "ouvre un lien externe",
                    opens_a_internal_link: "ouvre un lien interne",
                    opens_a_pdf_file: "ouvre un fichier pdf"
                }
            },
            templateString: {
                externalLinkIcon: `<i class="far fa-external-link icn-hover-hidden" aria-hidden="false"></i>`,
                internalLinkIcon: `<i class="far fa-arrow-circle-right icn-hover-hidden" aria-hidden="false"></i>`,
                pdfLinkIcon: `<i class="far fa-file-pdf icn-hover-hidden" aria-hidden="false"></i>`,
                externalLinkIconSolid: `<i class="fas fa-external-link icn-hover-show" aria-hidden="false"></i>`,
                internalLinkIconSolid: `<i class="fas fa-arrow-circle-right icn-hover-show" aria-hidden="false"></i>`,
                pdfLinkIconSolid: `<i class="fas fa-file-pdf icn-hover-show" aria-hidden="false"></i>`
            },
        };

        return returnObject;
    })();
})(sunCore.util);