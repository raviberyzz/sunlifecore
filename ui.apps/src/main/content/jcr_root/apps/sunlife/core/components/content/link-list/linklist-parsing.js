"use strict";
use(function () {

       var navPath = this.path;

    if (navPath == null || navPath.equals("")) {
        return {
            navPath : navPath
        };
    }


    if(navPath.indexOf("/content/sunlife") != -1){
        navPath = navPath + ".html";
    }


    return {
           navPath : navPath
        }


    });