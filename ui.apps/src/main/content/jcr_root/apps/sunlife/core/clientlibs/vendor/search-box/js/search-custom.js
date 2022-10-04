/*search-box/search-box.js*/
const searchBody = document.querySelector('#coveo-search-body');
if (searchBody) {
	$(document).on("click", '.magic-box-input', function (e) {
		$('#search-box-desktop :input').on('keydown', function (e) {
			if (e.key === 'Enter' || e.keyCode === 13) {
				if ($('#sun-search').hasClass('in')) {
					$('#sun-search').removeClass('in');
					$("#search-btn").attr('aria-expanded', 'false');
				}
			}
		});
	});

	$(document).on("keydown", function (e) {
		$('#search-box-desktop :input, #search-box-desktop .CoveoSearchButton').on('keydown', function (e) {
			if (e.key === 'Enter' || e.keyCode === 13) {
				if ($('#sun-search').hasClass('in')) {
					setTimeout(function () {
						$('#sun-search').removeClass('in');
						$("#search-btn").attr('aria-expanded', 'false');
					}, 500)
				}
			}
		});
	});

	$(document).on("click", '.magic-box-input', function (e) {
		$('#search-box-desktop .CoveoSearchButton.coveo-accessible-button').on('click', function (e) {
			if ($('#sun-search').hasClass('in')) {
				$('#sun-search').removeClass('in');
				$("#search-btn").attr('aria-expanded', 'false');
			}
		});
	});
	
	$(document).on("click", '.magic-box-input', function (e) {
		$('#search-box-mobile :input').on('keydown', function (e) {
			if (e.key === 'Enter' || e.keyCode === 13) {
				$('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');
				$('.offcanvas-overlay').removeClass('active');
				$('.container').css({ 'margin-left': '0px' });
				$('body').removeClass('overflow-hidden');
				$('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
				$('#hamburgerMenu button').attr("aria-expanded", "false");
				$('#hamburgerMenu button').focus();
			}
		});
	});
}

$(document).on("keydown", '.magic-box-input', function (e) {
	if (utag_data.page_canonical_url.includes('uk.ca.sunlife') || utag_data.page_canonical_url.includes('sloc.co.uk')) {
		$('.global-nav-primary-item').eq(0).addClass('first-current');
		$('#search-box-desktop .CoveoSearchButton').on('keydown', function (e) {
			if (e.which == 9 && !e.shiftKey) {
				$('.global-nav-primary-item.first-current').eq(0).addClass('focus');
				$('.global-nav-primary-item.first-current').setAttribute("tabIndex", "-1");
				$('.global-nav-primary-item.first-current').eq(0).focus();
			}
		});
	}
	else if (utag_data.page_canonical_url.includes('ca.sunlife/slfas') || utag_data.page_canonical_url.includes('sunlife.ca/slfas')) {
			$('#search-box-desktop .CoveoSearchButton').on('keydown', function (e) {
				if (e.which == 9) {
					$('.global-nav-primary-item').eq(0).addClass('focus');
					$('.global-nav-primary-item').setAttribute("tabIndex", "-1");
					$('.global-nav-primary-item').eq(0).focus();
				}
		});
	}
	else {
		$('#search-box-desktop .CoveoSearchButton').on('keydown', function (e) {
			if (e.which == 9) {
				if (!$(this).parents().hasClass("adv-search-bar-wrapper")) {
					e.preventDefault();
					$('#sun-search .close-div a').focus();
				}
			}
		});
	}
});

$(document).on("keyup", '.search-icon-container', function (e) {
	if (e.keyCode == 13) {
		$("#search-box-desktop input").focus();
	}
});

$(document).on("click", '.search-icon-container', function (e) {
	$("#search-box-desktop input").focus();
});