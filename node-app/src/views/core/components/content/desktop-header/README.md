#desktop-header Component
#Displays desktop-header
JSON Format
```
{
    "region-title" : "Regions",
    "language-title" : "Languages - Canada",
    "region-list" : [{
        "parent-list" : [{
        "country-link": "https://www.sunlife.com",
        "country-text": "Worldwide (sunlife.com)",
        "accordion" : false
        },{
            "LinkText": "Canada",
            "accordion" : true,
            "aria-expanded" : "true",
            "links" : "links1",
            "collapse" : "in",
            "list" : [{
                "link" : "https://www.sunlife.ca",
                "text" : "Sun Life Financial Canada",
                "selected" : "nav-select"
            },{
                "link" : "https://www.sunlifeglobalinvestments.com",
                "text" : "Sun Life Global Investments"
            },{
                "link" : "https://www.slcmanagement.com",
                "text" : "SLC Management"
            },{
                "link" : "http://www.bentallkennedy.com",
                "text" : "Bentall Kennedy Group"
            }]
        }]
    },{
        "parent-list" : [{
        "country-link": "http://www.sunlife-everbright.com",
        "country-text": "China",
        "accordion" : false
        },{
            "country-link": "http://www.sunlife.com.hk",
            "country-text": "Hong Kong, SAR",
            "accordion" : false
        },{
            "LinkText": "India",
            "accordion" : true,
            "aria-expanded" : "false",
            "links" : "links2",
            "list" : [{
                "link" : "https://lifeinsurance.adityabirlacapital.com",
                "text" : "Birla Sun Life"
            },{
                "link" : "http://www.sunlife.com/asiaservicecentre",
                "text" : "Asia Service Centres"
            }]
        },{
            "country-link": "http://www.sunlife.co.id/indonesia?vgnLocale=in_ID",
            "country-text": "Indonesia",
            "accordion" : false
        },{
            "country-link": "https://www.sunlife.com/international",
            "country-text": "International",
            "accordion" : false
        },{
            "country-link": "http://www.sunlife.ie",
            "country-text": "Ireland",
            "accordion" : false
        }]
    },{
        "parent-list" : [{
        "country-link": "http://www.sunlifemalaysia.com",
        "country-text": "Malaysia",
        "accordion" : false
        },{
            "LinkText": "Philippines",
            "accordion" : true,
            "aria-expanded" : "false",
            "links" : "links3",
            "list" : [{
                "link" : "http://www.sunlife.com.ph",
                "text" : "Sun Life Financial Philippines"
            },{
                "link" : "http://www.sunlifegrepa.com",
                "text" : "Sun Life Grepa Financial"
            },{
                "link" : "http://www.sunlife.com/asiaservicecentre",
                "text" : "Asia Service Centres"
            }]
        },{
            "country-link": "http://www.sloc.co.uk",
            "country-text": "United Kingdom",
            "accordion" : false
        },{
            "LinkText": "United States",
            "accordion" : true,
            "aria-expanded" : "false",
            "links" : "links4",
            "list" : [{
                "link" : "http://www.sunlife.com/us",
                "text" : "Sun Life Financial United States"
            },{
                "link" : "http://www.mfs.com",
                "text" : "MFS Investment Management"
            },{
                "link" : "http://www.bentallkennedy.com",
                "text" : "Bentall Kennedy Group"
            }]
        },{
            "country-link": "http://sunlife.com.vn/",
            "country-text": "Vietnam",
            "accordion" : false
        }]
    }],
    "language-list" : [{
        "text" : "English",
        "selected" : "nav-select"
    },{
        "link" : "https://www.sunlife.ca/ca?vgnLocale=fr_CA",
        "text" : "Français",
        "selected" : "not-bold"
    },{
        "link" : "https://www.sunlife.ca/ca/Welcome+to+Sun+Life+Financial?vgnLocale=en_CA",
        "text" : "欢迎访问永明金融网页 ",
        "chinese" : true,
        "selected" : "chinese",
        "separator-color" : "grey-horizontal-separator",
        "wrapper-separator":"region-separator"
    }],
    "region" : true,
    "lang-button":"language-btn-container",
    "utility-list" : [{
        "link" : "https://www.sunlife.ca/ca/Find+an+advisor?vgnLocale=en_CA",
        "text" : "Find an advisor"
    },{
        "link" : "https://www.sunlife.ca/ca/Get+a+quote?vgnLocale=en_CA",
        "text" : "Get a quote"
    },{
        "link" : "https://www.sunlife.ca/ca/Support?vgnLocale=en_CA",
        "text" : "Support"  
    }],
    "utility-nav" : true,
    "lang" : true,
    "srch" : true,
    "form-text-id":"demo-id",
    "form-text-class":"demo-class",
    "form-text-label":"demo-label",
    "place-holder" : "Search",
    "form-text-name":"demo-text",
    "text-length":" ",
    "error-message":" ",
    "validation-pattern": " ",
    "button-type":"submit",
    "button-value":"Search",
    "form-button-class":"primary-blue-button",
    "button-wrapper":"button-wrapper",
    "button-wrapper-class" : "button-float-right",
    "button-class": "signIn-button",
    "button-text": "Sign-in",
    "data-target":"#mySignInModal",
    "data-toggle":"modal",
    "id":"signin",
    "client-text":"Client sign in",
    "email":"Email/Access ID",
    "remember-text":"Remember me",
    "password":"Password",
    "sign-help":"Sign-in help",
    "register":"Register",
    "agree":"By signing in, you agree to these",
    "terms":"terms and conditions.",
    "plan-advisor-text":"Plan sponsors and advisors",
    "value":"sign in",
    "img-tag":"https://www.sunlife.ca/static/slfglobal/globalweb/responsive/images/en/sunlife-app-logo.png",
    "img-text-1":"For the best mobile experience",
    "img-text-2":"download the my Sun Lifeapp"
}
```