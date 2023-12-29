$(document).ready(function () {
    $(".sl-accordion .accordion-header").keydown(function(e) {
        if(e.key === "Escape" && $(this).siblings(".accordion-collapse").hasClass("expanded")) {                
          $(this).find(".sl-icon").removeClass("hide").removeClass('show');
          $(this).find(".accordion-button").attr("aria-expanded", false);
          $(this).siblings(".accordion-collapse").removeClass("expanded")
          $(this).find(".fa-chevron-up").addClass("hide");
          $(this).find(".fa-chevron-down").addClass("show");
          $(this).siblings(".accordion-collapse").css('height', "");
        }
    });
  $(".sl-accordion .accordion-header").click(function () {
    const singleExpansion = $(this).attr("data-single-expansion");
    if ($(this).siblings(".accordion-collapse").hasClass("expanded")) {
      $(this).find(".sl-icon").removeClass("hide").removeClass('show');
      $(this).find(".accordion-button").attr("aria-expanded", false);
      $(this).siblings(".accordion-collapse").removeClass("expanded")
      $(this).find(".fa-chevron-up").addClass("hide");
      $(this).find(".fa-chevron-down").addClass("show");
      $(this).siblings(".accordion-collapse").css('height', "");
    } else {
      if (singleExpansion == "true") {
        $(this).parents('.accordion-item').find(".sl-accordion .accordion-collapse").removeClass("expanded") // closes all open accordians
        $(this).parents('.accordion-item').find(".accordion-collapse").css('height', "");
        $(this).parents('.accordion-item').find(".accordion-button").attr("aria-expanded", false);
        $(this).parents('.accordion-item').find(".sl-icon").removeClass("show").removeClass("hide");
        $(this).parents('.accordion-item').find(".fa-chevron-down").addClass("show");
        $(this).parents('.accordion-item').find(".fa-chevron-up").addClass("hide");
      }
      $(this).find(".sl-icon").removeClass("hide").removeClass('show');
      $(this)
        .siblings(".accordion-collapse")
        .addClass("show expanded"); // opens clicked accordian
      $(this).find(".accordion-button").attr("aria-expanded", true);
      $(this).find(".fa-chevron-up").addClass("show");
      $(this).find(".fa-chevron-down").addClass("hide");
      $(this).siblings(".accordion-collapse").height(($(this).siblings(".accordion-collapse").find(".accordion-body").innerHeight()+24) + "px");
    }
  });
  $(".accordion-item").each(function(){
    $(this).find(".accordion-collapse").height(($(this).find(".accordion-body").innerHeight()+24) + "px");
  })

  /* For first open accordion */
  var accLength = $(".sl-accordion .accordion-item").length;
  var acc = $(".sl-accordion .accordion-item");
  if ($(".sl-accordion").hasClass("first-open")) {
    if (accLength > 1) {
      var firstAcc = acc[0];
      $(firstAcc).find(".accordion-collapse").addClass("show expanded");
      $(firstAcc).find(".accordion-button").attr("aria-expanded", true);
      $(this).find(".fa-chevron-up").addClass("show").removeClass("hide");
      $(this).find(".fa-chevron-down").addClass("hide").removeClass("show");
    }
  }
});
