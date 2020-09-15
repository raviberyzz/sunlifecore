$(document).ready(function () {
    if ($('.pagination')) {
        var getDomain = window.location.hostname;
        if (getDomain.indexOf("sunnet") > -1) {
            var paginationLinks = $('.pagination.pagination-list li > a');
            Object.keys(paginationLinks).forEach(function (element) {
                var anchorLink = paginationLinks[element];
                if (typeof anchorLink === 'object' && anchorLink.nodeType !== undefined) {
                    var anchorTag = anchorLink.getAttribute('href');
                    var modifiedUrl = "/Slgi" + anchorTag;
                    anchorLink.setAttribute("href", modifiedUrl);
                }
            });
        }
    }
})