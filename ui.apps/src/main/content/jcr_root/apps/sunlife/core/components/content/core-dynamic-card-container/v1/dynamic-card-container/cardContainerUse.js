"use strict";
use(function () {
    var containerModel = this.containerModel;
    var cardType = this.cardType;

    var containerClasses = [];

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
            // Need to update as multi avatar selection
            // sl-avatar-blocks multi
            break;
        case 'banner':
            containerClasses.push('sl-banner-content-block');
            break;
        case 'banner-image':
            containerClasses.push('sl-banner-image-block card');
            // banner-image-block-right 
            // banner-image-block-left
            // sl-media-block media-block-left card
            break;
        case 'media':
            containerClasses.push('sl-media-block card');
            // media-block-left 
            // media-block-right   
            // media-block-left video-block   
            break;
        case 'segmented':
            containerClasses.push('sl-segmented-blocks');
            // sl-segmented-blocks multi
            break;
        case 'statistic':
            containerClasses.push('sl-statistic-blocks');
            // sl-statistic-blocks multi
            break;
        default:
            containerClasses.push('sl-cards');
            break;
    }

    function handleCardSpecificWrapperClasses(type) {
        var cardTypeSpecificConfigs = ''
        if(type=='horizontal') {
            cardTypeSpecificConfigs = containerModel.horizontalHeightControl == 'auto'? 'auto' : ''
        } else if(type=='vertical') {
            cardTypeSpecificConfigs = containerModel.verticalHeightControl == 'auto'? 'auto' : ''
        } 
        return cardTypeSpecificConfigs
    }
    
    return {
        wrapperClass: containerClasses.join(' ')
    };
});

