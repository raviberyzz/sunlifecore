(function($, $document, author) {

    "use strict";

    $(document).on("foundation-contentloaded", function(e) {

       var currentComponentPath =  Granite.author.DialogFrame.currentDialog.editable.path;
       var parentPath = currentComponentPath.substr(0, currentComponentPath.lastIndexOf("/"));
       var cardType = CQ.shared.HTTP.get(parentPath + '/cardType').responseText;

       $('.card-imageFile').parent().attr("hidden", true);
       $('.card-category').parent().attr("hidden", true);
       $('.card-labelText').parent().attr("hidden", true);
       $('.card-bodyTitle').parent().attr("hidden", true);
       $('.card-link').parent().attr("hidden", true);
       $('.card-target').parent().attr("hidden", true);
       $('.card-quote').parent().attr("hidden", true);
       $('.card-iframeUrl').parent().attr("hidden", true);
       $('.card-combo').parent().attr("hidden", true);
       $('.card-bodyDescription').parent().attr("hidden", true);
       $('.card-caption').parent().attr("hidden", true);
       $('.card-buttonLabel').parent().attr("hidden", true);

        if(cardType === 'horizontal' || cardType === 'vertical'){
			$('.card-imageFile').parent().removeAttr("hidden");
            $('.card-category').parent().removeAttr("hidden");
            $('.card-labelText').parent().removeAttr("hidden");
            $('.card-caption').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
        }

         if(cardType === 'avatar'){
			$('.card-imageFile').parent().removeAttr("hidden");
            $('.card-link').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
            $('.card-quote').parent().removeAttr("hidden");
        }

        if(cardType === 'banner'){
			$('.card-caption').parent().removeAttr("hidden");
            $('.card-link').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
            $('.card-labelText').parent().removeAttr("hidden");
            $('.card-caption').parent().removeAttr("hidden");
        }

         if(cardType === 'banner-image'){
			$('.card-imageFile').parent().removeAttr("hidden");
            $('.card-caption').parent().removeAttr("hidden");
            $('.card-link').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
        }

         if(cardType === 'media'){
			$('.card-imageFile').parent().removeAttr("hidden");
            $('.card-bodyTitle').parent().removeAttr("hidden");
            $('.card-bodyDescription').parent().removeAttr("hidden");
            $('.card-link').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
            $('.card-iframeUrl').parent().removeAttr("hidden");
            $('.card-caption').parent().removeAttr("hidden");
        }

        if(cardType === 'segmented'){
            $('.card-link').parent().removeAttr("hidden");
            $('.card-buttonLabel').parent().removeAttr("hidden");
        }

        if(cardType === 'statistic'){
            $('.card-caption').parent().removeAttr("hidden");
        }

    });

    $(document).on("dialog-ready", function() {

    });

})($, $(document), Granite.author);