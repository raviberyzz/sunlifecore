$(document).ready(function () {
    // top margin for all pages in mobile & tablet view
        if ($('.full-header').parents('.recommended-products-article').next().hasClass('breadcrumb')) {
            $('.breadcrumb').next().addClass('margin-top-fifty');
        } else {
            $('.full-header').parents('.recommended-products-article').next().addClass('margin-top-fifty');
        }

});