$(document).ready(function () {
  $('#mainfooter .accordion-heading').off('click').on('click', function () {
    $(this).siblings('.list-div').toggle('collapse');
    $(this).closest('.container-component').parent().siblings().find('.list-div').css('display', 'none');
    $(this).closest('.container-component').parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
    $(this).closest('.container-component').parent().parent().siblings().find('.list-div').css('display', 'none');
    $(this).closest('.container-component').parent().parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
    if ($(this).attr('aria-expanded') == 'true') {
      $(this).attr('aria-expanded', false);
    }
    else if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true);
    }
  });
});