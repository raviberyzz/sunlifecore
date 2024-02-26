/**
* Dynamic Card Component specific JS Module 
*/
(function(){

    /**
    * Initialize the module.
    */
    function init() {
      bindEvent();
    }

    /**
    * Bind events cards
    */
    function bindEvent() {
      const $clickableCards = $('.card[data-clickable]');
      if($clickableCards.length) {
       $(document).on('click', '.card[data-clickable]', clickableCardHandler)
      }
    }
  
    /**
    * Function to handle the click action on clickable cards
    */
    function clickableCardHandler(event) {
      const $card = $(event.target).closest('.card[data-clickable]');
      const redirectURL = $card.data('href');
      const targetType = $card.data('target');
      if(redirectURL) {
        window.location.href = redirectURL;
      }
    }

    init();
      
})()
