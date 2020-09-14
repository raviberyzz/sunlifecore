$(document).ready(function () {

        if ($('.cmp-image')) {
        var getDomain = window.location.hostname;
        if (getDomain.indexOf("sunnet") > -1) {
            var imageLinks = $('.cmp-image > img');

            Object.values(imageLinks).forEach(element => {
                if (typeof element === 'object' && element.nodeType !== undefined && element.getAttribute('src').indexOf(".coreimg") > -1) {
                    var anchorTag = element.getAttribute('src');
                    var modifiedUrl = "/Slgi" + anchorTag;
                    element.setAttribute("src", modifiedUrl);
                    var cmpTag = element.parentElement.getAttribute('data-cmp-src');
                    var modifiedTag = "/Slgi" + cmpTag;
                    element.parentElement.setAttribute("data-cmp-src", modifiedTag);
                }

            }); 

        }
    }

})

