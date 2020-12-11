
$(document).ready(function(){
  /* existing js starts here*/
  (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
      "use strict";
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      
      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
      
      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
      
      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
      
      var Bakery =
      /*#__PURE__*/
      function () {
        function Bakery() {
          _classCallCheck(this, Bakery);
        }
      
        _createClass(Bakery, null, [{
          key: "getCookieExpiresString",
          value: function getCookieExpiresString(hideTtl) {
            var now = new Date();
            var expireTime = new Date(now.getTime() + hideTtl);
            return "expires=".concat(expireTime.toGMTString(), ";");
          }
        }, {
          key: "bake",
          value: function bake(hideTtl, hidePath) {
            document.cookie = "smartbanner_exited=1; ".concat(hideTtl ? Bakery.getCookieExpiresString(hideTtl) : '', " path=").concat(hidePath);
          }
        }, {
          key: "unbake",
          value: function unbake() {
            document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
        }, {
          key: "baked",
          get: function get() {
            var value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, '$1');
            return value === '1';
          }
        }]);
      
        return Bakery;
      }();
      
      exports.default = Bakery;
      
      },{}],2:[function(require,module,exports){
      (function (global){
      "use strict";
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      
      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
      
      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
      
      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
      
      var Detector =
      /*#__PURE__*/
      function () {
        function Detector() {
          _classCallCheck(this, Detector);
        }
      
        _createClass(Detector, null, [{
          key: "platform",
          value: function platform() {
            if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
              return 'ios';
            } else if (/Android/i.test(window.navigator.userAgent)) {
              return 'android';
            }
          }
        }, {
          key: "userAgentMatchesRegex",
          value: function userAgentMatchesRegex(regexString) {
            return new RegExp(regexString).test(window.navigator.userAgent);
          }
        }, {
          key: "jQueryMobilePage",
          value: function jQueryMobilePage() {
            return typeof global.$ !== 'undefined' && global.$.mobile !== 'undefined' && document.querySelector('.ui-page') !== null;
          }
        }, {
          key: "wrapperElement",
          value: function wrapperElement() {
            var selector = Detector.jQueryMobilePage() ? '.ui-page' : 'html';
            return document.querySelectorAll(selector);
          }
        }]);
      
        return Detector;
      }();
      
      exports.default = Detector;
      
      }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
      },{}],3:[function(require,module,exports){
      "use strict";
      
      var _smartbanner = _interopRequireDefault(require("./smartbanner.js"));
      
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
      
      var smartbanner;
      window.addEventListener('load', function () {
        smartbanner = new _smartbanner.default();
        smartbanner.publish();
      });
      
      },{"./smartbanner.js":5}],4:[function(require,module,exports){
      "use strict";
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      
      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
      
      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
      
      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
      
      function valid(name) {
        // TODO: validate against options dictionary
        return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
      }
      
      function convertToCamelCase(name) {
        var parts = name.split('-');
        parts.map(function (part, index) {
          if (index > 0) {
            parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
          }
        });
        return parts.join('');
      }
      
      var OptionParser =
      /*#__PURE__*/
      function () {
        function OptionParser() {
          _classCallCheck(this, OptionParser);
        }
      
        _createClass(OptionParser, [{
          key: "parse",
          value: function parse() {
            var metas = document.getElementsByTagName('meta');
            var options = {};
            Array.apply(null, metas).forEach(function (meta) {
              var optionName = null;
              var name = meta.getAttribute('name');
              var content = meta.getAttribute('content');
      
              if (name && content && valid(name) && content.length > 0) {
                optionName = name.split(':')[1];
      
                if (optionName.indexOf('-') !== -1) {
                  optionName = convertToCamelCase(optionName);
                }
      
                options[optionName] = content;
              }
            });
            return options;
          }
        }]);
      
        return OptionParser;
      }();
      
      exports.default = OptionParser;
      
      },{}],5:[function(require,module,exports){
      "use strict";
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      
      var _optionparser = _interopRequireDefault(require("./optionparser.js"));
      
      var _detector = _interopRequireDefault(require("./detector.js"));
      
      var _bakery = _interopRequireDefault(require("./bakery.js"));
      
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
      
      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
      
      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
      
      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
      
      var DEFAULT_PLATFORMS = 'android,ios';
      var datas = {
        originalTop: 'data-smartbanner-original-top',
        originalMarginTop: 'data-smartbanner-original-margin-top'
      };
      
      function handleExitClick(event, self) {
        $(".mobile-navbar").css("top","0px");
        self.exit();
        event.preventDefault();
      }
      
      function handleJQueryMobilePageLoad(event) {
        if (!this.positioningDisabled) {
          setContentPosition(event.data.height);
        }
      }
      
      function addEventListeners(self) {
        var closeIcon = document.querySelector('.js_smartbanner__exit');
        closeIcon.addEventListener('click', function (event) {
            //utag.link({ ev_type: "ad", ev_action: "clk", ev_title: "app_download_mobile_banner", ev_data_one: "close" })
          return handleExitClick(event, self);
        });  
        var openIcon = document.querySelector('.smartbanner__button');
        openIcon.addEventListener('click', function (event) {
            //utag.link({ ev_type: "ad", ev_action: "clk", ev_title: "app_download_mobile_banner", ev_data_one: "open" });    
        });
        var fullBanner = document.querySelector('.captureClick');
        fullBanner.addEventListener('click', function (event) {
           // utag.link({ ev_type: "ad", ev_action: "clk", ev_title: "app_download_mobile_banner", ev_data_one: "open" });    
        });
        if (_detector.default.jQueryMobilePage()) {
          $(document).on('pagebeforeshow', self, handleJQueryMobilePageLoad);
        }
      }
      
      function removeEventListeners() {
        if (_detector.default.jQueryMobilePage()) {
          $(document).off('pagebeforeshow', handleJQueryMobilePageLoad);
        }
      }
      
      function setContentPosition(value) {
        var wrappers = _detector.default.wrapperElement();
      
        for (var i = 0, l = wrappers.length, wrapper; i < l; i++) {
          wrapper = wrappers[i];
      
          if (_detector.default.jQueryMobilePage()) {
            if (wrapper.getAttribute(datas.originalTop)) {
              continue;
            }
      
            var top = parseFloat(getComputedStyle(wrapper).top);
            wrapper.setAttribute(datas.originalTop, isNaN(top) ? 0 : top);
            wrapper.style.top = value + 'px';
          } else {
            if (wrapper.getAttribute(datas.originalMarginTop)) {
              continue;
            }
      
            var margin = parseFloat(getComputedStyle(wrapper).marginTop);
            wrapper.setAttribute(datas.originalMarginTop, isNaN(margin) ? 0 : margin);
            wrapper.style.marginTop = value + 'px';
          }
        }
      }
      
      function restoreContentPosition() {
        var wrappers = _detector.default.wrapperElement();
      
        for (var i = 0, l = wrappers.length, wrapper; i < l; i++) {
          wrapper = wrappers[i];
      
          if (_detector.default.jQueryMobilePage() && wrapper.getAttribute(datas.originalTop)) {
            wrapper.style.top = wrapper.getAttribute(datas.originalTop) + 'px';
          } else if (wrapper.getAttribute(datas.originalMarginTop)) {
            wrapper.style.marginTop = wrapper.getAttribute(datas.originalMarginTop) + 'px';
          }
        }
      }
      
      var SmartBanner =
      /*#__PURE__*/
      function () {
        function SmartBanner() {
          _classCallCheck(this, SmartBanner);
      
          var parser = new _optionparser.default();
          this.options = parser.parse();
          this.platform = _detector.default.platform();
        } // DEPRECATED. Will be removed.
      
      
        _createClass(SmartBanner, [{
          key: "publish",
          value: function publish() {
            if (Object.keys(this.options).length === 0) {
               //throw new Error('No options detected. Please consult documentation.');
               return true;
            }
      
            if (_bakery.default.baked) {
              return false;
            } // User Agent was explicetely excluded by defined excludeUserAgentRegex
      
      
            if (this.userAgentExcluded) {
              return false;
            } // User agent was neither included by platformEnabled,
            // nor by defined includeUserAgentRegex
      
      
            if (!(this.platformEnabled || this.userAgentIncluded)) {
              return false;
            }
      
            var bannerDiv = document.createElement('div');
            document.querySelector('body').appendChild(bannerDiv);
            bannerDiv.outerHTML = this.html;	  
            var event = new Event('smartbanner.view');	  
            document.dispatchEvent(event);	  
      
            if (!this.positioningDisabled) {
                
              setContentPosition(this.height);
            }
          
           /* function scrollPositionchange(){
              if($(window).scrollTop()<$(".smartbanner").height()){
                  $(".mobile-navbar").css("top",($(".smartbanner").height()-$(window).scrollTop())+"px");
              } else {
                  $(".mobile-navbar").css("top","0px");
              }
            }
            
            document.addEventListener("scroll", scrollPositionchange);
            scrollPositionchange();
            */
            
            addEventListeners(this);
          }
        }, {
          key: "exit",
          value: function exit() {
            removeEventListeners();
      
            if (!this.positioningDisabled) {
              restoreContentPosition();
            }
      
            var banner = document.querySelector('.js_smartbanner');
            document.querySelector('body').removeChild(banner);
            var event = new Event('smartbanner.exit');
            document.dispatchEvent(event);
      
            _bakery.default.bake(this.hideTtl, this.hidePath);
          }
        }, {
          key: "originalTop",
          get: function get() {
            var wrapper = _detector.default.wrapperElement()[0];
      
            return parseFloat(wrapper.getAttribute(datas.originalTop));
          } // DEPRECATED. Will be removed.
      
        }, {
          key: "originalTopMargin",
          get: function get() {
            var wrapper = _detector.default.wrapperElement()[0];
      
            return parseFloat(wrapper.getAttribute(datas.originalMarginTop));
          }
        }, {
          key: "priceSuffix",
          get: function get() {
            if (this.platform === 'ios') {
              return this.options.priceSuffixApple;
            } else if (this.platform === 'android') {
              return this.options.priceSuffixGoogle;
            }
      
            return '';
          }
        }, {
          key: "icon",
          get: function get() {
            if (this.platform === 'android') {
              return this.options.iconGoogle;
            } else {
              return this.options.iconApple;
            }
          }
        }, {
          key: "buttonUrl",
          get: function get() {
            if (this.platform === 'android') {
              return this.options.buttonUrlGoogle;
            } else if (this.platform === 'ios') {
              return this.options.buttonUrlApple;
            }
      
            return '#';
          }
        }, {
          key: "html",
          get: function get() {
            var modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
            //utag.view({ ev_type: "ad", ev_action: "onpage_impr", ev_title: "app_download_mobile_banner", ev_data_one: "show" })
           return "<div class=\"smartbanner smartbanner--".concat(modifier, " js_smartbanner\">\n      <a href=\"javascript:void();\" class=\"smartbanner__exit js_smartbanner__exit\"></a>\n      <a href=\"").concat(this.buttonUrl, "\" target=\"_blank\" class=\"captureClick\"><div class=\"smartbanner__icon\" style=\"background-image: url(").concat(this.icon, ");\"></div>\n      <div class=\"smartbanner__info\">\n        <div>\n          <div class=\"smartbanner__info__title\">").concat(this.options.title, "</div>\n          <div class=\"smartbanner__info__author\">").concat(this.options.author, "</div>\n          <div class=\"smartbanner__info__price\">").concat(this.options.price).concat(this.priceSuffix, "</div>\n        </div>\n      </div></a>\n      <a href=\"").concat(this.buttonUrl, "\" target=\"_blank\" class=\"smartbanner__button\"><span class=\"smartbanner__button__label\">").concat(this.options.button, "</span></a>\n    </div>");
          }
        }, {
          key: "height",
          get: function get() {
            var height = document.querySelector('.js_smartbanner').offsetHeight;
            return height !== undefined ? height : 0;
          }
        }, {
          key: "platformEnabled",
          get: function get() {		
            var enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
            return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platform) !== -1;
      
          }
        }, {
          key: "positioningDisabled",
          get: function get() {
            return this.options.disablePositioning === 'true';
          }
        }, {
          key: "userAgentExcluded",
          get: function get() {
            if (!this.options.excludeUserAgentRegex) {
              return false;
            }
      
            return _detector.default.userAgentMatchesRegex(this.options.excludeUserAgentRegex);
          }
        }, {
          key: "userAgentIncluded",
          get: function get() {
            if (!this.options.includeUserAgentRegex) {
              return false;
            }
      
            return _detector.default.userAgentMatchesRegex(this.options.includeUserAgentRegex);
          }
        }, {
          key: "hideTtl",
          get: function get() {
            return this.options.hideTtl ? parseInt(this.options.hideTtl) : false;
          }
        }, {
          key: "hidePath",
          get: function get() {
            return this.options.hidePath ? this.options.hidePath : '/';
          }
        }]);
      
        return SmartBanner;
      }();
      
      exports.default = SmartBanner;
      
      },{"./bakery.js":1,"./detector.js":2,"./optionparser.js":4}]},{},[3]);
      /* existing js ends here*/
      
      /* structure js starts here */
      if($("#mobile-app-banner")){
        var title='',author='',price='',downloadText='';
        let my_sunlife_app_link='https://play.google.com/store/apps/details?id=com.sunlife.vietnam.clientapp';
        function getOS() {
          var userAgent = window.navigator.userAgent,
              platform = window.navigator.platform,
              macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
              windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
              iosPlatforms = ['iPhone', 'iPad', 'iPod'],
              os = null;       
          if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
          } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
          } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
          } else if (/Android/.test(userAgent)) {
            os = 'Android';
          } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
          }                
          if(os=='Mac OS' || os=='iOS' || $('body').hasClass('mac-os-target')){
            my_sunlife_app_link="https://apps.apple.com/vn/app/sun-life-vietnam/id1464660549?l=vi";
          }
        }
        getOS();
          /* Content for english page */
           title='my Sun Life';
           author='Sun Life Việt Nam';
           price='Miễn phí';
           downloadText='Mở';

        var smartBannerId=$("#mobile-app-banner");
        $(smartBannerId).addClass('smartbanner smartbanner--android js_smartbanner');
        $(smartBannerId).empty();
        $(smartBannerId).append('<div class="app-wrapper">\
          <a href='+my_sunlife_app_link+' target="_blank" class="captureClick">\
              <div class="smartbanner__icon">\
              </div>\
              <div class="smartbanner__info">\
                  <div class="smartbanner__info__title">'+title+'</div>\
                  <div class="smartbanner__info__author">'+author+'</div>\
                  <div class="smartbanner__info__price">'+price+'</div>\
              </div>\
          </a>\
          <a href="javascript:void(0)" class="smartbanner__exit js_smartbanner__exit close-smart fa fa-remove"></a>\
        </div>\
        <div class="java-button">\
          <a href='+my_sunlife_app_link+' target="_blank" class="smartbanner__button">\
              <span class="smartbanner__button__label">'+downloadText+'</span>\
          </a>\
        </div>');
      }
      /* structure js ends here */
      function checkCookie() {
          var user=getCookie("app_show");
          var show=true;
          var newTime=new Date();
          var newTime1=newTime.getTime();
          if(localStorage.clickSession){
              if(newTime1>localStorage.clickSession){
                  show=true;
              }
              else{
                  show=false;
              }
          }
          if (user == "" || user == null || user == undefined || show == true) {
              $(".smartbanner").removeClass("app-hide");         
          } else {
              $(".smartbanner").addClass("app-hide");  
          }
        }
        function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i < ca.length; i++) {
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
        function setCookie(cname,cvalue,minutes) {
          var exDate = new Date();
          exDate.setTime(exDate.getTime() + (minutes * 60 * 1000));
          localStorage.clickSession=exDate.getTime();
          var expires = "expires=" + exDate;
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
        }
      $("#mobile-app-banner.smartbanner .close-smart").click(function(){
          /*utag.link({ 
            ev_type: "ad", 
            ev_action: "onpage_impr", 
            ev_title: "app_download_mobile_banner", 
            ev_data_one: "close"
          });*/
          $(this).parent().closest('.xf-content-height').addClass('xf-height');
          $(".smartbanner").addClass("app-hide");
          $(".slf-mobile-header-wrapper").removeClass('top-not');
          $(".slf-mobile-header-wrapper").attr({'style':'margin-top:0'});
          $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':'auto'});
          setCookie("app_show", 'true' , 30);
      });
      if($(".smartbanner")){
          checkCookie();
      }
      /*pushing mobile app above starts here*/
      var downContent=$(".slf-header-wrapper .slf-mobile-header-wrapper");
      function mobileAppHeight(target){
        let appHeight=$("#mobile-app-banner").height();
          appHeight=appHeight+24; //24 due to padding top in px
          $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':appHeight});
          $(target).attr({'style': 'margin-top: '+appHeight+'px'});
      }
      if("#mobile-app-banner"){
          var target=$('#mobile-app-banner').closest(".experiencefragment").siblings(".experiencefragment").find('.slf-mobile-header-wrapper');
        if($('#mobile-app-banner').hasClass("app-hide")){
            $(".slf-mobile-header-wrapper").removeClass('top-not');
            $(target).attr({'style':'margin-top:0'});
            $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':'auto'});
        }
        else{
          if($(window).width()<1440){
              $(target).addClass('top-not');
              mobileAppHeight(target);
          }
          else{
              $(".slf-mobile-header-wrapper").removeClass('top-not');
              $(target).attr({'style':'margin-top:0'});
              $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':'auto'});
          }
        }
      }
      function mobile_banner(){
          if("#mobile-app-banner"){
            var target=$('#mobile-app-banner').closest(".experiencefragment").siblings(".experiencefragment").find('.slf-mobile-header-wrapper');
          if($("#mobile-app-banner").hasClass("app-hide")){
            $(target).attr({'style':'margin-top:0'});
              $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':'auto'});
          }
          else{         
            if($(window).width()<1440){
                mobileAppHeight(target);
            }
            else{
              $(target).attr({'style':'margin-top:0'});
                $("#mobile-app-banner").parent().closest('.xf-content-height').css({'min-height':'auto'});
            }
          }
        }
      }
      $(window).resize(function(){
      mobile_banner();
      });
      //to overwrite default site level notification style for containers
      if($("#mobile-app-banner").length>0){
        $('.root > .aem-Grid > *:not(:first-child)').css({"top": 'auto'});
      }
      $(window).resize(function () {
        if($("#mobile-app-banner").length>0){
            $('.root > .aem-Grid > *:not(:first-child)').css({"top": 'auto'});
          }
      });
      /* removing breadcrumb-none class for publish pages starts here */
      // targeting via url
      // let hostName=window.location.hostname;
      // if($("#mobile-app-banner").length>0){
      //     if($('.breadcrumb')){
      //         if(hostName.includes("www.")){
      //             alert(1);
      //             $('.breadcrumb').removeClass('breadcrumb-none');
      //         }
      //     }
  
      // }
      // targeting via wcmmode cookies for aem pages
      if($("#mobile-app-banner").length>0){
          if($('.breadcrumb')){
              let wcmMode=getCookie('wcmmode');
              if(document.cookie.indexOf('wcmmode')==-1 || ( wcmMode != "preview" && wcmMode != "edit")){
                $('.breadcrumb').removeClass('breadcrumb-none');
                if($('.titlebar').length>0){
                  $('.titlebar').addClass('mar-top-0');
                }
              }else{
                $('.breadcrumb').addClass('breadcrumb-none');
              }
          }
      }
      /* removing breadcrumb-none class for publish pages ends here */
       /*pushing mobile app above ends here*/
  });