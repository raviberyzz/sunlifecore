/**
* Card Component author dialog specific JS
*/
(function ($, $document, author) {
    "use strict";

    /* Binding event and callback on dialog-ready */
    $(document).on("dialog-ready", function (e) {
        const currentComponentPath = Granite.author.DialogFrame.currentDialog.editable.path;
        const parentPath = currentComponentPath.substr(0, currentComponentPath.lastIndexOf("/"));
        const cardType = CQ.shared.HTTP.get(parentPath + '/cardType').responseText;
        const mediaType = CQ.shared.HTTP.get(parentPath + '/mediaType').responseText;
        const horizontalIconCard = CQ.shared.HTTP.get(parentPath+'/horizontalIconCard').responseText;
        const verticalIconCard = CQ.shared.HTTP.get(parentPath+'/verticalIconCard').responseText;
        const tabs = $(".card-type-tabs").find("coral-tab");
        let $assetTab = null;
        let selectedTab = null;
        let currentTab = '';

        /* show/hide tabs of different card type depending upon current card type */
        tabs.each(function (index, value) {
            currentTab = $(value).find('coral-tab-label').text().toLowerCase();
            currentTab = (currentTab == "banner image block") ? 'banner-image' : currentTab;

            if ((currentTab != 'asset' && currentTab != 'cta' && currentTab != 'analytics') || (cardType === 'statistic')) {
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
            if (currentTab == 'asset') {
                $assetTab = $(value);
            }
            
        });

        /* Update/Disable different select option depending upon current card type */
        switch (cardType) {
            case 'horizontal':
                if(horizontalIconCard =='true') {
                    disableAssetOption('image');
                 } else {
                    disableAssetOption('icon');
                 }
                break;
            case 'vertical':
                if(verticalIconCard =='true') {
                    disableAssetOption('image');
                 } else {
                    disableAssetOption('icon');
                 }
                break;
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
                if(mediaType=='video') {
                    $assetTab.attr("aria-selected", false).attr("selected", false);
                    $assetTab.attr("hidden", true);
                    disableCtaOption(['button','cardlink']);
                } else {
                    disableCtaOption(['cardlink']);
                    $('.card-type-dialog-container').find('[name="./mediaWatchTime"]').parent().hide();
                }
                
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