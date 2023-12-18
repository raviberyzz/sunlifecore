$(function () {
  var videoHref = $("a[href^='#fn_vidyard']");
  if ($(".sl-article-video-container").length || videoHref.length != 0) {
    //dynamically injecting script tag

    if ($(".sl-article-video-container").length) {
      let scriptElem = document.createElement("script");
      scriptElem.setAttribute("src", "https://play.vidyard.com/embed/v4.js");
      document.getElementsByTagName("head")[0].appendChild(scriptElem);
    }

    if (videoHref.length != 0) {
      videoHref.each(function () {
        var atr = $(this).attr("href");
        var fnc = atr.replace("#", "");
        $(this).attr("onClick", fnc);
        $(this).attr("href", "javascript:void(0);");
      });
    }
  }
});
