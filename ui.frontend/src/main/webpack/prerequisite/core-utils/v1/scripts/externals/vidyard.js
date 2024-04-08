/* global sunCore */

/**
 * externals/vidyard.js
 * @fileOverview utility for legacy vidyard Anayltics functionality
 */
(function ($, util) {

       util.vidyardRunAnalytics = function () {
            if (
                navigator.userAgent.indexOf("MSIE") !== -1 ||
                navigator.appVersion.indexOf("Trident/") > -1
            ) {
                window.vidyardEmbed
                ? initApp(window.vidyardEmbed)
                : document.addEventListener("onVidyardAPI", function (_ref) {
                    var vyApi = _ref.detail;
                    return util.vidyardEmbedAnalytics(vyApi);
                    });
            } else {
                new Promise(function (d) {
                return window.vidyardEmbed
                    ? d(window.vidyardEmbed)
                    : (window.onVidyardAPI = function (n) {
                        return d(n);
                    });
                }).then(function (n) {
                    util.vidyardEmbedAnalytics(n);
                });
            }
        };

    /**
     * Vidyard Embed Functionality
     * @function
     */
    util.vidyardEmbedAnalytics = function (vyApi) {
            !(function (t) {
              function e(t) {
                var e,
                  r = null,
                  n = [];
                for (e = 0; e < t.length; ++e)
                  !r || r[1] < t[e][0]
                    ? (r && n.push(r), (r = [t[e][0], t[e][1]]))
                    : t[e][1] > r[1] && (r[1] = t[e][1]);
                return r && n.push(r), n;
              }
        
              function r(t, r, n) {
                function a() {
                  var e = t.getCurrentChapter();
                  return (
                    (s[e] = {
                      interval: [0, 0],
                      intervals: i.create(),
                      thresholds: n.slice(),
                    }),
                    s[e]
                  );
                }
        
                function o(r, n) {
                  var o,
                    l,
                    c,
                    h = 0,
                    p = t.getCurrentChapter();
                  if (
                    ("undefined" == typeof s[p] && a(),
                    !(u || "object" != typeof t.metadata || r <= s[p].interval[1]))
                  ) {
                    if (
                      ((s[p].interval[1] = r),
                      (l = s[p].intervals.insertOne(s[p].interval)),
                      (o = e(s[p].intervals)),
                      o.length + 1 < s[p].intervals.length)
                    )
                      for (s[p].intervals = i.create(), c = 0; c < o.length; ++c)
                        (h += o[c][1] - o[c][0]), s[p].intervals.insertOne(o[c]);
                    else {
                      for (c = 0; c < o.length; ++c) h += o[c][1] - o[c][0];
                      s[p].intervals.remove(l);
                    }
                    return (
                      (h =
                        "number" ==
                        typeof t.metadata.chapters_attributes[p].video_attributes
                          .length_in_milliseconds
                          ? (h /
                              t.metadata.chapters_attributes[p].video_attributes
                                .length_in_milliseconds) *
                            1e5
                          : (h /
                              t.metadata.chapters_attributes[p].video_attributes
                                .length_in_seconds) *
                            100),
                      Math.round(h) >= s[p].thresholds[0]
                        ? n({
                            player: t,
                            chapter: p,
                            event: s[p].thresholds.shift(),
                          })
                        : void 0
                    );
                  }
                }
                var s = [],
                  u = !1,
                  l = t.getCurrentChapter();
                t.on("timeupdate", function (e) {
                  var n = t.getCurrentChapter();
                  return l !== n ? void (l = n) : void o(e, r);
                }),
                  t.on("beforeSeek", function (e) {
                    var r = t.getCurrentChapter();
                    u === !1 && (s[r].interval[1] = e.start), (u = !0);
                  }),
                  t.on("play", function (e) {
                    var r = e,
                      n = t.getCurrentChapter();
                    "undefined" == typeof s[n] && a(),
                      s[n].intervals.insertOne(s[n].interval.slice(0)),
                      (s[n].interval[0] = r),
                      (s[n].interval[1] = r),
                      (u = !1);
                  }),
                  t.on("chapterComplete", function (t) {
                    if (s[t] != null && typeof s[t].interval != undefined) {
                      (s[t].interval = [0, 0]), (u = !1);
                    }
                  });
              }
        
              function n(e, n) {
                function i(t) {
                  t.sort(function (t, e) {
                    return e > t ? -1 : t > e ? 1 : 0;
                  });
                  for (var e = 0; e < t.length; )
                    t[e] === t[e + 1] ? t.splice(e + 1, 1) : (e += 1);
                  return t;
                }
                var a,
                  o = !0,
                  n = n || [1, 25, 50, 75, 90];
                try {
                  a = vyApi.players;
                } catch (s) {
                  throw new Error(
                    "The Vidyard Player API must be loaded before this script can execute"
                  );
                }
                n = i(n);
                for (var u in a)
                  a.hasOwnProperty(u) && u.length > 0 && (r(a[u], e, n), (o = !1));
                o &&
                  console.warn(
                    "No Vidyard Players found. (include this script below player embed codes)"
                  );
              }
              var i = function () {
                this._compare = function (t, e) {
                  return t[0] < e[0]
                    ? -1
                    : t[0] > e[0]
                    ? 1
                    : t[1] < e[1]
                    ? -1
                    : t[1] > e[1]
                    ? 1
                    : 0;
                };
              };
              (i.create = function () {
                return new i();
              }),
                (i.prototype = new Array()),
                (i.prototype.constructor = Array.prototype.constructor),
                (i.prototype.insertOne = function (t) {
                  var e = this.bsearch(t);
                  return this.splice(e + 1, 0, t), e + 1;
                }),
                (i.prototype.remove = function (t) {
                  return this.splice(t, 1), this;
                }),
                (i.prototype.bsearch = function (t) {
                  if (!this.length) return -1;
                  for (var e, r, n, i = 0, a = this.length; a - i > 1; ) {
                    if (
                      ((e = Math.floor((i + a) / 2)),
                      (r = this[e]),
                      (n = this._compare(t, r)),
                      0 === n)
                    )
                      return e;
                    n > 0 ? (i = e) : (a = e);
                  }
                  return 0 === i && this._compare(this[0], t) > 0 ? -1 : i;
                }),
                (window.VidyardProgressEvents = n);
            })(window.Vidyard);
        
            /*
              Function to call listeners on window load event
              */
            function VideoAnalyticsLoadEvent() {
              var listeners = [];
              /*Make analytics API calls during defined progress event milestones and resets it after player complete*/
              function resetListeners() {
                // Reset any previous listeners to empty functions:
                for (var i = 0; i < listeners.length; i++) {
                  listeners[i] = function () {};
                }
                var index = listeners.length;
                console.log(index + " " + "listeners");
                listeners.push(function (result) {
                  //console.log(results + ${result.player.metadata.chapters_attributes[result.chapter].video_attributes.name}: ${result.event}%.);
                  var chapterName =
                    result.player.metadata.chapters_attributes[result.chapter]
                      .video_attributes.name;
                  if (result.event != 100) {
                    if (typeof utag === "object" && typeof s === "object") {
                      utag.link({
                        dcs_dcsuri: "/vidyard/" + chapterName,
                        wt_ti: "Vidyard/" + chapterName,
                        wt_dl: "5",
                        dcsext_event_title: "chapter play " + result.event + "%",
                        ev_type: "vid",
                        ev_action: "play_" + result.event + "%",
                        ev_title: "vidyard|" + chapterName,
                        ev_data_one: "",
                      });
                    } else {
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" + chapterName,
                        "WT.ti",
                        "Vidyard/" + chapterName,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "chapter play " + result.event + "%"
                      );
                    }
                  } else {
                    if (typeof utag === "object" && typeof s === "object") {
                      utag.link({
                        dcs_dcsuri: "/vidyard/" + chapterName,
                        wt_ti: "Vidyard/" + chapterName,
                        wt_dl: "5",
                        dcsext_event_title: "chapter complete",
                        ev_type: "vid",
                        ev_action: "play_" + result.event + "%",
                        ev_title: "vidyard|" + chapterName,
                        ev_data_one: "",
                      });
                    } else {
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" + chapterName,
                        "WT.ti",
                        "Vidyard/" + chapterName,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "chapter complete"
                      );
                    }
                  }
                });
                VidyardProgressEvents(
                  function (result) {
                    listeners[index](result);
                  },
                  [25, 50, 75, 100]
                );
              }
              //call to initialize
              resetListeners();
              var vidVidyard;
              try {
                vidVidyard = vyApi.players;
              } catch (e) {
                throw new Error(
                  "Warning 1: The Vidyard API must be loaded before this script can execute"
                );
              }
              /*Make analytics API calls during video defined events*/
              var leng = vidVidyard.length - 1;
              vyApi.api.addReadyListener(function (_, player) {
                utag.link({
                  dcs_dcsuri: "/vidyard/" + player.metadata.name,
                  wt_ti: "Vidyard/" + player.metadata.name,
                  wt_dl: "6",
                  dcsext_event_title: "player ready",
                  ev_type: "vid",
                  ev_action: "playlist_rdy",
                  ev_title: "vidyard|" + player.metadata.name,
                  ev_data_one: "",
                });
              }, vidVidyard[leng].uuid);
              
              for (var i in vidVidyard) {
                if (vidVidyard.hasOwnProperty(i)) {
                  var playlistFlag = true;
                  if (typeof utag === "object" && typeof s === "object") {
                    vidVidyard[i].on("play", function () {
                      var n = this.getCurrentChapter();
                      if (playlistFlag) {
                        utag.link({
                          dcs_dcsuri: "/vidyard/" + this.metadata.name,
                          wt_ti: "Vidyard/" + this.metadata.name,
                          wt_dl: "5",
                          dcsext_event_title: "player play",
                          ev_type: "vid",
                          ev_action: "playlist_play",
                          ev_title: "vidyard|" + this.metadata.name,
                          ev_data_one: "",
                        });
                        playlistFlag = false;
                      }
                      utag.link({
                        dcs_dcsuri:
                          "/vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        wt_ti:
                          "Vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        wt_dl: "5",
                        dcsext_event_title: "chapter play",
                        ev_type: "vid",
                        ev_action: "play",
                        ev_title:
                          "vidyard|" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        ev_data_one: "",
                      });
                    });
                    vidVidyard[i].on("playerComplete", function () {
                      utag.link({
                        dcs_dcsuri: "/vidyard/" + this.metadata.name,
                        wt_ti: "Vidyard/" + this.metadata.name,
                        wt_dl: "5",
                        dcsext_event_title: "player complete",
                        ev_type: "vid",
                        ev_action: "playlist_done",
                        ev_title: "vidyard|" + this.metadata.name,
                        ev_data_one: "",
                      });
                      playlistFlag = true;
                      resetListeners();
                    });
        
                    vidVidyard[i].on("pause", function () {
                      var n = this.getCurrentChapter();
                      /*player pause is not part of event framework 2 but is recorded prior to AA launch*/
                      utag.link({
                        dcs_dcsuri: "/vidyard/" + this.metadata.name,
                        wt_ti: "Vidyard/" + this.metadata.name,
                        wt_dl: "5",
                        dcsext_event_title: "player pause",
                      });
                      utag.link({
                        dcs_dcsuri:
                          "/vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        wt_ti:
                          "Vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        wt_dl: "5",
                        dcsext_event_title: "chapter pause",
                        ev_type: "vid",
                        ev_action: "pause",
                        ev_title:
                          "vidyard|" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        ev_data_one: "",
                      });
                    });
                  } else {
                    vidVidyard[i].on("play", function () {
                      var n = this.getCurrentChapter();
                      if (playlistFlag) {
                        dcsMultiTrack(
                          "DCS.dcsuri",
                          "/vidyard/" + this.metadata.name,
                          "WT.ti",
                          "Vidyard/" + this.metadata.name,
                          "WT.dl",
                          "5",
                          "DCSext.event_title",
                          "player play"
                        );
                        playlistFlag = false;
                      }
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        "WT.ti",
                        "Vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "chapter play"
                      );
                    });
                    vidVidyard[i].on("playerComplete", function () {
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" + this.metadata.name,
                        "WT.ti",
                        "Vidyard/" + this.metadata.name,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "player complete"
                      );
                      playlistFlag = true;
                      resetListeners();
                    });
                    vidVidyard[i].on("ready", function () {
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" + this.metadata.name,
                        "WT.ti",
                        "Vidyard/" + this.metadata.name,
                        "WT.dl",
                        "6",
                        "DCSext.event_title",
                        "player ready"
                      );
                    });
                    vidVidyard[i].on("pause", function () {
                      var n = this.getCurrentChapter();
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" + this.metadata.name,
                        "WT.ti",
                        "Vidyard/" + this.metadata.name,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "player pause"
                      );
                      dcsMultiTrack(
                        "DCS.dcsuri",
                        "/vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        "WT.ti",
                        "Vidyard/" +
                          this.metadata.chapters_attributes[n].video_attributes.name,
                        "WT.dl",
                        "5",
                        "DCSext.event_title",
                        "chapter pause"
                      );
                    });
                  }
                }
              }
            }

            VideoAnalyticsLoadEvent();
    };

  
    return util;
  })(sunCore.$, sunCore.util);



 