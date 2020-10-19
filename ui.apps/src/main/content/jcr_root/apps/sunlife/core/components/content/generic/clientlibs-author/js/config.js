var multiPurposeComponentConfig = [
    {
        "componentName": "Stock Ticker Component",
        "componentDisplayName": "Stock Ticker",
        "reactComponentName": "stock-ticker",
        "props" : [
            {
                name: "stockTickerType",
                label: "Stock Ticker Type (yellow or grey)",
                value: "yellow",
                required: true
            },
            {
                name: "iconName",
                label: "Icon Name",
                value: "fa-bar-chart",
                required: true
            },
            {
                name: "stockTickerHeadingText",
                label: "Heading Text",
                value: "",
                required: true
            },
            {
                name: "viewAllLink",
                label: "View All Link",
                value: "/en/investors/share-performance/share-charts/",
                required: true
            },
            {
                name: "viewAllText",
                label: "View All Text",
                value: "",
                required: true
            },
            {
                name: "dataDelayedText",
                label: "Data Delayed Text",
                value: "Data delayed by 15 minutes",
                required: true
            },
            {
                name: "disclaimerText",
                label: "Disclaimer Text",
                value: "",
                required: true
            },
            {
                name: "disclaimerLink",
                label: "Disclaimer Link",
                value: "/content/dam/sunlife/legacy/assets/com/Global/files/html/stockDisclaimer.html",
                required: true
            },
            {
                name: "analyticsId",
                label: "Analytics ID",
                value: "hp investor",
                required: true
            }
        ]
    },
	{
		"componentName": "News tiles component",
        "componentDisplayName": "News tiles component",
        "reactComponentName": "news-tiles",
        "props" : [
            {
                name: "newsToolBar",
                label: "newsToolBar",
                value: "true",
                required: true
            },
			{
                name: "newsListContainer",
                label: "newsListContainer",
                value: "true",
                required: true
            },
			{
                name: "toolbarLeftText",
                label: "toolbarLeftText",
                value: "News",
                required: true
            },
			{
                name: "moreText",
                label: "moreText",
                value: "More",
                required: true
            },
			{
                name: "toolbarRightText",
                label: "toolbarRightText",
                value: "Preferences",
                required: true
            },
			{
                name: "preferenceModalHeading",
                label: "preferenceModalHeading",
                value: "Your Preferences",
                required: true
            },
			{
                name: "selectAllText",
                label: "selectAllText",
                value: "Select all",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn1",
                label: "preferenceModalHeadingbtn1",
                value: "Apply",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn2",
                label: "preferenceModalHeadingbtn2",
                value: "Clear all",
                required: true
            },
			{
                name: "iconName",
                label: "iconName",
                value: "fa-sliders",
                required: true
            },
			{
                name: "moreNewsText",
                label: "moreNewsText",
                value: "More news",
                required: true
            },
			{
                name: "moreNewsImg",
                label: "moreNewsImg",
                value: "",
                required: true
            },
			{
                name: "moreNewsLink",
                label: "moreNewsLink",
                value: "",
                required: true
            },
			{
                name: "workdayText",
                label: "workdayText",
                value: "Find information on all your core HR processes and latest Workday announcements",
                required: true
            },
			{
                name: "workdayLinkText",
                label: "workdayLinkText",
                value: "Go to Workday",
                required: true
            },
			{
                name: "workdayLink",
                label: "workdayLink",
                value: "",
                required: true
            },
			{
                name: "workdayImg",
                label: "workdayImg",
                value: "",
                required: true
            },
			{
                name: "workplaceText",
                label: "workplaceText",
                value: "Connect and collaborate with your colleagues across the globe",
                required: true
            },
			{
                name: "workplaceLinkText",
                label: "workplaceLinkText",
                value: "Go to Workplace",
                required: true
            },
			{
                name: "workplaceImg",
                label: "workplaceImg",
                value: "",
                required: true
            }
		]	
	},
	{
		"componentName": "News listing",
        "componentDisplayName": "News listing",
        "reactComponentName": "news-tabs",
        "props" : [
            {
                name: "newsToolBar",
                label: "newsToolBar",
                value: "true",
                required: true
            },
			{
                name: "newsTabsContainer",
                label: "newsTabsContainer",
                value: "true",
                required: true
            },
			{
                name: "toolbarLeftText",
                label: "toolbarLeftText",
                value: "News",
                required: true
            },
			{
                name: "toolbarRightText",
                label: "toolbarRightText",
                value: "Preferences",
                required: true
            },
			{
                name: "preferenceModalHeading",
                label: "preferenceModalHeading",
                value: "Your Preferences",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn1",
                label: "preferenceModalHeadingbtn1",
                value: "Apply",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn2",
                label: "preferenceModalHeadingbtn2",
                value: "Clear all",
                required: true
            },
			{
                name: "iconName",
                label: "iconName",
                value: "fa-sliders",
                required: true
            }
		]	
	},{
		"componentName": "Stock Information",
        "componentDisplayName": "Stock Information",
        "reactComponentName": "stock-information",
        "props" : [
            {
                name: "stockInformationHeadingText",
                label: "Heading Text",
                value: "",
                required: true
            }
		]	
    },
    {
        "componentName": "Dynamic Form Component",
        "componentDisplayName": "Dynamic Form",
        "reactComponentName": "dynamic-form",
        "props": [
            {
                name: "form",
                label: "Form",
                value: "true",
                required: true
            },
            {
                name: "primaryPath",
                label: "Primary Path",
                value: "",
                required: true
            },
            {
                name: "secondaryPath",
                label: "Secondary Path",
                value: "",
                required: false
            },
            {
                name: "apiURL",
                label: "API URL",
                value: "",
                required: true
            }
        ]
    }
	/*,{
		"componentName": "Article Rating",
        "componentDisplayName": "Article Rating",
        "reactComponentName": "article-ratings",
        "props" : [
            {
                name: "showRating",
                label: "showRating",
                value: "true",
                required: true
            }
		]	
	},{
		"componentName": "Article Comment",
        "componentDisplayName": "Article Comment",
        "reactComponentName": "article-comments",
        "props" : [
            {
                name: "showComment",
                label: "showComment",
                value: "true",
                required: true
            }
		]	
	}*/
];