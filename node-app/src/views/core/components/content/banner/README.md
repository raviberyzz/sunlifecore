#Banner Component
#Displays types of banners
JSON Format
```
{
    "button-class": "primary-blue-button",
    "button-text": "Start Planning",
    "button-type": "button",
    "img-src": "https://www.sunlife.ca/static/ca/Tools%20and%20Resources/banner-tools-resources-desktop.jpg",
    "is-mobile-src": "not-mobile-image",
    "banner-box-color": "white-box",
    "banner-box-shadow": "",
    "banner-box-alignment": "vertical-middle-align",
    "box-position": "left-align",
    "text-alignment": "text-center",
    "box-type": "white-box-parent"
}
```
<!-- banner-box classes available: white-box, transparent-box -->
<!-- When "banner-box-color": "transparent-box" then  "box-type": "transparent-box-parent"
     AND
     When "banner-box-color": "white-box" then  "box-type": "white-box-parent"
-->
<!-- box-type available: white-box-parent, transparent-box-parent-->
<!-- banner-box-shadow : if required use class "banner-box-shadow"  else keep it blank-->
<!-- banner-box-alignment available: bottom-align, vertical-middle-align-->
<!-- box-position available: right-align, left-align, horizontal-middle-align -->
<!-- text-alignment available: text-center, text-right, text-left-->
<!-- if "img-src" is src for desktop image only and no separate image is available for mobile, mark "is-mobile-src": "not-mobile-image". else keep it blank.
 -->

<!-- home page URL : /static/ca/M19-NationalCampaign-LifeMomentsLandingPage-1064x400.jpg -->