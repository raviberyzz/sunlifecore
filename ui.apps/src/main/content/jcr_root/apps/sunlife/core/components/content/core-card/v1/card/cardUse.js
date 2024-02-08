"use strict";
use(function () {
    var cardModel = this.cardModel;
    var cardType = this.cardType;
    var cardContainerConfigs = this.containerConfigs;
    var containerConfigs = { isClickable: false, isMultiple: false, isIcon: false };
    var cardTemplate = '';
    var cardClasses = [];

    switch (cardType) {
        case 'horizontal':
            handleHorizontalCardClasses();
            cardTemplate = 'templates/horizontal-vertical.html';
            break;
        case 'vertical':
            handleVerticalCardClasses();
            cardTemplate = 'templates/horizontal-vertical.html';
            break;
        case 'avatar':
            cardClasses.push('sl-avatar-blocks');
            cardTemplate = 'templates/avatar.html';
            // Need to update as multi avatar selection
            // sl-avatar-blocks multi
            break;
        case 'banner':
            cardClasses.push('sl-banner-content-block');
            cardTemplate = 'templates/banner.html';
            break;
        case 'banner-image':
            cardClasses.push('sl-banner-image-block card');
            cardTemplate = 'templates/banner-image.html';
            // banner-image-block-right 
            // banner-image-block-left
            // sl-media-block media-block-left card
            break;
        case 'media':
            cardClasses.push('sl-media-block card');
            cardTemplate = 'templates/media.html';
            // media-block-left 
            // media-block-right   
            // media-block-left video-block   
            break;
        case 'segmented':
            cardClasses.push('sl-segmented-blocks');
            cardTemplate = 'templates/segmented.html';
            // sl-segmented-blocks multi
            break;
        case 'statistic':
            cardClasses.push('sl-statistic-blocks');
            cardTemplate = 'templates/statistic.html';
            // sl-statistic-blocks multi
            break;
        default:
            cardClasses.push('sl-cards');
            break;
    }

    function handleHorizontalCardClasses() {
        cardClasses.push('card');
            if(cardContainerConfigs.horizontalClickable) {
                cardClasses.push('clickable');
                containerConfigs.isClickable = true;
            }
            if(cardContainerConfigs.horizontalMultipleCard) {
                cardClasses.push('multi-h');
                containerConfigs.isMultiple = true;
            }
            if(cardModel.cardContainer.horizontalIconCard) {
                cardClasses.push('icon');
                containerConfigs.isIcon = true;
            }
    }

    function handleVerticalCardClasses() {

        cardClasses.push('card');
            if(cardContainerConfigs.verticalClickable) {
                cardClasses.push('clickable');
                containerConfigs.isClickable = true;
            }
            if(cardContainerConfigs.verticalMultipleCard) {
                cardClasses.push('multi-v');
                containerConfigs.isMultiple = true;
            }
            if(cardContainerConfigs.verticalIconCard) {
                cardClasses.push('icon');
                containerConfigs.isIcon = true;
            }
    }
    
    return {
        wrapperClass: cardClasses.join(' '),
        cardTemplateRef : cardTemplate,
        cardContainerConfigs: containerConfigs
    };
});

