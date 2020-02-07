$(document).ready(function () {
    var comp=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return !$(this).hasClass('yellow-horizontal-separator')});
    var child=comp.length;
    var count1=0;
    var cta_index=0;
    comp.each(function()
    {
        count1++;
        if ($(this).hasClass('right-nav-cta'))
        {  
         cta_index=count1;
        }
    });
    

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
        var childbefore= cta_index-1;
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
        if (cta_index==1)
        {
            for (var i=1; i<4; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-4 col-md-12');
            }
            for (var i=4; i<=5; i++)
            {
                $(comp[i]).addClass('col-xs-12 col-sm-6 col-md-12');
            }
        }
        else
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
        
    }
    if (child==6)
    {
        comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-4 col-md-12" )});
    }
        
    }
    function firstfull(){
        $('.right-nav-cta').removeClass('col-sm-6 col-sm-4').addClass('col-sm-12');
    }
    setTimeout( function() {
        maxheight(child, cta_index);
    }, 200 );
    $( window ).resize(function() {
        maxheight(child, cta_index);
    });
    
    //height Function//

    function maxheight(child)
    {
        if (cta_index==0)
        {
           
            getMaxWidth(child);
        }
        else if(cta_index==1)
        {
            getMaxWidth(child-1);
        }
        else
        {
            getMaxWidth(cta_index-1);
        }
        
    }

    function getMaxWidth(child)
    {
        var maxHeight=0;
        var height1=0;
        var height2=0;
        if (( $(window).width() <1025 &&  $(window).width() >767 ))
        {
           
            
            if (child < 4)
            {
               
                comp.each(function(index) {
                    if (cta_index>0)
                    {
                        if (index < cta_index-1)
                        {
                            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                        }
                    }
                    else
                    {
                        if (index > cta_index-1)
                        {
                            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                        }
                    }
                    
                    
                });
                comp.each(function(index) {
                    if (cta_index > 0)
                    {
                        if (index < cta_index-1)
                        {
                            $(this).height(maxHeight);
                            
                        }
                    }
                    else
                    {
                        if (index > cta_index-1)
                        {
                            $(this).height(maxHeight);
                            
                        }
                    }
                   
                    
                });
            }
            else
            {
                if (child==5)
                {
                    height1=height2=0;
                    var row1=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-4')});
                    var row2=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-6')});
                    row1.each(function(index) {
                        
                     height1 =height1 > $(this).height() ? height1 : $(this).height();
                            
                    });
                    row1.each(function(index) {
                           $(this).height(height1);
                           
                           
                    });
                    row2.each(function(index) {
                            var abc = $(this).height();
                            height2 = height2 > $(this).height() ? height2 : $(this).height();
                    });
                   
                    row2.each(function(index) {
                        $(this).height(height2);
                           
                           
                    });
                }
                else
                {
                    var row1_child=child/2;
                    var row1=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-4')});
                    var row2=$('.right-navigation-wrapper .cmp-container').children().filter(function(){return $(this).hasClass('col-sm-6')});
                    height1=height2=0;
                    row1.each(function(index) {
                        if (index < row1_child)
                        {
                            
                             height1 = height1 > $(this).height() ? height1 : $(this).height();
                            
                        }
                        else
                        {
                             height2 = height2 > $(this).height() ? height2 : $(this).height();
                        }
                        
                    });
                    row1.each(function(index) {
                        if (index < row1_child)
                        {
                            $(this).height(height1+30);
                        }
                        else
                        {
                            $(this).height(height2+30);
                        }
                       
                    });
                    row2.each(function(index) {
                        if (index < row1_child)
                        {
                            
                             height1 = height1 > $(this).height() ? height1 : $(this).height();
                            
                        }
                        else
                        {
                             height2 = height2 > $(this).height() ? height2 : $(this).height();
                        }
                        
                    });
                    row2.each(function(index) {
                        if (index < row1_child)
                        {
                            $(this).height(height1 );
                        }
                        else
                        {
                            $(this).height(height2 );
                        }
                       
                    });
    
                }
            }
        }
        else
        {
            comp.each(function() {
                    $(this).css("height","auto");

            });
        }
    }

    //For legal text Height
    $('.right-navigation-wrapper form .legal-text').parent().css({'text-size':'14px','line-height':'18px'});
     
 });
 