(function(){
    //Change Footer at MD Breakpoint. Mobile transofrms into Accordion, Desktop transforms into Column List
    function footerAccordion() {
        const $footerMenuRow = document.querySelectorAll(".sl-footer .footer-menus .footer-menu");
        const $footerMenuHeader = document.querySelectorAll(".sl-footer .footer-menus .footer-menu-header");
        const $footerMenuList = document.querySelectorAll(".sl-footer .footer-menus ul.footer-menu-list");
        const $footerMenuHeaderIsDropdown = $footerMenuHeader[0].classList.contains('footer-menu-header-button') ? true : false;
        
        if (window.innerWidth <= 1239 && !$footerMenuHeaderIsDropdown) { 
            //Transform Elements to Mobile Accordion
            for (const menuRow of $footerMenuRow) {
                menuRow.classList.remove("col");
                menuRow.classList.add("footer-menus-dropdown");
                menuRow.classList.add("dropdown");
            }
            
            for (const menuHeader of $footerMenuHeader) {
                let mobileFooterMenuHeader = document.createElement('button');
                mobileFooterMenuHeader.classList.add("footer-menu-header");
                mobileFooterMenuHeader.classList.add("footer-menu-header-button");
                mobileFooterMenuHeader.setAttribute("aria-expanded", "false");
                mobileFooterMenuHeader.setAttribute("data-bs-toggle", "dropdown");
                mobileFooterMenuHeader.innerHTML = menuHeader.innerHTML;
                menuHeader.insertAdjacentElement("beforebegin", mobileFooterMenuHeader);
                menuHeader.remove();
            }

            for (const menuList of $footerMenuList) {
                menuList.classList.remove("show");
                menuList.classList.add("dropdown-menu");
                
            }

        } else if (window.innerWidth >= 1240 && $footerMenuHeaderIsDropdown) {
            //Transform Elements to Desktop Heading and List
            for (const menuRow of $footerMenuRow) {
                menuRow.classList.remove("footer-menus-dropdown");
                menuRow.classList.remove("dropdown");
                menuRow.classList.add("col");
            }

            for (const menuHeader of $footerMenuHeader) {
                let desktopFooterMenuHeader = document.createElement('div');
                desktopFooterMenuHeader.classList.add("footer-menu-header");
                desktopFooterMenuHeader.innerHTML = menuHeader.innerHTML;
                menuHeader.insertAdjacentElement("beforebegin", desktopFooterMenuHeader);
                menuHeader.remove();
            }
            
            for (const menuList of $footerMenuList) {
                menuList.classList.remove("show");
                menuList.classList.remove("dropdown-menu");

            }

        }
    }

    function isModuleExist() {
        if($('.sl-footer .footer-menus').length <= 0) {
            return false;
        }
        return true;
    }
 
    function init() {
        if(isModuleExist()) {
            footerAccordion();
        }
    }
 
    window.addEventListener("DOMContentLoaded", init);
    window.addEventListener("resize", init);
})()