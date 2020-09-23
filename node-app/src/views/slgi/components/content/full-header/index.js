$(document).ready(function () {
    // top margin for all pages in mobile & tablet view
    let wcmMode=getCookie('wcmmode');
    if( wcmMode != "preview" && wcmMode != "edit") {
        if ($('.full-header').parents('.recommended-products-article').next().hasClass('breadcrumb')) {
            $('.breadcrumb').next().addClass('margin-top-fifty');
        } else {
            $('.full-header').parents('.recommended-products-article').next().addClass('margin-top-fifty');
        }
    }
});