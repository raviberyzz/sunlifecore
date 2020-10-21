$(document).ready(function () {
    popUpWidth();
    function popUpWidth() {
        var popWidth = $(window).width();
        $(".preference-popup-wrapper").width(popWidth);
    };
    if ($(window).width() > 1024) {
        popUpWidth();
    }
    $(window).resize(function () {
        if ($(window).width() > 1024) {
            popUpWidth();
        }
    });
    $(window).load(function () {
        $('#tabs-container .cmp-tabs__tablist li.cmp-tabs__tab').first().addClass('cmp-tabs__tab--active');
        $('#tabs-container .cmp-tabs__tablist li.cmp-tabs__tab').first().attr('aria-selected', 'true');
        $('#tabs-container .cmp-tabs__tabpanel').first().addClass('cmp-tabs__tabpanel--active');
        $('#tabs-container .cmp-tabs__tab').click(function () {
            $(this).siblings().removeClass('cmp-tabs__tab--active');
            $(this).addClass('cmp-tabs__tab--active');
            $(this).siblings().attr('aria-selected', 'false');
            $(this).attr('aria-selected', 'true');
            var tabIndex = $(this).attr('tabindex');
            $('#tabs-container .cmp-tabs__tabpanel').each(function () {
                if ($(this).attr('tabindex') == tabIndex) {
                    $(this).siblings().removeClass('cmp-tabs__tabpanel--active');
                    $(this).addClass('cmp-tabs__tabpanel--active');
                }
            })
        })
    })
});