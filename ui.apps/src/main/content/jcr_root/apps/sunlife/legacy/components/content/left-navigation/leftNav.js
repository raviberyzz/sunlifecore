"use strict";
use(function () {
    var parent = currentPage.getParent();
    var parentTitle= parent.title;
    var path = parent.getPath();
    var split = parent.getPath().split("/");
    if(split[split.length-1] == "en") {
		parentTitle = currentPage.title;
    }
    return {
            parentPage : parentTitle,
    }
});
