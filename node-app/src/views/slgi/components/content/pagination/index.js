$(document).ready(function () {
    if ($('.pagination')) {
        var getDomain = window.location.hostname;
        if (getDomain.indexOf("sunnet") > -1) {
            var paginationLinks = $('.pagination.pagination-list li > a');
            Object.values(paginationLinks).forEach(element => {
                if (typeof element === 'object' && element.nodeType !== undefined) {
                    var anchorTag = element.getAttribute('href');
                    var modifiedUrl = "/Slgi" + anchorTag;
                    element.setAttribute("href", modifiedUrl);
                }

            });

        }
    }

})