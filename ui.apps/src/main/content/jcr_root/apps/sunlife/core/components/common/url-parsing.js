"use strict";
use(function() {
    var navPath = this.path;
    if (navPath == null || navPath.equals("")) {
        return {
            navPath: navPath
        };
    }
    if (navPath.includes("/content/sunlife")) {
        if (navPath.includes("/?")) {
            navPath = navPath.replace("/?", ".html?");
        } else if (navPath.includes("/#")) {
            navPath = navPath.replace("/#", ".html#");
        } else if (navPath.includes("#")) {
            navPath = navPath.replace("#", ".html#");
        } else {
            navPath = navPath + ".html";
        }
    }
    return {
        navPath: navPath
    }
});