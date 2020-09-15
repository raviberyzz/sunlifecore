$(document).ready(function () {
    var getDomain = window.location.hostname;
    if (getDomain.indexOf("sunnet") > -1) {
        var imageLinks = $('.cmp-image > img');
        Object.keys(imageLinks).forEach(function (element) {
            var imageSrc = imageLinks[element];
            if (typeof imageSrc === 'object' && imageSrc.nodeType !== undefined && imageSrc.getAttribute('src').indexOf(".coreimg") > -1) {
                var anchorTag = imageSrc.getAttribute('src');
                var modifiedUrl = "/Slgi" + anchorTag;
                imageSrc.setAttribute("src", modifiedUrl);
                var cmpTag = imageSrc.parentElement.getAttribute('data-cmp-src');
                var modifiedTag = "/Slgi" + cmpTag;
                imageSrc.parentElement.setAttribute("data-cmp-src", modifiedTag);
            }
        });
    }
});

