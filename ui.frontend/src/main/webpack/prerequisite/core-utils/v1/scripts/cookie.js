/**
 * cookies.js
 * @fileOverview cookie utlitity to provide getCookies and setCookies in one place for all custom events
 */
(function (util) {
    'use strict';
 
    /**
    * cookies methods
    * @namespace cookie
    * @memberof sunCore.util
    * @param {Function} func - The function to be executed on the event.    *
    * @return {Object} - The object containing the methods for cookies.
    */
    util.cookie = (function() {  
        /**
         * getCookies method to get the cookie value by name
         * @param {String} cname - The name of the cookie.
         * @return {String} - The value of the cookie.
         * @example
         * sunCore.util.cookie.getCookies('cookieName');
        */           
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

        /**
         * createCookie method to set the cookie value by name
         * @param {string} name to get the cookie name
         * @param {string} value to get the cookie value
         * @param {number} days to get  the cookie duration
         * @param {boolean} isSession to getif sesssion is true r false
         *
         * @example
         * sunCore.util.cookie.createCookie('cookieName', 'cookieValue', 1, false);
         */         
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
        return {
            getCookie: getCookie,
            createCookie: createCookie
        };
    })();
})(sunCore.util);