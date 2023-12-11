(function () {

    const classLists = document.getElementsByClassName("sl-utility-bar")[0];

    window.addEventListener("resize", function () {
    
        if(window.innerWidth <= 1239) {   
            classLists.classList.remove("sl-utility-bar");
            classLists.classList.add("sl-utility-bar-offcanvas");
           var node =  document.getElementById('offcanvas-body');
                   node.append(classLists);
        }
     
        else{
            classLists.classList.remove("sl-utility-bar-offcanvas");
            classLists.classList.add("sl-utility-bar");
            var node1 =  document.getElementById('nav-header');
            node1.insertAdjacentElement("beforebegin", classLists);
        }
    }); 
})()