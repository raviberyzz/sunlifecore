$(function(){
    
    if($('.video_container').length){
        //dynamically injecting script tag
        let scriptElem = document.createElement('script');
        scriptElem.setAttribute('src', 'https://play.vidyard.com/embed/v4.js');
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    
    
        //vidyard component 
    
     
        $('.embed').each(function(){
            var uuId = $(this).find('img').attr('data-uuid');
            var dataType = $(this).find('img').attr('data-type');
            let scriptElem = document.createElement('script');
            var id = "vidyard_embed_code_" + uuId;
            var source = '//play.vidyard.com/'+ uuId + '.js?v=3.1.1&amp;type=' + dataType;
            scriptElem.setAttribute('id', id);
            scriptElem.setAttribute('src', source);
            document.getElementsByTagName('head')[0].appendChild(scriptElem);
        })
        /*Vidyard progress-events.js file
    Original code: play.vidyard.com/v1/progress-events.js
    Last custom edit (5/6/17): Implemented new check 
    if (s[t] != null && typeof s[t].interval != undefined){
        s[t].interval = [0, 0], u = !1
    }
    */
    
    
        !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Vidyard=e():t.Vidyard=e()}(window,function(){return function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=37)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(16)("wks"),o=n(8),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(4),o=n(14);t.exports=n(5)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(13),o=n(26),i=n(17),u=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(45),o=n(30);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(28),o=n(21);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=!1},function(t,e,n){var r=n(9);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(0),u=n(3),a=n(2),s=n(8)("src"),r="toString",o=Function[r],c=(""+o).split(r);n(7).inspectSource=function(t){return o.call(t)},(t.exports=function(t,e,n,r){var o="function"==typeof n;o&&(a(n,"name")||u(n,"name",e)),t[e]!==n&&(o&&(a(n,s)||u(n,s,t[e]?""+t[e]:c.join(String(e)))),t===i?t[e]=n:r?t[e]?t[e]=n:u(t,e,n):(delete t[e],u(t,e,n)))})(Function.prototype,r,function(){return"function"==typeof this&&this[s]||o.call(this)})},function(t,e,n){var r=n(7),o=n(0),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(12)?"pure":"global",copyright:"Â© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var o=n(9);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var v=n(0),h=n(7),m=n(3),b=n(15),g=n(41),S="prototype",w=function(t,e,n){var r,o,i,u,a=t&w.F,s=t&w.G,c=t&w.S,f=t&w.P,p=t&w.B,l=s?v:c?v[e]||(v[e]={}):(v[e]||{})[S],y=s?h:h[e]||(h[e]={}),d=y[S]||(y[S]={});for(r in s&&(n=e),n)i=((o=!a&&l&&void 0!==l[r])?l:n)[r],u=p&&o?g(i,v):f&&"function"==typeof i?g(Function.call,i):i,l&&b(l,r,i,t&w.U),y[r]!=i&&m(y,r,u),f&&d[r]!=i&&(d[r]=i)};v.core=h,w.F=1,w.G=2,w.S=4,w.P=8,w.B=16,w.W=32,w.U=64,w.R=128,t.exports=w},function(t,e,n){var r=n(4).f,o=n(2),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(16)("keys"),o=n(8);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports={}},function(t,e,n){var r=n(0),o=n(7),i=n(12),u=n(25),a=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e,n){e.f=n(1)},function(t,e,n){t.exports=!n(5)&&!n(10)(function(){return 7!=Object.defineProperty(n(27)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(9),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var u=n(2),a=n(6),s=n(46)(!1),c=n(20)("IE_PROTO");t.exports=function(t,e){var n,r=a(t),o=0,i=[];for(n in r)n!=c&&u(r,n)&&i.push(n);for(;e.length>o;)u(r,n=e[o++])&&(~s(i,n)||i.push(n));return i}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,r){var o=r(13),i=r(50),u=r(21),a=r(20)("IE_PROTO"),s=function(){},c="prototype",f=function(){var t,e=r(27)("iframe"),n=u.length;for(e.style.display="none",r(51).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),f=t.F;n--;)delete f[c][u[n]];return f()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[c]=o(t),n=new s,s[c]=null,n[a]=t):n=f(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(28),o=n(21).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){"use strict";var r=n(55),o=n(56),i=n(23),u=n(6);t.exports=n(57)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(30);t.exports=function(t){return Object(r(t))}},function(t,e,n){t.exports=n(38)},function(t,e,n){"use strict";n.r(e);n(39),n(40),n(54),n(35),n(60);function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}if("object"!==f(window.Vidyard))var i={_players:{}};else i=window.Vidyard;i.players=function(){return this.init()},i.players.prototype.init=function(){for(var t in i._players)i._players.hasOwnProperty(t)&&"object"!==f(i._players[t])&&(i._players[t]=new i.player(t));return i._players},i.player=function(u){if("object"===f(i._players[u]))return i._players[u];var a=this,s={ready:[],error:[],timeupdate:[],play:[],pause:[],seek:[],beforeSeek:[],chapterComplete:[],playerComplete:[],volumeChange:[],createCta:[],fullScreenChange:[]},c=null;this.status=null,this.on=function(t,e){"complete"===t&&"undefined"!=typeof console&&console.error&&(console.error("The 'complete' event is being deprecated. Please use the 'chapterComplete' or 'playerComplete' instead."),t="playerComplete"),"ready"===t&&this._ready&&setTimeout(e,0),s[t]?s[t].push(e):s[t]=[e]},this.off=function(t,e){if(void 0===t)for(var n in s)s[n]=[];else if(s[t])if(e){var r=s[t].indexOf(e);-1<r&&s[t].splice(r,1)}else s[t]=[]};var t=function(t){if(t.origin===window.location.protocol+"//play.vidyard.com"){var e=JSON.parse(t.data);if("error"!==e.event){if(a.uuid&&e.uuid!==a.uuid)return;if("object"===f(e.status)&&(a.status=e.status),"object"===f(e.metadata)&&(a.metadata=e.metadata),a.status.currentTime!==c)for(var n=0;n<s.timeupdate.length;n++)s.timeupdate[n].call(a,a.status.currentTime);if(c=a.status.currentTime,"playerResize"===e.event){var r=$("#vidyard_iframe_"+u),o=r.width();e.params[1]&&r.width(o+e.params[0]+31)}"ready"===e.event&&(a._ready=!0)}if("string"==typeof e.event&&s[e.event]){var i=s[e.event].slice();for(n=0;n<i.length;n++)i[n].call(a,e.params)}}};window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent("onmessage",t),this.init(u)},i.player.prototype.init=function(r){var o=this;!function e(t){if(r){o.uuid=r;var n=document.getElementById("vidyard_iframe_"+r);if(!n){if(!t)throw"Player with UUID '"+r+"' not found!";document.getElementById("vidyard_embed_code_"+r)&&o.on("ready",function t(){e(!1),o.off("ready",t)})}o.iframe=n}}(!0),o.iframe&&o._postMessage({event:"sendReady"}),i._players[r]=o},i.player.prototype._postMessage=function(t){if(t.uuid=this.uuid,!this.iframe)throw"Could not find iframe to postMessage to!";window.postMessage&&this.iframe.contentWindow.postMessage(JSON.stringify(t),window.location.protocol+"//play.vidyard.com")},i.player.prototype.play=function(){this._postMessage({event:"play"})},i.player.prototype.pause=function(){this._postMessage({event:"pause"})},i.player.prototype.resume=function(){this._postMessage({event:"resume"})},i.player.prototype.seek=function(t){this._postMessage({event:"seek",position:t})},i.player.prototype.setVolume=function(t){this._postMessage({event:"setVolume",newVolume:t})},i.player.prototype.playChapter=function(t){this._postMessage({event:"playChapter",chapter_index:t})},i.player.prototype.createCta=function(t){t=$.extend({start:0,duration:10,width:300,fullscreen:!1,html:"",opacity:1,display_once:!1},t),this._postMessage({event:"createCta",attributes:t})},i.player.prototype.updateCta=function(t,e){this._postMessage({event:"updateCta",id:t,attributes:e})},i.player.prototype.getCurrentChapter=function(){return null===this.status?null:this.status.chapterIndex},i.player.prototype.currentTime=function(){return null===this.status?null:this.status.currentTime},i.player.prototype.toggleFullscreen=function(){this._postMessage({event:"toggleFullscreen"})},i.player.prototype.resetPlayer=function(){this._postMessage({event:"resetPlayer"})},i.player.prototype.enableCaption=function(t,e){this._postMessage({event:"enableCaption",language:t,label:e})},i.player.prototype.disableCaption=function(t,e){this._postMessage({event:"disableCaption",language:t,label:e})},i.GDPR={consent:function(t){if(void 0!==t)for(var e in new i.players){var n=i.player(e);n.on("ready",function(){n._postMessage({event:"consentToGDPR",consent:t})})}},hasConsentOnReady:function(t){var e=0,n=i.GDPR,r=Object.keys(new i.players).map(function(t){return i.player(t)});if(0===r.length)return t(!1);if(void 0!==n._readyConsent)return t(n._readyConsent);for(var o=0;o<r.length;o++)r[o].on("ready",function(){if(e!==r.length&&(e+=1),e===r.length)return n._readyConsent=r.reduce(function(t,e){return e.status.consent&&t},!0),t(n._readyConsent)})}},e.default=i},function(t,e,n){n(24)("asyncIterator")},function(t,e,n){"use strict";var r=n(0),u=n(2),o=n(5),i=n(18),a=n(15),s=n(43).KEY,c=n(10),f=n(16),p=n(19),l=n(8),y=n(1),d=n(25),v=n(24),h=n(44),m=n(49),b=n(13),g=n(9),S=n(6),w=n(17),_=n(14),x=n(33),O=n(52),j=n(53),P=n(4),M=n(11),C=j.f,T=P.f,E=O.f,L=r.Symbol,k=r.JSON,F=k&&k.stringify,N="prototype",I=y("_hidden"),A=y("toPrimitive"),D={}.propertyIsEnumerable,R=f("symbol-registry"),V=f("symbols"),G=f("op-symbols"),J=Object[N],W="function"==typeof L,B=r.QObject,z=!B||!B[N]||!B[N].findChild,H=o&&c(function(){return 7!=x(T({},"a",{get:function(){return T(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=C(J,e);r&&delete J[e],T(t,e,n),r&&t!==J&&T(J,e,r)}:T,U=function(t){var e=V[t]=x(L[N]);return e._k=t,e},K=W&&"symbol"==typeof L.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof L},Y=function(t,e,n){return t===J&&Y(G,e,n),b(t),e=w(e,!0),b(n),u(V,e)?(n.enumerable?(u(t,I)&&t[I][e]&&(t[I][e]=!1),n=x(n,{enumerable:_(0,!1)})):(u(t,I)||T(t,I,_(1,{})),t[I][e]=!0),H(t,e,n)):T(t,e,n)},$=function(t,e){b(t);for(var n,r=h(e=S(e)),o=0,i=r.length;o<i;)Y(t,n=r[o++],e[n]);return t},q=function(t){var e=D.call(this,t=w(t,!0));return!(this===J&&u(V,t)&&!u(G,t))&&(!(e||!u(this,t)||!u(V,t)||u(this,I)&&this[I][t])||e)},Q=function(t,e){if(t=S(t),e=w(e,!0),t!==J||!u(V,e)||u(G,e)){var n=C(t,e);return!n||!u(V,e)||u(t,I)&&t[I][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=E(S(t)),r=[],o=0;n.length>o;)u(V,e=n[o++])||e==I||e==s||r.push(e);return r},Z=function(t){for(var e,n=t===J,r=E(n?G:S(t)),o=[],i=0;r.length>i;)!u(V,e=r[i++])||n&&!u(J,e)||o.push(V[e]);return o};W||(a((L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var e=l(0<arguments.length?arguments[0]:void 0),n=function(t){this===J&&n.call(G,t),u(this,I)&&u(this[I],e)&&(this[I][e]=!1),H(this,e,_(1,t))};return o&&z&&H(J,e,{configurable:!0,set:n}),U(e)})[N],"toString",function(){return this._k}),j.f=Q,P.f=Y,n(34).f=O.f=X,n(22).f=q,n(32).f=Z,o&&!n(12)&&a(J,"propertyIsEnumerable",q,!0),d.f=function(t){return U(y(t))}),i(i.G+i.W+i.F*!W,{Symbol:L});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)y(tt[et++]);for(var nt=M(y.store),rt=0;nt.length>rt;)v(nt[rt++]);i(i.S+i.F*!W,"Symbol",{for:function(t){return u(R,t+="")?R[t]:R[t]=L(t)},keyFor:function(t){if(!K(t))throw TypeError(t+" is not a symbol!");for(var e in R)if(R[e]===t)return e},useSetter:function(){z=!0},useSimple:function(){z=!1}}),i(i.S+i.F*!W,"Object",{create:function(t,e){return void 0===e?x(t):$(x(t),e)},defineProperty:Y,defineProperties:$,getOwnPropertyDescriptor:Q,getOwnPropertyNames:X,getOwnPropertySymbols:Z}),k&&i(i.S+i.F*(!W||c(function(){var t=L();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(g(e)||void 0!==t)&&!K(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!K(e))return e}),r[1]=e,F.apply(k,r)}}),L[N][A]||n(3)(L[N],A,L[N].valueOf),p(L,"Symbol"),p(Math,"Math",!0),p(r.JSON,"JSON",!0)},function(t,e,n){var i=n(42);t.exports=function(r,o,t){if(i(r),void 0===o)return r;switch(t){case 1:return function(t){return r.call(o,t)};case 2:return function(t,e){return r.call(o,t,e)};case 3:return function(t,e,n){return r.call(o,t,e,n)}}return function(){return r.apply(o,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(8)("meta"),o=n(9),i=n(2),u=n(4).f,a=0,s=Object.isExtensible||function(){return!0},c=!n(10)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},p=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return c&&p.NEED&&s(t)&&!i(t,r)&&f(t),t}}},function(t,e,n){var a=n(11),s=n(32),c=n(22);t.exports=function(t){var e=a(t),n=s.f;if(n)for(var r,o=n(t),i=c.f,u=0;o.length>u;)i.call(t,r=o[u++])&&e.push(r);return e}},function(t,e,n){var r=n(29);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var s=n(6),c=n(47),f=n(48);t.exports=function(a){return function(t,e,n){var r,o=s(t),i=c(o.length),u=f(n,i);if(a&&e!=e){for(;u<i;)if((r=o[u++])!=r)return!0}else for(;u<i;u++)if((a||u in o)&&o[u]===e)return a||u||0;return!a&&-1}}},function(t,e,n){var r=n(31),o=Math.min;t.exports=function(t){return 0<t?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(31),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(29);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var u=n(4),a=n(13),s=n(11);t.exports=n(5)?Object.defineProperties:function(t,e){a(t);for(var n,r=s(e),o=r.length,i=0;i<o;)u.f(t,n=r[i++],e[n]);return t}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(6),o=n(34).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(22),o=n(14),i=n(6),u=n(17),a=n(2),s=n(26),c=Object.getOwnPropertyDescriptor;e.f=n(5)?c:function(t,e){if(t=i(t),e=u(e,!0),s)try{return c(t,e)}catch(t){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){for(var r=n(35),o=n(11),i=n(15),u=n(0),a=n(3),s=n(23),c=n(1),f=c("iterator"),p=c("toStringTag"),l=s.Array,y={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=o(y),v=0;v<d.length;v++){var h,m=d[v],b=y[m],g=u[m],S=g&&g.prototype;if(S&&(S[f]||a(S,f,l),S[p]||a(S,p,m),s[m]=l,b))for(h in r)S[h]||i(S,h,r[h],!0)}},function(t,e,n){var r=n(1)("unscopables"),o=Array.prototype;null==o[r]&&n(3)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var g=n(12),S=n(18),w=n(15),_=n(3),x=n(23),O=n(58),j=n(19),P=n(59),M=n(1)("iterator"),C=!([].keys&&"next"in[].keys()),T="values",E=function(){return this};t.exports=function(t,e,n,r,o,i,u){O(n,e,r);var a,s,c,f=function(t){if(!C&&t in d)return d[t];switch(t){case"keys":case T:return function(){return new n(this,t)}}return function(){return new n(this,t)}},p=e+" Iterator",l=o==T,y=!1,d=t.prototype,v=d[M]||d["@@iterator"]||o&&d[o],h=v||f(o),m=o?l?f("entries"):h:void 0,b="Array"==e&&d.entries||v;if(b&&(c=P(b.call(new t)))!==Object.prototype&&c.next&&(j(c,p,!0),g||"function"==typeof c[M]||_(c,M,E)),l&&v&&v.name!==T&&(y=!0,h=function(){return v.call(this)}),g&&!u||!C&&!y&&d[M]||_(d,M,h),x[e]=h,x[p]=E,o)if(a={values:l?h:f(T),keys:i?h:f("keys"),entries:m},u)for(s in a)s in d||w(d,s,a[s]);else S(S.P+S.F*(C||y),e,a);return a}},function(t,e,n){"use strict";var r=n(33),o=n(14),i=n(19),u={};n(3)(u,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(2),o=n(36),i=n(20)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(36),o=n(11);n(61)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var o=n(18),i=n(7),u=n(10);t.exports=function(t,e){var n=(i.Object||{})[t]||Object[t],r={};r[t]=e(n),o(o.S+o.F*u(function(){n(1)}),"Object",r)}}]).default});
    
        ! function(t) {
        function e(t) {
            var e, r = null,
                n = [];
            for (e = 0; e < t.length; ++e) !r || r[1] < t[e][0] ? (r && n.push(r), r = [t[e][0], t[e][1]]) : t[e][1] > r[1] && (r[1] = t[e][1]);
            return r && n.push(r), n
        }
    
        function r(t, r, n) {
            function a() {
                var e = t.getCurrentChapter();
                return s[e] = {
                    interval: [0, 0],
                    intervals: i.create(),
                    thresholds: n.slice()
                }, s[e]
            }
    
            function o(r, n) {
                var o, l, c, h = 0,
                    p = t.getCurrentChapter();
                if ("undefined" == typeof s[p] && a(), !(u || "object" != typeof t.metadata || r <= s[p].interval[1])) {
                    if (s[p].interval[1] = r, l = s[p].intervals.insertOne(s[p].interval), o = e(s[p].intervals), o.length + 1 < s[p].intervals.length)
                        for (s[p].intervals = i.create(), c = 0; c < o.length; ++c) h += o[c][1] - o[c][0], s[p].intervals.insertOne(o[c]);
                    else {
                        for (c = 0; c < o.length; ++c) h += o[c][1] - o[c][0];
                        s[p].intervals.remove(l)
                    }
                    return h = "number" == typeof t.metadata.chapters_attributes[p].video_attributes.length_in_milliseconds ? h / t.metadata.chapters_attributes[p].video_attributes.length_in_milliseconds * 1e5 : h / t.metadata.chapters_attributes[p].video_attributes.length_in_seconds * 100, Math.round(h) >= s[p].thresholds[0] ? n({
                        player: t,
                        chapter: p,
                        event: s[p].thresholds.shift()
                    }) : void 0
                }
            }
            var s = [],
                u = !1,
                l = t.getCurrentChapter();
            t.on("timeupdate", function(e) {
                var n = t.getCurrentChapter();
                return l !== n ? void(l = n) : void o(e, r)
            }), t.on("beforeSeek", function(e) {
                var r = t.getCurrentChapter();
                u === !1 && (s[r].interval[1] = e.start), u = !0
            }), t.on("play", function(e) {
                var r = e,
                    n = t.getCurrentChapter();
                "undefined" == typeof s[n] && a(), s[n].intervals.insertOne(s[n].interval.slice(0)), s[n].interval[0] = r, s[n].interval[1] = r, u = !1
            }), t.on("chapterComplete", function(t) {
                if (s[t] != null && typeof s[t].interval != undefined){
                    s[t].interval = [0, 0], u = !1
                }
            })
        }
    
        function n(e, n) {
            function i(t) {
                t.sort(function(t, e) {
                    return e > t ? -1 : t > e ? 1 : 0
                });
                for (var e = 0; e < t.length;) t[e] === t[e + 1] ? t.splice(e + 1, 1) : e += 1;
                return t
            }
            var a, o = !0,
                n = n || [1, 25, 50, 75, 90];
            try {
                a = new t.players
            } catch (s) {
                throw new Error("The Vidyard Player API must be loaded before this script can execute")
            }
            n = i(n);
            for (var u in a) a.hasOwnProperty(u) && u.length > 0 && (r(a[u], e, n), o = !1);
            o && console.warn("No Vidyard Players found. (include this script below player embed codes)")
        }
        var i = function() {
            this._compare = function(t, e) {
                return t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : t[1] < e[1] ? -1 : t[1] > e[1] ? 1 : 0
            }
        };
        i.create = function() {
            return new i
        }, i.prototype = new Array, i.prototype.constructor = Array.prototype.constructor, i.prototype.insertOne = function(t) {
            var e = this.bsearch(t);
            return this.splice(e + 1, 0, t), e + 1
        }, i.prototype.remove = function(t) {
            return this.splice(t, 1), this
        }, i.prototype.bsearch = function(t) {
            if (!this.length) return -1;
            for (var e, r, n, i = 0, a = this.length; a - i > 1;) {
                if (e = Math.floor((i + a) / 2), r = this[e], n = this._compare(t, r), 0 === n) return e;
                n > 0 ? i = e : a = e
            }
            return 0 === i && this._compare(this[0], t) > 0 ? -1 : i
        }, window.VidyardProgressEvents = n
    }(window.Vidyard);
    
    /*
    Function to call listeners on window load event
    */
    function VideoAnalyticsLoadEvent(func) {
        // assign any pre-defined functions on 'window.onload' to a variable
        var oldOnLoad = window.onload;
        // if there is not any function hooked to it
        if (typeof window.onload != 'function') {
            if(window.addEventListener){
                window.addEventListener('load',func,false); //W3C
            }
            else{
                window.attachEvent('onload',func); //IE
            }
        } else { // someone already hooked a function
            window.onload = function () {
                // call the function hooked already
                oldOnLoad();
                // call your awesome function
                func();
            }
        }
    }
    
    VideoAnalyticsLoadEvent(function(){
        var listeners = [];
        /*Make analytics API calls during defined progress event milestones and resets it after player complete*/
        function resetListeners() {
          // Reset any previous listeners to empty functions:
          for (var i = 0; i < listeners.length; i ++) {
            listeners[i] = function() {};
          }
          var index = listeners.length;
          listeners.push(function (result) {
            //console.log(`${result.player.metadata.chapters_attributes[result.chapter].video_attributes.name}: ${result.event}%.`);
            var chapterName = result.player.metadata.chapters_attributes[result.chapter].video_attributes.name;
            if (result.event != 100) {
                if (typeof utag === "object" && typeof s === "object")  {
                    utag.link({
                        "dcs_dcsuri":"/vidyard/" + chapterName,
                        "wt_ti":"Vidyard/" + chapterName,
                        "wt_dl":"5",
                        "dcsext_event_title": "chapter play " + result.event + "%",
                        "ev_type":"vid",
                        "ev_action":"play_" + result.event + "%",
                        "ev_title":"vidyard|" + chapterName,
                        "ev_data_one":""
                });
                } else{
                    dcsMultiTrack('DCS.dcsuri','/vidyard/' + chapterName,'WT.ti','Vidyard/' + chapterName,'WT.dl','5','DCSext.event_title', 'chapter play ' + result.event + '%');
                }
            } else {
                if (typeof utag === "object" && typeof s === "object")  {
                    utag.link({
                        "dcs_dcsuri":"/vidyard/" + chapterName,
                        "wt_ti":"Vidyard/" + chapterName,
                        "wt_dl":"5",
                        "dcsext_event_title": "chapter complete",
                        "ev_type":"vid",
                        "ev_action":"play_" + result.event + "%",
                        "ev_title":"vidyard|" + chapterName,
                        "ev_data_one":""
                });
                } else{
                    dcsMultiTrack('DCS.dcsuri','/vidyard/' + chapterName,'WT.ti','Vidyard/' + chapterName,'WT.dl','5','DCSext.event_title', 'chapter complete');
                }
            }
    
    
          });
          VidyardProgressEvents(function(result) { 
              listeners[index](result); 
          }, [25,50,75,100]);
        }
        //call to initialize
        resetListeners();
        var vidVidyard;
          try {
            vidVidyard = new Vidyard.players();
          } catch (e) {
            throw new Error("Warning 1: The Vidyard API must be loaded before this script can execute");
          }
          /*Make analytics API calls during video defined events*/
          for (var i in vidVidyard) {
            if (vidVidyard.hasOwnProperty(i)) {
                var playlistFlag = true;
                if (typeof utag === "object" && typeof s === "object")  {
                    vidVidyard[i].on("play", function(){
                        //console.log('play');
                        var n = this.getCurrentChapter();
                        if (playlistFlag){
                              utag.link({
                                "dcs_dcsuri":"/vidyard/" + this.metadata.name,
                                "wt_ti":"Vidyard/" + this.metadata.name,
                                "wt_dl":"5",
                                "dcsext_event_title": "player play",
                                "ev_type":"vid",
                                "ev_action":"playlist_play",
                                "ev_title":"vidyard|" + this.metadata.name,
                                "ev_data_one":""
                            });
                            playlistFlag = false;
                        }
                          utag.link({
                            "dcs_dcsuri":"/vidyard/" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "wt_ti":"Vidyard/" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "wt_dl":"5",
                            "dcsext_event_title": "chapter play",
                            "ev_type":"vid",
                            "ev_action":"play",
                            "ev_title":"vidyard|" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "ev_data_one":""
                        });
                    });
                    vidVidyard[i].on("playerComplete", function() {
                          //console.log("Video completed");
                          utag.link({
                            "dcs_dcsuri":"/vidyard/" + this.metadata.name,
                            "wt_ti":"Vidyard/" + this.metadata.name,
                            "wt_dl":"5",
                            "dcsext_event_title": "player complete",
                            "ev_type":"vid",
                            "ev_action":"playlist_done",
                            "ev_title":"vidyard|" + this.metadata.name,
                            "ev_data_one":""
                        });
                          playlistFlag = true;
                        resetListeners();
                    });
                    vidVidyard[i].on("ready", function(){
                        //console.log('ready');
                        utag.link({
                        "dcs_dcsuri":"/vidyard/" + this.metadata.name,
                        "wt_ti":"Vidyard/" + this.metadata.name,
                        "wt_dl":"6",
                        "dcsext_event_title": "player ready",
                        "ev_type":"vid",
                        "ev_action":"playlist_rdy",
                        "ev_title":"vidyard|" + this.metadata.name,
                        "ev_data_one":""
                        });
                    });
                    vidVidyard[i].on("pause", function(){
                        //console.log('pause');
                        var n = this.getCurrentChapter();
                        /*player pause is not part of event framework 2 but is recorded prior to AA launch*/
                          utag.link({
                            "dcs_dcsuri":"/vidyard/" +  this.metadata.name,
                            "wt_ti":"Vidyard/" +  this.metadata.name,
                            "wt_dl":"5",
                            "dcsext_event_title": "player pause",
                            });
                          utag.link({
                            "dcs_dcsuri":"/vidyard/" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "wt_ti":"Vidyard/" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "wt_dl":"5",
                            "dcsext_event_title": "chapter pause",
                            "ev_type":"vid",
                            "ev_action":"pause",
                            "ev_title":"vidyard|" + this.metadata.chapters_attributes[n].video_attributes.name,
                            "ev_data_one":""
                            });
                    });
                } else {
                    vidVidyard[i].on("play", function(){
                        //console.log('play');
                        var n = this.getCurrentChapter();
                        if (playlistFlag){
                              dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.name,'WT.ti','Vidyard/' + this.metadata.name ,'WT.dl','5','DCSext.event_title','player play');
                            playlistFlag = false;
                        }
                          dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.chapters_attributes[n].video_attributes.name,'WT.ti','Vidyard/' + this.metadata.chapters_attributes[n].video_attributes.name,'WT.dl','5','DCSext.event_title','chapter play');
                    });
                    vidVidyard[i].on("playerComplete", function() {
                          //console.log("Video completed");
                          dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.name,'WT.ti','Vidyard/' + this.metadata.name,'WT.dl','5','DCSext.event_title','player complete');
                          playlistFlag = true;
                        resetListeners();
                    });
                    vidVidyard[i].on("ready", function(){
                        //console.log('ready');
                        dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.name,'WT.ti','Vidyard/' + this.metadata.name ,'WT.dl','6','DCSext.event_title','player ready');
                    });
                    vidVidyard[i].on("pause", function(){
                        //console.log('pause');
                        var n = this.getCurrentChapter();
                        dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.name,'WT.ti','Vidyard/' + this.metadata.name ,'WT.dl','5','DCSext.event_title','player pause');
                          dcsMultiTrack('DCS.dcsuri','/vidyard/' + this.metadata.chapters_attributes[n].video_attributes.name,'WT.ti','Vidyard/' + this.metadata.chapters_attributes[n].video_attributes.name,'WT.dl','5','DCSext.event_title','chapter pause');	
                    });
                }
            }
          }
    });
    
    }


})

