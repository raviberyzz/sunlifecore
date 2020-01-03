$(document).ready(function () {
    var cta_index=0;
    var comp=$('.right-navigation-wrapper').children().filter(function(){return !$(this).hasClass('yellow-horizontal-separator')});
    var child=comp.length;
    var count1=0;
    // for (var i=0; i<child; i++)
    // {
       
    //     if ($(comp[i]).hasClass('right-nav-cta-orange'))
    //     {
    //         cta_index=i+1;
    //     }
    // }
    comp.each(function()
    {
        count1++;
        if ($(this).hasClass('right-nav-cta-orange'))
        {
            
         cta_index=count1;
        }
    });
    if (cta_index==0)
    {
        right_nav_width(child);
        maxheight(child);
    }
    else if (cta_index==1)
    {
       var child2=child-1;
       right_nav_width(child2);
       maxheight(child2)
       firstfull();
      
    }
    else
    { 
        var childbefore= cta_index-1;
        right_nav_width(childbefore);
        maxheight(childbefore);
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
        // comp.each(function(){$( this ).addClass( "col-xs-12 col-sm-6 col-md-12" )});
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
    function maxheight( child1)
    {

        if (( $(window).width() <1025 &&  $(window).width() >767 )) {
                    var maxHeight = -1;
                    if (child1 < 3)
                    {
                        comp.each(function() {
                            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                           
                          });
                          
                          //return maxHeight;
                          comp.each(function() {
                            $(this).height(maxHeight);
                          });
                    }
                    else
                    {
                        if (child1%2==0)
                        {
                            for (var i=0; i<child1/2; i++)
                            {
                                maxHeight1 = maxHeight1 > $(comp[i]).height() ? maxHeight1 : $(comp[i]).height();
                            }
                            for (var i=0; i<child1/2; i++)
                            {
                               comp[i].height(maxheight1);
                            }
                            for (var i=child1/2; i<child1; i++)
                            {
                                maxHeight2 = maxHeight2 > $(comp[i]).height() ? maxHeight2 : $(comp[i]).height();
                            }
                            for (var i=child1/2; i<child1; i++)
                            {
                               comp[i].height(maxheight2);
                            }
                        }
                        else
                        {
                            for (var i=0; i<3; i++)
                            {
                                maxHeight2 = maxHeight2 > $(comp[i]).height() ? maxHeight2 : $(comp[i]).height();
                            }
                            for (var i=0; i<3; i++)
                            {
                               comp[i].height(maxheight2);
                            }
                            for (var i=3; i<4; i++)
                            {
                                maxHeight2 = maxHeight2 > $(comp[i]).height() ? maxHeight2 : $(comp[i]).height();
                            }
                            for (var i=3; i<4; i++)
                            {
                               comp[i].height(maxheight2);
                            }
                        }
                    }
        
                    $('.right-navigation-wrapper').children().each(function() {
                      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                     
                    });
                    
                    //return maxHeight;
                    $('.right-navigation-wrapper').children().each(function() {
                      $(this).height(maxHeight);
                    });
                }
    }
 
 });
 