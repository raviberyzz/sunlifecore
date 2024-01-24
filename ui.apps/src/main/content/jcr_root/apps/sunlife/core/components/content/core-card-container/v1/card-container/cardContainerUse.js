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
            break;
        case 'banner':
            containerClasses.push('banner');
            break;
        case 'banner-image':
            containerClasses.push('banner-image');
            break;
        case 'segmented':
            containerClasses.push('segmented');
            break;
        case 'statistic':
            containerClasses.push('statistic');
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

