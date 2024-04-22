/**
* Card Component author dialog mendatory field specific JS
*/
(function ($, $document, author) {
    "use strict";

    /* Binding event and callback on dialog-ready */
    $(document).on("foundation-contentloaded", function (dialogEvent) {

        const CONSTANTS = {
            SELECTOR: {
                cardHeading: '[name="./cardHeading"]',
                name: '[name="./name"]',
                jobTitle: '[name="./jobTitle"]',
                assetType: '.coral3-Select[name="./assetType"]',
                bannerHeading: '[name="./bannerHeading"]',
                bannerDescription: '.cq-RichText-editable[name="./bannerDescription"]',
                bannerImageHeading: '[name="./bannerImageHeading"]',
                bannerImageDescription: '.cq-RichText-editable[name="./bannerImageDescription"]',
                mediaHeading: '[name="./mediaHeading"]',
                mediaDescription: '.cq-RichText-editable[name="./mediaDescription"]',
                segmentDescription: '.cq-RichText-editable[name="./segmentDescription"]',
                ctaType: '.coral3-Select[name="./ctaType"]',
                cardLinkLabel: '[name="./cardLinkLabel"]',
                cardLinkURL: '[name="./cardLinkURL"]',
                cardBtnLabel: '[name="./cardBtnLabel"]',
                cardBtnURL: '[name="./cardBtnURL"]',
                cardClickableLinkURL: '[name="./cardClickableLinkURL"]',
                cardTypeTabs: '.card-type-tabs',
                cardImageFile: '.coral3-FileUpload[name="./cardImageFile"]'

            }
        }

        const currentComponentPath = Granite.author.DialogFrame.currentDialog.editable.path;
        const parentPath = currentComponentPath.substr(0, currentComponentPath.lastIndexOf("/"));
        const cardType = CQ.shared.HTTP.get(parentPath + '/cardType').responseText;
        const mediaType = CQ.shared.HTTP.get(parentPath + '/mediaType').responseText;
        const $dialogContainer = $(CONSTANTS.SELECTOR.cardTypeTabs);
        const tabs = $dialogContainer.find("coral-tab");

         /* selector required for card validations */
        const $cardHeading = $dialogContainer.find(CONSTANTS.SELECTOR.cardHeading);
        const $name = $dialogContainer.find(CONSTANTS.SELECTOR.name);
        const $jobTitle = $dialogContainer.find(CONSTANTS.SELECTOR.jobTitle);
        const $assetType = $dialogContainer.find(CONSTANTS.SELECTOR.assetType);
        const $bannerHeading = $dialogContainer.find(CONSTANTS.SELECTOR.bannerHeading);
        const $bannerDescription = $dialogContainer.find(CONSTANTS.SELECTOR.bannerDescription);
        const $bannerImageHeading = $dialogContainer.find(CONSTANTS.SELECTOR.bannerImageHeading);
        const $bannerImageDescription = $dialogContainer.find(CONSTANTS.SELECTOR.bannerImageDescription);
        const $mediaHeading = $dialogContainer.find(CONSTANTS.SELECTOR.mediaHeading);
        const $mediaDescription = $dialogContainer.find(CONSTANTS.SELECTOR.mediaDescription);
        const $segmentDescription = $dialogContainer.find(CONSTANTS.SELECTOR.segmentDescription);
        const $ctaType = $dialogContainer.find(CONSTANTS.SELECTOR.ctaType);
        const $cardLinkLabel = $dialogContainer.find(CONSTANTS.SELECTOR.cardLinkLabel);
        const $cardLinkURL = $dialogContainer.find(CONSTANTS.SELECTOR.cardLinkURL);
        const $cardBtnLabel = $dialogContainer.find(CONSTANTS.SELECTOR.cardBtnLabel);
        const $cardBtnURL = $dialogContainer.find(CONSTANTS.SELECTOR.cardBtnURL);
        const $cardClickableLinkURL = $dialogContainer.find(CONSTANTS.SELECTOR.cardClickableLinkURL);

        let $assetTab = null;
        let $ctaTab = null;
        let currentTab = '';

        /* show/hide tabs of different card type depending upon current card type */
        tabs.each(function (index, value) {
            currentTab = $(value).find('coral-tab-label').text().toLowerCase();
            if (currentTab == 'asset') {
                $assetTab = $(value);
            } else if(currentTab == 'cta') {
                $ctaTab = $(value);
            }
        });

        /**
		 * Method to update text on required field label
		 * @function updateRequiredLabel
         * @param {HTMLElement} $element - jquery dom selector of element
		 * @private
		 */
        function updateRequiredLabel($element) {
            let labelText = $element.closest('.coral-Form-fieldwrapper').find(".coral-Form-fieldlabel").text().replaceAll("*", "");
            $element.closest('.coral-Form-fieldwrapper').find(".coral-Form-fieldlabel").text(labelText+'*');
        }

        /**
		 * Method to add attributes for marking required fields for validation
		 * @function markRequiredFields
         * @param {HTMLElement} $element - jquery dom selector of element
         * @param {Boolean} requiredOnly - flag to inform required only attribute need to add
		 * @private
		 */
        function markRequiredFields($element, requiredOnly) {
            $element.attr(requiredOnly ? "required":"aria-required", true);
            updateRequiredLabel($element);
        }

     
        /**
		 * Method to update the required field attributes for select type field
		 * @function selectRequired
         * @param {HTMLElement} $element - jquery dom selector of element
         * @param {String} type - value to inform type of select dropdown
		 * @private
		 */
        function selectRequired($element, type) {
            updateRequiredLabel($element);
            $element.attr("required", true);
            $element.attr("aria-required", true);
            if(type=='cta') {
                updateCtaRequiredFields();
            } else if(type=='asset') {
                setTimeout(function(){updateAssetRequiredFields();},200);
            }
           
        }
        
        /**
		 * Method to update the required field attributes for image type dragdrop
		 * @function updateAssetRequiredFields
		 * @private
		 */
        function updateAssetRequiredFields() {
            const tabID = $assetType.closest('.coral3-Panel').attr('aria-labelledby');
            $(`#${tabID}`).removeClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').attr('hidden', true);
            
            if($assetType.val() !='noAsset') {
                $assetType.attr("aria-invalid",false);
                $assetType.removeClass('is-invalid');
            }
            
            if($assetType.val() =='image') {
                let $imageAsset = $dialogContainer.find(CONSTANTS.SELECTOR.cardImageFile);
                $imageAsset.attr("data-cq-fileupload-required", true);
                $imageAsset.closest('.coral-Form-fieldwrapper').find(".coral-Form-fieldlabel").text('Card Image*');
                $imageAsset.attr("required", true);
                $imageAsset.attr("aria-required", true);
            } 

        }

        /**
		 * Method to update the required field attributes for CTA and it's child input 
         * depending upon type pf CTA selection
		 * @function updateCtaRequiredFields
		 * @private
		 */
        function updateCtaRequiredFields() {
            const tabID = $ctaType.closest('.coral3-Panel').attr('aria-labelledby');
            $(`#${tabID}`).removeClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').attr('hidden', true);
            if($ctaType.val() !='noCTA') {
                $ctaType.attr("aria-invalid",false);
                $ctaType.removeClass('is-invalid');
            }
            if($ctaType.val() =='link') {
                markRequiredFields($cardLinkLabel);
                markRequiredFields($cardLinkURL, true);
            } else if($ctaType.val() =='button') {
                markRequiredFields($cardBtnLabel);
                markRequiredFields($cardBtnURL, true);
            } else if($ctaType.val() =='cardlink') {
                markRequiredFields($cardClickableLinkURL, true);
            }

        }

        /**
		 * Object containing method for different type of card/content block 
         * mandatory field configs 
		 */
        const validateManadatoryFields = {
            'horizontal': function () {
                markRequiredFields($cardHeading);
                selectRequired($ctaType, 'cta');
            },
            'vertical': function () {
                markRequiredFields($cardHeading);
                selectRequired($ctaType, 'cta');
            },
            'avatar': function () {
                markRequiredFields($name);
                markRequiredFields($jobTitle);
            },
            'banner': function () {
                markRequiredFields($bannerHeading);
                markRequiredFields($bannerDescription);
            },
            'banner-image': function () {
                markRequiredFields($bannerImageHeading);
                markRequiredFields($bannerImageDescription);
                markRequiredFields($assetType, true);
                selectRequired($assetType, 'asset');
            },
            'media': function () {
                markRequiredFields($mediaHeading);
                markRequiredFields($mediaDescription);
                if(mediaType !='video') {
                    markRequiredFields($assetType, true);
                    selectRequired($assetType, 'asset');
                }
            },
            'segmented': function () {
                markRequiredFields($segmentDescription);
            }   
        };

        
        if($(dialogEvent.target).find('.card-type-tabs').length && cardType) {
            validateManadatoryFields[cardType]();
        }

         /**
		 * Method to validate required field on submit of authored dialog
		 * @function validRequiredFields
		 * @private
		 */
        function validRequiredFields() {
            let isValid = true;
            $dialogContainer.find('[aria-required="true"]').each(function (index, value) {
                const tabID = $(value).closest('.coral3-Panel').attr('aria-labelledby');
                /** check cta selection */
                if($(value).hasClass('coral3-Select')) {
                    if($(value).attr('name') =='./ctaType' && $(value).val() =='noCTA') {
                        $(value).attr("aria-invalid",true);
                        $(value).addClass('is-invalid');
                        $(`#${tabID}`).addClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').removeAttr('hidden');
                        isValid = false;
                    }
                } 
                 /** check cta selection */
                 if($(value).hasClass('cq-FileUpload') && $(value).find('[name="./cardImageFileReference"]').val() ==''){
                        $(value).attr("aria-invalid",true);
                        $(value).addClass('is-invalid');
                        $(`#${tabID}`).addClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').removeAttr('hidden');
                        $(value).find('.cq-FileUpload-thumbnail').css("border-color","#e14132");
                        isValid = false;
                  
                } 
                // validate richtext content 
                if($(value).hasClass('cq-RichText-editable') && !$(value).text()) {
                    $(`#${tabID}`).addClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').removeAttr('hidden');
                    if($(value).closest('.cq-RichText').length) {
                        $(value).closest('.cq-RichText').find('.cq-RichText-editable').css("border-color","#e14132");
                    }
                    isValid = false;
                }
                // check text field content
                if(!$(value).hasClass('cq-RichText-editable') && !$(value).hasClass('cq-FileUpload') && !$(value).val()) {
                    $(`#${tabID}`).addClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').removeAttr('hidden');
                    $(value).addClass('is-invalid');
                    isValid = false;
                }                
            });
            return isValid; 
        }


        /**
		 * Method to handle card dialog edit and submit
         * callback called on sbmit of dialog for validation 
		 * @function dialogSubmitHandler
         * @param {object} event - event object
		 * @private
		 */
        function dialogSubmitHandler(event) {
            const $form = $(this).closest("form.foundation-form");
                if($form.find('.card-type-tabs').length) {
                    event.stopPropagation();
                    event.preventDefault();
                    let isValid = validRequiredFields();
                    if(isValid) {
                        $form.submit();
                    } else {
                        console.log('Mandatory field are invalid');
                        return false;
                    }
                }
        }

        /**
		 * Method to handle any change event on all marked required fields
		 * @function requiredFieldOnChangeHandler
         * @param {object} event - event object
		 * @private
		 */
        function requiredFieldOnChangeHandler(event) {
            let value = null;
               
            const tabID = $(event.currentTarget).closest('.coral3-Panel').attr('aria-labelledby');
            value = $(event.currentTarget).hasClass('cq-RichText-editable') ? $(event.target).text() : $(event.target).val();

            if($(event.currentTarget).hasClass('cq-FileUpload') && $(event.currentTarget).hasClass('is-filled')) {
                value = true;
            }
            if(value) {
                $(`#${tabID}`).removeClass('is-invalid').find('.coral3-Tabs-item-invalid-icon').attr('hidden', true);
                    $(event.currentTarget).removeClass('is-invalid');
                    if($(event.currentTarget).hasClass('cq-RichText-editable')) {
                        $(event.currentTarget).css("border-color", "#326ec8");
                    }
                    if($(event.currentTarget).hasClass('cq-FileUpload')) {
                        $(event.currentTarget).css("border-color", "#00000033");
                    }

            }
        }

        /**
		 * Handler to bind event specific for card type author dialog
		 * @function bindEvent
		 * @private
		 */
        function bindEvent() {
            if($(dialogEvent.target).find('.card-type-tabs').length) {  
                $(document).on("click", ".cq-dialog-submit", dialogSubmitHandler);
                $(document).on('change', '[aria-required="true"]', requiredFieldOnChangeHandler);
                $(document).on('change', '.coral3-Select[name="./ctaType"]', updateCtaRequiredFields);
            }
        }

        bindEvent();
       
    });

})($, $(document), Granite.author);
