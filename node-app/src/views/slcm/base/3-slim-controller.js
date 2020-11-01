'use strict'
var slim = {
    //Defaults
    version: '1.0',
    Author: 'Sun Life Financial, Canada',
    Date: 'April 2019',
	//initisation
    init: function () {
        //All global variables goes here
        slim.config = {
            lang: document.documentElement.lang.toLowerCase(),
            ObjBtn: $('.btn-currency'),
        };
        //call all the DOM invoking functions here
        slim.onDOMready();
        slim.eventHandlers();
	},
    //Hide DOM elements on load
    onDOMready: function () {
        //AJAX loader
        $(document).on({
            ajaxStart: function () {
                $('#ajax-spinner').show();
            },
            ajaxStop: function () {
                $('#ajax-spinner').hide();
            }
        });
        //Disclosure details
        var ObjDis = $('.disclosure-section');
        if (ObjDis.children('.slf-footnote-body').length > 1) {
            ObjDis.find('.view-more').removeClass('hide');
            ObjDis.find('.slf-footnote-body').not(":eq(0)").hide();
        }
        //Hide Client access sign-in button for French
        if (slim.config.lang === 'fr' || slim.config.lang === 'fr_ca') {
            $('#signin').hide();
            $('.mobile-navbar').find('.mobile-search').hide();
        }
        //Update aria attributes for desktop and tablet only
		slim.footerLinkInit();
		slim.footerLinkHandler();
    },
	footerLinkInit: function(){
			var screen_resized_width = $(document).width();
			var listObj = $(".links-list");
			if (screen_resized_width > 767) {
				// aria-controls
				listObj.find(".main-link").removeAttr("role aria-expanded");
				// aria-labelledby
				listObj.find(".secondary-links").removeAttr("aria-hidden");
				$(".disclosure-aggrement").removeAttr("aria-hidden");
			} else {
				listObj.find(".main-link").attr("role","button");
				listObj.find(".main-link").attr("aria-expanded","false");
				listObj.find(".secondary-links").attr("aria-hidden","true");
				$(".disclosure-aggrement").attr("aria-hidden","true");
			}
	},
    footerLinkHandler: function(){
			var screen_resized_width = $(document).width();
			if (screen_resized_width < 768) {
				$('.links-list li .main-link').off("click");
				$('.links-list li .main-link').on("click", function (e) {
                e.preventDefault();
                var self = $(this),
                    accordionContent = self.attr('aria-controls'),
                    isAriaHid = $('#' + accordionContent).attr('aria-hidden'),
                    isAriaExp = self.attr('aria-expanded'),
                    newAriaExp = (isAriaExp == "false") ? "true" : "false";

                $('.links-list').find('.secondary-links').not(self.next()).slideUp('400');
                $(".links-list").find('li').not(self.parent()).removeClass('down');
                $('#disc-aggrement').slideUp('400');
                self.parent().toggleClass('down');
                self.next().slideToggle('400');
                self.attr('aria-expanded', newAriaExp);
                if (isAriaHid == "true") {
                    $('#' + accordionContent).attr('aria-hidden', "false");
                } else {
                    $('#' + accordionContent).attr('aria-hidden', "true");
                }
				});
			} else {
				$('.links-list li .main-link').off("click");
				$('.links-list li').removeClass('down');
				$('.links-list li .secondary-links').removeAttr('style');
				$(".disclosure-aggrement").removeAttr('style');
			}
	},
	//Write all event handlers here
    eventHandlers: function () {
        //Global Footer links : slim.isTouchDevice() && 
        $(window).resize(function(){
			slim.footerLinkHandler();
		});
		
		$('#disclosure').on("click", function (e) {
                e.preventDefault();
                $(".links-list").find('li').not($(this).parent()).removeClass('down');
                $(this).parent().toggleClass('down');
                $('.links-list').find('.secondary-links').slideUp('400');
                $('#disc-aggrement').slideToggle('400');
		});
				
        //ARTICLE DETAILS: View more disclosures
        $(document).on('click', '.view-more', function () {
            var self = $(this);
            self.siblings().slideDown('500');
            self.removeClass('view-more').addClass('view-less');
            if (slim.config.lang === "fr" || slim.config.lang === "fr_CA") {
                self.attr('aria-label', 'View less disclosure French');
            } else {
                self.attr('aria-label', 'View less disclosure English');
            }
        });
        //ARTICLE DETAILS: View less disclosures
        $(document).on('click', '.view-less', function () {
            var self = $(this);
            self.parent().find('.slf-footnote-body').not(':eq(0)').slideUp('500');
            self.removeClass('view-less').addClass('view-more');
            if (slim.config.lang === "fr" || slim.config.lang === "fr_CA") {
                self.attr('aria-label', 'View more disclosure French');
            } else {
                self.attr('aria-label', 'View more disclosure English');
            }

        });
        //HOMEPAGE: Animate currency button CAD
        $(document).on('click', '.currency.cad', function (e) {
            e.preventDefault();
            var self = $(this),
                slider = slim.config.ObjBtn.css('left') === '75px' ? 0 : 0,
                USD = $('.currency.usd');
            //switch attribute values
            self.attr('aria-pressed', 'true');
            USD.attr('aria-pressed', 'false');
            //Animate the button
            slim.config.ObjBtn.animate({
                left: slider
            });
            //show hide USD/CAD items
            $('.currency-index').find('.cad-val').removeClass('hidden').end().find('.usd-val').addClass('hidden');
        });
        //HOMEPAGE: Animate currency button USD
        $(document).on('click', '.currency.usd', function (e) {
            e.preventDefault();
            var self = $(this),
                slider = slim.config.ObjBtn.css('left') === '0' ? '75px' : '75px',
                CAD = $('.currency.cad');
            //switch attribute values
            self.attr('aria-pressed', 'true');
            CAD.attr('aria-pressed', 'false');
            //Animate the button
            slim.config.ObjBtn.animate({
                left: slider
            });
            //show hide USD/CAD items
            $('.currency-index').find('.usd-val').removeClass('hidden').end().find('.cad-val').addClass('hidden');
        });
        //Sign-in modal validation
        $(document).on('submit', '#form_signon_modal', function (e) {
            e.preventDefault()
            var $form = $(this).parsley();
            $form.validate()
            if ($form.isValid()) {
                $.ajax({
                    url: '/slimUserServices/InvokeSLIMUserServicesServlet',
                    type: 'POST',
                    data: $(this).serialize(),
                    timeout: 5000,
                    success: function (data) {
                        var $form = $('#form_signon_modal');
                        $form.attr("action", data);
                        $form.unbind('submit');
                        $form[0].submit();
                    },
                    error: function (jqXHR, textStatus) {
                        var Obj = $('#serverr-container');
                        if (jqXHR.status === 406) {
                            Obj.html('<p class="pad-top-15">Incorrect username and password combination.</p><p>Need help? contact <a href="mailto:slc.help@slcmanagement.com">slc.help@slcmanagement.com</a></p>');
                        }
                        if (textStatus === 'timeout') {
                            Obj.html('<p class="pad-top-15">Our apologies! We are having some technical difficulties, please come back later.</p>');
                        }
                    }
                });
            }
        });
        //SIGN-IN: Forgot password validation
        $(document).on('click', '#frgt-pwd', function () {
            var inputName = $("#userName"),
                Fdata = {
                    "userName": inputName.val(),
                    "forgot": true
                }
            inputName.parsley().validate();
            inputName.focus();
            if (inputName.parsley().isValid()) {
                $.ajax({
                    url: '/slimUserServices/InvokeSLIMUserServicesServlet',
                    type: 'POST',
                    data: Fdata,
                    timeout: 5000,
                    success: function (data) {
                        window.location.href = data
                    },
                    error: function (jqXHR, textStatus) {
                        var Obj = $('#serverr-container');
                        if (jqXHR.status === 406) {
                            Obj.html('<p class="pad-top-15">Please provide your username and click submit. You will be redirected to a password recovery page.</p>');
                        }
                        if (textStatus === 'timeout') {
                            Obj.html('<p class="pad-top-15">Our apologies! We are having some technical difficulties, please come back later.</p>');
                        }
                    }
                });
            }
        });
        //CONTACT US:form submit 
        $(document).on('submit', '#contactform', function (e) {
            e.preventDefault()
            var $contactform = $(this).parsley();
            $contactform.validate();
            if ($contactform.isValid()) {
                var todayDate = new Date(),
                    month = todayDate.getMonth() + 1,
                    day = todayDate.getDate(),
                    current_date = day + '/' +
                    (month < 10 ? '0' : '') + month + '/' +
                    (day < 10 ? '0' : '') + todayDate.getFullYear(),
                    selectedRegion = $("#control_Region").val(),
                    selectedOrg = $("#control_Organization").val(),
                    lookupId = "OGM4Mjc3N2MwNjVkYTYxMFZnblZDTTEwMDAwMGNmNjExZGFjUkNSRA==",
                    contactUsEmailURL = "/slfglobal/templates/common/shared_email.jsp?lookUpId=" + lookupId,
                    emaillang = (slim.config.lang === 'fr' || slim.config.lang === 'fr_ca') ? "fr-CA" : "en-CA",
                    contactUsEmailURL = contactUsEmailURL + "&locale=" + emaillang,
                    userData = {
                        "control_Name": $("#control_Name").val(),
                        "control_EMAIL": $("#control_EMAIL").val(),
                        "control_Region": selectedRegion,
                        "control_Organization": selectedOrg,
                        "control_message": $("#control_message").val(),
                        "control_Date": current_date,
                        "control_Subject": "Website inquiry: " + selectedRegion + "," + selectedOrg,
                    };
                $.ajax({
                    type: "POST",
                    url: contactUsEmailURL,
                    data: userData,
                    timeout: 5000,
                    success: function () {
                        $('#contactform')[0].reset();
                        $('.contact-form').slideUp(400, function () {
                            $("#success_message").fadeIn('slow');
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.status === 500) {
                            if (slim.config.lang === 'fr' || slim.config.lang === 'fr_ca') {
                                $('#error-message').html('<p class="error"><span class="fa fa-times-circle"></span> Votre message n&#39;a pas &#233;t&#233; envoy&#233;. Veuillez r&#233;essayer.</p>').delay(6000).fadeOut(1000, function () {
                                    $(this).html('').fadeIn();
                                });
                            } else {
                                $('#error-message').html('<p class="error"><span class="fa fa-times-circle"></span> Your message has not been sent. Please try again.</p>').delay(6000).fadeOut(1000, function () {
                                    $(this).html('').fadeIn();
                                });
                            }
                        }
                        if (textStatus === 'timeout') {
                            if (slim.config.lang === 'fr' || slim.config.lang === 'fr_ca') {
                                $('#err-container').html('<p>Veuillez nous excuser! Nous &#233;prouvons quelques difficult&#233;s techniques. R&#233;essayez plus tard.</p>').delay(6000).fadeOut(1000, function () {
                                    $(this).html('').fadeIn();
                                });
                            } else {
                                $('#err-container').html('<p>Our apologies! We are having some technical difficulties, please come back later.</p>').delay(6000).fadeOut(1000, function () {
                                    $(this).html('').fadeIn();
                                });
                            }
                        }
                    }
                });
            }
        });
        //ACCORDION
        $(document).on('click', '.accordion-head', function (e) {
            e.preventDefault();
            var anchor = $('.profile-name'),
                newAriaVal = (anchor.attr('aria-expanded') == "false") ? "true" : "false",
                content = $(this).next();
            anchor.attr('aria-expanded', newAriaVal)
            if (content.attr('aria-hidden') == 'true') {
                content.attr('aria-hidden', 'false');
                content.slideDown('500').end().find('.fa').addClass('fa-minus-circle').removeClass('fa-plus-circle');
            } else {
                content.attr('aria-hidden', 'true');
                content.slideUp('500').end().find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
            }
        });
    },
    //Detect mobile device
    isTouchDevice: function () {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    },
   
}
//Initiating on document ready
$(function () {
    slim.init();
});