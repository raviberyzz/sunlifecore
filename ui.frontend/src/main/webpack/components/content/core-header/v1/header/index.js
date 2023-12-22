(function () {
       
    /* Retrieves the element based on a classname*/
    const utilityLists = document.getElementsByClassName("sl-utility-bar")[0];
    const navLists = document.getElementsByClassName("sl-header-offcanvas")[0];

    /* Handles the desktop and mobile view*/
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
        }
    }

    /* Handles hamburger menu open clicks*/
    function callMenuOpen() {
        var headerNode = document.getElementById('nav-header');
        headerNode.insertAdjacentElement("afterend", navLists);
    }
    /* Handles hamburger menu close clicks*/
    function callMenuClose() {
        var slnavNode = document.getElementById('sl-nav');
        slnavNode.append(navLists);
    }

    window.addEventListener("load", offCanvas);
    window.addEventListener("resize", offCanvas);

    document.getElementById("menuOpen").onclick = callMenuOpen;
    document.getElementById("menuClose").onclick = callMenuClose;
})()