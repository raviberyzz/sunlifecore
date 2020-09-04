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
            }
		]	
	}
];