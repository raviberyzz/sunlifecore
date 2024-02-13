"use strict";
use(function () {
    var containerModel = this.containerModel;
    var cardType = this.cardType;
    var containerClasses = [];

    /* Update dynamic wrapper class depending upon current card type and selected card specific options */
    switch (cardType) {
        case 'horizontal':
            containerClasses.push('sl-cards horizontal');
            containerClasses.push(handleCardSpecificWrapperClasses('horizontal'));
            break;
        case 'vertical':
            containerClasses.push('sl-cards vertical');
            containerClasses.push(handleCardSpecificWrapperClasses('vertical'));
            break;
        case 'avatar':
            containerClasses.push('sl-avatar-blocks');
            containerModel.avatarMultipleCard ? containerClasses.push('multi') : '';
            break;
        case 'banner':
            containerClasses.push('sl-banner-content-block');
            break;
        case 'banner-image':
            containerClasses.push('sl-banner-image-block card');
            containerModel.bannerImagePosition =='right' ? containerClasses.push('banner-image-block-right') : containerClasses.push('banner-image-block-left');
            break;
        case 'media':
            containerClasses.push('container');
            break;
        case 'segmented':
            containerClasses.push('sl-segmented-blocks');
            containerModel.segmentedMultipleCard ? containerClasses.push('multi') : '';
            break;
        case 'statistic':
            containerClasses.push('sl-statistic-blocks');
            containerModel.statisticsMultipleCard ? containerClasses.push('multi') : '';
            break;
        default:
            containerClasses.push('sl-cards');
            break;
    }

    /* return card specific wrapper class for passed card type and horizontal control authored value */
    function handleCardSpecificWrapperClasses(type) {
        var cardTypeSpecificConfigs = ''
        if(type=='horizontal') {
            cardTypeSpecificConfigs = containerModel.horizontalHeightControl == 'auto'? 'auto' : '';
        } else if(type=='vertical') {
            cardTypeSpecificConfigs = containerModel.verticalHeightControl == 'auto'? 'auto' : '';
        } 
        return cardTypeSpecificConfigs
    }
    
    return {
        wrapperClass: containerClasses.join(' ')
    };
});

