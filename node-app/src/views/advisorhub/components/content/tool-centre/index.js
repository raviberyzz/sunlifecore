$(document).ready(function(){
  $("select").each(function(){
    if($(this).attr("data-title").indexOf("AdvisorHub-")==0){
      $(this).change(function(){
        var title=$(this).children("option:selected").text();
        var titleArray = title.split(" ");
        title="";
        for(var i=0;i<titleArray.length;i++){
          title=title+titleArray[i];
        }
        title = "AdvisorHub-"+title;
        $(this).attr("data-title", title);
        $(this).parents("form").attr("target", title);
      })
    }
  })

  $("a").each(function(){
    if($(this).attr("data-title")!=undefined){
        if($(this).attr("data-title").indexOf("AdvisorHub-")>-1){
            $(this).attr("target", $(this).attr("data-title"));
        }
    }
  })
});