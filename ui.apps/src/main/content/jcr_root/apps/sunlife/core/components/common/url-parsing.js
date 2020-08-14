"use strict";
use(function () {
       var navPath = this.path;
    if (navPath == null || navPath.equals("")) {
        return {
            navPath : navPath
        };
    }

    if(navPath.indexOf("/content/sunlife") != -1){
        if(navPath.indexOf("/?") != -1){
			var splitUrl=navPath.split("/?");
            navPath=splitUrl[0]+".html?"+splitUrl[1];
        }
        else{
            navPath = navPath + ".html";
        }
    }

    return {
           navPath : navPath
        }

    });