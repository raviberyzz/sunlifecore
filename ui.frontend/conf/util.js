
/* Util class for module and clientlib manager */
class Util {
    constructor(params) {
        this.module = params.module;
        Util.updateArraySomePolyfill();
    }

    static tenantPrefix = "";

    static isVersionString(str) {
        return /v[0-9]$/.test(str);
    }

    static updateArraySomePolyfill() {
        /**
         * Array.some() polyfill
         */
        // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        // Production steps of ECMA-262, Edition 5, 15.4.4.17
        // Reference: http://es5.github.io/#x15.4.4.17
        if (!Array.prototype.some) {
            Array.prototype.some = function (fun/*, thisArg*/) {
                'use strict';

                if (this == null) {
                    throw new TypeError('Array.prototype.some called on null or undefined');
                }

                if (typeof fun !== 'function') {
                    throw new TypeError();
                }

                var t = Object(this);
                var len = t.length >>> 0;

                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && fun.call(thisArg, t[i], i, t)) {
                        return true;
                    }
                }

                return false;
            };
        }
    }

    logger(msg) {
        console.log(`${this.module}: ${msg} \n`);
    }

    getVersion(str) {
        if (Util.isVersionString(str)) {
            return str;
        }
    }

    isTenantPrefixModule(str) {
        return str.startsWith(Util.tenantPrefix);
    }


}

module.exports = Util;