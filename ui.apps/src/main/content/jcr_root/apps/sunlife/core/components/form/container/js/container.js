/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/webpack/components/form/container/index.js":
/*!*************************************************************!*\
  !*** ./src/main/webpack/components/form/container/index.js ***!
  \*************************************************************/
/***/ (function() {

eval("$(document).ready(function () {\r\n\t$('.editorial-nav-mobile-wrapper .cmp-form-button').addClass('fa fa-chevron-right');\r\n\t\tvar pathName= window.location.pathname ;\r\n\t\t$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field').find('option').each(function(){\r\n\t\tvar strLink =  $(this).attr('value');\r\n\t\tvar strLink1 = strLink.localeCompare(pathName);\r\n\t\tif(!strLink1){\r\n\t\t\t$(this).attr(\"selected\",\"selected\");\r\n\t\t}\r\n\t})\r\n\t$('.editorial-nav-mobile-wrapper .cmp-form-button').click(function(){\r\n\t\tvar link_selected=$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field--drop-down').val();\r\n\t\twindow.location.href=link_selected;\r\n\t\treturn false;\r\n\t});\r\n\r\n\t //Sunscribe Pop Up\r\n\t subscribe_popup_form();\r\n\t $(window).resize(function () {\r\n\t\t subscribe_popup_form();\r\n\t });\r\n \r\n\t function subscribe_popup_form(){\r\n\t\t if ($(window).width() > 767)\r\n\t\t {\r\n\t\t\t $('.subscribe-popup-form-wrapper form .text').first().css('width','25%');\r\n\t\t\t $('.subscribe-popup-form-wrapper form .text').last().css('width','50%');\r\n\t\t }\r\n\t\t else\r\n\t\t {\r\n\t\t\t $('.subscribe-popup-form-wrapper form .text').first().css('width','100%');\r\n\t\t\t $('.subscribe-popup-form-wrapper form .text').last().css('width','100%');\r\n\t\t }\r\n\t }\r\n\r\n\t //CTA Form\r\n\tcta_form();\r\n\t$(window).resize(function () {\r\n\t\tcta_form();\r\n\t});\r\n\r\n   function cta_form()\r\n   {\r\n\t   if ($(window).width() > 1024)\r\n\t   {\r\n\t\t   $('.cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');\r\n\t\t   $('.cta-form-wrapper form .cmp-form-button').each(function(){\r\n\t\t\t$(this).html($(this).val());\r\n           });\r\n\t   }\r\n\t   else\r\n\t   {\r\n\t\t   $('.cta-form-wrapper form .cmp-form-button').html('');\r\n\t\t   $('.cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');\r\n\t   }\r\n   }\r\n   //Home CTA Form\r\n   home_cta_form();\r\n   $(window).resize(function () {\r\n\t   home_cta_form();\r\n   });\r\n   \r\n  function home_cta_form()\r\n  {\r\n\t  if ($(window).width() > 767)\r\n\t  {\r\n\t\t  $('.home-cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');\r\n\t\t  $('.home-cta-form-wrapper form .cmp-form-button').each(function(){\r\n\t\t\t$(this).html($(this).val());\r\n          });\r\n\t  }\r\n\t  else\r\n\t  {\r\n\t\t  $('.home-cta-form-wrapper form .cmp-form-button').html('');\r\n\t\t  $('.home-cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');\r\n\t  }\r\n  }\r\n\r\n});\r\n\n\n//# sourceURL=webpack://aem-maven-archetype/./src/main/webpack/components/form/container/index.js?");

/***/ }),

/***/ "./src/main/webpack/components/form/container/index_module.js":
/*!********************************************************************!*\
  !*** ./src/main/webpack/components/form/container/index_module.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/main/webpack/components/form/container/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_js__WEBPACK_IMPORTED_MODULE_0__);\n// import './style.scss';\r\n\r\n\r\n\n\n//# sourceURL=webpack://aem-maven-archetype/./src/main/webpack/components/form/container/index_module.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/webpack/components/form/container/index_module.js");
/******/ 	
/******/ })()
;