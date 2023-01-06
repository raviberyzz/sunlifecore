#Sign in modal Component
#Displays Sign-in-modal
JSON Format
```
{
"data-section-sign-in" : "header-sign-in",
"button-wrapper":"button-wrapper",
"button-class": "signIn-button",
"button-text": "Sign-in",
"data-target":"#signin-widget-modal",
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
"img-text-2":"download the my Sun Lifeapp",
"cool-blue-background":"cool-blu",
"sign-in-action":"https://sit-www.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc"
}
```
<!-- sign-in-framework starts here -->
```
{
    "cool-blue-background":'cool-blue',
    "action-tag":"https://sit.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc"
}
```
<!-- sign-in-framework ends here -->
<!-- for cool blue background use "cool-blue" in "cool-blue-background" tag also put the the in the first json to compile in browser -->
<!-- action-tag for exiting site is "https://www.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc" for node-app local will be "/views/core/components/content/sign-in-modal.html" and for sit validation it will be "https://sit-www.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc"  -->