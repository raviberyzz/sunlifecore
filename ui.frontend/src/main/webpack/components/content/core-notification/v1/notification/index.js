/**
 * notification.js
 * Site Notification related functionality.
 */
(function (core) {
	"use strict";

	/**
	 * Notification component
	 * @namespace notification
	 * @memberof sunCore.comp
	 */
	core.comp.notification = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				slNotification: ".sl-notification",
        		tabbableElements: "select, input, textarea, button, a"
			},
			CLASS: {
        		ButtonClose: "btn-close",
				multilineActionButton :"multiline-action-button",
        		notificationslNotification: ".notification .sl-notification"
			},
			ATTR: {
				dataBsDismiss: "data-bs-dismiss",
				target : "target"
			}
		};

		let $notifications, 
			$selectableElements, 
			nextFocusableElementIndex = 0,
			skipMultiLineButtonIndex = 1,
			nextElementIndex = 0;


    /**
     * Handles site notification dropdown close event to move keyboard focus to next tabbable element.
     * @param {Event} e - The event object.
     */
    function siteNotificationCloseHandler(e) {
      selectableElements = [].slice.call(document.querySelectorAll(CONSTANT.SELECTOR.tabbableElements));
      nextFocusableElementIndex = 0;
      skipMultiLineButtonIndex = $(e.target).closest(CONSTANT.SELECTOR.slNotification).find(CONSTANT.CLASS.multilineActionButton).length ? 2 : 1;

      selectableElements.find((value, index) => {
          if(value.getAttribute(CONSTANT.ATTR.dataBsDismiss) === 'alert' && value.classList.contains(CONSTANT.CLASS.ButtonClose)){
            nextFocusableElementIndex = index;
            return index;
          }
      });

      nextElementIndex = parseInt(nextFocusableElementIndex) + parseInt(skipMultiLineButtonIndex);
      selectableElements[nextElementIndex].focus();
    }

		/**
		 * Handler to bind event specific for notification
		 * @function bindEvent
		 * @memberof sunCore.comp.notification
		 * @private
		 */
		function bindEvent() {
			$notifications.forEach(alert => {
				alert.addEventListener(util.customEvents.CLOSE_BS_ALERT, e => siteNotificationCloseHandler(e))
			});
		}

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.notification
		 * @private
		 */
		function cacheSelectors() {
			$notifications = [].slice.call(document.querySelectorAll(CONSTANT.CLASS.notificationslNotification));
		}

		/**
		 * Handler called at notification initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.notification
		 * @private
		 */
		function init() {
			cacheSelectors();
			bindEvent();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise notification module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "notification", ".notification .sl-notification");
})(sunCore);