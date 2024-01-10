(function () {
    //Used to Wrap Buttons for each form into Group to provide proper spacing between buttons
    const forms = document.querySelectorAll(".form-container-component form");

    forms.forEach((form) => {

    const buttonGroupWrapper = document.createElement("div");
    buttonGroupWrapper.classList.add("button-group");
    
    form.appendChild(buttonGroupWrapper);

    const formButtons = form.querySelectorAll("button");

    formButtons.forEach((button) => {
        form.querySelector('.button-group').appendChild(button);
    });
    
    });

})()