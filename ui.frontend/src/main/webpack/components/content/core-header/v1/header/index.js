(function () {
       
    /* Retrieves the element based on a classname/id */
    const utilityLists = document.getElementsByClassName("sl-utility-bar")[0];
    const offcanvasEl = document.getElementById('sl-header-offcanvas')

    /* Handles the desktop and mobile view */
    function offCanvas() {
        if (window.innerWidth <= 1239) {
            utilityLists.classList.remove("sl-utility-bar");
            utilityLists.classList.add("sl-utility-bar-offcanvas");
            var bodyNode = document.getElementById('offcanvas-body');
            bodyNode.append(utilityLists);
        }

        else {
            utilityLists.classList.remove("sl-utility-bar-offcanvas");
            utilityLists.classList.add("sl-utility-bar");
            var navNode = document.getElementById('nav-header');
            navNode.insertAdjacentElement("beforebegin", utilityLists);
            /* Handles hamburger menu open on desktop view */
            if ( offcanvasEl.classList.contains("show") && !offcanvasEl.classList.contains("hiding") ) {
                const offCanvas = new bootstrap.Offcanvas(offcanvasEl);
                offCanvas.hide();
                offcanvasEl.classList.remove('show');
                var test = document.getElementsByClassName("offcanvas-backdrop")[0];
                test.remove();
                callMenuClose();
              }
        }
    }

    /* Handles hamburger menu open clicks */
    function callMenuOpen() {
        console.log('call menu open called')
        var headerNode = document.getElementById('nav-header');
        headerNode.insertAdjacentElement("afterend", offcanvasEl);
    }
    /* Handles hamburger menu close clicks */
    function callMenuClose() {
        console.log('call menu close called')
        var slnavNode = document.getElementById('sl-nav');
        slnavNode.append(offcanvasEl);
    }

    window.addEventListener("load", offCanvas);
    window.addEventListener("resize", offCanvas);

    document.getElementById("menuOpen").onclick = callMenuOpen;
    document.getElementById("menuClose").onclick = callMenuClose;
})()