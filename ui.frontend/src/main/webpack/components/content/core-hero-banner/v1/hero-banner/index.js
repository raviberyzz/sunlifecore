(function(){
    function setScrollbarWidth() {
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;
        document.documentElement.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);
      }
      setScrollbarWidth();
      window.addEventListener('resize', setScrollbarWidth);
})()
