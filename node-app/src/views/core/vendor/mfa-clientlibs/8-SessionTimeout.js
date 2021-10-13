function SessionTimeout(){
    this.debug = false;
    this.sessionTimeoutId = null;
    this.inactivityTimeoutSeconds = 1080; // 18mins
    this.events = ['keyup','click'];
    this.timedout = false;
    this.timeCountDown = 0;
    const self = this;

    this.showErrorMessage = function(){
        setAppContentApperance(true);
        const lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en';
        const localizationContent = {
            en: {
                title: 'Oops, something went wrong',
                message: 'We’re sorry. There was a problem on our end. We apologize for the inconvenience.',
                button: 'Proceed to sign-in'
            },
            fr:{
                title: 'Un problème s’est produit.',
                message: 'Nous sommes désolés. Nous avons un problème. Nous nous excusons pour ce contretemps.',
                button: 'Ouvrir une session'
            }
        }

        let errorMessage = '<div id="mfa-container" role="main">';
              errorMessage += '<img class="mar-bottom-20 mobile-sm-img" src="/content/dam/sunlife/external/signin/transmit/images/warning.png" alt="" />';
              errorMessage += '<div class="mfa-inner no-padding">';
              errorMessage += '<div class="inner-container no-padding mar-bottom-40">';
              errorMessage += '<h2 class="mar-bottom-15 no-padding" id="mfaErrorTitle"></h2>';
              errorMessage += '<p id="mfaErrorMessage"></p>';
              errorMessage += '</div>';
              errorMessage += '<button id="mfaSignInBtn" class="btn btn-yellow btn-large"></button>';
              errorMessage += '</div>';
              errorMessage += '</div>';
        
        $("#transmitContainer").html(errorMessage);
        $("#mfaErrorTitle").html(localizationContent[lang].title);
        $("#mfaErrorMessage").html(localizationContent[lang].message);
        $("#mfaSignInBtn").html(localizationContent[lang].button);

        $("#mfaSignInBtn").on('click', function(){
            // add your code here to sign them back in
            onLogout();
        });
    }

    this.startTimeout = function(){
        this._resetTimeout();
    }

    this.clearSessionTimeout = function(){
        clearTimeout(this.sessionTimeoutId);
    }

    this._resetTimeout = function(){
        if(this.debug){
            console.log('Session Timout started', this.lang);
        }
        this.timeCountDown = this.inactivityTimeoutSeconds * 1000;
        if(this.sessionTimeoutId !== null){
            this.clearSessionTimeout();
        }
        this.sessionTimeoutId = setTimeout( function(){
                if(self.debug) console.log('timeout after: ' + self.inactivityTimeoutSeconds + ' seconds');
                self.timedout = true;
                // reload the page
                location.reload();
            }, 
            self.inactivityTimeoutSeconds * 1000
        )
    }// EO this.resetTimeout
}