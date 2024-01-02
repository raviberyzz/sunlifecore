$(document).ready(function () {
  function hideAccordion(scopeVar) {
    $(scopeVar).find(".sl-icon").removeClass("hide").removeClass('show');
    $(scopeVar).find(".accordion-button").attr("aria-expanded", false);
    $(scopeVar).siblings(".accordion-collapse").removeClass("expanded")
    $(scopeVar).find(".fa-chevron-up").addClass("hide");
    $(scopeVar).find(".fa-chevron-down").addClass("show");
    $(scopeVar).siblings(".accordion-collapse").css('height', "");
  }
  $(".sl-accordion .accordion-header").keydown(function(e) {
      if(e.key === "Escape" && $(this).siblings(".accordion-collapse").hasClass("expanded")) {                
        hideAccordion(this)
      }
  });
  $(".sl-accordion .accordion-header").click(function () {
    const singleExpansion = $(this).attr("data-single-expansion");
    if ($(this).siblings(".accordion-collapse").hasClass("expanded")) {
      hideAccordion(this);
    } else {
      if (singleExpansion == "true") {
        const accordionItem =  $(this).parents('.accordion-item');
        accordionItem.find(".sl-accordion .accordion-collapse").removeClass("expanded") // closes all open accordians
        accordionItem.find(".accordion-collapse").css('height', "");
        accordionItem.find(".accordion-button").attr("aria-expanded", false);
        accordionItem.find(".sl-icon").removeClass("show").removeClass("hide");
        accordionItem.find(".fa-chevron-down").addClass("show");
        accordionItem.find(".fa-chevron-up").addClass("hide");
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
