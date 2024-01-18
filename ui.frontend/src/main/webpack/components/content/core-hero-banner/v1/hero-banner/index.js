/**
* Hero Banner Component specific JS Module 
*/
(function(){

    /**
    * Initialize the module.
    */
    function init() {
      // set scrollbar width in custom property
      setScrollbarWidth();

      // bind resize event to update scrollbar custom property
      window.addEventListener('resize', setScrollbarWidth);
    }
  
    /**
    * Handler to update the scrollbar width in custom property.
    */
    function setScrollbarWidth() {
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;
        document.documentElement.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);
    }

    init();
      
})()
