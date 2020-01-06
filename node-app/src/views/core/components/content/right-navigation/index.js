$(document).ready(function () {
    var children1=$('.right-navigation-wrapper').children().length;
    var children2=$('.right-navigation-wrapper').children(".yellow-horizontal-separator").length;
    var children=children1-children2;
    if (( $(window).width() <1025 &&  $(window).width() >767 )){
        rightNav();
        // var mH=maxHeight();
        // alert(mH);
    }
    var child=comp.length;
    var count1=0;
    comp.each(function()
    {
        count1++;
        if ($(this).hasClass('right-nav-cta-orange'))
        {
            
         cta_index=count1;
        }
    });
    var childbefore= cta_index-1;
    //alert (childbefore);
    if (cta_index==0)
    {
        right_nav_width(child);
    }
    else if (cta_index==1)
    {
       var child2=child-1;
       right_nav_width(child2);
       firstfull();
      
    }
    else
    { 
       
        right_nav_width(childbefore);
        var childafter=child-childbefore;
        for (var i=cta_index-1; i<child; i++)
        {
            $(comp[i]).removeClass('col-sm-6 col-sm-4').addClass('col-sm-12');
        }       
    }

    function right_nav_width(child) 
    {
       
        maxHeight();
    
    
     };
       function rightNav(){

        
    }
    function firstfull(){
        $('.right-nav-cta-orange').removeClass('col-sm-6 col-sm-4').addClass('col-sm-12');
    }
    if (( $(window).width() <1025 &&  $(window).width() >767 ))
    {
        maxheight(childbefore, cta_index);
    }
    function maxheight(child, cta_index)
    {
        
        if (cta_index==0)
        {
            getMaxHeight(child)
            
        }
        else if (cta_index>1)
        {
            height1=height2=0;
            comp.each(function(index){

                if (index+1 < cta_index)
                {
                    getMaxHeight(child);
                }
                
            });
        }
    }
    function getMaxHeight(child)
    {
        alert(child);
        var maxHeight=0;
        var height1=0;
        var height2=0;
        if (child < 4)
            {
                $('.right-navigation-wrapper').children().css('width','100%');
            }
           
            if (children==2){
                $('.right-navigation-wrapper').children().css('width','50%');
               }
               if(children==3)
               {
                $('.right-navigation-wrapper').children().css('width','33.33%');
               }
        if(children==4)
            {
                if (child==5)
                {
                    
                    var row1=$('.right-navigation-wrapper').children().filter(function(){return $(this).hasClass('col-sm-4')});
                    var row2=$('.right-navigation-wrapper').children().filter(function(){return $(this).hasClass('col-sm-6')});
                    height1=height2=0;
                    row1.each(function() {
                        height1 =height1 > $(this).height() ? height1 : $(this).height();
                    });
                    row1.each(function() {
                        $(this).height(height1+30);
                    });
                    row2.each(function() {
                        height2 = height2 > $(this).height() ? height2 : $(this).height();
                      alert(height2);
                    });
                    row2.each(function() {
                        $(this).height(height2);
                    });

                }
                else
                {
                    var row1_child=child/2;
                    height1=height2=0;
                    comp.each(function(index) {
                        if (index < row1_child)
                        {
                           
                            height1 = height1 > $(this).height() ? height1 : $(this).height();
                            
                        }
                        else
                        {
                            height2 = height2 > $(this).height() ? height2 : $(this).height();
                        }
                        
                    });
                    comp.each(function(index) {
                       
                        if (index < row1_child)
                        {
                            $(this).height(height1+30);
                        }
                        else
                        {
                            $(this).height(height1);
                        }
                       
                    });

                }
            }
    }
    
    
 
 });
 