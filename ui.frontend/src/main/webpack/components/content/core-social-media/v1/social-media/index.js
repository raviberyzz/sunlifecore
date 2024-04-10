/**
 * social-media/index.js
 * Social Media Component specific JS Module.
 */
(function (core) {
	"use strict";

  /**
  * socialMedia component
  * @namespace socialMedia
  * @memberof sunCore.comp
  */
  core.comp.socialMedia = (function ($, util) {
    const CONSTANT = {
      SELECTOR: {
        shareLink: '.share-listitem_link'
      },
      ATTR: {
        platform: 'platform'
      },
      TYPE: {
        facebook: 'facebook',
        twitter: 'twitter',
        linkedin: 'linkedin'
      },
      EVTITLE: {
        shareTwitter: 'share_twitter',
        shareFacebook: 'share_facebook',
        shareLinkedin: 'share_linkedin'
      },
      URL: {
        twitter: 'https://twitter.com/intent/tweet?&text=',
        facebook: 'https://www.facebook.com/share',
        linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title='
      },
      PARAMETER: {
        twitter: ',personalbar=0,toolbar=0,scrollbars=1,resizable=1',
        facebook: 'toolbar=0,status=0,resizable=1,width=626,height=436',
        linkedin: 'width=520,height=570,toolbar=0,location=0,status=0,scrollbars=yes'
      },
      EVTYPE: 'other',
      EVACTION: 'clk'
    };    
    /**
    * Method to to handle the share option on click of share link
    * @function handleShareOptions
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function handleShareOptions() {
      const platform = $(this).data(CONSTANT.ATTR.platform);
      shareOptionEvent(platform);
    }
    /**
    * Method to to handle the share option for linkedin
    * @function shareOptionLinkedIn
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function shareOptionLinkedIn() {
      var d = document,
        l = d.location,
        f =
          CONSTANT.URL.linkedin +
          encodeURIComponent(d.title) +
          "&url=" +
          encodeURIComponent(getURLSocialMedia()),
        a = function () {
          if (
            !window.open(
              f,
              "News",
              CONSTANT.PARAMETER.linkedin
            )
          ) {
            // l.href = f;
          }
        };
      if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
      } else {
        a();
        utag.link({ev_type: CONSTANT.EVTYPE, ev_action: CONSTANT.EVACTION, ev_title: CONSTANT.EVTITLE.shareLinkedin });
      }	
    }
    /**
    * Method to to handle the share option for facebook
    * @function shareOptionFB
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function shareOptionFB() {
      var d = document,
        f = CONSTANT.URL.facebook,
        l = d.location,
        e = encodeURIComponent,
        p =
          ".php?src=bm&v=4&i=1354276539&u=" +
          e(getURLSocialMedia()) +
          "&t=" +
          e(d.title);
      try {
        if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host)) throw 0;
        share_internal_bookmarklet(p);
      } catch (z) {
        a = function () {
          if (
            !window.open(
              f + "r" + p,
              "sharer",
              CONSTANT.PARAMETER.facebook
            )
          )
            l.href = f + p;
        };
        if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
        else {
          a();
          utag.link({ev_type: CONSTANT.EVTYPE, ev_action: CONSTANT.EVACTION, ev_title: CONSTANT.EVTITLE.shareFacebook });
        }
      }
      return true;
    }
    /**
    * Method to to handle the share option for twitter
    * @function shareOptionTwitter
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function shareOptionTwitter() {
      window.twttr = window.twttr || {};
      var D = 550,
        A = 450,
        C = screen.height,
        B = screen.width,
        H = Math.round(B / 2 - D / 2),
        G = 0,
        F = document,
        l = F.location,
        E;
      if (C > A) {
        G = Math.round(C / 2 - A / 2);
      }
      window.twttr.shareWin = window.open(
        CONSTANT.URL.twitter +
          encodeURIComponent(F.title) +
          "&url=" +
          encodeURIComponent(getURLSocialMedia()),
        "",
        "left=" +
          H +
          ",top=" +
          G +
          ",width=" +
          D +
          ",height=" +
          A +
          CONSTANT.PARAMETER.twitter
      );
      utag.link({ev_type: CONSTANT.EVTYPE, ev_action: CONSTANT.EVACTION, ev_title: CONSTANT.EVTITLE.shareTwitter });
    }
    /**
    * Method to to handle the share option event for all the social media links
    * @function shareOptionEvent
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function shareOptionEvent(option) {
      switch (option) {
        case CONSTANT.TYPE.facebook:
          shareOptionFB();
          break;
        case CONSTANT.TYPE.twitter:
          shareOptionTwitter();
          break;
        case CONSTANT.TYPE.linkedin:
          shareOptionLinkedIn();
          break;
        default:
          break;
      }
    }
    /**
    * Handler to bind event specific for socialMedia
    * @function bindEvent
    * @memberof sunCore.comp.socialMedia
    * @private
    */
    function bindEvent() {
      $(document).on(
        util.customEvents.INTERACTION,
        CONSTANT.SELECTOR.shareLink,
        handleShareOptions
      );
    }
    /**
    * Handler called at social media component initialsation
    * @function init
    * @memberof sunCore.comp.socialMedia
    * @public
    */
    function init() {
      bindEvent();
    }   
        
    return {
      init: init,
  };
})(core.$, core.util);

/** 
* Initialise socialMedia module if given selector is in DOM
*/
core.util.initialise(core.comp, "socialMedia", ".share-listitem_link");
})(sunCore);
