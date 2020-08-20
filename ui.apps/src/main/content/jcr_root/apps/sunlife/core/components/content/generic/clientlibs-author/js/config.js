var multiPurposeComponentConfig = [
    {
        "componentName": "Stock Ticker Component",
        "reactComponentName": "react-demo",
        "props" : [
            {
                name: "stockTickerType",
                label: "Stock Ticker Type",
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
                label: "",
                value: "Stock Ticker Heading Text",
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
                value: "View All",
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
                value: "disclaimer",
                required: true
            },
            {
                name: "disclaimerLink",
                label: "Disclaimer Link",
                value: "/content/dam/sunlife/legacy/assets/com/Global/files/html/stockDisclaimer.html",
                required: true
            }
        ]
    },{
        "componentName": "Stock Ticker Component 2",
        "reactComponentName": "StockTickerComponent2",
        "props" : [
            {
                name: "prop1",
                label: "Heading Text",
                type: "text"
            },
            {
                name: "prop2",
                label: "Heading Text 2",
                type: "text"
            }
        ]
    }
];