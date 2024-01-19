$(document).ready(function () {
  //function used to handle the chevron icon toggle functionality
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
  //Functions ussed to handle the escape key event to close the accordion on escape
  function accordionHeaderKeyEventHandler(e) {
    if (e.key === "Escape" && $(this).siblings(".accordion-collapse").hasClass("expanded")) {
      toggleAccordionCollapse($(this));
    }
  }
  //Function used to update the height of accordion item to apply smooth csss animation. 
  function updateAccordionItemHeight($accordionContentElement){
    $accordionContentElement.height(($accordionContentElement.find(".accordion-body").outerHeight()) + 24 + "px");
  }
  //Function used to reset the accordion if the single Selection is true in authoring
  function resetAccordionForSingleSelection($accordionItemHeader) {
    const $singleExpansion = $accordionItemHeader.attr("data-single-expansion");
    if ($singleExpansion == "true") {
      const $accordionItem = $accordionItemHeader.parents(".accordion-item").parents('.accordion');
      $accordionItem.find(".accordion-collapse").removeClass("expanded show").css("height", "");
      $accordionItem.find(".accordion-button").attr("aria-expanded", false).addClass("collapsed");
      $accordionItem.find(".sl-icon").removeClass("show").removeClass("hide");
      chevronHandler($accordionItem, true);
    }
  }
  //Function used to  handle the click event of accordion.
  function accordionHeaderClickEventHandler(e) {
    const $accordionItemHeader = $(this);
    const $accordionContentElement = $accordionItemHeader.siblings(".accordion-collapse")
    if ($accordionContentElement.hasClass("expanded")) {
      toggleAccordionCollapse($accordionItemHeader);
    } else {
      resetAccordionForSingleSelection($accordionItemHeader);
      $accordionItemHeader.find(".sl-icon").removeClass("hide").removeClass("show");
      $accordionContentElement.addClass("show expanded");
      $accordionItemHeader.find(".accordion-button").attr("aria-expanded", true).removeClass("collapsed");
      chevronHandler($accordionItemHeader, false);
      updateAccordionItemHeight($accordionContentElement);
    }
  }
  
  //Function used to handle the collapse accordion functionality
  function toggleAccordionCollapse($accordionHeader) {
    $accordionHeader.find(".sl-icon").removeClass("hide").removeClass("show");
    $accordionHeader.find(".accordion-button").attr("aria-expanded", false).addClass("collapsed");
    $accordionHeader.siblings(".accordion-collapse").removeClass("expanded").css("height", "");
    chevronHandler($accordionHeader, true);
  }
  //Functions used to select/toggle the default selected accordion items in authoring.
  function accordionDefaultSelection() {    
    let $accordionContainer = $(".sl-accordion")
    $accordionContainer.each(function() {
      const $accordion = $(this);
      const $accordionExpandedItem = $accordion.find(".accordion-collapse.show.expanded");
      $accordionExpandedItem.each((function(index) {
        updateAccordionItemHeight($accordionExpandedItem.eq(index));
      }))      
    })
  }
  function init() {
    let $accordionHeaderElem = $(".sl-accordion .accordion-header");
    if($accordionHeaderElem.length > 0) {
      accordionDefaultSelection();
    }
    $accordionHeaderElem.keydown(accordionHeaderKeyEventHandler);
    $accordionHeaderElem.click(accordionHeaderClickEventHandler);
  }
  init();
});
