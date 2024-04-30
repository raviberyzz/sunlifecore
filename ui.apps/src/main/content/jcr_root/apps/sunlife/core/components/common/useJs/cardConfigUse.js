"use strict";
use(["/libs/sightly/js/3rd-party/q.js"], function (Q){
    var cardType = this.cardType;
    var cardPath = this.cardPath;
    var horizontalCardConfig = JSON.stringify(this.horizontalCardConfig);
    var verticalCardConfig= JSON.stringify(this.verticalCardConfig);
    var avatarCardConfig= JSON.stringify(this.avatarCardConfig);
    var bannerCardConfig= JSON.stringify(this.bannerCardConfig);
    var bannerImageCardConfig= JSON.stringify(this.bannerImageCardConfig);
    var mediaCardConfig= JSON.stringify(this.mediaCardConfig);
    var segmentedCardConfig= JSON.stringify(this.segmentedCardConfig);
    var statisticsCardConfig= JSON.stringify(this.statisticsCardConfig);
    var containerConfigs = { isClickable: false, isMultiple: false, isIcon: false, isLarge: false, isBody: false, isLink: false, imagePosition: 'left', mediaType: 'left', isForm: false };
    var cardTemplate = '';
    var cardClasses = [];

    var cardClickable = Q.defer();
  
    /* Update card class depending upon card type and selected card specific options */
    switch (cardType) {
        case 'horizontal':
            cardClasses.push('card');
            var horizontalCardConfigs = getObjectOfString(horizontalCardConfig);
            if(horizontalCardConfigs.clickable === 'true') {
                cardClasses.push('clickable');
                containerConfigs.isClickable = true;
                updateCardClickableConfs();
            }
            if(horizontalCardConfigs.multiple ==='true') {
                cardClasses.push('multi-h');
                containerConfigs.isMultiple = true;
            }
            if(horizontalCardConfigs.icon ==='true') {
                cardClasses.push('icon');
                containerConfigs.isIcon = true;
            }
            cardTemplate = 'templates/horizontal-vertical.html';
            break;
        case 'vertical':
            cardClasses.push('card');
            var verticalCardConfigs= getObjectOfString(verticalCardConfig);
            if(verticalCardConfigs.clickable==='true') {
                cardClasses.push('clickable');
                containerConfigs.isClickable = true;
                updateCardClickableConfs();
            }
            if(verticalCardConfigs.multiple==='true') {
                cardClasses.push('multi-v');
                containerConfigs.isMultiple = true;
            }
            if(verticalCardConfigs.icon==='true') {
                cardClasses.push('icon');
                containerConfigs.isIcon = true;
            }
            cardTemplate = 'templates/horizontal-vertical.html';
            break;
        case 'avatar':
            cardClasses.push('card');
            var avatarCardConfigs = getObjectOfString(avatarCardConfig);
            if(avatarCardConfigs.largeSize === 'true') {
                containerConfigs.isLarge = true;
            }
            if(avatarCardConfigs.multiple === 'true') {
                containerConfigs.isMultiple = true;
            }
            if(avatarCardConfigs.withBody === 'true') {
                cardClasses.push('avatar-body');
                containerConfigs.isBody = true;
            }
            cardTemplate = 'templates/avatar.html';
            break;
        case 'banner':
            cardClasses.push('container');
            var bannerCardConfigs = getObjectOfString(bannerCardConfig);
            if(bannerCardConfigs.withLink === 'true') {
                containerConfigs.isLink = true;
            }
            cardTemplate = 'templates/banner.html';
            break;
        case 'banner-image':
            cardClasses.push('banner-image-block-row no-gutters h-100 row');
            var bannerImageCardConfigs = getObjectOfString(bannerImageCardConfig);

            if(bannerImageCardConfigs.imagePosition === 'left') {
                containerConfigs.imagePosition = 'left';
            }
            if(bannerImageCardConfigs.imagePosition === 'right') {
                containerConfigs.imagePosition = 'right';
            }
            cardTemplate = 'templates/banner-image.html';
            break;
        case 'media':
            cardClasses.push('sl-media-block card');
            var mediaCardConfigs = getObjectOfString(mediaCardConfig);
            if(mediaCardConfigs.mediaType === 'left') {
                cardClasses.push('media-block-left');
                containerConfigs.mediaType = 'left';
            }
            if(mediaCardConfigs.mediaType === 'right') {
                cardClasses.push('media-block-right');
                containerConfigs.mediaType = 'right';
            }
            if(mediaCardConfigs.mediaType === 'video') {
                cardClasses.push('media-block-left');
                cardClasses.push('video-block');
                containerConfigs.mediaType = 'video';
            }
            cardTemplate = 'templates/media.html';
            break;
        case 'segmented':
            cardClasses.push('card');
            var segmentedCardConfigs = getObjectOfString(segmentedCardConfig);
            if(segmentedCardConfigs.multiple ==='true') {
                cardClasses.push('multi');
                containerConfigs.isMultiple = true;
            }
            if(segmentedCardConfigs.segmentedformContainer ==='true') {
                containerConfigs.isForm = true;
            }
            if(segmentedCardConfigs.segmentedformContainer ==='true' && segmentedCardConfigs.multiple !='true') {
                cardClasses.push('single-form');
            }
            cardTemplate = 'templates/segmented.html';
            break;
        case 'statistic':
            cardClasses.push('card');
            var statisticsCardConfigs = getObjectOfString(statisticsCardConfig);
            if(statisticsCardConfigs.multiple ==='true') {
                cardClasses.push('multi');
                containerConfigs.isMultiple = true;
            }
            cardTemplate = 'templates/statistic.html';
            break;
        default:
            cardClasses.push('card');
            break;
    }

    /* return object of passed object like string */
    function getObjectOfString(str) {
        var strToUpdate = str.trim();
        return strToUpdate.split(',')
            .map(function(x) { return x.split(':').map(function(y){ return y.trim()})})
            .reduce(function(a, x) { 
                a[sanitizeString(x[0])] = sanitizeString(x[1]);
                return a;
            },{});
    }

     /* return sanitize string for passed string */
    function sanitizeString(str){
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
        return str.trim();
    }

    function updateCardClickableConfs() {   
        granite.resource.resolve(cardPath).then(function(childResource) {
            if (childResource.properties["cardClickableLinkURL"]) {
                cardClickable.resolve({'url':childResource.properties["cardClickableLinkURL"], 'target':childResource.properties["cardClickableLinkTarget"] || '_self'});
            } 
        },function() {
            cardClickable.resolve(false);
        });
    }

    return {
        cardClass: cardClasses.join(' '),
        cardTemplateRef: cardTemplate,
        containerConfigObj: containerConfigs,
        cardClickable: cardClickable.promise

    };
});

