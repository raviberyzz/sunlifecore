(function () {

    const utilityLists = document.getElementsByClassName("sl-utility-bar")[0];
    const navLists = document.getElementsByClassName("sl-header-offcanvas")[0];

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

    function callMenuOpen() {
        var headerNode = document.getElementById('nav-header');
        headerNode.insertAdjacentElement("afterend", navLists);
    }

    function callMenuClose() {
        var slnavNode = document.getElementById('sl-nav');
        slnavNode.append(navLists);
    }

    window.addEventListener("load", offCanvas);
    window.addEventListener("resize", offCanvas);

    document.getElementById("menuOpen").onclick = callMenuOpen;
    document.getElementById("menuClose").onclick = callMenuClose;
})()