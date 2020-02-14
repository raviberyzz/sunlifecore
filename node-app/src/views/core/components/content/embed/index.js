$(function(){
    //dynamically injecting script tag
    let scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', 'https://play.vidyard.com/embed/v4.js');
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
})