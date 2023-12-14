const SocialMediaComp = {
  init: function () {
    $(document).on("click", ".share-listitem_link", function () {
      const platform = $(this).data("platform");
      shareOptionEvent(platform);

      var utag = $("body")
        .find("u")
        .filter(function () {
          return $(this);
        });

      utag.each(function () {
        if ($(this).attr("class")) {
        } else {
          $(this).replaceWith(function () {
            return $("<ins>", {
              html: this.innerHTML,
            });
          });
        }
      });
    });

    function shareOptionLinkedIn() {
      var d = document,
        l = d.location,
        f =
          "http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=" +
          encodeURIComponent(d.title) +
          "&url=" +
          encodeURIComponent(getURLSocialMedia()),
        a = function () {
          if (
            !window.open(
              f,
              "News",
              "width=520,height=570,toolbar=0,location=0,status=0,scrollbars=yes"
            )
          ) {
            // l.href = f;
          }
        };
      if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
      } else {
        a();
      }	
    }

    function shareOptionFB() {
      var d = document,
        f = "https://www.facebook.com/share",
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
              "toolbar=0,status=0,resizable=1,width=626,height=436"
            )
          )
            l.href = f + p;
        };
        if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
        else {
          a();
        }
      }console.log("test12");
      utag.link({  ev_type: "other",   ev_action: "clk",   ev_title: "share_facebook" });
       console.log("test");
       return true;
    }

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
        "https://twitter.com/intent/tweet?&text=" +
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
          ",personalbar=0,toolbar=0,scrollbars=1,resizable=1"
      );
    }
    function shareOptionEvent(option) {
      switch (option) {
        case "facebook":
          shareOptionFB();
          break;
        case "twitter":
          shareOptionTwitter();
          break;
        case "linkedin":
          shareOptionLinkedIn();
          break;
        default:
          break;
      }
    }
  },
};

$(function () {
  SocialMediaComp.init();
});