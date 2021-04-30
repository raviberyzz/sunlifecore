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
        var value = $(this).children("option:selected").val();
        if(value.indexOf("/content/dam/") == -1){
          if(value.indexOf("/en/") > -1 || value.indexOf("/fr/") > -1){
            $(this).parents("form").attr("method", "GET");
          }
          else{
            $(this).parents("form").attr("method", "POST");
          }
        }
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