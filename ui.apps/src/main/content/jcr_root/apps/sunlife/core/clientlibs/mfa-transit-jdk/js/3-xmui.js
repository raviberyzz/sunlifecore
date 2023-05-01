!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).xmui = {}));
})(this, function (t) {
  "use strict";
  function e(t) {
    return (e =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function n(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function o(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function s(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function a(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && c(t, e);
  }
  function r(t) {
    return (r = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function c(t, e) {
    return (c =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function u(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function l(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e) ? u(t) : e;
  }
  function _(t, e) {
    for (
      ;
      !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t));

    );
    return t;
  }
  function h(t, e, n) {
    return (h =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, n) {
            var i = _(t, e);
            if (i) {
              var o = Object.getOwnPropertyDescriptor(i, e);
              return o.get ? o.get.call(n) : o.value;
            }
          })(t, e, n || t);
  }
  function d(t, e, n, i) {
    return (d =
      "undefined" != typeof Reflect && Reflect.set
        ? Reflect.set
        : function (t, e, n, i) {
            var o,
              a = _(t, e);
            if (a) {
              if ((o = Object.getOwnPropertyDescriptor(a, e)).set)
                return o.set.call(i, n), !0;
              if (!o.writable) return !1;
            }
            if ((o = Object.getOwnPropertyDescriptor(i, e))) {
              if (!o.writable) return !1;
              (o.value = n), Object.defineProperty(i, e, o);
            } else s(i, e, n);
            return !0;
          })(t, e, n, i);
  }
  function p(t, e, n, i, o) {
    if (!d(t, e, n, i || t) && o) throw new Error("failed to set property");
    return n;
  }
  function m(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) {
          for (var e = 0, n = new Array(t.length); e < t.length; e++)
            n[e] = t[e];
          return n;
        }
      })(t) ||
      (function (t) {
        if (
          Symbol.iterator in Object(t) ||
          "[object Arguments]" === Object.prototype.toString.call(t)
        )
          return Array.from(t);
      })(t) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  var g,
    f,
    v,
    y = /^\s*<[\S\s]*$/,
    k = (function () {
      function t() {
        n(this, t), (this._elements = new Array());
      }
      return (
        o(
          t,
          [
            {
              key: "append",
              value: function (t) {
                var e = C(t);
                return (
                  this._elements.forEach(function (t, n) {
                    e.forEach(function (e) {
                      var i = 0 !== n ? e.cloneNode() : e;
                      t.appendChild(i);
                    });
                  }),
                  this
                );
              },
            },
            {
              key: "remove",
              value: function () {
                this._elements.forEach(function (t) {
                  t.parentNode.removeChild(t);
                });
              },
            },
            {
              key: "prepend",
              value: function (t) {
                var e = C(t);
                return (
                  this._elements.forEach(function (t, n) {
                    var i = t.firstChild;
                    e.forEach(function (e) {
                      var o = 0 !== n ? e.cloneNode() : e;
                      t.insertBefore(o, i);
                    });
                  }),
                  this
                );
              },
            },
            {
              key: "content",
              value: function (t) {
                return this.empty().append(t);
              },
            },
            {
              key: "disable",
              value: function () {
                return this.disabled(!0);
              },
            },
            {
              key: "enable",
              value: function () {
                return this.disabled(!1);
              },
            },
            {
              key: "attr",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    !(function (t, e) {
                      Object.keys(e).forEach(function (n) {
                        e.hasOwnProperty(n) && t.setAttribute(n, e[n]);
                      });
                    })(e, t);
                  }),
                  this
                );
              },
            },
            {
              key: "focus",
              value: function () {
                return (
                  this._elements.forEach(function (t) {
                    t.focus();
                  }),
                  this
                );
              },
            },
            {
              key: "addClass",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    !(function (t, e) {
                      x(t, e) ||
                        ((t.className += " " + e),
                        (t.className = t.className.replace(/  +/g, " ")));
                    })(e, t);
                  }),
                  this
                );
              },
            },
            {
              key: "removeClass",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    !(function (t, e) {
                      if (x(t, e)) {
                        var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
                        t.className = t.className
                          .replace(n, " ")
                          .replace(/  +/g, " ");
                      }
                    })(e, t);
                  }),
                  this
                );
              },
            },
            {
              key: "setClass",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    e.className = t;
                  }),
                  this
                );
              },
            },
            {
              key: "find",
              value: function (e) {
                var n = new t();
                return (
                  this._elements.forEach(function (t) {
                    w(t, e).forEach(function (t) {
                      n.push(t);
                    });
                  }),
                  n
                );
              },
            },
            {
              key: "hide",
              value: function () {
                return (
                  this._elements.forEach(function (t) {
                    t.style.display = "none";
                  }),
                  this
                );
              },
            },
            {
              key: "show",
              value: function () {
                return (
                  this._elements.forEach(function (t) {
                    t.style.display = "";
                  }),
                  this
                );
              },
            },
            {
              key: "empty",
              value: function () {
                return (
                  this._elements.forEach(function (t) {
                    t.innerHTML = "";
                  }),
                  this
                );
              },
            },
            {
              key: "text",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    e.textContent = t;
                  }),
                  this
                );
              },
            },
            {
              key: "on",
              value: function (t, e) {
                var n = this;
                return (
                  t
                    .trim()
                    .split(" ")
                    .forEach(function (t) {
                      n._elements.forEach(function (n) {
                        n.addEventListener(t, e);
                      });
                    }),
                  this
                );
              },
            },
            {
              key: "hover",
              value: function (t, e) {
                return (
                  this._elements.forEach(function (n) {
                    n.addEventListener("mouseover", t),
                      n.addEventListener("mouseout", e);
                  }),
                  this
                );
              },
            },
            {
              key: "first",
              value: function () {
                var e = new t();
                return this._elements.length ? e.push(this._elements[0]) : e;
              },
            },
            {
              key: "get",
              value: function (t) {
                return this._elements[t];
              },
            },
            {
              key: "disabled",
              value: function (t) {
                return (
                  this._elements.forEach(function (e) {
                    e.disabled != t && (e.disabled = t);
                  }),
                  this
                );
              },
            },
            {
              key: "blockInteraction",
              value: function () {
                var t = this;
                return (
                  this._elements.forEach(function (e) {
                    (e.style.pointerEvents = "none"),
                      e.addEventListener("keydown", t.keydownBlockEventHandler);
                  }),
                  this
                );
              },
            },
            {
              key: "unblockInteraction",
              value: function () {
                var t = this;
                return (
                  this._elements.forEach(function (e) {
                    (e.style.pointerEvents = "auto"),
                      e.removeEventListener(
                        "keydown",
                        t.keydownBlockEventHandler
                      );
                  }),
                  this
                );
              },
            },
            {
              key: "push",
              value: function () {
                var t;
                return (t = this._elements).push.apply(t, arguments), this;
              },
            },
            {
              key: "keydownBlockEventHandler",
              value: function (t) {
                t.preventDefault();
              },
            },
            {
              key: "length",
              get: function () {
                return this._elements.length;
              },
            },
            {
              key: "elements",
              get: function () {
                return m(this._elements);
              },
            },
          ],
          [
            {
              key: "createTSQueryElement",
              value: function (e) {
                var n = C(e),
                  i = new t();
                return i.push.apply(i, m(n)), i;
              },
            },
          ]
        ),
        t
      );
    })();
  function C(t) {
    var e, n;
    return t instanceof k
      ? t.elements
      : t instanceof Array
      ? t
      : t instanceof HTMLElement
      ? [t]
      : y.test(t)
      ? ((e = t),
        ((n = document.createElement("div")).innerHTML = e),
        b(n.childNodes))
      : w(document, t);
  }
  function b(t) {
    var e = [];
    return (
      [].forEach.call(t, function (t) {
        t instanceof HTMLElement && e.push(t);
      }),
      e
    );
  }
  function w(t, e) {
    return b(t.querySelectorAll(e));
  }
  function x(t, e) {
    return !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
  }
  function S(t) {
    return k.createTSQueryElement(t);
  }
  !(function (t) {
    (t.Mousedown = "mousedown"),
      (t.Mouseup = "mouseup"),
      (t.Mouseenter = "mouseenter"),
      (t.Mouseleave = "mouseleave"),
      (t.Click = "click");
  })(g || (g = {})),
    (function (t) {
      (t.Keydown = "keydown"), (t.Keypress = "keypress");
    })(f || (f = {})),
    (function (t) {
      (t.Selected = "xmui--selected"),
        (t.Disabled = "xmui--disabled"),
        (t.Active = "xmui--active"),
        (t.Error = "xmui--error");
    })(v || (v = {}));
  var I,
    E = (function () {
      function t() {
        n(this, t),
          (this._active = !1),
          (this._selected = !1),
          (this._disabled = !1),
          (this._error = !1),
          (this._key = ""),
          (this.element = this.buildElement());
      }
      return (
        o(t, [
          {
            key: "appendInto",
            value: function (t) {
              t.append(this.element);
            },
          },
          {
            key: "prependInto",
            value: function (t) {
              t.prepend(this.element);
            },
          },
          {
            key: "remove",
            value: function () {
              this.element.remove();
            },
          },
          {
            key: "onClick",
            value: function (t) {
              this.onMouseEvent(g.Click, t);
            },
          },
          {
            key: "onMousedown",
            value: function (t) {
              this.onMouseEvent(g.Mousedown, t);
            },
          },
          {
            key: "onMouseup",
            value: function (t) {
              this.onMouseEvent(g.Mouseup, t);
            },
          },
          {
            key: "onMouseenter",
            value: function (t) {
              this.onMouseEvent(g.Mouseenter, t);
            },
          },
          {
            key: "onMouseleave",
            value: function (t) {
              this.onMouseEvent(g.Mouseleave, t);
            },
          },
          {
            key: "onMouseEvent",
            value: function (t, e) {
              var n = this;
              this.element.on(t, function (t) {
                e(n, t);
              });
            },
          },
          {
            key: "onKeydown",
            value: function (t) {
              this.onKeyboardEvent(f.Keydown, t);
            },
          },
          {
            key: "onKeypress",
            value: function (t) {
              this.onKeyboardEvent(f.Keypress, t);
            },
          },
          {
            key: "onKeyboardEvent",
            value: function (t, e) {
              var n = this;
              this.element.on(t, function (t) {
                e(n, t);
              });
            },
          },
          {
            key: "onPaste",
            value: function (t) {
              this.element.on("paste", t);
            },
          },
          {
            key: "onCut",
            value: function (t) {
              this.element.on("cut", t);
            },
          },
          {
            key: "onBlur",
            value: function (t) {
              this.element.on("blur", t);
            },
          },
          {
            key: "onFocus",
            value: function (t) {
              this.element.on("focus", t);
            },
          },
          {
            key: "onFocusIn",
            value: function (t) {
              this.element.on("focusin", t);
            },
          },
          {
            key: "onFocusOut",
            value: function (t) {
              this.element.on("focusout", t);
            },
          },
          {
            key: "onHover",
            value: function (t, e) {
              this.element.hover(t, e);
            },
          },
          {
            key: "addClass",
            value: function (t) {
              this.element.addClass(t);
            },
          },
          {
            key: "removeClass",
            value: function (t) {
              this.element.removeClass(t);
            },
          },
          {
            key: "focus",
            value: function () {
              var t = this;
              setTimeout(function () {
                t.element.focus();
              });
            },
          },
          {
            key: "scrollIntoView",
            value: function () {
              var t = this;
              setTimeout(function () {
                t.htmlElement.scrollIntoView();
              });
            },
          },
          {
            key: "show",
            set: function (t) {
              t ? this.element.show() : this.element.hide();
            },
          },
          {
            key: "id",
            set: function (t) {
              this.htmlElement.id = t;
            },
            get: function () {
              return this.htmlElement.id;
            },
          },
          {
            key: "value",
            set: function (t) {
              this._value = t;
            },
            get: function () {
              return this._value;
            },
          },
          {
            key: "className",
            set: function (t) {
              this.element.setClass(t);
            },
          },
          {
            key: "ariaRole",
            set: function (t) {
              this.attr = { "aria-role": t };
            },
          },
          {
            key: "role",
            set: function (t) {
              this.attr = { role: t };
            },
          },
          {
            key: "ariaLabel",
            set: function (t) {
              this.attr = { "aria-label": t };
            },
          },
          {
            key: "ariaLabeledBy",
            set: function (t) {
              this.attr = { "aria-labelledby": t };
            },
          },
          {
            key: "ariaDescribedBy",
            set: function (t) {
              this.attr = { "aria-describedby": t };
            },
          },
          {
            key: "ariaMultiselectable",
            set: function (t) {
              this.attr = { "aria-multiselectable": t.toString() };
            },
          },
          {
            key: "ariaActiveDescendant",
            set: function (t) {
              this.attr = { "aria-activedescendant": t };
            },
          },
          {
            key: "ariaLive",
            set: function (t) {
              this.attr = { "aria-live": t };
            },
          },
          {
            key: "ariaSelected",
            set: function (t) {
              this.attr = { "aria-selected": t.toString() };
            },
          },
          {
            key: "ariaDisabled",
            set: function (t) {
              this.attr = { "aria-disabled": t.toString() };
            },
          },
          {
            key: "automationId",
            set: function (t) {
              this.attr = { "tsc-name": t };
            },
          },
          {
            key: "tabindex",
            set: function (t) {
              this.attr = { tabindex: t.toString() };
            },
          },
          {
            key: "spellcheck",
            set: function (t) {
              this.attr = { spellcheck: t ? "true" : "false" };
            },
          },
          {
            key: "attr",
            set: function (t) {
              this.element.attr(t);
            },
          },
          {
            key: "htmlElement",
            get: function () {
              return this.element.get(0);
            },
          },
          {
            key: "active",
            set: function (t) {
              t !== this._active && t
                ? this.addClass(v.Active)
                : this.removeClass(v.Active),
                (this._active = t);
            },
            get: function () {
              return this._active;
            },
          },
          {
            key: "selected",
            set: function (t) {
              t !== this._selected && t
                ? this.addClass(v.Selected)
                : this.removeClass(v.Selected),
                (this._selected = t),
                (this.ariaSelected = t);
            },
            get: function () {
              return this._selected;
            },
          },
          {
            key: "disabled",
            set: function (t) {
              t !== this._disabled && t
                ? this.addClass(v.Disabled)
                : this.removeClass(v.Disabled),
                (this._disabled = t),
                (this.ariaDisabled = t);
            },
            get: function () {
              return this._disabled;
            },
          },
          {
            key: "key",
            get: function () {
              return this._key;
            },
            set: function (t) {
              this._key = t;
            },
          },
          {
            key: "error",
            set: function (t) {
              (this._error = t),
                t ? this.addClass(v.Error) : this.removeClass(v.Error);
            },
            get: function () {
              return this._error;
            },
          },
        ]),
        t
      );
    })(),
    A = (function (t) {
      function e() {
        var t,
          i =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return n(this, e), (t = l(this, r(e).call(this))).setText(i), t;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S("<span></span>");
            },
          },
          {
            key: "setText",
            value: function (t) {
              this.element.text(null == t ? "" : t);
            },
          },
        ]),
        e
      );
    })(E),
    P = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).apply(this, arguments))).children = []),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "prependChild",
            value: function (t) {
              t.prependInto(this.element), this.children.push(t);
            },
          },
          {
            key: "prependChildren",
            value: function () {
              for (
                var t = this, e = arguments.length, n = new Array(e), i = 0;
                i < e;
                i++
              )
                n[i] = arguments[i];
              n.forEach(function (e) {
                t.prependChild(e);
              });
            },
          },
          {
            key: "appendChild",
            value: function (t) {
              t.appendInto(this.element), this.children.push(t);
            },
          },
          {
            key: "appendChildren",
            value: function () {
              for (
                var t = this, e = arguments.length, n = new Array(e), i = 0;
                i < e;
                i++
              )
                n[i] = arguments[i];
              n.forEach(function (e) {
                t.appendChild(e);
              });
            },
          },
          {
            key: "removeChild",
            value: function (t) {
              (this.children = this.children.filter(function (e) {
                return e !== t;
              })),
                t.remove();
            },
          },
          {
            key: "setContent",
            value: function (t) {
              this.empty(), this.appendChild(t);
            },
          },
          {
            key: "empty",
            value: function () {
              this.element.empty(), (this.children = []);
            },
          },
          {
            key: "getNextChild",
            value: function (t) {
              var e = this.getChildren().length,
                n = (this.getChildIndex(t) + 1) % e;
              return this.getChildByIndex(n);
            },
          },
          {
            key: "getPrevChild",
            value: function (t) {
              var e = this.getChildren().length,
                n = (this.getChildIndex(t) + e - 1) % e;
              return this.getChildByIndex(n);
            },
          },
          {
            key: "getChildByIndex",
            value: function (t) {
              return this.children[t];
            },
          },
          {
            key: "getChildren",
            value: function () {
              return this.children;
            },
          },
          {
            key: "getChildIndex",
            value: function (t) {
              return this.children.indexOf(t);
            },
          },
        ]),
        e
      );
    })(E),
    T = (function (t) {
      function e() {
        return n(this, e), l(this, r(e).apply(this, arguments));
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S("<div></div>");
            },
          },
        ]),
        e
      );
    })(P),
    R = "xmui-info-panel",
    M = "xmui-info-panel-title",
    B = "xmui-info-panel-instructions",
    N = (function (t) {
      function e() {
        var t;
        n(this, e),
          ((t = l(this, r(e).call(this))).className = R),
          (t.titleComponent = new A()),
          (t.titleComponent.className = "".concat(R, "_title")),
          (t.titleComponent.automationId = M),
          (t.instructionsComponent = new A()),
          (t.instructionsComponent.className = "".concat(R, "_instructions")),
          (t.instructionsComponent.automationId = B),
          (t.instructionsComponent.show = !1);
        var i = new T();
        return (
          (i.className = "".concat(R, "_container")),
          i.appendChildren(t.titleComponent, t.instructionsComponent),
          t.appendChild(i),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setTitle",
            value: function (t) {
              this.titleComponent.setText(t);
            },
          },
          {
            key: "setInstructions",
            value: function (t) {
              var e = t ? t.trim() : "";
              this.instructionsComponent.setText(e),
                (this.instructionsComponent.show = !!e);
            },
          },
        ]),
        e
      );
    })(T),
    D = "xmui-header-panel",
    L = (function (t) {
      function e() {
        var t,
          i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).className = D),
          t.addClass("".concat(D, i ? "--short" : "--normal")),
          (t.iconComp = new T()),
          (t.iconComp.className = "".concat(D, "_icon")),
          (t.iconComp.show = !1),
          (t.textComp = new A()),
          (t.textComp.className = "".concat(D, "_text")),
          t.appendChildren(t.iconComp, t.textComp),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setText",
            value: function (t) {
              this.textComp.setText(t);
            },
          },
          {
            key: "setIcon",
            value: function (t) {
              (this.iconComp.className = "".concat(D, "_icon ").concat(t)),
                (this.iconComp.show = !0);
            },
          },
        ]),
        e
      );
    })(T),
    F = "xmui-action-panel",
    q = (function (t) {
      function e() {
        var t,
          i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).className = F),
          t.addClass("".concat(F, i ? "--short" : "--normal")),
          (t.leftButtonsContainer = new T()),
          (t.leftButtonsContainer.className = "".concat(F, "_left")),
          (t.rightButtonsContainer = new T()),
          (t.rightButtonsContainer.className = "".concat(F, "_right")),
          t.appendChildren(t.leftButtonsContainer, t.rightButtonsContainer),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addLeftButton",
            value: function (t) {
              this.leftButtonsContainer.appendChild(t);
            },
          },
          {
            key: "addRightButton",
            value: function (t) {
              this.rightButtonsContainer.appendChildren(t);
            },
          },
        ]),
        e
      );
    })(T),
    O = "xmui-busy-indicator",
    j = (function (t) {
      function e() {
        var t;
        n(this, e), ((t = l(this, r(e).call(this))).className = O);
        var i = new T();
        return (i.className = "".concat(O, "_animation")), t.appendChild(i), t;
      }
      return a(e, t), e;
    })(T);
  !(function (t) {
    (t.User = "xmui-icon-user"),
      (t.Remove = "xmui-icon-remove"),
      (t.Rename = "xmui-icon-rename"),
      (t.More = "xmui-icon-more"),
      (t.PasswordVisible = "xmui-icon-password-input-visible"),
      (t.PasswordHidden = "xmui-icon-password-input-hidden"),
      (t.Device = "xmui-icon-device"),
      (t.Registered = "xmui-icon-registered"),
      (t.WebBrowser = "xmui-icon-web-browser"),
      (t.Expand = "xmui-icon-expand"),
      (t.LockedState = "xmui-icon-locked-state"),
      (t.MobileApproveWaiting = "xmui-icon-mobile-approve-waiting"),
      (t.WaitForTicket = "xmui-icon-wait-for-ticket"),
      (t.Checked = "xmui-icon-checked"),
      (t.Unchecked = "xmui-icon-unchecked"),
      (t.Checkmark = "xmui-icon-checkmark"),
      (t.Cancellation = "xmui-icon-cancellation"),
      (t.Expiration = "xmui-icon-expired"),
      (t.Information = "xmui-icon-information"),
      (t.Confirmation = "xmui-icon-confirmation"),
      (t.Rejection = "xmui-icon-rejection"),
      (t.AuthLocked = "xmui-icon-locked"),
      (t.Error = "xmui-icon-error"),
      (t.Unregister = "xmui-icon-unregister"),
      (t.Fallback = "xmui-icon-fallback"),
      (t.Promotion = "xmui-icon-promotion"),
      (t.PasswordAuth = "xmui-icon-password-auth"),
      (t.PincodeAuth = "xmui-icon-pincode-auth"),
      (t.PatternAuth = "xmui-icon-pattern-auth"),
      (t.OtpAuth = "xmui-icon-otp-auth"),
      (t.VoiceAuth = "xmui-icon-voice-auth"),
      (t.QuestionsAuth = "xmui-icon-questions-auth"),
      (t.TotpAuth = "xmui-icon-totp-auth"),
      (t.MobileApproveAuth = "xmui-icon-mobile-approve-auth"),
      (t.GenericAuth = "xmui-icon-generic-auth"),
      (t.SmsChannel = "xmui-icon-sms-channel"),
      (t.EmailChannel = "xmui-icon-email-channel"),
      (t.PushChannel = "xmui-icon-push-channel"),
      (t.VoiceChannel = "xmui-icon-voice-channel");
  })(I || (I = {}));
  var U = "xmui-page",
    H = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(this, r(e).call(this))).className = U),
          (o.role = "dialog"),
          (o.headerPanel = new L()),
          (o.headerSeparator = new T()),
          (o.headerSeparator.className = "".concat(
            U,
            "_header-info-separator"
          )),
          o.appendChildren(o.headerPanel, o.headerSeparator),
          (o.infoPanel = new N()),
          (o.infoPanel.show = !1),
          o.appendChild(o.infoPanel),
          (o.contentContainer = new T()),
          (o.contentContainer.className = "".concat(U, "_content")),
          (o.busyIndicator = new j()),
          o.contentContainer.appendChild(o.busyIndicator),
          (o.busy = !1);
        var s = new T();
        return (
          (s.className = "".concat(U, "_content-actions-separator")),
          (o.actionPanel = new q()),
          o.appendChildren(o.contentContainer, s, o.actionPanel),
          (o.automationId = t),
          o.addClass(i),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setInstructions",
            value: function (t) {
              this.infoPanel.setInstructions(t), (this.infoPanel.show = !0);
            },
          },
          {
            key: "setUserName",
            value: function (t) {
              this.headerPanel.setText(t), this.headerPanel.setIcon(I.User);
            },
          },
          {
            key: "blockInteraction",
            value: function () {
              this.element.blockInteraction();
            },
          },
          {
            key: "unblockInteraction",
            value: function () {
              this.element.unblockInteraction();
            },
          },
          {
            key: "setContent",
            value: function (t) {
              this.contentContainer.appendChild(t);
            },
          },
          {
            key: "setTitle",
            value: function (t) {
              this.infoPanel.setTitle(t), (this.infoPanel.show = !0);
            },
          },
          {
            key: "addLeftButton",
            value: function (t) {
              this.actionPanel.addLeftButton(t);
            },
          },
          {
            key: "addRightButton",
            value: function (t) {
              this.actionPanel.addRightButton(t);
            },
          },
          {
            key: "busy",
            set: function (t) {
              this.busyIndicator.show = t;
            },
          },
          {
            key: "error",
            set: function (t) {
              this.infoPanel.error = t;
            },
          },
        ]),
        e
      );
    })(T),
    Q = function t() {
      n(this, t);
    };
  (Q.button_cancel = "xmui-button-cancel"),
    (Q.button_back = "xmui-button-back"),
    (Q.button_abort = "xmui-button-abort"),
    (Q.button_retry = "xmui-button-retry"),
    (Q.button_continue = "xmui-button-continue"),
    (Q.button_reset = "xmui-button-reset"),
    (Q.button_change_method = "xmui-button-change-method"),
    (Q.button_select_method = "xmui-button-select-method"),
    (Q.button_send_to_all = "xmui-button-send-to-all"),
    (Q.button_actions_list = "xmui-button-actions-list"),
    (Q.button_skip = "xmui-button-skip"),
    (Q.button_rename = "xmui-button-rename"),
    (Q.button_identify = "xmui-button-identify"),
    (Q.button_remove = "xmui-button-remove"),
    (Q.button_escape = "xmui-button-escape"),
    (Q.list_actions = "xmui-list-actions"),
    (Q.list_item_text_state = "xmui-list-item-text-state"),
    (Q.list_item_icon_state = "xmui-list-item-icon-state"),
    (Q.dialog_recovery = "xmui-dialog-recovery"),
    (Q.dialog_cancellation = "xmui-dialog-cancellation"),
    (Q.dialog_confirm = "xmui-dialog-confirm"),
    (Q.dialog_information = "xmui-dialog-information"),
    (Q.dialog_title = "xmui-dialog-title"),
    (Q.dialog_message = "xmui-dialog-message"),
    (Q.dialog_fallback = "xmui-dialog-fallback"),
    (Q.dialog_registration_promotion_intro =
      "xmui-dialog-registration-promotion-intro"),
    (Q.popup_dialog_confirm = "xmui-popup-dialog-confirm"),
    (Q.popup_dialog_input = "xmui-popup-dialog-input"),
    (Q.input_password = "xmui-input-password"),
    (Q.input_repeat_password = "xmui-input-repeat-password"),
    (Q.input_pin_code = "xmui-input-pin-code"),
    (Q.input_pattern_lock = "xmui-input-pattern-lock"),
    (Q.input_otp_code = "xmui-input-otp-code"),
    (Q.input_totp_code = "xmui-input-totp-code"),
    (Q.input_text = "xmui-input-text"),
    (Q.input_email = "xmui-input-email"),
    (Q.input_security_question = "xmui-input-security-question"),
    (Q.input_mobile_phone_number = "xmui-input-mobile-phone-number"),
    (Q.input_mobile_phone_coutry_code = "xmui-input-mobile-phone-country-code"),
    (Q.page_password_auth = "xmui-page-password-auth"),
    (Q.page_password_reg = "xmui-page-password-reg"),
    (Q.page_pin_auth = "xmui-page-pin-auth"),
    (Q.page_pin_reg = "xmui-page-pin-reg"),
    (Q.page_pattern_auth = "xmui-page-pattern-auth"),
    (Q.page_pattern_reg = "xmui-page-pattern-reg"),
    (Q.page_otp_auth = "xmui-page-otp-auth"),
    (Q.page_totp_auth = "xmui-page-totp-auth"),
    (Q.page_ticket_wait = "xmui-page-ticket-wait"),
    (Q.page_mobile_approve = "xmui-page-mobile-approve"),
    (Q.page_select_device = "xmui-page-select-device"),
    (Q.page_otp_select_channel = "xmui-page_otp_select_channel"),
    (Q.page_configure_authenticators = "xmui-page-configure-authenticators"),
    (Q.page_manage_devices = "xmui-page-manage-devices"),
    (Q.page_select_device_to_manage = "xmui-page-select-managed-device"),
    (Q.page_select_authenticator = "xmui-page-select-authenticator"),
    (Q.page_dynamic_form = "xmui-page-dynamic-form"),
    (Q.page_security_questions_auth = "xmui-page-security-questions-auth"),
    (Q.page_security_questions_reg = "xmui-page-security-questions-reg");
  var K,
    V = "xmui-dialog-content",
    z = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).className = V),
          (t.ariaRole = "dialog"),
          (t.ariaLabeledBy = "".concat(V, "_title")),
          (t.ariaDescribedBy = "".concat(V, "_message")),
          t.createContent(),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setDialogTitle",
            value: function (t) {
              this.titleComp.setText(t);
            },
          },
          {
            key: "setDialogMessage",
            value: function (t) {
              this.messageComp.setText(t);
            },
          },
          {
            key: "setDialogIconClass",
            value: function (t) {
              this.iconComp.className = "".concat(V, "_icon ").concat(t);
            },
          },
          {
            key: "createContent",
            value: function () {
              (this.iconComp = new T()),
                (this.iconComp.className = "".concat(V, "_icon")),
                (this.titleComp = new A()),
                (this.titleComp.className = "".concat(V, "_title")),
                (this.titleComp.automationId = Q.dialog_title),
                (this.messageComp = new A()),
                (this.messageComp.className = "".concat(V, "_message")),
                (this.messageComp.automationId = Q.dialog_message),
                this.appendChildren(
                  this.iconComp,
                  this.titleComp,
                  this.messageComp
                );
            },
          },
        ]),
        e
      );
    })(T),
    W = (function (t) {
      function e(t, i) {
        var o;
        return (
          n(this, e),
          ((o = l(
            this,
            r(e).call(this, t, i)
          )).handleClick = o.handleClick.bind(u(o))),
          (o.dialogContent = new z()),
          o.setContent(o.dialogContent),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addLeftButton",
            value: function (t) {
              t.onClick(this.handleClick),
                h(r(e.prototype), "addLeftButton", this).call(this, t);
            },
          },
          {
            key: "addRightButton",
            value: function (t) {
              t.onClick(this.handleClick),
                h(r(e.prototype), "addRightButton", this).call(this, t);
            },
          },
          {
            key: "setDialogTitle",
            value: function (t) {
              this.dialogContent.setDialogTitle(t);
            },
          },
          {
            key: "setDialogMessage",
            value: function (t) {
              this.dialogContent.setDialogMessage(t);
            },
          },
          {
            key: "setDialogIconClass",
            value: function (t) {
              this.dialogContent.setDialogIconClass(t);
            },
          },
          {
            key: "onSelect",
            value: function (t) {
              this.onSelectCB = t;
            },
          },
          {
            key: "handleClick",
            value: function (t) {
              this.onSelectCB(t.value);
            },
          },
        ]),
        e
      );
    })(H),
    Z = {
      ts_gen_back: "ts_gen_back",
      ts_gen_skip: "ts_gen_skip",
      ts_gen_continue: "ts_gen_continue",
      ts_gen_cancel: "ts_gen_cancel",
      ts_gen_close: "ts_gen_close",
      ts_gen_ok: "ts_gen_ok",
      ts_gen_default: "ts_gen_default",
      ts_gen_restart: "ts_gen_restart",
      ts_gen_expired: "ts_gen_expired",
      ts_gen_cancel_authentication: "ts_gen_cancel_authentication",
      ts_gen_change_authenticator: "ts_gen_change_authenticator",
      ts_gen_select_authenticator: "ts_gen_select_authenticator",
      ts_gen_retry_authenticator: "ts_gen_retry_authenticator",
      ts_gen_dismiss: "ts_gen_dismiss",
      ts_authenticator_device_biometrics: "ts_authenticator_device_biometrics",
      ts_authenticator_password: "ts_authenticator_password",
      ts_authenticator_pin: "ts_authenticator_pin",
      ts_authenticator_pattern: "ts_authenticator_pattern",
      ts_authenticator_otp: "ts_authenticator_otp",
      ts_authenticator_fingerprint: "ts_authenticator_fingerprint",
      ts_authenticator_question: "ts_authenticator_question",
      ts_authenticator_face_id: "ts_authenticator_face_id",
      ts_authenticator_touch_id: "ts_authenticator_touch_id",
      ts_authenticator_totp: "ts_authenticator_totp",
      ts_authenticator_pattern_centralized:
        "ts_authenticator_pattern_centralized",
      ts_authenticator_pin_centralized: "ts_authenticator_pin_centralized",
      ts_authenticator_voice_server: "ts_authenticator_voice_server",
      ts_authenticator_fido2: "ts_authenticator_fido2",
      ts_authenticator_mobile_approve: "ts_authenticator_mobile_approve",
      ts_authenticator_face_server: "ts_authenticator_face_server",
      ts_authenticator_fido_fidopin: "ts_authenticator_fido_fidopin",
      ts_authenticator_fido_fidoface: "ts_authenticator_fido_fidoface",
      ts_authenticator_fido_fidofp: "ts_authenticator_fido_fidofp",
      ts_authenticator_device_biometrics_description:
        "ts_authenticator_device_biometrics_description",
      ts_authenticator_password_description:
        "ts_authenticator_password_description",
      ts_authenticator_pin_description: "ts_authenticator_pin_description",
      ts_authenticator_pin_centralized_description:
        "ts_authenticator_pin_centralized_description",
      ts_authenticator_pattern_description:
        "ts_authenticator_pattern_description",
      ts_authenticator_pattern_centralized_description:
        "ts_authenticator_pattern_centralized_description",
      ts_authenticator_otp_description: "ts_authenticator_otp_description",
      ts_authenticator_voice_description: "ts_authenticator_voice_description",
      ts_authenticator_voice_server_description:
        "ts_authenticator_voice_server_description",
      ts_authenticator_questions_description:
        "ts_authenticator_questions_description",
      ts_authenticator_face_description: "ts_authenticator_face_description",
      ts_authenticator_fingerprint_description:
        "ts_authenticator_fingerprint_description",
      ts_authenticator_face_id_description:
        "ts_authenticator_face_id_description",
      ts_authenticator_touch_id_description:
        "ts_authenticator_touch_id_description",
      ts_authenticator_totp_description: "ts_authenticator_totp_description",
      ts_authenticator_mobile_approve_description:
        "ts_authenticator_mobile_approve_description",
      ts_authenticator_fido2_description: "ts_authenticator_fido2_description",
      ts_authenticator_password_title_auth:
        "ts_authenticator_password_title_auth",
      ts_authenticator_password_title_reg:
        "ts_authenticator_password_title_reg",
      ts_authenticator_password_intro_auth:
        "ts_authenticator_password_intro_auth",
      ts_authenticator_password_intro_reg:
        "ts_authenticator_password_intro_reg",
      ts_authenticator_password_field_hint:
        "ts_authenticator_password_field_hint",
      ts_authenticator_password_reg_field_hint:
        "ts_authenticator_password_reg_field_hint",
      ts_authenticator_password_cta_positive:
        "ts_authenticator_password_cta_positive",
      ts_authenticator_password_error_too_short:
        "ts_authenticator_password_error_too_short",
      ts_authenticator_password_error_reg_no_match:
        "ts_authenticator_password_error_reg_no_match",
      ts_authenticator_password_error_reg_strength_validation_failed:
        "ts_authenticator_password_error_reg_strength_validation_failed",
      ts_authenticator_pin_title_auth: "ts_authenticator_pin_title_auth",
      ts_authenticator_pin_title_reg: "ts_authenticator_pin_title_reg",
      ts_authenticator_pin_intro_auth: "ts_authenticator_pin_intro_auth",
      ts_authenticator_pin_intro_reg: "ts_authenticator_pin_intro_reg",
      ts_authenticator_pin_intro_repeat: "ts_authenticator_pin_intro_repeat",
      ts_authenticator_pin_error_reg_no_match:
        "ts_authenticator_pin_error_reg_no_match",
      ts_authenticator_pin_code_length: "ts_authenticator_pin_code_length",
      ts_authenticator_otp_title_auth: "ts_authenticator_otp_title_auth",
      ts_authenticator_otp_qr_title: "ts_authenticator_otp_qr_title",
      ts_authenticator_otp_targets_intro: "ts_authenticator_otp_targets_intro",
      ts_authenticator_otp_sms_title: "ts_authenticator_otp_sms_title",
      ts_authenticator_otp_email_title: "ts_authenticator_otp_email_title",
      ts_authenticator_otp_voice_title: "ts_authenticator_otp_voice_title",
      ts_authenticator_otp_push_title: "ts_authenticator_otp_push_title",
      ts_authenticator_otp_unknown_title: "ts_authenticator_otp_unknown_title",
      ts_authenticator_otp_sms_sent: "ts_authenticator_otp_sms_sent",
      ts_authenticator_otp_email_sent: "ts_authenticator_otp_email_sent",
      ts_authenticator_otp_push_sent: "ts_authenticator_otp_push_sent",
      ts_authenticator_otp_voice_sent: "ts_authenticator_otp_voice_sent",
      ts_authenticator_otp_qr_sent: "ts_authenticator_otp_qr_sent",
      ts_authenticator_otp_external_numeric_sent:
        "ts_authenticator_otp_external_numeric_sent",
      ts_authenticator_otp_external_qr_sent:
        "ts_authenticator_otp_external_qr_sent",
      ts_authenticator_otp_resend: "ts_authenticator_otp_resend",
      ts_authenticator_otp_resend_message:
        "ts_authenticator_otp_resend_message",
      ts_authenticator_otp_resend_intro: "ts_authenticator_otp_resend_intro",
      ts_authenticator_otp_error_qr_permission:
        "ts_authenticator_otp_error_qr_permission",
      ts_authenticator_otp_error_code_expired:
        "ts_authenticator_otp_error_code_expired",
      ts_authenticator_otp_code_length: "ts_authenticator_otp_code_length",
      ts_authenticator_pattern_title_auth:
        "ts_authenticator_pattern_title_auth",
      ts_authenticator_pattern_title_reg: "ts_authenticator_pattern_title_reg",
      ts_authenticator_pattern_intro_auth:
        "ts_authenticator_pattern_intro_auth",
      ts_authenticator_pattern_intro_reg: "ts_authenticator_pattern_intro_reg",
      ts_authenticator_pattern_mismatch: "ts_authenticator_pattern_mismatch",
      ts_authenticator_pattern_error_min_points:
        "ts_authenticator_pattern_error_min_points",
      ts_authenticator_pattern_intro_repeat:
        "ts_authenticator_pattern_intro_repeat",
      ts_authenticator_pattern_cta_reset: "ts_authenticator_pattern_cta_reset",
      ts_authenticator_fingerprint_title_auth:
        "ts_authenticator_fingerprint_title_auth",
      ts_authenticator_fingerprint_title_reg:
        "ts_authenticator_fingerprint_title_reg",
      ts_authenticator_fingerprint_status_hint:
        "ts_authenticator_fingerprint_status_hint",
      ts_authenticator_faceid_title_auth: "ts_authenticator_faceid_title_auth",
      ts_authenticator_faceid_title_reg: "ts_authenticator_faceid_title_reg",
      ts_authenticator_touchid_title_reg: "ts_authenticator_touchid_title_reg",
      ts_authenticator_touchid_title_auth:
        "ts_authenticator_touchid_title_auth",
      ts_authenticator_device_biometrics_title_auth:
        "ts_authenticator_device_biometrics_title_auth",
      ts_authenticator_device_biometrics_title_reg:
        "ts_authenticator_device_biometrics_title_reg",
      ts_authenticator_device_biometrics_intro_auth:
        "ts_authenticator_device_biometrics_intro_auth",
      ts_authenticator_device_biometrics_intro_reg:
        "ts_authenticator_device_biometrics_intro_reg",
      ts_authenticator_device_biometrics_prompt:
        "ts_authenticator_device_biometrics_prompt",
      ts_authenticator_device_biometrics_cancel_cta:
        "ts_authenticator_device_biometrics_cancel_cta",
      ts_authenticator_questions_title_auth:
        "ts_authenticator_questions_title_auth",
      ts_authenticator_questions_title_reg:
        "ts_authenticator_questions_title_reg",
      ts_authenticator_questions_intro_auth:
        "ts_authenticator_questions_intro_auth",
      ts_authenticator_questions_intro_reg:
        "ts_authenticator_questions_intro_reg",
      ts_authenticator_questions_left: "ts_authenticator_questions_left",
      ts_authenticator_questions_error_answer_empty:
        "ts_authenticator_questions_error_answer_empty",
      ts_authenticator_voice_title_auth: "ts_authenticator_voice_title_auth",
      ts_authenticator_voice_title_reg: "ts_authenticator_voice_title_reg",
      ts_authenticator_voice_intro_auth: "ts_authenticator_voice_intro_auth",
      ts_authenticator_voice_intro_reg: "ts_authenticator_voice_intro_reg",
      ts_authenticator_voice_passphrase: "ts_authenticator_voice_passphrase",
      ts_authenticator_voice_passphrase_subtitle:
        "ts_authenticator_voice_passphrase_subtitle",
      ts_authenticator_voice_instructions:
        "ts_authenticator_voice_instructions",
      ts_authenticator_voice_record_start:
        "ts_authenticator_voice_record_start",
      ts_authenticator_voice_record_stop: "ts_authenticator_voice_record_stop",
      ts_authenticator_voice_request_audio_permission:
        "ts_authenticator_voice_request_audio_permission",
      ts_authenticator_voice_error_too_long:
        "ts_authenticator_voice_error_too_long",
      ts_authenticator_voice_error_too_short:
        "ts_authenticator_voice_error_too_short",
      ts_authenticator_voice_error_too_loud:
        "ts_authenticator_voice_error_too_loud",
      ts_authenticator_voice_error_too_weak:
        "ts_authenticator_voice_error_too_weak",
      ts_authenticator_voice_error_too_noisy:
        "ts_authenticator_voice_error_too_noisy",
      ts_authenticator_voice_error_invalid:
        "ts_authenticator_voice_error_invalid",
      ts_authenticator_face_title_auth: "ts_authenticator_face_title_auth",
      ts_authenticator_face_title_reg: "ts_authenticator_face_title_reg",
      ts_authenticator_face_intro_auth: "ts_authenticator_face_intro_auth",
      ts_authenticator_face_intro_reg: "ts_authenticator_face_intro_reg",
      ts_authenticator_face_error_invalid:
        "ts_authenticator_face_error_invalid",
      ts_authenticator_totp_title: "ts_authenticator_totp_title",
      ts_authenticator_totp_targets_intro:
        "ts_authenticator_totp_targets_intro",
      ts_authenticator_totp_input_intro: "ts_authenticator_totp_input_intro",
      ts_authenticator_totp_input_with_challenge_intro:
        "ts_authenticator_totp_input_with_challenge_intro",
      ts_authenticator_totp_input_with_qr_challenge_intro:
        "ts_authenticator_totp_input_with_qr_challenge_intro",
      ts_authenticator_totp_qrcode_challenge_step1_message:
        "ts_authenticator_totp_qrcode_challenge_step1_message",
      ts_authenticator_totp_qrcode_challenge_step2_message:
        "ts_authenticator_totp_qrcode_challenge_step2_message",
      ts_authenticator_totp_code_challenge_step1_message:
        "ts_authenticator_totp_code_challenge_step1_message",
      ts_authenticator_totp_code_challenge_step2_message:
        "ts_authenticator_totp_code_challenge_step2_message",
      ts_authenticator_totp_input_hint: "ts_authenticator_totp_input_hint",
      ts_authenticator_totp_targets_recently_used:
        "ts_authenticator_totp_targets_recently_used",
      ts_authenticator_totp_targets_current_device:
        "ts_authenticator_totp_targets_current_device",
      ts_authenticator_mobile_approve_title:
        "ts_authenticator_mobile_approve_title",
      ts_authenticator_mobile_approve_fetching_data:
        "ts_authenticator_mobile_approve_fetching_data",
      ts_authenticator_mobile_approve_send:
        "ts_authenticator_mobile_approve_send",
      ts_authenticator_mobile_approve_send_to_all:
        "ts_authenticator_mobile_approve_send_to_all",
      ts_authenticator_mobile_approve_targets_intro:
        "ts_authenticator_mobile_approve_targets_intro",
      ts_authenticator_mobile_approve_targets_recently_used:
        "ts_authenticator_mobile_approve_targets_recently_used",
      ts_authenticator_mobile_approve_targets_current_device:
        "ts_authenticator_mobile_approve_targets_current_device",
      ts_authenticator_mobile_approve_resend_message:
        "ts_authenticator_mobile_approve_resend_message",
      ts_authenticator_mobile_approve_resend_cta:
        "ts_authenticator_mobile_approve_resend_cta",
      ts_session_config_title: "ts_session_config_title",
      ts_session_config_intro: "ts_session_config_intro",
      ts_session_config_item_action_register:
        "ts_session_config_item_action_register",
      ts_session_config_item_action_unregister:
        "ts_session_config_item_action_unregister",
      ts_session_config_item_action_reregister:
        "ts_session_config_item_action_reregister",
      ts_session_config_item_action_set_as_default:
        "ts_session_config_item_action_set_as_default",
      ts_session_config_item_register_result:
        "ts_session_config_item_register_result",
      ts_session_config_item_reregister_result:
        "ts_session_config_item_reregister_result",
      ts_session_config_item_unregister_result:
        "ts_session_config_item_unregister_result",
      ts_session_config_item_default_result:
        "ts_session_config_item_default_result",
      ts_session_config_item_register_failed:
        "ts_session_config_item_register_failed",
      ts_session_config_item_reregister_failed:
        "ts_session_config_item_reregister_failed",
      ts_session_config_item_unregister_failed:
        "ts_session_config_item_unregister_failed",
      ts_session_config_item_default_failed:
        "ts_session_config_item_default_failed",
      ts_session_config_item_unregister_dialog_title:
        "ts_session_config_item_unregister_dialog_title",
      ts_session_config_item_unregister_dialog_message:
        "ts_session_config_item_unregister_dialog_message",
      ts_session_config_item_unregister_dialog_cta:
        "ts_session_config_item_unregister_dialog_cta",
      ts_session_config_error_dialog_title:
        "ts_session_config_error_dialog_title",
      ts_session_totp_title: "ts_session_totp_title",
      ts_session_totp_content: "ts_session_totp_content",
      ts_session_totp_unbound_title: "ts_session_totp_unbound_title",
      ts_session_totp_unbound_content: "ts_session_totp_unbound_content",
      ts_session_totp_unbound_code: "ts_session_totp_unbound_code",
      ts_session_totp_nottl_content: "ts_session_totp_nottl_content",
      ts_session_totp_provision_sa_title: "ts_session_totp_provision_sa_title",
      ts_session_totp_provision_password_title:
        "ts_session_totp_provision_password_title",
      ts_session_totp_provision_pattern_title:
        "ts_session_totp_provision_pattern_title",
      ts_session_totp_provision_pin_title:
        "ts_session_totp_provision_pin_title",
      ts_session_totp_generation_sa_title:
        "ts_session_totp_generation_sa_title",
      ts_session_totp_generation_password_title:
        "ts_session_totp_generation_password_title",
      ts_session_totp_generation_pattern_title:
        "ts_session_totp_generation_pattern_title",
      ts_session_totp_generation_pin_title:
        "ts_session_totp_generation_pin_title",
      ts_session_totp_generation_fingerprint_title:
        "ts_session_totp_generation_fingerprint_title",
      ts_session_totp_generation_device_biometrics_title:
        "ts_session_totp_generation_device_biometrics_title",
      ts_session_totp_challenge_title_list:
        "ts_session_totp_challenge_title_list",
      ts_session_totp_challenge_intro_list:
        "ts_session_totp_challenge_intro_list",
      ts_session_totp_challenge_title_textual:
        "ts_session_totp_challenge_title_textual",
      ts_session_totp_challenge_intro_textual:
        "ts_session_totp_challenge_intro_textual",
      ts_session_totp_challenge_title_qr: "ts_session_totp_challenge_title_qr",
      ts_session_totp_challenge_intro_qr: "ts_session_totp_challenge_intro_qr",
      ts_session_approval_approve: "ts_session_approval_approve",
      ts_session_approval_deny: "ts_session_approval_deny",
      ts_session_approval_completed_title:
        "ts_session_approval_completed_title",
      ts_session_approval_completed_subtitle:
        "ts_session_approval_completed_subtitle",
      ts_session_approval_completed_denied_subtitle:
        "ts_session_approval_completed_denied_subtitle",
      ts_session_approval_dialog_title: "ts_session_approval_dialog_title",
      ts_session_approval_dialog_message: "ts_session_approval_dialog_message",
      ts_session_approval_dialog_cta: "ts_session_approval_dialog_cta",
      ts_session_approval_approve_failed: "ts_session_approval_approve_failed",
      ts_session_approval_deny_failed: "ts_session_approval_deny_failed",
      ts_session_dm_title: "ts_session_dm_title",
      ts_session_dm_intro: "ts_session_dm_intro",
      ts_session_dm_section_current: "ts_session_dm_section_current",
      ts_session_dm_section_others: "ts_session_dm_section_others",
      ts_session_dm_last_used_date: "ts_session_dm_last_used_date",
      ts_session_dm_last_used_location: "ts_session_dm_last_used_location",
      ts_session_dm_added_at: "ts_session_dm_added_at",
      ts_session_dm_details_title: "ts_session_dm_details_title",
      ts_session_dm_details_subtitle: "ts_session_dm_details_subtitle",
      ts_session_dm_details_current_device:
        "ts_session_dm_details_current_device",
      ts_session_dm_details_push_title: "ts_session_dm_details_push_title",
      ts_session_dm_details_push_subtitle:
        "ts_session_dm_details_push_subtitle",
      ts_session_dm_details_push_action: "ts_session_dm_details_push_action",
      ts_session_dm_details_rename_action:
        "ts_session_dm_details_rename_action",
      ts_session_dm_details_remove_subtitle:
        "ts_session_dm_details_remove_subtitle",
      ts_session_dm_details_remove_action:
        "ts_session_dm_details_remove_action",
      ts_session_dm_details_no_other_devices_available:
        "ts_session_dm_details_no_other_devices_available",
      ts_session_dm_item_action_dialog_remove_title:
        "ts_session_dm_item_action_dialog_remove_title",
      ts_session_dm_item_action_dialog_remove_message:
        "ts_session_dm_item_action_dialog_remove_message",
      ts_session_dm_item_action_dialog_remove_cta:
        "ts_session_dm_item_action_dialog_remove_cta",
      ts_session_dm_item_action_dialog_rename_title:
        "ts_session_dm_item_action_dialog_rename_title",
      ts_session_dm_item_action_dialog_rename_cta:
        "ts_session_dm_item_action_dialog_rename_cta",
      ts_session_dm_details_rename_input_hint:
        "ts_session_dm_details_rename_input_hint",
      ts_session_dm_item_action_rename_result_positive:
        "ts_session_dm_item_action_rename_result_positive",
      ts_session_dm_item_action_rename_result_negative:
        "ts_session_dm_item_action_rename_result_negative",
      ts_session_dm_item_action_remove_result_positive:
        "ts_session_dm_item_action_remove_result_positive",
      ts_session_dm_item_action_remove_result_negative:
        "ts_session_dm_item_action_remove_result_negative",
      ts_session_dm_item_action_identify_result_positive:
        "ts_session_dm_item_action_identify_result_positive",
      ts_session_dm_item_action_identify_result_negative:
        "ts_session_dm_item_action_identify_result_negative",
      ts_session_dm_error_dialog_title: "ts_session_dm_error_dialog_title",
      ts_session_promotion_title: "ts_session_promotion_title",
      ts_session_promotion_intro: "ts_session_promotion_intro",
      ts_session_promotion_skip: "ts_session_promotion_skip",
      ts_session_promotion_abort: "ts_session_promotion_abort",
      ts_promise_sa_title: "ts_promise_sa_title",
      ts_promise_sa_content: "ts_promise_sa_content",
      ts_promise_co_title_auth: "ts_promise_co_title_auth",
      ts_promise_co_title_reg: "ts_promise_co_title_reg",
      ts_promise_fallback_title: "ts_promise_fallback_title",
      ts_promise_fallback_content: "ts_promise_fallback_content",
      ts_promise_fallback_action_fallback:
        "ts_promise_fallback_action_fallback",
      ts_promise_fallback_action_menu: "ts_promise_fallback_action_menu",
      ts_promise_fallback_action_retry: "ts_promise_fallback_action_retry",
      ts_promise_fallback_action_cancel: "ts_promise_fallback_action_cancel",
      ts_promise_co_content: "ts_promise_co_content",
      ts_promise_co_abort: "ts_promise_co_abort",
      ts_promise_co_select: "ts_promise_co_select",
      ts_promise_co_change: "ts_promise_co_change",
      ts_promise_co_retry: "ts_promise_co_retry",
      ts_promise_error_default_title_auth:
        "ts_promise_error_default_title_auth",
      ts_promise_error_default_title_reg: "ts_promise_error_default_title_reg",
      ts_promise_error_default_content_auth:
        "ts_promise_error_default_content_auth",
      ts_promise_error_default_content_reg:
        "ts_promise_error_default_content_reg",
      ts_promise_error_lock_title: "ts_promise_error_lock_title",
      ts_promise_error_lock_content: "ts_promise_error_lock_content",
      ts_promise_invalid_authenticator_title:
        "ts_promise_invalid_authenticator_title",
      ts_promise_invalid_authenticator_content:
        "ts_promise_invalid_authenticator_content",
      ts_promise_invalid_authenticator_cta:
        "ts_promise_invalid_authenticator_cta",
      ts_promise_rejection_policy_title: "ts_promise_rejection_policy_title",
      ts_promise_rejection_policy_content:
        "ts_promise_rejection_policy_content",
      ts_promise_rejection_policy_cta: "ts_promise_rejection_policy_cta",
      ts_promise_rejection_locked_user_title:
        "ts_promise_rejection_locked_user_title",
      ts_promise_rejection_locked_user_content:
        "ts_promise_rejection_locked_user_content",
      ts_promise_rejection_locked_user_cta:
        "ts_promise_rejection_locked_user_cta",
      ts_promise_rejection_locked_device_title:
        "ts_promise_rejection_locked_device_title",
      ts_promise_rejection_locked_device_content:
        "ts_promise_rejection_locked_device_content",
      ts_promise_rejection_locked_device_cta:
        "ts_promise_rejection_locked_device_cta",
      ts_promise_rejection_locked_application_title:
        "ts_promise_rejection_locked_application_title",
      ts_promise_rejection_locked_application_content:
        "ts_promise_rejection_locked_application_content",
      ts_promise_rejection_locked_application_cta:
        "ts_promise_rejection_locked_application_cta",
      ts_promise_rejection_approval_expired_title:
        "ts_promise_rejection_approval_expired_title",
      ts_promise_rejection_approval_expired_content:
        "ts_promise_rejection_approval_expired_content",
      ts_promise_rejection_approval_expired_cta:
        "ts_promise_rejection_approval_expired_cta",
      ts_session_authenticator_expired_title:
        "ts_session_authenticator_expired_title",
      ts_session_authenticator_expired_content:
        "ts_session_authenticator_expired_content",
      ts_promise_rejection_feature_not_supported_title:
        "ts_promise_rejection_feature_not_supported_title",
      ts_promise_rejection_feature_not_supported_content:
        "ts_promise_rejection_feature_not_supported_content",
      ts_promise_rejection_feature_not_supported_cta:
        "ts_promise_rejection_feature_not_supported_cta",
      ts_promise_rejection_cannot_consume_ticket_title:
        "ts_promise_rejection_cannot_consume_ticket_title",
      ts_promise_rejection_cannot_consume_ticket_content:
        "ts_promise_rejection_cannot_consume_ticket_content",
      ts_promise_rejection_cannot_consume_ticket_cta:
        "ts_promise_rejection_cannot_consume_ticket_cta",
      ts_promise_rejection_username_already_exists_title:
        "ts_promise_rejection_username_already_exists_title",
      ts_promise_rejection_username_already_exists_content:
        "ts_promise_rejection_username_already_exists_content",
      ts_promise_rejection_username_already_exists_cta:
        "ts_promise_rejection_username_already_exists_cta",
      ts_promise_rejection_authenticator_fatal_error_title:
        "ts_promise_rejection_authenticator_fatal_error_title",
      ts_promise_rejection_authenticator_fatal_error_content:
        "ts_promise_rejection_authenticator_fatal_error_content",
      ts_promise_rejection_authenticator_fatal_error_cta:
        "ts_promise_rejection_authenticator_fatal_error_cta",
      ts_accessibility_totp_reset: "ts_accessibility_totp_reset",
      ts_accessibility_totp_reader: "ts_accessibility_totp_reader",
      ts_accessibility_totp_no_ttl: "ts_accessibility_totp_no_ttl",
      ts_accessibility_configuration_cta_register:
        "ts_accessibility_configuration_cta_register",
      ts_accessibility_configuration_cta_unregister:
        "ts_accessibility_configuration_cta_unregister",
      ts_accessibility_configuration_cta_reregister:
        "ts_accessibility_configuration_cta_reregister",
      ts_accessibility_input_reader: "ts_accessibility_input_reader",
      ts_accessibility_input_pin_cell: "ts_accessibility_input_pin_cell",
      ts_accessibility_input_reset: "ts_accessibility_input_reset",
      ts_accessibility_authenticator_list_locked:
        "ts_accessibility_authenticator_list_locked",
      ts_accessibility_authenticator_list_disabled:
        "ts_accessibility_authenticator_list_disabled",
      ts_accessibility_authenticator_list_enabled:
        "ts_accessibility_authenticator_list_enabled",
      ts_accessibility_authenticator_list_default:
        "ts_accessibility_authenticator_list_default",
      ts_accessibility_hide_input_field: "ts_accessibility_hide_input_field",
      ts_accessibility_show_input_field: "ts_accessibility_show_input_field",
      ts_accessibility_back: "ts_accessibility_back",
      ts_accessibility_cancel: "ts_accessibility_cancel",
      ts_accessibility_password_enter_password:
        "ts_accessibility_password_enter_password",
      ts_accessibility_password_enter_password_again:
        "ts_accessibility_password_enter_password_again",
      ts_accessibility_password_error_reg_no_match:
        "ts_accessibility_password_error_reg_no_match",
      ts_plugin_dynamic_form_mandatory: "ts_plugin_dynamic_form_mandatory",
      ts_plugin_dynamic_form_error_mandatory:
        "ts_plugin_dynamic_form_error_mandatory",
      ts_plugin_dynamic_form_error_invalid:
        "ts_plugin_dynamic_form_error_invalid",
      ts_plugin_dynamic_form_error_too_long:
        "ts_plugin_dynamic_form_error_too_long",
      ts_plugin_dynamic_form_error_not_phone:
        "ts_plugin_dynamic_form_error_not_phone",
      ts_plugin_dynamic_form_error_not_email:
        "ts_plugin_dynamic_form_error_not_email",
      ts_plugin_dynamic_form_error_else: "ts_plugin_dynamic_form_error_else",
      ts_plugin_dynamic_form_table_title: "ts_plugin_dynamic_form_table_title",
      ts_plugin_dynamic_form_table_title_item:
        "ts_plugin_dynamic_form_table_title_item",
      ts_plugin_dynamic_form_error_general:
        "ts_plugin_dynamic_form_error_general",
      ts_plugin_dynamic_form_item_cta_positive:
        "ts_plugin_dynamic_form_item_cta_positive",
      ts_plugin_dynamic_form_item_cta_cancel:
        "ts_plugin_dynamic_form_item_cta_cancel",
      ts_plugin_dynamic_form_item_cta_select_all:
        "ts_plugin_dynamic_form_item_cta_select_all",
      ts_plugin_dynamic_form_item_cta_clear_all:
        "ts_plugin_dynamic_form_item_cta_clear_all",
      ts_session_scan_qr_title: "ts_session_scan_qr_title",
    },
    Y = 0,
    $ = {
      generate: function () {
        return ""
          .concat("xmui-id-")
          .concat(new Date().getTime().toString(), "-")
          .concat(++Y);
      },
    },
    X = "xmui-list-item",
    G = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(this, r(e).call(this))).key = t),
          (o.id = $.generate()),
          (o.className = X);
        var s = new T();
        return (
          (s.className = "".concat(X, "_hover-indicator")),
          (o.contentContainer = new T()),
          (o.contentContainer.className = "".concat(X, "_content-container")),
          o.appendChildren(s, o.contentContainer),
          i && o.addCheckbox(),
          (o.role = "option"),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setContent",
            value: function (t) {
              this.contentContainer.setContent(t);
            },
          },
          {
            key: "addCheckbox",
            value: function () {
              var t = new T();
              (t.className = "".concat(X, "_checkbox")), this.appendChild(t);
            },
          },
        ]),
        e
      );
    })(T);
  !(function (t) {
    (t[(t.Backspace = 8)] = "Backspace"),
      (t[(t.Tab = 9)] = "Tab"),
      (t[(t.Enter = 13)] = "Enter"),
      (t[(t.Shift = 16)] = "Shift"),
      (t[(t.Ctrl = 17)] = "Ctrl"),
      (t[(t.Alt = 18)] = "Alt"),
      (t[(t.Escape = 27)] = "Escape"),
      (t[(t.Space = 32)] = "Space"),
      (t[(t.PageUp = 33)] = "PageUp"),
      (t[(t.PageDown = 34)] = "PageDown"),
      (t[(t.End = 35)] = "End"),
      (t[(t.Home = 36)] = "Home"),
      (t[(t.LeftArrow = 37)] = "LeftArrow"),
      (t[(t.UpArrow = 38)] = "UpArrow"),
      (t[(t.RightArrow = 39)] = "RightArrow"),
      (t[(t.DownArrow = 40)] = "DownArrow"),
      (t[(t.Zero = 48)] = "Zero"),
      (t[(t.One = 49)] = "One"),
      (t[(t.Two = 50)] = "Two"),
      (t[(t.Three = 51)] = "Three"),
      (t[(t.Four = 52)] = "Four"),
      (t[(t.Five = 53)] = "Five"),
      (t[(t.Six = 54)] = "Six"),
      (t[(t.Seven = 55)] = "Seven"),
      (t[(t.Eight = 56)] = "Eight"),
      (t[(t.Nine = 57)] = "Nine");
  })(K || (K = {}));
  var J,
    tt = (function () {
      function t(e) {
        n(this, t),
          (this.container = e),
          (this.container.ariaActiveDescendant = ""),
          this.container.onKeydown(this.handleNavigation.bind(this));
      }
      return (
        o(t, [
          {
            key: "onSelect",
            value: function (t) {
              this.selectCB = t;
            },
          },
          {
            key: "activateItem",
            value: function (t) {
              t &&
                t !== this.activeItem &&
                (this.deactivateItem(),
                (this.activeItem = t),
                (t.active = !0),
                (this.container.ariaActiveDescendant = t.id),
                this.scrollToItem(t));
            },
          },
          {
            key: "deactivateItem",
            value: function (t) {
              var e =
                null == t || t === this.activeItem ? this.activeItem : null;
              e &&
                ((this.activeItem = null),
                (e.active = !1),
                (this.container.ariaActiveDescendant = ""));
            },
          },
          {
            key: "handleNavigation",
            value: function (t, e) {
              switch (e.keyCode) {
                case K.DownArrow:
                  this.handleDownArrow(),
                    e.preventDefault(),
                    e.stopPropagation();
                  break;
                case K.UpArrow:
                  this.handleUpArrow(), e.preventDefault(), e.stopPropagation();
                  break;
                case K.Enter:
                case K.Space:
                  this.handleEnter(), e.stopPropagation();
              }
            },
          },
          {
            key: "handleDownArrow",
            value: function () {
              var t = this.container.getNextChild(this.activeItem);
              this.activateItem(t);
            },
          },
          {
            key: "handleUpArrow",
            value: function () {
              var t = this.container.getPrevChild(this.activeItem);
              this.activateItem(t);
            },
          },
          {
            key: "handleEnter",
            value: function () {
              this.activeItem &&
                this.selectCB &&
                this.selectCB(this.activeItem);
            },
          },
          {
            key: "scrollToItem",
            value: function (t) {
              var e = this.container.htmlElement,
                n = t.htmlElement;
              if (e.scrollHeight > e.clientHeight) {
                var i = e.clientHeight + e.scrollTop,
                  o = n.offsetTop + n.offsetHeight;
                o > i
                  ? (e.scrollTop = o - e.clientHeight)
                  : n.offsetTop < e.scrollTop && (e.scrollTop = n.offsetTop);
              }
            },
          },
        ]),
        t
      );
    })();
  !(function (t) {
    (t[(t.None = 0)] = "None"),
      (t[(t.Single = 1)] = "Single"),
      (t[(t.SingleMouseup = 2)] = "SingleMouseup"),
      (t[(t.Multiple = 3)] = "Multiple");
  })(J || (J = {}));
  var et,
    nt,
    it,
    ot = (function (t) {
      function e() {
        var t,
          i =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : J.Single,
          o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).listSelectionMode = i),
          (t.activateOnHover = o),
          (t.selectionChangedCB = []),
          (t.itemClickedCB = []),
          (t.selectedItems = []),
          (t.ariaMultiselectable = i === J.Multiple),
          (t.handleItemClicked = t.handleItemClicked.bind(u(t))),
          (t.handleMouseEvents = t.handleMouseEvents.bind(u(t))),
          (t.handleItemMouseenter = t.handleItemMouseenter.bind(u(t))),
          (t.handleItemMouseleave = t.handleItemMouseleave.bind(u(t))),
          (t.keyboardNav = new tt(u(t))),
          t.keyboardNav.onSelect(function (e) {
            e && !e.disabled && t.handleSelectionChanged(e);
          }),
          t.onMouseup(t.handleMouseEvents),
          t.onMousedown(t.handleMouseEvents),
          t.onClick(t.handleMouseEvents),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onSelectionChanged",
            value: function (t) {
              this.selectionChangedCB.push(t);
            },
          },
          {
            key: "onItemClicked",
            value: function (t) {
              this.itemClickedCB.push(t);
            },
          },
          {
            key: "clearSelection",
            value: function () {
              this.selectedItems.forEach(function (t) {
                t.selected = !1;
              }),
                (this.selectedItems = []);
            },
          },
          {
            key: "clearActive",
            value: function () {
              this.deactivateItem();
            },
          },
          {
            key: "activateItem",
            value: function (t) {
              this.keyboardNav.activateItem(t);
            },
          },
          {
            key: "deactivateItem",
            value: function (t) {
              this.keyboardNav.deactivateItem(t);
            },
          },
          {
            key: "addItem",
            value: function (t) {
              this.selectionMode === J.SingleMouseup
                ? t.onMouseup(this.handleItemClicked)
                : t.onClick(this.handleItemClicked),
                this.activateOnHover && this.activateItemOnHover(t),
                this.appendChild(t);
            },
          },
          {
            key: "activateItemOnHover",
            value: function (t) {
              t.onMouseenter(this.handleItemMouseenter),
                t.onMouseleave(this.handleItemMouseenter);
            },
          },
          {
            key: "handleItemMouseenter",
            value: function (t) {
              this.activateItem(t);
            },
          },
          {
            key: "handleItemMouseleave",
            value: function (t) {
              this.deactivateItem(t);
            },
          },
          {
            key: "addToSelection",
            value: function (t) {
              (t.selected = !0),
                -1 === this.selectedItems.indexOf(t) &&
                  (this.selectedItems.push(t), this.notifySelectionChanged());
            },
          },
          {
            key: "removeFromSelection",
            value: function (t) {
              t.selected = !1;
              var e = this.selectedItems.indexOf(t);
              e > -1 &&
                (this.selectedItems.splice(e, 1),
                this.notifySelectionChanged());
            },
          },
          {
            key: "handleMouseEvents",
            value: function () {
              event.stopPropagation();
            },
          },
          {
            key: "handleItemClicked",
            value: function (t) {
              !t.disabled && this.handleSelectionChanged(t),
                this.activateItem(t);
            },
          },
          {
            key: "handleSelectionChanged",
            value: function (t) {
              switch (this.listSelectionMode) {
                case J.Multiple:
                  this.handleMultipleSelectionChanged(t);
                  break;
                case J.Single:
                case J.SingleMouseup:
                  this.handleSingleSelectionChanged(t);
                  break;
                case J.None:
                  this.itemClickedCB.forEach(function (e) {
                    e(t.key);
                  });
              }
            },
          },
          {
            key: "handleMultipleSelectionChanged",
            value: function (t) {
              t.selected ? this.removeFromSelection(t) : this.addToSelection(t);
            },
          },
          {
            key: "handleSingleSelectionChanged",
            value: function (t) {
              (t.selected = !t.selected),
                this.clearSelection(),
                this.addToSelection(t);
            },
          },
          {
            key: "notifySelectionChanged",
            value: function () {
              var t = this.selectedItems.map(function (t) {
                return t.key;
              });
              this.selectionChangedCB.forEach(function (e) {
                e(t);
              });
            },
          },
          {
            key: "selectionMode",
            get: function () {
              return this.listSelectionMode;
            },
          },
        ]),
        e
      );
    })(T),
    st = "xmui-list",
    at = (function (t) {
      function e() {
        var t,
          i =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : J.Single;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this, i))).className = st),
          (t.role = "listbox"),
          (t.tabindex = 0),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addListItem",
            value: function (t, e, n) {
              var i = new G(t, this.selectionMode === J.Multiple);
              i.setContent(n),
                (i.disabled = e),
                (i.selected = !1),
                this.addItem(i);
            },
          },
        ]),
        e
      );
    })(ot),
    rt = "xmui-list-item-content",
    ct = (function (t) {
      function e(t) {
        var i,
          o =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null,
          s =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : null,
          a =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : null,
          c =
            arguments.length > 4 && void 0 !== arguments[4]
              ? arguments[4]
              : null,
          u =
            arguments.length > 5 && void 0 !== arguments[5]
              ? arguments[5]
              : null;
        if ((n(this, e), ((i = l(this, r(e).call(this))).className = rt), s)) {
          var _ = new T();
          (_.className = "".concat(rt, "_icon ").concat(s)), i.appendChild(_);
        }
        var h = new T();
        if (((h.className = "".concat(rt, "_text-container")), t)) {
          var d = new A();
          d.setText(t), (d.className = "".concat(rt, "_title"));
          var p = new T();
          (p.className = "".concat(rt, "_title-container")),
            p.appendChild(d),
            u &&
              u.forEach(function (t) {
                var e = new T();
                (e.className = "".concat(rt, "_icon-state ").concat(t)),
                  (e.automationId = Q.list_item_icon_state),
                  p.appendChild(e);
              }),
            c &&
              c.forEach(function (t) {
                p.appendChild(t);
              }),
            h.appendChild(p);
        }
        if (o) {
          var m = new A();
          m.setText(o),
            (m.className = "".concat(rt, "_info")),
            h.appendChild(m);
        }
        if ((i.appendChild(h), a)) {
          var g = new T();
          (g.className = "".concat(rt, "_space")),
            i.appendChild(g),
            i.appendChild(a);
        }
        return i;
      }
      return a(e, t), e;
    })(T),
    ut = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "getAuthenticatorIcon",
            value: function (t) {
              if (!et) {
                var e,
                  n = com.ts.mobile.sdk.AuthenticatorType;
                s((e = {}), n.Password, I.PasswordAuth),
                  s(e, n.Pincode, I.PincodeAuth),
                  s(e, n.Pattern, I.PatternAuth),
                  s(e, n.Otp, I.OtpAuth),
                  s(e, n.Voice, I.VoiceAuth),
                  s(e, n.Questions, I.QuestionsAuth),
                  s(e, n.Totp, I.TotpAuth),
                  s(e, n.MobileApprove, I.MobileApproveAuth),
                  s(e, n.Generic, I.GenericAuth),
                  (et = e);
              }
              return et[t];
            },
          },
          {
            key: "getChannelIcon",
            value: function (t) {
              if (!nt) {
                var e,
                  n = com.ts.mobile.sdk.OtpChannel;
                s((e = {}), n.Sms, I.SmsChannel),
                  s(e, n.Email, I.EmailChannel),
                  s(e, n.PushNotification, I.PushChannel),
                  s(e, n.VoiceCall, I.VoiceChannel),
                  (nt = e);
              }
              return nt[t];
            },
          },
        ]),
        t
      );
    })();
  !(function (t) {
    (t.Button = "button"), (t.Submit = "submit");
  })(it || (it = {}));
  var lt,
    _t = "".concat("xmui-button", "--noraml"),
    ht = "".concat("xmui-button", "--alert"),
    dt = (function (t) {
      function e(t) {
        var i,
          o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        n(this, e),
          ((i = l(this, r(e).call(this))).isAlertMode = o),
          (i.automationId = t);
        var s = i.isAlertMode ? ht : _t;
        return i.addClass(s), i;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S('<button class="'.concat("xmui-button", '"></button>'));
            },
          },
          {
            key: "label",
            set: function (t) {
              this.element.text(t);
            },
          },
          {
            key: "form",
            set: function (t) {
              this.attr = { form: t };
            },
          },
          {
            key: "type",
            set: function (t) {
              this.attr = { type: t };
            },
          },
          {
            key: "disabled",
            set: function (t) {
              p(r(e.prototype), "disabled", t, this, !0),
                (this.htmlElement.disabled = t);
            },
          },
        ]),
        e
      );
    })(E),
    pt = (function (t) {
      function e(t, i, o) {
        var s,
          a =
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        return (
          n(this, e),
          ((s = l(this, r(e).call(this, t, i))).actionContext = o),
          (s.uiContext = o.getUiContext()),
          a &&
            ((s._cancelButton = new dt(Q.button_cancel)),
            (s._cancelButton.label = s.uiContext.getString(Z.ts_gen_cancel)),
            s._cancelButton.onClick(function () {
              return s.handleCancelButtonClicked();
            }),
            s.addLeftButton(s.cancelButton)),
          s.addEscapeOptionButtons(o.getEscapeOptions()),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addEscapeOptionButtons",
            value: function (t) {
              var e = this;
              t.filter(function (t) {
                return (
                  t.getPresentation() ===
                  com.ts.mobile.sdk.ActionEscapeOptionPresentation.Action
                );
              }).forEach(function (t) {
                var n = new dt(Q.button_escape);
                (n.label = t.getDisplayName()),
                  n.onClick(function () {
                    return e.handleEscapeButtonClicked(t);
                  }),
                  e.addLeftButton(n);
              });
            },
          },
          {
            key: "handleEscapeButtonClicked",
            value: function (t) {
              this.onEscapeCB && this.onEscapeCB(t);
            },
          },
          {
            key: "onCancel",
            value: function (t) {
              this.onCancelCB = t;
            },
          },
          {
            key: "onEscape",
            value: function (t) {
              this.onEscapeCB = t;
            },
          },
          {
            key: "handleCancelButtonClicked",
            value: function () {
              var t = this.actionContext
                .getEscapeOptions()
                .filter(function (t) {
                  return (
                    t.getPresentation() ===
                    com.ts.mobile.sdk.ActionEscapeOptionPresentation.Cancel
                  );
                });
              t.length
                ? this.onEscapeCB && this.onEscapeCB(t[0])
                : this.onCancelCB && this.onCancelCB();
            },
          },
          {
            key: "cancelButton",
            get: function () {
              return this._cancelButton;
            },
          },
        ]),
        e
      );
    })(H),
    mt = "xmui-select-authenticator",
    gt = (function (t) {
      function e(t) {
        var i;
        n(this, e);
        var o = (i = l(
          this,
          r(e).call(this, Q.page_select_authenticator, mt, t)
        )).createContent();
        return i.setContent(o), i;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function () {
              var t = this;
              return (
                (this.authList = new at()),
                this.authList.onSelectionChanged(function (e) {
                  e.length && t.onSubmitCB && t.onSubmitCB(e[0]);
                }),
                this.authList.focus(),
                this.authList
              );
            },
          },
          {
            key: "addAuthenticator",
            value: function (t, e, n, i) {
              var o =
                  ut.getAuthenticatorIcon(n) ||
                  ut.getAuthenticatorIcon(
                    com.ts.mobile.sdk.AuthenticatorType.Generic
                  ),
                s = new ct(e, null, o, null, null, i ? [I.LockedState] : null);
              this.authList.addListItem(t, i, s);
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
        ]),
        e
      );
    })(pt);
  !(function (t) {
    (t[(t.Resume = -1)] = "Resume"),
      (t[(t.Continue = 0)] = "Continue"),
      (t[(t.Cancel = 1)] = "Cancel");
  })(lt || (lt = {}));
  var ft,
    vt,
    yt,
    kt = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "createContinueConfirmationInput",
            value: function () {
              return com.ts.mobile.sdk.ConfirmationInput.create(0);
            },
          },
          {
            key: "createCancelConfirmationInput",
            value: function () {
              return com.ts.mobile.sdk.ConfirmationInput.create(1);
            },
          },
          {
            key: "createResumeConfirmationInput",
            value: function () {
              return com.ts.mobile.sdk.ConfirmationInput.create(-1);
            },
          },
          {
            key: "createCancelAuthenticatorRequest",
            value: function () {
              var t = com.ts.mobile.sdk.ControlRequest.create(
                com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator
              );
              return com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(
                t
              );
            },
          },
          {
            key: "isContinueConfirmationInput",
            value: function (t) {
              return 0 === t;
            },
          },
          {
            key: "isResumeConfirmationInput",
            value: function (t) {
              return -1 === t;
            },
          },
          {
            key: "createTargetsSelectionResponse",
            value: function (t) {
              var e = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetsSelectionRequest(
                t
              );
              return com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                e
              );
            },
          },
          {
            key: "createAbortControlResponse",
            value: function () {
              var t = com.ts.mobile.sdk.ControlRequest.create(
                com.ts.mobile.sdk.ControlRequestType.AbortAuthentication
              );
              return com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(
                t
              );
            },
          },
          {
            key: "getDeviceNameFromDeviceDetails",
            value: function (e) {
              var n = e.getAlias();
              return t.getDeviceName(n, e);
            },
          },
          {
            key: "getLastAccessedFromDeviceDetails",
            value: function (t, e) {
              var n = new Date(e.getLastAccessed()).toLocaleString();
              return t.formatString(
                Z.ts_authenticator_mobile_approve_targets_recently_used,
                [n]
              );
            },
          },
          {
            key: "getDeviceName",
            value: function (t, e) {
              var n = e.getModel(),
                i = e.getOsType(),
                o = e.getOsVersion();
              return t || "".concat(n, " ").concat(i, " ").concat(o);
            },
          },
        ]),
        t
      );
    })(),
    Ct = "xmui-information-dialog-page",
    bt = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(
            this,
            r(e).call(this, Q.dialog_information, Ct)
          )).automationId = Q.dialog_information);
        var s = new dt(Q.button_continue);
        return (
          (s.label =
            i || t.getString(Z.ts_authenticator_password_cta_positive)),
          (s.value = !0),
          o.addRightButton(s),
          s.focus(),
          o
        );
      }
      return a(e, t), e;
    })(W),
    wt = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "getAuthenticatorNameKey",
            value: function (t) {
              return "".concat("ts_authenticator_").concat(t);
            },
          },
          {
            key: "getAuthenticatorDescriptionKey",
            value: function (t) {
              return (
                "question" == t && (t = "questions"),
                "".concat("ts_authenticator_").concat(t, "_description")
              );
            },
          },
        ]),
        t
      );
    })(),
    xt = new ((function () {
      function t() {
        n(this, t), (this._isLogEnabled = !0);
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              (this.lastPage = null),
                (this.isBusy = !1),
                (this.isLogEnabled = !0);
            },
          },
          {
            key: "lastPage",
            set: function (t) {
              this._lastPage = t;
            },
            get: function () {
              return this._lastPage;
            },
          },
          {
            key: "isBusy",
            set: function (t) {
              this._isBusy = t;
            },
            get: function () {
              return this._isBusy;
            },
          },
          {
            key: "isLogEnabled",
            set: function (t) {
              this._isLogEnabled = t;
            },
            get: function () {
              return this._isLogEnabled;
            },
          },
        ]),
        t
      );
    })())(),
    St = (function (t) {
      function e() {
        var t;
        n(this, e),
          ((t = l(this, r(e).call(this))).className = "xmui-busy-overlay");
        var i = new T();
        return (i.className = "xmui-busy-overlay_icon"), t.appendChild(i), t;
      }
      return a(e, t), e;
    })(T),
    It = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "getContainer",
            value: function (t) {
              var e;
              t && t.uiContainer && (e = S(t.uiContainer)),
                (null != e && 0 !== e.length) ||
                  (0 === (e = S("#transmitContainer")).length &&
                    ((e = S(
                      '<div                                             id="transmitContainer"                                             style="position: relative; width: 100%; height: 100%">'
                    )),
                    S(document.documentElement).append(e)));
              var n = e.find("#xmui-main-container");
              return (
                0 === n.length &&
                  ((n = S(
                    '<div                                      id="xmui-main-container"                                      style="position:relative; width:100%; height:100%">'
                  )),
                  e.content(n)),
                n
              );
            },
          },
          {
            key: "clearContainer",
            value: function (e) {
              (xt.lastPage = null), t.getContainer(e).empty();
            },
          },
          {
            key: "getUsernameFromClientContext",
            value: function (t) {
              return t && t.username;
            },
          },
          {
            key: "activityStarted",
            value: function (e) {
              if (xt.lastPage) xt.lastPage.busy = !0;
              else {
                t.clearContainer(e);
                var n = t.getContainer(e);
                new St().appendInto(n);
              }
            },
          },
          {
            key: "activityEnded",
            value: function (e) {
              xt.lastPage ? (xt.lastPage.busy = !1) : t.clearContainer(e);
            },
          },
          {
            key: "setLogEnabled",
            value: function (t) {
              xt.isLogEnabled = t;
            },
          },
          {
            key: "log",
            value: function (t) {
              xt.isLogEnabled && console.log(t);
            },
          },
          {
            key: "renderPage",
            value: function (e, n) {
              this.clearContainer(n),
                e.appendInto(t.getContainer(n)),
                (xt.lastPage = e);
            },
          },
          {
            key: "presentUI",
            value: function (e, n) {
              this.clearContainer(n),
                t.getContainer(n).append(e),
                (xt.lastPage = null);
            },
          },
          {
            key: "renderModal",
            value: function (e, n) {
              e.appendInto(t.getContainer(n));
            },
          },
          {
            key: "getControlActionButtonsInfo",
            value: function () {
              var t;
              ft ||
                (s(
                  (t = {}),
                  com.ts.mobile.sdk.ControlRequestType.ChangeMethod,
                  {
                    automationId: Q.button_change_method,
                    label: Z.ts_promise_co_change,
                    positionLeft: !1,
                  }
                ),
                s(t, com.ts.mobile.sdk.ControlRequestType.AbortAuthentication, {
                  automationId: Q.button_abort,
                  label: Z.ts_promise_co_abort,
                  positionLeft: !0,
                  isDefault: !0,
                }),
                s(t, com.ts.mobile.sdk.ControlRequestType.RetryAuthenticator, {
                  automationId: Q.button_retry,
                  label: Z.ts_promise_co_retry,
                  positionLeft: !1,
                }),
                s(t, com.ts.mobile.sdk.ControlRequestType.SelectMethod, {
                  automationId: Q.button_select_method,
                  label: Z.ts_promise_co_select,
                  positionLeft: !1,
                }),
                s(t, com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator, {
                  automationId: Q.button_cancel,
                  label: Z.ts_gen_cancel,
                  positionLeft: !1,
                  isDefault: !0,
                }),
                (ft = t));
              return ft;
            },
          },
          {
            key: "getRecoveryActionButtonsInfo",
            value: function () {
              var t;
              vt ||
                (s(
                  (t = {}),
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .ChangeAuthenticator,
                  {
                    automationId: Q.button_change_method,
                    label: Z.ts_promise_co_change,
                    positionLeft: !1,
                  }
                ),
                s(t, com.ts.mobile.sdk.AuthenticationErrorRecovery.Fail, {
                  automationId: Q.button_abort,
                  label: Z.ts_promise_co_abort,
                  positionLeft: !0,
                  isDefault: !0,
                }),
                s(
                  t,
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .RetryAuthenticator,
                  {
                    automationId: Q.button_retry,
                    label: Z.ts_promise_co_retry,
                    positionLeft: !1,
                  }
                ),
                s(
                  t,
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .SelectAuthenticator,
                  {
                    automationId: Q.button_select_method,
                    label: Z.ts_promise_co_select,
                    positionLeft: !1,
                  }
                ),
                (vt = t));
              return vt;
            },
          },
          {
            key: "getFallbackActionButtonsInfo",
            value: function () {
              var t;
              yt ||
                (s(
                  (t = {}),
                  com.ts.mobile.sdk.AuthenticatorFallbackAction.Fallback,
                  {
                    automationId: Q.button_change_method,
                    label: Z.ts_promise_co_change,
                    positionLeft: !1,
                  }
                ),
                s(t, com.ts.mobile.sdk.AuthenticatorFallbackAction.Cancel, {
                  automationId: Q.button_abort,
                  label: Z.ts_promise_co_abort,
                  positionLeft: !0,
                  isDefault: !0,
                }),
                s(t, com.ts.mobile.sdk.AuthenticatorFallbackAction.Retry, {
                  automationId: Q.button_retry,
                  label: Z.ts_promise_co_retry,
                  positionLeft: !1,
                }),
                s(t, com.ts.mobile.sdk.AuthenticatorFallbackAction.AuthMenu, {
                  automationId: Q.button_select_method,
                  label: Z.ts_promise_co_select,
                  positionLeft: !1,
                }),
                (yt = t));
              return yt;
            },
          },
          {
            key: "buildDialogButtons",
            value: function (t, e, n, i) {
              n.forEach(function (n) {
                var o = i[n];
                if (o) {
                  var s = new dt(o.automationId);
                  (s.value = n.toString()),
                    (s.label = e.getString(o.label)),
                    o.positionLeft ? t.addLeftButton(s) : t.addRightButton(s);
                }
              });
            },
          },
          {
            key: "failureDataToPolicyRejectionDialogParams",
            value: function (t, e) {
              var n,
                i = null,
                o = e.getUiContext();
              if (t && t.reason) {
                var s = t.reason;
                switch (s.type) {
                  case "policy":
                    i = {
                      title: Z.ts_promise_rejection_policy_title,
                      text: Z.ts_promise_rejection_policy_content,
                      buttonText: Z.ts_promise_rejection_policy_cta,
                    };
                    break;
                  case "approval_expired":
                    i = {
                      title: Z.ts_promise_rejection_approval_expired_title,
                      text: Z.ts_promise_rejection_approval_expired_content,
                      buttonText: Z.ts_promise_rejection_approval_expired_cta,
                    };
                    break;
                  case "feature_not_supported":
                    i = {
                      title: Z.ts_promise_rejection_feature_not_supported_title,
                      text:
                        Z.ts_promise_rejection_feature_not_supported_content,
                      buttonText:
                        Z.ts_promise_rejection_feature_not_supported_cta,
                    };
                    break;
                  case "cannot_consume_ticket":
                    i = {
                      title: Z.ts_promise_rejection_cannot_consume_ticket_title,
                      text:
                        Z.ts_promise_rejection_cannot_consume_ticket_content,
                      buttonText:
                        Z.ts_promise_rejection_cannot_consume_ticket_cta,
                    };
                    break;
                  case "username_already_exists":
                    (n = [s.data && s.data.username]),
                      (i = {
                        title:
                          Z.ts_promise_rejection_username_already_exists_title,
                        text:
                          Z.ts_promise_rejection_username_already_exists_content,
                        buttonText:
                          Z.ts_promise_rejection_username_already_exists_cta,
                      });
                    break;
                  case "locked":
                    switch (s.data && s.data.lock_type) {
                      case "user":
                        i = {
                          title: Z.ts_promise_rejection_locked_user_title,
                          text: Z.ts_promise_rejection_locked_user_content,
                          buttonText: Z.ts_promise_rejection_locked_user_cta,
                        };
                        break;
                      case "device":
                        i = {
                          title: Z.ts_promise_rejection_locked_device_title,
                          text: Z.ts_promise_rejection_locked_device_content,
                          buttonText: Z.ts_promise_rejection_locked_device_cta,
                        };
                        break;
                      case "application":
                        i = {
                          title:
                            Z.ts_promise_rejection_locked_application_title,
                          text:
                            Z.ts_promise_rejection_locked_application_content,
                          buttonText:
                            Z.ts_promise_rejection_locked_application_cta,
                        };
                    }
                }
              }
              return (
                i &&
                  ((i.title = o.getString(i.title)),
                  (i.text = n
                    ? o.formatString(i.text, n)
                    : o.getString(i.text)),
                  (i.buttonText = o.getString(i.buttonText))),
                i
              );
            },
          },
        ]),
        t
      );
    })(),
    Et = (function (t) {
      function e(t, i, o, s, a, c, u) {
        var _;
        return (
          n(this, e),
          ((_ = l(this, r(e).call(this, t, i, o, s))).dialogContent = new z()),
          _.dialogContent.setDialogTitle(a),
          _.dialogContent.setDialogMessage(c),
          _.dialogContent.setDialogIconClass(u),
          _.setContent(_.dialogContent),
          _
        );
      }
      return a(e, t), e;
    })(pt),
    At = "xmui-confirmation-action-dialog-page",
    Pt = (function (t) {
      function e(t, i, o, s, a, c) {
        var u;
        return (
          n(this, e),
          ((u = l(
            this,
            r(e).call(this, Q.dialog_confirm, At, t, null != c, i, o, s)
          )).continueButton = new dt(Q.button_continue)),
          (u.continueButton.label = a),
          u.continueButton.onClick(function () {
            return u.onContinueCB && u.onContinueCB();
          }),
          u.addRightButton(u.continueButton),
          c && (u.cancelButton.label = c),
          u
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onContinue",
            value: function (t) {
              this.onContinueCB = t;
            },
          },
        ]),
        e
      );
    })(Et),
    Tt = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "promiseCancelAction",
            value: function (t, e, n, i, o) {
              var s = e.getUiContext(),
                a = t;
              t.indexOf(com.ts.mobile.sdk.ControlRequestType.ChangeMethod) >=
                0 &&
                t.indexOf(com.ts.mobile.sdk.ControlRequestType.SelectMethod) >=
                  0 &&
                (a = t.filter(function (t) {
                  return t != com.ts.mobile.sdk.ControlRequestType.ChangeMethod;
                }));
              var r =
                i === com.ts.mobile.sdk.AuthenticatorSessionMode.Authentication
                  ? Z.ts_promise_co_title_auth
                  : Z.ts_promise_co_title_reg;
              return new Promise(function (t, i) {
                var c = new W(
                  Q.dialog_cancellation,
                  "xmui-cancellation-dialog-page"
                );
                (c.automationId = Q.dialog_cancellation),
                  c.setUserName(o),
                  c.setDialogTitle(s.getString(r)),
                  c.setDialogMessage(s.getString(Z.ts_promise_co_content)),
                  c.setDialogIconClass(I.Cancellation),
                  c.onSelect(function (e) {
                    c.blockInteraction(),
                      t(com.ts.mobile.sdk.ControlRequest.create(parseInt(e)));
                  });
                var u = It.getControlActionButtonsInfo();
                It.buildDialogButtons(c, e.getUiContext(), a, u),
                  It.renderPage(c, n);
              });
            },
          },
          {
            key: "promiseRecoveryForError",
            value: function (t, e, n, i, o, s, a) {
              var r = !1,
                c = t.getData();
              c && c.additional_data && c.additional_data.locked && (r = !0);
              var u,
                l,
                _ = e;
              return (
                e.indexOf(
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .ChangeAuthenticator
                ) >= 0 &&
                  e.indexOf(
                    com.ts.mobile.sdk.AuthenticationErrorRecovery
                      .SelectAuthenticator
                  ) >= 0 &&
                  (_ = e.filter(function (t) {
                    return (
                      t !=
                      com.ts.mobile.sdk.AuthenticationErrorRecovery
                        .ChangeAuthenticator
                    );
                  })),
                r
                  ? ((u = Z.ts_promise_error_lock_title),
                    (l = i.getString(Z.ts_promise_error_lock_content)))
                  : s ===
                    com.ts.mobile.sdk.AuthenticatorSessionMode.Authentication
                  ? ((u = Z.ts_promise_error_default_title_auth),
                    (l = i.formatString(
                      Z.ts_promise_error_default_content_auth,
                      [t.getMessage()]
                    )))
                  : ((u = Z.ts_promise_error_default_title_reg),
                    (l = i.formatString(
                      Z.ts_promise_error_default_content_reg,
                      [t.getMessage()]
                    ))),
                this.createRecoveryFromErrorDialog(
                  a,
                  i.getString(u),
                  l,
                  r ? I.AuthLocked : I.Error,
                  i,
                  o,
                  _
                )
              );
            },
          },
          {
            key: "createRecoveryFromErrorDialog",
            value: function (t, e, n, i, o, s, a) {
              return new Promise(function (n, r) {
                var c = new W(
                  Q.dialog_recovery,
                  "xmui-error-recovery-dialog-page"
                );
                c.setUserName(t),
                  c.setDialogTitle(e),
                  c.setDialogMessage(o.getString(Z.ts_promise_co_content)),
                  c.setDialogIconClass(i),
                  c.onSelect(function (t) {
                    c.blockInteraction(), n(parseInt(t));
                  });
                var u = It.getRecoveryActionButtonsInfo();
                It.buildDialogButtons(c, o, a, u), It.renderPage(c, s);
              });
            },
          },
          {
            key: "promiseAuthenticator",
            value: function (t, e, n) {
              var i = e.getUiContext();
              return new Promise(function (o, s) {
                var a = {},
                  r = new gt(e),
                  c = It.getUsernameFromClientContext(n);
                c && r.setUserName(c),
                  r.setTitle(i.getString(Z.ts_promise_sa_title)),
                  r.setInstructions(i.getString(Z.ts_promise_sa_content)),
                  t.forEach(function (t) {
                    var e = t.getAuthenticator(),
                      n = e.getAuthenticatorId(),
                      o = e.getType();
                    a[n] = e;
                    var s =
                        !e.getEnabled() || e.getLocked() || !e.getRegistered(),
                      c = i.getString(wt.getAuthenticatorNameKey(n));
                    r.addAuthenticator(n, c, o, s);
                  }),
                  r.onSubmit(function (t) {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.AuthenticatorSelectionResult.createSelectionRequest(
                          a[t]
                        )
                      );
                  }),
                  r.onCancel(function () {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.AuthenticatorSelectionResult.createAbortRequest()
                      );
                  }),
                  r.onEscape(function (t) {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.AuthenticatorSelectionResult.createEscapeRequest(
                          t,
                          {}
                        )
                      );
                  }),
                  It.renderPage(r, n);
              });
            },
          },
          {
            key: "promiseInformationInput",
            value: function (t, e, n, i, o, s, a) {
              return new Promise(function (r, c) {
                var u = new bt(s, o);
                t && u.setUserName(t),
                  u.setDialogTitle(n),
                  u.setDialogMessage(i),
                  u.setDialogIconClass(e),
                  u.onSelect(function () {
                    u.blockInteraction(), r();
                  }),
                  It.renderPage(u, a);
              });
            },
          },
          {
            key: "internalPromiseConfirmationOrInformationActionInput",
            value: function (t, e, n, i, o, s, a, r, c) {
              return new Promise(function (u, l) {
                var _ = new Pt(r, n, i, e, o, a);
                t && _.setUserName(t),
                  _.onContinue(function () {
                    u(com.ts.mobile.sdk.ConfirmationInput.create(s));
                  }),
                  _.onCancel(function () {
                    u(kt.createCancelConfirmationInput());
                  }),
                  _.onEscape(function (t) {
                    u(
                      com.ts.mobile.sdk.ConfirmationInput.createEscapeRequest(
                        t,
                        {}
                      )
                    );
                  }),
                  It.renderPage(_, c);
              });
            },
          },
          {
            key: "promiseInformationActionInput",
            value: function (t, e, n, i, o, s, a) {
              return this.internalPromiseConfirmationOrInformationActionInput(
                t,
                e,
                n,
                i,
                o,
                -1,
                null,
                s,
                a
              );
            },
          },
          {
            key: "promiseConfirmationActionInput",
            value: function (t, e, n, i, o, s, a, r) {
              return this.internalPromiseConfirmationOrInformationActionInput(
                t,
                e,
                n,
                i,
                o,
                0,
                s,
                a,
                r
              );
            },
          },
          {
            key: "promiseAuthenticatorFallbackAction",
            value: function (t, e, n, i, o, s) {
              return new Promise(function (n, a) {
                var r = o.getUiContext(),
                  c = i.description.getAuthenticatorId(),
                  u = r.getString(wt.getAuthenticatorNameKey(c)),
                  l = new W(
                    Q.dialog_fallback,
                    "xmui-auth-fallback-dialog-page"
                  );
                t && l.setUserName(t),
                  l.setDialogTitle(
                    r.formatString(Z.ts_promise_fallback_title, [u])
                  ),
                  l.setDialogMessage(
                    r.getString(Z.ts_promise_fallback_content)
                  ),
                  l.setDialogIconClass(I.Fallback),
                  l.onSelect(function (t) {
                    l.blockInteraction(), n(parseInt(t));
                  });
                var _ = It.getFallbackActionButtonsInfo();
                It.buildDialogButtons(l, r, e, _), It.renderPage(l, s);
              });
            },
          },
          {
            key: "promisePolicyRejectionInput",
            value: function (e, n, i, o, s, a) {
              var r = { title: e, text: n, buttonText: i };
              if (
                !(
                  (e && n && i) ||
                  (r = It.failureDataToPolicyRejectionDialogParams(o, s))
                )
              )
                return Promise.resolve(kt.createResumeConfirmationInput());
              var c = o,
                u =
                  (c && c.reason && c.reason.data && c.reason.data.username) ||
                  It.getUsernameFromClientContext(a);
              return t
                .promiseInformationInput(
                  u,
                  I.Rejection,
                  r.title,
                  r.text,
                  r.buttonText,
                  s.getUiContext(),
                  a
                )
                .then(function () {
                  return kt.createResumeConfirmationInput();
                });
            },
          },
        ]),
        t
      );
    })(),
    Rt = "xmui-confirmation-dialog-page",
    Mt = (function (t) {
      function e(t, i, o) {
        var s,
          a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        n(this, e),
          ((s = l(this, r(e).call(this, Q.dialog_confirm, Rt))).automationId =
            Q.dialog_confirm);
        var c = new dt(Q.button_cancel);
        (c.label = o || t.getString(Z.ts_gen_cancel)),
          (c.value = !1),
          s.addLeftButton(c);
        var u = new dt(Q.button_continue);
        return (
          (u.label =
            i || t.getString(Z.ts_authenticator_password_cta_positive)),
          (u.value = !0),
          s.addRightButton(u),
          a ? u.focus() : c.focus(),
          s
        );
      }
      return a(e, t), e;
    })(W),
    Bt = (function () {
      function t(e, i) {
        n(this, t),
          (this.showExpirationDialog = !1),
          (this.supportsInlineError = !1),
          (this.title = e),
          (this.username = i),
          (this.authId = e);
      }
      return (
        o(t, [
          {
            key: "startSession",
            value: function (t, e, n, i) {
              (this.description = t),
                (this.mode = e),
                (this.actionContext = n),
                (this.clientContext = i),
                (this.uiContext = n.getUiContext()),
                (this.username =
                  It.getUsernameFromClientContext(i) || this.username),
                It.log(
                  "Starting session; session mode: ["
                    .concat(this.mode, "], authenticator: [")
                    .concat(this.title, "]")
                );
            },
          },
          {
            key: "changeSessionModeToRegistrationAfterExpiration",
            value: function () {
              It.log(
                "Changing session mode to registration after expiration; authenticator: [".concat(
                  this.title,
                  "]"
                )
              ),
                (this.mode =
                  com.ts.mobile.sdk.AuthenticatorSessionMode.Registration),
                (this.authError = null),
                (this.showExpirationDialog = !0);
            },
          },
          {
            key: "promiseRecoveryForError",
            value: function (t, e, n) {
              return (
                It.log(
                  "Starting error recovery; session mode: ["
                    .concat(this.mode, "], authenticator: [")
                    .concat(this.title, "], error: [")
                    .concat(t, "]")
                ),
                this.supportsInlineError &&
                n ===
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .RetryAuthenticator
                  ? ((this.authError = t), Promise.resolve(n))
                  : n === com.ts.mobile.sdk.AuthenticationErrorRecovery.Fail
                  ? Promise.resolve(n)
                  : Tt.promiseRecoveryForError(
                      t,
                      e,
                      n,
                      this.uiContext,
                      this.clientContext,
                      this.mode,
                      this.username
                    )
              );
            },
          },
          {
            key: "endSession",
            value: function () {
              It.log(
                "Ending session; session mode: ["
                  .concat(this.mode, "], authenticator: [")
                  .concat(this.title, "]")
              );
            },
          },
          {
            key: "promiseInput",
            value: function () {
              var t = this;
              return new Promise(function (e, n) {
                switch ((t.setInputResolver(e), t.mode)) {
                  case com
                    .ts.mobile.sdk.AuthenticatorSessionMode.Authentication:
                    It.log(
                      "Fetching authentication input; authenticator: [".concat(
                        t.title,
                        "]"
                      )
                    ),
                      t.showAuthUi();
                    break;
                  case com.ts.mobile.sdk.AuthenticatorSessionMode.Registration:
                    It.log(
                      "Fetching registration input; authenticator: [".concat(
                        t.title,
                        "]"
                      )
                    ),
                      t.showExpirationDialog
                        ? ((t.showExpirationDialog = !1),
                          t.showRegUiAfterExpiration())
                        : t.showRegUi();
                }
              }).then(function (e) {
                return (t.authError = null), e;
              });
            },
          },
          {
            key: "promiseCancelAction",
            value: function (t) {
              return Tt.promiseCancelAction(
                t,
                this.actionContext,
                this.clientContext,
                this.mode,
                this.username
              );
            },
          },
          {
            key: "showRegUiAfterExpiration",
            value: function () {
              var t = this,
                e = this.uiContext,
                n = e.getString(wt.getAuthenticatorNameKey(this.title)),
                i = new Mt(this.uiContext);
              i.setUserName(this.username),
                i.setDialogTitle(
                  e.formatString(Z.ts_session_authenticator_expired_title, [n])
                ),
                i.setDialogIconClass(I.Expiration),
                i.setDialogMessage(
                  e.getString(Z.ts_session_authenticator_expired_content)
                ),
                i.onSelect(function (e) {
                  i.blockInteraction(), e ? t.showRegUi() : t.onCancel();
                }),
                It.renderPage(i, this.clientContext);
            },
          },
          {
            key: "setInputResolver",
            value: function (t) {
              this.currentInputResolveFn = t;
            },
          },
          {
            key: "onCancel",
            value: function () {
              this.resolveInputPromise(kt.createCancelAuthenticatorRequest());
            },
          },
          {
            key: "onEscape",
            value: function (t) {
              var e = com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(
                t,
                {}
              );
              this.resolveInputPromise(e);
            },
          },
          {
            key: "resolveInputPromise",
            value: function (t) {
              if (this.currentInputResolveFn) {
                var e = this.currentInputResolveFn;
                (this.currentInputResolveFn = null), e(t);
              }
            },
          },
          {
            key: "showAuthenticatorPage",
            value: function (t) {
              var e = this;
              t.setUserName(this.username),
                t.onCancel(function () {
                  t.blockInteraction(), e.onCancel();
                }),
                t.onEscape(function (n) {
                  t.blockInteraction(), e.onEscape(n);
                }),
                It.renderPage(t, this.clientContext);
            },
          },
        ]),
        t
      );
    })(),
    Nt = (function (t) {
      function e(t, i) {
        var o;
        return (
          n(this, e),
          ((o = l(this, r(e).call(this))).stateOnIcon = t),
          (o.stateOffIcon = i),
          (o.isOn = !1),
          o.setIconsClass(),
          o.onClick(function () {
            (o.isOn = !o.isOn),
              o.setIconsClass(),
              o.onChangeCB && o.onChangeCB(o.isOn);
          }),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onChange",
            value: function (t) {
              this.onChangeCB = t;
            },
          },
          {
            key: "setIsOn",
            value: function (t) {
              (this.isOn = t), this.setIconsClass();
            },
          },
          {
            key: "setIconsClass",
            value: function () {
              var t = "";
              (t = this.isOn ? this.stateOnIcon : this.stateOffIcon),
                this.element.setClass(
                  "".concat("xmui-toggle-icon", " ").concat(t)
                );
            },
          },
        ]),
        e
      );
    })(T);
  function Dt(t, e, n) {
    var i;
    return function () {
      var o = this,
        s = arguments,
        a = function () {
          (i = null), n || t.apply(o, s);
        },
        r = n && !i;
      clearTimeout(i), (i = setTimeout(a, e)), r && t.apply(o, s);
    };
  }
  var Lt,
    Ft = (function (t) {
      function e(t) {
        var i;
        return (
          n(this, e),
          ((i = l(this, r(e).call(this))).automationId = t),
          (i.inputHtmlElement = i.htmlElement),
          i
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S("<input>");
            },
          },
          {
            key: "onChange",
            value: function (t) {
              this.element.on("input", this.createCB(t));
            },
          },
          {
            key: "createCB",
            value: function (t) {
              return Dt(t, 100, !1);
            },
          },
          {
            key: "name",
            set: function (t) {
              this.inputHtmlElement.name = t;
            },
            get: function () {
              return this.inputHtmlElement.name;
            },
          },
          {
            key: "type",
            set: function (t) {
              this.attr = { type: t };
            },
          },
          {
            key: "placeholder",
            set: function (t) {
              this.inputHtmlElement.placeholder = t;
            },
          },
          {
            key: "maxlength",
            set: function (t) {
              this.attr = { maxlength: t.toString() };
            },
          },
          {
            key: "autocomplete",
            set: function (t) {
              this.attr = { autocomplete: t };
            },
          },
          {
            key: "autocorrect",
            set: function (t) {
              this.attr = { autocorrect: t ? "on" : "off" };
            },
          },
          {
            key: "autocapitalize",
            set: function (t) {
              this.attr = { autocapitalize: t ? "on" : "off" };
            },
          },
          {
            key: "value",
            set: function (t) {
              this.inputHtmlElement.value = t;
            },
            get: function () {
              return this.inputHtmlElement.value;
            },
          },
          {
            key: "disabled",
            set: function (t) {
              p(r(e.prototype), "disabled", t, this, !0),
                (this.inputHtmlElement.disabled = t);
            },
          },
          {
            key: "required",
            set: function (t) {
              this.inputHtmlElement.required = t;
            },
            get: function () {
              return this.inputHtmlElement.required;
            },
          },
        ]),
        e
      );
    })(E),
    qt = "xmui-form-field-message",
    Ot = "".concat(qt, "--center"),
    jt = "".concat(qt, "--error"),
    Ut = (function (t) {
      function e() {
        var t,
          i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).id = $.generate()),
          (t.className = qt),
          i && t.addClass(jt),
          o && t.addClass(Ot),
          t
        );
      }
      return a(e, t), e;
    })(A),
    Ht = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    Qt = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "email",
            value: function (t) {
              return Ht.test(t) ? void 0 : "Invalid Email";
            },
          },
          {
            key: "required",
            value: function (t) {
              return t ? void 0 : "Required";
            },
          },
          {
            key: "mobileNumber",
            value: function (t) {
              var e = t.match(/^([0-9]{1,3})-([1-9][0-9]+)$/);
              return e
                ? e[1].length + e[2].length > 15
                  ? "Mobile Number exceeded 15 digits"
                  : void 0
                : "Invalid Mobile Number";
            },
          },
        ]),
        t
      );
    })(),
    Kt = (function () {
      function t() {
        n(this, t);
      }
      return (
        o(t, null, [
          {
            key: "positiveInteger",
            value: function (t) {
              var e = t.keyCode;
              ((e !== K.Enter && e < K.Zero) || e > K.Nine) &&
                t.preventDefault();
            },
          },
        ]),
        t
      );
    })(),
    Vt = (function (t) {
      function e() {
        return n(this, e), l(this, r(e).apply(this, arguments));
      }
      return a(e, t), e;
    })(T),
    zt = "xmui-input-field",
    Wt = /^[0-9]+$/,
    Zt = "".concat(zt, "--has-value"),
    Yt = "".concat(zt, "--has-focus");
  !(function (t) {
    (t[(t.Password = 0)] = "Password"),
      (t[(t.Text = 1)] = "Text"),
      (t[(t.Email = 2)] = "Email"),
      (t[(t.PositiveInteger = 3)] = "PositiveInteger");
  })(Lt || (Lt = {}));
  var $t,
    Xt = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(this, r(e).call(this))).inputType = t),
          (o.hasValue = !1),
          (o.validators = []),
          (o.icons = new Map()),
          (o.className = zt),
          (o.inputComponent = new Ft(i)),
          (o.inputComponent.value = ""),
          (o.inputComponent.autocapitalize = !1),
          (o.inputComponent.autocorrect = !1),
          (o.inputComponent.spellcheck = !1),
          o.inputComponent.onPaste(o.handlePaste.bind(u(o))),
          o.inputComponent.onChange(o.handleChange.bind(u(o)));
        var s = new T();
        s.className = "".concat(zt, "_row");
        var a = new T();
        a.className = "".concat(zt, "_container");
        var c = new T();
        c.className = "".concat(zt, "_input-and-label");
        var _ = new T();
        _.className = "".concat(zt, "_label-container");
        var h = new A();
        switch (
          ((h.className = "".concat(zt, "_label")),
          (o.inputLabel = h),
          _.appendChild(o.inputLabel),
          c.appendChildren(o.inputComponent, _),
          a.appendChild(c),
          s.appendChildren(a),
          s.onFocusIn(function () {
            o.addClass(Yt);
          }),
          s.onFocusOut(function () {
            o.removeClass(Yt);
          }),
          t)
        ) {
          case Lt.Password:
            o.setupPasswordInput(a);
            break;
          case Lt.Text:
            o.inputComponent.type = "text";
            break;
          case Lt.Email:
            o.setupEmailInput();
            break;
          case Lt.PositiveInteger:
            o.setupPositiveIntegerInput();
        }
        return (
          (o.messageComp = new Ut(!1)),
          (o.messageComp.show = !1),
          (o.errorMessageComp = new Ut(!0)),
          o.appendChildren(s, o.messageComp, o.errorMessageComp),
          (o.inputComponent.ariaDescribedBy = o.messageComp.id),
          (o.container = a),
          (o.inputRow = s),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addValidators",
            value: function (t) {
              this.validators = this.validators.concat(t);
            },
          },
          {
            key: "addValidator",
            value: function (t) {
              this.validators.push(t);
            },
          },
          {
            key: "focus",
            value: function () {
              this.inputComponent.focus();
            },
          },
          {
            key: "onBlur",
            value: function (t) {
              this.inputComponent.onBlur(t);
            },
          },
          {
            key: "onFocus",
            value: function (t) {
              this.inputComponent.onFocus(t);
            },
          },
          {
            key: "onChange",
            value: function (t) {
              this.inputComponent.onChange(t);
            },
          },
          {
            key: "validateAndSetErrorMessage",
            value: function () {
              var t = this,
                e = !0,
                n = this.value.trim();
              return (
                this.inputComponent.required
                  ? [this.getRequiredValidator()].concat(m(this.validators))
                  : this.validators,
                (!this.inputComponent.required && this.isEmpty) ||
                  (e = !this.validators.some(function (e) {
                    var i = e(n);
                    return i && t.setError(i), !!i;
                  })),
                e && this.clearError(),
                e
              );
            },
          },
          {
            key: "setError",
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              (this.error = !0),
                (this.errorMessage = t || ""),
                e && (this.value = "");
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1), (this.errorMessage = "");
            },
          },
          {
            key: "getRequiredValidator",
            value: function () {
              return Qt.required;
            },
          },
          {
            key: "addIcon",
            value: function (t) {
              var e = new T();
              (e.className = "".concat(zt, "_icon ").concat(t)),
                this.container.appendChild(e),
                this.icons.set(t, e);
            },
          },
          {
            key: "removeIcon",
            value: function (t) {
              var e = this.icons.get(t);
              e && (this.container.removeChild(e), this.icons.delete(t));
            },
          },
          {
            key: "prependToInputRow",
            value: function (t) {
              this.inputRow.prependChild(t);
            },
          },
          {
            key: "setupPasswordInput",
            value: function (t) {
              var e = this;
              this.inputComponent.type = "password";
              var n = new Nt(I.PasswordVisible, I.PasswordHidden);
              n.setIsOn(!1),
                n.onChange(function (t) {
                  e.inputComponent.type = t ? "text" : "password";
                }),
                t.appendChild(n);
            },
          },
          {
            key: "setupPositiveIntegerInput",
            value: function () {
              (this.inputComponent.type = "text"),
                this.inputComponent.onKeypress(function (t, e) {
                  return Kt.positiveInteger(e);
                });
            },
          },
          {
            key: "setupEmailInput",
            value: function () {
              (this.inputComponent.type = "email"), this.addValidator(Qt.email);
            },
          },
          {
            key: "handlePaste",
            value: function (t) {
              var e;
              this.inputType == Lt.PositiveInteger &&
                (e =
                  t.clipboardData && t.clipboardData.getData
                    ? t.clipboardData.getData("text/plain")
                    : window.clipboardData.getData("Text")) &&
                !Wt.test(e) &&
                t.preventDefault();
            },
          },
          {
            key: "updateHasValue",
            value: function (t) {
              t ? this.addClass(Zt) : this.removeClass(Zt), (this.hasValue = t);
            },
          },
          {
            key: "handleChange",
            value: function () {
              var t = this.checkHasValue();
              this.hasValue !== t && this.updateHasValue(t);
            },
          },
          {
            key: "checkHasValue",
            value: function () {
              return !!this.value.length;
            },
          },
          {
            key: "name",
            set: function (t) {
              this.inputComponent.name = t;
            },
            get: function () {
              return this.inputComponent.name;
            },
          },
          {
            key: "disabled",
            set: function (t) {
              this.inputComponent.disabled = t;
            },
          },
          {
            key: "message",
            set: function (t) {
              this.messageComp.setText(t), (this.messageComp.show = !!t.length);
            },
          },
          {
            key: "value",
            set: function (t) {
              (this.inputComponent.value = t), this.handleChange();
            },
            get: function () {
              return this.inputComponent.value;
            },
          },
          {
            key: "type",
            get: function () {
              return this.inputType;
            },
          },
          {
            key: "ariaRole",
            set: function (t) {
              this.inputComponent.ariaRole = t;
            },
          },
          {
            key: "ariaLabel",
            set: function (t) {
              this.inputComponent.ariaLabel = t;
            },
          },
          {
            key: "automationId",
            set: function (t) {
              this.inputComponent.automationId = t;
            },
          },
          {
            key: "autocomplete",
            set: function (t) {
              this.inputComponent.autocomplete = t;
            },
          },
          {
            key: "placeholder",
            set: function (t) {
              (this.placeholderText = t), this.inputLabel.setText(t);
            },
            get: function () {
              return this.placeholderText;
            },
          },
          {
            key: "maxlength",
            set: function (t) {
              this.inputComponent.maxlength = t;
            },
          },
          {
            key: "required",
            set: function (t) {
              this.inputComponent.required = t;
            },
            get: function () {
              return this.inputComponent.required;
            },
          },
          {
            key: "isEmpty",
            get: function () {
              return !this.value.trim().length;
            },
          },
          {
            key: "errorMessage",
            set: function (t) {
              this.errorMessageComp.setText(t);
            },
          },
        ]),
        e
      );
    })(Vt),
    Gt = "xmui-form",
    Jt = "".concat(Gt, "_hidden-submit-button"),
    te = (function (t) {
      function e(t) {
        var i;
        if (
          (n(this, e),
          ((i = l(this, r(e).call(this))).submitButton = t),
          (i.externalValidations = function () {
            return !0;
          }),
          (i.className = Gt),
          i.submitButton)
        ) {
          var o = new dt("");
          o.addClass(Jt),
            (o.type = it.Submit),
            (o.disabled = !0),
            o.onClick(function () {
              return i.handleSubmit();
            }),
            i.appendChild(o),
            (i.hiddenSubmitButton = o),
            i.submitButton &&
              i.submitButton.onClick(function () {
                return i.handleSubmit();
              });
        }
        return (
          i.element.on("submit", function () {
            return event.preventDefault();
          }),
          i.element.on("input", Dt(i.handleInputEvent.bind(u(i)), 100, !1)),
          i
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S("<form novalidate></form>");
            },
          },
          {
            key: "start",
            value: function () {
              this.updateSubmitButton();
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "onUserInput",
            value: function (t) {
              this.onUserInputCB = t;
            },
          },
          {
            key: "handleSubmit",
            value: function () {
              this.validate() &&
                this.onSubmitCB &&
                this.onSubmitCB(this.buildFormResult()),
                this.updateSubmitButton();
            },
          },
          {
            key: "updateSubmitButton",
            value: function () {
              if (this.submitButton) {
                var t = this.isMandatoryEmpty();
                this.submitButton.disabled = this.hiddenSubmitButton.disabled = t;
              }
            },
          },
          {
            key: "isMandatoryEmpty",
            value: function () {
              return this.getFormFields(this).some(function (t) {
                return t.required && t.isEmpty;
              });
            },
          },
          {
            key: "getFormFields",
            value: function (t) {
              var e = this,
                n = [];
              return (
                t.getChildren().forEach(function (t) {
                  t instanceof Vt
                    ? n.push(t)
                    : t instanceof P && (n = n.concat(e.getFormFields(t)));
                }),
                n
              );
            },
          },
          {
            key: "validate",
            value: function () {
              var t = this.getFormFields(this).reduce(function (t, e) {
                  return e.validateAndSetErrorMessage() && t;
                }, !0),
                e = this.externalValidations();
              return t && e;
            },
          },
          {
            key: "buildFormResult",
            value: function () {
              return this.getFormFields(this).reduce(function (t, e) {
                return (
                  (t[e.name] =
                    "string" == typeof e.value ? e.value.trim() : e.value),
                  t
                );
              }, {});
            },
          },
          {
            key: "handleInputEvent",
            value: function () {
              this.updateSubmitButton(),
                this.onUserInputCB && this.onUserInputCB();
            },
          },
          {
            key: "name",
            set: function (t) {
              this.attr = { name: t };
            },
          },
        ]),
        e
      );
    })(P);
  !(function (t) {
    (t.Off = "off"),
      (t.Username = "username"),
      (t.NewPassword = "new-password"),
      (t.CurrentPassword = "current-password");
  })($t || ($t = {}));
  var ee,
    ne = (function (t) {
      function e(t, i, o) {
        return n(this, e), l(this, r(e).call(this, t, i, o));
      }
      return a(e, t), e;
    })(pt),
    ie = "xmui-password-authentication",
    oe = "xmui-password-registration",
    se = (function (t) {
      function e(t, i) {
        var o,
          s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        n(this, e),
          ((o = l(
            this,
            r(e).call(
              this,
              i ? Q.page_password_reg : Q.page_password_auth,
              i ? oe : ie,
              t
            )
          )).isRegistrationMode = i),
          (o.disableAutocomplete = s),
          (o.passwordInputRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
          o.setTitle(o.getTitle()),
          o.setInstructions(o.getInstructions());
        var a = new dt(Q.button_continue);
        (a.label = o.uiContext.getString(
          Z.ts_authenticator_password_cta_positive
        )),
          o.addRightButton(a),
          (o.continueButton = a);
        var c = o.createForm();
        return o.setContent(c), o;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), this.passwordInput.setError(t);
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1), this.passwordInput.clearError();
            },
          },
          {
            key: "reset",
            value: function () {
              this.unblockInteraction(),
                (this.passwordInput.value = ""),
                this.passwordInput.focus(),
                this.repeatPasswordInput &&
                  (this.repeatPasswordInput.value = "");
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "getTitle",
            value: function () {
              var t = this.isRegistrationMode
                ? Z.ts_authenticator_password_title_reg
                : Z.ts_authenticator_password_title_auth;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getInstructions",
            value: function () {
              var t;
              return (
                (t = this.isRegistrationMode
                  ? Z.ts_authenticator_password_intro_reg
                  : Z.ts_authenticator_password_intro_auth),
                this.uiContext.getString(t)
              );
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = this,
                e = this.uiContext,
                n = new te(this.continueButton);
              n.addClass("xmui-password-page-form"),
                (n.id = "xmui-password-form");
              var i = new Xt(Lt.Password, Q.input_password),
                o = this.getAutocompleteValue();
              if (
                ((i.name = "password"),
                (i.placeholder = e.getString(
                  Z.ts_authenticator_password_field_hint
                )),
                (i.disabled = !1),
                (i.value = ""),
                (i.required = !0),
                (i.autocomplete = o),
                (i.ariaLabel = e.getString(
                  Z.ts_accessibility_password_enter_password
                )),
                i.focus(),
                (this.passwordInput = i),
                n.appendChild(i),
                this.isRegistrationMode)
              ) {
                var s = new T();
                (s.className = "".concat("xmui-password-page-form", "_spacer")),
                  n.appendChild(s);
                var a = new Xt(Lt.Password, Q.input_repeat_password);
                (a.name = "repeat-password"),
                  (a.placeholder = e.getString(
                    Z.ts_authenticator_password_reg_field_hint
                  )),
                  (a.disabled = !1),
                  (a.value = ""),
                  (a.required = !0),
                  (i.autocomplete = o),
                  (a.ariaLabel = e.getString(
                    Z.ts_accessibility_password_enter_password_again
                  )),
                  (this.repeatPasswordInput = a),
                  n.appendChild(a);
              }
              return (
                (n.externalValidations = function () {
                  var e = !0;
                  return (
                    t.isRegistrationMode &&
                      (t.validatePasswordsMatch() ||
                        (t.repeatPasswordInput.setError(
                          t.uiContext.getString(
                            Z.ts_authenticator_password_error_reg_no_match
                          ),
                          !1
                        ),
                        t.passwordInput.focus(),
                        (e = !1)),
                      t.isPasswordValid() ||
                        (t.passwordInput.setError(
                          t.uiContext.getString(
                            Z.ts_authenticator_password_error_reg_strength_validation_failed
                          ),
                          !1
                        ),
                        t.repeatPasswordInput.setError(null, !0),
                        t.passwordInput.focus(),
                        (e = !1)),
                      0 == e &&
                        ((t.passwordInput.value = ""),
                        (t.repeatPasswordInput.value = ""))),
                    e
                  );
                }),
                n.onUserInput(this.handlePasswordChanged.bind(this)),
                n.onSubmit(function (e) {
                  t.blockInteraction(),
                    t.onSubmitCB && t.onSubmitCB(e.password);
                }),
                n.start(),
                n
              );
            },
          },
          {
            key: "validatePasswordsMatch",
            value: function () {
              return (
                this.passwordInput.value === this.repeatPasswordInput.value
              );
            },
          },
          {
            key: "isPasswordValid",
            value: function () {
              return this.passwordInputRegex.test(this.passwordInput.value);
            },
          },
          {
            key: "getAutocompleteValue",
            value: function () {
              return this.disableAutocomplete
                ? $t.Off
                : this.isRegistrationMode
                ? $t.NewPassword
                : $t.CurrentPassword;
            },
          },
          {
            key: "handlePasswordChanged",
            value: function () {
              this.passwordInput.error && this.passwordInput.clearError(),
                this.repeatPasswordInput &&
                  this.repeatPasswordInput.error &&
                  this.repeatPasswordInput.clearError();
            },
          },
        ]),
        e
      );
    })(ne),
    ae = (function (t) {
      function e(t, i) {
        var o;
        return (
          n(this, e),
          ((o = l(this, r(e).call(this, t, i))).supportsInlineError = !0),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "showAuthUi",
            value: function () {
              this.showPasswordPage(!1);
            },
          },
          {
            key: "showRegUi",
            value: function () {
              this.showPasswordPage(!0);
            },
          },
          {
            key: "showPasswordPage",
            value: function (t) {
              var e = this;
              if (this.authError && this.passwordPage)
                this.passwordPage.reset(),
                  this.authError &&
                    this.passwordPage.setError(this.authError.getMessage());
              else {
                var n = !0 === this.clientContext.disablePasswordAutocomplete,
                  i = new se(this.actionContext, t, n);
                this.showAuthenticatorPage(i), (this.passwordPage = i);
              }
              this.passwordPage.onSubmit(function (t) {
                var n = com.ts.mobile.sdk.PasswordInput.create(t);
                e.resolveInputPromise(
                  com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                    n
                  )
                );
              });
            },
          },
        ]),
        e
      );
    })(Bt),
    re = "xmui-select-device-page",
    ce = (function (t) {
      function e(t) {
        var i;
        n(this, e),
          ((i = l(
            this,
            r(e).call(this, Q.page_select_device, re, t)
          )).selectedDevices = []),
          (i.deviceKeys = []);
        var o = new dt(Q.button_send_to_all);
        (o.label = i.uiContext.getString(
          Z.ts_authenticator_mobile_approve_send_to_all
        )),
          o.onClick(function () {
            i.onSubmitCB && i.onSubmitCB(i.deviceKeys);
          }),
          i.addRightButton(o);
        var s = new dt(Q.button_continue);
        (s.label = i.uiContext.getString(
          Z.ts_authenticator_password_cta_positive
        )),
          (s.disabled = !0),
          s.onClick(function () {
            i.onSubmitCB && i.onSubmitCB(i.selectedDevices);
          }),
          i.addRightButton(s),
          (i.confirmButton = s);
        var a = i.createContent();
        return i.setContent(a), i;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function () {
              var t = this;
              return (
                (this.deviceList = new at(J.Multiple)),
                this.deviceList.onSelectionChanged(function (e) {
                  (t.selectedDevices = e),
                    (t.confirmButton.disabled = 0 === e.length);
                }),
                this.deviceList.focus(),
                this.deviceList
              );
            },
          },
          {
            key: "addDevice",
            value: function (t, e, n, i) {
              var o = new ct(e, n, I.Device);
              this.deviceList.addListItem(t, i, o), this.deviceKeys.push(t);
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
        ]),
        e
      );
    })(ne),
    ue = (function (t) {
      function e() {
        return n(this, e), l(this, r(e).apply(this, arguments));
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildElement",
            value: function () {
              return S("<img></img>");
            },
          },
          {
            key: "src",
            set: function (t) {
              this.attr = { src: t };
            },
          },
        ]),
        e
      );
    })(E),
    le = "xmui-mobile-approve-pending",
    _e = (function (t) {
      function e(t, i, o, s) {
        var a;
        n(this, e);
        var c = (a = l(
          this,
          r(e).call(this, Q.page_mobile_approve, le, t)
        )).createContent(i, o, s);
        return a.setContent(c), p(r(e.prototype), "busy", !0, u(a), !0), a;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function (t, e, n) {
              var i = new T();
              return (
                (i.className = "".concat(le, "_container")),
                i.appendChild(this.createSpacer()),
                null == e
                  ? this.createNoCodeContent(t, i)
                  : e === com.ts.mobile.sdk.OtpFormatType.Numeric
                  ? this.createNumericCodeContent(n, t, i)
                  : e === com.ts.mobile.sdk.OtpFormatType.QrCode &&
                    this.createQRCodeContent(n, t, i),
                i
              );
            },
          },
          {
            key: "createMessage",
            value: function (t) {
              var e = new A();
              return e.setText(t), (e.className = "".concat(le, "_message")), e;
            },
          },
          {
            key: "createSpacer",
            value: function () {
              var t = new T();
              return (t.className = "".concat(le, "_spacer")), t;
            },
          },
          {
            key: "createNoCodeContent",
            value: function (t, e) {
              var n = new T();
              n.className = ""
                .concat(le, "_icon ")
                .concat(I.MobileApproveWaiting);
              var i = this.createMessage(t);
              e.appendChildren(n, this.createSpacer(), i, this.createSpacer());
            },
          },
          {
            key: "createNumericCodeContent",
            value: function (t, e, n) {
              var i = this.createMessage(e),
                o = new A();
              return (
                (o.className = "".concat(le, "_numeric-code")),
                o.setText(t),
                n.appendChildren(
                  i,
                  this.createSpacer(),
                  o,
                  this.createSpacer()
                ),
                n
              );
            },
          },
          {
            key: "createQRCodeContent",
            value: function (t, e, n) {
              var i = this.createMessage(e),
                o = new T();
              o.className = "".concat(le, "_qr-code-container");
              var s = new ue();
              return (
                (s.className = "".concat(le, "_qr-code")),
                (s.src = t),
                o.appendChild(s),
                n.appendChildren(i, this.createSpacer(), o),
                n
              );
            },
          },
          { key: "busy", set: function (t) {} },
        ]),
        e
      );
    })(ne);
  !(function (t) {
    (t[(t.TargetSelection = 0)] = "TargetSelection"),
      (t[(t.PollingRequested = 1)] = "PollingRequested"),
      (t[(t.PollingStarted = 2)] = "PollingStarted");
  })(ee || (ee = {}));
  var he,
    de = (function (t) {
      function e(t, i, o) {
        var s;
        return (
          n(this, e),
          ((s = l(this, r(e).call(this, t, i))).state = ee.TargetSelection),
          (s.pollingIntervalMillis = 3e3),
          (s.instructions = o),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setPollingIntervalInMillis",
            value: function (t) {
              this.pollingIntervalMillis = t;
            },
          },
          {
            key: "setCreatedApprovalInfo",
            value: function (t, e) {
              null != t
                ? (this.setupOtp(e), (this.state = ee.PollingRequested))
                : (this.setupOtp(null),
                  (this.state = ee.TargetSelection),
                  clearTimeout(this.pollingTimer));
            },
          },
          {
            key: "setAvailableTargets",
            value: function (t) {
              this.availableTargets = t;
            },
          },
          {
            key: "endSession",
            value: function () {
              h(r(e.prototype), "endSession", this).call(this),
                clearTimeout(this.pollingTimer);
            },
          },
          {
            key: "promiseInput",
            value: function () {
              var t,
                e = this;
              switch (this.mode) {
                case com.ts.mobile.sdk.AuthenticatorSessionMode.Authentication:
                  switch (
                    (It.log("Fetching Mobile Approve authentication input;"),
                    this.state)
                  ) {
                    case ee.TargetSelection:
                      t = this.promiseTargetSelectionInput();
                      break;
                    case ee.PollingRequested:
                      (this.state = ee.PollingStarted),
                        this.showPendingUI(),
                        (t = this.startPolling());
                      break;
                    case ee.PollingStarted:
                      t = this.startPolling();
                  }
                  break;
                case com.ts.mobile.sdk.AuthenticatorSessionMode.Registration:
              }
              return (t = t || Promise.reject("Illegal state")).then(function (
                t
              ) {
                return (e.authError = null), t;
              });
            },
          },
          {
            key: "promiseTargetSelectionInput",
            value: function () {
              var t = this;
              return new Promise(function (e, n) {
                t.setInputResolver(e);
                var i = new ce(t.actionContext);
                i.setTitle(
                  t.uiContext.getString(Z.ts_authenticator_mobile_approve)
                ),
                  i.setInstructions(
                    t.uiContext.getString(
                      Z.ts_authenticator_mobile_approve_targets_intro
                    )
                  );
                var o = {};
                t.availableTargets.forEach(function (e) {
                  var n = e.getDeviceDetails(),
                    s = n.getDeviceId(),
                    a = kt.getDeviceNameFromDeviceDetails(n),
                    r = kt.getLastAccessedFromDeviceDetails(t.uiContext, n);
                  (o[s] = e), i.addDevice(s, a, r, !1);
                }),
                  i.onSubmit(function (e) {
                    i.blockInteraction();
                    var n = e.map(function (t) {
                        return o[t];
                      }),
                      s = kt.createTargetsSelectionResponse(n);
                    t.resolveInputPromise(s);
                  }),
                  t.showAuthenticatorPage(i);
              });
            },
          },
          {
            key: "showPendingUI",
            value: function () {
              var t = new _e(
                this.actionContext,
                this.instructions,
                this.otpType,
                this.otpCode
              );
              t.setTitle(
                this.uiContext.getString(Z.ts_authenticator_mobile_approve)
              ),
                this.showAuthenticatorPage(t);
            },
          },
          {
            key: "onCancel",
            value: function () {
              this.currentInputResolveFn
                ? (clearTimeout(this.pollingTimer),
                  h(r(e.prototype), "onCancel", this).call(this))
                : (this.pendingRequest = kt.createCancelAuthenticatorRequest());
            },
          },
          {
            key: "onEscape",
            value: function (t) {
              clearTimeout(this.pollingTimer),
                h(r(e.prototype), "onEscape", this).call(this, t);
            },
          },
          {
            key: "setupOtp",
            value: function (t) {
              if (t) {
                var e = t.getFormat().getType();
                switch (((this.otpType = e), e)) {
                  case com.ts.mobile.sdk.OtpFormatType.Numeric:
                    this.otpCode = t.getValue();
                    break;
                  case com.ts.mobile.sdk.OtpFormatType.QrCode:
                    this.otpCode = "data:image/jpeg;base64," + t.getValue();
                    break;
                  default:
                    throw (
                      (It.log("Unsupported otp format"),
                      new Error("Unsupported otp format"))
                    );
                }
              } else (this.otpType = null), (this.otpCode = null);
            },
          },
          {
            key: "startPolling",
            value: function () {
              var t = this;
              return new Promise(function (e, n) {
                t.setInputResolver(e),
                  (t.pollingTimer = setTimeout(function () {
                    if (t.pendingRequest)
                      t.resolveInputPromise(t.pendingRequest),
                        (t.pendingRequest = null);
                    else {
                      var e = com.ts.mobile.sdk.MobileApproveInputRequestPolling.createRequestPollingInput(),
                        n = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(
                          e
                        ),
                        i = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                          n
                        );
                      t.resolveInputPromise(i);
                    }
                  }, t.pollingIntervalMillis));
              });
            },
          },
          {
            key: "showAuthUi",
            value: function () {
              throw new Error("Method not implemented");
            },
          },
          {
            key: "showRegUi",
            value: function () {
              throw new Error("Method not implemented");
            },
          },
        ]),
        e
      );
    })(Bt),
    pe = "xmui-pin-code",
    me = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(this, r(e).call(this))).digits = []),
          (o.className = pe),
          (o.mainInput = new Ft(t)),
          (o.mainInput.className = "".concat(pe, "_input"));
        var s = new T();
        (s.className = "".concat(pe, "_container")),
          (o.messageComp = new Ut(!0, !0)),
          (o.changeHandler = o.changeHandler.bind(u(o)));
        for (var a = 0; a < i; a++) {
          var c = new Ft(t + "_digit_" + a);
          (c.className = "".concat(pe, "_digit")),
            (c.type = "text"),
            (c.autocomplete = $t.Off),
            (c.ariaLabel = "pin code digit ".concat(a + 1)),
            c.onKeypress(o.keypressHandler),
            c.onKeydown(o.keydownHandler),
            c.onPaste(function (t) {
              return t.preventDefault();
            }),
            c.onCut(function (t) {
              return t.preventDefault();
            }),
            c.onFocus(o.focusHandler),
            c.onChange(o.changeHandler),
            0 === a
              ? ((c.tabindex = 0), (c.ariaDescribedBy = o.messageComp.id))
              : (c.tabindex = -1),
            o.digits.push(c),
            s.appendChild(c);
        }
        return o.appendChildren(o.mainInput, s, o.messageComp), o;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "focus",
            value: function () {
              var t = this.digits[0];
              t && t.focus();
            },
          },
          {
            key: "onChange",
            value: function (t) {
              this.changeCB = t;
            },
          },
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), (this.errorMessage = t || "");
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1), (this.errorMessage = "");
            },
          },
          {
            key: "keypressHandler",
            value: function (t, e) {
              var n = e.keyCode,
                i = e.target;
              (i.selectionEnd - i.selectionStart == 0 &&
                1 === i.value.length) ||
              n < K.Zero ||
              n > K.Nine
                ? e.preventDefault()
                : i.nextElementSibling instanceof HTMLInputElement &&
                  i.nextElementSibling.className === "".concat(pe, "_digit") &&
                  setTimeout(function () {
                    var t = i.nextElementSibling;
                    t.focus(), (t.selectionStart = 0), (t.selectionEnd = 1);
                  });
            },
          },
          {
            key: "keydownHandler",
            value: function (t, e) {
              var n = e.target;
              e.keyCode === K.Backspace &&
                0 === n.selectionStart &&
                0 === n.selectionEnd &&
                n.previousElementSibling instanceof HTMLInputElement &&
                n.previousElementSibling.className ===
                  "".concat(pe, "_digit") &&
                ((n.previousElementSibling.value = ""),
                n.previousElementSibling.focus());
            },
          },
          {
            key: "focusHandler",
            value: function (t) {
              var e = t.target;
              e.value.length &&
                ((e.selectionStart = 0), (e.selectionEnd = e.value.length));
            },
          },
          {
            key: "changeHandler",
            value: function () {
              var t = "";
              this.digits.forEach(function (e) {
                t += e.value;
              }),
                (this.mainInput.value = t),
                this.changeCB && this.changeCB();
            },
          },
          {
            key: "name",
            set: function (t) {
              this.mainInput.name = t;
            },
          },
          {
            key: "value",
            set: function (t) {
              (this.mainInput.value = t),
                this.digits.forEach(function (e, n) {
                  e.value = t[n] || "";
                });
            },
            get: function () {
              return this.mainInput.value;
            },
          },
          {
            key: "errorMessage",
            set: function (t) {
              this.messageComp.setText(t);
            },
          },
        ]),
        e
      );
    })(T),
    ge = "xmui-pin-code-authentication",
    fe = "xmui-pin-code-registration";
  !(function (t) {
    (t[(t.Enter = 0)] = "Enter"), (t[(t.Repeat = 1)] = "Repeat");
  })(he || (he = {}));
  var ve = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          ((s = l(
            this,
            r(e).call(
              this,
              o ? Q.page_pin_reg : Q.page_pin_auth,
              o ? fe : ge,
              t
            )
          )).numDigits = i),
          (s.isRegistrationMode = o),
          (s.mode = he.Enter),
          s.setTitle(s.getTitle()),
          s.setInstructions(s.getInstructions());
        var a = s.createForm();
        if ((s.setContent(a), s.isRegistrationMode)) {
          var c = new dt(Q.button_reset);
          (c.label = s.uiContext.getString(Z.ts_gen_restart)),
            (c.disabled = !0),
            c.onClick(s.handleReset.bind(u(s))),
            (s.resetButton = c),
            s.addRightButton(c);
        }
        return s;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), this.pinCode.setError(t);
            },
          },
          {
            key: "clearError",
            value: function () {
              this.pinCode.clearError(), (this.error = !1);
            },
          },
          {
            key: "getTitle",
            value: function () {
              var t = this.isRegistrationMode
                ? Z.ts_authenticator_pin_title_reg
                : Z.ts_authenticator_pin_title_auth;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getRegModeInstructions",
            value: function () {
              var t =
                this.mode === he.Enter
                  ? Z.ts_authenticator_pin_intro_reg
                  : Z.ts_authenticator_pin_intro_repeat;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getInstructions",
            value: function () {
              return this.isRegistrationMode
                ? this.getRegModeInstructions()
                : this.uiContext.getString(Z.ts_authenticator_pin_intro_auth);
            },
          },
          {
            key: "handleReset",
            value: function () {
              (this.mode = he.Enter),
                (this.pinCode.value = ""),
                this.pinCode.focus(),
                (this.enteredPinCode = null),
                (this.resetButton.disabled = !0),
                this.setInstructions(this.getInstructions());
            },
          },
          {
            key: "handleNoMatch",
            value: function () {
              (this.pinCode.value = ""),
                this.pinCode.setError(
                  this.uiContext.getString(
                    Z.ts_authenticator_pin_error_reg_no_match
                  )
                ),
                this.pinCode.focus();
            },
          },
          {
            key: "submitPinCode",
            value: function (t) {
              this.onSubmitCB && this.onSubmitCB(t);
            },
          },
          {
            key: "repeat",
            value: function () {
              (this.mode = he.Repeat),
                (this.pinCode.value = ""),
                this.pinCode.focus(),
                (this.resetButton.disabled = !1),
                this.setInstructions(this.getInstructions());
            },
          },
          {
            key: "handleRegPinCodeChanged",
            value: function (t) {
              this.mode === he.Enter
                ? ((this.enteredPinCode = t), this.repeat())
                : this.enteredPinCode === t
                ? this.submitPinCode(t)
                : this.handleNoMatch();
            },
          },
          {
            key: "handlePinCodeChanged",
            value: function () {
              this.clearError();
              var t = this.pinCode.value;
              t.length === this.numDigits &&
                (this.isRegistrationMode
                  ? this.handleRegPinCodeChanged(t)
                  : this.submitPinCode(t));
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = new te();
              t.addClass("xmui-pin-code-form");
              var e = new me(Q.input_pin_code, this.numDigits);
              return (
                (e.name = "pin-code"),
                (e.value = ""),
                e.onChange(this.handlePinCodeChanged.bind(this)),
                e.focus(),
                (this.pinCode = e),
                t.appendChild(e),
                t
              );
            },
          },
        ]),
        e
      );
    })(ne),
    ye = (function (t) {
      function e(t, i, o) {
        var s;
        return (
          n(this, e),
          ((s = l(this, r(e).call(this, t, i))).supportsInlineError = !0),
          (s.pinLength = o),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "showAuthUi",
            value: function () {
              this.showPinCodePage(!1);
            },
          },
          {
            key: "showRegUi",
            value: function () {
              this.showPinCodePage(!0);
            },
          },
          {
            key: "showPinCodePage",
            value: function (t) {
              var e = this,
                n = new ve(this.actionContext, this.pinLength, t);
              this.authError && n.setError(this.authError.getMessage()),
                n.onSubmit(function (t) {
                  n.blockInteraction();
                  var i = com.ts.mobile.sdk.PinInput.create(t);
                  e.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      i
                    )
                  );
                }),
                this.showAuthenticatorPage(n);
            },
          },
        ]),
        e
      );
    })(Bt);
  function ke() {}
  function Ce(t) {
    return t instanceof NodeList || t instanceof HTMLCollection
      ? Array.prototype.slice.call(t)
      : [t];
  }
  function be(t, e) {
    if ("string" == typeof e) return window.getComputedStyle(t)[e];
    Object.keys(e).forEach(function (n) {
      var i = e[n];
      t.style[n] = i;
    });
  }
  function we(t, e) {
    var n = e.split(" ");
    n.length > 1
      ? n.forEach(function (e) {
          return we(t, e);
        })
      : t.classList
      ? t.classList.add(e)
      : (t.className += " ".concat(e));
  }
  function xe(t, e) {
    var n = e.split(" ");
    n.length > 1
      ? n.forEach(function (e) {
          return xe(t, e);
        })
      : t.classList
      ? t.classList.remove(e)
      : (t.className = t.className.replace(
          new RegExp("(^|\\b)".concat(e.split(" ").join("|"), "(\\b|$)"), "gi"),
          " "
        ));
  }
  function Se(t) {
    Ce(t).forEach(function (t) {
      t.parentNode.removeChild(t);
    });
  }
  function Ie(t, e, n, i) {
    var o = e - t,
      s = i - n;
    return {
      length: Math.ceil(Math.sqrt(o * o + s * s)),
      angle: Math.round((180 * Math.atan2(s, o)) / Math.PI),
    };
  }
  var Ee = new WeakMap(),
    Ae = (function () {
      function t() {
        n(this, t),
          (this.holder = null),
          (this.option = null),
          (this.mapperFunc = ke),
          (this.holderLeft = 0),
          (this.holderTop = 0),
          (this.disabled = !1),
          (this.patternAry = []),
          (this.lastPosObj = []),
          (this.rightPattern = null),
          (this.onSuccess = ke),
          (this.onError = ke),
          (this.pattCircle = null),
          (this.lineX1 = 0),
          (this.lineY1 = 0),
          (this.line = null),
          (this.lastPosObj = null),
          (this.dotYOffest = null);
      }
      return (
        o(t, [
          {
            key: "getElementsFromPoint",
            value: function (t, e) {
              if (document.elementsFromPoint)
                return document.elementsFromPoint(t, e);
              for (
                var n = [],
                  i = document.msElementsFromPoint(t, e),
                  o = i.length,
                  s = 0;
                s < o;
                s++
              )
                n.push(i.item(s));
              return n;
            },
          },
          {
            key: "getIdxFromPoint",
            value: function (t, e) {
              var n,
                i,
                o,
                s,
                a = t - this.holderLeft,
                r = e - this.holderTop;
              if (
                (this.getElementsFromPoint(t, e).some(function (t) {
                  return (
                    -1 != t.className.indexOf("patt-circ") &&
                    ((n = t.firstElementChild), !0)
                  );
                }),
                n)
              ) {
                var c = this.option.matrix,
                  u = parseInt(n.getAttribute("patt-dots-index"));
                (s = u + 1),
                  (i = (u % c[1]) + 1),
                  (o = Math.floor(u / c[1]) + 1);
              }
              return { idx: s, i: i, j: o, x: a, y: r };
            },
          },
          {
            key: "markPoint",
            value: function (t, e) {
              we(t, "hovered"), this.patternAry.push(e), (this.lastElm = t);
            },
          },
          {
            key: "addLine",
            value: function (t) {
              var e = this.dotYOffest,
                n = this.pattCircle,
                i = this.patternAry,
                o = this.holderLeft,
                s = this.holderTop,
                a = this.holder,
                r = this.option.lineOnMove,
                c = n[t.idx - 1].firstElementChild.getBoundingClientRect(),
                u = c.left + c.width / 2 - o,
                l = c.top + c.height / 2 - s;
              if (i.length > 1) {
                var _ = Ie(this.lineX1, u, this.lineY1, l),
                  h = _.length,
                  d = _.angle;
                be(this.line, {
                  width: "".concat(h, "px"),
                  transform: "rotate(".concat(d, "deg)"),
                }),
                  r || be(this.line, { display: "block" });
              }
              if (null == e) {
                var p = document.createElement("div");
                (p.className = "patt-lines"),
                  (p.style.width = "0px"),
                  (p.style.visibility = "hidden"),
                  (p.style.position = "absolute"),
                  (p.style.top = "0px"),
                  (p.style.left = "0px"),
                  a.appendChild(p);
                var m = p.getBoundingClientRect();
                (this.dotYOffest = m.height / 2), a.removeChild(p);
              }
              var g,
                f,
                v =
                  ((g = '<div class="patt-lines" style="top:'
                    .concat(l - this.dotYOffest, "px; left: ")
                    .concat(u, 'px;"></div>')),
                  ((f = document.createElement("div")).innerHTML = g),
                  f.children[0]);
              (this.line = v),
                (this.lineX1 = u),
                (this.lineY1 = l),
                this.holder.appendChild(v),
                r || be(this.line, { display: "none" });
            },
          },
          {
            key: "addDirectionClass",
            value: function (t) {
              var e = this.lastElm,
                n = this.line,
                i = this.lastPosObj,
                o = [];
              if (
                (t.j - i.j > 0 ? o.push("s") : t.j - i.j < 0 && o.push("n"),
                t.i - i.i > 0 ? o.push("e") : t.i - i.i < 0 && o.push("w"),
                (o = o.join("-")))
              ) {
                var s = "".concat(o, " dir");
                we(e, s), we(n, s);
              }
            },
          },
        ]),
        t
      );
    })(),
    Pe = (function () {
      function t(i) {
        var o =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        n(this, t),
          (this._onStart = this._onStart.bind(this)),
          (this._onMove = this._onMove.bind(this)),
          (this._onEnd = this._onEnd.bind(this)),
          (this._renderCircle = this._renderCircle.bind(this));
        var s = new Ae(),
          a = i;
        if (a && 0 !== a.length) {
          var r = { onDraw: ke, onStart: ke },
            c = o.matrix;
          c && c[0] * c[1] > 9 && (r.delimiter = ","),
            (s.option = (function (t) {
              for (
                var e = arguments.length,
                  n = new Array(e > 1 ? e - 1 : 0),
                  i = 1;
                i < e;
                i++
              )
                n[i - 1] = arguments[i];
              return (
                n.forEach(function (e) {
                  Object.keys(e).forEach(function (n) {
                    t[n] = e[n];
                  });
                }),
                t
              );
            })({}, t.defaults, r, o)),
            (s.circContainerWidth = 100 / s.option.matrix[1]),
            (s.circContainerHeight = 100 / s.option.matrix[0]);
          var u = s.option.mapper;
          "object" === e(u)
            ? (s.mapperFunc = function (t) {
                return u[t];
              })
            : (s.mapperFunc = "function" == typeof u ? u : ke),
            (s.option.mapper = null),
            (s.holder = a),
            Ee.set(this, s),
            this._render(),
            we(a, "patt-holder"),
            "static" === be(a, "position") && be(a, { position: "relative" }),
            a.addEventListener("touchstart", this._onStart),
            a.addEventListener("mousedown", this._onStart);
        }
      }
      return (
        o(t, [
          {
            key: "getPattern",
            value: function () {
              var t = Ee.get(this),
                e = t.patternAry,
                n = t.option;
              return (e || []).join(n.delimiter);
            },
          },
          {
            key: "setPattern",
            value: function (t) {
              var e = Ee.get(this),
                n = e.option,
                i = n.matrix,
                o = n.margin,
                s = n.radius,
                a = n.enableSetPattern,
                r = n.delimiter;
              if (a) {
                var c = "string" == typeof t ? t.split(r) : t;
                this.reset(), (e.holderLeft = 0), (e.holderTop = 0);
                for (var u = 0; u < c.length; u += 1) {
                  var l = c[u] - 1,
                    _ = (l % i[1]) * (2 * o + 2 * s) + 2 * o + s,
                    h = Math.floor(l / i[1]) * (2 * o + 2 * s) + 2 * o + s;
                  this._onMove.call(
                    null,
                    { clientX: _, clientY: h, preventDefault: ke },
                    this
                  );
                }
              }
            },
          },
          {
            key: "enable",
            value: function () {
              Ee.get(this).disabled = !1;
            },
          },
          {
            key: "disable",
            value: function () {
              Ee.get(this).disabled = !0;
            },
          },
          {
            key: "reset",
            value: function () {
              var t = Ee.get(this);
              Ce(t.pattCircle).forEach(function (t) {
                return xe(t, "hovered dir s n w e s-w s-e n-w n-e");
              }),
                Se(t.holder.querySelectorAll(".patt-lines")),
                (t.patternAry = []),
                (t.lastPosObj = null),
                xe(t.holder, "patt-error");
            },
          },
          {
            key: "setError",
            value: function () {
              we(Ee.get(this).holder, "patt-error");
            },
          },
          {
            key: "clearError",
            value: function () {
              xe(Ee.get(this).holder, "patt-error");
            },
          },
          {
            key: "checkForPattern",
            value: function (t, e, n) {
              var i = Ee.get(this);
              (i.rightPattern = t),
                (i.onSuccess = e || ke),
                (i.onError = n || ke);
            },
          },
          {
            key: "_onStart",
            value: function (t) {
              var e = Ee.get(this),
                n = e.holder,
                i = e.option;
              if ((t.preventDefault(), !e.disabled)) {
                e.option.patternVisible || we(e.holder, "patt-hidden"),
                  (this.moveEvent =
                    "touchstart" === t.type ? "touchmove" : "mousemove"),
                  (this.endEvent =
                    "touchstart" === t.type ? "touchend" : "mouseup"),
                  n.addEventListener(this.moveEvent, this._onMove),
                  document.addEventListener(this.endEvent, this._onEnd);
                var o = e.holder.getBoundingClientRect();
                (e.holderTop = o.top),
                  (e.holderLeft = o.left),
                  this.reset(),
                  i.onStart();
              }
            },
          },
          {
            key: "_onMove",
            value: function (t) {
              t.preventDefault();
              var e = Ee.get(this),
                n = e.option,
                i = e.patternAry,
                o = t.clientX || t.touches[0].clientX,
                s = t.clientY || t.touches[0].clientY,
                a = e.pattCircle,
                r = e.getIdxFromPoint(o, s),
                c = r.idx,
                u = e.mapperFunc(c) || c;
              if (i.length > 0) {
                var l = Ie(e.lineX1, r.x, e.lineY1, r.y),
                  _ = l.length,
                  h = l.angle;
                be(e.line, {
                  width: "".concat(_ + 2, "px"),
                  transform: "rotate(".concat(h, "deg)"),
                });
              }
              if (
                c &&
                ((n.allowRepeat && i[i.length - 1] !== u) ||
                  -1 === i.indexOf(u))
              ) {
                var d = a[c - 1];
                if (e.lastPosObj)
                  for (
                    var p = e.lastPosObj,
                      m = r.i - p.i > 0 ? 1 : -1,
                      g = r.j - p.j > 0 ? 1 : -1,
                      f = p.i,
                      v = p.j,
                      y = Math.abs(r.i - f),
                      k = Math.abs(r.j - v);
                    (0 === y && k > 1) ||
                    (0 === k && y > 1) ||
                    (k === y && k > 1);

                  ) {
                    (f = y ? f + m : f),
                      (v = k ? v + g : v),
                      (y = Math.abs(r.i - f)),
                      (k = Math.abs(r.j - v));
                    var C = (v - 1) * n.matrix[1] + f,
                      b = e.mapperFunc(C) || C;
                    (n.allowRepeat || -1 === i.indexOf(b)) &&
                      (e.addDirectionClass({ i: f, j: v }),
                      e.markPoint(a[b - 1], b),
                      e.addLine({ idx: c, i: f, j: v }));
                  }
                e.lastPosObj && e.addDirectionClass(r),
                  e.markPoint(d, u),
                  e.addLine(r),
                  (e.lastPosObj = r);
              }
            },
          },
          {
            key: "_onEnd",
            value: function (t) {
              t.preventDefault();
              var e = Ee.get(this),
                n = e.option,
                i = e.patternAry.join(n.delimiter);
              e.holder.removeEventListener(this.moveEvent, this._onMove),
                document.removeEventListener(this.endEvent, this._onEnd),
                xe(e.holder, "patt-hidden"),
                i &&
                  (Se(e.line),
                  n.onDraw(i),
                  e.rightPattern &&
                    (i === e.rightPattern
                      ? e.onSuccess()
                      : (e.onError(), this.error())));
            },
          },
          {
            key: "_renderCircle",
            value: function (t, e) {
              var n = Ee.get(this),
                i = n.circContainerHeight,
                o = n.circContainerWidth;
              return '<div class="patt-circ-container" style="width: '
                .concat(o, "%; height: ")
                .concat(i, "%; flex-basis: ")
                .concat(
                  o,
                  '%;">\n                <div class="patt-circ">\n                  <div patt-dots-index='
                )
                .concat(
                  e,
                  ' class="patt-dots"></div>\n                </div>\n            </div>'
                );
            },
          },
          {
            key: "_render",
            value: function () {
              var t = Ee.get(this),
                e = t.option,
                n = t.holder,
                i = e.matrix,
                o =
                  (e.margin,
                  e.radius,
                  '<div class="patt-wrap">\n                    '.concat(
                    (function (t, e) {
                      for (var n = new Array(t), i = 0; i < t; i++) n[i] = e;
                      return n;
                    })(i[0] * i[1])
                      .map(this._renderCircle)
                      .join(""),
                    "\n                  </div>"
                  ));
              (n.innerHTML = o),
                (t.pattCircle = t.holder.querySelectorAll(".patt-circ"));
            },
          },
          {
            key: "option",
            value: function (t, e) {
              var n = Ee.get(this).option;
              return void 0 === e
                ? n[t]
                : ((n[t] = e),
                  ("margin" !== t && "matrix" !== t && "radius" !== t) ||
                    this._render(),
                  this);
            },
          },
        ]),
        t
      );
    })();
  Pe.defaults = {
    matrix: [3, 3],
    margin: 20,
    radius: 25,
    patternVisible: !0,
    lineOnMove: !0,
    delimiter: "",
    enableSetPattern: !1,
    allowRepeat: !0,
  };
  var Te,
    Re = "xmui-pattern-lock",
    Me = "".concat(Re, "_pattern"),
    Be = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          ((s = l(this, r(e).call(this))).className = Re),
          (s.tabindex = 0),
          (s.mainInput = new Ft(t)),
          (s.mainInput.className = "".concat(Re, "_input")),
          s.appendChild(s.mainInput),
          (s.handleSelectedPattern = s.handleSelectedPattern.bind(u(s))),
          (s.handlePatternStarted = s.handlePatternStarted.bind(u(s)));
        var a = new T();
        return (
          (a.className = Me),
          (s.patternLockExt = new Pe(a.htmlElement, {
            matrix: [o, i],
            onDraw: s.handleSelectedPattern,
            onStart: s.handlePatternStarted,
          })),
          (s.messageComp = new Ut(!0, !0)),
          (s.ariaDescribedBy = s.messageComp.id),
          s.appendChildren(a, s.messageComp),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setError",
            value: function (t) {
              (this.error = !0),
                (this.errorMessage = t || ""),
                this.patternLockExt.setError();
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1),
                (this.errorMessage = ""),
                this.patternLockExt.clearError();
            },
          },
          {
            key: "reset",
            value: function () {
              this.patternLockExt.reset();
            },
          },
          {
            key: "onChange",
            value: function (t) {
              this.changeCB = t;
            },
          },
          {
            key: "onStart",
            value: function (t) {
              this.startCB = t;
            },
          },
          {
            key: "handleSelectedPattern",
            value: function (t) {
              (this.mainInput.value = t), this.changeCB && this.changeCB();
            },
          },
          {
            key: "handlePatternStarted",
            value: function () {
              this.startCB && this.startCB();
            },
          },
          {
            key: "name",
            set: function (t) {
              this.mainInput.name = t;
            },
          },
          {
            key: "value",
            set: function (t) {},
            get: function () {
              return this.mainInput.value;
            },
          },
          {
            key: "errorMessage",
            set: function (t) {
              this.messageComp.setText(t);
            },
          },
        ]),
        e
      );
    })(T),
    Ne = "xmui-pattern-authentication",
    De = "xmui-pattern-registration";
  !(function (t) {
    (t[(t.Enter = 0)] = "Enter"), (t[(t.Repeat = 1)] = "Repeat");
  })(Te || (Te = {}));
  var Le,
    Fe = (function (t) {
      function e(t, i, o, s) {
        var a;
        n(this, e),
          ((a = l(
            this,
            r(e).call(
              this,
              s ? Q.page_pattern_reg : Q.page_pattern_auth,
              s ? De : Ne,
              t
            )
          )).isRegistrationMode = s),
          (a.mode = Te.Enter),
          (a._minPoints = 4),
          a.setTitle(a.getTitle()),
          a.setInstructions(a.getInstructions());
        var c = a.createForm(i, o);
        if ((a.setContent(c), a.isRegistrationMode)) {
          var _ = new dt(Q.button_reset);
          (_.label = a.uiContext.getString(
            Z.ts_authenticator_pattern_cta_reset
          )),
            (_.disabled = !0),
            _.onClick(a.handleReset.bind(u(a))),
            (a.resetButton = _),
            a.addRightButton(_);
        }
        return a;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), this.patternLock.setError(t);
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1), this.patternLock.clearError();
            },
          },
          {
            key: "handleReset",
            value: function () {
              (this.mode = Te.Enter),
                this.patternLock.reset(),
                (this.enteredPattern = null),
                (this.resetButton.disabled = !0),
                this.setInstructions(this.getInstructions()),
                this.clearError();
            },
          },
          {
            key: "getTitle",
            value: function () {
              var t = this.isRegistrationMode
                ? Z.ts_authenticator_pattern_title_reg
                : Z.ts_authenticator_pattern_title_auth;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getRegModeInstructions",
            value: function () {
              var t =
                this.mode === Te.Enter
                  ? Z.ts_authenticator_pattern_intro_reg
                  : Z.ts_authenticator_pattern_intro_repeat;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getInstructions",
            value: function () {
              return this.isRegistrationMode
                ? this.getRegModeInstructions()
                : this.uiContext.getString(
                    Z.ts_authenticator_pattern_intro_auth
                  );
            },
          },
          {
            key: "handleNoMatch",
            value: function () {
              this.patternLock.setError(
                this.uiContext.getString(Z.ts_authenticator_pattern_mismatch)
              );
            },
          },
          {
            key: "submitPattern",
            value: function (t) {
              this.onSubmitCB && this.onSubmitCB(t);
            },
          },
          {
            key: "repeat",
            value: function () {
              this.patternLock.reset(),
                (this.mode = Te.Repeat),
                (this.resetButton.disabled = !1),
                this.setInstructions(this.getInstructions());
            },
          },
          {
            key: "validateLength",
            value: function (t) {
              return JSON.parse("[" + t + "]").length >= this._minPoints;
            },
          },
          {
            key: "handleRegPatternChangedEnterMode",
            value: function (t) {
              this.validateLength(t)
                ? ((this.enteredPattern = t), this.repeat())
                : this.notifyShortPattern();
            },
          },
          {
            key: "notifyShortPattern",
            value: function () {
              this.patternLock.setError(
                this.uiContext.getString(
                  Z.ts_authenticator_pattern_error_min_points
                )
              );
            },
          },
          {
            key: "handleRegPattrenChanged",
            value: function (t) {
              this.mode === Te.Enter
                ? this.handleRegPatternChangedEnterMode(t)
                : this.enteredPattern === t
                ? this.submitPattern(t)
                : this.handleNoMatch();
            },
          },
          {
            key: "handlePattrenChanged",
            value: function () {
              var t = this.patternLock.value;
              this.isRegistrationMode
                ? this.handleRegPattrenChanged(t)
                : this.submitPattern(t);
            },
          },
          {
            key: "handlePatternStarted",
            value: function () {
              this.clearError();
            },
          },
          {
            key: "createForm",
            value: function (t, e) {
              var n = new te();
              n.addClass("xmui-pattern-form");
              var i = new Be(Q.input_pattern_lock, t, e);
              return (
                (i.name = "pattern"),
                i.onChange(this.handlePattrenChanged.bind(this)),
                i.onStart(this.handlePatternStarted.bind(this)),
                i.focus(),
                (this.patternLock = i),
                n.appendChild(i),
                n
              );
            },
          },
          {
            key: "minPoints",
            set: function (t) {
              t > 2 && (this._minPoints = t);
            },
          },
        ]),
        e
      );
    })(ne),
    qe = (function (t) {
      function e(t, i, o, s) {
        var a;
        return (
          n(this, e),
          ((a = l(this, r(e).call(this, t, i))).gridWidth = o),
          (a.gridHeight = s),
          (a.supportsInlineError = !0),
          a
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "showAuthUi",
            value: function () {
              this.showPatternPage(!1);
            },
          },
          {
            key: "showRegUi",
            value: function () {
              this.showPatternPage(!0);
            },
          },
          {
            key: "showPatternPage",
            value: function (t) {
              var e = this,
                n = new Fe(
                  this.actionContext,
                  this.gridWidth,
                  this.gridHeight,
                  t
                );
              this.authError && n.setError(this.authError.getMessage()),
                n.onSubmit(function (t) {
                  n.blockInteraction();
                  var i = com.ts.mobile.sdk.PatternInput.create(
                    e.createPatternInputString(t)
                  );
                  e.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      i
                    )
                  );
                }),
                this.showAuthenticatorPage(n);
            },
          },
          {
            key: "pointsIndexToCoorinate",
            value: function (t) {
              var e = this;
              return t.map(function (t) {
                return {
                  y: Math.floor((t - 1) / e.gridWidth),
                  x: (t - 1) % e.gridWidth,
                };
              });
            },
          },
          {
            key: "createPatternInputString",
            value: function (t) {
              var e = JSON.parse("[".concat(t, "]"));
              return this.pointsIndexToCoorinate(e)
                .map(function (t) {
                  return "r:".concat(t.y, ",c:").concat(t.x);
                })
                .join("");
            },
          },
        ]),
        e
      );
    })(Bt),
    Oe = "xmui-tabs",
    je = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).tabs = new Map()),
          (t.className = Oe),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addTab",
            value: function (t, e) {
              var n = this,
                i = new T();
              (i.className = "".concat(Oe, "_tab")),
                i.appendChild(e),
                this.tabs.set(t, i),
                this.appendChild(i),
                i.onClick(function () {
                  i !== n.selectedTab &&
                    (n.selectTab(i),
                    n.selectionChangedCB && n.selectionChangedCB(t));
                });
            },
          },
          {
            key: "selectTabByKey",
            value: function (t) {
              var e = this.tabs.get(t);
              this.selectTab(e);
            },
          },
          {
            key: "onSelectionChanged",
            value: function (t) {
              this.selectionChangedCB = t;
            },
          },
          {
            key: "selectTab",
            value: function (t) {
              t &&
                (this.unselectCurrentTab(),
                (t.selected = !0),
                (this.selectedTab = t));
            },
          },
          {
            key: "unselectCurrentTab",
            value: function () {
              this.selectedTab &&
                ((this.selectedTab.selected = !1), (this.selectedTab = null));
            },
          },
        ]),
        e
      );
    })(T),
    Ue = "xmui-tabbed-panels",
    He = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).keyToPanel = new Map()),
          (t.curKey = 0),
          (t.className = Ue),
          (t.tabs = new je()),
          t.tabs.onSelectionChanged(t.selectPanel.bind(u(t))),
          (t.container = new T()),
          (t.container.className = "".concat(Ue, "_container")),
          t.appendChildren(t.tabs, t.container),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addPanel",
            value: function (t, e) {
              var n = this.generateKey();
              this.tabs.addTab(n, t),
                (e.show = !1),
                this.container.appendChild(e),
                this.keyToPanel.set(n, e),
                1 === this.keyToPanel.size &&
                  (this.tabs.selectTabByKey(n), this.selectPanel(n));
            },
          },
          {
            key: "generateKey",
            value: function () {
              return (++this.curKey).toString();
            },
          },
          {
            key: "selectPanel",
            value: function (t) {
              var e = this.keyToPanel.get(t);
              e !== this.selectedPanel &&
                ((e.show = !0),
                this.selectedPanel && (this.selectedPanel.show = !1),
                (this.selectedPanel = e));
            },
          },
        ]),
        e
      );
    })(T),
    Qe = "xmui-tab-content",
    Ke = "".concat(Qe, "_title"),
    Ve = "".concat(Qe, "_icon"),
    ze = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).className = Qe),
          (t.iconComp = new T()),
          (t.iconComp.className = Ve),
          (t.titleComp = new A()),
          (t.titleComp.className = Ke),
          t.appendChildren(t.iconComp, t.titleComp),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "title",
            set: function (t) {
              this.titleComp.setText(t);
            },
          },
          {
            key: "icon",
            set: function (t) {
              this.iconComp.className = "".concat(Ve, " ").concat(t);
            },
          },
        ]),
        e
      );
    })(T),
    We = "xmui-select-channel-page",
    Ze = (function (t) {
      function e(t) {
        var i, o;
        n(this, e),
          ((o = l(
            this,
            r(e).call(this, Q.page_otp_select_channel, We, t)
          )).typeToList = new Map()),
          (o.channelTypeToLocalizationKey =
            (s(
              (i = {}),
              com.ts.mobile.sdk.OtpChannel.Sms,
              Z.ts_authenticator_otp_sms_title
            ),
            s(
              i,
              com.ts.mobile.sdk.OtpChannel.Email,
              Z.ts_authenticator_otp_email_title
            ),
            s(
              i,
              com.ts.mobile.sdk.OtpChannel.PushNotification,
              Z.ts_authenticator_otp_push_title
            ),
            s(
              i,
              com.ts.mobile.sdk.OtpChannel.VoiceCall,
              Z.ts_authenticator_otp_voice_title
            ),
            i));
        var a = o.createContent();
        return (
          o.setContent(a),
          (o.handleSelectionChanged = o.handleSelectionChanged.bind(u(o))),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function () {
              return (this.tabbedPanels = new He()), this.tabbedPanels;
            },
          },
          {
            key: "addChannelTarget",
            value: function (t) {
              var e =
                  this.typeToList.get(t.channel) || this.createTabbedList(t),
                n = new ct(t.targetName, t.targetInfo);
              e.addListItem(t.targetId, !1, n);
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "handleSelectionChanged",
            value: function (t) {
              this.onSubmitCB && this.onSubmitCB(t[0]);
            },
          },
          {
            key: "createList",
            value: function (t) {
              var e = new at();
              return (
                this.typeToList.set(t, e),
                e.onSelectionChanged(this.handleSelectionChanged),
                e
              );
            },
          },
          {
            key: "createTabbedList",
            value: function (t) {
              var e = new ze(),
                n = this.channelTypeToLocalizationKey[t.channel] || "UNKNOWN";
              (e.title = this.uiContext.getString(n)),
                (e.icon = ut.getChannelIcon(t.channel));
              var i = this.createList(t.channel);
              return this.tabbedPanels.addPanel(e, i), i;
            },
          },
        ]),
        e
      );
    })(ne),
    Ye = "xmui-message-with-action",
    $e = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this))).className = Ye),
          (t.message = new A()),
          (t.message.className = "".concat(Ye, "_message")),
          (t.action = new A()),
          (t.action.className = "".concat(Ye, "_action")),
          t.appendChildren(t.message, t.action),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setMessage",
            value: function (t) {
              this.message.setText(t);
            },
          },
          {
            key: "setAction",
            value: function (t, e) {
              this.action.setText(t), this.onClick(e);
            },
          },
        ]),
        e
      );
    })(T),
    Xe = "xmui-otp-page",
    Ge = "".concat(Xe, "_content"),
    Je = "".concat(Xe, "_message-container"),
    tn = 7,
    en = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          ((s = l(
            this,
            r(e).call(this, Q.page_otp_auth, Xe, t)
          )).numDigits = i),
          (s.useBackButton = o),
          (s.useNormalInput = s.numDigits > tn),
          s.setTitle(s.uiContext.getString(Z.ts_authenticator_otp_title_auth));
        var a = s.createContent();
        if (
          (s.setContent(a),
          o &&
            ((s.cancelButton.automationId = Q.button_back),
            (s.cancelButton.label = s.uiContext.getString(Z.ts_gen_back))),
          s.useNormalInput)
        ) {
          var c = new dt(Q.button_continue);
          (c.label = s.uiContext.getString(Z.ts_gen_continue)),
            (c.disabled = !0),
            c.onClick(function () {
              s.submitOtpCode(s.otpCodeComp.value);
            }),
            (s.continueButton = c),
            s.addRightButton(c);
        }
        return s;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "handleCancelButtonClicked",
            value: function () {
              this.useBackButton
                ? this.onBackCB && this.onBackCB()
                : h(r(e.prototype), "handleCancelButtonClicked", this).call(
                    this
                  );
            },
          },
          {
            key: "onBack",
            value: function (t) {
              this.onBackCB = t;
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "onResend",
            value: function (t) {
              this.onResendCB = t;
            },
          },
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), this.otpCodeComp.setError(t);
            },
          },
          {
            key: "clearError",
            value: function () {
              this.otpCodeComp.clearError(), (this.error = !1);
            },
          },
          {
            key: "submitOtpCode",
            value: function (t) {
              this.onSubmitCB && this.onSubmitCB(t);
            },
          },
          {
            key: "handleOtpCodeChanged",
            value: function () {
              this.clearError();
              var t = this.otpCodeComp.value;
              this.useNormalInput
                ? (this.continueButton.disabled = null == t || 0 === t.length)
                : null != t &&
                  t.length === this.numDigits &&
                  this.submitOtpCode(t);
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = new te();
              return (
                this.useNormalInput
                  ? ((this.otpCodeComp = new Xt(
                      Lt.PositiveInteger,
                      Q.input_otp_code
                    )),
                    (this.otpCodeComp.autocomplete = $t.Off))
                  : (this.otpCodeComp = new me(
                      Q.input_otp_code,
                      this.numDigits
                    )),
                (this.otpCodeComp.name = "otp-code"),
                (this.otpCodeComp.value = ""),
                this.otpCodeComp.focus(),
                this.otpCodeComp.onChange(this.handleOtpCodeChanged.bind(this)),
                t.appendChild(this.otpCodeComp),
                t
              );
            },
          },
          {
            key: "createContent",
            value: function () {
              var t = this,
                e = new T();
              e.className = Ge;
              var n = this.createForm(),
                i = new T();
              i.className = Je;
              var o = new $e();
              return (
                o.setMessage(
                  this.uiContext.getString(
                    Z.ts_authenticator_otp_resend_message
                  )
                ),
                o.setAction(
                  this.uiContext.getString(Z.ts_authenticator_otp_resend),
                  function () {
                    t.onResendCB && t.onResendCB();
                  }
                ),
                i.appendChild(o),
                e.appendChildren(n, i),
                e
              );
            },
          },
        ]),
        e
      );
    })(ne);
  !(function (t) {
    (t[(t.TargetSelection = 0)] = "TargetSelection"),
      (t[(t.Input = 1)] = "Input");
  })(Le || (Le = {}));
  var nn,
    on,
    sn,
    an = (function (t) {
      function e(t, i, o, a) {
        var c, u;
        return (
          n(this, e),
          ((u = l(this, r(e).call(this, t, i))).autoExecedTarget = a),
          (u.supportsInlineError = !0),
          (u.channelTypeToInstruction =
            (s(
              (c = {}),
              com.ts.mobile.sdk.OtpChannel.Sms,
              Z.ts_authenticator_otp_sms_sent
            ),
            s(
              c,
              com.ts.mobile.sdk.OtpChannel.Email,
              Z.ts_authenticator_otp_email_sent
            ),
            s(
              c,
              com.ts.mobile.sdk.OtpChannel.PushNotification,
              Z.ts_authenticator_otp_push_sent
            ),
            s(
              c,
              com.ts.mobile.sdk.OtpChannel.VoiceCall,
              Z.ts_authenticator_otp_voice_sent
            ),
            s(
              c,
              com.ts.mobile.sdk.OtpChannel.Unknown,
              Z.ts_authenticator_otp_external_numeric_sent
            ),
            c)),
          (u.possibleTargets = o),
          (u.state = a ? Le.Input : Le.TargetSelection),
          (u.target = a),
          u
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setAvailableTargets",
            value: function (t) {
              this.possibleTargets = t;
            },
          },
          {
            key: "setGeneratedOtp",
            value: function (t, e) {
              e
                ? ((this.state = Le.Input),
                  t instanceof com.ts.mobile.sdk.OtpFormatNumericImpl
                    ? ((this.codeLength = t.getOtpLength()),
                      (this.isSupportedFormat = !0))
                    : (this.isSupportedFormat = !1))
                : (this.state = Le.TargetSelection),
                (this.target = e);
            },
          },
          {
            key: "showOtpInput",
            value: function () {
              var t = this,
                e = new en(
                  this.actionContext,
                  this.codeLength,
                  this.possibleTargets.length > 1
                );
              e.setTitle(
                this.uiContext.getString(Z.ts_authenticator_otp_title_auth)
              ),
                e.setInstructions(
                  this.uiContext.getString(
                    this.channelTypeToInstruction[this.target.getChannel()]
                  )
                ),
                this.authError && e.setError(this.authError.getMessage()),
                e.onSubmit(function (n) {
                  (t.authError = null), e.blockInteraction();
                  var i = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(
                      n
                    ),
                    o = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(
                      i
                    );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      o
                    )
                  );
                }),
                e.onBack(function () {
                  (t.authError = null),
                    e.blockInteraction(),
                    (t.state = Le.TargetSelection),
                    t.showAuthUi();
                }),
                e.onResend(function () {
                  (t.authError = null), e.blockInteraction();
                  var n = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest(),
                    i = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(
                      n
                    );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      i
                    )
                  );
                }),
                this.showAuthenticatorPage(e);
            },
          },
          {
            key: "showTargetSelectionInput",
            value: function () {
              var t = this,
                e = 0,
                n = {},
                i = new Ze(this.actionContext);
              (i.error = !!this.authError),
                i.setTitle(
                  this.uiContext.getString(Z.ts_authenticator_otp_title_auth)
                ),
                i.setInstructions(this.getTargetSelectionInstruction()),
                i.onSubmit(function (e) {
                  (t.authError = null), i.blockInteraction();
                  var o = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetSelectionRequest(
                    n[e]
                  );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      o
                    )
                  );
                }),
                this.possibleTargets.forEach(function (o) {
                  var s = o.getDeviceDetails(),
                    a = (++e).toString();
                  (n[a] = o),
                    i.addChannelTarget({
                      channel: o.getChannel(),
                      targetId: a,
                      targetName: s
                        ? kt.getDeviceNameFromDeviceDetails(s)
                        : o.getDescription(),
                      targetInfo: s
                        ? kt.getLastAccessedFromDeviceDetails(t.uiContext, s)
                        : null,
                    });
                }),
                this.showAuthenticatorPage(i);
            },
          },
          {
            key: "onCancel",
            value: function () {
              (this.authError = null),
                h(r(e.prototype), "onCancel", this).call(this);
            },
          },
          {
            key: "showAuthUi",
            value: function () {
              switch (this.state) {
                case Le.TargetSelection:
                  this.showTargetSelectionInput();
                  break;
                case Le.Input:
                  this.isSupportedFormat
                    ? this.showOtpInput()
                    : Promise.reject("Unsupported Otp code format");
              }
            },
          },
          {
            key: "showRegUi",
            value: function () {
              throw new Error("Otp registration unsupported");
            },
          },
          {
            key: "getTargetSelectionInstruction",
            value: function () {
              var t;
              return (
                (t =
                  this.authError &&
                  this.authError.getErrorCode() ===
                    com.ts.mobile.sdk.AuthenticationErrorCode.InvalidInput
                    ? Z.ts_authenticator_otp_error_code_expired
                    : Z.ts_authenticator_otp_targets_intro),
                this.uiContext.getString(t)
              );
            },
          },
        ]),
        e
      );
    })(Bt),
    rn = "xmui-totp-page",
    cn = "xmui-totp-form",
    un = (function (t) {
      function e(t, i, o) {
        var a, c;
        n(this, e),
          ((c = l(
            this,
            r(e).call(this, Q.page_totp_auth, rn, t)
          )).challengeType = i),
          (c.challenge = o),
          (c.channelTypeLocalizationKeys =
            (s(
              (a = {}),
              com.ts.mobile.sdk.TotpChallengeFormatType.Numeric,
              Z.ts_authenticator_totp_input_with_challenge_intro
            ),
            s(
              a,
              com.ts.mobile.sdk.TotpChallengeFormatType.AlphaNumeric,
              Z.ts_authenticator_totp_input_with_challenge_intro
            ),
            s(
              a,
              com.ts.mobile.sdk.TotpChallengeFormatType.QrCode,
              Z.ts_authenticator_totp_input_with_qr_challenge_intro
            ),
            a)),
          c.setTitle(c.uiContext.getString(Z.ts_authenticator_totp_title)),
          c.setInstructions(
            c.uiContext.getString(
              c.channelTypeLocalizationKeys[c.challengeType] ||
                Z.ts_authenticator_totp_input_intro
            )
          );
        var _ = c.createForm();
        c.setContent(_);
        var h = new dt(Q.button_continue);
        return (
          (h.label = c.uiContext.getString(
            Z.ts_authenticator_password_cta_positive
          )),
          (h.disabled = !0),
          (h.type = it.Submit),
          (h.form = cn),
          h.onClick(c.handleSend.bind(u(c))),
          (c.sendButton = h),
          c.addRightButton(h),
          c
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), this.totpCodeInput.setError(t);
            },
          },
          {
            key: "clearError",
            value: function () {
              (this.error = !1), this.totpCodeInput.clearError();
            },
          },
          {
            key: "handleSend",
            value: function () {
              this.onSubmitCB && this.onSubmitCB(this.totpCodeInput.value);
            },
          },
          {
            key: "handleTotpCodeChanged",
            value: function () {
              var t = this.totpCodeInput.value;
              this.sendButton.disabled = null == t || 0 === t.length;
            },
          },
          {
            key: "createSpacer",
            value: function () {
              var t = new T();
              return (t.className = "".concat("xmui-totp-form", "_spacer")), t;
            },
          },
          {
            key: "createChallenge",
            value: function () {
              var t;
              switch (this.challengeType) {
                case com.ts.mobile.sdk.TotpChallengeFormatType.QrCode:
                  var e = new T();
                  e.className = "".concat(
                    "xmui-totp-form",
                    "_qr-code-container"
                  );
                  var n = new ue();
                  (n.className = "".concat("xmui-totp-form", "_qr-code")),
                    (n.src = this.challenge),
                    e.appendChild(n),
                    (t = e);
                  break;
                case com.ts.mobile.sdk.TotpChallengeFormatType.Numeric:
                case com.ts.mobile.sdk.TotpChallengeFormatType.AlphaNumeric:
                  var i = new A();
                  (i.className = "".concat(
                    "xmui-totp-form",
                    "_alphanumeric-code"
                  )),
                    i.setText(this.challenge),
                    (t = i);
              }
              return t;
            },
          },
          {
            key: "createStep1Title",
            value: function () {
              var t = new A();
              t.className = "".concat("xmui-totp-form", "_step");
              var e =
                this.challengeType ===
                com.ts.mobile.sdk.TotpChallengeFormatType.QrCode
                  ? Z.ts_authenticator_totp_qrcode_challenge_step1_message
                  : Z.ts_authenticator_totp_code_challenge_step1_message;
              return t.setText(this.uiContext.getString(e)), t;
            },
          },
          {
            key: "createStep2Title",
            value: function () {
              var t = new A();
              t.className = "".concat("xmui-totp-form", "_step");
              var e =
                this.challengeType ===
                com.ts.mobile.sdk.TotpChallengeFormatType.QrCode
                  ? Z.ts_authenticator_totp_qrcode_challenge_step2_message
                  : Z.ts_authenticator_totp_code_challenge_step2_message;
              return t.setText(this.uiContext.getString(e)), t;
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = new te();
              if (
                (t.addClass("xmui-totp-form"),
                (t.id = cn),
                t.appendChild(this.createSpacer()),
                null != this.challengeType)
              ) {
                var e = this.createStep1Title(),
                  n = this.createChallenge(),
                  i = this.createStep2Title();
                t.appendChildren(
                  e,
                  this.createSpacer(),
                  n,
                  this.createSpacer(),
                  i,
                  this.createSpacer()
                );
              }
              var o = new T();
              o.className = "".concat("xmui-totp-form", "_input");
              var s = new Xt(Lt.Text, Q.input_totp_code);
              return (
                (s.name = "totp-code"),
                (s.value = ""),
                (s.placeholder = this.uiContext.getString(
                  Z.ts_authenticator_totp_input_hint
                )),
                s.onChange(this.handleTotpCodeChanged.bind(this)),
                s.focus(),
                o.appendChild(s),
                (this.totpCodeInput = s),
                t.appendChild(o),
                t.appendChild(this.createSpacer()),
                t
              );
            },
          },
        ]),
        e
      );
    })(ne),
    ln = (function (t) {
      function e(t, i) {
        return n(this, e), l(this, r(e).call(this, t, i));
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setAvailableTargets",
            value: function (t) {
              this.availableTargets = t;
            },
          },
          {
            key: "setTargetDevices",
            value: function (t) {
              this.targetDevices = t;
            },
          },
          {
            key: "setChallenge",
            value: function (t) {
              this.challenge = this.getChallenge(t);
            },
          },
          {
            key: "showAuthUi",
            value: function () {
              this.availableTargets && !this.targetDevices
                ? this.showTargetSelectionUi()
                : this.showCodeInputUi();
            },
          },
          {
            key: "promiseRecoveryForError",
            value: function (t, n, i) {
              if (
                t.getErrorCode() ==
                  com.ts.mobile.sdk.AuthenticationErrorCode.InvalidInput &&
                n.indexOf(
                  com.ts.mobile.sdk.AuthenticationErrorRecovery
                    .RetryAuthenticator
                ) > -1 &&
                t.getPublicSymbolicProperty(
                  com.ts.mobile.sdk.AuthenticationErrorProperty
                    .AuthenticatorInvalidInputErrorDescription
                ) ==
                  com.ts.mobile.sdk.AuthenticationErrorPropertySymbol
                    .AuthenticatorInvalidInputErrorDescriptionTotpIncorrectCheckDigit
              )
                return (
                  It.log(
                    "Totp authentication failed due to invalid check-digit, starting recovery"
                  ),
                  (this.inputError = "Typing error detected - retype code"),
                  Promise.resolve(
                    com.ts.mobile.sdk.AuthenticationErrorRecovery
                      .RetryAuthenticator
                  )
                );
              return h(r(e.prototype), "promiseRecoveryForError", this).call(
                this,
                t,
                n,
                i
              );
            },
          },
          {
            key: "showTargetSelectionUi",
            value: function () {
              var t = this,
                e = this.uiContext,
                n = new ce(this.actionContext);
              n.setTitle(e.getString(Z.ts_authenticator_totp_title)),
                n.setInstructions(
                  e.getString(Z.ts_authenticator_totp_targets_intro)
                );
              var i = {};
              this.availableTargets.forEach(function (e) {
                var o = e.getDeviceDetails(),
                  s = o.getDeviceId(),
                  a = kt.getDeviceNameFromDeviceDetails(o),
                  r = kt.getLastAccessedFromDeviceDetails(t.uiContext, o);
                (i[s] = e), n.addDevice(s, a, r, !1);
              }),
                n.onSubmit(function (e) {
                  n.blockInteraction();
                  var o = e.map(function (t) {
                      return i[t];
                    }),
                    s = kt.createTargetsSelectionResponse(o);
                  t.resolveInputPromise(s);
                }),
                this.showAuthenticatorPage(n);
            },
          },
          {
            key: "showCodeInputUi",
            value: function () {
              var t = this,
                e = new un(
                  this.actionContext,
                  this.challenge.type,
                  this.challenge.value
                );
              this.inputError && e.setError(this.inputError),
                e.onSubmit(function (n) {
                  e.blockInteraction();
                  var i = com.ts.mobile.sdk.impl.TotpInputCodeSubmissionImpl.createTotpCodeSubmission(
                      n
                    ),
                    o = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(
                      i
                    );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      o
                    )
                  );
                }),
                this.showAuthenticatorPage(e);
            },
          },
          {
            key: "showRegUi",
            value: function () {
              throw new Error("Method not implemented.");
            },
          },
          {
            key: "getChallenge",
            value: function (t) {
              var e = { type: null, value: null };
              if (t)
                switch (((e.type = t.getFormat().getType()), e.type)) {
                  case com.ts.mobile.sdk.TotpChallengeFormatType.AlphaNumeric:
                  case com.ts.mobile.sdk.TotpChallengeFormatType.Numeric:
                    e.value = t.getValue();
                    break;
                  case com.ts.mobile.sdk.TotpChallengeFormatType.QrCode:
                    e.value = "data:image/jpeg;base64," + t.getValue();
                }
              return e;
            },
          },
        ]),
        e
      );
    })(Bt),
    _n = "xmui-ticket-wait-page",
    hn = (function (t) {
      function e(t, i, o, s) {
        var a;
        n(this, e),
          (a = l(this, r(e).call(this, Q.page_ticket_wait, _n, t))),
          p(r(e.prototype), "busy", !0, u(a), !0);
        var c = a.createContent(i, o, s);
        return a.setContent(c), a;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createSpacer",
            value: function () {
              var t = new T();
              return (
                (t.className = "".concat("xmui-ticket-wait", "_spacer")), t
              );
            },
          },
          {
            key: "createMessage",
            value: function (t) {
              var e = new A();
              return (
                e.setText(t),
                (e.className = "".concat("xmui-ticket-wait", "_message")),
                e
              );
            },
          },
          {
            key: "createContent",
            value: function (t, e, n) {
              var i = new T();
              switch (
                ((i.className = "xmui-ticket-wait"),
                i.appendChild(this.createSpacer()),
                e)
              ) {
                case com.ts.mobile.sdk.TicketIdFormat.Qr:
                  var o = this.createMessage(t),
                    s = new T();
                  s.className = "".concat(
                    "xmui-ticket-wait",
                    "_qr-code-container"
                  );
                  var a = new ue();
                  (a.src = n),
                    (a.className = "".concat("xmui-ticket-wait", "_qr-code")),
                    s.appendChild(a),
                    i.appendChildren(o, this.createSpacer(), s);
                  break;
                default:
                  var r = new T();
                  r.className = ""
                    .concat("xmui-ticket-wait", "_icon ")
                    .concat(I.WaitForTicket);
                  var c = this.createMessage(t);
                  i.appendChildren(
                    r,
                    this.createSpacer(),
                    c,
                    this.createSpacer()
                  );
              }
              return i;
            },
          },
          { key: "busy", set: function (t) {} },
        ]),
        e
      );
    })(pt),
    dn = function t() {
      n(this, t);
    },
    pn = (function () {
      function t() {
        n(this, t), (this.pollingIntervalMillis = 3e3);
      }
      return (
        o(t, [
          {
            key: "setWaitingTicket",
            value: function (t) {
              this.ticket = this.getTicket(t);
            },
          },
          {
            key: "startSession",
            value: function (t, e) {
              (this.username = It.getUsernameFromClientContext(e)),
                (this.clientContext = e),
                (this.actionContext = t);
            },
          },
          {
            key: "endSession",
            value: function () {
              this.abortPolling();
            },
          },
          {
            key: "promiseInput",
            value: function () {
              var t = this;
              return this.ticket
                ? new Promise(function (e, n) {
                    (t.currentPromiseResolve = e),
                      t.ticketWaitPage || t.createTicketWaitPage(),
                      t.startPolling();
                  })
                : Promise.reject("TicketWaitSession: Failed build ticket info");
            },
          },
          {
            key: "createTicketWaitPage",
            value: function () {
              var t = this,
                e = new hn(
                  this.actionContext,
                  this.ticket.instructions,
                  this.ticket.format,
                  this.ticket.value
                );
              this.username && e.setUserName(this.username),
                e.setTitle(this.ticket.title),
                e.onCancel(function () {
                  t.resolve(kt.createCancelAuthenticatorRequest()),
                    t.abortPolling();
                }),
                e.onEscape(function (e) {
                  t.resolve(
                    com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(
                      e,
                      {}
                    )
                  ),
                    t.abortPolling();
                }),
                It.renderPage(e, this.clientContext),
                (this.ticketWaitPage = e);
            },
          },
          {
            key: "startPolling",
            value: function () {
              var t = this;
              this.pollingTimer = setTimeout(function () {
                t.resolve(
                  com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                    com.ts.mobile.sdk.TicketWaitInput.createPollRequest()
                  )
                ),
                  (t.pollingTimer = null);
              }, this.pollingIntervalMillis);
            },
          },
          {
            key: "abortPolling",
            value: function () {
              this.pollingTimer &&
                (clearTimeout(this.pollingTimer), (this.pollingTimer = null));
            },
          },
          {
            key: "resolve",
            value: function (t) {
              this.currentPromiseResolve && this.currentPromiseResolve(t),
                (this.currentPromiseResolve = null);
            },
          },
          {
            key: "getTicket",
            value: function (t) {
              var e = new dn();
              if (t) {
                (e.title = t.getTitle()), (e.instructions = t.getText());
                var n = t.getTicketId();
                if (n)
                  switch (((e.format = n.getFormat()), e.format)) {
                    case com.ts.mobile.sdk.TicketIdFormat.Qr:
                      e.value = "data:image/jpeg;base64," + n.getValue();
                      break;
                    default:
                      throw (
                        ((e = null),
                        It.log("Unsupported ticket ID format"),
                        new Error("Unsupported ticket ID format"))
                      );
                  }
              }
              return e;
            },
          },
        ]),
        t
      );
    })(),
    mn = "xmui-actions-menu-button",
    gn = "".concat(mn, "_menu-container"),
    fn = (function (t) {
      function e(t) {
        var i;
        return (
          n(this, e),
          ((i = l(this, r(e).call(this))).actionsMenu = t),
          (i.isOpen = !1),
          (i.className = "".concat(mn, " ").concat(I.More)),
          (i.automationId = Q.button_actions_list),
          (i.menuContainer = new T()),
          (i.menuContainer.className = gn),
          i.menuContainer.appendChild(t),
          i.appendChild(i.menuContainer),
          i.onMousedown(function () {
            i.openMenu();
          }),
          (i.handleMousedownEvent = i.handleMousedownEvent.bind(u(i))),
          (i.handleWheelEvent = i.handleWheelEvent.bind(u(i))),
          (i.handleActionSelection = i.handleActionSelection.bind(u(i))),
          (i.handleResize = Dt(i.handleResize.bind(u(i)), 10, !1)),
          t.onSelectionChanged(i.handleActionSelection),
          i.actionsMenu.onFocus(i.handleFocusEvent.bind(u(i))),
          i.actionsMenu.onBlur(i.handleBlurEvent.bind(u(i))),
          i.actionsMenu.onKeydown(i.handleKeydownEvent.bind(u(i))),
          i
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "openMenu",
            value: function () {
              this.isOpen ||
                ((this.previousFocusedElement = document.activeElement),
                this.addClass("".concat(mn, "--open")),
                this.actionsMenu.clearSelection(),
                this.actionsMenu.clearActive(),
                this.actionsMenu.focus(),
                this.updateMenuPosition(),
                (this.isOpen = !0));
            },
          },
          {
            key: "updateMenuPosition",
            value: function () {
              var t = this.htmlElement.getBoundingClientRect(),
                e = t.left + t.width / 2,
                n = t.top + t.height / 2,
                i = this.menuContainer.htmlElement,
                o = window.getComputedStyle(i),
                s = parseInt(o.width),
                a = parseInt(o.height),
                r = window.innerHeight - n - a,
                c = r < 0 ? r : 0;
              (i.style.left = e - s + "px"), (i.style.top = n + c + "px");
            },
          },
          {
            key: "closeMenu",
            value: function () {
              this.isOpen &&
                (this.previousFocusedElement &&
                  this.previousFocusedElement.focus &&
                  this.previousFocusedElement.focus(),
                this.removeClass("".concat(mn, "--open")),
                window.removeEventListener("resize", this.handleResize),
                document.removeEventListener(
                  "mousedown",
                  this.handleMousedownEvent
                ),
                document.removeEventListener("wheel", this.handleWheelEvent),
                (this.isOpen = !1));
            },
          },
          {
            key: "handleFocusEvent",
            value: function (t) {
              window.addEventListener("resize", this.handleResize),
                document.addEventListener(
                  "mousedown",
                  this.handleMousedownEvent
                ),
                document.addEventListener("wheel", this.handleWheelEvent);
            },
          },
          {
            key: "handleBlurEvent",
            value: function (t) {
              this.actionsMenu.htmlElement.contains(document.activeElement) ||
                ((this.previousFocusedElement = null), this.closeMenu());
            },
          },
          {
            key: "handleKeydownEvent",
            value: function (t, e) {
              e.keyCode === K.Escape && this.closeMenu();
            },
          },
          {
            key: "handleMousedownEvent",
            value: function (t) {
              this.closeMenu();
            },
          },
          {
            key: "handleResize",
            value: function () {
              this.closeMenu();
            },
          },
          {
            key: "handleWheelEvent",
            value: function () {
              this.closeMenu();
            },
          },
          {
            key: "handleActionSelection",
            value: function () {
              this.closeMenu();
            },
          },
        ]),
        e
      );
    })(T),
    vn = "xmui-text-state",
    yn = (function (t) {
      function e() {
        var t;
        return n(this, e), ((t = l(this, r(e).call(this))).className = vn), t;
      }
      return a(e, t), e;
    })(A),
    kn = "xmui-authenticator-configuration-page",
    Cn = (function (t) {
      function e(t) {
        var i;
        n(this, e),
          ((i = l(
            this,
            r(e).call(this, Q.page_configure_authenticators, kn)
          )).uiContext = t),
          (i.keyToActionMenuButton = {}),
          i.setTitle(t.getString(Z.ts_session_config_title));
        var o = new dt(Q.button_cancel);
        (o.label = t.getString(Z.ts_gen_cancel)),
          o.onClick(function () {
            i.onCancelCB && i.onCancelCB();
          }),
          i.addLeftButton(o);
        var s = i.createContent();
        return i.setContent(s), i;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function () {
              var t = this;
              return (
                (this.authList = new at(J.None)),
                this.authList.onItemClicked(function (e) {
                  var n = t.keyToActionMenuButton[e];
                  n && n.openMenu();
                }),
                this.authList.focus(),
                this.authList
              );
            },
          },
          {
            key: "getDefaultState",
            value: function () {
              var t = new yn();
              return t.setText(this.uiContext.getString(Z.ts_gen_default)), t;
            },
          },
          {
            key: "addAuthenticator",
            value: function (t, e, n, i, o, s, a) {
              var r =
                  ut.getAuthenticatorIcon(i) ||
                  ut.getAuthenticatorIcon(
                    com.ts.mobile.sdk.AuthenticatorType.Generic
                  ),
                c = s ? [this.getDefaultState()] : null,
                u = a ? [I.Registered] : null,
                l = new fn(o);
              this.keyToActionMenuButton[t] = l;
              var _ = new ct(e, n, r, l, c, u);
              this.authList.addListItem(t, !1, _);
            },
          },
          {
            key: "onCancel",
            value: function (t) {
              this.onCancelCB = t;
            },
          },
        ]),
        e
      );
    })(H),
    bn = "xmui-actions-menu",
    wn = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(this, r(e).call(this, J.SingleMouseup, !0))).className = bn),
          (t.automationId = Q.list_actions),
          (t.tabindex = -1),
          (t.role = "menu"),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "addAction",
            value: function (t) {
              var e = new A();
              (e.id = $.generate()),
                (e.className = "".concat(bn, "_action")),
                (e.key = t.key),
                e.setText(t.label),
                this.addItem(e),
                (this.role = "menuitem"),
                (this.selected = !1),
                (this.disabled = !1);
            },
          },
        ]),
        e
      );
    })(ot);
  !(function (t) {
    (t[(t.Register = 0)] = "Register"),
      (t[(t.Unregister = 1)] = "Unregister"),
      (t[(t.Reregister = 2)] = "Reregister"),
      (t[(t.SetDefault = 3)] = "SetDefault");
  })(sn || (sn = {}));
  var xn =
      (s((nn = {}), sn.Register, Z.ts_session_config_item_action_register),
      s(nn, sn.Unregister, Z.ts_session_config_item_action_unregister),
      s(nn, sn.Reregister, Z.ts_session_config_item_action_reregister),
      s(nn, sn.SetDefault, Z.ts_session_config_item_action_set_as_default),
      nn),
    Sn =
      (s((on = {}), sn.Register, Z.ts_session_config_item_register_failed),
      s(on, sn.Unregister, Z.ts_session_config_item_unregister_failed),
      s(on, sn.Reregister, Z.ts_session_config_item_reregister_failed),
      s(on, sn.SetDefault, Z.ts_session_config_item_default_failed),
      on),
    In = (function () {
      function t(e) {
        var i;
        n(this, t),
          (this.username = e),
          (this.actionTypeToEMenuAction =
            (s(
              (i = {}),
              com.ts.mobile.sdk.AuthenticatorConfigurationAction.Register,
              sn.Register
            ),
            s(
              i,
              com.ts.mobile.sdk.AuthenticatorConfigurationAction.Unregister,
              sn.Unregister
            ),
            s(
              i,
              com.ts.mobile.sdk.AuthenticatorConfigurationAction.Reregister,
              sn.Reregister
            ),
            i));
      }
      return (
        o(t, [
          {
            key: "setAuthenticatorsList",
            value: function (t) {
              var e = this,
                n = this.uiContext,
                i = new Cn(n);
              i.setInstructions(
                this.instructions || n.getString(Z.ts_session_config_intro)
              ),
                i.setUserName(this.username),
                t.forEach(function (t) {
                  var o = t.getDescription(),
                    s = o.getAuthenticatorId(),
                    a = n.getString(wt.getAuthenticatorNameKey(s)),
                    r = n.getString(wt.getAuthenticatorDescriptionKey(s)),
                    c = o.getType(),
                    u = t.getAvailableActions(),
                    l = o.getDefaultAuthenticator(),
                    _ = o.getRegistered(),
                    h = e.buildActionsMenu(u, l);
                  h.onSelectionChanged(e.handleAction.bind(e, t)),
                    i.addAuthenticator(s, a, r, c, h, l, _);
                }),
                i.onCancel(function () {
                  e.configServices.finishSession();
                }),
                It.renderPage(i, this.clientContext);
            },
          },
          {
            key: "startSession",
            value: function (t, e, n) {
              (this.username =
                It.getUsernameFromClientContext(n) || this.username),
                (this.configServices = t),
                (this.actionContext = e),
                (this.clientContext = n),
                (this.uiContext = t.getUiContext()),
                (this.instructions = null),
                It.log("Starting configuration session");
            },
          },
          {
            key: "endSession",
            value: function () {
              It.log("Ending configuration session");
            },
          },
          {
            key: "buildActionsMenu",
            value: function (t, e) {
              var n = this,
                i = new wn();
              return (
                t.forEach(function (t) {
                  i.addAction({
                    key: n.actionTypeToEMenuAction[t].toString(),
                    label: n.uiContext.getString(
                      xn[n.actionTypeToEMenuAction[t]]
                    ),
                  });
                }),
                e ||
                  i.addAction({
                    key: sn.SetDefault.toString(),
                    label: this.uiContext.getString(xn[sn.SetDefault]),
                  }),
                i
              );
            },
          },
          {
            key: "handleAction",
            value: function (t, e) {
              var n,
                i = this,
                o = parseInt(e);
              switch (o) {
                case sn.SetDefault:
                  n = this.handleSetDefault(t);
                  break;
                case sn.Register:
                  n = this.handleRegister(t);
                  break;
                case sn.Reregister:
                  n = this.handleReregister(t);
                  break;
                case sn.Unregister:
                  n = this.handleUnregister(t);
              }
              n.then(function () {
                return i.configServices.requestRefreshAuthenticators();
              }).catch(function (e) {
                if (
                  e &&
                  e.getErrorCode &&
                  e.getErrorCode() ===
                    com.ts.mobile.sdk.AuthenticationErrorCode.UserCanceled
                )
                  i.configServices.requestRefreshAuthenticators();
                else {
                  var n = t.getDescription().getAuthenticatorId(),
                    s = i.uiContext.getString(wt.getAuthenticatorNameKey(n)),
                    a = "fido2" !== n && e.getMessage ? e.getMessage() : "",
                    r = i.uiContext.formatString(Sn[o], [s, a]);
                  i.presentError(e, r);
                }
              });
            },
          },
          {
            key: "setSuccessMessage",
            value: function (t, e) {
              var n = this.uiContext,
                i = t.getDescription().getAuthenticatorId(),
                o = n.getString(wt.getAuthenticatorNameKey(i));
              this.instructions = n.formatString(e, [o]);
            },
          },
          {
            key: "handleSetDefault",
            value: function (t) {
              var e = this;
              return this.configServices
                .setDefaultAuthenticator(t)
                .then(function (n) {
                  return (
                    e.setSuccessMessage(
                      t,
                      e.uiContext.getString(
                        Z.ts_session_config_item_default_result
                      )
                    ),
                    n
                  );
                });
            },
          },
          {
            key: "handleReregister",
            value: function (t) {
              var e = this;
              return this.configServices
                .reregisterAuthenticator(t, this.clientContext)
                .then(function () {
                  return e.configServices
                    .setDefaultAuthenticator(t)
                    .then(function (n) {
                      return (
                        e.setSuccessMessage(
                          t,
                          e.uiContext.getString(
                            Z.ts_session_config_item_reregister_result
                          )
                        ),
                        n
                      );
                    });
                });
            },
          },
          {
            key: "handleRegister",
            value: function (t) {
              var e = this;
              return this.configServices
                .registerAuthenticator(t, this.clientContext)
                .then(function () {
                  return e.configServices
                    .setDefaultAuthenticator(t)
                    .then(function (n) {
                      return (
                        e.setSuccessMessage(
                          t,
                          e.uiContext.getString(
                            Z.ts_session_config_item_register_result
                          )
                        ),
                        n
                      );
                    });
                });
            },
          },
          {
            key: "handleUnregister",
            value: function (t) {
              var e = this;
              return new Promise(function (n, i) {
                var o = e.uiContext;
                e.setSuccessMessage(
                  t,
                  o.getString(Z.ts_session_config_item_unregister_result)
                );
                var s = t.getDescription().getAuthenticatorId(),
                  a = o.getString(wt.getAuthenticatorNameKey(s)),
                  r = o.getString(
                    Z.ts_session_config_item_unregister_dialog_cta
                  ),
                  c = o.getString(Z.ts_gen_cancel),
                  u = new Mt(o, r, c);
                e.username && u.setUserName(e.username),
                  u.setDialogTitle(
                    o.getString(
                      Z.ts_session_config_item_unregister_dialog_title
                    )
                  ),
                  u.setDialogMessage(
                    o.formatString(
                      Z.ts_session_config_item_unregister_dialog_message,
                      [a]
                    )
                  ),
                  u.setDialogIconClass(I.Unregister),
                  u.onSelect(function (o) {
                    u.blockInteraction(),
                      o
                        ? e.configServices
                            .unregisterAuthenticator(t, e.clientContext)
                            .then(n, i)
                        : n(!0);
                  }),
                  It.renderPage(u, e.clientContext);
              });
            },
          },
          {
            key: "presentError",
            value: function (t, e) {
              var n = this;
              (this.instructions = null),
                Tt.promiseInformationInput(
                  this.username,
                  I.Information,
                  this.uiContext.getString(
                    Z.ts_session_config_error_dialog_title
                  ),
                  e,
                  this.uiContext.getString(Z.ts_gen_continue),
                  this.uiContext,
                  this.clientContext
                ).then(function () {
                  t.getErrorCode() ==
                  com.ts.mobile.sdk.AuthenticationErrorCode.PolicyRejection
                    ? n.configServices.finishSession()
                    : n.configServices.requestRefreshAuthenticators();
                });
            },
          },
        ]),
        t
      );
    })(),
    En = "xmui-registration-promotion-introduction-page",
    An = (function (t) {
      function e(t, i, o, s, a) {
        var c;
        n(this, e),
          ((c = l(
            this,
            r(e).call(
              this,
              Q.dialog_registration_promotion_intro,
              En,
              t,
              !0,
              i,
              o,
              I.Promotion
            )
          )).cancelButton.label = a),
          (c.cancelButton.automationId = Q.button_abort);
        var u = new dt(Q.button_skip);
        (u.label = t.getUiContext().getString(Z.ts_session_promotion_skip)),
          u.onClick(function () {
            return c.onSkipCB && c.onSkipCB();
          }),
          c.addRightButton(u);
        var _ = new dt(Q.button_continue);
        return (
          (_.label = s),
          _.onClick(function () {
            return c.onContinueCB && c.onContinueCB();
          }),
          c.addRightButton(_),
          c
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onContinue",
            value: function (t) {
              this.onContinueCB = t;
            },
          },
          {
            key: "onSkip",
            value: function (t) {
              this.onSkipCB = t;
            },
          },
        ]),
        e
      );
    })(Et),
    Pn = (function () {
      function t(e, i) {
        n(this, t), (this.username = e), (this.actionContext = i);
      }
      return (
        o(t, [
          {
            key: "startSession",
            value: function (t, e) {
              (this.username =
                It.getUsernameFromClientContext(t) || this.username),
                (this.clientContext = t),
                (this.uiContext = e.getUiContext()),
                It.log("Starting registration promotion action session");
            },
          },
          {
            key: "endSession",
            value: function () {
              It.log("Ending registration promotion action session");
            },
          },
          {
            key: "promptIntroduction",
            value: function (t, e, n, i) {
              var o = this;
              return new Promise(function (s, a) {
                var r = new An(o.actionContext, t, e, n, i);
                r.setUserName(o.username);
                var c = com.ts.mobile.sdk.PromotionControlRequest;
                r.onContinue(function () {
                  s(
                    com.ts.mobile.sdk.PromotionInput.createControlResponse(
                      c.Continue
                    )
                  );
                }),
                  r.onSkip(function () {
                    s(
                      com.ts.mobile.sdk.PromotionInput.createControlResponse(
                        c.Skip
                      )
                    );
                  }),
                  r.onCancel(function () {
                    s(
                      com.ts.mobile.sdk.PromotionInput.createControlResponse(
                        c.Abort
                      )
                    );
                  }),
                  r.onEscape(function (t) {
                    s(
                      com.ts.mobile.sdk.PromotionInput.createEscapeRequest(
                        t,
                        {}
                      )
                    );
                  }),
                  It.renderPage(r, o.clientContext);
              });
            },
          },
          {
            key: "setPromotedAuthenticators",
            value: function (t) {
              var e = this,
                n = this.uiContext,
                i = com.ts.mobile.sdk.PromotionControlRequest;
              return new Promise(function (o, s) {
                var a = {},
                  r = new gt(e.actionContext);
                r.setUserName(e.username),
                  r.setTitle(n.getString(Z.ts_session_promotion_title)),
                  r.setInstructions(n.getString(Z.ts_session_promotion_intro)),
                  t.forEach(function (t) {
                    var e = t.getAuthenticatorId(),
                      i = t.getType();
                    a[e] = t;
                    var o = n.getString(wt.getAuthenticatorNameKey(e));
                    r.addAuthenticator(e, o, i, !1);
                  }),
                  r.onSubmit(function (t) {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.PromotionInput.createAuthenticatorDescription(
                          a[t]
                        )
                      );
                  }),
                  r.onEscape(function (t) {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.PromotionInput.createEscapeRequest(
                          t,
                          {}
                        )
                      );
                  }),
                  (r.cancelButton.label = n.getString(
                    Z.ts_session_promotion_abort
                  )),
                  (r.automationId = Q.button_abort),
                  r.onCancel(function () {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.PromotionInput.createControlResponse(
                          i.Abort
                        )
                      );
                  });
                var c = new dt(Q.button_skip);
                (c.label = n.getString(Z.ts_session_promotion_skip)),
                  c.onClick(function () {
                    r.blockInteraction(),
                      o(
                        com.ts.mobile.sdk.PromotionInput.createControlResponse(
                          i.Skip
                        )
                      );
                  }),
                  r.addRightButton(c),
                  It.renderPage(r, e.clientContext);
              });
            },
          },
        ]),
        t
      );
    })(),
    Tn = "xmui-select-device-to-manage",
    Rn = (function (t) {
      function e(t) {
        var i;
        n(this, e),
          ((i = l(
            this,
            r(e).call(this, Q.page_select_device_to_manage, Tn)
          )).uiContext = t),
          i.setTitle(t.getString(Z.ts_session_dm_title)),
          i.setInstructions(t.getString(Z.ts_session_dm_details_subtitle));
        var o = new dt(Q.button_back);
        (o.label = t.getString(Z.ts_gen_close)),
          o.onClick(function () {
            i.onBackCB && i.onBackCB();
          }),
          i.addLeftButton(o);
        var s = i.createContent();
        return i.setContent(s), i;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "createContent",
            value: function () {
              var t = this;
              return (
                (this.deviceList = new at(J.Single)),
                this.deviceList.onSelectionChanged(function (e) {
                  e.length && t.onSelectCB && t.onSelectCB(e[0]);
                }),
                this.deviceList.focus(),
                this.deviceList
              );
            },
          },
          {
            key: "getCurrentDeviceState",
            value: function () {
              var t = new yn();
              return (
                t.setText(
                  this.uiContext.getString(
                    Z.ts_session_dm_details_current_device
                  )
                ),
                t
              );
            },
          },
          {
            key: "addDevice",
            value: function (t, e, n, i, o) {
              var s = new T();
              s.className = "".concat(Tn, "_expand-icon ").concat(I.Expand);
              var a = i ? [this.getCurrentDeviceState()] : null,
                r = new ct(e, n, o, s, a);
              this.deviceList.addListItem(t, !1, r);
            },
          },
          {
            key: "onSelect",
            value: function (t) {
              this.onSelectCB = t;
            },
          },
          {
            key: "onBack",
            value: function (t) {
              this.onBackCB = t;
            },
          },
        ]),
        e
      );
    })(H),
    Mn = "".concat("xmui-manage-device", "_row"),
    Bn = "".concat("xmui-manage-device", "_info"),
    Nn = "".concat("xmui-manage-device", "_separator"),
    Dn = "".concat("xmui-manage-device", "_name"),
    Ln = "".concat("xmui-manage-device", "_spacer"),
    Fn = "xmui-device-management-page",
    qn = (function (t) {
      function e(t) {
        var i;
        n(this, e),
          ((i = l(
            this,
            r(e).call(this, Q.page_manage_devices, Fn)
          )).uiContext = t),
          i.setTitle(t.getString(Z.ts_session_dm_details_title)),
          i.setInstructions(t.getString(Z.ts_session_dm_details_subtitle));
        var o = new dt(Q.button_cancel);
        return (
          (o.label = t.getString(Z.ts_gen_back)),
          o.onClick(function () {
            i.onCancelCB && i.onCancelCB();
          }),
          o.focus(),
          i.addLeftButton(o),
          (i.handleAction = i.handleAction.bind(u(i))),
          i
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setDevice",
            value: function (t, e, n, i, o, s) {
              var a = this.uiContext,
                r = new T();
              r.className = "xmui-manage-device";
              var c = new T();
              c.className = Mn;
              var u = new A();
              if ((u.setText(t), (u.className = Dn), c.appendChild(u), o)) {
                var l = new yn();
                l.setText(
                  this.uiContext.getString(Z.ts_session_dm_section_current)
                ),
                  c.appendChild(l);
              }
              if (
                s.indexOf(com.ts.mobile.sdk.DeviceManagementAction.Rename) > -1
              ) {
                var _ = new T();
                _.className = Ln;
                var h = new dt(Q.button_rename);
                (h.label = a.getString(Z.ts_session_dm_details_rename_action)),
                  (h.value = com.ts.mobile.sdk.DeviceManagementAction.Rename),
                  h.onClick(this.handleAction),
                  c.appendChildren(_, h);
              }
              var d = new A();
              d.setText(e + "\n" + n + "\n" + i), (d.className = Bn);
              var p = new T();
              if (
                ((p.className = Mn),
                p.appendChildren(d),
                r.appendChildren(c, p),
                (new T().className = Nn),
                s.indexOf(com.ts.mobile.sdk.DeviceManagementAction.Identify) >
                  -1)
              ) {
                var m = new T();
                (m.className = Nn), r.appendChild(m);
                var g = new T();
                g.className = Mn;
                var f = new A();
                f.setText(a.getString(Z.ts_session_dm_details_push_subtitle)),
                  (f.className = Bn);
                var v = new dt(Q.button_rename);
                (v.label = a.getString(Z.ts_session_dm_details_push_action)),
                  (v.value = com.ts.mobile.sdk.DeviceManagementAction.Identify),
                  v.onClick(this.handleAction),
                  g.appendChildren(f, v),
                  r.appendChild(g);
              }
              if (
                o ||
                s.indexOf(com.ts.mobile.sdk.DeviceManagementAction.Remove) > -1
              ) {
                var y = new T();
                (y.className = Nn), r.appendChild(y);
                var k = new T();
                k.className = Mn;
                var C = new A();
                C.setText(a.getString(Z.ts_session_dm_details_remove_subtitle)),
                  (C.className = Bn);
                var b = new dt(Q.button_remove, !0);
                (b.label = a.getString(Z.ts_session_dm_details_remove_action)),
                  (b.value = com.ts.mobile.sdk.DeviceManagementAction.Remove),
                  b.onClick(this.handleAction),
                  k.appendChildren(C, b),
                  r.appendChild(k);
              }
              this.setContent(r);
            },
          },
          {
            key: "onAction",
            value: function (t) {
              this.onActionCB = t;
            },
          },
          {
            key: "onCancel",
            value: function (t) {
              this.onCancelCB = t;
            },
          },
          {
            key: "handleAction",
            value: function (t) {
              this.onActionCB && this.onActionCB(t.value);
            },
          },
        ]),
        e
      );
    })(H),
    On = [
      "input",
      "select",
      "textarea",
      "a[href]",
      "button",
      "[tabindex]",
      "audio[controls]",
      "video[controls]",
      '[contenteditable]:not([contenteditable="false"])',
    ];
  function jn(t) {
    return (
      null === t.offsetParent || "hidden" === getComputedStyle(t).visibility
    );
  }
  function Un(t) {
    for (
      var e = t.querySelectorAll(On.join(",")), n = [], i = 0;
      i < e.length;
      i++
    ) {
      var o = e[i];
      Hn(o) > -1 && !o.disabled && !jn(o) && n.push(o);
    }
    return n;
  }
  function Hn(t) {
    var e = parseInt(t.getAttribute("tabindex"), 10);
    return isNaN(e)
      ? (function (t) {
          return "true" === t.contentEditable;
        })(t)
        ? 0
        : t.tabIndex
      : e;
  }
  var Qn,
    Kn = "xmui-popup-dialog",
    Vn = (function (t) {
      function e() {
        var t;
        n(this, e), ((t = l(this, r(e).call(this))).className = Kn);
        var i = new T();
        return (
          (i.className = "".concat(Kn, "_overlay")),
          (t.panel = new T()),
          (t.panel.className = "".concat(Kn, "_panel")),
          t.appendChildren(i, t.panel),
          (t.handleKeydownEvent = t.handleKeydownEvent.bind(u(t))),
          (t.headerPanel = new L(!0)),
          (t.headerPanel.show = !1),
          t.panel.appendChild(t.headerPanel),
          (t.contentContainer = new T()),
          (t.contentContainer.className = "".concat(Kn, "_content")),
          (t.actionPanel = new q(!0)),
          t.panel.appendChildren(t.contentContainer, t.actionPanel),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setTitle",
            value: function (t) {
              (this.headerPanel.show = !0), this.headerPanel.setText(t);
            },
          },
          {
            key: "setIcon",
            value: function (t) {
              (this.headerPanel.show = !0), this.headerPanel.setIcon(t);
            },
          },
          {
            key: "setContent",
            value: function (t) {
              this.contentContainer.appendChild(t);
            },
          },
          {
            key: "addLeftButton",
            value: function (t) {
              this.actionPanel.addLeftButton(t);
            },
          },
          {
            key: "addRightButton",
            value: function (t) {
              this.actionPanel.addRightButton(t);
            },
          },
          {
            key: "appendInto",
            value: function (t) {
              h(r(e.prototype), "appendInto", this).call(this, t),
                document.addEventListener("keydown", this.handleKeydownEvent);
            },
          },
          {
            key: "close",
            value: function () {
              document.removeEventListener("keydown", this.handleKeydownEvent),
                this.remove();
            },
          },
          {
            key: "handleKeydownEvent",
            value: function (t) {
              !(function (t, e) {
                var n,
                  i = (n = Un(e))[0],
                  o = n[n.length - 1];
                "Tab" === t.key
                  ? e.contains(t.target)
                    ? t.shiftKey && t.target === i
                      ? (o.focus(), t.preventDefault())
                      : t.shiftKey ||
                        t.target !== o ||
                        (i.focus(), t.preventDefault())
                    : ((i = (n = Un(e))[0]).focus(), t.preventDefault())
                  : e.contains(t.target) || t.preventDefault();
              })(t, this.panel.htmlElement);
            },
          },
        ]),
        e
      );
    })(T),
    zn = "xmui-confirm-popup-dialog",
    Wn = (function (t) {
      function e(t, i, o) {
        var s,
          a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        n(this, e),
          ((s = l(this, r(e).call(this))).automationId =
            Q.popup_dialog_confirm),
          (s.handleClick = s.handleClick.bind(u(s)));
        var c = new dt(Q.button_cancel);
        (c.label = o || t.getString(Z.ts_gen_cancel)),
          (c.value = !1),
          c.onClick(s.handleClick),
          s.addLeftButton(c);
        var _ = new dt(Q.button_continue);
        (_.label = i || t.getString(Z.ts_authenticator_password_cta_positive)),
          (_.value = !0),
          _.onClick(s.handleClick),
          s.addRightButton(_);
        var h = new T();
        return (
          (h.className = "".concat(zn, "_container")),
          (s.messageComp = new A()),
          (s.messageComp.className = "".concat(zn, "_message")),
          h.appendChild(s.messageComp),
          s.setContent(h),
          a ? _.focus() : c.focus(),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setMessage",
            value: function (t) {
              this.messageComp.setText(t);
            },
          },
          {
            key: "onSelect",
            value: function (t) {
              this.onSelectCB = t;
            },
          },
          {
            key: "handleClick",
            value: function (t) {
              this.onSelectCB(t.value);
            },
          },
        ]),
        e
      );
    })(Vn),
    Zn = "xmui-input-popup-dialog",
    Yn = "xmui-text-input-form",
    $n = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          (s = l(this, r(e).call(this))).addClass(Zn),
          (s.automationId = Q.popup_dialog_confirm);
        var a = new dt(Q.button_cancel);
        (a.label = o || t.getString(Z.ts_gen_cancel)),
          (a.value = !1),
          a.onClick(function () {
            s.onCancelCB && s.onCancelCB();
          }),
          s.addLeftButton(a);
        var c = new dt(Q.button_continue);
        (c.label = i || t.getString(Z.ts_authenticator_password_cta_positive)),
          (c.value = !0),
          (c.type = it.Submit),
          (c.disabled = !0),
          c.onClick(function () {
            s.onSubmitCB && s.onSubmitCB(s.inputField.value);
          }),
          (c.form = Yn),
          s.addRightButton(c),
          (s.confirmButton = c);
        var u = s.buildContent();
        return s.setContent(u), s;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setPlacehoder",
            value: function (t) {
              this.inputField.placeholder = t;
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "onCancel",
            value: function (t) {
              this.onCancelCB = t;
            },
          },
          {
            key: "buildContent",
            value: function () {
              var t = this,
                e = new te();
              e.id = Yn;
              var n = new Xt(Lt.Text, Q.input_text);
              return (
                (n.disabled = !1),
                (n.value = ""),
                n.onChange(function () {
                  t.confirmButton.disabled =
                    null == t.inputField.value ||
                    0 === t.inputField.value.length;
                }),
                n.focus(),
                (this.inputField = n),
                e.appendChild(n),
                e
              );
            },
          },
        ]),
        e
      );
    })(Vn),
    Xn = (function () {
      function t(e) {
        var i;
        n(this, t),
          (this.username = e),
          (this.actionToError =
            (s(
              (i = {}),
              com.ts.mobile.sdk.DeviceManagementAction.Remove,
              Z.ts_session_dm_item_action_remove_result_negative
            ),
            s(
              i,
              com.ts.mobile.sdk.DeviceManagementAction.Rename,
              Z.ts_session_dm_item_action_rename_result_negative
            ),
            s(
              i,
              com.ts.mobile.sdk.DeviceManagementAction.Identify,
              Z.ts_session_dm_item_action_identify_result_negative
            ),
            i));
      }
      return (
        o(t, [
          {
            key: "setSessionDevicesList",
            value: function (t) {
              this.devices = t;
            },
          },
          {
            key: "startSession",
            value: function (t, e, n) {
              (this.username =
                It.getUsernameFromClientContext(n) || this.username),
                (this.deviceManagementSessionService = t),
                (this.actionContext = e),
                (this.clientContext = n),
                (this.uiContext = t.getUiContext()),
                (this.instructions = null),
                It.log("Starting device management session"),
                this.openSelectDeviceToManage();
            },
          },
          {
            key: "endSession",
            value: function () {
              It.log("Ending device management session");
            },
          },
          {
            key: "handleRemove",
            value: function (t) {
              var e = this,
                n = this.uiContext;
              return new Promise(function (i, o) {
                var s = e.getDeviceName(t),
                  a = new Wn(
                    n,
                    n.getString(Z.ts_session_dm_item_action_dialog_remove_cta)
                  );
                a.setTitle(
                  n.formatString(
                    Z.ts_session_dm_item_action_dialog_remove_title,
                    [s]
                  )
                ),
                  a.setIcon(I.Remove),
                  a.setMessage(
                    n.getString(
                      Z.ts_session_dm_item_action_dialog_remove_message
                    )
                  ),
                  a.onSelect(function (n) {
                    if ((a.close(), n))
                      if (t.getInfo().getIsCurrent()) {
                        var o = e.deviceManagementSessionService
                          .removeCurrentDeviceAndFinishSession(e.clientContext)
                          .then(function (t) {
                            return (
                              t &&
                                e.setSuccessMessage(
                                  Z.ts_session_dm_item_action_remove_result_positive,
                                  s
                                ),
                              t
                            );
                          });
                        i(o);
                      } else
                        i(
                          e.deviceManagementSessionService.removeDevice(
                            t,
                            e.clientContext
                          )
                        );
                    else i(!1);
                  }),
                  It.renderModal(a, e.clientContext);
              });
            },
          },
          {
            key: "handleRename",
            value: function (t) {
              var e = this,
                n = this.uiContext;
              return new Promise(function (i, o) {
                var s = e.getDeviceName(t),
                  a = new $n(
                    n,
                    n.getString(Z.ts_session_dm_item_action_dialog_rename_cta)
                  );
                a.setTitle(
                  n.formatString(
                    Z.ts_session_dm_item_action_dialog_rename_title,
                    [s]
                  )
                ),
                  a.setIcon(I.Rename),
                  a.setPlacehoder(
                    n.getString(Z.ts_session_dm_details_rename_input_hint)
                  ),
                  a.onCancel(function () {
                    a.close(), i(!1);
                  }),
                  a.onSubmit(function (n) {
                    a.close();
                    var o = e.deviceManagementSessionService
                      .renameDevice(t, n, e.clientContext)
                      .then(function (t) {
                        return (
                          t &&
                            e.setSuccessMessage(
                              Z.ts_session_dm_item_action_rename_result_positive,
                              s,
                              n
                            ),
                          t
                        );
                      });
                    i(o);
                  }),
                  It.renderModal(a, e.clientContext);
              });
            },
          },
          {
            key: "handleIdentify",
            value: function (t) {
              var e = this;
              return this.deviceManagementSessionService
                .identifyDevice(t, this.clientContext)
                .then(function (n) {
                  var i = e.getDeviceName(t);
                  return (
                    n &&
                      e.setSuccessMessage(
                        Z.ts_session_dm_item_action_identify_result_positive,
                        i
                      ),
                    n
                  );
                });
            },
          },
          {
            key: "handleAction",
            value: function (t, e) {
              var n,
                i = this;
              switch (e) {
                case com.ts.mobile.sdk.DeviceManagementAction.Remove:
                  n = this.handleRemove(t);
                  break;
                case com.ts.mobile.sdk.DeviceManagementAction.Rename:
                  n = this.handleRename(t);
                  break;
                case com.ts.mobile.sdk.DeviceManagementAction.Identify:
                  n = this.handleIdentify(t);
              }
              n &&
                n
                  .then(function () {
                    i.requestSelectDeviceToManage();
                  })
                  .catch(function (n) {
                    var o = i.getDeviceName(t),
                      s = i.uiContext.formatString(i.actionToError[e], [
                        o,
                        n.getMessage(),
                      ]);
                    i.handleError(n, s);
                  });
            },
          },
          {
            key: "setSuccessMessage",
            value: function (t, e, n) {
              this.instructions = this.uiContext.formatString(t, [e, n]);
            },
          },
          {
            key: "handleError",
            value: function (t, e) {
              var n = this;
              (this.instructions = null),
                Tt.promiseInformationInput(
                  this.username,
                  I.Information,
                  this.uiContext.getString(Z.ts_session_dm_error_dialog_title),
                  e,
                  this.uiContext.getString(Z.ts_gen_continue),
                  this.uiContext,
                  this.clientContext
                ).then(function () {
                  t.getErrorCode() ==
                  com.ts.mobile.sdk.AuthenticationErrorCode.PolicyRejection
                    ? n.deviceManagementSessionService.finishSession()
                    : n.requestSelectDeviceToManage();
                });
            },
          },
          {
            key: "handleCancel",
            value: function () {
              this.requestSelectDeviceToManage();
            },
          },
          {
            key: "requestSelectDeviceToManage",
            value: function () {
              var t = this;
              this.deviceManagementSessionService
                .requestRefreshDevices()
                .then(function () {
                  return t.openSelectDeviceToManage();
                });
            },
          },
          {
            key: "openManageDevice",
            value: function (t) {
              var e = t.getInfo(),
                n = t.getAvailableActions(),
                i = this.getDeviceName(t),
                o = this.getDeviceOS(t),
                s = this.getLastAccessed(t),
                a = this.getAddedOn(t),
                r = e.getIsCurrent(),
                c = new qn(this.uiContext);
              c.setUserName(this.username),
                c.setDevice(i, o, s, a, r, n),
                c.onAction(this.handleAction.bind(this, t)),
                c.onCancel(this.handleCancel.bind(this)),
                It.renderPage(c, this.clientContext);
            },
          },
          {
            key: "openSelectDeviceToManage",
            value: function () {
              var t = this,
                e = {},
                n = new Rn(this.uiContext);
              n.setUserName(this.username),
                this.instructions && n.setInstructions(this.instructions),
                this.devices.forEach(function (i) {
                  var o = i.getInfo(),
                    s = o.getDeviceId(),
                    a = t.getDeviceName(i),
                    r = t.getLastAccessed(i),
                    c = o.getIsCurrent();
                  (e[s] = i), n.addDevice(s, a, r, c, I.WebBrowser);
                }),
                n.onSelect(function (n) {
                  (t.instructions = null), t.openManageDevice(e[n]);
                }),
                n.onBack(function () {
                  (t.instructions = null),
                    t.deviceManagementSessionService.finishSession();
                }),
                It.renderPage(n, this.clientContext);
            },
          },
          {
            key: "getDeviceName",
            value: function (t) {
              var e = t.getInfo(),
                n = e.getName();
              return kt.getDeviceName(n, e);
            },
          },
          {
            key: "getDeviceOS",
            value: function (t) {
              var e = t.getInfo();
              return "".concat(e.getOsType(), "  ").concat(e.getOsVersion());
            },
          },
          {
            key: "getLastAccessed",
            value: function (t) {
              var e = new Date(t.getInfo().getLastAccess()).toLocaleString();
              return this.uiContext.formatString(
                Z.ts_session_dm_last_used_date,
                [e]
              );
            },
          },
          {
            key: "getAddedOn",
            value: function (t) {
              var e = new Date(t.getInfo().getRegistered()).toLocaleString();
              return this.uiContext.formatString(Z.ts_session_dm_added_at, [e]);
            },
          },
        ]),
        t
      );
    })();
  !(function (t) {
    (t.Text = "text"), (t.Email = "email"), (t.MobileNumber = "phone");
  })(Qn || (Qn = {}));
  var Gn,
    Jn = "xmui-mobile-phone-input",
    ti = "".concat(Jn, "_separator"),
    ei = "".concat(Jn, "_plus"),
    ni = "".concat(Jn, "_country-code-container"),
    ii = "-",
    oi = "+",
    si = (function (t) {
      function e() {
        var t,
          i =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        n(this, e),
          (t = l(
            this,
            r(e).call(this, Lt.PositiveInteger, Q.input_mobile_phone_number)
          )).addClass(Jn);
        var s = new A(ii);
        (s.className = ti), t.prependToInputRow(s);
        var a = new T();
        a.className = ni;
        var c = new Ft(Q.input_mobile_phone_coutry_code);
        (c.type = "text"),
          (c.maxlength = 3),
          c.onKeypress(function (t, e) {
            return Kt.positiveInteger(e);
          }),
          c.onPaste(t.handlePaste.bind(u(t))),
          c.onChange(t.handleChange.bind(u(t))),
          a.appendChild(c),
          t.prependToInputRow(a);
        var _ = new A(oi);
        return (
          (_.className = ei),
          t.prependToInputRow(_),
          (t.countryCodeInput = c),
          t.addValidator(Qt.mobileNumber),
          (t.value = "".concat(i).concat(ii).concat(o)),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "getRequiredValidator",
            value: function () {
              return function (t) {
                var e = t.replace(ii, "");
                return Qt.required(e);
              };
            },
          },
          {
            key: "checkHasValue",
            value: function () {
              return !!this.value.replace(ii, "").length;
            },
          },
          {
            key: "isEmpty",
            get: function () {
              return !this.value.trim().replace(ii, "").length;
            },
          },
          {
            key: "value",
            set: function (t) {
              var n = t.length && t.split(ii);
              n &&
                2 === n.length &&
                ((this.countryCodeInput.value = n[0]),
                p(r(e.prototype), "value", n[1], this, !0));
            },
            get: function () {
              return ""
                .concat(this.countryCodeInput.value)
                .concat(ii)
                .concat(h(r(e.prototype), "value", this));
            },
          },
          {
            key: "countryCode",
            get: function () {
              return this.countryCodeInput.value;
            },
          },
          {
            key: "number",
            get: function () {
              return h(r(e.prototype), "value", this);
            },
          },
        ]),
        e
      );
    })(Xt),
    ai = "xmui-dynamic-mobile-phone-input",
    ri = (function (t) {
      function e(t) {
        var i;
        n(this, e), (i = l(this, r(e).call(this))).addClass(ai);
        var o = (t.value && t.value.country_code) || "",
          s = (t.value && t.value.number) || "",
          a = new si(o, s);
        return (
          (a.name = t.id),
          (a.message = t.hint ? t.hint : ""),
          (a.required = !0 === t.mandatory),
          (a.placeholder = a.required ? t.name.trim() + " *" : t.name),
          i.appendChild(a),
          (i.mobilePhoneInput = a),
          i
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "validateAndSetErrorMessage",
            value: function () {
              return this.mobilePhoneInput.validateAndSetErrorMessage();
            },
          },
          {
            key: "name",
            get: function () {
              return this.mobilePhoneInput.name;
            },
          },
          {
            key: "value",
            get: function () {
              return {
                country_code: this.mobilePhoneInput.countryCode,
                number: this.mobilePhoneInput.number,
              };
            },
          },
          {
            key: "required",
            get: function () {
              return this.mobilePhoneInput.required;
            },
          },
          {
            key: "isEmpty",
            get: function () {
              return this.mobilePhoneInput.isEmpty;
            },
          },
        ]),
        e
      );
    })(Vt),
    ci = (function (t) {
      function e(t, i, o, s) {
        var a;
        return (
          n(this, e),
          ((a = l(this, r(e).call(this, t))).actions = s),
          (a.id = i),
          (a.name = o),
          a.buildActions(s),
          a
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "buildActions",
            value: function (t) {
              var e = this;
              t.forEach(function (t) {
                var n = e.createInputField(t);
                e.appendChild(n);
              });
            },
          },
          {
            key: "createInputField",
            value: function (t) {
              var e, n, i;
              switch (t.type) {
                case Qn.Text:
                  (e = Lt.Text), (i = new Xt(e, Q.input_text));
                  break;
                case Qn.Email:
                  (e = Lt.Email), (i = new Xt(e, Q.input_email)), (n = 254);
                  break;
                case Qn.MobileNumber:
                  return new ri(t);
                default:
                  throw new Error("Unsupported form field type");
              }
              return (
                (i.name = t.id),
                (i.message = t.hint ? t.hint : ""),
                (i.required = !0 === t.mandatory),
                (i.placeholder = i.required ? t.name.trim() + " *" : t.name),
                t.value && (i.value = t.value),
                null != n && (i.maxlength = n),
                i
              );
            },
          },
        ]),
        e
      );
    })(te),
    ui = "xmui-dynamic-form-page",
    li = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          ((s = l(
            this,
            r(e).call(this, Q.page_dynamic_form, ui, t)
          )).formId = i),
          (s.payload = o),
          s.setTitle(s.payload.title || s.formId),
          s.payload.subtitle && s.setInstructions(s.payload.subtitle);
        var a = s.createForm();
        return s.setContent(a), s;
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = this,
                e = new dt(Q.button_continue);
              (e.label = this.uiContext.getString(
                Z.ts_authenticator_password_cta_positive
              )),
                this.addRightButton(e);
              var n = new ci(
                e,
                "xmui-dynamic-form",
                "xmui-dynamic-form",
                this.payload.actions
              );
              return (
                n.onSubmit(function (e) {
                  t.onSubmitCB &&
                    t.onSubmitCB({ type: t.payload.type, actions: e });
                }),
                n.start(),
                n
              );
            },
          },
        ]),
        e
      );
    })(pt);
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Continue = 1)] = "Continue"),
      (t[(t.Error = 2)] = "Error");
  })(Gn || (Gn = {}));
  var _i = (function () {
      function t(e, i) {
        n(this, t),
          (this.formId = e),
          (this.payload = i),
          (this.state = Gn.Init);
      }
      return (
        o(t, [
          {
            key: "startSession",
            value: function (t, e) {
              (this.clientContext = t), (this.actionContext = e);
            },
          },
          { key: "endSession", value: function () {} },
          {
            key: "onContinue",
            value: function (t) {
              (this.payload = t), (this.state = Gn.Continue);
            },
          },
          {
            key: "onError",
            value: function (t) {
              (this.payload = t), (this.state = Gn.Error);
            },
          },
          {
            key: "promiseFormInput",
            value: function () {
              var t = this;
              return new Promise(function (e, n) {
                var i = new li(t.actionContext, t.formId, t.payload),
                  o = It.getUsernameFromClientContext(t.clientContext);
                o && i.setUserName(o),
                  i.onSubmit(function (t) {
                    e(
                      com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(
                        t
                      )
                    );
                  }),
                  i.onCancel(function () {
                    e(
                      com.ts.mobile.sdk.FormInput.createFormCancellationRequest()
                    );
                  }),
                  i.onEscape(function (t) {
                    e(com.ts.mobile.sdk.FormInput.createEscapeRequest(t, {}));
                  }),
                  It.renderPage(i, t.clientContext);
              });
            },
          },
        ]),
        t
      );
    })(),
    hi = (function (t) {
      function e() {
        var t;
        return (
          n(this, e),
          ((t = l(
            this,
            r(e).call(this, Lt.Text, Q.input_security_question)
          )).answered = !1),
          t.onChange(function () {
            t.updateState(t.value);
          }),
          t
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "updateState",
            value: function (t) {
              this.answered !== !!t &&
                (t ? this.addIcon(I.Checkmark) : this.removeIcon(I.Checkmark),
                (this.answered = !!t));
            },
          },
          {
            key: "value",
            set: function (t) {
              p(r(e.prototype), "value", t, this, !0), this.updateState(t);
            },
            get: function () {
              return h(r(e.prototype), "value", this);
            },
          },
        ]),
        e
      );
    })(Xt),
    di = "xmui-security-questions-reg-page",
    pi = "".concat("xmui-security-questions-reg-form", "_input-container"),
    mi = "".concat("xmui-security-questions-reg-form", "_progress-indication"),
    gi = "xmui-security-questions-reg-form",
    fi = function t(e, i) {
      n(this, t), (this.question = e), (this.input = i);
    },
    vi = (function (t) {
      function e(t, i) {
        var o;
        n(this, e),
          ((o = l(
            this,
            r(e).call(this, Q.input_security_question, di, t)
          )).questions = i.getSecurityQuestions()),
          (o.minimumAnswersNeeded = i.getMinAnswersNeeded()),
          o.setTitle(o.getTitle()),
          o.setInstructions(o.getInstructions()),
          (o.content = o.createForm()),
          o.setContent(o.content);
        var s = new dt(Q.button_continue);
        return (
          (s.label = o.uiContext.getString(
            Z.ts_authenticator_password_cta_positive
          )),
          (s.type = it.Submit),
          (s.form = gi),
          s.onClick(function () {
            return o.onSubmitCB(o.collectUserAnswers());
          }),
          o.addRightButton(s),
          (o.continueButton = s),
          o.updateFormState(),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), t && this.setInstructions(t);
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "collectUserAnswers",
            value: function () {
              var t = Array();
              return (
                this.questionsAndAnswers.forEach(function (e) {
                  var n = e.input.value.trim();
                  n &&
                    t.push(
                      com.ts.mobile.sdk.SecurityQuestionAndAnswer.createAnswerToQuestion(
                        e.question,
                        com.ts.mobile.sdk.SecurityQuestionAnswer.createWithText(
                          n
                        )
                      )
                    );
                }),
                t
              );
            },
          },
          {
            key: "updateFormState",
            value: function () {
              var t = this.countAnsweredQuestions();
              this.updateUserProgress(t), this.updateSubmitButton(t);
            },
          },
          {
            key: "updateSubmitButton",
            value: function (t) {
              this.continueButton.disabled = t < this.minimumAnswersNeeded;
            },
          },
          {
            key: "countAnsweredQuestions",
            value: function () {
              return this.questionsAndAnswers.reduce(function (t, e) {
                return e.input.value.trim() ? ++t : t;
              }, 0);
            },
          },
          {
            key: "updateUserProgress",
            value: function (t) {
              var e = this.uiContext.formatString(
                Z.ts_authenticator_questions_left,
                [t.toString(), this.questions.length.toString()]
              );
              this.progressIndication.setText(e);
            },
          },
          {
            key: "getTitle",
            value: function () {
              var t = Z.ts_authenticator_questions_title_reg;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getInstructions",
            value: function () {
              var t = Z.ts_authenticator_questions_intro_reg;
              return this.uiContext.formatString(t, [
                this.minimumAnswersNeeded.toString(),
                this.questions.length.toString(),
              ]);
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = this;
              this.questionsAndAnswers = Array();
              var e = new te();
              e.addClass("xmui-security-questions-reg-form"), (e.id = gi);
              var n = new T();
              return (
                (n.className = pi),
                this.questions.forEach(function (e) {
                  var i = e.getSecurityQuestionText(),
                    o = new hi();
                  (o.placeholder = i),
                    (o.ariaLabel = i),
                    n.appendChild(o),
                    t.questionsAndAnswers.push(new fi(e, o));
                }),
                this.questionsAndAnswers[0].input.focus(),
                (this.progressIndication = new A()),
                (this.progressIndication.className = mi),
                e.appendChildren(n, this.progressIndication),
                e.onUserInput(this.updateFormState.bind(this)),
                e
              );
            },
          },
        ]),
        e
      );
    })(ne),
    yi = "xmui-answered-security-question",
    ki = (function (t) {
      function e(t, i) {
        var o;
        n(this, e), ((o = l(this, r(e).call(this))).className = yi);
        var s = new A(),
          a = new A();
        return (
          (s.className = "".concat(yi, "_question")),
          (a.className = "".concat(yi, "_answer")),
          s.setText(t),
          a.setText(i),
          o.appendChildren(s, a),
          o
        );
      }
      return a(e, t), e;
    })(T),
    Ci = "xmui-security-questions-auth-page",
    bi = "xmui-security-questions-auth-form",
    wi = (function (t) {
      function e(t, i, o) {
        var s;
        n(this, e),
          ((s = l(
            this,
            r(e).call(this, Q.page_security_questions_auth, Ci, t)
          )).nextQuestion = i),
          (s.prevAnsweredQuestions = o),
          s.setTitle(s.getTitle()),
          s.setInstructions(s.getInstructions()),
          (s.content = s.createForm()),
          s.setContent(s.content);
        var a = new dt(Q.button_continue);
        return (
          (a.label = s.uiContext.getString(
            Z.ts_authenticator_password_cta_positive
          )),
          (a.type = it.Submit),
          (a.form = bi),
          a.onClick(function () {
            return s.onSubmitCB(s.collectUserAnswer());
          }),
          s.addRightButton(a),
          (s.continueButton = a),
          s.updateFormState(),
          s
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "setError",
            value: function (t) {
              (this.error = !0), t && this.setInstructions(t);
            },
          },
          {
            key: "onSubmit",
            value: function (t) {
              this.onSubmitCB = t;
            },
          },
          {
            key: "updateFormState",
            value: function () {
              this.updateSubmitButton();
            },
          },
          {
            key: "updateSubmitButton",
            value: function () {
              this.continueButton.disabled = !this.nextQuestionInput.value.trim();
            },
          },
          {
            key: "collectUserAnswer",
            value: function () {
              var t = this.nextQuestionInput.value;
              return com.ts.mobile.sdk.SecurityQuestionAndAnswer.createAnswerToQuestion(
                this.nextQuestion,
                com.ts.mobile.sdk.SecurityQuestionAnswer.createWithText(t)
              );
            },
          },
          {
            key: "getTitle",
            value: function () {
              var t = Z.ts_authenticator_questions_title_auth;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "getInstructions",
            value: function () {
              var t = Z.ts_authenticator_questions_intro_auth;
              return this.uiContext.getString(t);
            },
          },
          {
            key: "createForm",
            value: function () {
              var t = new te();
              t.addClass("xmui-security-questions-auth-form"),
                (t.id = bi),
                this.prevAnsweredQuestions.forEach(function (e) {
                  var n = e.getQuestion().getSecurityQuestionText(),
                    i = e.getAnswer().getAnswerText(),
                    o = new ki(n, i);
                  t.appendChild(o);
                });
              var e = new Xt(Lt.Text, Q.input_security_question),
                n = this.nextQuestion.getSecurityQuestionText();
              return (
                (e.placeholder = n),
                (e.ariaLabel = n),
                e.focus(),
                e.scrollIntoView(),
                (this.nextQuestionInput = e),
                t.appendChild(e),
                t.onUserInput(this.updateFormState.bind(this)),
                t
              );
            },
          },
        ]),
        e
      );
    })(ne),
    xi = (function (t) {
      function e(t, i) {
        var o;
        return (
          n(this, e),
          ((o = l(this, r(e).call(this, t, i))).prevAnsweredQuestions = []),
          (o.supportsInlineError = !0),
          o
        );
      }
      return (
        a(e, t),
        o(e, [
          {
            key: "showAuthUi",
            value: function () {
              this.showSecurityQuestionsAuthPage();
            },
          },
          {
            key: "showRegUi",
            value: function () {
              this.showSecurityQuestionsRegPage();
            },
          },
          {
            key: "setInputStep",
            value: function (t, e, n) {
              this.currentStep = n;
            },
          },
          {
            key: "showSecurityQuestionsRegPage",
            value: function () {
              var t = this,
                e = new vi(this.actionContext, this.currentStep);
              this.authError && e.setError(this.authError.getMessage()),
                e.onSubmit(function (n) {
                  e.blockInteraction();
                  var i = com.ts.mobile.sdk.SecurityQuestionInputResponse.createSecurityQuestionAnswersInputResponse(
                    n
                  );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      i
                    )
                  );
                }),
                this.showAuthenticatorPage(e);
            },
          },
          {
            key: "promiseCancelAction",
            value: function (t) {
              return (
                (this.prevAnsweredQuestions = []),
                h(r(e.prototype), "promiseCancelAction", this).call(this, t)
              );
            },
          },
          {
            key: "showSecurityQuestionsAuthPage",
            value: function () {
              var t = this;
              this.authError && (this.prevAnsweredQuestions = []);
              var e = new wi(
                this.actionContext,
                this.currentStep.getSecurityQuestions()[0],
                this.prevAnsweredQuestions
              );
              this.authError && e.setError(this.authError.getMessage()),
                e.onSubmit(function (n) {
                  e.blockInteraction();
                  var i = com.ts.mobile.sdk.SecurityQuestionInputResponse.createSecurityQuestionAnswersInputResponse(
                    [n]
                  );
                  t.resolveInputPromise(
                    com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(
                      i
                    )
                  ),
                    t.prevAnsweredQuestions.push(n);
                }),
                this.showAuthenticatorPage(e);
            },
          },
        ]),
        e
      );
    })(Bt),
    Si = (function () {
      function t() {
        n(this, t), xt.init();
      }
      return (
        o(
          t,
          [
            {
              key: "startActivityIndicator",
              value: function (t, e) {
                It.activityStarted(e);
              },
            },
            {
              key: "endActivityIndicator",
              value: function (t, e) {
                It.activityEnded(e);
              },
            },
            {
              key: "controlFlowCancelled",
              value: function (t) {
                It.log("Control flow cancelled"), It.clearContainer(t);
              },
            },
            {
              key: "controlFlowStarting",
              value: function (t) {
                It.log("Control flow started");
              },
            },
            {
              key: "controlFlowEnded",
              value: function (t, e) {
                var n = t ? " with error: ".concat(t) : "";
                It.log("Control flow ended" + n);
              },
            },
            {
              key: "controlFlowActionStarting",
              value: function (t, e) {
                It.log("Control flow action starting");
              },
            },
            {
              key: "controlFlowActionEnded",
              value: function (t, e, n) {
                It.log("Control flow action starting");
              },
            },
            {
              key: "handleAuthenticatorUnregistration",
              value: function (t, e, n, i) {
                return Promise.resolve(
                  com.ts.mobile.sdk.UnregistrationInput.create(0)
                );
              },
            },
            {
              key: "selectAuthenticator",
              value: function (t, e, n) {
                return Tt.promiseAuthenticator(t, e, n);
              },
            },
            {
              key: "selectAuthenticatorFallbackAction",
              value: function (t, e, n, i, o) {
                var s = It.getUsernameFromClientContext(o);
                return Tt.promiseAuthenticatorFallbackAction(s, t, e, n, i, o);
              },
            },
            {
              key: "controlOptionForCancellationRequestInSession",
              value: function (t, e) {
                return e.promiseCancelAction(t);
              },
            },
            {
              key: "createPasswordAuthSession",
              value: function (t, e) {
                return new ae(t, e);
              },
            },
            {
              key: "createPinAuthSession",
              value: function (t, e, n) {
                return new ye(t, e, n);
              },
            },
            {
              key: "createPatternAuthSession",
              value: function (t, e, n, i) {
                return new qe(t, e, n, i);
              },
            },
            {
              key: "createOtpAuthSession",
              value: function (t, e, n, i) {
                return new an(t, e, n, i);
              },
            },
            {
              key: "createVoiceAuthSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createSecurityQuestionAuthSession",
              value: function (t, e) {
                return new xi(t, e);
              },
            },
            {
              key: "createPlaceholderAuthSession",
              value: function (t, e, n, i, o, s) {
                throw new Error("Method not implemented by demo application.");
              },
            },
            {
              key: "getConfirmationInput",
              value: function (t, e, n, i, o, s) {
                var a = It.getUsernameFromClientContext(s);
                return Tt.promiseConfirmationActionInput(
                  a,
                  I.Confirmation,
                  t,
                  e,
                  n,
                  i,
                  o,
                  s
                );
              },
            },
            {
              key: "getInformationResponse",
              value: function (t, e, n, i, o) {
                var s = It.getUsernameFromClientContext(o);
                return Tt.promiseInformationActionInput(
                  s,
                  I.Information,
                  t,
                  e,
                  n,
                  i,
                  o
                );
              },
            },
            {
              key: "createMobileApproveAuthSession",
              value: function (t, e, n) {
                return new de(t, e, n);
              },
            },
            {
              key: "createTicketWaitSession",
              value: function (t, e) {
                return new pn();
              },
            },
            {
              key: "createTotpAuthSession",
              value: function (t, e) {
                return new ln(t, e);
              },
            },
            {
              key: "createFormSession",
              value: function (t, e) {
                if (e && "dynamic_form" === e.type) return new _i(t, e);
                throw new Error("Method not implemented by demo application.");
              },
            },
            {
              key: "createAuthenticationConfigurationSession",
              value: function (t) {
                return new In(t);
              },
            },
            {
              key: "createRegistrationPromotionSession",
              value: function (t, e) {
                return new Pn(t, e);
              },
            },
            {
              key: "processJsonData",
              value: function (t, e, n) {
                throw new Error("Method not implemented by demo application.");
              },
            },
            {
              key: "handlePolicyRejection",
              value: function (t, e, n, i, o, s) {
                return Tt.promisePolicyRejectionInput(t, e, n, i, o, s);
              },
            },
            {
              key: "handlePolicyRedirect",
              value: function (t, e, n, i, o) {
                return (
                  It.log(
                    "Policy redirection requested. redirecting to policy: ["
                      .concat(e, "] with additionalParameters: [")
                      .concat(i, "]")
                  ),
                  Promise.resolve(
                    com.ts.mobile.sdk.RedirectInput.create(
                      com.ts.mobile.sdk.RedirectResponseType.RedirectToPolicy
                    )
                  )
                );
              },
            },
            {
              key: "shouldIncludeDisabledAuthenticatorsInMenu",
              value: function (t, e) {
                return !0;
              },
            },
            {
              key: "createScanQrSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createFingerprintAuthSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createApprovalsSession",
              value: function (t) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createTotpGenerationSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createDeviceManagementSession",
              value: function (t) {
                return It.log("Starting device management session"), new Xn(t);
              },
            },
            {
              key: "createNativeFaceAuthSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createFaceAuthSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "createDeviceBiometricsAuthSession",
              value: function (t, e) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "localAuthenticatorInvalidated",
              value: function (t) {
                throw new Error("Method not implemented.");
              },
            },
            {
              key: "setLogEnabled",
              value: function (t) {
                It.setLogEnabled(t);
              },
            },
          ],
          [
            {
              key: "presentUI",
              value: function (t, e) {
                It.presentUI(t, e);
              },
            },
          ]
        ),
        t
      );
    })();
  (t.XmUIHandler = Si), Object.defineProperty(t, "__esModule", { value: !0 });
});
