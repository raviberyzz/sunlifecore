"use strict";
const HTML_EXTENSION = ".html";
use(function() {
    var navPath = this.path;
    if (navPath == null || navPath === "") {
        return {
            navPath: navPath
        };
    }
    if (navPath.includes("/content/sunlife")) {
        navPath = navPath.replace(/([\/#?])$/, HTML_EXTENSION + "$1");
        if (!navPath.includes(HTML_EXTENSION)) {
            navPath += HTML_EXTENSION;
        }
    }
    return {
        navPath: navPath
    }
});