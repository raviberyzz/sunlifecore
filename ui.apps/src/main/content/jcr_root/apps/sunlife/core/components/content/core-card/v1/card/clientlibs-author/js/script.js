/**
* Card Component author dialog specific JS
*/
(function ($, $document, author) {
    "use strict";

    /* Binding event and callback on foundation-contentloaded */
    $(document).on("foundation-contentloaded", function (e) {
        var currentComponentPath = Granite.author.DialogFrame.currentDialog.editable.path;
        var parentPath = currentComponentPath.substr(0, currentComponentPath.lastIndexOf("/"));
        var cardType = CQ.shared.HTTP.get(parentPath + '/cardType').responseText;
        var tabs = $(".card-type-tabs").find("coral-tab");
        var selectedTab = null;
        var currentTab = '';

        /* show/hide tabs of different card type depending upon current card type */
        tabs.each(function (index, value) {
            currentTab = $(value).find('coral-tab-label').text().toLowerCase();
            if ((currentTab != 'asset' && currentTab != 'cta') || (cardType === 'statistic')) {
                $(value).attr("aria-selected", false).attr("selected", false);
                $(value).attr("hidden", true);
            }
            if (currentTab == cardType) {
                selectedTab = $(value).attr('id');
                $(value).attr("aria-selected", true).attr("selected", true);
                $(value).attr("hidden", false);
            }
            if ((currentTab == 'horizontal/vertical') && (cardType == 'horizontal' || cardType == 'vertical')) {
                selectedTab = $(value).attr('id');
                $(value).attr("aria-selected", true).attr("selected", true);
                $(value).attr("hidden", false);
            }
        });

        /* Update/Disable different select option depending upon current card type */
        switch (cardType) {
            case 'avatar':
                disableAssetOption('icon');
                disableCtaOption(['button', 'cardlink']);
                break;
            case 'banner':
                disableAssetOption('image');
                disableCtaOption(['button', 'cardlink']);
                break;
            case 'banner-image':
                disableAssetOption('icon');
                disableCtaOption(['cardlink']);
                break;
            case 'media':
                disableAssetOption('icon');
                disableCtaOption(['cardlink']);
                break;
            case 'segmented':
                disableAssetOption('image');
                disableCtaOption(['cardlink']);
                break;
            case 'statistic':
                disableAssetOption('image');
                disableCtaOption(['link', 'button', 'cardlink']);
                break;
            default:
                console.log(cardType);
                break;
        }


        /* Disable passed options of CTA dropdown */
        function disableCtaOption(options) {
            options.forEach(function (value) {
                $('coral-select[name="./ctaType"]').find('coral-select-item[value="' + value + '"]').attr("disabled", true);
            });
        }

         /* Disable passed option of asset dropdown */
        function disableAssetOption(option) {
            $('coral-select[name="./assetType"]').find('coral-select-item[value="' + option + '"]').attr("disabled", true);
        }
    });

})($, $(document), Granite.author);