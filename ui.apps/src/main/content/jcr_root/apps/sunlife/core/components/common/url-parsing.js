"use strict";
use(function() {
    var navPath = this.path;
    if (navPath == null || navPath.equals("")) {
        return {
            navPath: navPath
        };
    }
    if (navPath.contains("/content/sunlife")) {
        if (navPath.contains("/?")) {
            navPath = navPath.replace("/?", ".html?");
        } else if (navPath.contains("/#")) {
            navPath = navPath.replace("/#", ".html#");
        } else if (navPath.contains("#")) {
            navPath = navPath.replace("#", ".html#");
        } else {
            navPath = navPath + ".html";
        }
    }
    return {
        navPath: navPath
    }
});