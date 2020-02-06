// $(document).ready(function(){
//       var popHeight=$(window).height();
//       $(".subscribe-popup-wrapper").height(popHeight);
//     popUpWidth();   
//     function popUpWidth(){
//         var popWidth=$(window).width();
//         $(".subscribe-popup-wrapper").width(popWidth);
//       };
//       $(window).resize(function() {
//             popUpWidth();
//       });
//       //$("#subscribe").modal({show:true});
//       $(window).scroll(function() {
// 		if($(window).scrollTop() + $(window).height() >= $(document).height()/2) {
// 			$("#subscribe").modal({show:true});
// 			if (getCookie('subscribecookie') == "") {
// 				//var url = new URL(window.location.href);
// 				//var wtmcid = url.searchParams.get("WT.mc_id");
// 				var wtmcid = getQuerystring("WT.mc_id");
// 				if ( (wtmcid != null) && (wtmcid.indexOf("Direct:Newsletter") > -1) ) {
// 					//setCookie('subscribecookie', 'displayed', 180);
// 					createCookie('subscribecookie', 'displayed', 180, false)
// 				} else {
// 					alert("hii");
// 					if($("#subscribe").length==1){
// 						$("#subscribe").modal({show:true});
// 						//setCookie('subscribecookie', 'displayed', 0);
// 						// check for IE11: session cookies disabled by default, so for IE, set expiry for 1 day
// 						if (navigator.userAgent.indexOf("MSIE") > 0) {
// 							createCookie('subscribecookie', 'displayed', 1, false)
// 						} else {
// 							createCookie('subscribecookie', 'displayed', -1, true)
// 						}
//  					}
// 				}
// 			}
// 		}
// 	});
// });