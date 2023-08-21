//Version 2.0 - 2016.03.51
var iconMarkerCorporate;
var iconMarkerStandard;
var exists = false;
var advisorInfo;

if(typeof(iconMarkerCorporateVal) != 'undefined') {
	iconMarkerCorporate = iconMarkerCorporateVal;
}
if(typeof(iconMarkerStandardVal) != 'undefined') {
	iconMarkerStandard = iconMarkerStandardVal;
}
if(typeof(advisorInfoMap) != 'undefined') {
    advisorInfo = advisorInfoMap.map;
}
if(typeof(advisorInfo) !== 'undefined'){
	exists = true;
}
$(document).ready(function () {
    //Get page language
    if($('.row-advisor').length){
        var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en' ; 
        var loadMap = false;
        var pageLabelData = {
		'en': {	
			'phone' : 'Phone:',
			'cell': 'Cell:',
			'moreinfo' : 'More Info',
			'email': 'Email:'
			},
		'fr': {	
			'phone' : 'Téléphone :',
			'cell': 'Cellulaire :',
			'moreinfo' : 'Plus d’infos',
			'email': 'Courriel :'
			}
	     };
        //rssFeed();	
        if(exists){
        //setupAdvisorBio();
        //setupAdvCookie();
    
        //Google large map link event
        $("#largeGoogleMap").on("click", function(e){
            window.open('//maps.google.com/maps?q=@' + advisorInfo.lat + ',' + advisorInfo.lng + '&hl='+ lang +'&z=14&f=q',null,'width=900,height=600,left=50,top=50,scrollbars=yes,resizable=yes');
            e.preventDefault();
        });
    
        //Init Google map
         var initMap = function (){
            //Set google map option
            var mapOptions = {
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_TOP
                }    
            };	
            //Create a map
            var map = new google.maps.Map(document.getElementById('GoogleMapDiv'), mapOptions);
    
            //Use lat & lng
            if (advisorInfo.lat != "" && advisorInfo.lng != "" && advisorInfo.lat != "0" && advisorInfo.lng != "0"){	
                createMaker( map );
            }
            //Use Geoorder
            else {
                getGeocoder( map);
            }
        }
    
        //Create Marker 
        function createMaker(map){
            var pos = new google.maps.LatLng(advisorInfo.lat, advisorInfo.lng);
            map.setCenter(pos);
            map.setZoom(14);	 
            
            var advIcon = advisorInfo.type == "ADVISOR" ? iconMarkerStandard : iconMarkerCorporate;
            
            var marker = new google.maps.Marker({position: pos, map :map, icon: advIcon });
            marker.infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'mouseover', function(e) {
               // If we can extract a map from the info window,
               // it's already open.  So, no need to re-open it.
               var infomap = marker.infowindow.getMap();
               if( infomap == null || typeof infomap == "undefined" ){
                var advname = cleanString(advisorInfo.name)  ;
                var addressFormated = cleanString(advisorInfo.address) ;
        
                var mapHtml = "<b>" + advname + "</b><br/>" + addressFormated + "<br/>" ;
                if( undefined!=advisorInfo.phone && advisorInfo.phone!=""){
                    mapHtml = mapHtml + pageLabelData[lang]['phone'] + " " + advisorInfo.phone ;
    
                }
                if( undefined!=advisorInfo.cell && advisorInfo.cell!=""){
                    mapHtml = mapHtml + " | "  + pageLabelData[lang]['cell'] + " " + advisorInfo.cell ;
                }
    
                if( undefined!=advisorInfo.email && advisorInfo.email!=""){
                    mapHtml = mapHtml + "<br/>" + pageLabelData[lang]['email'] +  " " + "<a href='mailto:"+advisorInfo.email+ "'>" +advisorInfo.email+ "</a>";
                }
               marker.infowindow.setContent(mapHtml);
               marker.infowindow.open(map, this);
               }
               });	
        }
        
        function cleanString(input){
            var output = "";
            output = input.replace("\\u00e8","Ã¨").replace("\\u00E8","Ã¨").replace("\\u00e0","Ã ").replace("\\u00e2","Ã¢").replace("\\u00e4","Ã¤").replace("\\u00e7","Ã§").replace("\\u00e9","Ã©").replace("\\u00E9","Ã©").replace("\\u00ea","Ãª").replace("\\u00eb","Ã«").replace("\\u00ee","Ã®").replace("\\u00ef","Ã¯").replace("\\u00f4","Ã´").replace("\\u00f6","Ã¶").replace("\\u00f9","Ã¹").replace("\\u00fb","Ã»").replace("\\u00fc","Ã¼").replace("\\u00AE","Â®").replace("\\u00F4","Ã´");
            
            return output ;
        }
    
        //Geocorder - from address
        function getGeocoder(map){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': advisorInfo.address}, function(results, status) {    
                if (status == google.maps.GeocoderStatus.OK) {
                    //Set the lat / lng
                    advisorInfo.lat = results[0].geometry.location.lat();
                    advisorInfo.lng = results[0].geometry.location.lng();
                    createMaker( map );
                }
                else {
                    //Default location
                    advisorInfo.lat = 57;
                    advisorInfo.lng = -105;
                    createMaker( map );
                }
            });
        }
        }
        //Google map accordion event
        $('#map-title').on("click", function(){
            var asset_title = "hide map";
            if($(this).attr('aria-expanded') == "false"){
                if ( loadMap == false ){
                    googleMapApiInit();
                }
                asset_title = "show map";
            }
            utag.link({
                "asset_type"	: "accordion",
                "asset_title"	: asset_title,
                "event_type"	: "Click",
                "event_title"	: "page interaction",
                "page_section"  : "map"});        
        });
        //Load Google map JS
        function googleMapApiInit() {
            var googleLangs = ["en", "fr"];
            if (!jQuery.inArray(lang, googleLangs)) {
                lang = 'en';
            }
    
            //Load Google api with language
            google.load('maps', '3.x', {
                'other_params': 'client=gme-sunlife&libraries=geometry&language=' + lang,
                'callback': initMap
            });
            loadMap = true;
        }
    
        
    // Setup Advisor Details
    function setupAdvisorBio() {
        var maxChars = 300;
        $('.row-advisor-desc-bio').each(function() {
            var bio = $(this).text();
            if( bio.length > maxChars ) {
                var shortBio = bio.substring(0, maxChars);
                var fullBio = bio.substring(maxChars);
                // If the last char is a space character, we're done.
                for( var x = shortBio.length-1; shortBio[x] !== ' ' && x >= 0; x-- ) {
                    fullBio = shortBio[x] + fullBio;
                    shortBio = shortBio.substring(0, shortBio.length-1);
                }
                // Create More Info button
                var btn = '<a href="#" data-toggle="row-advisor-desc-bio-full" class="row-advisor-desc-bio-toggle">'+pageLabelData[lang]['moreinfo']+'</a>';
                fullBio = '<span class="row-advisor-desc-bio-full">' + fullBio + '</span>';
                $(this).html(shortBio+fullBio+btn);
                // Setup the event handler for the More Info button
                $(this).find('.row-advisor-desc-bio-toggle').on('click', function(e) {
                    e.preventDefault();
                    $(this).siblings($('.'+$(this).data('toggle'))).toggleClass('js-enable');
                    $(this).remove();
                });
            }
        });
    }	
    }
	var helpfulLinksVar = document.getElementById("advisor-helpful-links-div");
	if( helpfulLinksVar ) {
		$( "div#helpful-links-right" ).replaceWith( $( "div#advisor-helpful-links-div" ) );
	}	
    }
);