// //v1.49 Dec 21: z034
// // merged with the latest mock up + added left nav fix at last
// /*  ===========================================
// ============== * responsive tabs * =============
// =========================================== */

// var fakewaffle = ( function ( $, fakewaffle ) {
// 	'use strict';

// 	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {

// 		fakewaffle.currentPosition = 'tabs';

// 		var tabGroups = $( '.nav-tabs.responsive' );
// 		var hidden    = '';
// 		var visible   = '';
// 		var activeTab = '';

// 		if ( collapseDisplayed === undefined ) {
// 			collapseDisplayed = [ 'xs', 'sm' ];
// 		}

// 		$.each( collapseDisplayed, function () {
// 			hidden  += ' hidden-' + this;
// 			visible += ' visible-' + this;
// 		} );

// 		$.each( tabGroups, function () {
// 			var $tabGroup   = $( this );
// 			var tabs        = $tabGroup.find( 'li a' );
// 			var collapseDiv = $( '<div></div>', {
// 				'class' : 'panel-group responsive' + visible,
// 				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
// 			} );

// 			if(!$tabGroup.hasClass("mobile-tab-group")) {

// 			$.each( tabs, function () {
// 				var $this          = $( this );
// 				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
// 				var newLinkClass   = 'accordion-toggle';
// 				if ((typeof  $(this).parent().attr('class') === 'undefined') || ($(this).parent().attr('class').indexOf('active')== -1)) { // added this for the arrows on the collapsable tabs on mobile
// 					newLinkClass = newLinkClass + ' collapsed';
// 				}
// 				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
// 				var newParentClass = 'panel panel-default';
// 				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

// 				if ( oldLinkClass.length > 0 ) {
// 					newLinkClass += ' ' + oldLinkClass;
// 				}

// 				if ( oldParentClass.length > 0 ) {
// 					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
// 					newParentClass += ' ' + oldParentClass;
// 					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
// 					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
// 				}

// 				if ( $this.parent().hasClass( 'active' ) ) {
// 					activeTab = '#' + newHash;
// 				}

// 				collapseDiv.append(
// 					$( '<div>' ).attr( 'class', newParentClass ).html(
// 						$( '<div>' ).attr( 'class', 'panel-heading' ).html(
// 							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
// 								$( '<a>', {
// 									'class'       : newLinkClass,
// 									'data-toggle' : 'collapse',
// 									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
// 									'href'        : '#' + newHash,
// 									'html'        : $this.html()
// 								} )
// 							)
// 						)
// 					).append(
// 						$( '<div>', {
// 							'id'    : newHash,
// 							'class' : 'panel-collapse collapse'
// 						} )
// 					)
// 				);
// 			} );

// 			$tabGroup.next().after( collapseDiv );
// 			$tabGroup.addClass( hidden );
// 			$( '.tab-content.responsive' ).addClass( hidden );
// 			}
// 		} );


// 		fakewaffle.checkResize();
// 		fakewaffle.bindTabToCollapse();

// 		if ( activeTab ) {
// 			$( activeTab ).collapse( 'show' );
// 		}
// 	};

// 	fakewaffle.checkResize = function () {

// 		if ( $( '.panel-group.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
// 			fakewaffle.tabToPanel();
// 			fakewaffle.currentPosition = 'panel';
// 		} else if ( $( '.panel-group.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
// 			fakewaffle.panelToTab();
// 			fakewaffle.currentPosition = 'tabs';
// 		}

// 	};

// 	fakewaffle.tabToPanel = function () {

// 		var tabGroups = $( '.nav-tabs.responsive' );

// 		$.each( tabGroups, function ( index, tabGroup ) {

// 			// Find the tab
// 			var tabContents = $( tabGroup ).next( '.tab-content' ).find( '.tab-pane' );

// 			$.each( tabContents, function ( index, tabContent ) {
// 				// Find the id to move the element to
// 				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );

// 				// Convert tab to panel and move to destination
// 				$( tabContent )
// 					.removeClass( 'tab-pane' )
// 					.addClass( 'panel-body' )
// 					.appendTo( $( destinationId ) );

// 			} );

// 		} );

// 	};

// 	fakewaffle.panelToTab = function () {

// 		var panelGroups = $( '.panel-group.responsive' );

// 		$.each( panelGroups, function ( index, panelGroup ) {

// 			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
// 			var destination   = $( destinationId ).next( '.tab-content' )[ 0 ];

// 			// Find the panel contents
// 			var panelContents = $( panelGroup ).find( '.panel-body' );

// 			// Convert to tab and move to destination
// 			panelContents
// 				.removeClass( 'panel-body' )
// 				.addClass( 'tab-pane' )
// 				.appendTo( $( destination ) );

// 		} );

// 	};

// 	fakewaffle.bindTabToCollapse = function () {

// 		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
// 		var collapse = $( '.panel-group.responsive' ).find( '.panel-collapse' );

// 		// Toggle the panels when the associated tab is toggled
// 		tabs.on( 'shown.bs.tab', function ( e ) {
// 			var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );
// 			$current.collapse( 'show' );

// 			if ( e.relatedTarget ) {
// 				var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
// 				$previous.collapse( 'hide' );
// 			}
// 		} );

// 		// Toggle the tab when the associated panel is toggled
// 		collapse.on( 'shown.bs.collapse', function ( e ) {

// 			// Activate current tabs
// 			var current = $( e.target ).context.id.replace( /collapse-/g, '#' );
// 			$( 'a[href="' + current + '"]' ).tab( 'show' );

// 			// Update the content with active
// 			var panelGroup = $( e.currentTarget ).closest( '.panel-group.responsive' );
// 			$( panelGroup ).find( '.panel-body' ).removeClass( 'active' );
// 			$( e.currentTarget ).find( '.panel-body' ).addClass( 'active' );

// 		} );
// 	};

// 	$( window ).resize( function () {
// 		fakewaffle.checkResize();
// 	} );

// 	return fakewaffle;
// }( window.jQuery, fakewaffle || { } ) );

// function setResponsiveTabs(){
// 	//commenting out as we have made chaanges
// 	//tabfix();
// 	$("[id^='slf-responsive'] a").click(function(e){
// 		e.preventDefault();
// 		$( this ).tab( 'show' );
// 	});

// 	(function($){
// 			fakewaffle.responsiveTabs( [ 'xs' ] );
// 	})( jQuery );
// }

// setResponsiveTabs();


// /* ===========================================
// ============== * sunlifeca.js * ====================
// =========================================== */
// /* Key Code Constants */
// var ENTER = 13;
// var TAB = 9;
// var DOWN = 40;
// var RIGHT = 39;
// var LEFT = 37;
// var UP = 38;
// var ESC = 27;
// var isResponsive = ($(".container").css("min-width") == "0px");

// function removeMenuHover(){
// 	$('.main-nav > .dropdown').unbind('mouseenter').unbind('mouseleave');
// }

// function setMenuHover(){
// 	var timer = null;
// 	var onhover_timer = null;
// 	var timer_element;
// 	$('.main-nav > .dropdown').hover(function() {
// 		if(!isTouchDevice()){
// 			if($('.nav-item.open').get(0) == $(this).get(0)){
// 				//$('.nav-item.open').removeClass('open');
// 				clearTimeout(timer);
// 				clearTimeout(onhover_timer);
// 				timer = null;
// 			}else{
// 				if(timer == null){
// 					$('.nav-item.open').removeClass('open');
// 					$(this).addClass('open');
// 				}else{
// 						$this = $(this);
// 						onhover_timer = setTimeout(function(){
// 							clearTimeout(timer);
// 							timer = null;
// 							$('.nav-item.open').removeClass('open');
// 							$this.addClass('open');
// 							onhover_timer = null
// 						}, 500);
// 				}
// 			}

// 			//set third level nav hover event
// 			var menucontent = $(this).find('.menu-content').first();
// 			menucontent.find('.dropdown-submenu').hover(function() {
// 				var submenu = $(this).find('ul');
// 				var menucontent = $(this).closest('.menu-content').first();
// 				var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height'))) ;
// 				submenu.css('height', max -6);
// 				menucontent.css('height', max);
// 				var url = document.location.href;
// 				if(url.indexOf('RESP+calculator')>-1){
// 					submenu.css('height', max);
// 					menucontent.css('height', max + 6);
// 				}
// 			},function(){
// 				$(this).find('ul').removeAttr('style');
// 				 $(this).closest('.menu-content').removeAttr('style');
// 			});
// 		}
// 	}, function() {
// 		if(!isTouchDevice() && timer == null && $('.nav-item.open').length > 0 ){
// 			$this = $(this);
// 			timer = setTimeout(function(){
// 				$this.removeClass('open');
// 				timer_element = $this;
// 				timer = null
// 			}, 500);
// 		}
// 		//clear css formatting
// 		var menucontent = $(this).find('.menu-content').first();
// 		menucontent.find('.dropdown-submenu ul').removeAttr('style');
// 	});

// 	$('.main-nav > .dropdown > a').focus(function(e){
// 		if(!isTouchDevice()){
// 			$('.nav-item').trigger('mouseleave');
// 			$(this).closest('.dropdown').trigger('mouseover');
// 		}
// 	});

// 	$('.main-nav > .dropdown > a').click(function(e){
// 		if(!isTouchDevice()){
// 			location.href = this.href;
// 		}
// 		else{
// 			$('.nav-item.open').removeClass('open');
// 			$(this).closest('.nav-item').addClass('open');
// 			var menucontent = $(this).closest('.nav-item').find('.menu-content').first();
// 			menucontent.find('.dropdown-submenu ul').css('height', menucontent.height());
// 			e.stopPropagation();
// 		}
// 	});

// 	$('.menu-content a[data-toggle=dropdown]').click(function(e){
// 		if(!isTouchDevice() && !isMobile()){
// 			location.href = this.href;
// 		}
// 		else{
// 			e.stopPropagation();
// 		}
// 	});

// }

// function isValidName(str) {
// 	var matches = str.match(/\d+/g);
// 	if (matches != null) {
// 			return false;
// 	}
// 	return true;
// }

// function isEmpty(str){
// 	return !$.trim(str);
// }

// function isMobile(size){
// 	var mobile_breakpoint = 1025;
// 	if (!isResponsive)
// 		mobile_breakpoint = 3;

// 	var viewportWidth = size || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// 	if(viewportWidth >= mobile_breakpoint){
// 		return false;
// 	}
// 	else{
// 		return true;
// 	}
// }

// function isXS(){
// 	var mobile_breakpoint = 767;
// 	var viewportWidth = window.innerWidth ;

// 	if(viewportWidth > mobile_breakpoint){
// 		return false;
// 	}
// 	else{
// 		return true;
// 	}
// }

// function isTouchDevice() {
//  return (('ontouchstart' in window)
//       || (navigator.MaxTouchPoints > 0)
//       || (navigator.msMaxTouchPoints > 0));
// }

// function setDesktopOnlyEvents(){
// 	setMenuHover();
// 	$('.navbar').removeClass('mobile');

// 	setNewsListingTab();
// }

// function setNewsListingTab(){
// 	if(isXS()){
// 		if(!$('.news-listing .slf-full-tabs > li.active +  .tab-content').length){
// 			$('.news-listing .tab-content ').insertAfter('.news-listing .slf-full-tabs > li.active');
// 		}
// 	}else{
// 		if(!$('.news-listing > ul +  .tab-content').length){
// 			$('.news-listing .tab-content ').insertAfter('.news-listing > ul');
// 		}
// 	}
// }

// function setMobileOnlyEvents(){
// 	removeMenuHover();
// 	$('.navbar').addClass('mobile');

// 	$('.slf-tab-container .panel .panel-collapse').each(function(){

//     // below code is to ensure first accordion is expanded if a anchored in the URL
//     var url = window.location.href;
// 	if(url.indexOf("#")!=-1){
//      	//selecting the content which needs to be collapsed
// 		var id = url.substring(url.lastIndexOf("#")+1, url.length);
// 		var accordianBody = $(id).attr('href') +".collapse";
//         var firstliid = $('.slf-full-tabs li a').eq(0).attr('id');

//         if(id!=firstliid)
//         {
//                      		  $(this).collapse("hide");
//         }
//         }else{

//         $(this).collapse("hide");
//        }

// 	});

// 	setNewsListingTab();


// 	//set mobile back button events
// 	$('.navbar.mobile .menu-content>div>ul > li.go-back, .language-tab-mobile .go-back').on('click', function(event){
// 		//$('.sidebar-offcanvas').css('top', '0');
// 		$('.main-nav').removeClass('moves-out');
// 		$(this).closest('.dropdown').closable = true;
// 		$(this).closest('.dropdown').removeClass('open');
// 	});
// 	$('.navbar.mobile .menu-content .dropdown-submenu .dropdown-menu .go-back').on('click', function(event){
// 		//$('.sidebar-offcanvas').css('top', '0');
// 		$(this).closest('ul').parent().removeClass('moves-out');
// 		$(this).closest('li').parent().removeClass('moves-out');
// 		$(this).closest('.nav-item').addClass('open');
// 		$(this).closest('.nav-item').removeClass('moves-out');
// 		$(this).closest('.menu-content').removeClass('disableScroll');
// 		event.stopPropagation();
// 	});

// 	//open sub-navigation(s)
// 	$('.navbar.mobile .main-nav > li > .subnav-trigger').on('click', function(event){
// 		if(isMobile()){
// 			event.preventDefault();
// 			$(".main-nav").scrollTop(0);
// 			$('.main-nav').addClass('moves-out');
// 			$(".main-nav .dropdown-menu").scrollTop(0);
// 		}
// 	});
// 	$('.navbar.mobile .subnav-trigger + div .subnav-trigger').on('click', function(event){
// 		if(isMobile()){
// 			event.preventDefault();
// 			$(this).closest('ul').addClass('moves-out');
// 			$(this).closest('li').addClass('moves-out');
// 			$(this).closest('.nav-item').addClass('moves-out');
// 			$(this).closest('.menu-content').addClass('disableScroll');
// 			$(".main-nav .dropdown-menu").scrollTop(0);
// 			event.stopPropagation();
// 		}
// 	});

// 	$('.mobile .dropdown').on({
//     "shown.bs.dropdown": function() { this.closable = true; },
//     "click":             function() { this.closable = false; },
//     "hide.bs.dropdown":  function() { return this.closable;  }
// 	});
// 	// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 	if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 	}
// }

// /*  ===========================================
// ============== * page load event * ===============
// =========================================== */
// jQuery(document).ready(function($){
// 	var viewportWidth = $(document).width();
// 	pageLevelNotify();
// 	 checkCookieExists();
// 	 checkBrowserCookieExists();
// 	 LanguageToggle();

// 	//add content-container class for mobile
// 	$('.row-offcanvas > .col-xs-12').addClass('content-container');
// 	if(!isMobile()){
// 		setDesktopOnlyEvents();
// 	}
// 	else{
// 		setMobileOnlyEvents();
// 	}

// 	//enable tooltips
// 	$('[data-toggle="tooltip"]').tooltip();

// 	//mega menu accessibility
// 	$('.mega-menu-col3 a, .mega-menu-col1 a, .mega-menu-col2 a').on('keydown', function(e) {
// 		if ( e.keyCode == DOWN ) {
// 			// Show sub menu
// 			$(this).parent().next().focus();
// 			$(this).parent().next().find('a').focus();

// 			if($(this).closest('.menu-content').find('a').last().is($(this))){
// 				//$(this).closest('.nav-item').next().find('>a').focus();
// 				//return false;
// 			} else if($(this).parent().parent().find('a').last().is($(this))){
// 				$(this).parent().parent().parent().next().find('a:first').focus();
// 				return false;
// 			}
// 			return false;
// 		}
// 		if ( e.keyCode == UP ) {
// 			// Show sub menu
// 			$(this).prev().find('a').focus();
// 			$(this).parent().prev().find('a').focus();

// 			if($(this).parent().parent().find('a').first().is($(this))){
// 				$(this).parent().parent().parent().prev().find('a:last').focus();
// 				return false;
// 			}
// 			return false;
// 		}
// 		if ( e.keyCode == ESC ) {
// 			// Show sub menu
// 			$(this).closest('.nav-item').find('>a').focus();
// 			$(this).closest('.menu-content').dropdown('toggle');
// 			//return false;
// 		}
// 	});

// 	//if Tab is pressed on the last link in the mega menu section, close the mega menu
// 	//if Shift + Tab was pressed keep the mega menu open and focus on the link above it
// 	$('.nav-item .dropdown-menu:last-child div:last-child li:last-child > a').on('keydown',function(e) {
//  		if (e.keyCode == TAB && !e.shiftKey) { // if Tab was pressed, but not Shift+Tab
// 			if ($(this).closest('.mega-menu-category').length == 0) { //if this isn't the first mega-menu-category under Explore products
// 				$(this).closest('.nav-item').removeClass('open');
// 			}
// 		}
// 	});

// 	// When interacting with a li that has a sub menu
// 	$('.nav-item .dropdown-submenu:has(".dropdown-menu") > a').on('keydown', function(e) {
// 		if ( e.keyCode == RIGHT ) {
// 			// Show sub menu
// 			//$(this).children('ul').addClass('show');

// 			//Reset values before adding new
// 			$(this).parents().find('.dropdown-submenu').removeClass('open');
// 			$(this).parents().find('ul.dropdown-menu').removeAttr('style');
// 			$(this).closest('.menu-content').removeAttr('style');

// 			var submenu = $(this).parent().find('.dropdown-menu');
// 			var menucontent = $(this).closest('.menu-content').first();
// 			var max = Math.max(parseInt(menucontent.css('height')), parseInt(submenu.css('height')));
// 				submenu.css('height', max -6);
// 				menucontent.css('height', max);
// 			$(this).closest('.dropdown-submenu').addClass('open');
// 			$(this).closest('.dropdown-submenu').find(".dropdown-menu li:not('.go-back')>a:first").focus();
// 			return false;
// 		}
// 	});

// 	// When using the key down/up or shift/tab to leave the mega menu, close the mega menu. 
// 	// Key down events don't work when speech readers are on, so using the opposite approach - 
// 	// when the search or signin buttons are focused, close the mega menu.
// 	$( "#signinbutton, #search-btn" ).focus(function() {
// 			$('.nav-item').removeClass('open');
// 	});

// 	// If key is pressed while on the last link in a sub menu
// 	$('.dropdown-submenu:has(".dropdown-menu") li:last-child > a').on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if (e.keyCode == DOWN ) {
// 			// Close this sub menu
// 			$(this).closest('.dropdown-submenu').removeClass('open');
// 			$(this).closest('.dropdown-menu').parent('li').find('a').focus();
// 			return false;
// 		}
// 	});

// 	$('.nav-item > a').on('keydown', function(e) {
// 		if(e.keyCode == TAB){
// 			$(this).closest('.nav-item').removeClass('open');
// 			$(this).focusout();
// 		}
// 	});


// 	//language region / page notification / search  --  show/hide events (desktop/mobile)
// 	$('.topCollapse').on('show.bs.collapse', function () {
// 		$('.topCollapse > .in').collapse('hide');
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) + 104 +"px");
// 	});
// 	$('.topCollapse').on('hide.bs.collapse', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - 104 +"px");
// 	});
// 	$('.topCollapse .language-region-pad').on('show.bs.collapse', function (e) {
// 		e.stopPropagation();
// 	});
// 	$('#page-notify .alert').on('close.bs.alert', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#page-notify').height() +"px");
// 	});
// 	$('#browser-alert .alert').on('close.bs.alert', function () {
// 		$('.mobile-logo').css('margin-top', parseInt($('.mobile-logo').css('margin-top')) - $('#browser-alert').height() +"px");
// 	});
// 	$(".language-region-pad ul").on('hidden.bs.collapse shown.bs.collapse', function () {
// 		$(this).find("li[aria-expanded='false'] > div a").css("font-weight","normal");
// 		//$(".language-region-pad ul li[aria-expanded='false'] .fa").removeClass("fa-caret-down").addClass("fa-caret-right");
// 		$(this).find("li[aria-expanded='true'] > div a").css("font-weight","bold");
// 		//$(".language-region-pad ul li[aria-expanded='true'] .fa").removeClass("fa-caret-right").addClass("fa-caret-down");
// 	});

// 	//switch views between mobile and desktop
// /*	$("#desktopview-ok-btn").click(function () {
// 		//console.log('desktop view clicked');
// 		$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 	});*/
// 	$("#mobileview-ok-btn").click(function () {
// 		//console.log('mobile view clicked');
// 		$("#viewport").attr('content', 'width=320, initial-scale=1.0');
// 	});

// 	$('.footer [data-toggle="collapse"]').click(function(e){
// 		if (!isXS()) {
// 			e.stopPropagation();
// 		}
// 	});

// 	//Header language accessibility
// 	$('#sun-language').on('shown.bs.collapse', function (e) {
// 		//$(".language-region .language-region-pad:first a:first").focus();
// 		$(this).find(".fa-remove").focus();
// 		if(e.target.id == "sun-language")
// 			$('#language-btn').addClass("language-btn");
// 	});
// 	$('#sun-language').on('hidden.bs.collapse', function () {
// 		$('#language-btn').removeClass("language-btn");
// 	});
// 	$(".language-region a:last").on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if ((e.keyCode == 9)) {
// 			// Close this sub menu
// 			$(this).closest('#sun-language').collapse('toggle');
// 			$("#language-btn").focus();
// 			return false;
// 		}
// 	});

// 	// sun search
// 	$('#sun-search').on('shown.bs.collapse', function () {
// 		//$("#globalSearch").focus();
// 		$(this).find(".fa-remove").focus();
// 		return false;
// 	});

// 	$(".global-search .btn").on('keydown', function(e) {
// 		// If tabbing out of the last link
// 		if ((e.keyCode == TAB)) {
// 			// Close this sub menu
// 			$("#sun-search").collapse('toggle');
// 			$(".search-icon-container div").focus();
// 			return false;
// 		}
// 	});

// 	$('#customerSignInDesk').on('shown.bs.collapse', function () {


// 		$("#customerSignInDesk").on('keydown', function(e) {
// 			if(e.keyCode == ESC) {
// 				// Close this sub menu
// 				$("#customerSignInDesk").collapse("toggle");
// 				$('.customer-sign-label').focus();
// 				return false;
// 			}
// 		});

// 		$('#footer-pin-bar .icon-remove').focus();
// 		return false;
// 	});

// 	/* language-toggle: open nav-selected item by default */
// 	if ($(".language-region-pad").find(".nav-selected").parent().parent().attr("data-toggle")=="collapse"){
// 		$(".language-region-pad").find(".nav-selected").parent("ul").parent().click();
// 		$(".language-region-pad").find(".nav-selected").parent("ul").parent().css('font-weight','700');
// 	}

// 	$("#sun-language").find(".collapse").on('shown.bs.collapse', function (e) {
// 		e.stopPropagation();
// 	});

// 	$('.lifestage .fa-remove').click(function(){
// 		$('li').removeClass("active");
// 		$('div').removeClass("active in");

// 		// move focus back to tab, after close
// 		//var temp = $(this);
// 		var labelledby = $(this).parents('.tab-pane').attr('aria-labelledby');
// 		$('#' + labelledby).focus();

// 		// reset the tabindexes
// 		$('a[data-toggle="tab"]').attr('tabindex','-1');
// 		$('#' + labelledby).attr('tabindex','0');
// 	});

// 	// used for "tabs" that refresh the page, when a tab is selected
// 	$('a[data-toggle="reload"]').on('keydown', function (e) {
// 		if(e.keyCode == ENTER){
// 			var temp_tab = $(this);
// 			$(temp_tab.attr("href")).focus();
// 		}
// 		if(e.keyCode == RIGHT){
// 			var temp_tab = $(this);
// 			var nextTab;

// 			if (temp_tab.parent().is(':last-child')) {
// 				nextTab = temp_tab.parent().parent().children().first().children();
// 			} else {
// 				nextTab = $(this).parent().next().children();
// 			}
// 			nextTab.focus();
// 		}
// 		if(e.keyCode == LEFT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			if (temp_tab.parent().is(':first-child')) {
// 				nextTab = temp_tab.parent().parent().children().last().children();
// 			} else {
// 				nextTab = $(this).parent().prev().children();
// 			}
// 			nextTab.focus();
// 		}

// 	});

// 		$(".panel-title").on("click", function(){
// 			var group = $(this).closest(".panel-group");
// 			var targetCollapse = $(this).closest(".panel").find(".panel-collapse");
// 			var collapseElements = group.find(".panel-collapse");
// 			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
// 			var curIndex = collapseElements.index(targetCollapse);
// 			var prevOpenHeight = 0;
// 			if(indexOpen <curIndex){
// 				prevOpenHeight = group.find(".panel-collapse.in").height();
// 			}
// 			var padding = parseInt($(this).closest(".panel-heading").css("paddingTop"));
// 			if($(this).closest(".panel").find(".panel-collapse.in").length === 0){
// 				var offset = $(this).offset();console.log( padding );
// 				$("html, body").animate({
// 					scrollTop :offset.top - $(".mobile-navbar").height() - padding - prevOpenHeight
// 				}, 700);
// 			}
// 		});

// 		$("#accordion-parent .accordion-heading").on("click", function(){
// 			var group = $(this).closest(".panel").parent();
// 			var targetCollapse = $(this).closest(".panel").find(".collapse");
// 			var collapseElements = group.find(".collapse");
// 			var indexOpen = collapseElements.index(collapseElements.filter(".in"));
// 			var curIndex = collapseElements.index(targetCollapse);
// 			var prevOpenHeight = 0;
// 			if(indexOpen <curIndex){
// 				var prevCollapse = group.find(".collapse.in").css("display", "table");
// 				prevOpenHeight = prevCollapse.outerHeight(true);
// 				prevCollapse.css("display", "");
// 			}

// 			if($(this).closest(".panel").find(".collapse.in").length === 0){
// 				var offset = $(this).offset();
// 				$("html, body").animate({
// 					scrollTop :offset.top - $(".mobile-navbar").height() - prevOpenHeight
// 				}, 700);
// 			}
// 		});

// 	// make tab content non-focusable
// 	$('div[role="tabpanel"]').focusout(function() {
// 		$(this).removeAttr('tabindex');
// 	});

// 	$('a[data-toggle="tab"]').on('keydown', function (e) {
// 		if(e.keyCode == ENTER){
// 			var temp_tab = $(this);
// 			temp_tab.tab('show');

// 			$('a[data-toggle="tab"]').attr('tabindex','-1');
// 			temp_tab.attr('tabindex','0');
// 			// why if?  can't remember
// 			$(temp_tab.attr("href")).attr('tabindex','0');
// 			if (temp_tab.is(":focus")) {

// 				$(temp_tab.attr("href")).focus();
// 			}
// 		}

// 		if(e.keyCode == RIGHT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			// if last tab in widget, then wrap to first tab
// 			if (temp_tab.parent().is(':last-child')) {
// 				nextTab = temp_tab.parent().parent().children().first().children();
// 			} else {
// 				nextTab = $(this).parent().next().children();
// 			}
// 			nextTab.focus();
// 			// if on home page, don't show the tab by default
// 			if (temp_tab.parents('.lifestage').length <= 0) {
// 				nextTab.tab('show');
// 			}

// 		}
// 		if(e.keyCode == LEFT){
// 			var temp_tab = $(this);
// 			var nextTab;
// 			// if first tab in widget, then wrap to last tab
// 			if (temp_tab.parent().is(':first-child')) {
// 				nextTab = temp_tab.parent().parent().children().last().children();
// 			} else {
// 				nextTab = $(this).parent().prev().children();
// 			}
// 			nextTab.focus();
// 			// if on home page, don't show the tab
// 			if (temp_tab.parents('.lifestage').length <= 0) {
// 				nextTab.tab('show');
// 			}

// 		}
// 	});

// 	$('a[data-toggle="tab"]').on('hidden.bs.tab', function () {
// 		var temp_tab = $(this);
// 		temp_tab.attr('tabindex', '-1');
// 		temp_tab.attr('aria-selected','false');
// 		// need to remove this from <a>, otherwise breaks in Safari on Mac
// 		temp_tab.removeAttr('aria-expanded');

// 		$(temp_tab.attr("href")).attr('aria-hidden','true');
// 		$(temp_tab.attr("href")).attr('aria-expanded','false');
// 		$(temp_tab.attr("href")).removeAttr('tabindex');

// 	});

// 	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
// 		var temp_tab = $(this);
// 		temp_tab.attr('tabindex', '0');
// 		temp_tab.attr('aria-selected','true');
// 		// need to remove this from <a>, otherwise breaks in Safari on Mac
// 		temp_tab.removeAttr('aria-expanded');

// 		$(temp_tab.attr("href")).attr('aria-hidden','false');
// 		$(temp_tab.attr("href")).attr('aria-expanded','true');

// 		// this sets the focus to the first link in the tab panel
// 		//$(temp_tab.attr("href")).find('a:first').focus();

// 		/*
// 		// this forces the focus back to the tab after the last link in the tab panel
// 		$(temp_tab.attr("href")).find('a:last').on('keydown', function(){
// 			$(temp_tab.attr("href")).find('.fa-remove').click();
// 			temp_tab.focus();
// 			return false;
// 		});
// 		*/
// 		$(temp_tab.attr("href")).find('.fa-remove').on('keydown', function(e){
// 				if(e.keyCode== ENTER){
// 					$(temp_tab.attr("href")).find('.fa-remove').click();
// 					temp_tab.focus();
// 					return false;
// 				}
// 			});
// 			// if home page, then set focus to the "x"
// 			if (temp_tab.parents('.lifestage').length > 0) {
// 				$(temp_tab.attr("href")).find('.fa-remove').focus();
// 			}
// 			//$(temp_tab.attr("href")).find('.fa-remove').focus();
// 			return false;
// 		});

// 		/* language/search/pinbar accessibility */
// 		$('#language-btn, #search-btn, #pinbar-signin').on('click keypress', function(e){
// 			$(this).data('clicked', true);
// 			if(e.keyCode == 13 || e.keyCode == 32){
// 				$(this).click();
// 			}
// 		});
// 		if(navigator.userAgent.indexOf("Mac OS X 10_11_") !== -1){//its on a el capitan mac, delay the script
// 			setTimeout(function(){
// 				//adjust column heights to be equal
// 				$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 		      if($(this).closest(".collapse").length >0){
// 		        if($(this).closest(".collapse").hasClass("in") === false ){
// 		          return false;
// 		        }
// 		      }
// 					var columns = $(this).closest(".row").find(".adjust-height");
// 					var maxHeight = Math.max.apply(null, columns.map(function() {
// 							$(this).css("height", "");
// 							return $(this).height();
// 					}).get());
// 					columns.height(maxHeight);
// 				});
// 			}, 100);
// 		}else{
// 			//adjust column heights to be equal
// 			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 	      if($(this).closest(".collapse").length >0){
// 	        if($(this).closest(".collapse").hasClass("in") === false ){
// 	          return false;
// 	        }
// 	      }
// 				var columns = $(this).closest(".row").find(".adjust-height");
// 				var maxHeight = Math.max.apply(null, columns.map(function() {
// 						$(this).css("height", "");
// 						return $(this).height();
// 				}).get());
// 				columns.height(maxHeight);
// 			});
// 		}


//     // //if there are adjust height stuff inside a panel(accordion)
//     // $(".adjust-height").closest(".collapse").on("shown.bs.collapse", function(){
//     //   $(this).find(".adjust-height").each(function(){
//     //     var columns = $(this).closest(".row").find(".adjust-height");
//     //     var maxHeight = Math.max.apply(null, columns.map(function() {
//     //         $(this).css("height", "");
//     //         return $(this).height();
//     //     }).get());
//     //     columns.height(maxHeight);
//     //   });
// 		// });

// 	//adjust column heights to be equal
// 	var maxHeight = Math.max.apply(null, $(".adjust-height").map(function() {
// 			return $(this).height();
// 	}).get());
// 	$(".adjust-height").height(maxHeight);

// 	//if the window has tabs or accordions
// 	//for tabs
// 	$(".slf-full-tabs > li > a").on("shown.bs.tab",function(){
// 		var adjustElements = $($(this).attr("href")).find(".adjust-height");
// 		var maxHeight = 0;
// 		adjustElements.css("height", "");
// 		adjustElements.each(function(){
// 			if($(this).height() > maxHeight){
// 				maxHeight = $(this).height();
// 			}
// 		});
// 		adjustElements.height(maxHeight);
// 		console.log("do you see this?" );
// 	});

// 	//for panels, going to assume the panel can be empty
// 	$(".panel-collapse.collapse, .slf-accordion-plus .collapse").on("shown.bs.collapse", function(){
// 		var adjustElements = $(this).find(".adjust-height");
// 		var maxHeight = 0;
// 		adjustElements.css("height", "");
// 		adjustElements.each(function(){
// 			if($(this).height() > maxHeight){
// 				maxHeight = $(this).height();
// 			}
// 		});
// 		adjustElements.height(maxHeight);
// 	});


// 	/* open accordion on page load */
// 	var url = window.location.href;
// 	if(url.indexOf("#")!=-1){
// 		//selecting the content which needs to be collapsed
// 		var id = url.substring(url.lastIndexOf("#"), url.length);
// 		var accordianBody = $(id).attr('href') +".collapse";
// 		if(id != "#"){
// 			$(accordianBody).collapse("toggle");
// 			//$('#collapse-readyforfuture').addClass('in');
// 			$('#slf-responsive-tab li:first-child a').tab('show');
// 		}
// 	}
// 	url = document.location.toString();
// 	if (url.match('#')) {
// 		var tab_id = url.substring(url.lastIndexOf("#"), url.length);
// 		if(tab_id != "#"){
// 			$('.nav-tabs ' + tab_id).tab('show') ;
// 		}
// 	}

// /* 	$(window).on('hashchange', function(e){
// 		var id = window.location.hash;
// 		if($(id).hasClass('accordion-heading')){
// 			if(id != "#"){
// 				var accordianBody = $(id).attr('href') +".collapse";
// 				$(accordianBody).collapse("show");
// 			}
// 		}
// 	});  */

// 	// Change hash for page-reload
// /* 	$('.nav-tabs a').on('shown.bs.tab', function (e) {
// 			window.location.hash = e.target.hash;
// 	}) */

// 	//show IE browser alert if it is IE
// 	var index = navigator.userAgent.indexOf("MSIE");

// 	if(index!= -1){

// 		var endIndex=navigator.userAgent.indexOf(";", index );
// 		var version = navigator.userAgent.substring(index+4,endIndex);

// 		if(Number(version)<11){

// 			$("#ie-alert").removeClass("hidden");
// 			$("#ie-alert").attr("aria-hidden" , "false");
// 			$("#alert-ie").attr("aria-hidden" , "false");
// 		}
// 	}


// });



// /* ===========================================
// ============== * window resize event * ============
// =========================================== */
// jQuery(document).ready(function($){
// 	var prevWidth = window.innerWidth;
// 	$(window).resize(function() {
// 		//check breakpoint change
// 		if(isMobile(prevWidth) != isMobile()){
// 			if(!isMobile()){
// 				setDesktopOnlyEvents();
// 			}	else {
// 				setMobileOnlyEvents();
// 			}
// 		}
// 		prevWidth = window.innerWidth;

// 			//adjust column heights to be equal
// 			$(".row div[class^='col-']:first-child .adjust-height").each(function(){
// 				var columns = $(this).closest(".row").find(".adjust-height");
// 				var maxHeight = Math.max.apply(null, columns.map(function() {
// 						$(this).css("height", "");
// 						return $(this).height();
// 				}).get());
// 				columns.height(maxHeight);
// 			});

// 	});

// 	/*  ===========================================
// 	============= * window scroll event * ==============
// 	=========================================== */
// 	/**
// 	* DAGS2595: need to not add mobile header to signin area in some cases
// 	* Moved event handler into ready function
// 	* The mobile logo is part of the top nav collection and output via topNav.jsp
// 	*  if don't need to add logo, assuming the collection will not have the content - which was position LN 3 of the topNav collection
// 	*
// 	**/
// 	// Check if any child elements exist before initializing handler
// 	// the element checked comes from topNav.jsp
// 	if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 		$(window).on('scroll',function(){
// 			//mobile header add logo to customer sign in
// 			topbarheight = $('.mobile-logo').height();
// 			// we round here to reduce a little workload
// 			stop = Math.round($(window).scrollTop());

// 			if (stop > topbarheight) {
// 				if(!($('#sunlife-logo-image-nav-mobile').length)){
// 					$('.navbar-toggle').parent().removeClass('col-xs-4').addClass('col-xs-2');
// 					$('.navbar-toggle').parent().after('<div class=\'col-xs-2 logo-icon\' id=\'sunlife-logo-image-nav-mobile\'><div role=\'math\' tabindex=\'0\' aria-label=\'Sun Life Financial\'><a href=""><svg id=\'sunlife-logo-image-nav-mobile\' class=\'media-middle logo-icon\' width=\'34px\' height=\'34px\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'><image xlink:href=\'//cdn.sunlife.com/static/slfglobal/globalweb/responsive/images/en/logo-icon.svg\' x=\'0\' y=\'0\' height=\'34px\' width=\'34px\'></image> </svg></a></div></div>');
// 				}
// 			} else {
// 				$('#sunlife-logo-image-nav-mobile').remove();
// 				$('.navbar-toggle').parent().removeClass('col-xs-2').addClass('col-xs-4');
// 			}
// 		});
// 	}
// 	// for list-topic bars; create a dropdown for mobile, if a list-topic bar exists
// 	// only for CA site
// 	if (/\/ca\//.test(window.location.href)) {
// 		if ($('.list-topic-bar').length > 0) {
// 			// create the dropdown, if it doesn't exist
// 			if ($('#list-topic-form').length < 1) {
// 				createListTopicDropdown('list-topic');
// 			}
// 		}
// 	}
// });
// /*  ===========================================
// ============== * window load event * =============
// =========================================== */
// $(window).load(function() {

// 	$('body').click(function() {
// 		//if(!isMobile()){
// 			//$('.nav-item').removeClass('open');
// 		//}
// 		$("#customerSignInDesk, #sun-search").click(function(){
// 			$(this).data('clicked', true);
// 		});


// 		if($("#customerSignInDesk").hasClass("in")){
// 			if(!$("#customerSignInDesk").data('clicked'))
// 					$("#customerSignInDesk").collapse("toggle");
// 		}

// 		if($("#sun-search").hasClass("in")){
// 			if(!$("#sun-search").data('clicked'))
// 				$("#sun-search").collapse("toggle");
// 		}

// 		// set focus to search input, after it becomes visible
// 		$('#sun-search').on('shown.bs.collapse', function () {
// 			$("#q-top").focus();
// 		});
// 	});
// });

// var listTopicLabels = {
// 	"en": {"ariaLabel":"Select a topic", defaultLabel: "Select a topic" },
// 	"fr": {"ariaLabel":"selectionne", defaultLabel: "selectionne" }
// };

// /* 
//  - creates a form and select element, from a list element; requires a containing element that has a class that ends with "-bar"
//  - additional styling used to show/hide the relevant element
//  - structure and classes match those currently in use on the CA site (as of Nov 2019); changes to those may require changes here
// */
// function createListTopicDropdown(listTopic) {
// 	if ($('#' + listTopic + '-form').length < 1) {
// 		$('<form id="' + listTopic + '-form" action method="post">').appendTo('.' + listTopic + '-bar');
// 		$('<div class="cta-input-section">').appendTo('#' + listTopic + '-form');
// 		$('<label class="text-regular sr-only" id="label-' + listTopic + '">').appendTo('.cta-input-section');
// 		// set aria label text
// 		if ($('html').attr('lang') == 'fr') {
// 			$('#label-' + listTopic).text(listTopicLabels.fr.ariaLabel);
// 		} else {
// 			$('#label-' + listTopic).text(listTopicLabels.en.ariaLabel);
// 		}
// 		$('<select class="form-control cta-input ' + listTopic + '-dropdown" aria-labelledby="label-' + listTopic + '" />').appendTo('.cta-input-section');
// 		$('.' + listTopic + '-bar a').each(function() {
// 			var ahref = $(this);
// 			var option = $('<option />', {
// 				'value'	: ahref.attr('href'),
// 				'text'	: ahref.text()
// 			}).appendTo('.' + listTopic + '-bar select');
// 			if($(this).parent().attr('class') === 'selected') {
// 				option.attr('selected','selected');
// 			}
// 		});
// 		// change text value of first option
// 		// not needed at moment, so removed, for now.  DAGSS-6964
// 		/*
// 		if ($('html').attr('lang') == 'fr') {
// 			$('.' + listTopic + '-dropdown').children('option:first').text(listTopicLabels.fr.ariaLabel);
// 		} else {
// 			$('.' + listTopic + '-dropdown').children('option:first').text(listTopicLabels.en.ariaLabel);
// 		}
// 		*/
// 		$('<div class="cta-button-section">').appendTo('#' + listTopic + '-form');
// 		$('<button class="btn-blue cta-button" id="' +listTopic + '-btn" type="submit">').appendTo('.cta-button-section');
// 		$('<span class="fa fa-chevron-right">').appendTo('#' + listTopic + '-btn');
// 			$('#' + listTopic + '-btn').click(function() {
// 					$('#' + listTopic + '-form').attr('action', $('.' + listTopic + '-dropdown').val());
// 				});
// 	}
// }	

// update the domains to match the environment
$('#signin-widget-modal').on('show.bs.modal', function() {
	// get host from variable defined in signin.js
	// it is assumed to be defined, if not, then default to prod
	var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
	if (host === null || host === undefined) {
		host = "https://www.sunnet.sunlife.com";
	}

	// update all the domains
	var signinWidget = $('#signin-widget-modal').html();
	var newString = signinWidget.replace (/(https?:\/\/)(.*?)(\/+?)/g, host + '$3');
	//$('#signin-widget-modal').html(newString);

	// re-initialize these functions
	//signinbuttonclick();	
    // this not getting triggered on shown, so call it explicitly, here
	updateSignInForm('form_signon');
});

function createCookie(name,value,days, isSession) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  if(isSession){
		document.cookie = name+"="+value+"; path=/;";
  } else {
		document.cookie = name+"="+value+expires+"; path=/;";
  }
}
function readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1,c.length);
     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}
//function pageLevelNotify(){
// $('#page-notify button.close[data-dismiss="alert"]').click(function(){
//	 createCookie("pageNotification","true",1,false);
// });
// $('#browser-alert button.close[data-dismiss="alert"]').click(function(){
// 	createCookie("browserNotification","true",1,false);
// });
//}
function checkCookieExists(){
    $('.site-level-notification .close-div').each(function() {
		var siteNotification = $(this).closest(".site-level-notification");
        var siteNotificationDiv = $(siteNotification).find(".cmp-container");
        var siteNotificationId = siteNotificationDiv.attr('id');
        var cookieExists = readCookie("pageNotification-"+siteNotificationId);
        
        if(cookieExists){
        	$(siteNotification).css('display', '');
        }
        else {
			$(siteNotification).addClass('notification');
            $(siteNotification).show();
        }

    });
}
// function checkBrowserCookieExists(){
// var cookieExists=readCookie("browserNotification");
// if(cookieExists){
// 	$("#browser-alert").hide();
// }
// else {
// 	$("#browser-alert").show();
// }
// }
function getURLSocialMedia(){
	var d = document;
	var l = d.location;
	var URLSocialMedia = l.href;
	var page_lang=$('html').attr('lang');
	var lang=page_lang+"-CA";
	URLSocialMedia = URLSocialMedia.replace('#', '');
	URLSocialMedia = URLSocialMedia.replace(/[\|]/g, '%7C');
	var prefixWT = 'WT.mc_id=';
	var suffixWT = ':Social:Networks:GenericSite:Sharetoolbar';
	var paraAppend = prefixWT + lang + suffixWT;
	if(URLSocialMedia.indexOf(suffixWT) < 0 && URLSocialMedia.indexOf(encodeURIComponent(suffixWT)) < 0){
		if(URLSocialMedia.indexOf('?') > -1){
			URLSocialMedia = URLSocialMedia + '&' + paraAppend;
		} else {
			URLSocialMedia = URLSocialMedia + '?' + paraAppend;
		}
	}
	return URLSocialMedia;
}
function shareFB() {
var d = document,
    f = 'https://www.facebook.com/share',
    l = d.location,
    e = encodeURIComponent,
    p = '.php?src=bm&v=4&i=1354276539&u=' + e(getURLSocialMedia()) + '&t=' + e(d.title);
try {
    if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host)) throw (0);
    share_internal_bookmarklet(p)
} catch (z) {
    a = function () {
        if (!window.open(f + 'r' + p, 'sharer', 'toolbar=0,status=0,resizable=1,width=626,height=436')) l.href = f + p
    };
    if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
    else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_facebook" });
		}
    }
  return true;
}
}
function shareTwitter() {
(function () {
    window.twttr = window.twttr || {};
    var D = 550,
        A = 450,
        C = screen.height,
        B = screen.width,
        H = Math.round((B / 2) - (D / 2)),
        G = 0,
        F = document,
	l = F.location,
        E;
    if (C > A) {
        G = Math.round((C / 2) - (A / 2))
    }
    //window.twttr.shareWin = window.open('http://twitter.com/share', '', 'left=' + H + ',top=' + G + ',width=' + D + ',height=' + A + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
    window.twttr.shareWin=window.open('https://twitter.com/intent/tweet?&text=' + encodeURIComponent(F.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),'','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
	if(l.href.indexOf("Tools+and+Resources")>-1){
		utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_twitter"    }); 
	}
    //  E = F.createElement('script');
      //E.src = 'http://platform.twitter.com/bookmarklets/share.js?v=1';
      //F.getElementsByTagName('head')[0].appendChild(E)
}());
}
function shareLinkedIn() {
(function () {
    var d = document,
        l = d.location,
        f = 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=' + encodeURIComponent(d.title) + '&url=' + encodeURIComponent(getURLSocialMedia()),
        a = function () {
            if (!window.open(f, 'News', 'width=520,height=570,toolbar=0,location=0,status=0,scrollbars=yes')) {
               // l.href = f;
            }
        };
    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
    } else {
        a();
		if(l.href.indexOf("Tools+and+Resources")>-1){
			utag.link({  ev_type: "other",    ev_action: "clk",    ev_title: "share_linkedin" });
		}
    }
})()
return true;
}
function shareGooglePlus() {
	void(window.open('https://plus.google.com/share?ur\l='+encodeURIComponent(getURLSocialMedia()), 'Google','width=600,height=460,menubar=no,location=no,status=no'))
}
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
/*Start of language toggle functionality*/
	// function LanguageToggle() {
	// var langAnchor = document.getElementById("langToggle");
    // var langCodeField = document.getElementById("langToggle_lang");
    // if (langAnchor && langCodeField && langCodeField.value) {
    //     var newLocale = langCodeField.value;
    //     var newUrl = "";
    //     var currUrl = location.href;
//         var hashUrl;
//         if (currUrl.indexOf("#") != -1) {
//             hashUrl = currUrl.split('#');
//         }
//         if (currUrl.indexOf("?") != -1){
//             equalUrl = currUrl.split('?');
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = currUrl + '?vgnLocale=' + newLocale;
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health#sunlanguage
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") == -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = hashUrl[0] + '?vgnLocale=' + newLocale + '#' + hashUrl[1];
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//            if(equalUrl[0]=='https://stage-www.ca.sunlife/' ||equalUrl[0] == 'https://stage-www.sunlife.ca/') {
//             	newUrl = "https://stage-www.ca.sunlife/ca?" + 'vgnLocale=' + newLocale  ;
//            }
//            else if (equalUrl[0] == 'https://www.sunlife.ca/' ){
//               newUrl = "https://www.sunlife.ca/ca?" + 'vgnLocale=' + newLocale;
//            }
//            else{
//               newUrl = currUrl + '&vgnLocale=' + newLocale;
//            }
//            // newUrl = currUrl + '&vgnLocale=' + newLocale;
//         }
//         //http://www.sunlife.ca/Canada/sunlifeCA/Health?test=abc#
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") == -1)) {
//             newUrl = hashUrl[0] + '&vgnLocale=' + newLocale + '#' + hashUrl[1];
//         }
// 		var vgnLocaleVal = getQuerystring("vgnLocale");
//         if ((currUrl.indexOf("#") == -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
//                 newUrl = currUrl.replace(vgnLocaleVal, newLocale);
//         }
//         if ((currUrl.indexOf("#") != -1) && (currUrl.indexOf("?") != -1) && (currUrl.indexOf("vgnLocale") != -1)) {
// 		 newUrl = currUrl.replace(vgnLocaleVal, newLocale);
//         }
// 		if(currUrl == 'https://stage-www.sunlife.ca/' || currUrl == 'https://stage-www.sunlife.ca/ca?vgnLocale=en_CA'){
// 			newUrl = "https://stage-www.sunlife.ca/ca?vgnLocale=fr_CA";
// 		}

// 		if(currUrl == 'https://www.sunlife.ca/' || currUrl == 'https://www.sunlife.ca/ca?vgnLocale=en_CA'){
// 			newUrl = "https://www.sunlife.ca/ca?vgnLocale=fr_CA";
// 		}

// 		if(currUrl == 'https://uat-www.ca.sunlife/' || currUrl == 'https://uat-www.ca.sunlife/ca?vgnLocale=en_CA'){
// 			newUrl = "https://uat-www.ca.sunlife/ca?vgnLocale=fr_CA";
// 		}

// 		newUrl =removeParam("pageNo", newUrl);
//         $('li.langToggle a').prop('href', newUrl);
//     }
// }
// /*End of language toggle functionality*/
function getQuerystring(key) {
    var query = window.location.search.substring(1);
    var value = 'null';
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
        	value = pair[1];
            return pair[1];
        }
    }
    return value;
}
// /*Added for vew desktop */
// /** page load event **/
// jQuery(document).ready(function($){
// 	if(!isMobile()){
// 		$( ".mobile-site" ).css('visibility', 'hidden');
// 	}
// 	//Following block of code added for view desktop functionality
// 	$("#desktopview,#desktopviewmobile").click(function (e) {
// 		//reading cookie value for mobile-alert-checkbox
// 		var  checked = readCookie('mobile-alert-checkbox');
// //if user already ticked checkbox for not to see message again it won't show popup-message after desktop-view click
// 		if(checked === 'true') {
// 			$("#toDesktopPopup").modal('hide');
// 			$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 		}else{
// 			//For the first time in session ,after clicking on desktop view link pop-up message appears.Now user ticked checked during proceeding with 'okay' button.
// 			$("#desktopview-ok-btn").click(function () {
// 				//if user ticked checkbox new cookie named 'mobile-alert-checkbox' will be created.
// 				if($('#non-opt-remember').prop('checked')){
// 					createCookie("mobile-alert-checkbox",true,1, true);
// 				}
// 				// after clicking 'desktop-view' link another cookie will create named 'desktopview' and page will appear from top section.
// 				createCookie("desktopview","true",1,true);
// 				$("#viewport").attr('content', 'width=1200, initial-scale=1, maximum-scale=1');
// 			});
// 			$("#toDesktopPopup").modal('show');
// 		}
// 		$('body').scrollTop(0);
// 	});
// 	$("#mobileview").click(function () {

// 		createCookie("desktopview","true",-1);
// 		location.reload(true);	//refresh from server
// 		$('body').scrollTop(0);
// 	});
// 	//Code ends for view desktop functionality
// 	var status = readCookie('desktopview');
// 	// need to hide / unhide view desktop / mobile linkes based on cookie
// 	if(status === 'true') {
// 		 $( ".mobile-site" ).css('visibility', 'visible');
// 	}
// });
// /** Added for Top Navigation Avtive functionality**/
// jQuery(document).ready(function(){
//     var pathName= window.location.pathname ;
// 	//console.log(pathName);
// 	$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){
// 		var strLink =  $(this).attr('href');
// 		if(strLink.indexOf('?') > -1){
// 			//alert('pathName.indexof(?)='+pathName.indexOf('?'));
// 			strLink = strLink.substr(1,(strLink.indexOf('?')-1));
// 			//console.log(strLink);
// 			if(pathName.indexOf(strLink) > -1 ){
// 				//console.log('matched for pathName='+pathName);
// 				$(this).addClass("nav-active");
// 			}
// 		}
// 	});

// });
// /** END for Top Navigation Avtive functionality**/
// /****/
// /*yepnope1.5.x|WTFPL*/
// (function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);






// /*  ===========================================
// ============== * off canvas * ====================
// =========================================== */

// // editor adds extra <ul> which needs to be removed
// function moveHamburgerSearch() {
// 	var hamburgerSearch = $('li.hamburgerSearch');
// 	if (hamburgerSearch.length > 0) {
// 		var hamParent = hamburgerSearch.parent();
// 		hamParent.replaceWith(hamburgerSearch);
// 		//$('.navbar-nav').prepend(hamburgerSearch);
// 		//hamParent.remove();
// 	}
// }

// function moveBodyContentsIn(){
// 	var prev = ".mobile-navbar";
// 	if($("#logo").length){
// 		$("#logo").insertAfter(prev);
// 		prev = "#logo";
// 	}

// 	if($("#breadcrumbs").length){
// 		$("#breadcrumbs").insertAfter(prev);
// 		prev = "#breadcrumbs";
// 	}

// 	if($("#pageheading").length){
// 		$("#pageheading").insertAfter(prev);
// 		prev = "#pageheading";
// 	}

// 	if($("#page-content").length){
// 		$("#page-content").insertAfter(prev);
// 		prev ="#page-content";
// 	}

// 	if($("#footer").length){
// 		$("#footer").insertAfter(prev);
// 		prev ="#footer";
// 	}
// /*
// 	if($("#foot-note").length){
// 		$("#foot-note").insertAfter(prev);
// 		prev ="#foot-note";
// 	}
// */
// 	if(!$("#mobile-top-container").length){
// 		$(".navbar .mobile-navbar").prepend("<div class='col-xs-12' id='mobile-top-container'></div>");
// 		$(".navbar #mobile-top-container").prepend($("#search-top"));
// 		$(".navbar #mobile-top-container").prepend($("#page-notify"));
// 	}
// 		//set mobile logo magin-top
// 		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 		if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 		}
// }
// function moveBodyContentsOut(){
// 	//$("#logo").insertBefore("#footer-pin-bar");
// 	//$("#breadcrumbs").insertBefore("#footer-pin-bar");
// 	//$("#pageheading").insertBefore("#footer-pin-bar");

// 	$("#footer").insertAfter("div[role='banner']");
// 	$("#page-content").insertAfter("div[role='banner']");
// 	$("#pageheading").insertAfter("#global-header");
// 	$("#breadcrumbs").insertAfter("#global-header");
// 	$("#logo").insertAfter("#global-header");

// //	$("#foot-note").insertBefore("#footer-pin-bar");

// 	if($("#mobile-top-container").length){
// 		$("#search-top").insertAfter($("#language-top"));
// 		//$("#page-notify").insertBefore($("#yellow-stripe"));
// 		$("#page-notify").insertBefore($("#language-top"));
// 		$("#mobile-top-container").remove();
// 	}
// }
// /** On page load **/
// jQuery(document).ready(function () {

// 	if(!isMobile()){
// 		moveBodyContentsOut();
// 	}
// 	else{
// 		moveBodyContentsIn();
// 		updateTopOffset();
// 	}

// 	// call function to move hamburgerSearch element
// 	moveHamburgerSearch();

// 	function updateTopOffset(){
// 		//set mobile logo magin-top
// 		// Sprint 37 - DAGS2595: mobile logo content may be empty, so only update the margin-top if it's not
// 		if ($('.mobile-logo .col-sm-12').children().length > 0) {
// 			$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 		}
// 	}
// 	function isBreakpointChanged(){
// 		return isMobile(prevWidth) != isMobile();
// 	}
// 	$('[data-toggle="offcanvas"]').click(function (event) {
// 		event.preventDefault();
// 		$('.main-nav').removeClass('moves-out');
// 		$('body').toggleClass('off-canvas-active');
//     $('.row-offcanvas').toggleClass('inactive active');
// 		//$('.row-offcanvas').toggleClass('inactive');

// 		if($('.row-offcanvas').hasClass('active')){
// 			//$('.mobile-logo').css('margin-top', '10px');

// 			if(!$(".offcanvas-overlay").length){
// 				$("<div class='offcanvas-overlay'>").css({
// 					position: "absolute",
// 					width: "100%",
// 					height: "100%",
// 					left: 0,
// 					top: 0,
// 					zIndex: 1000000,
// 					background: 'black',
// 					opacity: 0.5,
// 					display: "block"
// 				}).appendTo($(".content-container"));

// 				$(".offcanvas-overlay").click(function(){
// 					$('[data-toggle="offcanvas"]').click();
// 					$(this).remove();
// 					//reset nav
// 					$('.moves-out').removeClass('moves-out');
// 					$("body, html").css('overflow-y', "auto");
// 					//set mobile logo margin-top
// 					//$('.mobile-logo').css('margin-top', parseInt($('.mobile-navbar').css('height'))+ 10 +"px");
// 				});
// 			}
// 			$("body, html").css('overflow-y', "hidden");
// 			//$(".content-container").css('position', "fixed");
// 			$('.content-container').bind('touchmove', function(e){e.preventDefault()});
// 		}else{
// 			$('.content-container').unbind('touchmove');
// 			$(".content-container").css('position', "static");
// 		}
// 	});

// 	$("#close-hamburger").click(function(){
// 		$('[data-toggle="offcanvas"]').click();
// 		$(".offcanvas-overlay").remove();
// 		//reset nav
// 		$('.moves-out').removeClass('moves-out');
// 		$("body, html").css('overflow-y', "auto");
// 	});

// 	var prevWidth = window.innerWidth;
// 	/** On page resize **/
// 	$(window).resize(function() {
// 		if(!isMobile()){
// 			if(isBreakpointChanged()){
// 				moveBodyContentsOut();
// 			}
// 			$(".row-offcanvas").removeClass('active');

// 			if($(".offcanvas-overlay").length > 0){
// 				$(".offcanvas-overlay").click();
// 			}
// 		}
// 		else{
// 			if(isBreakpointChanged()){
// 				var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
// 				var ios=navigator.userAgent.match('CriOS');
// 				if(!(isAndroid || ios)){
// 					moveBodyContentsIn();
// 				}
// 			}
// 			updateTopOffset();
// 			if(!isMobile() && !isTouchDevice()){
// 				$('.mobile .nav-item').removeClass('open');
// 			}
// 		}
// 		prevWidth = window.innerWidth;
// 	});
// });
// /** Temp fix for leftnav - fr issue **/
// /*
// $(document).ready(function () {
// 	var ln =$('html').attr('lang');
//     if(ln =="fr") {
// 		if( $('.breadcrumb').length ){
// 			var breadcrumbText= $('.breadcrumb').find('li:nth-child(2)').text();
// 			if($('.left-nav-menu').length){
// 			   $('.left-nav-menu').find('.menu-header strong').html(breadcrumbText);
// 			}
// 		}
// 	}
// });
// function tabfix(){
// 	var tabs = $( '.slf-tab-container:not(.news-listing)' ).find( 'ul.slf-full-tabs > li > a' );
// 	$.each( tabs, function ( index, tab ) {
// 		 var contentID = $(this).attr('href').replace('#', '');
// 		 var contentID_new = contentID + "-content";
// 			$(this).closest('.slf-tab-container').find('.tab-content').find('#' + contentID).attr('id', contentID_new);
// 			$( this ).attr('href', "#"+contentID_new);
// 		 });
// }
// */

// /** ADOBE SEARCH updated global search js on 5th Jan 2018 RM fix**/
// /** SEARCH JS**/

// /* globals jQuery, document, window, __slf_search_config, utag */
// (function ($) {
//     var apiPrefix = __slf_search_config.api_url;

//     var stringsEn = {
//         filter_names: {
//             "": "All",
//             "all": "All",
//             "articles": "Articles",
//             "products": "Products",
//             "tools": "Tools",
//             "videos": "Videos",
//         }
//     }
//     var stringsFr = {
//         filter_names: {
//             "": "Tous",
//             "all": "Tous",
//             "articles": "Articles",
//             "products": "Produits",
//             "tools": "Outils",
//             "videos": "Vidéos",
//         }
//     }
//     /** added on sept 18  **/

//     var stringsZh = {
//             filter_names: {
//                 "": "全部",
//                 "all": "全部",
//                 "articles": "文章",
//                 "products": "產品",
//                 "tools": "工具",
//                 "videos": "影片",
//             }
//     }

//     var stringsZhSG = {
//                     filter_names: {
//                         "": "全部",
//                         "all": "全部",
//                         "articles": "'文章",
//                         "products": "产品",
//                         "tools": "工具",
//                         "videos": "视频",
//                     }
//     }
//     var stringsIn = {
//             filter_names: {
//                 "": "Semua",
//                 "all": "Semua",
//                 "articles": "Artikel",
//                 "products": "Produk",
//                 "tools": "Fitur",
//                 "videos": "Video",
//             }
//     }
//     var stringsVn = {
//         filter_names: {
//             "": "Tất cả",
//             "all": "Tất cả",
//             "articles": "Bài viết",
//             "products": "Sản phẩm",
//             "tools": "Công cụ",
//             "videos": "Video",
//         }
//     }
    
//         var urlParam = getParams();
//                 var strings="";
//                 var vgnLocaleSearch = urlParam.vgnLocale;

//            if(vgnLocaleSearch === "fr_CA" ){
//         	strings=stringsFr;

//             } else if(vgnLocaleSearch === "zh_TW"){
//         		strings=stringsZh;
//             } else if(vgnLocaleSearch === "zh_SG"){
//         		strings=stringsZhSG;
//             }else if(vgnLocaleSearch ==="in_ID"){
//         		strings=stringsIn;
//             }
//             else if(vgnLocaleSearch ==="vi_VN"){
// 	            		strings=stringsVn;
//             }
//         	else{
//         		vgnLocaleSearch ="en_CA";
//         		strings=stringsEn;
// 		}



//     /** end **/

//     //var strings = document.documentElement.lang.indexOf("fr") >= 0 ? stringsFr : stringsEn;

//     var resultTemplate = $($.parseHTML($("#search-result-item").text())).filter(".search-result-item");
//     var filterItemTemplate = $($.parseHTML($("#search-result-filter-item").text())).filter(".check-container");
//     var paginationFirst = $($.parseHTML($("#search-result-pagination-first").text())).filter("li");
//     var paginationItem = $($.parseHTML($("#search-result-pagination-item").text())).filter("li");

//     function apiCall(query) {
//         var deferred = jQuery.Deferred();
//         $.ajax({
//             url: apiPrefix,
//             data: query,
//             dataType: 'jsonp',
//             timeout: 5000,
//             success: function (data) {
//                 deferred.resolve(data);
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 deferred.reject(errorThrown)
//             }
//         });

//         return deferred.promise();
//     }

//     function getParams() {
//         var params = {};
//         if (!window.location.search) return params;
//         window.location.search.substring(1).split("&").map(function (paramStr) {
//             return paramStr.split("=");
//         }).forEach(function (paramArr) {
//             try {
//                 params[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1].replace(/\+/g, '%20'));
//             } catch (e) {
//                 // Do not add malformed param to returned object
//             }
//         });
//         return params;
//     }

//     function resetPage() {
//         $("#search-result-items").empty();
//         $("#search-result-filter-list").empty();
//         $("#search-result-pagination li.pagination-item").remove();
//         $("#search-result-none").hide();
//         $("#search-result-error").hide();
//         $("#search-result-results").hide();
//         $("#search-result-banner-top").hide();
//     }

//     function searchError(err) {
//         resetPage();
//         console.error("Error populating search!"); // eslint-disable-line
//         console.error(err); // eslint-disable-line
//         $("#search-result-error").show();
//     }

//     function getCurrentFilter(filters) {
//         var filtered = filters.filter(function (filter) { return filter.selected; })
//         if (!filtered.length) return "all";
//         return filtered[0].result_type;
//     }
//     function getCurrentPage(pagination) {
//         var filtered = pagination.pages.filter(function (page) { return page.selected === 'true'; })
//         if (!filtered.length) return 1;
//         return Number(filtered[0].page);
//     }

//     function buildSearchString(obj) {
//         return "?" + Object.keys(obj).map(function (key) {
//             if (obj[key] === null || typeof (obj[key]) === 'undefined') return;
//             return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]).replace(/%20/g, '+');
//         }).filter(function (v) { return !!v; }).join("&");
//     }

//     function trackingCall(action, filter, totalResults, searchTerm) {
//         if (!filter) filter = "all";
//         var ev_title;

//         if (action === 'input') ev_title = "onsite search_client input";
//         else if (action === 'input') ev_title = "onsite search_client input";
//         else if (action === 'typeahead') ev_title = "onsite search_typeahead_text";
//         else if (action === 'filter') ev_title = "onsite search_filter";
//         else return;

//         var filterName = stringsEn.filter_names[filter] || stringsEn.filter_names.all;
//         var options = {
//             ev_type: "other",
//             ev_action: "clk",
//             ev_title: ev_title,
//             ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName,
//             page_search_term: searchTerm
//         };
//         try {
//             utag.link(options);
//         } catch(e) {
//             console.log("Couldn't perform utag.link() call.") // eslint-disable-line
//             console.log(options); // eslint-disable-line
//         }
//     }

//     function populateResults(results, originalSearchTerm, action,vgnLocaleSearch) {
//         resetPage();
//         var resultItems = results.resultsets[0].results;
//         var searchTerm = results.general.query;
//         var totalResults = results.general.total;
//         var filters = results.result_types;

//         var currentResultType = null;
//         var currentPage = getCurrentPage(results.pagination[0]);
//         var totalPages = Number(results.general.page_total);

//         if (filters) {
//             currentResultType = getCurrentFilter(filters);
//         }

//         function setupPaginationItem(paginationItems, page) {
//             var el = (page === 1 ? paginationFirst : paginationItem).clone();
//             el.find(".txt").text(page)
//             el.toggleClass("active", page === currentPage)
//             el.find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: page,
// 	       	    vgnLocale: vgnLocaleSearch
//                 }));
//             return paginationItems.add(el);
//         }

//         if (originalSearchTerm !== searchTerm) {
//             $("#search-result-misspelling").show();
//             $("#search-result-misspelling-term").text(searchTerm);
//         } else {
//             $("#search-result-misspelling").hide();
//         }

//         if (!resultItems.length) {
//             $("#search-result-none").show();
//             $("#search-result-none-term").text(searchTerm);
// 			try{
// 				trackingCall(action, currentResultType, totalResults, searchTerm);
// 			}catch (e){
// 				console.log('tracking call failed - no search results');
// 			}
//         } else {
//             trackingCall(action, currentResultType, totalResults, searchTerm);
//             $("#search-result-results").show();
//             $("#search-result-num-results").text(totalResults);
//             $("#search-result-num-plural").toggle(totalResults !== "1");
//             $("#search-result-num-single").toggle(totalResults === "1");
//             var els = resultItems.map(function (result) {
//                 var el = resultTemplate.clone();
//                 el.find("a:not(.search-result-display-url)").attr("href", result.url)
//                     .find(".txt").text(result.title);
//                 if (result['file-type'] !== 'pdf') el.find("a > .fa").remove();
//                 else {
//                     el.find("a").attr("target", "_blank");
//                 }
//                 el.find("p").text(result.desc);
//                 el.find(".search-result-display-url").text(result['display-url'] || result.url)
//                     .attr({
//                         title: result.url,
//                         href: result.url
//                     });
//                 return el;
//             });

//             $("#search-result-items").append(els);

//             if (filters) {
//                 var filterEls = filters.map(function (filter) {
//                     if (!filter || !filter.count) return;

//                     var el = filterItemTemplate.clone();
//                     el.find(".txt").text(strings.filter_names[filter.result_type || "all"])
//                     el.find(".num").text(filter.count)
//                     var linkEl = el.find("a").toggleClass('active', filter.selected)
//                         .attr('href', buildSearchString({
//                             q: results.general.query,
//                             filter: filter.result_type,
//                             action: 'filter',
// 			vgnLocale: vgnLocaleSearch
//                         }))

//                     if (filter.selected) {
//                         linkEl.click(function (event) {
//                             event.preventDefault();
//                         })
//                     }

//                     return el;
//                 }).filter(function (v) { return v; }) ;
//                 $("#search-result-filter-list").append(filterEls);
//                 if (filterEls.length > 1) $("#search-result-filters").show();
// 	                      else $("#search-result-filters").hide();
// 	                  } else {
// 	                      $("#search-result-filters").css("display", "none");
//             }

//             $("#search-results-pagination-previous")
//                 .toggleClass("disabled", currentPage < 2)
//                 .find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: currentPage - 1,
// 		   vgnLocale: vgnLocaleSearch
//                 }));
//             $("#search-results-pagination-next")
//                 .toggleClass("disabled", currentPage >= totalPages)
//                 .find("a")
//                 .attr("href", buildSearchString({
//                     q: results.general.query,
//                     filter: currentResultType,
//                     page: currentPage + 1,
// 		     vgnLocale: vgnLocaleSearch
//                 }));
//             var paginationItems = $();


//             paginationItems = setupPaginationItem(paginationItems, 1);

//             if (currentPage >= 5 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

//             var startPage = Math.max(currentPage - 2, 2);
//             var endPage = currentPage + 2;
//             if (currentPage < 3) {
//                 endPage = Math.min(5, totalPages - 1);
//             } else if (totalPages - currentPage < 3) {
//                 startPage = Math.max(totalPages - 4, 2)
//                 endPage = totalPages - 1;
//             }
//             for (var p = startPage; p <= endPage; p++) {
//                 paginationItems = setupPaginationItem(paginationItems, p);
//             }

//             if ((totalPages - currentPage) >= 4 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

//             paginationItems = setupPaginationItem(paginationItems, totalPages);

//             $(paginationItems).insertBefore($("#search-results-pagination-next"));
//             $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
//             $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPages);
//             $("#search-result-pagination").toggle(totalPages > 1);
//             $("#search-result-page-num").text(currentPage);
//             $("#search-result-page-total").text(results.general.page_total);
//         }

//         var topBanners = results.banners.filter(function (banner) { return banner.top; });
//         if (topBanners[0] && topBanners[0].top) {
//             $("#search-result-banner-top").html(topBanners[0].top).show();
//         }

//         var rightBanners = results.banners.filter(function (banner) { return banner.right; });
//         if (rightBanners[0] && rightBanners[0].right) {
//             $("#search-result-banner-right").html(rightBanners[0].right).show();
//         }
//     }

//     function init() {
//         var urlParams = getParams();
//         var searchString = (urlParams.q || urlParams.gq || "").trim();
//         var filter = urlParams.filter || "all";
//         var page = parseInt(urlParams.page);
//         var action = urlParams.action;
// 	var vgnLocaleSearch = urlParams.vgnLocale;
// 	if(document.documentElement.lang.indexOf("fr")>=0){
// 		vgnLocaleSearch = "fr_CA";

// 	} else if(document.documentElement.lang.indexOf("zh")>=0){
// 		if(vgnLocaleSearch == "zh_SG"){
// 			vgnLocaleSearch = "zh_SG";
// 		}else{
// 			vgnLocaleSearch = "zh_TW";
// 		}
// 	} else if(document.documentElement.lang.indexOf("in")>=0){
// 		vgnLocaleSearch = "in_ID";
//     } else if(document.documentElement.lang.indexOf("vi")>=0){
// 		vgnLocaleSearch = "vi_VN";
// 	}
// 	else{
// 		vgnLocaleSearch ="en_CA";
// 		}

//         if (isNaN(page)) page = 1;

//         $("form.slf-search input[name=q]").val(searchString);
//         if (!searchString) {
//             resetPage();
//             return;
//         }
//         apiCall({q: searchString, pt: filter, page: page}).then(function (results) {
//             try {
//                 populateResults(results, searchString, action,vgnLocaleSearch);

//             } catch(e) {
//                 searchError(e);
//             }
//         }, function (err) {
//             searchError(err);
//         });

//         $(".search-filter-btn").click(function () {
//             $("#search-result-filter-toggle").addClass("active");
//             $("#search-result-filter-toggle .btn-close").focus();
//         });
//         $("#search-result-filter-toggle .btn-close").click(function () {
//             $("#search-result-filter-toggle").removeClass("active");
//             $(".search-filter-btn").focus();
//         })

//         $("[data-refocus]").focus(function () {
//             var selector = $(this).attr("data-refocus");
//             var el = $(selector);
//             if (el.length > 0) {
//                 el.eq(0).focus();
//             }
//         })
//     }

//     init();
// }(jQuery));


// /* global.search.js*/

// /* globals jQuery, setTimeout, clearTimeout, __slf_search_config */
// (function ($) {

//     var idCnt = 0;
//     var autoCompletePrefix = __slf_search_config.autocomplete_url;
//     var saytPrefix = __slf_search_config.sayt_url;
//     var autocompleteOptions = {
//         max_results: 10,
//         beginning: 1
//     };

//     function throttle(cb, delay) {
//         var timer = null;
//         return function () {
//             var args = Array.prototype.slice.call(arguments);
//             var thisObj = this;
//             if (timer) clearTimeout(timer);
//             timer = setTimeout(function () {
//                 cb.apply(thisObj, args);
//                 timer = null;
//             }, delay);
//         }
//     }

//     function autocompleteCall(query) {
//         return $.get(autoCompletePrefix, $.extend({ query: query }, autocompleteOptions), null, 'jsonp');
//     }
//     function saytCall(query) {
//         return $.get(saytPrefix, { q: query, type: 'sayt' }, null, 'jsonp');
//     }

//     function setupAutocomplete(form, mobile) {
// 		if (mobile) {
// 			var inputEl = form.find("input[name=q]");
// 			var actionEl = form.find("input[name=action]");
// 			var autocompleteListEl = form.find(".search-autocomplete-list-mobile");
// 			var saytListEl = form.find(".search-sayt-list-mobile");
// 			var dropdownEl = form.find(".search-autocomplete-mobile");
// 			var lastVal = "";
// 			var suggestionIndex = -1;
// 			var suggestions = [];
// 			var idNum = idCnt++;
// 			var listId = "slf-autocomplete-list-mobile-" + idNum;
// 		}
// 		else {
// 		        var inputEl = form.find("input[name=q]");
// 		        var actionEl = form.find("input[name=action]");
// 		        var submitBtn = form.find("input[type=submit]");
// 		        var autocompleteListEl = form.find(".search-autocomplete-list");
// 		        var saytListEl = form.find(".search-sayt-list");
// 		        var dropdownEl = form.find(".search-autocomplete");
// 		        var lastVal = "";
// 		        var suggestionIndex = -1;
// 		        var suggestions = [];
// 		        var idNum = idCnt++;
// 		        var listId = "slf-autocomplete-list-" + idNum;
// 		}
//         var submitLock = false;

//         inputEl[0].autocomplete = 'off';

//         autocompleteListEl.attr("aria-hidden", "true");

//         function updateSelection() {
//             if (suggestionIndex < 0) {
//                 if (inputEl.val() !== lastVal) inputEl.val(lastVal);
//                 actionEl.val("input");
//             } else {
//                 inputEl.val(suggestions[suggestionIndex]);
//                 actionEl.val("typeahead");
//             }
//             autocompleteListEl.children().removeClass("active");
//             if (suggestionIndex >= 0) autocompleteListEl.children().eq(suggestionIndex).addClass("active");
//         }

//         function clickSuggestion(event) {
//             event.preventDefault();
//             var suggestion = $(this).data("slf-search-value");
//             updateEmpty();
//             actionEl.val("typeahead");
//             inputEl.val(suggestion);
//             form.submit();
//         }

//         function updateSuggestions(q, force) {
//             return function (results) {
//                 if (!force && inputEl.val() !== q) return;

//                 suggestions = results.filter(function (r) {
//                     return r !== lastVal;
//                 });
//                 if (!suggestions.length) {
//                     autocompleteListEl.hide();
//                 } else {
//                     autocompleteListEl.show();
//                 }
//                 suggestionIndex = -1;
//                 autocompleteListEl.empty().append(suggestions.map(function (suggestion, i) {
//                     return $("<li role='option'>")
//                         .attr("id", listId + "_" + i)
//                         .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
//                         .data("slf-search-value", suggestion)
//                         .click(clickSuggestion).get(0);
//                 }));
//                 updateSelection();
//             }
//         }

//         function updateSayt(q, force) {
//             return function (results) {
//                 if (!force && inputEl.val() !== q) return;

//                 var arr;
//                 try {
//                      arr = results.results;
//                 } catch(e) {
//                     arr = [];
//                 }

//                 if (!arr.length) saytListEl.hide();
//                 else saytListEl.show();
//                 saytListEl.empty().append(arr.map(function (resultItem) {
//                     return $("<li>").append($("<a class='sayt-link'>").append([
//                         $("<span class='title'>").text(resultItem.title)[0],
//                         $("<span class='desc'>").text(resultItem.desc)[0]
//                     ]).attr("href", resultItem.url));
//                 }))
//             }
//         }

//         function updateEmpty() {
//             updateSuggestions([], true)([]);
//             updateSayt(null, true)();
//         }

//         var getSuggestions = throttle(function () {
//             var v = inputEl.val();
//             if (v === lastVal) return;
//             lastVal = v;
//             if (v) {
//                 autocompleteCall(v).then(updateSuggestions(v));
//                 saytCall(v).then(updateSayt(v))
//             }
//             else updateEmpty();
//         }, 200);

//         inputEl.on('focus', function (event) {
//             var v = inputEl.val();
//             var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
//             if (v && !stillInDropdown) {
//                 lastVal = v;
//                 autocompleteCall(v).then(updateSuggestions(v));
//                 saytCall(v).then(updateSayt(v))
//             } else if (!stillInDropdown) {
//                 lastVal = v;
//             }
//         })
//         form.on('focusout', function (event) {
//             var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget) || event.relatedTarget === inputEl[0];
//             if (!submitLock && !stillInDropdown) setTimeout(function () {
//         updateEmpty();
//       }, 0);

//         });
//         inputEl.on('keydown', function (event) {
//             if (event.key === "ArrowDown" || event.key === "Down") {
//                 event.preventDefault();
//                 if (suggestionIndex + 1 === suggestions.length) suggestionIndex = suggestions.length - 1;
//                 else suggestionIndex += 1;
//                 updateSelection();
//             } else if (event.key === "ArrowUp" || event.key === "Up") {
//                 event.preventDefault();
//                 if (suggestionIndex < 0) suggestionIndex = -1;
//                 else suggestionIndex -= 1;
//                 updateSelection();
//             } else if (event.key === "Escape" || event.key === "Esc") {
//                 event.preventDefault();
//                 updateEmpty();
//             } else if (event.key === 'Enter') {
//                 submitLock = true;
//                 setTimeout(function () {
//                    submitLock = false;
//                 }, 0);
//             } else if (event.key !== 'Tab') {
//             	getSuggestions();
//              }
//         });
        
// 	if (submitBtn) {
// 	        submitBtn.on('mousedown', function () {
//         		submitLock = true;
// 			setTimeout(function () {
//         		        submitLock = false;
// 	        	}, 0);
//         	});
// 	}

//         autocompleteListEl.on('mousedown', function (event) {
//             event.preventDefault();
//         })
//         saytListEl.on('mousedown', function (event) {
//             event.preventDefault();
//         })

//         form.on('submit', function (event) {
//             if (!inputEl.val().trim()) {
//                 event.preventDefault();
//             }
//         });
//     }

//     function init() {
//         $("form.slf-search").each(function (i, form) {
//             form = $(form);
//             if (form.data("slf-search-initialized")) return;
//             form.data("slf-search-initialized", true);
//             setupAutocomplete(form);
//         });
// 	$("form.slf-search-mobile").each(function (i, form) {
//             form = $(form);
//             if (form.data("slf-search-initialized")) return;
//             form.data("slf-search-initialized", true);
//             setupAutocomplete(form, 'mobile');
//         });
// 				// for left nav underline, in IE - "test-decoration-color" does not work in IE.
// 				var activeLeftNav = $(".left-nav-menu .active");
// 				if (null != activeLeftNav) {
// 					var activeText = activeLeftNav.text();
// 					activeLeftNav.html("<span>" + activeText + "</span>");
// 				}
//     }

//     init();
//     $(init);
// }(jQuery));


// /** ADOBE GlobalSEARCH JS ENDS HERE **/
// $( document ).ready(function() {
// 	//bind the CTA box bottom-aligned buttons to the form submission buttons
// 	$('#locate-advisors-btn').click(function(){
// 		var form = $('#locate-advisors-form').parsley({
// 		});
// 		form.validate();
// 		$('#locate-advisors-form').submit();
// 	});
	
// 	$('#find-an-advisor-btn').click(function(){
// 		$('#find-an-advisor-form').submit();
// 	});
	

// //    $('#cta-provider-search-btn').click(function(){
// //		$('#cta-provider-search-form').submit();
// //	});


// 	//set the height of the description box to be equal across all CTA boxes
// 	function setEqualHeight() {
// 		var cta_desc_height = 0;

// 		$(".div-one:not(.not-aligned)").each(function() {
// 				$(this).css('height', 'auto'); //allow box to grow to a default height
// 				if ($(this).height() > cta_desc_height) {
// 						cta_desc_height = $(this).height();
// 				}
// 		});
// 		$(".div-one:not(.not-aligned)").each(function() {
// 				$(this).css("height", cta_desc_height);
// 		});
// 	}

// 	// only adjust the cta box height if they are not stacked, otherwise, no need
// 	if (($(window).width()) > 767) {
// 		setEqualHeight();
// 	}

// 	// if orientation changes, also check if the cta box needs to be adjusted
// 	$(window).on("orientationchange", function(e) {
// 		//a timeout is required because there completion of orientation change cannot be detected
// 		window.setTimeout(function() {
// 				setEqualHeight();
// 		}, 200);
// 	});

// 	//update the Get a quote's form action based on the dropdown selection
// 	$("#get-a-quote-submit, #get-a-quote-btn").click(function() {
// 		var action = $('#select-product').val();
// 		var target = $('#select-product option:selected').data('target');
// 		$("#get-a-quote-form").attr("action", action);
// 		$("#get-a-quote-form").attr("target", target);
// 	});

// 	//validate the CTA Get a quote select dropdown form and trigger the desktop submit button
// 	$("#get-a-quote-btn").click(function() {
// 		var form = $("#get-a-quote-form").parsley({
// 		});
// 		form.validate();
// 		$('#get-a-quote-form').submit();
// 	});

// 	//validate the CTA Newsletter subsribe form
// 	$("#newsletter-subsribe-submit, #newsletter-subsribe-btn").click(function() {
// 		var form = $("#subsribe-newsletter-form").parsley({
// 		});
// 		form.validate();
// 		$('#subsribe-newsletter-form').submit();
// 	});
	

//     //Initiate parley validation for Provide search CTA
//     $("#cta-provider-search-btn").on("click", function() {
// 		var form = $("#cta-provider-search-form").parsley({
// 		});
// 		form.validate();

//            if (form.isValid()) {
//                	$('#cta-provider-search-form').submit();
//            }
// 	});
    
// });


// // LnP newsletter subscribe Story
// //set cookie that expires after a browser session ends
// function setCookie(cname, cvalue, days) {
// 	var d = new Date();
// 	var expires = '';
// 	if (days > 0) {
// 		var time = d.getTime();
// 		var expireTime = time + 1000*60*60*24*days;  // ms * secs * mins * hrs * days
// 		d.setTime(expireTime);
// 		var expires = "expires="+ d.toUTCString();
// 	} else {
// 		var expires = 0; "expires="+ d.toUTCString();
// 	}
// 	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return "";
}

// if (window.location.href.indexOf("/ca/Tools+and+Resources/Money+and+Finances") > -1  //https://www.sunlife.ca/ca/Learn+and+Plan/Money
// 					|| window.location.href.indexOf("/ca/Tools+and+Resources/Health+and+Wellness") > -1) {
     
    $(document).ready(function(){
        $(window).scroll(function() {
        //$("#subscribe").modal({show:true});
            if($(window).scrollTop() + $(window).height() >= $(document).height()/2) {
                if (getCookie('subscribecookie') == "") {
                    //var url = new URL(window.location.href);
                    //var wtmcid = url.searchParams.get("WT.mc_id");
                    var wtmcid = getQuerystring("WT.mc_id");
                    if ( (wtmcid != null) && (wtmcid.indexOf("Direct:Newsletter") > -1) ) {
                        //setCookie('subscribecookie', 'displayed', 180);
                        createCookie('subscribecookie', 'displayed', 180, false)
                    } else {
                        if($("#subscribe").length==1){
                            $("#subscribe").modal({show:true});
                            //setCookie('subscribecookie', 'displayed', 0);
                            // check for IE11: session cookies disabled by default, so for IE, set expiry for 1 day
                            if (navigator.userAgent.indexOf("MSIE") > 0) {
                                createCookie('subscribecookie', 'displayed', 1, false)
                            } else {
                                createCookie('subscribecookie', 'displayed', -1, true)
                            }
                        }
                    }
                }
            }
        });
        var hostname = window.location.hostname;
        $('a').each(function(){
            var href = $(this).attr('href');
            var target = $(this).attr('target');
            if(href && !target && ((href.indexOf('//') > 0 && href.indexOf(hostname) < 0 ) || href.indexOf('.pdf') > 0)) {
                $(this).attr('target','_blank');
            }
        });
    });

// $(document).ready(function(){
// 	$("#news-overlay-subscribe").on("click", function() {
// 		var form = $(this).closest("form").parsley({
// 		});
// 		if (form.validate()) {
// 			createCookie('subscribecookie', 'displayed', 180, false)
// 		}
// 	});
// });
// //LnP Subscribe ends

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
} 
/* Tags formatting starts here */
$(document).ready(function(){
    $('body').find("b").replaceWith(function() {
    return $('<strong>', {
        html: this.innerHTML
        });
    });
    var iTag=$('body').find("i").filter(function(){return $(this)});
    iTag.each(function(){
        if($(this).attr("class")){
        }
        else{
            $(this).replaceWith(function() {
                return $('<em>', {
                    html: this.innerHTML
                    });
                });
        }
    });
    var uTag=$('body').find("u").filter(function(){return $(this)});
    uTag.each(function(){
        if($(this).attr("class")){
        }
        else{
            $(this).replaceWith(function() {
                return $('<ins>', {
                    html: this.innerHTML
                    });
                });
        }
    });
    checkCookieExists();
});
/* Tags formatting ends here */
export {shareFB,shareTwitter,shareLinkedIn,shareGooglePlus,checkCookieExists,readCookie,getCookie,getQuerystring,createCookie,getURLSocialMedia,removeParam, getParameterByName}; 