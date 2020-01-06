$(document).ready(function () {
    var maxHeight1=0;
    var maxHeight2=0;
    var cta_index=0;
    var j=0;
    var comp=$('.right-navigation-wrapper').children().filter(function(){return !$(this).hasClass('yellow-horizontal-separator')});
    setTimeout(comp2,200);
    function comp2(){
    var comp2=$('.right-navigation-wrapper').children().filter(function(){return !$(this).hasClass('col-sm-12')});
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
       
        if (child==1)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12" )});
    }
    if (child==2)
    {
        
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-6 col-md-12" )});
    }
    if (child==3)
    {
        
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-4 col-md-12" )});
    }
    if (child==4)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-6 col-md-12" )});
    }
    if (child==5)
    {
        for (var i=0; i<3; i++)
        {
            $(comp[i]).addClass('col-xs-12 col-sm-4 col-md-12');

        }
        for (var i=3; i<=4; i++)
        {
            $(comp[i]).addClass('col-xs-12 col-sm-6 col-md-12');
        }
    }
    if (child==6)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-4 col-md-12" )});
    }
        
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
                comp.each(function() {
                    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                });
                comp.each(function() {
                    $(this).height(maxHeight);
                });
            }
            else
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
 