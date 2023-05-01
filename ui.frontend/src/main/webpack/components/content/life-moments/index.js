$(document).ready(function () {
    life_moments_fix();
    $(window).resize(function () {
        life_moments_fix();
    });

    function validate(formInstance) {
        var isValid = formInstance.parsley({}).isValid();
        var layoutHeight = $('.yellow-background-wrapper').siblings('.layout-container').height();
        if (!isValid && formInstance.find('.parsley-errors-list').length == 0) {
            if (formInstance[0].id == 'findadv') {
                var inputLength = formInstance.find('input[type=text]').val();
                if (inputLength.length > 5 || inputLength.length == 0) {
                    setTimeout(function () {
                        if (formInstance.find('.parsley-errors-list').length) {
                            var increasedHeight = layoutHeight + 58;
                            $('.yellow-background-wrapper').css('padding-top', increasedHeight);
                        }
                    }, 0)
                } else if (inputLength.length == 0 && formInstance.find('.parsley-errors-list').length == 0) {
                    $('.yellow-background-wrapper').css('padding-top', layoutHeight);
                }
            } else if (formInstance[0].id !== 'findadv') {
                var increasedHeight = layoutHeight + 58;
                $('.yellow-background-wrapper').css('padding-top', increasedHeight);
            }
        }
        else if (isValid) {
            $('.yellow-background-wrapper').css('padding-top', layoutHeight);
        }
    }

    $('.home-cta-form-wrapper .cmp-form-text input').on('keyup', function () {
        var formInstance = $(this).closest('form');
        validate(formInstance);
    })

    $('.home-cta-form-wrapper .cmp-form-options__field').on('change', function () {
        var formInstance = $(this).closest('form');
        validate(formInstance);
    })
    $('.yellow-icon-white-background .home-cta-form-wrapper form .cmp-form-button').on('click', function () {
        var formInstance = $(this).closest('form');
        validate(formInstance);
    })
    $('.blue-background-wrapper').find('.life-moments-wrapper-desktop .list-unstyled').children('li').children('a').each(function () {
        var text = $(this).text();
        var lastWord = text.split(" ").pop();
        var index = text.indexOf(lastWord);
        text = text.substr(0, index);
        $(this).text("");
        lastWord = lastWord.toUpperCase();
        var html = "<span>" + text + "</span>" + "<br><strong>" + lastWord + "</strong>";
        $(this).append(html);
    });
    $('.yellow-background-wrapper').find('.life-moments-wrapper-desktop .list-unstyled').children('li').children('a').each(function () {
        var text = $(this).text();
        var lastWord = text.split(" ").pop();
        var index = text.indexOf(lastWord);
        text = text.substr(0, index);
        $(this).text("");
        lastWord = lastWord.toLowerCase();
        var html = "<span>" + text + "</span>" + "<br><strong>" + lastWord + "</strong>";
        $(this).append(html);
    });
    function life_moments_fix() {
        var pageWidth = $(window).width();
        if (pageWidth >= 768) {
            $('.yellow-background-wrapper').siblings('.layout-container').css('position', 'absolute');
            $('.yellow-background-wrapper').siblings('.layout-container').css('width', '95%');
            $('.yellow-background-wrapper').siblings('.layout-container').addClass('horizontal-middle-align');
            $('.yellow-background-wrapper').siblings('.layout-container').css('margin-top', '-18px');
            $('.yellow-background-wrapper').siblings('.layout-container').css('z-index', '1');
            var layoutHeight = $('.yellow-background-wrapper').siblings('.layout-container').height();
            $('.yellow-background-wrapper').css('padding-top', layoutHeight);
        }
        else {
            $('.yellow-background-wrapper').siblings('.layout-container').css('position', '');
            $('.yellow-background-wrapper').siblings('.layout-container').css('width', '100%');
            $('.yellow-background-wrapper').siblings('.layout-container').removeClass('horizontal-middle-align');
            $('.yellow-background-wrapper').siblings('.layout-container').css('margin-top', '0px');
            $('.yellow-background-wrapper').css('z-index', '0');
            $('.yellow-background-wrapper').css('padding-top', '48px');
        }
    }
    $('.lifemoments-apac').find('.life-moments-wrapper-desktop .list-unstyled').children('li').children('a').each(function () {
        var text = $(this).text();
        var lastWord = text.split(" ").pop();
        var index = text.indexOf(lastWord);
        text = text.substr(0, index);
        $(this).text("");
        lastWord = lastWord.toLowerCase();
        var html = "<span>" + text + "</span>" + "<br><strong>" + lastWord + "</strong>";
        $(this).append(html);
    });
})