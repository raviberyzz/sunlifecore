/**
* Left Navigation Component JS
*/

(function () {

    /**
    * Create Dropdowns to Collapse 2nd Level 
    */
    function createDropdowns() {
        let leftNavDropdowns = document.querySelectorAll("nav.sl-left-nav .nav-dropdown.nav-link");

        leftNavDropdowns.forEach(function (dropdown, i) {
            //Add controls and classes for Collapse Dropdown
            dropdown.setAttribute("aria-controls", `leftnavdropdown${i}`);
            dropdown.setAttribute("href", `#leftnavdropdown${i}`);
            let level2Nav = dropdown.nextElementSibling;
            level2Nav.setAttribute("id", `leftnavdropdown${i}`);
            level2Nav.classList.add('sub-menu', 'collapse', 'nav',  'ms-1');
            level2Nav.classList.remove('sl-left-nav', 'navbar-nav');
        });
    }

    /**
    * Check if Left Nav Exists.
    */
    function isModuleExist() {
        if($('nav.sl-left-nav').length <= 0) {
            return false;
        }
        return true;
    }
 
    /**
    * Initialize the module.
    */
    function init() {
        if(isModuleExist()) {
            createDropdowns();
        }
    }
  
    document.addEventListener("DOMContentLoaded", init);

  
  })()


