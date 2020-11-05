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
                label: "News Tool Bar?",
                value: "true",
                required: true
            },
			{
                name: "newsListContainer",
                label: "News List Container?",
                value: "true",
                required: true
            },
			{
                name: "toolbarLeftText",
                label: "Tool Bar Left Text",
                value: "News",
                required: true
            },
			{
                name: "moreText",
                label: "More Text",
                value: "More",
                required: true
            },
			{
                name: "toolbarRightText",
                label: "Tool Bar Right Text",
                value: "Preferences",
                required: true
            },
			{
                name: "preferenceModalHeading",
                label: "Preference Modal Heading",
                value: "Your Preferences",
                required: true
            },
			{
                name: "selectAllText",
                label: "Select All Text",
                value: "Select all",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn1",
                label: "Preference Modal Heading Button (Apply)",
                value: "Apply",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn2",
                label: "Preference Modal Heading Button (Clear all)",
                value: "Clear all",
                required: true
            },
			{
                name: "iconName",
                label: "Icon Name",
                value: "fa-sliders",
                required: true
            },
			{
                name: "genericImage",
                label: "Generic Image",
                value: "",
                required: true
            },
			{
                name: "moreNewsText",
                label: "More News Text",
                value: "More news",
                required: true
            },
			{
                name: "moreNewsImg",
                label: "More News Image",
                value: "",
                required: true
            },
			{
                name: "moreNewsLink",
                label: "More News Link",
                value: "",
                required: true
            },
			{
                name: "workdayText",
                label: "Workday Text",
                value: "Find information on all your core HR processes and latest Workday announcements",
                required: true
            },
			{
                name: "workdayLinkText",
                label: "Workday Link Text",
                value: "Go to Workday",
                required: true
            },
			{
                name: "workdayLink",
                label: "Workday Link",
                value: "",
                required: true
            },
			{
                name: "workdayImg",
                label: "Workday Image",
                value: "",
                required: true
            },
			{
                name: "workplaceText",
                label: "Workplace Text",
                value: "Connect and collaborate with your colleagues across the globe",
                required: true
            },
			{
                name: "workplaceLinkText",
                label: "Workplace Link Text",
                value: "Go to Workplace",
                required: true
            },
			{
                name: "workplaceLink",
                label: "Workplace Link",
                value: "",
                required: true
            },
			{
                name: "workplaceImg",
                label: "Workplace Image",
                value: "",
                required: true
            },
			{
                name: "resourcePath",
                label: "Resource path",
                value: "/content/sunlife/internal/source/en/jcr:content/root/layout_container/container1/generic",
                required: true
            },
			{
                name: "getPrefernceListUrl",
                label: "Preferences URL",
                value: "/content/cq:tags/sunlife/source.tags",
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
                label: "News Tool Bar?",
                value: "true",
                required: true
            },
			{
                name: "newsTabsContainer",
                label: "News Tabs Container?",
                value: "true",
                required: true
            },
			{
                name: "toolbarLeftText",
                label: "Tool Bar Left Text (News)",
                value: "News",
                required: true
            },
			{
                name: "moreText",
                label: "More Text",
                value: "More",
                required: true
            },
			{
                name: "toolbarRightText",
                label: "Tool Bar Right Text (Preferences)",
                value: "Preferences",
                required: true
            },
			{
                name: "selectAllText",
                label: "Select All Text",
                value: "Select all",
                required: true
            },
			{
                name: "preferenceModalHeading",
                label: "Preference Modal Heading (Your preferences)",
                value: "Your Preferences",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn1",
                label: "Preference Modal Heading (Apply)",
                value: "Apply",
                required: true
            },
			{
                name: "preferenceModalHeadingbtn2",
                label: "Preference Modal Heading (Clear All)",
                value: "Clear all",
                required: true
            },
			{
                name: "iconName",
                label: "Icon Name",
                value: "fa-sliders",
                required: true
            },
			{
                name: "resourcePath",
                label: "Resource path",
                value: "/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/layout_container/container1/generic",
                required: true
            },
			{
                name: "getPrefernceListUrl",
                label: "Preferences URL",
                value: "/content/cq:tags/sunlife/source",
                required: true
            },
			{
                name: "previousText",
                label: "Previous Text",
                value: "Previous",
                required: true
            },
			{
                name: "nextText",
                label: "Next Text",
                value: "Next",
                required: true
            },
			{
                name: "pageText",
                label: "Page Text",
                value: "Page",
                required: true
            },
			{
                name: "ofText",
                label: "Of Text",
                value: "of",
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
];