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
        maxheight(child,0,0);
    }
    else if (cta_index==1)
    {
       var child2=child-1;
       right_nav_width(child2);
       maxheight(child2,0,0);
       firstfull();
      
    }
    else
    { 
        var childbefore= cta_index-1;
        right_nav_width(childbefore);
        maxheight(childbefore,0,0);
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
    function maxheight( child1,maxHeight1,maxHeight2)
    {

        if (( $(window).width() <1025 &&  $(window).width() >767 )) {
                    var maxHeight = -1;
                    if (child1 < 4)
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
                        if (child1%2==0)
                        {
                            i=0;
                            i1=0;
                            j=(child1/2);
                            j1=(child1/2);
                            comp.each(function() {
                                if (i <(child1/2)) {
                                    maxHeight1 = maxHeight1 > $(comp[i]).height() ? maxHeight1 : $(comp[i]).height();
                                    i++;
                                }
                                
                            });
                            comp.each(function() {
                                if (i1 <(child1/2)) {
                                $(comp[i1]).height(maxHeight1);
                                i1++;
                                }
                            });
                            comp.each(function() {                               
                                if (j <child1) {
                                maxHeight2 = maxHeight2 > $(comp[j]).height() ? maxHeight2 : $(comp[j]).height();
                                j++;
                                }
                            });
                            comp.each(function() {
                                if (j1 <child1) {
                                $(comp[j1]).height(maxHeight2);
                                j1++;
                                }
                            });
                         }
                        else
                        {
                            i=0;
                            i1=0;
                            j=3;
                            j1=3;
                            comp.each(function() {
                                if (i <3) {
                                    maxHeight1 = maxHeight1 > $(comp[i]).height() ? maxHeight1 : $(comp[i]).height();
                                    i++;
                                }
                                
                            });
                            comp.each(function() {
                                if (i1 <3) {
                                $(comp[i1]).height(maxHeight1);
                                i1++;
                                }
                            });
                            comp.each(function() {                               
                                if (j <5) {
                                maxHeight2 = maxHeight2 > $(comp[j]).height() ? maxHeight2 : $(comp[j]).height();
                                j++;
                                }
                            });
                            comp.each(function() {
                                if (j1 <5) {
                                $(comp[j1]).height(maxHeight2);
                                j1++;
                                }
                            });
                        }
                    }
                }
    }
 
 });
 