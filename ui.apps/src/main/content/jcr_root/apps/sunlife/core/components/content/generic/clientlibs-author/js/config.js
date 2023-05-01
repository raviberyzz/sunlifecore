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
                name: "moreNewsHeadingText",
                label: "More News Heading Text",
                value: "",
                required: true
            },
			{
                name: "moreNewsButtonText",
                label: "More News Button Text",
                value: "View more news",
                required: true
            },

			{
                name: "moreNewsButtonLink",
                label: "More News Button Link",
                value: "",
                required: true
            },
			{
                name: "moreNewsAnalyticsID",
                label: "More News Analytics ID",
                value: ""
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
                name: "workdayDataTitle",
                label: "Workday Link Data Title",
                value: ""
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
                name: "workplaceDataTitle",
                label: "Workplace Link Data Title",
                value: ""
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
                value: "/content/cq:tags/sunlife/source",
                required: true
            },
			{
                name: "loading",
                label: "Loading",
                value: "Loading...",
                required: true
            },
			{
                name: "loadingText",
                label: "Loading Text",
                value: "One moment please",
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
            },
			{
                name: "loading",
                label: "Loading",
                value: "Loading...",
                required: true
            },
			{
                name: "loadingText",
                label: "Loading Text",
                value: "One moment please",
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
    },
    {
        "componentName": "Forms Listing Component",
        "componentDisplayName": "Forms Listing",
        "reactComponentName": "new-form-experience",
        "props": [
            {
            	name: "tableRowsDataUrl",
                label: "Resource path",
                value: "/content/sunlife/external/advisorhub/en/form-page/jcr:content/root/layout_container/container1/generic",
                required: true
            },
            {
            	name: "filtersDataUrl",
                label: "Filter URL",
                value: "/content/cq:tags/sunlife/advisorhub",
                required: true
            },
            {
            	name: "tableHeaderCol1",
                label: "Table header col1L",
                value: "Number",
                required: true
            },
            {
            	name: "tableHeaderCol2",
                label: "Table header col2",
                value: "Name/Info",
                required: true
            },
            {
            	name: "tableHeaderCol3",
                label: "Table header col3",
                value: "Last Updated",
                required: true
            },
            {
            	name: "tableHeaderCol4",
                label: "Table header col4",
                value: "E-Sign",
                required: true
            },
            {
            	name: "tableHeaderCol5",
                label: "Table header col5",
                value: "Favorite",
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
                value: "Next Text",
                required: true
            },
            {
            	name: "pageText",
                label: "Page Text",
                value: "Page Text",
                required: true
            },
            {
            	name: "ofText",
                label: "Of Text",
                value: "Of Text",
                required: true
            },
            {
            	name: "searchText",
                label: "Search Text",
                value: "Search Text",
                required: true
            },
            {
            	name: "loading",
                label: "Loading",
                value: "Loading",
                required: true
            },
            {
            	name: "loadingText",
                label: "Loading Text",
                value: "Loading Text",
                required: true
            },
            {
            	name: "addFilterText",
                label: "Add Filter",
                value: "Add Filter",
                required: true
            },
            {
            	name: "filterDoneText",
                label: "Filter Done Text",
                value: "Done",
                required: true
            },
            {
            	name: "ClearAllText",
                label: "Clear All Text",
                value: "Clear All",
                required: true
            }
        ]
    },{
        "componentName": "Reset Password Component",
        "componentDisplayName": "Reset Password",
        "reactComponentName": "reset-password",
        "props" : [
            {
                name: "getAccessIdText",
                label: "Get Access ID Text",
                value: "<strong>To get your Access ID</strong>, call 1-800-800-4786 and select Option 6. We’re available from 8 a.m. – 8 p.m. ET.",
                required: true
            },
            {
                name: "getPasswordText",
                label: "Get Password Text",
                value: "<strong>To reset your password</strong>, enter your information below. We’ll confirm your account and email you a password link.",
                required: true
            },
            {
                name: "accessIDLabel",
                label: "Access ID Label",
                value: "Access ID",
                required: true
            },
            {
                name: "accessIDReq",
                label: "Access ID required validation message",
                value: "Enter your Access ID ",
                required: true
            },
            {
                name: "accessIDInValid",
                label: "Access ID invalid validation message",
                value: "Enter a valid Access ID ",
                required: true
            },
            {
                name: "birthDateLabel",
                label: "Date of Birth Label",
                value: "Date of birth",
                required: true
            },
            {
                name: "birthDatePlaceholder",
                label: "Date Of Birth format placeholder text",
                value: "DD/MM/YYYY",
                required: true
            },
            {
                name: "birthDateReq",
                label: "Date of Birth required validation message",
                value: "Enter your date of birth ",
                required: true
            },
            {
                name: "birthDateInValid",
                label: "Date of Birth invalid validation message",
                value: "Enter a valid date ",
                required: true
            },
            {
                name: "submitText",
                label: "Submit button text",
                value: "Submit",
                required: true
            },
            {
                name: "successHeading",
                label: "Success Heading text",
                value: "We sent your link",
                required: true
            },
            {
                name: "successText",
                label: "Sucess Text",
                value: "<p>Check your email for the password link.</p><p>Don’t see it in your inbox? Try your spam or junk mail folder.</p>",
                required: true
            },
            {
                name: "serverErrorHeading",
                label: "Server Error Heading",
                value: "Something went wrong",
                required: true
            },
            {
                name: "serverErrorText",
                label: "Server Error Text",
                value: "<p>Sorry, there was a problem on our end and we couldn’t reset your password.</p><p>Try again in a few minutes or call 1-800-800-4786 and select Option 6. We’re available Monday to Friday, 8 a.m. – 8 p.m. ET.</p>",
                required: true
            },
            {
                name: "misMatchInfoHeading",
                label: "Mismatch information heading",
                value: "Something’s not quite right",
                required: true
            },
            {
                name: "misMatchInfoText",
                label: "Mismatch information text",
                value: "<p>The Access ID and/or date of birth doesn’t match what we have on file.</p><p>Try entering your information again, or call 1-800-800-4786 and select Option 6. We’re available Monday to Friday, 8 a.m. – 8 p.m. ET.</p>",
                required: true
            },
            {
                name: "accLockedHeading",
                label: "Account Locked heading",
                value: "We’ve locked your account to protect it",
                required: true
            },
            {
                name: "accLockedText",
                label: "Account Locked text",
                value: "<p>There were too many unsuccessful attempts to reset your password. </p><p>To unlock your account, call 1-800-800-4786 and select Option 6. We’re available Monday to Friday, 8 a.m. – 8 p.m. ET.</p>",
                required: true
            },
            {
                name: "missingInfoHeading",
                label: "Mising information heading",
                value: "Something’s not quite right",
                required: true
            },
            {
                name: "missingInfoText",
                label: "Missing information text",
                value: "<p>It looks like we’re missing some information for you. </p><p>In order to proceed, call 1-800-800-4786 and select Option 6. We’re available Monday to Friday, 8 a.m. – 8 p.m. ET.</p>",
                required: true
            },
            {
                name: "homeText",
                label: "Home label",
                value: "Home",
                required: true
            },
            {
                name: "homeURL",
                label: "Home URL",
                value: "https://sit-www.sunnet.sunlife.com/slfadvisor/signin/e/CommonSignin.aspx",
                required: true
            },
            {
                name: "successIcon",
                label: "Success icon image path",
                value: "/content/dam/sunlife/legacy/assets/ExportSite/CS/InterstitialZone/Static_files/Hobby_origami_illustration.png",
                required: true
            },
            {
                name: "errorIcon",
                label: "Error icon image path",
                value: "https://sit-www.sunnet.sunlife.com/content/dam/sunlife/regional/canada/images/cxo/KH081%20SL_illustrative%20icon_RGB_Stop_Sign.png",
                required: true
            },
            {
                name: "serviceURl",
                label: "Webservice Path",
                value: " ",
                required: true
            }
        ]
    }
];