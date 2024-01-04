$(document).ready(function () {
  function chevronHandler($elem, status) {
    let $chevronUP = $elem.find(".fa-chevron-up"),
      $chevronDown = $elem.find(".fa-chevron-down");
    if (status) {
      $chevronUP.removeClass("show").addClass("hide");
      $chevronDown.removeClass("hide").addClass("show");
    } else {
      $chevronUP.removeClass("hide").addClass("show");
      $chevronDown.removeClass("show").addClass("hide");
    }
  }

  function accordionHeaderKeyEventHandler(e) {
    if (e.key === "Escape" && $(this).siblings(".accordion-collapse").hasClass("expanded")) {
      toggleAccordionCollapse($(this));
    }
  }
  function resetAccordionForSingleSelection($accordionItemHeader) {
    const $singleExpansion = $accordionItemHeader.attr("data-single-expansion");
    if ($singleExpansion == "true") {
      const $accordionItem = $accordionItemHeader.parents(".accordion-item").parents('.accordion');
      $accordionItem.find(".accordion-collapse").removeClass("expanded show");
      $accordionItem.find(".accordion-collapse").css("height", "");
      $accordionItem.find(".accordion-button").attr("aria-expanded", false);
      $accordionItem.find(".sl-icon").removeClass("show").removeClass("hide");
      chevronHandler($accordionItem, true);
    }
  }

  function accordionHeaderClickEventHandler(e) {
    const $accordionItemHeader = $(this);
    const $accordionContentElement = $accordionItemHeader.siblings(".accordion-collapse")
    
    if ($accordionContentElement.hasClass("expanded")) {
      toggleAccordionCollapse($accordionItemHeader);
    } else {
      resetAccordionForSingleSelection($accordionItemHeader);
      $accordionItemHeader.find(".sl-icon").removeClass("hide").removeClass("show");
      $accordionContentElement.addClass("show expanded");
      $accordionItemHeader.find(".accordion-button").attr("aria-expanded", true);
      chevronHandler($accordionItemHeader, false);
      $accordionContentElement.height($accordionContentElement.find(".accordion-body").innerHeight() + 24 + "px");
    }
  }

  function toggleAccordionCollapse($accordionHeader) {
    $accordionHeader.find(".sl-icon").removeClass("hide").removeClass("show");
    $accordionHeader.find(".accordion-button").attr("aria-expanded", false);
    $accordionHeader.siblings(".accordion-collapse").removeClass("expanded");
    $accordionHeader.siblings(".accordion-collapse").css("height", "");
    chevronHandler($accordionHeader, true);
  }
  function accordionDefaultSelection() {    
    let $accordionContainer = $(".sl-accordion")
    $accordionContainer.each(function() {
      const $accordion = $(this);
      const $accordionExpandedItem = $accordion.find(".accordion-collapse.show.expanded");
      $accordionExpandedItem.height($accordionExpandedItem.find(".accordion-body").innerHeight() + 24 + "px");
    })
  }
  function init() {
    let $accordionHeaderElem = $(".sl-accordion .accordion-header");
    accordionDefaultSelection();
    $accordionHeaderElem.keydown(accordionHeaderKeyEventHandler);
    $accordionHeaderElem.click(accordionHeaderClickEventHandler);
  }

  init();
});
