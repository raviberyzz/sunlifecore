var multiPurposeComponentConfig = [
    {
        "componentName": "Stock Ticker Component",
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
    }
];