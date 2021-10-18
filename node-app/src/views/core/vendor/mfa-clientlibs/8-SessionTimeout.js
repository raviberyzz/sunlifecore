function SessionTimeout(){
    this.debug = false;
    this.sessionTimeoutId = null;
    this.inactivityTimeoutSeconds = 30;//1080; // 18mins
    this.events = ['keyup','click'];
    this.timedout = false;
    this.timeCountDown = 0;
    const self = this;
    
    this._init = function(){
        // listen for all the events that we need to make an ajax request to siteminder
        for(var i=0; i< this.events.length; i++){
            window.addEventListener( this.events[i], this._resetTimeout.bind(this), true)
        }
    }

    this.showErrorMessage = function(){
        const lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en';
        // clear the timeout
        clearTimeout(this.sessionTimeoutId);
        
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

    this._resetTimeout = function(){
        if(this.debug){
            console.log('Session Timout started', this.lang);
        }
        this.timeCountDown = this.inactivityTimeoutSeconds * 1000;
        if(this.sessionTimeoutId !== null){
            clearTimeout(this.sessionTimeoutId);
        }
        this.sessionTimeoutId = setTimeout( function(){
                if(self.debug) console.log('timeout after: ' + self.inactivityTimeoutSeconds + ' seconds');
                self.timedout = true;
                // make call
                self.showErrorMessage();
            }, 
            self.inactivityTimeoutSeconds * 1000
        )        
    }// EO this.resetTimeout
}
