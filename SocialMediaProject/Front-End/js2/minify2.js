/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
window.Socialite = function(e, t, n) {
        "use strict"
        var a = 0,
            i = [],
            o = {},
            r = {},
            l = /^($|loaded|complete)/,
            s = e.encodeURIComponent,
            c = {
                settings: {},
                trim: function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                },
                hasClass: function(e, t) {
                    return -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
                },
                addClass: function(e, t) {
                    c.hasClass(e, t) || (e.className = "" === e.className ? t : e.className + " " + t)
                },
                removeClass: function(e, t) {
                    e.className = c.trim(" " + e.className + " ".replace(" " + t + " ", " "))
                },
                extendObject: function(e, t, a) {
                    for (var i in t) {
                        var o = e[i] !== n
                        o && "object" == typeof t[i] ? c.extendObject(e[i], t[i], a) : (a || !o) && (e[i] = t[i])
                    }
                },
                getElements: function(e, t) {
                    for (var n = 0, a = [], i = !!e.getElementsByClassName, o = i ? e.getElementsByClassName(t) : e.getElementsByTagName("*"); o.length > n; n++)(i || c.hasClass(o[n], t)) && a.push(o[n])
                    return a
                },
                getDataAttributes: function(e, t, n) {
                    for (var a = 0, i = "", o = {}, r = e.attributes; r.length > a; a++) {
                        var l = r[a].name,
                            c = r[a].value
                        c.length && 0 === l.indexOf("data-") && (t && (l = l.substring(5)), n ? o[l] = c : i += s(l) + "=" + s(c) + "&")
                    }
                    return n ? o : i
                },
                copyDataAttributes: function(e, t, n, a) {
                    var i = c.getDataAttributes(e, n, !0)
                    for (var o in i) t.setAttribute(a ? o.replace(/-/g, "_") : o, i[o])
                },
                createIframe: function(e, n) {
                    var a = t.createElement("iframe")
                    return a.style.cssText = "overflow: hidden; border: none;", c.extendObject(a, {
                        src: e,
                        allowtransparency: "true",
                        frameborder: "0",
                        scrolling: "no"
                    }, !0), n && (a.onload = a.onreadystatechange = function() {
                        l.test(a.readyState || "") && (a.onload = a.onreadystatechange = null, c.activateInstance(n))
                    }), a
                },
                networkReady: function(e) {
                    return o[e] ? o[e].loaded : n
                },
                appendNetwork: function(e) {
                    if (e && !e.appended) {
                        if ("function" == typeof e.append && e.append(e) === !1) return e.appended = e.loaded = !0, c.activateAll(e), n
                        e.script && (e.el = t.createElement("script"), c.extendObject(e.el, e.script, !0), e.el.async = !0, e.el.onload = e.el.onreadystatechange = function() {
                            if (l.test(e.el.readyState || "")) {
                                if (e.el.onload = e.el.onreadystatechange = null, e.loaded = !0, "function" == typeof e.onload && e.onload(e) === !1) return
                                c.activateAll(e)
                            }
                        }, t.body.appendChild(e.el)), e.appended = !0
                    }
                },
                removeNetwork: function(e) {
                    return c.networkReady(e.name) ? (e.el.parentNode && e.el.parentNode.removeChild(e.el), !(e.appended = e.loaded = !1)) : !1
                },
                reloadNetwork: function(e) {
                    var t = o[e]
                    t && c.removeNetwork(t) && c.appendNetwork(t)
                },
                createInstance: function(e, t) {
                    var o = !0,
                        r = {
                            el: e,
                            uid: a++,
                            widget: t
                        }
                    return i.push(r), t.process !== n && (o = "function" == typeof t.process ? t.process(r) : !1), o && c.processInstance(r), r.el.setAttribute("data-socialite", r.uid), r.el.className = "socialite " + t.name + " socialite-instance", r
                },
                processInstance: function(e) {
                    var n = e.el
                    e.el = t.createElement("div"), e.el.className = n.className, c.copyDataAttributes(n, e.el), "a" !== n.nodeName.toLowerCase() || n.getAttribute("data-default-href") || e.el.setAttribute("data-default-href", n.getAttribute("href"))
                    var a = n.parentNode
                    a.insertBefore(e.el, n), a.removeChild(n)
                },
                activateInstance: function(e) {
                    return e && !e.loaded ? (e.loaded = !0, "function" == typeof e.widget.activate && e.widget.activate(e), c.addClass(e.el, "socialite-loaded"), e.onload ? e.onload(e.el) : null) : n
                },
                activateAll: function(e) {
                    "string" == typeof e && (e = o[e])
                    for (var t = 0; i.length > t; t++) {
                        var n = i[t]
                        n.init && n.widget.network === e && c.activateInstance(n)
                    }
                },
                load: function(e, a, o, l, s) {
                    if (e = e && "object" == typeof e && 1 === e.nodeType ? e : t, !a || "object" != typeof a) return c.load(e, c.getElements(e, "socialite"), o, l, s), n
                    var d
                    if (/Array/.test(Object.prototype.toString.call(a)))
                        for (d = 0; a.length > d; d++) c.load(e, a[d], o, l, s)
                    else if (1 === a.nodeType) {
                        if (!o || !r[o]) {
                            o = null
                            var p = a.className.split(" ")
                            for (d = 0; p.length > d; d++)
                                if (r[p[d]]) {
                                    o = p[d]
                                    break
                                }
                            if (!o) return
                        }
                        var u, f = r[o],
                            g = parseInt(a.getAttribute("data-socialite"), 10)
                        if (isNaN(g)) u = c.createInstance(a, f)
                        else
                            for (d = 0; i.length > d; d++)
                                if (i[d].uid === g) {
                                    u = i[d]
                                    break
                                }!s && u && (u.init || (u.init = !0, u.onload = "function" == typeof l ? l : null, f.init(u)), f.network.appended ? c.networkReady(f.network.name) && c.activateInstance(u) : c.appendNetwork(f.network))
                    }
                },
                activate: function(t, n, a) {
                    e.Socialite.load(null, t, n, a)
                },
                process: function(t, n, a) {
                    e.Socialite.load(t, n, a, null, !0)
                },
                network: function(e, t) {
                    o[e] = {
                        name: e,
                        el: null,
                        appended: !1,
                        loaded: !1,
                        widgets: {}
                    }, t && c.extendObject(o[e], t)
                },
                widget: function(e, t, n) {
                    n.name = e + "-" + t, o[e] && !r[n.name] && (n.network = o[e], o[e].widgets[t] = r[n.name] = n)
                },
                setup: function(e) {
                    c.extendObject(c.settings, e, !0)
                }
            }
        return c
    }(window, window.document),
    function(e, n, a) {
        a.setup({
            facebook: {
                lang: "en_GB",
                appId: null
            },
            twitter: {
                lang: "en"
            },
            googleplus: {
                lang: "en-GB"
            }
        }), a.network("facebook", {
            script: {
                src: "//connect.facebook.net/{{language}}/all.js",
                id: "facebook-jssdk"
            },
            append: function(t) {
                var i = n.createElement("div"),
                    o = a.settings.facebook,
                    r = {
                        onlike: "edge.create",
                        onunlike: "edge.remove",
                        onsend: "message.send"
                    }
                i.id = "fb-root", n.body.appendChild(i), t.script.src = t.script.src.replace("{{language}}", o.lang), e.fbAsyncInit = function() {
                    e.FB.init({
                        appId: o.appId,
                        xfbml: !0
                    })
                    for (var t in r) "function" == typeof o[t] && e.FB.Event.subscribe(r[t], o[t])
                }
            }
        }), a.widget("facebook", "like", {
            init: function(t) {
                var i = n.createElement("div")
                i.className = "fb-like", a.copyDataAttributes(t.el, i), t.el.appendChild(i), e.FB && e.FB.XFBML && e.FB.XFBML.parse(t.el)
            }
        }), a.network("twitter", {
            script: {
                src: "//platform.twitter.com/widgets.js",
                id: "twitter-wjs",
                charset: "utf-8"
            },
            append: function() {
                var n = "object" != typeof e.twttr,
                    i = a.settings.twitter,
                    o = ["click", "tweet", "retweet", "favorite", "follow"]
                return n && (e.twttr = t = {
                    _e: [],
                    ready: function(e) {
                        t._e.push(e)
                    }
                }), e.twttr.ready(function(e) {
                    for (var t = 0; o.length > t; t++) {
                        var n = o[t]
                        "function" == typeof i["on" + n] && e.events.bind(n, i["on" + n])
                    }
                    a.activateAll("twitter")
                }), n
            }
        })
        var i = function(e) {
                var t = n.createElement("a")
                t.className = e.widget.name + "-button", a.copyDataAttributes(e.el, t), t.setAttribute("href", e.el.getAttribute("data-default-href")), t.setAttribute("data-lang", e.el.getAttribute("data-lang") || a.settings.twitter.lang), e.el.appendChild(t)
            },
            o = function() {
                e.twttr && "object" == typeof e.twttr.widgets && "function" == typeof e.twttr.widgets.load && e.twttr.widgets.load()
            }
        a.widget("twitter", "share", {
            init: i,
            activate: o
        }), a.widget("twitter", "follow", {
            init: i,
            activate: o
        }), a.widget("twitter", "hashtag", {
            init: i,
            activate: o
        }), a.widget("twitter", "mention", {
            init: i,
            activate: o
        }), a.widget("twitter", "embed", {
            process: function(e) {
                e.innerEl = e.el, e.innerEl.getAttribute("data-lang") || e.innerEl.setAttribute("data-lang", a.settings.twitter.lang), e.el = n.createElement("div"), e.el.className = e.innerEl.className, e.innerEl.className = "", e.innerEl.parentNode.insertBefore(e.el, e.innerEl), e.el.appendChild(e.innerEl)
            },
            init: function(e) {
                e.innerEl.className = "twitter-tweet"
            },
            activate: o
        }), a.network("googleplus", {
            script: {
                src: "//apis.google.com/js/plusone.js"
            },
            append: function() {
                return e.gapi ? !1 : (e.___gcfg = {
                    lang: a.settings.googleplus.lang,
                    parsetags: "explicit"
                }, undefined)
            }
        })
        var r = function(e) {
                var t = n.createElement("div")
                t.className = "g-" + e.widget.gtype, a.copyDataAttributes(e.el, t), e.el.appendChild(t), e.gplusEl = t
            },
            l = function(e, t) {
                return "function" != typeof t ? null : function(n) {
                    t(e.el, n)
                }
            },
            s = function(t) {
                var n = t.widget.gtype
                if (e.gapi && e.gapi[n]) {
                    for (var i = a.settings.googleplus, o = a.getDataAttributes(t.el, !0, !0), r = ["onstartinteraction", "onendinteraction", "callback"], s = 0; r.length > s; s++) o[r[s]] = l(t, i[r[s]])
                    e.gapi[n].render(t.gplusEl, o)
                }
            }
        a.widget("googleplus", "one", {
            init: r,
            activate: s,
            gtype: "plusone"
        }), a.widget("googleplus", "share", {
            init: r,
            activate: s,
            gtype: "plus"
        }), a.widget("googleplus", "badge", {
            init: r,
            activate: s,
            gtype: "plus"
        }), a.network("linkedin", {
            script: {
                src: "//platform.linkedin.com/in.js"
            }
        })
        var c = function(t) {
            var i = n.createElement("script")
            i.type = "IN/" + t.widget.intype, a.copyDataAttributes(t.el, i), t.el.appendChild(i), "object" == typeof e.IN && "function" == typeof e.IN.parse && (e.IN.parse(t.el), a.activateInstance(t))
        }
        a.widget("linkedin", "share", {
            init: c,
            intype: "Share"
        }), a.widget("linkedin", "recommend", {
            init: c,
            intype: "RecommendProduct"
        })
    }(window, window.document, window.Socialite),
    function() {
        var e = window._socialite
        if (/Array/.test(Object.prototype.toString.call(e)))
            for (var t = 0, n = e.length; n > t; t++) "function" == typeof e[t] && e[t]()
    }();;
jQuery(function($) {
    Socialite.process();
    if ($("body").hasClass("wpsocialite-scroll")) {
        var articles = $('.social-buttons'),
            socialised = {},
            win = $(window),
            updateArticles, onUpdate, updateTimeout;
        updateArticles = function() {
            var wT = win.scrollTop(),
                wL = win.scrollLeft(),
                wR = wL + win.width(),
                wB = wT + win.height();
            for (var i = 0; i < articles.length; i++) {
                if (socialised[i]) {
                    continue;
                }
                var art = $(articles[i]),
                    aT = art.offset().top,
                    aL = art.offset().left,
                    aR = aL + art.width(),
                    aB = aT + art.height();
                if ((aT >= wT && aT <= wB) || (aB >= wT && aB <= wB)) {
                    if ((aL >= wL && aL <= wR) || (aR >= wL && aR <= wR)) {
                        socialised[i] = true;
                        Socialite.load(articles[i]);
                    }
                }
            }
        };
        onUpdate = function() {
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
            updateTimeout = setTimeout(updateArticles, 100);
        };
        win.on('resize', onUpdate).on('scroll', onUpdate);
        setTimeout(updateArticles, 100);
    } else {
        $('.social-buttons').parent().one('mouseenter', function() {
            Socialite.load($(this)[0]);
        });
    }
});;
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function(e) {
    "use strict";

    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) return;
            r = n[0]
        }
        var i = this;
        if (i.clk = r, "image" == r.type)
            if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
            var o = a.offset();
            i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
        } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
    var i = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!i) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function(t) {
        function r(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }

        function o(a) {
            for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
            if (t.extraData) {
                var o = r(t.extraData);
                for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
            }
            t.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: u || "POST"
            });
            t.uploadProgress && (s.xhr = function() {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function(e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), s.data = null;
            var c = s.beforeSend;
            return s.beforeSend = function(e, r) {
                r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
            }, e.ajax(s)
        }

        function s(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (r) {
                    a("cannot get iframe.contentWindow document: " + r)
                }
                if (t) return t;
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document
                }
                return t
            }

            function o() {
                function t() {
                    try {
                        var e = n(g).readyState;
                        a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (r) {
                        a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                    }
                }
                var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;
                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (j = setTimeout(function() {
                    T = !0, s(D)
                }, m.timeout));
                var l = [];
                try {
                    if (m.extraData)
                        for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                    m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                    try {
                        w.submit()
                    } catch (h) {
                        var x = document.createElement("form").submit;
                        x.apply(w)
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                }
            }

            function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                    if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                    if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) throw "timeout";
                            var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                            if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                            var u = M.body ? M.body : M.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                                var t = {
                                    "content-type": m.dataType
                                };
                                return t[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];
                                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                else if (l) {
                                    var p = M.getElementsByTagName("pre")[0],
                                        h = M.getElementsByTagName("body")[0];
                                    p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                }
                            } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                            try {
                                E = _(x, c, m)
                            } catch (y) {
                                i = "parsererror", x.error = r = y || i
                            }
                        } catch (y) {
                            a("error caught: ", y), i = "error", x.error = r = y || i
                        }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() {
                            m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                        }, 100)
                    }
                }
            }
            var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                S = e.Deferred();
            if (S.abort = function(e) {
                    x.abort(e)
                }, r)
                for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), g = v[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try {
                            g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                        } catch (n) {}
                        v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
            if (x.aborted) return S.reject(), S;
            y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
            var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");
            L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
            var E, M, F, O = 50,
                X = e.parseXML || function(e, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                },
                C = e.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                _ = function(t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = "xml" === r || !r && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
            return S
        }
        if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
        var u, c, l, f = this;
        "function" == typeof t ? t = {
            success: t
        } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
            url: l,
            success: e.ajaxSettings.success,
            type: u || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var d = t.traditional;
        void 0 === d && (d = e.ajaxSettings.traditional);
        var p, h = [],
            v = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var g = e.param(v, d);
        p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
        var x = [];
        if (t.resetForm && x.push(function() {
                f.resetForm()
            }), t.clearForm && x.push(function() {
                f.clearForm(t.includeHidden)
            }), !t.dataType && t.target) {
            var y = t.success || function() {};
            x.push(function(r) {
                var a = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[a](r).each(y, arguments)
            })
        } else t.success && x.push(t.success);
        if (t.success = function(e, r, a) {
                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
            }, t.error) {
            var b = t.error;
            t.error = function(e, r, a) {
                var n = t.context || this;
                b.apply(n, [e, r, a, f])
            }
        }
        if (t.complete) {
            var T = t.complete;
            t.complete = function(e, r) {
                var a = t.context || this;
                T.apply(a, [e, r, f])
            }
        }
        var j = e("input[type=file]:enabled", this).filter(function() {
                return "" !== e(this).val()
            }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;
        a("fileAPI :" + k);
        var A, L = (w || D) && !k;
        t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
            A = s(v)
        }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
        for (var E = 0; E < h.length; E++) h[E] = null;
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
                e(i.s, i.c).ajaxForm(n)
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function(t, r) {
        var a = [];
        if (0 === this.length) return a;
        var i, o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;
        if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
        var c, l, f, m, d, p, h;
        for (c = 0, p = u.length; p > c; c++)
            if (d = u[c], f = d.name, f && !d.disabled)
                if (t && o.clk && "image" == d.type) o.clk == d && (a.push({
                    name: f,
                    value: e(d).val(),
                    type: d.type
                }), a.push({
                    name: f + ".x",
                    value: o.clk_x
                }, {
                    name: f + ".y",
                    value: o.clk_y
                }));
                else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
            for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({
                name: f,
                value: m[l]
            });
        else if (n.fileapi && "file" == d.type) {
            r && r.push(d);
            var v = d.files;
            if (v.length)
                for (l = 0; l < v.length; l++) a.push({
                    name: f,
                    value: v[l],
                    type: d.type
                });
            else a.push({
                name: f,
                value: "",
                type: d.type
            })
        } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
            name: f,
            value: m,
            type: d.type,
            required: d.required
        }));
        if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];
            f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                name: f,
                value: g.val()
            }), a.push({
                name: f + ".x",
                value: o.clk_x
            }, {
                name: f + ".y",
                value: o.clk_y
            }))
        }
        return a
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array)
                    for (var i = 0, o = n.length; o > i; i++) r.push({
                        name: a,
                        value: n[i]
                    });
                else null !== n && "undefined" != typeof n && r.push({
                    name: this.name,
                    value: n
                })
            }
        }), e.param(r)
    }, e.fn.fieldValue = function(t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function(t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
        if ("select" == i) {
            var o = t.selectedIndex;
            if (0 > o) return null;
            for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];
                if (m.selected) {
                    var d = m.value;
                    if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                    s.push(d)
                }
            }
            return s
        }
        return e(t).val()
    }, e.fn.clearForm = function(t) {
        return this.each(function() {
            e("input,select,textarea", this).clearFields(t)
        })
    }, e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, e.fn.selected = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            var r = this.type;
            if ("checkbox" == r || "radio" == r) this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var a = e(this).parent("select");
                t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});;
(function($) {
    'use strict';
    if (typeof _wpcf7 == 'undefined' || _wpcf7 === null) {
        _wpcf7 = {};
    }
    _wpcf7 = $.extend({
        cached: 0
    }, _wpcf7);
    $.fn.wpcf7InitForm = function() {
        this.ajaxForm({
            beforeSubmit: function(arr, $form, options) {
                $form.wpcf7ClearResponseOutput();
                $form.find('[aria-invalid]').attr('aria-invalid', 'false');
                $form.find('img.ajax-loader').css({
                    visibility: 'visible'
                });
                return true;
            },
            beforeSerialize: function($form, options) {
                $form.find('[placeholder].placeheld').each(function(i, n) {
                    $(n).val('');
                });
                return true;
            },
            data: {
                '_wpcf7_is_ajax_call': 1
            },
            dataType: 'json',
            success: $.wpcf7AjaxSuccess,
            error: function(xhr, status, error, $form) {
                var e = $('<div class="ajax-error"></div>').text(error.message);
                $form.after(e);
            }
        });
        if (_wpcf7.cached) {
            this.wpcf7OnloadRefill();
        }
        this.wpcf7ToggleSubmit();
        this.find('.wpcf7-submit').wpcf7AjaxLoader();
        this.find('.wpcf7-acceptance').click(function() {
            $(this).closest('form').wpcf7ToggleSubmit();
        });
        this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();
        this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();
        this.find('[placeholder]').wpcf7Placeholder();
        if (_wpcf7.jqueryUi && !_wpcf7.supportHtml5.date) {
            this.find('input.wpcf7-date[type="date"]').each(function() {
                $(this).datepicker({
                    dateFormat: 'yy-mm-dd',
                    minDate: new Date($(this).attr('min')),
                    maxDate: new Date($(this).attr('max'))
                });
            });
        }
        if (_wpcf7.jqueryUi && !_wpcf7.supportHtml5.number) {
            this.find('input.wpcf7-number[type="number"]').each(function() {
                $(this).spinner({
                    min: $(this).attr('min'),
                    max: $(this).attr('max'),
                    step: $(this).attr('step')
                });
            });
        }
        this.find('.wpcf7-character-count').wpcf7CharacterCount();
        this.find('.wpcf7-validates-as-url').change(function() {
            $(this).wpcf7NormalizeUrl();
        });
        this.find('.wpcf7-recaptcha').wpcf7Recaptcha();
    };
    $.wpcf7AjaxSuccess = function(data, status, xhr, $form) {
        if (!$.isPlainObject(data) || $.isEmptyObject(data)) {
            return;
        }
        var $responseOutput = $form.find('div.wpcf7-response-output');
        $form.wpcf7ClearResponseOutput();
        $form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
        $form.removeClass('invalid spam sent failed');
        if (data.captcha) {
            $form.wpcf7RefillCaptcha(data.captcha);
        }
        if (data.quiz) {
            $form.wpcf7RefillQuiz(data.quiz);
        }
        if (data.invalids) {
            $.each(data.invalids, function(i, n) {
                $form.find(n.into).wpcf7NotValidTip(n.message);
                $form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
                $form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
            });
            $responseOutput.addClass('wpcf7-validation-errors');
            $form.addClass('invalid');
            $(data.into).trigger('wpcf7:invalid');
            $(data.into).trigger('invalid.wpcf7');
        } else if (1 == data.spam) {
            $form.find('[name="g-recaptcha-response"]').each(function() {
                if ('' == $(this).val()) {
                    var $recaptcha = $(this).closest('.wpcf7-form-control-wrap');
                    $recaptcha.wpcf7NotValidTip(_wpcf7.recaptcha.messages.empty);
                }
            });
            $responseOutput.addClass('wpcf7-spam-blocked');
            $form.addClass('spam');
            $(data.into).trigger('wpcf7:spam');
            $(data.into).trigger('spam.wpcf7');
        } else if (1 == data.mailSent) {
            $responseOutput.addClass('wpcf7-mail-sent-ok');
            $form.addClass('sent');
            if (data.onSentOk) {
                $.each(data.onSentOk, function(i, n) {
                    eval(n)
                });
            }
            $(data.into).trigger('wpcf7:mailsent');
            $(data.into).trigger('mailsent.wpcf7');
        } else {
            $responseOutput.addClass('wpcf7-mail-sent-ng');
            $form.addClass('failed');
            $(data.into).trigger('wpcf7:mailfailed');
            $(data.into).trigger('mailfailed.wpcf7');
        }
        if (data.onSubmit) {
            $.each(data.onSubmit, function(i, n) {
                eval(n)
            });
        }
        $(data.into).trigger('wpcf7:submit');
        $(data.into).trigger('submit.wpcf7');
        if (1 == data.mailSent) {
            $form.resetForm();
        }
        $form.find('[placeholder].placeheld').each(function(i, n) {
            $(n).val($(n).attr('placeholder'));
        });
        $responseOutput.append(data.message).slideDown('fast');
        $responseOutput.attr('role', 'alert');
        $.wpcf7UpdateScreenReaderResponse($form, data);
    };
    $.fn.wpcf7ExclusiveCheckbox = function() {
        return this.find('input:checkbox').click(function() {
            var name = $(this).attr('name');
            $(this).closest('form').find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
        });
    };
    $.fn.wpcf7Placeholder = function() {
        if (_wpcf7.supportHtml5.placeholder) {
            return this;
        }
        return this.each(function() {
            $(this).val($(this).attr('placeholder'));
            $(this).addClass('placeheld');
            $(this).focus(function() {
                if ($(this).hasClass('placeheld'))
                    $(this).val('').removeClass('placeheld');
            });
            $(this).blur(function() {
                if ('' == $(this).val()) {
                    $(this).val($(this).attr('placeholder'));
                    $(this).addClass('placeheld');
                }
            });
        });
    };
    $.fn.wpcf7AjaxLoader = function() {
        return this.each(function() {
            var loader = $('<img class="ajax-loader" />').attr({
                src: _wpcf7.loaderUrl,
                alt: _wpcf7.sending
            }).css('visibility', 'hidden');
            $(this).after(loader);
        });
    };
    $.fn.wpcf7ToggleSubmit = function() {
        return this.each(function() {
            var form = $(this);
            if (this.tagName.toLowerCase() != 'form') {
                form = $(this).find('form').first();
            }
            if (form.hasClass('wpcf7-acceptance-as-validation')) {
                return;
            }
            var submit = form.find('input:submit');
            if (!submit.length) return;
            var acceptances = form.find('input:checkbox.wpcf7-acceptance');
            if (!acceptances.length) return;
            submit.removeAttr('disabled');
            acceptances.each(function(i, n) {
                n = $(n);
                if (n.hasClass('wpcf7-invert') && n.is(':checked') || !n.hasClass('wpcf7-invert') && !n.is(':checked')) {
                    submit.attr('disabled', 'disabled');
                }
            });
        });
    };
    $.fn.wpcf7ToggleCheckboxFreetext = function() {
        return this.each(function() {
            var $wrap = $(this).closest('.wpcf7-form-control');
            if ($(this).find(':checkbox, :radio').is(':checked')) {
                $(this).find(':input.wpcf7-free-text').prop('disabled', false);
            } else {
                $(this).find(':input.wpcf7-free-text').prop('disabled', true);
            }
            $wrap.find(':checkbox, :radio').change(function() {
                var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
                var $freetext = $(':input.wpcf7-free-text', $wrap);
                if ($cb.is(':checked')) {
                    $freetext.prop('disabled', false).focus();
                } else {
                    $freetext.prop('disabled', true);
                }
            });
        });
    };
    $.fn.wpcf7CharacterCount = function() {
        return this.each(function() {
            var $count = $(this);
            var name = $count.attr('data-target-name');
            var down = $count.hasClass('down');
            var starting = parseInt($count.attr('data-starting-value'), 10);
            var maximum = parseInt($count.attr('data-maximum-value'), 10);
            var minimum = parseInt($count.attr('data-minimum-value'), 10);
            var updateCount = function($target) {
                var length = $target.val().length;
                var count = down ? starting - length : length;
                $count.attr('data-current-value', count);
                $count.text(count);
                if (maximum && maximum < length) {
                    $count.addClass('too-long');
                } else {
                    $count.removeClass('too-long');
                }
                if (minimum && length < minimum) {
                    $count.addClass('too-short');
                } else {
                    $count.removeClass('too-short');
                }
            };
            $count.closest('form').find(':input[name="' + name + '"]').each(function() {
                updateCount($(this));
                $(this).keyup(function() {
                    updateCount($(this));
                });
            });
        });
    };
    $.fn.wpcf7NormalizeUrl = function() {
        return this.each(function() {
            var val = $.trim($(this).val());
            if (val && !val.match(/^[a-z][a-z0-9.+-]*:/i)) {
                val = val.replace(/^\/+/, '');
                val = 'http://' + val;
            }
            $(this).val(val);
        });
    };
    $.fn.wpcf7NotValidTip = function(message) {
        return this.each(function() {
            var $into = $(this);
            $into.find('span.wpcf7-not-valid-tip').remove();
            $into.append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>');
            if ($into.is('.use-floating-validation-tip *')) {
                $('.wpcf7-not-valid-tip', $into).mouseover(function() {
                    $(this).wpcf7FadeOut();
                });
                $(':input', $into).focus(function() {
                    $('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
                });
            }
        });
    };
    $.fn.wpcf7FadeOut = function() {
        return this.each(function() {
            $(this).animate({
                opacity: 0
            }, 'fast', function() {
                $(this).css({
                    'z-index': -100
                });
            });
        });
    };
    $.fn.wpcf7OnloadRefill = function() {
        return this.each(function() {
            var url = $(this).attr('action');
            if (0 < url.indexOf('#')) {
                url = url.substr(0, url.indexOf('#'));
            }
            var id = $(this).find('input[name="_wpcf7"]').val();
            var unitTag = $(this).find('input[name="_wpcf7_unit_tag"]').val();
            $.getJSON(url, {
                _wpcf7_is_ajax_call: 1,
                _wpcf7: id,
                _wpcf7_request_ver: $.now()
            }, function(data) {
                if (data && data.captcha) {
                    $('#' + unitTag).wpcf7RefillCaptcha(data.captcha);
                }
                if (data && data.quiz) {
                    $('#' + unitTag).wpcf7RefillQuiz(data.quiz);
                }
            });
        });
    };
    $.fn.wpcf7RefillCaptcha = function(captcha) {
        return this.each(function() {
            var form = $(this);
            $.each(captcha, function(i, n) {
                form.find(':input[name="' + i + '"]').clearFields();
                form.find('img.wpcf7-captcha-' + i).attr('src', n);
                var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
                form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
            });
        });
    };
    $.fn.wpcf7RefillQuiz = function(quiz) {
        return this.each(function() {
            var form = $(this);
            $.each(quiz, function(i, n) {
                form.find(':input[name="' + i + '"]').clearFields();
                form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
                form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
            });
        });
    };
    $.fn.wpcf7ClearResponseOutput = function() {
        return this.each(function() {
            $(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
            $(this).find('span.wpcf7-not-valid-tip').remove();
            $(this).find('img.ajax-loader').css({
                visibility: 'hidden'
            });
        });
    };
    $.fn.wpcf7Recaptcha = function() {
        return this.each(function() {
            var events = 'wpcf7:spam wpcf7:mailsent wpcf7:mailfailed';
            $(this).closest('div.wpcf7').on(events, function(e) {
                if (recaptchaWidgets && grecaptcha) {
                    $.each(recaptchaWidgets, function(index, value) {
                        grecaptcha.reset(value);
                    });
                }
            });
        });
    };
    $.wpcf7UpdateScreenReaderResponse = function($form, data) {
        $('.wpcf7 .screen-reader-response').html('').attr('role', '');
        if (data.message) {
            var $response = $form.siblings('.screen-reader-response').first();
            $response.append(data.message);
            if (data.invalids) {
                var $invalids = $('<ul></ul>');
                $.each(data.invalids, function(i, n) {
                    if (n.idref) {
                        var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
                    } else {
                        var $li = $('<li></li>').append(n.message);
                    }
                    $invalids.append($li);
                });
                $response.append($invalids);
            }
            $response.attr('role', 'alert').focus();
        }
    };
    $.wpcf7SupportHtml5 = function() {
        var features = {};
        var input = document.createElement('input');
        features.placeholder = 'placeholder' in input;
        var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];
        $.each(inputTypes, function(index, value) {
            input.setAttribute('type', value);
            features[value] = input.type !== 'text';
        });
        return features;
    };
    $(function() {
        _wpcf7.supportHtml5 = $.wpcf7SupportHtml5();
        $('div.wpcf7 > form').wpcf7InitForm();
    });
})(jQuery);;
jQuery(document).ready(function($) {
    function confirm_subscription(form) {
        var confirm_type = form.data('x-email-confirm');
        if (confirm_type === 'Message') {
            make_alert(form.data('x-email-message'), 'x-alert-success').appendTo(form);
        }
        if (confirm_type === 'Redirect') {
            window.location.href = form.data('x-email-redirect');
        }
    }

    function make_alert(content, class_name) {
        return $('<div class="x-subscribe-form-alert-wrap">' + '<div class="x-alert ' + (class_name || 'x-alert-danger') + ' fade in man">' + '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            content + '</div>' + '</div>').alert();
    }
    $('.x-subscribe-form').submit(function(e) {
        e.preventDefault();
        $form = $(this);
        $form.find('input[type="submit"]').prop('disabled', true).addClass('btn-muted');
        postdata = {
            action: 'x_subscribe',
            data: {
                form_id: $(this).find('input[name="x_subscribe_form[id]"]').val() || '',
                first_name: $(this).find('input[name="x_subscribe_form[first-name]"]').val() || '',
                last_name: $(this).find('input[name="x_subscribe_form[last-name]"]').val() || '',
                full_name: $(this).find('input[name="x_subscribe_form[full-name]"]').val() || '',
                email_address: $(this).find('input[name="x_subscribe_form[email]"]').val() || '',
            }
        };
        $.post(x_email_forms.ajaxurl, postdata, function(response) {
            data = $.parseJSON(response);
            if (data.error) {
                console.log(data.log_message);
                make_alert(data.message).appendTo($form);
            } else {
                console.log('subscribed');
                confirm_subscription($form);
            }
        });
    });
});;
! function(t) {
    t.fn.hoverIntent = function(e, i, s) {
        var o = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        o = "object" == typeof e ? t.extend(o, e) : t.isFunction(i) ? t.extend(o, {
            over: e,
            out: i,
            selector: s
        }) : t.extend(o, {
            over: e,
            out: e,
            selector: i
        });
        var n, r, a, l, h = function(t) {
                n = t.pageX, r = t.pageY
            },
            c = function(e, i) {
                return i.hoverIntent_t = clearTimeout(i.hoverIntent_t), Math.sqrt((a - n) * (a - n) + (l - r) * (l - r)) < o.sensitivity ? (t(i).off("mousemove.hoverIntent", h), i.hoverIntent_s = !0, o.over.apply(i, [e])) : (a = n, l = r, i.hoverIntent_t = setTimeout(function() {
                    c(e, i)
                }, o.interval), void 0)
            },
            u = function(t, e) {
                return e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = !1, o.out.apply(e, [t])
            },
            d = function(e) {
                var i = t.extend({}, e),
                    s = this;
                s.hoverIntent_t && (s.hoverIntent_t = clearTimeout(s.hoverIntent_t)), "mouseenter" === e.type ? (a = i.pageX, l = i.pageY, t(s).on("mousemove.hoverIntent", h), s.hoverIntent_s || (s.hoverIntent_t = setTimeout(function() {
                    c(i, s)
                }, o.interval))) : (t(s).off("mousemove.hoverIntent", h), s.hoverIntent_s && (s.hoverIntent_t = setTimeout(function() {
                    u(i, s)
                }, o.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": d,
            "mouseleave.hoverIntent": d
        }, o.selector)
    }
}(jQuery),
function(t, e, i) {
    "use strict";
    var s, o = t.document,
        n = o.documentElement,
        r = t.Modernizr,
        a = function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        l = "Moz Webkit O Ms".split(" "),
        h = function(t) {
            var e, i = n.style;
            if ("string" == typeof i[t]) return t;
            t = a(t);
            for (var s = 0, o = l.length; o > s; s++)
                if (e = l[s] + t, "string" == typeof i[e]) return e
        },
        c = h("transform"),
        u = h("transitionProperty"),
        d = {
            csstransforms: function() {
                return !!c
            },
            csstransforms3d: function() {
                var t = !!h("perspective");
                if (t && "webkitPerspective" in n.style) {
                    var i = e("<style>@media (transform-3d),(-webkit-transform-3d){#modernizr{height:3px}}</style>").appendTo("head"),
                        s = e('<div id="modernizr" />').appendTo("html");
                    t = 3 === s.height(), s.remove(), i.remove()
                }
                return t
            },
            csstransitions: function() {
                return !!u
            }
        };
    if (r)
        for (s in d) r.hasOwnProperty(s) || r.addTest(s, d[s]);
    else {
        r = t.Modernizr = {
            _version: "1.6ish: miniModernizr for Isotope"
        };
        var f, p = " ";
        for (s in d) f = d[s](), r[s] = f, p += " " + (f ? "" : "no-") + s;
        e("html").addClass(p)
    }
    if (r.csstransforms) {
        var m = r.csstransforms3d ? {
                translate: function(t) {
                    return "translate3d(" + t[0] + "px, " + t[1] + "px, 0) "
                },
                scale: function(t) {
                    return "scale3d(" + t + ", " + t + ", 1) "
                }
            } : {
                translate: function(t) {
                    return "translate(" + t[0] + "px, " + t[1] + "px) "
                },
                scale: function(t) {
                    return "scale(" + t + ") "
                }
            },
            v = function(t, i, s) {
                var o, n, r = e.data(t, "isoTransform") || {},
                    a = {},
                    l = {};
                a[i] = s, e.extend(r, a);
                for (o in r) n = r[o], l[o] = m[o](n);
                var h = l.translate || "",
                    u = l.scale || "",
                    d = h + u;
                e.data(t, "isoTransform", r), t.style[c] = d
            };
        e.cssNumber.scale = !0, e.cssHooks.scale = {
            set: function(t, e) {
                v(t, "scale", e)
            },
            get: function(t, i) {
                var s = e.data(t, "isoTransform");
                return s && s.scale ? s.scale : 1
            }
        }, e.fx.step.scale = function(t) {
            e.cssHooks.scale.set(t.elem, t.now + t.unit)
        }, e.cssNumber.translate = !0, e.cssHooks.translate = {
            set: function(t, e) {
                v(t, "translate", e)
            },
            get: function(t, i) {
                var s = e.data(t, "isoTransform");
                return s && s.translate ? s.translate : [0, 0]
            }
        }
    }
    var y, g;
    r.csstransitions && (y = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    }[u], g = h("transitionDuration"));
    var _, w = e.event,
        C = "dispatch";
    w.special.smartresize = {
        setup: function() {
            e(this).bind("resize", w.special.smartresize.handler)
        },
        teardown: function() {
            e(this).unbind("resize", w.special.smartresize.handler)
        },
        handler: function(t, e) {
            var i = this,
                s = arguments;
            t.type = "smartresize", _ && clearTimeout(_), _ = setTimeout(function() {
                w[C].apply(i, s)
            }, "execAsap" === e ? 0 : 100)
        }
    }, e.fn.smartresize = function(t) {
        return t ? this.bind("smartresize", t) : this.trigger("smartresize", ["execAsap"])
    }, e.Isotope = function(t, i, s) {
        this.element = e(i), this._create(t), this._init(s)
    };
    var x = ["width", "height"],
        b = e(t);
    e.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: .001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: "relative",
            overflow: "hidden"
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, e.Isotope.prototype = {
        _create: function(t) {
            this.options = e.extend({}, e.Isotope.settings, t), this.styleQueue = [], this.elemCount = 0;
            var i = this.element[0].style;
            this.originalStyle = {};
            var s = x.slice(0);
            for (var o in this.options.containerStyle) s.push(o);
            for (var n = 0, r = s.length; r > n; n++) o = s[n], this.originalStyle[o] = i[o] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var a = {
                "original-order": function(t, e) {
                    return e.elemCount++, e.elemCount
                },
                random: function() {
                    return Math.random()
                }
            };
            this.options.getSortData = e.extend(this.options.getSortData, a), this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var l = this;
            setTimeout(function() {
                l.element.addClass(l.options.containerClass)
            }, 0), this.options.resizable && b.bind("smartresize.isotope", function() {
                l.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1
            })
        },
        _getAtoms: function(t) {
            var e = this.options.itemSelector,
                i = e ? t.filter(e).add(t.find(e)) : t,
                s = {
                    position: "absolute"
                };
            return i = i.filter(function(t, e) {
                return 1 === e.nodeType
            }), this.usingTransforms && (s.left = 0, s.top = 0), i.css(s).addClass(this.options.itemClass), this.updateSortData(i, !0), i
        },
        _init: function(t) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(t)
        },
        option: function(t) {
            if (e.isPlainObject(t)) {
                this.options = e.extend(!0, this.options, t);
                var i;
                for (var s in t) i = "_update" + a(s), this[i] && this[i]()
            }
        },
        _updateAnimationEngine: function() {
            var t, e = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
            switch (e) {
                case "css":
                case "none":
                    t = !1;
                    break;
                case "jquery":
                    t = !0;
                    break;
                default:
                    t = !r.csstransitions
            }
            this.isUsingJQueryAnimation = t, this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function() {
            var t = this.usingTransforms = this.options.transformsEnabled && r.csstransforms && r.csstransitions && !this.isUsingJQueryAnimation;
            t || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = t ? this._translate : this._positionAbs
        },
        _filter: function(t) {
            var e = "" === this.options.filter ? "*" : this.options.filter;
            if (!e) return t;
            var i = this.options.hiddenClass,
                s = "." + i,
                o = t.filter(s),
                n = o;
            if ("*" !== e) {
                n = o.filter(e);
                var r = t.not(s).not(e).addClass(i);
                this.styleQueue.push({
                    $el: r,
                    style: this.options.hiddenStyle
                })
            }
            return this.styleQueue.push({
                $el: n,
                style: this.options.visibleStyle
            }), n.removeClass(i), t.filter(e)
        },
        updateSortData: function(t, i) {
            var s, o, n = this,
                r = this.options.getSortData;
            t.each(function() {
                s = e(this), o = {};
                for (var t in r) i || "original-order" !== t ? o[t] = r[t](s, n) : o[t] = e.data(this, "isotope-sort-data")[t];
                e.data(this, "isotope-sort-data", o)
            })
        },
        _sort: function() {
            var t = this.options.sortBy,
                e = this._getSorter,
                i = this.options.sortAscending ? 1 : -1,
                s = function(s, o) {
                    var n = e(s, t),
                        r = e(o, t);
                    return n === r && "original-order" !== t && (n = e(s, "original-order"), r = e(o, "original-order")), (n > r ? 1 : r > n ? -1 : 0) * i
                };
            this.$filteredAtoms.sort(s)
        },
        _getSorter: function(t, i) {
            return e.data(t, "isotope-sort-data")[i]
        },
        _translate: function(t, e) {
            return {
                translate: [t, e]
            }
        },
        _positionAbs: function(t, e) {
            return {
                left: t,
                top: e
            }
        },
        _pushPosition: function(t, e, i) {
            e = Math.round(e + this.offset.left), i = Math.round(i + this.offset.top);
            var s = this.getPositionStyles(e, i);
            this.styleQueue.push({
                $el: t,
                style: s
            }), this.options.itemPositionDataEnabled && t.data("isotope-item-position", {
                x: e,
                y: i
            })
        },
        layout: function(t, e) {
            var i = this.options.layoutMode;
            if (this["_" + i + "Layout"](t), this.options.resizesContainer) {
                var s = this["_" + i + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: s
                })
            }
            this._processStyleQueue(t, e), this.isLaidOut = !0
        },
        _processStyleQueue: function(t, i) {
            var s, o, n, a, l = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css",
                h = this.options.animationOptions,
                c = this.options.onLayout;
            if (o = function(t, e) {
                    e.$el[l](e.style, h)
                }, this._isInserting && this.isUsingJQueryAnimation) o = function(t, e) {
                s = e.$el.hasClass("no-transition") ? "css" : l, e.$el[s](e.style, h)
            };
            else if (i || c || h.complete) {
                var u = !1,
                    d = [i, c, h.complete],
                    f = this;
                if (n = !0, a = function() {
                        if (!u) {
                            for (var e, i = 0, s = d.length; s > i; i++) e = d[i], "function" == typeof e && e.call(f.element, t, f);
                            u = !0
                        }
                    }, this.isUsingJQueryAnimation && "animate" === l) h.complete = a, n = !1;
                else if (r.csstransitions) {
                    for (var p, m = 0, v = this.styleQueue[0], _ = v && v.$el; !_ || !_.length;) {
                        if (p = this.styleQueue[m++], !p) return;
                        _ = p.$el
                    }
                    var w = parseFloat(getComputedStyle(_[0])[g]);
                    w > 0 && (o = function(t, e) {
                        e.$el[l](e.style, h).one(y, a)
                    }, n = !1)
                }
            }
            e.each(this.styleQueue, o), n && a(), this.styleQueue = []
        },
        resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },
        reLayout: function(t) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, t)
        },
        addItems: function(t, e) {
            var i = this._getAtoms(t);
            this.$allAtoms = this.$allAtoms.add(i), e && e(i)
        },
        insert: function(t, e) {
            this.element.append(t);
            var i = this;
            this.addItems(t, function(t) {
                var s = i._filter(t);
                i._addHideAppended(s), i._sort(), i.reLayout(), i._revealAppended(s, e)
            })
        },
        appended: function(t, e) {
            var i = this;
            this.addItems(t, function(t) {
                i._addHideAppended(t), i.layout(t), i._revealAppended(t, e)
            })
        },
        _addHideAppended: function(t) {
            this.$filteredAtoms = this.$filteredAtoms.add(t), t.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: t,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function(t, e) {
            var i = this;
            setTimeout(function() {
                t.removeClass("no-transition"), i.styleQueue.push({
                    $el: t,
                    style: i.options.visibleStyle
                }), i._isInserting = !1, i._processStyleQueue(t, e)
            }, 10)
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function(t, e) {
            this.$allAtoms = this.$allAtoms.not(t), this.$filteredAtoms = this.$filteredAtoms.not(t);
            var i = this,
                s = function() {
                    t.remove(), e && e.call(i.element)
                };
            t.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: t,
                style: this.options.hiddenStyle
            }), this._sort(), this.reLayout(s)) : s()
        },
        shuffle: function(t) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(t)
        },
        destroy: function() {
            var t = this.usingTransforms,
                e = this.options;
            this.$allAtoms.removeClass(e.hiddenClass + " " + e.itemClass).each(function() {
                var e = this.style;
                e.position = "", e.top = "", e.left = "", e.opacity = "", t && (e[c] = "")
            });
            var i = this.element[0].style;
            for (var s in this.originalStyle) i[s] = this.originalStyle[s];
            this.element.unbind(".isotope").undelegate("." + e.hiddenClass, "click").removeClass(e.containerClass).removeData("isotope"), b.unbind(".isotope")
        },
        _getSegments: function(t) {
            var e, i = this.options.layoutMode,
                s = t ? "rowHeight" : "columnWidth",
                o = t ? "height" : "width",
                n = t ? "rows" : "cols",
                r = this.element[o](),
                l = this.options[i] && this.options[i][s] || this.$filteredAtoms["outer" + a(o)](!0) || r;
            e = Math.floor(r / l), e = Math.max(e, 1), this[i][n] = e, this[i][s] = l
        },
        _checkIfSegmentsChanged: function(t) {
            var e = this.options.layoutMode,
                i = t ? "rows" : "cols",
                s = this[e][i];
            return this._getSegments(t), this[e][i] !== s
        },
        _masonryReset: function() {
            this.masonry = {}, this._getSegments();
            var t = this.masonry.cols;
            for (this.masonry.colYs = []; t--;) this.masonry.colYs.push(0)
        },
        _masonryLayout: function(t) {
            var i = this,
                s = i.masonry;
            t.each(function() {
                var t = e(this),
                    o = Math.ceil(t.outerWidth(!0) / s.columnWidth);
                if (o = Math.min(o, s.cols), 1 === o) i._masonryPlaceBrick(t, s.colYs);
                else {
                    var n, r, a = s.cols + 1 - o,
                        l = [];
                    for (r = 0; a > r; r++) n = s.colYs.slice(r, r + o), l[r] = Math.max.apply(Math, n);
                    i._masonryPlaceBrick(t, l)
                }
            })
        },
        _masonryPlaceBrick: function(t, e) {
            for (var i = Math.min.apply(Math, e), s = 0, o = 0, n = e.length; n > o; o++)
                if (e[o] === i) {
                    s = o;
                    break
                }
            var r = this.masonry.columnWidth * s,
                a = i;
            this._pushPosition(t, r, a);
            var l = i + t.outerHeight(!0),
                h = this.masonry.cols + 1 - n;
            for (o = 0; h > o; o++) this.masonry.colYs[s + o] = l
        },
        _masonryGetContainerSize: function() {
            var t = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: t
            }
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            }
        },
        _fitRowsLayout: function(t) {
            var i = this,
                s = this.element.width(),
                o = this.fitRows;
            t.each(function() {
                var t = e(this),
                    n = t.outerWidth(!0),
                    r = t.outerHeight(!0);
                0 !== o.x && n + o.x > s && (o.x = 0, o.y = o.height), i._pushPosition(t, o.x, o.y), o.height = Math.max(o.y + r, o.height), o.x += n
            })
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function() {
            return !0
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByRowLayout: function(t) {
            var i = this,
                s = this.cellsByRow;
            t.each(function() {
                var t = e(this),
                    o = s.index % s.cols,
                    n = Math.floor(s.index / s.cols),
                    r = (o + .5) * s.columnWidth - t.outerWidth(!0) / 2,
                    a = (n + .5) * s.rowHeight - t.outerHeight(!0) / 2;
                i._pushPosition(t, r, a), s.index++
            })
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            }
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            }
        },
        _straightDownLayout: function(t) {
            var i = this;
            t.each(function(t) {
                var s = e(this);
                i._pushPosition(s, 0, i.straightDown.y), i.straightDown.y += s.outerHeight(!0)
            })
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function() {
            return !0
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var t = this.masonryHorizontal.rows;
            for (this.masonryHorizontal.rowXs = []; t--;) this.masonryHorizontal.rowXs.push(0)
        },
        _masonryHorizontalLayout: function(t) {
            var i = this,
                s = i.masonryHorizontal;
            t.each(function() {
                var t = e(this),
                    o = Math.ceil(t.outerHeight(!0) / s.rowHeight);
                if (o = Math.min(o, s.rows), 1 === o) i._masonryHorizontalPlaceBrick(t, s.rowXs);
                else {
                    var n, r, a = s.rows + 1 - o,
                        l = [];
                    for (r = 0; a > r; r++) n = s.rowXs.slice(r, r + o), l[r] = Math.max.apply(Math, n);
                    i._masonryHorizontalPlaceBrick(t, l)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function(t, e) {
            for (var i = Math.min.apply(Math, e), s = 0, o = 0, n = e.length; n > o; o++)
                if (e[o] === i) {
                    s = o;
                    break
                }
            var r = i,
                a = this.masonryHorizontal.rowHeight * s;
            this._pushPosition(t, r, a);
            var l = i + t.outerWidth(!0),
                h = this.masonryHorizontal.rows + 1 - n;
            for (o = 0; h > o; o++) this.masonryHorizontal.rowXs[s + o] = l
        },
        _masonryHorizontalGetContainerSize: function() {
            var t = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: t
            }
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function(t) {
            var i = this,
                s = this.element.height(),
                o = this.fitColumns;
            t.each(function() {
                var t = e(this),
                    n = t.outerWidth(!0),
                    r = t.outerHeight(!0);
                0 !== o.y && r + o.y > s && (o.x = o.width, o.y = 0), i._pushPosition(t, o.x, o.y), o.width = Math.max(o.x + n, o.width), o.y += r
            })
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function() {
            return !0
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByColumnLayout: function(t) {
            var i = this,
                s = this.cellsByColumn;
            t.each(function() {
                var t = e(this),
                    o = Math.floor(s.index / s.rows),
                    n = s.index % s.rows,
                    r = (o + .5) * s.columnWidth - t.outerWidth(!0) / 2,
                    a = (n + .5) * s.rowHeight - t.outerHeight(!0) / 2;
                i._pushPosition(t, r, a), s.index++
            })
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function(t) {
            var i = this;
            t.each(function(t) {
                var s = e(this);
                i._pushPosition(s, i.straightAcross.x, 0), i.straightAcross.x += s.outerWidth(!0)
            })
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function() {
            return !0
        }
    }, e.fn.imagesLoaded = function(t) {
        function i() {
            t.call(o, n)
        }

        function s(t) {
            var o = t.target;
            o.src !== a && -1 === e.inArray(o, l) && (l.push(o), --r <= 0 && (setTimeout(i), n.unbind(".imagesLoaded", s)))
        }
        var o = this,
            n = o.find("img").add(o.filter("img")),
            r = n.length,
            a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            l = [];
        return r || i(), n.bind("load.imagesLoaded error.imagesLoaded", s).each(function() {
            var t = this.src;
            this.src = a, this.src = t
        }), o
    };
    var A = function(e) {
        t.console && t.console.error(e)
    };
    e.fn.isotope = function(t, i) {
        if ("string" == typeof t) {
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var i = e.data(this, "isotope");
                return i ? e.isFunction(i[t]) && "_" !== t.charAt(0) ? void i[t].apply(i, s) : void A("no such method '" + t + "' for isotope instance") : void A("cannot call methods on isotope prior to initialization; attempted to call method '" + t + "'")
            })
        } else this.each(function() {
            var s = e.data(this, "isotope");
            s ? (s.option(t), s._init(i)) : e.data(this, "isotope", new e.Isotope(t, this, i))
        });
        return this
    }
}(window, jQuery),
function(t, e, i) {
    function s(t) {
        var e = {},
            s = /^jQuery\d+$/;
        return i.each(t.attributes, function(t, i) {
            i.specified && !s.test(i.name) && (e[i.name] = i.value)
        }), e
    }

    function o(t, e) {
        var s = this,
            o = i(s);
        if (s.value == o.attr("placeholder") && o.hasClass("placeholder"))
            if (o.data("placeholder-password")) {
                if (o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id")), t === !0) return o[0].value = e;
                o.focus()
            } else s.value = "", o.removeClass("placeholder"), s == r() && s.select()
    }

    function n() {
        var t, e = this,
            n = i(e),
            r = this.id;
        if ("" == e.value) {
            if ("password" == e.type) {
                if (!n.data("placeholder-textinput")) {
                    try {
                        t = n.clone().attr({
                            type: "text"
                        })
                    } catch (a) {
                        t = i("<input>").attr(i.extend(s(this), {
                            type: "text"
                        }))
                    }
                    t.removeAttr("name").data({
                        "placeholder-password": n,
                        "placeholder-id": r
                    }).bind("focus.placeholder", o), n.data({
                        "placeholder-textinput": t,
                        "placeholder-id": r
                    }).before(t)
                }
                n = n.removeAttr("id").hide().prev().attr("id", r).show()
            }
            n.addClass("placeholder"), n[0].value = n.attr("placeholder")
        } else n.removeClass("placeholder")
    }

    function r() {
        try {
            return e.activeElement
        } catch (t) {}
    }
    var a, l, h = "[object OperaMini]" == Object.prototype.toString.call(t.operamini),
        c = "placeholder" in e.createElement("input") && !h,
        u = "placeholder" in e.createElement("textarea") && !h,
        d = i.fn,
        f = i.valHooks,
        p = i.propHooks;
    c && u ? (l = d.placeholder = function() {
        return this
    }, l.input = l.textarea = !0) : (l = d.placeholder = function() {
        var t = this;
        return t.filter((c ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": o,
            "blur.placeholder": n
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), t
    }, l.input = c, l.textarea = u, a = {
        get: function(t) {
            var e = i(t),
                s = e.data("placeholder-password");
            return s ? s[0].value : e.data("placeholder-enabled") && e.hasClass("placeholder") ? "" : t.value
        },
        set: function(t, e) {
            var s = i(t),
                a = s.data("placeholder-password");
            return a ? a[0].value = e : s.data("placeholder-enabled") ? ("" == e ? (t.value = e, t != r() && n.call(t)) : s.hasClass("placeholder") ? o.call(t, !0, e) || (t.value = e) : t.value = e, s) : t.value = e
        }
    }, c || (f.input = a, p.value = a), u || (f.textarea = a, p.value = a), i(function() {
        i(e).delegate("form", "submit.placeholder", function() {
            var t = i(".placeholder", this).each(o);
            setTimeout(function() {
                t.each(n)
            }, 10)
        })
    }), i(t).bind("beforeunload.placeholder", function() {
        i(".placeholder").each(function() {
            this.value = ""
        })
    }))
}(this, document, jQuery), jQuery(document).ready(function(t) {
    t("input, textarea").placeholder()
}), + function(t) {
    "use strict";

    function e(i, s) {
        var o, n = t.proxy(this.process, this);
        this.$element = t(t(i).is("body") ? window : i), this.$body = t("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", n), this.options = t.extend({}, e.DEFAULTS, s), this.selector = (this.options.target || (o = t(i).attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "") || "") + " .x-nav li > a", this.offsets = t([]), this.targets = t([]), this.activeTarget = null, this.refresh(), this.process()
    }
    e.DEFAULTS = {
        offset: 10
    }, e.prototype.refresh = function() {
        var e = this.$element[0] == window ? "offset" : "position";
        this.offsets = t([]), this.targets = t([]);
        var i = this;
        this.$body.find(this.selector).map(function() {
            var s = t(this),
                o = s.data("target") || s.attr("href"),
                n = /^#\w/.test(o) && t(o);
            return n && n.length && [
                [n[e]().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), o]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            i.offsets.push(this[0]), i.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            s = i - this.$scrollElement.height(),
            o = this.offsets,
            n = this.targets,
            r = this.activeTarget;
        if (e >= s) return r != (t = n.last()[0]) && this.activate(t);
        for (t = o.length; t--;) r != n[t] && e >= o[t] && (!o[t + 1] || e <= o[t + 1]) && this.activate(n[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, t(this.selector).parents(".current-menu-item").removeClass("current-menu-item");
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            s = t(i).parents("li").addClass("current-menu-item");
        s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("current-menu-item")), s.trigger("activate.bs.scrollspy")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function(i) {
        return this.each(function() {
            var s = t(this),
                o = s.data("bs.scrollspy"),
                n = "object" == typeof i && i;
            o || s.data("bs.scrollspy", o = new e(this, n)), "string" == typeof i && o[i]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(jQuery), jQuery(document).ready(function(t) {
    function e(e, i, s) {
        t("html, body").animate({
            scrollTop: t(e).offset().top - o - n + 1
        }, i, s)
    }
    var i = t("body"),
        s = i.outerHeight(),
        o = t("#wpadminbar").outerHeight(),
        n = t(".x-navbar-fixed-top-active .x-navbar").outerHeight(),
        r = location.href,
        a = r.indexOf("#"),
        l = r.substr(a);
    if (t(window).load(function() {
            -1 !== a && t(l).length && e(l, 1, "linear")
        }), t('a[href*="#"]').on("touchstart click", function(i) {
            if (href = t(this).attr("href"), notComments = -1 === href.indexOf("#comments"), "#" !== href && notComments) {
                var s = href.split("#").pop(),
                    o = t("#" + s);
                o.length > 0 && (i.preventDefault(), e(o, 850, "easeInOutExpo"))
            }
        }), i.hasClass("x-one-page-navigation-active")) {
        i.scrollspy({
            target: ".x-nav-wrap.desktop",
            offset: o + n
        }), t(window).resize(function() {
            i.scrollspy("refresh")
        });
        var h = 0,
            c = setInterval(function() {
                h += 1;
                var t = i.outerHeight();
                t !== s && i.scrollspy("refresh"), 10 === h && clearInterval(c)
            }, 500)
    }
}), jQuery(function(t) {
    t(".x-slider-container.above .x-slider-scroll-bottom").on("touchstart click", function(e) {
        e.preventDefault(), t("html, body").animate({
            scrollTop: t(".x-slider-container.above").outerHeight()
        }, 850, "easeInOutExpo")
    }), t(".x-slider-container.below .x-slider-scroll-bottom").on("touchstart click", function(e) {
        e.preventDefault();
        var i = t(".masthead").outerHeight(),
            s = t(".x-navbar-fixed-top-active .x-navbar").outerHeight(),
            o = t(".x-slider-container.above").outerHeight(),
            n = t(".x-slider-container.below").outerHeight(),
            r = i + o + n - s;
        t("html, body").animate({
            scrollTop: r
        }, 850, "easeInOutExpo")
    })
}), jQuery(document).ready(function(t) {
    function e(t) {
        n.hasClass("selected") ? n.find("a.active").nextAll("a").removeClass("x-active") : r.removeClass("x-active")
    }

    function i(e) {
        t(this).nextAll("a").removeClass("x-active")
    }

    function s(i) {
        e(), t(this).addClass("x-active").prevAll("a").addClass("x-active")
    }
    var o = t(".x-cart-notification");
    o.length > 0 && (t(".add_to_cart_button.product_type_simple").on("click", function(t) {
        o.addClass("bring-forward appear loading")
    }), t("body").on("added_to_cart", function(t, e, i) {
        setTimeout(function() {
            o.removeClass("loading").addClass("added"), setTimeout(function() {
                o.removeClass("appear"), setTimeout(function() {
                    o.removeClass("added bring-forward")
                }, 650)
            }, 1e3)
        }, 650)
    }));
    var n = t("p.stars"),
        r = n.find("a");
    n.on("mouseleave", e), r.on("click", i), r.on("mouseover", s)
});;
window.csModernizr = window.csModernizr || {},
    function(t) {
        t.fn.csFitText = function(e, n) {
            var i = e || 1,
                a = t.extend({
                    minFontSize: Number.NEGATIVE_INFINITY,
                    maxFontSize: Number.POSITIVE_INFINITY
                }, n);
            return this.each(function() {
                var e = t(this),
                    n = function() {
                        e.css("font-size", Math.max(Math.min(e.width() / (10 * i), parseFloat(a.maxFontSize)), parseFloat(a.minFontSize)))
                    };
                n(), t(window).on("resize.fittext orientationchange.fittext", n), t(window).on("fittextReset", function() {
                    t(window).off("resize.fittext orientationchange.fittext", n), e.css("font-size", "")
                })
            })
        }
    }(jQuery),
    function(t, e, n) {
        "use strict";
        t.fn.backstretch = function(i, o) {
            return (i === n || 0 === i.length) && t.error("No images were supplied for Backstretch"), 0 === t(e).scrollTop() && e.scrollTo(0, 0), this.each(function() {
                var e = t(this),
                    n = e.data("backstretch");
                if (n) {
                    if ("string" == typeof i && "function" == typeof n[i]) return void n[i](o);
                    o = t.extend(n.options, o), n.destroy(!0)
                }
                n = new a(this, i, o), e.data("backstretch", n)
            })
        }, t.backstretch = function(e, n) {
            return t("body").backstretch(e, n).data("backstretch")
        }, t.expr[":"].backstretch = function(e) {
            return t(e).data("backstretch") !== n
        }, t.fn.backstretch.defaults = {
            centeredX: !0,
            centeredY: !0,
            duration: 5e3,
            fade: 0
        };
        var i = {
                wrap: {
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    margin: 0,
                    padding: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: -999999
                },
                img: {
                    position: "absolute",
                    display: "none",
                    margin: 0,
                    padding: 0,
                    border: "none",
                    width: "auto",
                    height: "auto",
                    maxHeight: "none",
                    maxWidth: "none",
                    zIndex: -999999
                }
            },
            a = function(n, a, s) {
                this.options = t.extend({}, t.fn.backstretch.defaults, s || {}), this.images = t.isArray(a) ? a : [a], t.each(this.images, function() {
                    t("<img />")[0].src = this
                }), this.isBody = n === document.body, this.$container = t(n), this.$root = this.isBody ? t(o ? e : document) : this.$container;
                var r = this.$container.children(".backstretch").first();
                if (this.$wrap = r.length ? r : t('<div class="backstretch"></div>').css(i.wrap).appendTo(this.$container), !this.isBody) {
                    var l = this.$container.css("position"),
                        c = this.$container.css("zIndex");
                    this.$container.css({
                        position: "static" === l ? "relative" : l,
                        zIndex: "auto" === c ? 0 : c,
                        background: "none"
                    }), this.$wrap.css({
                        zIndex: -999998
                    })
                }
                this.$wrap.css({
                    position: this.isBody && o ? "fixed" : "absolute"
                }), this.index = 0, this.show(this.index), t(e).on("resize.backstretch", t.proxy(this.resize, this)).on("orientationchange.backstretch", t.proxy(function() {
                    this.isBody && 0 === e.pageYOffset && (e.scrollTo(0, 1), this.resize())
                }, this))
            };
        a.prototype = {
            resize: function() {
                try {
                    var t, n = {
                            left: 0,
                            top: 0
                        },
                        i = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                        a = i,
                        o = this.isBody ? e.innerHeight ? e.innerHeight : this.$root.height() : this.$root.innerHeight(),
                        s = a / this.$img.data("ratio");
                    s >= o ? (t = (s - o) / 2, this.options.centeredY && (n.top = "-" + t + "px")) : (s = o, a = s * this.$img.data("ratio"), t = (a - i) / 2, this.options.centeredX && (n.left = "-" + t + "px")), this.$wrap.css({
                        width: i,
                        height: o
                    }).find("img:not(.deleteable)").css({
                        width: a,
                        height: s
                    }).css(n)
                } catch (r) {}
                return this
            },
            show: function(e) {
                if (!(Math.abs(e) > this.images.length - 1)) {
                    var n = this,
                        a = n.$wrap.find("img").addClass("deleteable"),
                        o = {
                            relatedTarget: n.$container[0]
                        };
                    return n.$container.trigger(t.Event("backstretch.before", o), [n, e]), this.index = e, clearInterval(n.interval), n.$img = t("<img />").css(i.img).bind("load", function(i) {
                        var s = this.width || t(i.target).width(),
                            r = this.height || t(i.target).height();
                        t(this).data("ratio", s / r), t(this).fadeIn(n.options.speed || n.options.fade, function() {
                            a.remove(), n.paused || n.cycle(), t(["after", "show"]).each(function() {
                                n.$container.trigger(t.Event("backstretch." + this, o), [n, e])
                            })
                        }), n.resize()
                    }).appendTo(n.$wrap), n.$img.attr("src", n.images[e]), n
                }
            },
            next: function() {
                return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
            },
            prev: function() {
                return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
            },
            pause: function() {
                return this.paused = !0, this
            },
            resume: function() {
                return this.paused = !1, this.next(), this
            },
            cycle: function() {
                return this.images.length > 1 && (clearInterval(this.interval), this.interval = setInterval(t.proxy(function() {
                    this.paused || this.next()
                }, this), this.options.duration)), this
            },
            destroy: function(n) {
                t(e).off("resize.backstretch orientationchange.backstretch"), clearInterval(this.interval), n || this.$wrap.remove(), this.$container.removeData("backstretch")
            }
        };
        var o = function() {
            var t = navigator.userAgent,
                n = navigator.platform,
                i = t.match(/AppleWebKit\/([0-9]+)/),
                a = !!i && i[1],
                o = t.match(/Fennec\/([0-9]+)/),
                s = !!o && o[1],
                r = t.match(/Opera Mobi\/([0-9]+)/),
                l = !!r && r[1],
                c = t.match(/MSIE ([0-9]+)/),
                u = !!c && c[1];
            return !((n.indexOf("iPhone") > -1 || n.indexOf("iPad") > -1 || n.indexOf("iPod") > -1) && a && 534 > a || e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini) || r && 7458 > l || t.indexOf("Android") > -1 && a && 533 > a || s && 6 > s || "palmGetResource" in e && a && 534 > a || t.indexOf("MeeGo") > -1 && t.indexOf("NokiaBrowser/8.5.0") > -1 || u && 6 >= u)
        }()
    }(jQuery, window), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(t, e, n, i, a) {
            return jQuery.easing[jQuery.easing.def](t, e, n, i, a)
        },
        easeInQuad: function(t, e, n, i, a) {
            return i * (e /= a) * e + n
        },
        easeOutQuad: function(t, e, n, i, a) {
            return -i * (e /= a) * (e - 2) + n
        },
        easeInOutQuad: function(t, e, n, i, a) {
            return (e /= a / 2) < 1 ? i / 2 * e * e + n : -i / 2 * (--e * (e - 2) - 1) + n
        },
        easeInCubic: function(t, e, n, i, a) {
            return i * (e /= a) * e * e + n
        },
        easeOutCubic: function(t, e, n, i, a) {
            return i * ((e = e / a - 1) * e * e + 1) + n
        },
        easeInOutCubic: function(t, e, n, i, a) {
            return (e /= a / 2) < 1 ? i / 2 * e * e * e + n : i / 2 * ((e -= 2) * e * e + 2) + n
        },
        easeInQuart: function(t, e, n, i, a) {
            return i * (e /= a) * e * e * e + n
        },
        easeOutQuart: function(t, e, n, i, a) {
            return -i * ((e = e / a - 1) * e * e * e - 1) + n
        },
        easeInOutQuart: function(t, e, n, i, a) {
            return (e /= a / 2) < 1 ? i / 2 * e * e * e * e + n : -i / 2 * ((e -= 2) * e * e * e - 2) + n
        },
        easeInQuint: function(t, e, n, i, a) {
            return i * (e /= a) * e * e * e * e + n
        },
        easeOutQuint: function(t, e, n, i, a) {
            return i * ((e = e / a - 1) * e * e * e * e + 1) + n
        },
        easeInOutQuint: function(t, e, n, i, a) {
            return (e /= a / 2) < 1 ? i / 2 * e * e * e * e * e + n : i / 2 * ((e -= 2) * e * e * e * e + 2) + n
        },
        easeInSine: function(t, e, n, i, a) {
            return -i * Math.cos(e / a * (Math.PI / 2)) + i + n
        },
        easeOutSine: function(t, e, n, i, a) {
            return i * Math.sin(e / a * (Math.PI / 2)) + n
        },
        easeInOutSine: function(t, e, n, i, a) {
            return -i / 2 * (Math.cos(Math.PI * e / a) - 1) + n
        },
        easeInExpo: function(t, e, n, i, a) {
            return 0 == e ? n : i * Math.pow(2, 10 * (e / a - 1)) + n
        },
        easeOutExpo: function(t, e, n, i, a) {
            return e == a ? n + i : i * (-Math.pow(2, -10 * e / a) + 1) + n
        },
        easeInOutExpo: function(t, e, n, i, a) {
            return 0 == e ? n : e == a ? n + i : (e /= a / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (-Math.pow(2, -10 * --e) + 2) + n
        },
        easeInCirc: function(t, e, n, i, a) {
            return -i * (Math.sqrt(1 - (e /= a) * e) - 1) + n
        },
        easeOutCirc: function(t, e, n, i, a) {
            return i * Math.sqrt(1 - (e = e / a - 1) * e) + n
        },
        easeInOutCirc: function(t, e, n, i, a) {
            return (e /= a / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + n : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n
        },
        easeInElastic: function(t, e, n, i, a) {
            var o = 1.70158,
                s = 0,
                r = i;
            if (0 == e) return n;
            if (1 == (e /= a)) return n + i;
            if (s || (s = .3 * a), r < Math.abs(i)) {
                r = i;
                var o = s / 4
            } else var o = s / (2 * Math.PI) * Math.asin(i / r);
            return -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + n
        },
        easeOutElastic: function(t, e, n, i, a) {
            var o = 1.70158,
                s = 0,
                r = i;
            if (0 == e) return n;
            if (1 == (e /= a)) return n + i;
            if (s || (s = .3 * a), r < Math.abs(i)) {
                r = i;
                var o = s / 4
            } else var o = s / (2 * Math.PI) * Math.asin(i / r);
            return r * Math.pow(2, -10 * e) * Math.sin((e * a - o) * (2 * Math.PI) / s) + i + n
        },
        easeInOutElastic: function(t, e, n, i, a) {
            var o = 1.70158,
                s = 0,
                r = i;
            if (0 == e) return n;
            if (2 == (e /= a / 2)) return n + i;
            if (s || (s = a * (.3 * 1.5)), r < Math.abs(i)) {
                r = i;
                var o = s / 4
            } else var o = s / (2 * Math.PI) * Math.asin(i / r);
            return 1 > e ? -.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + n : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s) * .5 + i + n
        },
        easeInBack: function(t, e, n, i, a, o) {
            return void 0 == o && (o = 1.70158), i * (e /= a) * e * ((o + 1) * e - o) + n
        },
        easeOutBack: function(t, e, n, i, a, o) {
            return void 0 == o && (o = 1.70158), i * ((e = e / a - 1) * e * ((o + 1) * e + o) + 1) + n
        },
        easeInOutBack: function(t, e, n, i, a, o) {
            return void 0 == o && (o = 1.70158), (e /= a / 2) < 1 ? i / 2 * (e * e * (((o *= 1.525) + 1) * e - o)) + n : i / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + n
        },
        easeInBounce: function(t, e, n, i, a) {
            return i - jQuery.easing.easeOutBounce(t, a - e, 0, i, a) + n
        },
        easeOutBounce: function(t, e, n, i, a) {
            return (e /= a) < 1 / 2.75 ? i * (7.5625 * e * e) + n : 2 / 2.75 > e ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : 2.5 / 2.75 > e ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
        },
        easeInOutBounce: function(t, e, n, i, a) {
            return a / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, a) + n : .5 * jQuery.easing.easeOutBounce(t, 2 * e - a, 0, i, a) + .5 * i + n
        }
    }),
    function(t) {
        t.flexslider = function(e, n) {
            var i = t(e);
            i.vars = t.extend({}, t.flexslider.defaults, n);
            var a, o = i.vars.namespace,
                s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
                r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch,
                l = "click touchend MSPointerUp",
                c = "",
                u = "vertical" === i.vars.direction,
                d = i.vars.reverse,
                p = i.vars.itemWidth > 0,
                h = "fade" === i.vars.animation,
                f = "" !== i.vars.asNavFor,
                v = {},
                m = !0;
            t.data(e, "flexslider", i), v = {
                init: function() {
                    i.animating = !1, i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10), isNaN(i.currentSlide) && (i.currentSlide = 0), i.animatingTo = i.currentSlide, i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last, i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")), i.slides = t(i.vars.selector, i), i.container = t(i.containerSelector, i), i.count = i.slides.length, i.syncExists = t(i.vars.sync).length > 0, "slide" === i.vars.animation && (i.vars.animation = "swing"), i.prop = u ? "top" : "marginLeft", i.args = {}, i.manualPause = !1, i.stopped = !1, i.started = !1, i.startTimeout = null, i.transitions = !i.vars.video && !h && i.vars.useCSS && function() {
                        var t = document.createElement("div"),
                            e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var n in e)
                            if (void 0 !== t.style[e[n]]) return i.pfx = e[n].replace("Perspective", "").toLowerCase(), i.prop = "-" + i.pfx + "-transform", !0;
                        return !1
                    }(), i.ensureAnimationEnd = "", "" !== i.vars.controlsContainer && (i.controlsContainer = t(i.vars.controlsContainer).length > 0 && t(i.vars.controlsContainer)), "" !== i.vars.manualControls && (i.manualControls = t(i.vars.manualControls).length > 0 && t(i.vars.manualControls)), i.vars.randomize && (i.slides.sort(function() {
                        return Math.round(Math.random()) - .5
                    }), i.container.empty().append(i.slides)), i.doMath(), i.setup("init"), i.vars.controlNav && v.controlNav.setup(), i.vars.directionNav && v.directionNav.setup(), i.vars.keyboard && (1 === t(i.containerSelector).length || i.vars.multipleKeyboard) && t(document).bind("keyup", function(t) {
                        var e = t.keyCode;
                        if (!i.animating && (39 === e || 37 === e)) {
                            var n = 39 === e ? i.getTarget("next") : 37 === e ? i.getTarget("prev") : !1;
                            i.flexAnimate(n, i.vars.pauseOnAction)
                        }
                    }), i.vars.mousewheel && i.bind("mousewheel", function(t, e, n, a) {
                        t.preventDefault();
                        var o = 0 > e ? i.getTarget("next") : i.getTarget("prev");
                        i.flexAnimate(o, i.vars.pauseOnAction)
                    }), i.vars.pausePlay && v.pausePlay.setup(), i.vars.slideshow && i.vars.pauseInvisible && v.pauseInvisible.init(), i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function() {
                        i.manualPlay || i.manualPause || i.pause()
                    }, function() {
                        i.manualPause || i.manualPlay || i.stopped || i.play()
                    }), i.vars.pauseInvisible && v.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())), f && v.asNav.setup(), r && i.vars.touch && v.touch(), (!h || h && i.vars.smoothHeight) && t(window).bind("resize orientationchange focus", v.resize), i.find("img").attr("draggable", "false"), setTimeout(function() {
                        i.vars.start(i)
                    }, 200)
                },
                asNav: {
                    setup: function() {
                        i.asNav = !0, i.animatingTo = Math.floor(i.currentSlide / i.move), i.currentItem = i.currentSlide, i.slides.removeClass(o + "active-slide").eq(i.currentItem).addClass(o + "active-slide"), s ? (e._slider = i, i.slides.each(function() {
                            var e = this;
                            e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(t) {
                                t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                            }, !1), e.addEventListener("MSGestureTap", function(e) {
                                e.preventDefault();
                                var n = t(this),
                                    a = n.index();
                                t(i.vars.asNavFor).data("flexslider").animating || n.hasClass("active") || (i.direction = i.currentItem < a ? "next" : "prev", i.flexAnimate(a, i.vars.pauseOnAction, !1, !0, !0))
                            })
                        })) : i.slides.on(l, function(e) {
                            e.preventDefault();
                            var n = t(this),
                                a = n.index(),
                                s = n.offset().left - t(i).scrollLeft();
                            0 >= s && n.hasClass(o + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : t(i.vars.asNavFor).data("flexslider").animating || n.hasClass(o + "active-slide") || (i.direction = i.currentItem < a ? "next" : "prev", i.flexAnimate(a, i.vars.pauseOnAction, !1, !0, !0))
                        })
                    }
                },
                controlNav: {
                    setup: function() {
                        i.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                    },
                    setupPaging: function() {
                        var e, n, a = "thumbnails" === i.vars.controlNav ? "control-thumbs" : "control-paging",
                            s = 1;
                        if (i.controlNavScaffold = t('<ol class="' + o + "control-nav " + o + a + '"></ol>'), i.pagingCount > 1)
                            for (var r = 0; r < i.pagingCount; r++) {
                                if (n = i.slides.eq(r), e = "thumbnails" === i.vars.controlNav ? '<img src="' + n.attr("data-thumb") + '"/>' : "<a>" + s + "</a>", "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                                    var u = n.attr("data-thumbcaption");
                                    "" != u && void 0 != u && (e += '<span class="' + o + 'caption">' + u + "</span>")
                                }
                                i.controlNavScaffold.append("<li>" + e + "</li>"), s++
                            }
                        i.controlsContainer ? t(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), i.controlNavScaffold.delegate("a, img", l, function(e) {
                            if (e.preventDefault(), "" === c || c === e.type) {
                                var n = t(this),
                                    a = i.controlNav.index(n);
                                n.hasClass(o + "active") || (i.direction = a > i.currentSlide ? "next" : "prev", i.flexAnimate(a, i.vars.pauseOnAction))
                            }
                            "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    setupManual: function() {
                        i.controlNav = i.manualControls, v.controlNav.active(), i.controlNav.bind(l, function(e) {
                            if (e.preventDefault(), "" === c || c === e.type) {
                                var n = t(this),
                                    a = i.controlNav.index(n);
                                n.hasClass(o + "active") || (a > i.currentSlide ? i.direction = "next" : i.direction = "prev", i.flexAnimate(a, i.vars.pauseOnAction))
                            }
                            "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    set: function() {
                        var e = "thumbnails" === i.vars.controlNav ? "img" : "a";
                        i.controlNav = t("." + o + "control-nav li " + e, i.controlsContainer ? i.controlsContainer : i)
                    },
                    active: function() {
                        i.controlNav.removeClass(o + "active").eq(i.animatingTo).addClass(o + "active")
                    },
                    update: function(e, n) {
                        i.pagingCount > 1 && "add" === e ? i.controlNavScaffold.append(t("<li><a>" + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(n, e) : v.controlNav.active()
                    }
                },
                directionNav: {
                    setup: function() {
                        var e = t('<ul class="' + o + 'direction-nav"><li><a class="' + o + 'prev" href="#">' + i.vars.prevText + '</a></li><li><a class="' + o + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                        i.controlsContainer ? (t(i.controlsContainer).append(e), i.directionNav = t("." + o + "direction-nav li a", i.controlsContainer)) : (i.append(e), i.directionNav = t("." + o + "direction-nav li a", i)), v.directionNav.update(), i.directionNav.bind(l, function(e) {
                            e.preventDefault();
                            var n;
                            ("" === c || c === e.type) && (n = t(this).hasClass(o + "next") ? i.getTarget("next") : i.getTarget("prev"), i.flexAnimate(n, i.vars.pauseOnAction)), "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    update: function() {
                        var t = o + "disabled";
                        1 === i.pagingCount ? i.directionNav.addClass(t).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(t).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(t).filter("." + o + "prev").addClass(t).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(t).filter("." + o + "next").addClass(t).attr("tabindex", "-1") : i.directionNav.removeClass(t).removeAttr("tabindex")
                    }
                },
                pausePlay: {
                    setup: function() {
                        var e = t('<div class="' + o + 'pauseplay"><a></a></div>');
                        i.controlsContainer ? (i.controlsContainer.append(e), i.pausePlay = t("." + o + "pauseplay a", i.controlsContainer)) : (i.append(e), i.pausePlay = t("." + o + "pauseplay a", i)), v.pausePlay.update(i.vars.slideshow ? o + "pause" : o + "play"), i.pausePlay.bind(l, function(e) {
                            e.preventDefault(), ("" === c || c === e.type) && (t(this).hasClass(o + "pause") ? (i.manualPause = !0, i.manualPlay = !1, i.pause()) : (i.manualPause = !1, i.manualPlay = !0, i.play())), "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    update: function(t) {
                        "play" === t ? i.pausePlay.removeClass(o + "pause").addClass(o + "play").html(i.vars.playText) : i.pausePlay.removeClass(o + "play").addClass(o + "pause").html(i.vars.pauseText)
                    }
                },
                touch: function() {
                    function t(t) {
                        i.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (i.pause(), m = u ? i.h : i.w, y = Number(new Date), w = t.touches[0].pageX, x = t.touches[0].pageY, v = p && d && i.animatingTo === i.last ? 0 : p && d ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : d ? (i.last - i.currentSlide + i.cloneOffset) * m : (i.currentSlide + i.cloneOffset) * m, c = u ? x : w, f = u ? w : x, e.addEventListener("touchmove", n, !1), e.addEventListener("touchend", a, !1))
                    }

                    function n(t) {
                        w = t.touches[0].pageX, x = t.touches[0].pageY, g = u ? c - x : c - w, b = u ? Math.abs(g) < Math.abs(w - f) : Math.abs(g) < Math.abs(x - f);
                        var e = 500;
                        (!b || Number(new Date) - y > e) && (t.preventDefault(), !h && i.transitions && (i.vars.animationLoop || (g /= 0 === i.currentSlide && 0 > g || i.currentSlide === i.last && g > 0 ? Math.abs(g) / m + 2 : 1), i.setProps(v + g, "setTouch")))
                    }

                    function a(t) {
                        if (e.removeEventListener("touchmove", n, !1), i.animatingTo === i.currentSlide && !b && null !== g) {
                            var o = d ? -g : g,
                                s = o > 0 ? i.getTarget("next") : i.getTarget("prev");
                            i.canAdvance(s) && (Number(new Date) - y < 550 && Math.abs(o) > 50 || Math.abs(o) > m / 2) ? i.flexAnimate(s, i.vars.pauseOnAction) : h || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                        }
                        e.removeEventListener("touchend", a, !1), c = null, f = null, g = null, v = null
                    }

                    function o(t) {
                        t.stopPropagation(), i.animating ? t.preventDefault() : (i.pause(), e._gesture.addPointer(t.pointerId), S = 0, m = u ? i.h : i.w, y = Number(new Date), v = p && d && i.animatingTo === i.last ? 0 : p && d ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : d ? (i.last - i.currentSlide + i.cloneOffset) * m : (i.currentSlide + i.cloneOffset) * m)
                    }

                    function r(t) {
                        t.stopPropagation();
                        var n = t.target._slider;
                        if (n) {
                            var i = -t.translationX,
                                a = -t.translationY;
                            return S += u ? a : i, g = S, b = u ? Math.abs(S) < Math.abs(-i) : Math.abs(S) < Math.abs(-a), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                                e._gesture.stop()
                            }) : void((!b || Number(new Date) - y > 500) && (t.preventDefault(), !h && n.transitions && (n.vars.animationLoop || (g = S / (0 === n.currentSlide && 0 > S || n.currentSlide === n.last && S > 0 ? Math.abs(S) / m + 2 : 1)), n.setProps(v + g, "setTouch"))))
                        }
                    }

                    function l(t) {
                        t.stopPropagation();
                        var e = t.target._slider;
                        if (e) {
                            if (e.animatingTo === e.currentSlide && !b && null !== g) {
                                var n = d ? -g : g,
                                    i = n > 0 ? e.getTarget("next") : e.getTarget("prev");
                                e.canAdvance(i) && (Number(new Date) - y < 550 && Math.abs(n) > 50 || Math.abs(n) > m / 2) ? e.flexAnimate(i, e.vars.pauseOnAction) : h || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                            }
                            c = null, f = null, g = null, v = null, S = 0
                        }
                    }
                    var c, f, v, m, g, y, b = !1,
                        w = 0,
                        x = 0,
                        S = 0;
                    s ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", o, !1), e._slider = i, e.addEventListener("MSGestureChange", r, !1), e.addEventListener("MSGestureEnd", l, !1)) : e.addEventListener("touchstart", t, !1)
                },
                resize: function() {
                    !i.animating && i.is(":visible") && (p || i.doMath(), h ? v.smoothHeight() : p ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps()) : u ? (i.viewport.height(i.h), i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && v.smoothHeight(), i.newSlides.width(i.computedW), i.setProps(i.computedW, "setTotal")))
                },
                smoothHeight: function(t) {
                    if (!u || h) {
                        var e = h ? i : i.viewport;
                        t ? e.animate({
                            height: i.slides.eq(i.animatingTo).height()
                        }, t) : e.height(i.slides.eq(i.animatingTo).height())
                    }
                },
                sync: function(e) {
                    var n = t(i.vars.sync).data("flexslider"),
                        a = i.animatingTo;
                    switch (e) {
                        case "animate":
                            n.flexAnimate(a, i.vars.pauseOnAction, !1, !0);
                            break;
                        case "play":
                            n.playing || n.asNav || n.play();
                            break;
                        case "pause":
                            n.pause()
                    }
                },
                uniqueID: function(e) {
                    return e.find("[id]").each(function() {
                        var e = t(this);
                        e.attr("id", e.attr("id") + "_clone")
                    }), e
                },
                pauseInvisible: {
                    visProp: null,
                    init: function() {
                        var t = ["webkit", "moz", "ms", "o"];
                        if ("hidden" in document) return "hidden";
                        for (var e = 0; e < t.length; e++) t[e] + "Hidden" in document && (v.pauseInvisible.visProp = t[e] + "Hidden");
                        if (v.pauseInvisible.visProp) {
                            var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                            document.addEventListener(n, function() {
                                v.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play()
                            })
                        }
                    },
                    isHidden: function() {
                        return document[v.pauseInvisible.visProp] || !1
                    }
                },
                setToClearWatchedEvent: function() {
                    clearTimeout(a), a = setTimeout(function() {
                        c = ""
                    }, 3e3)
                }
            }, i.flexAnimate = function(e, n, a, s, l) {
                if (i.vars.animationLoop || e === i.currentSlide || (i.direction = e > i.currentSlide ? "next" : "prev"), f && 1 === i.pagingCount && (i.direction = i.currentItem < e ? "next" : "prev"), !i.animating && (i.canAdvance(e, l) || a) && i.is(":visible")) {
                    if (f && s) {
                        var c = t(i.vars.asNavFor).data("flexslider");
                        if (i.atEnd = 0 === e || e === i.count - 1, c.flexAnimate(e, !0, !1, !0, l), i.direction = i.currentItem < e ? "next" : "prev", c.direction = i.direction, Math.ceil((e + 1) / i.visible) - 1 === i.currentSlide || 0 === e) return i.currentItem = e, i.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), !1;
                        i.currentItem = e, i.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), e = Math.floor(e / i.visible)
                    }
                    if (i.animating = !0, i.animatingTo = e, n && i.pause(), i.vars.before(i), i.syncExists && !l && v.sync("animate"), i.vars.controlNav && v.controlNav.active(), p || i.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), i.atEnd = 0 === e || e === i.last, i.vars.directionNav && v.directionNav.update(), e === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()), h) r ? (i.slides.eq(i.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }), i.slides.eq(e).css({
                        opacity: 1,
                        zIndex: 2
                    }), i.wrapup(b)) : (i.slides.eq(i.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, i.vars.animationSpeed, i.vars.easing), i.slides.eq(e).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, i.vars.animationSpeed, i.vars.easing, i.wrapup));
                    else {
                        var m, g, y, b = u ? i.slides.filter(":first").height() : i.computedW;
                        p ? (m = i.vars.itemMargin, y = (i.itemW + m) * i.move * i.animatingTo, g = y > i.limit && 1 !== i.visible ? i.limit : y) : g = 0 === i.currentSlide && e === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? d ? (i.count + i.cloneOffset) * b : 0 : i.currentSlide === i.last && 0 === e && i.vars.animationLoop && "prev" !== i.direction ? d ? 0 : (i.count + 1) * b : d ? (i.count - 1 - e + i.cloneOffset) * b : (e + i.cloneOffset) * b, i.setProps(g, "", i.vars.animationSpeed), i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1, i.currentSlide = i.animatingTo), i.container.unbind("webkitTransitionEnd transitionend"), i.container.bind("webkitTransitionEnd transitionend", function() {
                            clearTimeout(i.ensureAnimationEnd), i.wrapup(b)
                        }), clearTimeout(i.ensureAnimationEnd), i.ensureAnimationEnd = setTimeout(function() {
                            i.wrapup(b)
                        }, i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function() {
                            i.wrapup(b)
                        })
                    }
                    i.vars.smoothHeight && v.smoothHeight(i.vars.animationSpeed)
                }
            }, i.wrapup = function(t) {
                h || p || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(t, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(t, "jumpStart")), i.animating = !1, i.currentSlide = i.animatingTo, i.vars.after(i)
            }, i.animateSlides = function() {
                !i.animating && m && i.flexAnimate(i.getTarget("next"))
            }, i.pause = function() {
                clearInterval(i.animatedSlides), i.animatedSlides = null, i.playing = !1, i.vars.pausePlay && v.pausePlay.update("play"), i.syncExists && v.sync("pause")
            }, i.play = function() {
                i.playing && clearInterval(i.animatedSlides), i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed), i.started = i.playing = !0, i.vars.pausePlay && v.pausePlay.update("pause"), i.syncExists && v.sync("play")
            }, i.stop = function() {
                i.pause(), i.stopped = !0
            }, i.canAdvance = function(t, e) {
                var n = f ? i.pagingCount - 1 : i.last;
                return e ? !0 : f && i.currentItem === i.count - 1 && 0 === t && "prev" === i.direction ? !0 : f && 0 === i.currentItem && t === i.pagingCount - 1 && "next" !== i.direction ? !1 : t !== i.currentSlide || f ? i.vars.animationLoop ? !0 : i.atEnd && 0 === i.currentSlide && t === n && "next" !== i.direction ? !1 : i.atEnd && i.currentSlide === n && 0 === t && "next" === i.direction ? !1 : !0 : !1
            }, i.getTarget = function(t) {
                return i.direction = t, "next" === t ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last : i.currentSlide - 1
            }, i.setProps = function(t, e, n) {
                var a = function() {
                    var n = t ? t : (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo,
                        a = function() {
                            if (p) return "setTouch" === e ? t : d && i.animatingTo === i.last ? 0 : d ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : i.animatingTo === i.last ? i.limit : n;
                            switch (e) {
                                case "setTotal":
                                    return d ? (i.count - 1 - i.currentSlide + i.cloneOffset) * t : (i.currentSlide + i.cloneOffset) * t;
                                case "setTouch":
                                    return d ? t : t;
                                case "jumpEnd":
                                    return d ? t : i.count * t;
                                case "jumpStart":
                                    return d ? i.count * t : t;
                                default:
                                    return t
                            }
                        }();
                    return -1 * a + "px"
                }();
                i.transitions && (a = u ? "translate3d(0," + a + ",0)" : "translate3d(" + a + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", i.container.css("-" + i.pfx + "-transition-duration", n), i.container.css("transition-duration", n)), i.args[i.prop] = a, (i.transitions || void 0 === n) && i.container.css(i.args), i.container.css("transform", a)
            }, i.setup = function(e) {
                if (h) i.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                }), "init" === e && (r ? i.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(i.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : i.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(i.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, i.vars.animationSpeed, i.vars.easing)), i.vars.smoothHeight && v.smoothHeight();
                else {
                    var n, a;
                    "init" === e && (i.viewport = t('<div class="' + o + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(i).append(i.container), i.cloneCount = 0, i.cloneOffset = 0, d && (a = t.makeArray(i.slides).reverse(), i.slides = t(a), i.container.empty().append(i.slides))), i.vars.animationLoop && !p && (i.cloneCount = 2, i.cloneOffset = 1, "init" !== e && i.container.find(".clone").remove(), v.uniqueID(i.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(i.container), v.uniqueID(i.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(i.container)), i.newSlides = t(i.vars.selector, i), n = d ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset, u && !p ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                        i.newSlides.css({
                            display: "block"
                        }), i.doMath(), i.viewport.height(i.h), i.setProps(n * i.h, "init")
                    }, "init" === e ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"), i.setProps(n * i.computedW, "init"), setTimeout(function() {
                        i.doMath(), i.newSlides.css({
                            width: i.computedW,
                            "float": "left",
                            display: "block"
                        }), i.vars.smoothHeight && v.smoothHeight()
                    }, "init" === e ? 100 : 0))
                }
                p || i.slides.removeClass(o + "active-slide").eq(i.currentSlide).addClass(o + "active-slide"), i.vars.init(i)
            }, i.doMath = function() {
                var t = i.slides.first(),
                    e = i.vars.itemMargin,
                    n = i.vars.minItems,
                    a = i.vars.maxItems;
                i.w = void 0 === i.viewport ? i.width() : i.viewport.width(), i.h = t.height(), i.boxPadding = t.outerWidth() - t.width(), p ? (i.itemT = i.vars.itemWidth + e, i.minW = n ? n * i.itemT : i.w, i.maxW = a ? a * i.itemT - e : i.w, i.itemW = i.minW > i.w ? (i.w - e * (n - 1)) / n : i.maxW < i.w ? (i.w - e * (a - 1)) / a : i.vars.itemWidth > i.w ? i.w : i.vars.itemWidth, i.visible = Math.floor(i.w / i.itemW), i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible, i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1), i.last = i.pagingCount - 1, i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + e * (i.count - 1) : (i.itemW + e) * i.count - i.w - e) : (i.itemW = i.w, i.pagingCount = i.count, i.last = i.count - 1), i.computedW = i.itemW - i.boxPadding
            }, i.update = function(t, e) {
                i.doMath(), p || (t < i.currentSlide ? i.currentSlide += 1 : t <= i.currentSlide && 0 !== t && (i.currentSlide -= 1), i.animatingTo = i.currentSlide), i.vars.controlNav && !i.manualControls && ("add" === e && !p || i.pagingCount > i.controlNav.length ? v.controlNav.update("add") : ("remove" === e && !p || i.pagingCount < i.controlNav.length) && (p && i.currentSlide > i.last && (i.currentSlide -= 1, i.animatingTo -= 1), v.controlNav.update("remove", i.last))), i.vars.directionNav && v.directionNav.update()
            }, i.addSlide = function(e, n) {
                var a = t(e);
                i.count += 1, i.last = i.count - 1, u && d ? void 0 !== n ? i.slides.eq(i.count - n).after(a) : i.container.prepend(a) : void 0 !== n ? i.slides.eq(n).before(a) : i.container.append(a), i.update(n, "add"), i.slides = t(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.added(i)
            }, i.removeSlide = function(e) {
                var n = isNaN(e) ? i.slides.index(t(e)) : e;
                i.count -= 1, i.last = i.count - 1, isNaN(e) ? t(e, i.slides).remove() : u && d ? i.slides.eq(i.last).remove() : i.slides.eq(e).remove(), i.doMath(), i.update(n, "remove"), i.slides = t(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.removed(i)
            }, v.init()
        }, t(window).blur(function(t) {
            focused = !1
        }).focus(function(t) {
            focused = !0
        }), t.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "Previous",
            nextText: "Next",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            start: function() {},
            before: function() {},
            after: function() {},
            end: function() {},
            added: function() {},
            removed: function() {},
            init: function() {}
        }, t.fn.flexslider = function(e) {
            if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
                var n = t(this),
                    i = e.selector ? e.selector : ".slides > li",
                    a = n.find(i);
                1 === a.length && e.allowOneSlide === !0 || 0 === a.length ? (a.fadeIn(400), e.start && e.start(n)) : void 0 === n.data("flexslider") && new t.flexslider(this, e)
            });
            var n = t(this).data("flexslider");
            switch (e) {
                case "play":
                    n.play();
                    break;
                case "pause":
                    n.pause();
                    break;
                case "stop":
                    n.stop();
                    break;
                case "next":
                    n.flexAnimate(n.getTarget("next"), !0);
                    break;
                case "prev":
                case "previous":
                    n.flexAnimate(n.getTarget("prev"), !0);
                    break;
                default:
                    "number" == typeof e && n.flexAnimate(e, !0)
            }
        }
    }(jQuery),
    function() {
        var t = [].indexOf || function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            },
            e = [].slice;
        ! function(t, e) {
            return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            }) : e(t.jQuery, t)
        }(this, function(n, i) {
            var a, o, s, r, l, c, u, d, p, h, f, v, m, g, y, b;
            return a = n(i), d = t.call(i, "ontouchstart") >= 0, r = {
                horizontal: {},
                vertical: {}
            }, l = 1, u = {}, c = "waypoints-context-id", f = "resize.waypoints", v = "scroll.waypoints", m = 1, g = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", o = function() {
                function t(t) {
                    var e = this;
                    this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
                        x: t.scrollLeft(),
                        y: t.scrollTop()
                    }, this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    }, this.element[c] = this.id, u[this.id] = this, t.bind(v, function() {
                        var t;
                        return e.didScroll || d ? void 0 : (e.didScroll = !0, t = function() {
                            return e.doScroll(), e.didScroll = !1
                        }, i.setTimeout(t, n[b].settings.scrollThrottle))
                    }), t.bind(f, function() {
                        var t;
                        return e.didResize ? void 0 : (e.didResize = !0, t = function() {
                            return n[b]("refresh"), e.didResize = !1
                        }, i.setTimeout(t, n[b].settings.resizeThrottle))
                    })
                }
                return t.prototype.doScroll = function() {
                    var t, e = this;
                    return t = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    }, !d || t.vertical.oldScroll && t.vertical.newScroll || n[b]("refresh"), n.each(t, function(t, i) {
                        var a, o, s;
                        return s = [], o = i.newScroll > i.oldScroll, a = o ? i.forward : i.backward, n.each(e.waypoints[t], function(t, e) {
                            var n, a;
                            return i.oldScroll < (n = e.offset) && n <= i.newScroll ? s.push(e) : i.newScroll < (a = e.offset) && a <= i.oldScroll ? s.push(e) : void 0
                        }), s.sort(function(t, e) {
                            return t.offset - e.offset
                        }), o || s.reverse(), n.each(s, function(t, e) {
                            return e.options.continuous || t === s.length - 1 ? e.trigger([a]) : void 0
                        })
                    }), this.oldScroll = {
                        x: t.horizontal.newScroll,
                        y: t.vertical.newScroll
                    }
                }, t.prototype.refresh = function() {
                    var t, e, i, a = this;
                    return i = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
                        horizontal: {
                            contextOffset: i ? 0 : e.left,
                            contextScroll: i ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: i ? 0 : e.top,
                            contextScroll: i ? 0 : this.oldScroll.y,
                            contextDimension: i ? n[b]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    }, n.each(t, function(t, e) {
                        return n.each(a.waypoints[t], function(t, i) {
                            var a, o, s, r, l;
                            return a = i.options.offset, s = i.offset, o = n.isWindow(i.element) ? 0 : i.$element.offset()[e.offsetProp], n.isFunction(a) ? a = a.apply(i.element) : "string" == typeof a && (a = parseFloat(a), i.options.offset.indexOf("%") > -1 && (a = Math.ceil(e.contextDimension * a / 100))), i.offset = o - e.contextOffset + e.contextScroll - a, i.options.onlyOnScroll && null != s || !i.enabled ? void 0 : null !== s && s < (r = e.oldScroll) && r <= i.offset ? i.trigger([e.backward]) : null !== s && s > (l = e.oldScroll) && l >= i.offset ? i.trigger([e.forward]) : null === s && e.oldScroll >= i.offset ? i.trigger([e.forward]) : void 0
                        })
                    })
                }, t.prototype.checkEmpty = function() {
                    return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([f, v].join(" ")), delete u[this.id]) : void 0
                }, t
            }(), s = function() {
                function t(t, e, i) {
                    var a, o;
                    i = n.extend({}, n.fn[y].defaults, i), "bottom-in-view" === i.offset && (i.offset = function() {
                        var t;
                        return t = n[b]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), t - n(this).outerHeight()
                    }), this.$element = t, this.element = t[0], this.axis = i.horizontal ? "horizontal" : "vertical", this.callback = i.handler, this.context = e, this.enabled = i.enabled, this.id = "waypoints" + m++, this.offset = null, this.options = i, e.waypoints[this.axis][this.id] = this, r[this.axis][this.id] = this, a = null != (o = this.element[g]) ? o : [], a.push(this.id), this.element[g] = a
                }
                return t.prototype.trigger = function(t) {
                    return this.enabled ? (null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0) : void 0
                }, t.prototype.disable = function() {
                    return this.enabled = !1
                }, t.prototype.enable = function() {
                    return this.context.refresh(), this.enabled = !0
                }, t.prototype.destroy = function() {
                    return delete r[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
                }, t.getWaypointsByElement = function(t) {
                    var e, i;
                    return (i = t[g]) ? (e = n.extend({}, r.horizontal, r.vertical), n.map(i, function(t) {
                        return e[t]
                    })) : []
                }, t
            }(), h = {
                init: function(t, e) {
                    var i;
                    return null == e && (e = {}), null == (i = e.handler) && (e.handler = t), this.each(function() {
                        var t, i, a, r;
                        return t = n(this), a = null != (r = e.context) ? r : n.fn[y].defaults.context, n.isWindow(a) || (a = t.closest(a)), a = n(a), i = u[a[0][c]], i || (i = new o(a)), new s(t, i, e)
                    }), n[b]("refresh"), this
                },
                disable: function() {
                    return h._invoke.call(this, "disable")
                },
                enable: function() {
                    return h._invoke.call(this, "enable")
                },
                destroy: function() {
                    return h._invoke.call(this, "destroy")
                },
                prev: function(t, e) {
                    return h._traverse.call(this, t, e, function(t, e, n) {
                        return e > 0 ? t.push(n[e - 1]) : void 0
                    })
                },
                next: function(t, e) {
                    return h._traverse.call(this, t, e, function(t, e, n) {
                        return e < n.length - 1 ? t.push(n[e + 1]) : void 0
                    })
                },
                _traverse: function(t, e, a) {
                    var o, s;
                    return null == t && (t = "vertical"), null == e && (e = i), s = p.aggregate(e), o = [], this.each(function() {
                        var e;
                        return e = n.inArray(this, s[t]), a(o, e, s[t])
                    }), this.pushStack(o)
                },
                _invoke: function(t) {
                    return this.each(function() {
                        var e;
                        return e = s.getWaypointsByElement(this), n.each(e, function(e, n) {
                            return n[t](), !0
                        })
                    }), this
                }
            }, n.fn[y] = function() {
                var t, i;
                return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], h[i] ? h[i].apply(this, t) : n.isFunction(i) ? h.init.apply(this, arguments) : n.isPlainObject(i) ? h.init.apply(this, [null, i]) : i ? n.error("The " + i + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
            }, n.fn[y].defaults = {
                context: i,
                continuous: !0,
                enabled: !0,
                horizontal: !1,
                offset: 0,
                triggerOnce: !1
            }, p = {
                refresh: function() {
                    return n.each(u, function(t, e) {
                        return e.refresh()
                    })
                },
                viewportHeight: function() {
                    var t;
                    return null != (t = i.innerHeight) ? t : a.height()
                },
                aggregate: function(t) {
                    var e, i, a;
                    return e = r, t && (e = null != (a = u[n(t)[0][c]]) ? a.waypoints : void 0), e ? (i = {
                        horizontal: [],
                        vertical: []
                    }, n.each(i, function(t, a) {
                        return n.each(e[t], function(t, e) {
                            return a.push(e)
                        }), a.sort(function(t, e) {
                            return t.offset - e.offset
                        }), i[t] = n.map(a, function(t) {
                            return t.element
                        }), i[t] = n.unique(i[t])
                    }), i) : []
                },
                above: function(t) {
                    return null == t && (t = i), p._filter(t, "vertical", function(t, e) {
                        return e.offset <= t.oldScroll.y
                    })
                },
                below: function(t) {
                    return null == t && (t = i), p._filter(t, "vertical", function(t, e) {
                        return e.offset > t.oldScroll.y
                    })
                },
                left: function(t) {
                    return null == t && (t = i), p._filter(t, "horizontal", function(t, e) {
                        return e.offset <= t.oldScroll.x
                    })
                },
                right: function(t) {
                    return null == t && (t = i), p._filter(t, "horizontal", function(t, e) {
                        return e.offset > t.oldScroll.x
                    })
                },
                enable: function() {
                    return p._invoke("enable")
                },
                disable: function() {
                    return p._invoke("disable")
                },
                destroy: function() {
                    return p._invoke("destroy")
                },
                extendFn: function(t, e) {
                    return h[t] = e
                },
                _invoke: function(t) {
                    var e;
                    return e = n.extend({}, r.vertical, r.horizontal), n.each(e, function(e, n) {
                        return n[t](), !0
                    })
                },
                _filter: function(t, e, i) {
                    var a, o;
                    return (a = u[n(t)[0][c]]) ? (o = [], n.each(a.waypoints[e], function(t, e) {
                        return i(a, e) ? o.push(e) : void 0
                    }), o.sort(function(t, e) {
                        return t.offset - e.offset
                    }), n.map(o, function(t) {
                        return t.element
                    })) : []
                }
            }, n[b] = function() {
                var t, n;
                return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], p[n] ? p[n].apply(null, t) : p.aggregate.call(null, n)
            }, n[b].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            }, a.load(function() {
                return n[b]("refresh")
            })
        })
    }.call(this),
    function(t) {
        var e = function(t) {
                return t.split("").reverse().join("")
            },
            n = {
                numberStep: function(e, n) {
                    var i = Math.floor(e),
                        a = t(n.elem);
                    a.text(i)
                }
            },
            i = function(t) {
                var e = t.elem;
                if (e.nodeType && e.parentNode) {
                    var i = e._animateNumberSetter;
                    i || (i = n.numberStep), i(t.now, t)
                }
            };
        t.Tween && t.Tween.propHooks ? t.Tween.propHooks.number = {
            set: i
        } : t.fx.step.number = i;
        var a = function(t, e) {
                for (var n, i, a, o = t.split("").reverse(), s = [], r = 0, l = Math.ceil(t.length / e); l > r; r++) {
                    for (n = "", a = 0; e > a && (i = r * e + a, i !== t.length); a++) n += o[i];
                    s.push(n)
                }
                return s
            },
            o = function(t) {
                var n = t.length - 1,
                    i = e(t[n]);
                return t[n] = e(parseInt(i, 10).toString()), t
            };
        t.animateNumber = {
            numberStepFactories: {
                append: function(e) {
                    return function(n, i) {
                        var a = Math.floor(n),
                            o = t(i.elem);
                        o.prop("number", n).text(a + e)
                    }
                },
                separator: function(n, i) {
                    return n = n || " ", i = i || 3,
                        function(s, r) {
                            var l = Math.floor(s),
                                c = l.toString(),
                                u = t(r.elem);
                            if (c.length > i) {
                                var d = a(c, i);
                                c = o(d).join(n), c = e(c)
                            }
                            u.prop("number", s).text(c)
                        }
                }
            }
        }, t.fn.animateNumber = function() {
            for (var e = arguments[0], i = t.extend({}, n, e), a = t(this), o = [i], s = 1, r = arguments.length; r > s; s++) o.push(arguments[s]);
            if (e.numberStep) {
                var l = this.each(function() {
                        this._animateNumberSetter = e.numberStep
                    }),
                    c = i.complete;
                i.complete = function() {
                    l.each(function() {
                        delete this._animateNumberSetter
                    }), c && c.apply(this, arguments)
                }
            }
            return a.animate.apply(a, o)
        }
    }(jQuery), ! function(t) {
        "use strict";
        var e = function(e, n) {
            this.el = t(e), this.options = t.extend({}, t.fn.typed.defaults, n), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
        };
        e.prototype = {
            constructor: e,
            init: function() {
                var t = this;
                t.timeout = setTimeout(function() {
                    for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                    t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
                }, t.startDelay)
            },
            build: function() {
                var e = this;
                if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                    e.strings = [], this.stringsElement.hide();
                    var n = this.stringsElement.find("p");
                    t.each(n, function(n, i) {
                        e.strings.push(t(i).html())
                    })
                }
                this.init()
            },
            typewrite: function(t, e) {
                if (this.stop !== !0) {
                    var n = Math.round(70 * Math.random()) + this.typeSpeed,
                        i = this;
                    i.timeout = setTimeout(function() {
                        var n = 0,
                            a = t.substr(e);
                        if ("^" === a.charAt(0)) {
                            var o = 1;
                            /^\^\d+/.test(a) && (a = /\d+/.exec(a)[0], o += a.length, n = parseInt(a)), t = t.substring(0, e) + t.substring(e + o)
                        }
                        if ("html" === i.contentType) {
                            var s = t.substr(e).charAt(0);
                            if ("<" === s || "&" === s) {
                                var r = "",
                                    l = "";
                                for (l = "<" === s ? ">" : ";"; t.substr(e).charAt(0) !== l;) r += t.substr(e).charAt(0), e++;
                                e++, r += l
                            }
                        }
                        i.timeout = setTimeout(function() {
                            if (e === t.length) {
                                if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                                i.timeout = setTimeout(function() {
                                    i.backspace(t, e)
                                }, i.backDelay)
                            } else {
                                0 === e && i.options.preStringTyped(i.arrayPos);
                                var n = t.substr(0, e + 1);
                                i.attr ? i.el.attr(i.attr, n) : i.isInput ? i.el.val(n) : "html" === i.contentType ? i.el.html(n) : i.el.text(n), e++, i.typewrite(t, e)
                            }
                        }, n)
                    }, n)
                }
            },
            backspace: function(t, e) {
                if (this.stop !== !0) {
                    var n = Math.round(70 * Math.random()) + this.backSpeed,
                        i = this;
                    i.timeout = setTimeout(function() {
                        if ("html" === i.contentType && ">" === t.substr(e).charAt(0)) {
                            for (var n = "";
                                "<" !== t.substr(e).charAt(0);) n -= t.substr(e).charAt(0), e--;
                            e--, n += "<"
                        }
                        var a = t.substr(0, e);
                        i.attr ? i.el.attr(i.attr, a) : i.isInput ? i.el.val(a) : "html" === i.contentType ? i.el.html(a) : i.el.text(a), e > i.stopNum ? (e--, i.backspace(t, e)) : e <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], e))
                    }, n)
                }
            },
            shuffleArray: function(t) {
                var e, n, i = t.length;
                if (i)
                    for (; --i;) n = Math.floor(Math.random() * (i + 1)), e = t[n], t[n] = t[i], t[i] = e;
                return t
            },
            reset: function() {
                var t = this;
                clearInterval(t.timeout);
                var e = this.el.attr("id");
                this.el.after('<span id="' + e + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), t.options.resetCallback()
            }
        }, t.fn.typed = function(n) {
            return this.each(function() {
                var i = t(this),
                    a = i.data("typed"),
                    o = "object" == typeof n && n;
                a || i.data("typed", a = new e(this, o)), "string" == typeof n && a[n]()
            })
        }, t.fn.typed.defaults = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            shuffle: !1,
            backDelay: 500,
            loop: !1,
            loopCount: !1,
            showCursor: !0,
            cursorChar: "|",
            attr: null,
            contentType: "html",
            callback: function() {},
            preStringTyped: function() {},
            onStringTyped: function() {},
            resetCallback: function() {}
        }
    }(window.jQuery), + function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    a = n.data("bs.alert");
                a || n.data("bs.alert", a = new i(this)), "string" == typeof e && a[e].call(n)
            })
        }
        var n = '[data-dismiss="alert"]',
            i = function(e) {
                t(e).on("click", n, this.close)
            };
        i.VERSION = "3.2.0", i.prototype.close = function(e) {
            function n() {
                o.detach().trigger("closed.bs.alert").remove()
            }
            var i = t(this),
                a = i.attr("data-target");
            a || (a = i.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, ""));
            var o = t(a);
            e && e.preventDefault(), o.length || (o = i.hasClass("alert") ? i : i.parent()), o.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(150) : n())
        };
        var a = t.fn.alert;
        t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
            return t.fn.alert = a, this
        }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    a = i.data("bs.collapse"),
                    o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
                !a && o.toggle && "show" == e && (e = !e), a || i.data("bs.collapse", a = new n(this, o)), "string" == typeof e && a[e]()
            })
        }
        var n = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
        };
        n.VERSION = "3.2.0", n.DEFAULTS = {
            toggle: !0
        }, n.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, n.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var n = t.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    var i = this.$parent && this.$parent.find("> .x-accordion-group > .in");
                    if (i && i.length) {
                        var a = i.data("bs.collapse");
                        if (a && a.transitioning) return;
                        e.call(i, "hide"), a || i.data("bs.collapse", null)
                    }
                    var o = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
                    var s = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[o](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return s.call(this);
                    var r = t.camelCase(["scroll", o].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(350)[o](this.$element[0][r])
                }
            }
        }, n.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var e = t.Event("hide.bs.collapse");
                if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                    var n = this.dimension();
                    this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                    var i = function() {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                    return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(350) : i.call(this)
                }
            }
        }, n.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
        var i = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = i, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(n) {
            var i, a = t(this),
                o = a.attr("data-target") || n.preventDefault() || (i = a.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
                s = t(o),
                r = s.data("bs.collapse"),
                l = r ? "toggle" : a.data(),
                c = a.attr("data-parent"),
                u = c && t(c);
            r && r.transitioning || (u && u.find('[data-toggle="collapse"][data-parent="' + c + '"]').not(a).addClass("collapsed"), a[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), e.call(s, l)
        })
    }(jQuery), + function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    a = i.data("bs.tab");
                a || i.data("bs.tab", a = new n(this)), "string" == typeof e && a[e]()
            })
        }
        var n = function(e) {
            this.element = t(e)
        };
        n.VERSION = "3.2.0", n.prototype.show = function() {
            var e = this.element,
                n = e.closest("ul:not(.dropdown-menu)"),
                i = e.data("target");
            if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
                var a = n.find(".active:last a")[0],
                    o = t.Event("show.bs.tab", {
                        relatedTarget: a
                    });
                if (e.trigger(o), !o.isDefaultPrevented()) {
                    var s = t(i);
                    this.activate(e.closest("li"), n), this.activate(s, s.parent(), function() {
                        e.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: a
                        })
                    })
                }
            }
        }, n.prototype.activate = function(e, n, i) {
            function a() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), i && i()
            }
            var o = n.find("> .active"),
                s = i && t.support.transition && o.hasClass("fade");
            s ? o.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a(), o.removeClass("in")
        };
        var i = t.fn.tab;
        t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
            return t.fn.tab = i, this
        }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(n) {
            n.preventDefault(), e.call(t(this), "show")
        })
    }(jQuery), + function(t) {
        "use strict";

        function e() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in e)
                if (void 0 !== t.style[n]) return {
                    end: e[n]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(e) {
            var n = !1,
                i = this;
            t(this).one("bsTransitionEnd", function() {
                n = !0
            });
            var a = function() {
                n || t(i).trigger(t.support.transition.end)
            };
            return setTimeout(a, e), this
        }, t(function() {
            t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(e) {
                    return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    a = i.data("bs.tooltip"),
                    o = "object" == typeof e && e;
                (a || "destroy" != e) && (a || i.data("bs.tooltip", a = new n(this, o)), "string" == typeof e && a[e]())
            })
        }
        var n = function(t, e) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
        };
        n.VERSION = "3.2.0", n.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, n.prototype.init = function(e, n, i) {
            this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
            for (var a = this.options.trigger.split(" "), o = a.length; o--;) {
                var s = a[o];
                if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != s) {
                    var r = "hover" == s ? "mouseenter" : "focusin",
                        l = "hover" == s ? "mouseleave" : "focusout";
                    this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, n.prototype.getDefaults = function() {
            return n.DEFAULTS
        }, n.prototype.getOptions = function(e) {
            return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, n.prototype.getDelegateOptions = function() {
            var e = {},
                n = this.getDefaults();
            return this._options && t.each(this._options, function(t, i) {
                n[t] != i && (e[t] = i)
            }), e
        }, n.prototype.enter = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show)) : n.show()
        }, n.prototype.leave = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide)) : n.hide()
        }, n.prototype.show = function() {
            var e = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var n = t.contains(document.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !n) return;
                var i = this,
                    a = this.tip(),
                    o = this.getUID(this.type);
                this.setContent(), a.attr("id", o), this.$element.attr("aria-describedby", o), this.options.animation && a.addClass("fade");
                var s = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement,
                    r = /\s?auto?\s?/i,
                    l = r.test(s);
                l && (s = s.replace(r, "") || "top"), a.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(s).data("bs." + this.type, this), this.options.container ? a.appendTo(this.options.container) : a.insertAfter(this.$element);
                var c = this.getPosition(),
                    u = a[0].offsetWidth,
                    d = a[0].offsetHeight;
                if (l) {
                    var p = s,
                        h = this.$element.parent(),
                        f = this.getPosition(h);
                    s = "bottom" == s && c.top + c.height + d - f.scroll > f.height ? "top" : "top" == s && c.top - f.scroll - d < 0 ? "bottom" : "right" == s && c.right + u > f.width ? "left" : "left" == s && c.left - u < f.left ? "right" : s, a.removeClass(p).addClass(s)
                }
                var v = this.getCalculatedOffset(s, c, u, d);
                this.applyPlacement(v, s);
                var m = function() {
                    i.$element.trigger("shown.bs." + i.type), i.hoverState = null
                };
                t.support.transition && this.$tip.hasClass("fade") ? a.one("bsTransitionEnd", m).emulateTransitionEnd(150) : m()
            }
        }, n.prototype.applyPlacement = function(e, n) {
            var i = this.tip(),
                a = i[0].offsetWidth,
                o = i[0].offsetHeight,
                s = parseInt(i.css("margin-top"), 10),
                r = parseInt(i.css("margin-left"), 10);
            isNaN(s) && (s = 0), isNaN(r) && (r = 0), e.top = e.top + s, e.left = e.left + r, t.offset.setOffset(i[0], t.extend({
                using: function(t) {
                    i.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, e), 0), i.addClass("in");
            var l = i[0].offsetWidth,
                c = i[0].offsetHeight;
            "top" == n && c != o && (e.top = e.top + o - c);
            var u = this.getViewportAdjustedDelta(n, e, l, c);
            u.left ? e.left += u.left : e.top += u.top;
            var d = u.left ? 2 * u.left - a + l : 2 * u.top - o + c,
                p = u.left ? "left" : "top",
                h = u.left ? "offsetWidth" : "offsetHeight";
            i.offset(e), this.replaceArrow(d, i[0][h], p)
        }, n.prototype.replaceArrow = function(t, e, n) {
            this.arrow().css(n, t ? 50 * (1 - t / e) + "%" : "")
        }, n.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, n.prototype.hide = function() {
            function e() {
                "in" != n.hoverState && i.detach(), n.$element.trigger("hidden.bs." + n.type)
            }
            var n = this,
                i = this.tip(),
                a = t.Event("hide.bs." + this.type);
            return this.$element.removeAttr("aria-describedby"), this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), this.hoverState = null, this)
        }, n.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, n.prototype.hasContent = function() {
            return this.getTitle()
        }, n.prototype.getPosition = function(e) {
            e = e || this.$element;
            var n = e[0],
                i = "BODY" == n.tagName;
            return t.extend({}, "function" == typeof n.getBoundingClientRect ? n.getBoundingClientRect() : null, {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
                width: i ? t(window).width() : e.outerWidth(),
                height: i ? t(window).height() : e.outerHeight()
            }, i ? {
                top: 0,
                left: 0
            } : e.offset())
        }, n.prototype.getCalculatedOffset = function(t, e, n, i) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - n / 2
            } : "top" == t ? {
                top: e.top - i,
                left: e.left + e.width / 2 - n / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - i / 2,
                left: e.left - n
            } : {
                top: e.top + e.height / 2 - i / 2,
                left: e.left + e.width
            }
        }, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
            var a = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return a;
            var o = this.options.viewport && this.options.viewport.padding || 0,
                s = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var r = e.top - o - s.scroll,
                    l = e.top + o - s.scroll + i;
                r < s.top ? a.top = s.top - r : l > s.top + s.height && (a.top = s.top + s.height - l)
            } else {
                var c = e.left - o,
                    u = e.left + o + n;
                c < s.left ? a.left = s.left - c : u > s.width && (a.left = s.left + s.width - u)
            }
            return a
        }, n.prototype.getTitle = function() {
            var t, e = this.$element,
                n = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
        }, n.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, n.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, n.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, n.prototype.validate = function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, n.prototype.enable = function() {
            this.enabled = !0
        }, n.prototype.disable = function() {
            this.enabled = !1
        }, n.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, n.prototype.toggle = function(e) {
            var n = this;
            e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
        }, n.prototype.destroy = function() {
            clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    a = i.data("bs.popover"),
                    o = "object" == typeof e && e;
                (a || "destroy" != e) && (a || i.data("bs.popover", a = new n(this, o)), "string" == typeof e && a[e]())
            })
        }
        var n = function(t, e) {
            this.init("popover", t, e)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        n.VERSION = "3.2.0", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function() {
            return n.DEFAULTS
        }, n.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle(),
                n = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").empty()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, n.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, n.prototype.getContent = function() {
            var t = this.$element,
                e = this.options;
            return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        }, n.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        }, n.prototype.tip = function() {
            return this.$tip || (this.$tip = t(this.options.template)), this.$tip
        };
        var i = t.fn.popover;
        t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function() {
            return t.fn.popover = i, this
        }
    }(jQuery), jQuery(function(t) {
        function e(t, e) {
            function n(t) {
                t.removeClass("collapse").addClass("collapsing").height(0), t.one("csTransitionEnd", function() {
                    t.removeClass("collapsing").addClass("collapse in").height("")
                }).height(t[0].scrollHeight).csEmulateTransitionEnd(350)
            }

            function i(t) {
                t.height(t.height())[0].offsetHeight, t.addClass("collapsing").removeClass("collapse").removeClass("in"), t.height(0).one("csTransitionEnd", function() {
                    t.removeClass("collapsing").addClass("collapse")
                }).csEmulateTransitionEnd(350)
            }
            var a = t.closest("[data-cs-collapse-group]").find("[data-cs-collapse-content]");
            if (a.length && !a.hasClass("collapsing")) {
                var o = a.hasClass("collapse in");
                "undefined" == typeof e && (e = !o), t.toggleClass("collapsed", !e), e && !o && n(a), !e && o && i(a)
            }
        }
        t(document).on("click", "[data-cs-collapse-toggle]", function(n) {
            var i = t(this);
            e(i);
            var a = i.closest("[data-cs-collapse-linked]").find("[data-cs-collapse-toggle]").not(this);
            if (!a.length) {
                var o = i.data("cs-collapse-parent");
                o && (a = i.closest(o).find("[data-cs-collapse-toggle]").not(this))
            }
            a.each(function() {
                e(t(this), !1)
            })
        })
    }), jQuery(document).ready(function(t) {
        var e = t(window),
            n = e.height();
        t(this);
        e.resize(function() {
            n = e.height()
        }), t.fn.parallaxContentBand = function(i, a) {
            function o() {
                var t = e.scrollTop();
                r.each(function() {
                    var e = r.offset().top,
                        o = r.outerHeight();
                    t > e + o || e > t + n || r.css("background-position", i + " " + Math.floor((s - t) * a) + "px")
                })
            }
            var s, r = t(this);
            r.each(function() {
                s = r.offset().top
            }), e.resize(function() {
                r.each(function() {
                    s = r.offset().top
                })
            }), e.bind("scroll", o).resize(o), o()
        }
    }), window.xData = window.xData || {},
    function(t, e) {
        var n, i;
        i = {
            map: function(t, e) {
                n.mappedFunctions[t] = e
            },
            process: function() {
                e(n).trigger("ready")
            }
        }, n = {
            mappedFunctions: [],
            init: function() {
                e(this).on("ready", this.processElements)
            },
            processElements: function(t, i) {
                var a = i ? i : e("body");
                a.find("[data-x-element]").each(function(t, i) {
                    if (!e(i).data("x-initialized")) {
                        var a = e(i).data("x-params") || {};
                        callback = n.lookupCallback(e(i).data("x-element")), callback && callback.call(i, a), e(i).data("x-initialized", !0)
                    }
                })
            },
            lookupCallback: function(t) {
                return this.mappedFunctions[t] || function() {
                    console.log("Cornerstone element not found.")
                }
            }
        }, n.init(), e(function(t) {
            i.process()
        }), t.base = n, t.api = i, t.fn = {}
    }(xData, jQuery),
    function(t) {
        function e() {
            var t = document.createElement("div"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in e)
                if (void 0 !== t.style[n]) return {
                    end: e[n]
                };
            return !1
        }
        t.fn.csEmulateTransitionEnd = function(e) {
            var n = !1,
                i = this;
            return t(this).one("csTransitionEnd", function() {
                n = !0
            }), setTimeout(function() {
                n || t(i).trigger(t.support.transition.end)
            }, e), this
        }, t(function() {
            t.support.transition = e(), t.support.transition && (t.event.special.csTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(e) {
                    return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery),
    function(t) {
        function e(t, e, n, i) {
            n = "undefined" == typeof n ? 0 : n, i = "undefined" == typeof i ? 0 : i;
            var a = n * i,
                o = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            t.delay(a).queue(function() {
                t.removeClass("animated-hide").addClass(e).one(o, function() {
                    t.removeClass(e)
                }).dequeue()
            })
        }

        function n(e) {
            var n = t(this),
                i = function() {
                    n.hasClass("parallax") && (csModernizr.touchevents ? n.css("background-attachment", "scroll") : (n.hasClass("bg-image") && (speed = .1), n.hasClass("bg-pattern") && (speed = .3), speed && n.parallaxContentBand("50%", speed)))
                };
            "complete" === document.readyState ? i() : jQuery(window).load(i)
        }
        xData.api.map("card", function(e) {
                function n(t) {
                    o.toggleClass("flipped")
                }

                function i(t) {
                    o.addClass("flipped")
                }

                function a(t) {
                    o.removeClass("flipped")
                }
                var o = t(this);
                csModernizr.preserve3d && o.addClass("flip-3d"), o.on("click", n), o.on("mouseenter", i), o.on("mouseleave", a), o.on("touchstart", function(t) {
                    o.off("touchend", n), o.on("touchend", n)
                }), o.on("touchmove", function() {
                    o.off("touchend", n)
                }), o.one("touchstart", function(t) {
                    o.off("click", n), o.off("mouseenter", i), o.off("mouseleave", a)
                }), o.on("click touchend", "a", function(t) {
                    console.log("click link"), t.stopPropagation()
                }), o.on("cs:setcardheight", function() {
                    var e = t(this),
                        n = e.find(".x-face-outer.front"),
                        i = n.find(".x-face-content").outerHeight(),
                        a = parseInt(n.css("border-top-width"), 10),
                        o = parseInt(n.css("border-bottom-width"), 10),
                        s = i + a + o,
                        r = e.find(".x-face-outer.back"),
                        l = r.find(".x-face-content").outerHeight(),
                        c = parseInt(r.css("border-top-width"), 10),
                        u = parseInt(r.css("border-bottom-width"), 10),
                        d = l + c + u,
                        p = Math.max(s, d);
                    e.find(".x-card-inner").css({
                        height: p
                    })
                }), o.trigger("cs:setcardheight"), t(window).on("load resize", function() {
                    o.trigger("cs:setcardheight")
                })
            }), xData.api.map("column", function(e) {
                if (e.fade) {
                    var n = t(this),
                        i = n.parent();
                    i.waypoint(function() {
                        n.css({
                            opacity: "1",
                            transform: "translate(0, 0)"
                        })
                    }, {
                        offset: "65%",
                        triggerOnce: !0
                    })
                }
            }), xData.api.map("counter", function(e) {
                t(this).waypoint(function() {
                    var n = t(this).find(".number");
                    e.numStart && e.numStart > 0 && n.prop("number", e.numStart), n.animateNumber({
                        number: e.numEnd
                    }, e.numSpeed)
                }, {
                    offset: "85%",
                    triggerOnce: !0
                })
            }), xData.api.map("creative_cta", function(e) {
                var n = t(this);
                n.children(".graphic").css("transform", "translate(-50%, -50%) scale(0)"), n.on("mouseenter", function() {
                    t(this).css({
                        "background-color": e.bg_color_hover
                    }).children(".graphic").css("transform", "translate(-50%, -50%) scale(1)")
                }), n.on("mouseleave", function() {
                    t(this).css({
                        "background-color": e.bg_color
                    }).children(".graphic").css("transform", "translate(-50%, -50%) scale(0)")
                })
            }), xData.api.map("extra", function(e) {
                if ("tooltip" === e.type) {
                    var n = {
                        animation: !0,
                        html: !1,
                        placement: e.placement,
                        trigger: e.trigger,
                        delay: {
                            show: 0,
                            hide: 0
                        }
                    };
                    e.title && "" !== e.title ? n.title = e.title : e.content && "" !== e.content && (n.title = e.content), t(this).tooltip(n)
                }
                if ("popover" === e.type) {
                    var i = {
                        animation: !0,
                        html: !1,
                        placement: e.placement,
                        trigger: e.trigger,
                        content: e.content,
                        delay: {
                            show: 0,
                            hide: 0
                        }
                    };
                    e.title && "" !== e.title && (i.title = e.title), t(this).popover(i)
                }
            }), jQuery(document).ready(function(t) {
                t('[data-toggle="tooltip"]').tooltip({
                    animation: !0,
                    html: !1,
                    delay: {
                        show: 0,
                        hide: 0
                    }
                }), t('[data-toggle="popover"]').popover({
                    animation: !0,
                    html: !1,
                    delay: {
                        show: 0,
                        hide: 0
                    }
                })
            }),
            xData.api.map("feature_box", function(n) {
                var i = this;
                n.child !== !0 && "none" !== n.graphicAnimation && t(i).waypoint(function() {
                    setTimeout(function() {
                        var a = t(i).find(".x-feature-box-graphic-outer"),
                            o = "animated " + n.graphicAnimation;
                        e(a, o)
                    }, n.graphicAnimationDelay)
                }, {
                    offset: n.graphicAnimationOffset + "%",
                    triggerOnce: !0
                })
            }), xData.api.map("feature_list", function(n) {
                var i = this,
                    a = t(i).children().first().data("x-params"),
                    o = 0;
                ("none" !== a.graphicAnimation || "none" !== a.connectorAnimation) && t(i).waypoint(function() {
                    setTimeout(function() {
                        t(i).children("li").each(function() {
                            var i = t(this);
                            if ("none" !== a.graphicAnimation) {
                                var s = i.find(".x-feature-box-graphic-outer"),
                                    r = "animated " + a.graphicAnimation;
                                e(s, r, o++, n.animationDelayBetween)
                            }
                            if ("none" !== a.connectorAnimation) {
                                var l = "animated " + a.connectorAnimation;
                                if ("middle" === a.alignV) {
                                    var c = i.children(".lower"),
                                        u = i.next().children(".upper");
                                    e(c, l, o, n.animationDelayBetween), e(u, l, o++, n.animationDelayBetween)
                                } else {
                                    var d = i.children(".full");
                                    e(d, l, o++, n.animationDelayBetween)
                                }
                            }
                        })
                    }, n.animationDelayInitial)
                }, {
                    offset: n.animationOffset + "%",
                    triggerOnce: !0
                })
            }), xData.fn.setMarkers = function(e) {
                var n = [],
                    i = [];
                t(this).find(".x-google-map-marker").each(function(a, o) {
                    var s = t(o).data("x-params"),
                        r = new google.maps.Marker({
                            map: e,
                            position: new google.maps.LatLng(s.lat, s.lng),
                            infoWindowIndex: a,
                            icon: s.image
                        });
                    if (n[a] = r, "" !== s.markerInfo) {
                        var l = new google.maps.InfoWindow({
                            content: s.markerInfo,
                            maxWidth: 200
                        });
                        i[a] = l, s.startOpen && l.open(e, r), google.maps.event.addListener(n[a], "click", function() {
                            l.open(e, this)
                        })
                    }
                })
            }, xData.api.map("google_map", function(e) {
                var n = t(this).find(".x-google-map-inner"),
                    i = e.lat,
                    a = e.lng,
                    o = new google.maps.LatLng(i, a),
                    s = e.drag,
                    r = parseInt(e.zoom),
                    l = e.zoomControl,
                    c = e.hue,
                    u = [{
                        featureType: "all",
                        elementType: "all",
                        stylers: [{
                            hue: c ? c : null
                        }]
                    }, {
                        featureType: "water",
                        elementType: "all",
                        stylers: [{
                            hue: c ? c : null
                        }, {
                            saturation: 0
                        }, {
                            lightness: 50
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }],
                    d = {
                        scrollwheel: !1,
                        draggable: s === !0,
                        zoomControl: l === !0,
                        disableDoubleClickZoom: !1,
                        disableDefaultUI: !0,
                        zoom: r,
                        center: o,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    p = new google.maps.StyledMapType(u, {
                        name: "Styled Map"
                    }),
                    h = new google.maps.Map(n[0], d);
                h.mapTypes.set("map_style", p), h.setMapTypeId("map_style"), xData.fn.setMarkers && xData.fn.setMarkers.call(this, h)
            }), xData.api.map("google_map_marker", function(t) {}), t(".x-widgetbar").on("shown.bs.collapse", function() {
                "undefined" != typeof google && google.hasOwnProperty("maps") && google.maps.event.trigger(window, "resize", {})
            }), xData.api.map("lightbox", function(t) {
                if (!t.disable && !xData.isPreview) {
                    var e = {
                        skin: "light",
                        overlay: {
                            opacity: t.opacity,
                            blur: !0
                        },
                        styles: {
                            prevScale: t.prevScale,
                            prevOpacity: t.prevOpacity,
                            nextScale: t.nextScale,
                            nextOpacity: t.nextOpacity
                        },
                        path: t.orientation,
                        controls: {
                            thumbnail: t.thumbnails
                        }
                    };
                    t.deeplink && (e.linkId = "gallery-image"), jQuery(t.selector).iLightBox(e)
                }
            }), xData.api.map("x_mejs", function(e) {
                function n(e) {
                    e.mediaelementplayer({
                        pluginPath: _wpmejsSettings.pluginPath,
                        startVolume: 1,
                        features: a,
                        audioWidth: "100%",
                        audioHeight: "32",
                        audioVolume: "vertical",
                        videoWidth: "100%",
                        videoHeight: "100%",
                        videoVolume: "vertical",
                        pauseOtherPlayers: !1,
                        alwaysShowControls: !0,
                        setDimensions: !1,
                        backgroundPlayer: s,
                        success: function(e, n, i) {
                            function a() {
                                var n = t("#" + e.id + "_container"),
                                    i = n.outerWidth(),
                                    a = n.outerHeight();
                                e.setVideoSize(i, a)
                            }
                            var s = !0,
                                r = !0,
                                l = i.controls.find(".mejs-volume-button");
                            if (e.addEventListener("canplay", function() {
                                    e.attributes.hasOwnProperty("autoplay") && s && (e.play(), s = !1), e.attributes.hasOwnProperty("muted") && r && (e.setMuted(!0), r = !1)
                                }), e.attributes.hasOwnProperty("muted") && l.hasClass("mejs-mute") && l.removeClass("mejs-mute").addClass("mejs-unmute"), e.addEventListener("ended", function() {
                                    e.attributes.hasOwnProperty("loop") && e.play()
                                }), e.addEventListener("play", function() {
                                    var t;
                                    for (t in mejs.players) {
                                        var e = mejs.players[t];
                                        e.id == i.id || e.options.backgroundPlayer || e.media.paused || e.media.ended || e.pause(), e.hasFocus = !1
                                    }
                                }), i.isVideo === !0 && !i.options.backgroundPlayer) {
                                var c = function() {
                                        i.controls.stop().animate({
                                            opacity: 1
                                        }, 150)
                                    },
                                    u = function() {
                                        i.controls.stop().animate({
                                            opacity: 0
                                        }, 150)
                                    };
                                e.addEventListener("playing", function() {
                                    i.container.hover(c, u)
                                }), e.addEventListener("pause", function() {
                                    i.container.off("mouseenter mouseleave"), c()
                                })
                            }
                            i.isVideo === !0 && i.options.backgroundPlayer && e.addEventListener("playing", function() {
                                e.setMuted(!0), t(o).trigger("xmejs:bgvideoready")
                            }), t(i.container).on("exitedfullscreen", function() {
                                t(e).removeAttr("style")
                            }), i.isVideo === !0 && ("flash" === e.pluginType || "silverlight" == e.pluginType) && (a(), t(o).on("xmejs:bgvideosize", a), t(window).on("resize", a))
                        },
                        error: function() {
                            console.warn("MEJS media error.")
                        }
                    })
                }

                function i() {
                    var e = t(this),
                        n = mejs.players[e.find(".mejs-container").attr("id")],
                        i = e.hasClass("vimeo") || e.hasClass("youtube"),
                        a = i ? ".me-plugin" : "video",
                        o = n.media.videoWidth,
                        s = n.media.videoHeight,
                        r = i || 0 === o ? 1280 : o,
                        l = i || 0 === s ? 720 : s,
                        c = e.outerWidth(),
                        u = e.outerHeight(),
                        d = c / r,
                        p = u / l,
                        h = d > p ? d : p,
                        f = Math.ceil(h * r + 20),
                        v = Math.ceil(h * l + 20),
                        m = Math.ceil((f - c) / 2),
                        g = Math.ceil((v - u) / 2),
                        y = m + 20 > c ? c - 20 : m,
                        b = g + 20 > u ? u - 20 : g;
                    e.find(a).width(f), e.find(a).height(v), e.find(".mejs-mediaelement").scrollLeft(y), e.find(".mejs-mediaelement").scrollTop(b), e.hasClass("transparent") && n.media.addEventListener("timeupdate", function w() {
                        e.trigger("xmejs:bgvideosize").removeClass("transparent"), n.media.removeEventListener("timeupdate", w)
                    })
                }
                var a, o = this,
                    s = t(o).hasClass("bg"),
                    r = t(o).find(".x-mejs").hasClass("advanced-controls");
                if (t.each(["video/x-ms-wmv", "audio/x-ms-wma"], function(e, n) {
                        t.inArray(n, mejs.plugins.silverlight[0].types) || mejs.plugins.silverlight[0].types.push(n)
                    }), s) {
                    if (a = [], csModernizr.touchevents) t(o).addClass("poster").css({
                        "background-image": "url(" + e.poster + ")"
                    }), setTimeout(function() {
                        t(o).removeClass("transparent")
                    }, 500);
                    else {
                        var l = t(o).find('script[type="text/template"]');
                        l.after(l.html()).remove()
                    }
                    t(o).on("xmejs:bgvideoready", i), t(window).on("resize", function() {
                        o && i.call(o)
                    })
                } else a = r ? ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"] : ["playpause", "progress"];
                t(o).find(".x-mejs").each(function(e) {
                    var i = t(this);
                    setTimeout(function() {
                        n(i)
                    }, e)
                })
            }), xData.api.map("recent_posts", function(e) {
                var n = this;
                e.fade && t(n).waypoint(function() {
                    t(this).find("a").each(function(e, n) {
                        t(n).delay(90 * e).animate({
                            opacity: "1"
                        }, 750, "easeOutExpo")
                    }), setTimeout(function() {
                        t(this).addClass("complete")
                    }, 90 * t(this).find("a").length + 400)
                }, {
                    offset: "75%",
                    triggerOnce: !0
                })
            }), xData.api.map("responsive_text", function(e) {
                var n = {};
                "" !== e.minFontSize && (n.minFontSize = e.minFontSize), "" !== e.maxFontSize && (n.maxFontSize = e.maxFontSize), t(e.selector).csFitText(e.compression, n)
            }), xData.api.map("section", n), xData.api.map("content_band", n), xData.api.map("skill_bar", function(e) {
                t(this).waypoint(function() {
                    t(this).find(".bar").animate({
                        width: e.percent
                    }, 750, "easeInOutExpo")
                }, {
                    offset: "95%",
                    triggerOnce: !0
                })
            }), xData.api.map("slider", function(t) {
                var e = jQuery(this),
                    n = function() {
                        e.flexslider({
                            selector: ".x-slides > li",
                            prevText: '<i class="x-icon-chevron-left" data-x-icon="&#xf053;"></i>',
                            nextText: '<i class="x-icon-chevron-right" data-x-icon="&#xf054;"></i>',
                            animation: t.animation,
                            controlNav: t.controlNav,
                            directionNav: t.prevNextNav,
                            slideshowSpeed: parseInt(t.slideTime),
                            animationSpeed: parseInt(t.slideSpeed),
                            slideshow: t.slideshow,
                            randomize: t.random,
                            touch: t.touch,
                            pauseOnHover: t.pauseOnHover,
                            useCSS: !0,
                            video: !0,
                            smoothHeight: !0,
                            easing: "easeInOutExpo"
                        })
                    };
                "complete" === document.readyState ? n() : jQuery(window).load(n)
            }), xData.api.map("tab_nav", function(e) {
                function n(t, e) {
                    i.find("li.x-nav-tabs-item").removeClass("active"), o.removeClass("active"), a.find('.x-tab-pane[data-cs-tab-index="' + t + '"]').addClass("active"), e || (e = i.find('li.x-nav-tabs-item a[data-cs-tab-toggle="' + t + '"]')), e.parent().addClass("active")
                }
                var i = t(this),
                    a = i.next(".x-tab-content"),
                    o = a.find(".x-tab-pane"),
                    s = a.find(".x-tab-pane.active").first();
                s.length || (s = a.find(".x-tab-pane").first()), n(s.data("cs-tab-index")), "vertical" === e.orientation && a.css({
                    minHeight: i.outerHeight()
                }), i.on("click", "a[data-cs-tab-toggle]", function(e) {
                    e.preventDefault();
                    var i = t(this);
                    n(i.data("cs-tab-toggle"), i)
                })
            }), xData.api.map("text_type", function(e) {
                t(this).find(".text").typed({
                    strings: e.strings,
                    typeSpeed: e.type_speed,
                    startDelay: e.start_delay,
                    backSpeed: e.back_speed,
                    backDelay: e.back_delay,
                    loop: e.loop,
                    showCursor: e.show_cursor,
                    cursorChar: e.cursor
                })
            })
    }(jQuery);;
! function(a, b) {
    "use strict";

    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++)
                if (d = i[c], !d.getAttribute("data-secret")) {
                    if (f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f), g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
                } else;
        }
    }
    var d = !1,
        e = !1;
    if (b.querySelector)
        if (a.addEventListener) d = !0;
    if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
        if (a.wp.receiveEmbedMessage = function(c) {
                var d = c.data;
                if (d.secret || d.message || d.value)
                    if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                        var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                            k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                        for (e = 0; e < k.length; e++) k[e].style.display = "none";
                        for (e = 0; e < j.length; e++)
                            if (f = j[e], c.source === f.contentWindow) {
                                if (f.removeAttribute("style"), "height" === d.message) {
                                    if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
                                    else if (~~g < 200) g = 200;
                                    f.height = g
                                }
                                if ("link" === d.message)
                                    if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
                                        if (b.activeElement === f) a.top.location.href = d.value
                            } else;
                    }
            }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);;

function load_scripts_and_css(a) {
    var b = {};
    jQuery.each(a.css, function(a, c) {
        b["ig_css_" + a] = 1
    }), jQuery.each(a.scripts, function(a, c) {
        b["ig_script_" + a] = 1
    });
    var c = function(c) {
        var d = c.target.id || "";
        "" != d && b.hasOwnProperty(d) && delete b[d], jQuery.isEmptyObject(b) && (jQuery(window).trigger("scripts_loaded.icegram"), jQuery(function() {
            window.icegram = new Icegram, window.icegram.init(a), jQuery("body").addClass("ig_" + icegram_pre_data.post_obj.device), icegram_timing.end = Date.now()
        }))
    };
    jQuery.each(a.css, function(a, b) {
        jQuery("<link>").attr("type", "text/css").attr("rel", "stylesheet").attr("id", "ig_css_" + a).attr("media", "all").appendTo("head").on("load", c).attr("href", b)
    });
    var d = a.scripts.shift();
    jQuery("<script>").attr("type", "text/javascript").attr("id", "ig_script_0").appendTo("body").on("load", function(b) {
        c(b), jQuery.each(a.scripts, function(a, b) {
            jQuery("<script>").attr("type", "text/javascript").attr("id", "ig_script_" + (a + 1)).appendTo("body").on("load", c).attr("src", b)
        })
    }).attr("src", d)
}
try {
    var icegram_data, icegram_timing = {};
    icegram_pre_data.post_obj.referral_url = window.location.href, icegram_timing.start = Date.now(), "yes" === icegram_pre_data.post_obj.cache_compatibility ? (jQuery.ajax({
        url: icegram_pre_data.ajax_url,
        type: "POST",
        async: !0,
        cache: !1,
        data: icegram_pre_data.post_obj,
        dataType: "json",
        success: function(a) {
            a ? (icegram_data = a, load_scripts_and_css(icegram_data)) : jQuery(".ig_inline_container:empty").remove()
        },
        error: function(a) {}
    }), jQuery(window).on("init.icegram", function(a, b) {
        b && jQuery.each(b.messages, function(a, b) {
            b.data.assets && (jQuery.each(b.data.assets.styles || [], function(a, b) {
                var c = jQuery("<div/>").html(b).find("link").attr("href");
                c && 0 == jQuery('link[href="' + c + '"]').length && jQuery("body").append(b)
            }), jQuery.each(b.data.assets.scripts || [], function(a, b) {
                var c = jQuery("<div/>").html("<script " + b).find("script").attr("src");
                c && 0 == jQuery('script[src="' + c + '"]').length && jQuery("body").append("<script " + b)
            }))
        })
    })) : "undefined" != typeof icegram_data && load_scripts_and_css(icegram_data), jQuery(window).on("init.icegram", function(a, b) {
        b && jQuery.each(b.messages, function(a, b) {
            "yes" == b.data.use_custom_code && "undefined" != typeof b.data.custom_js && jQuery("body").append(b.data.custom_js)
        }), jQuery("body").find(".trigger_onclick").length && jQuery.each(jQuery("body").find(".trigger_onclick"), function(a, c) {
            var d = "",
                e = jQuery(c).data("campaigns"),
                f = b.get_message_by_campaign_id(e);
            jQuery.each(f, function(a, b) {
                d += "icegram.get_message_by_id(" + b.data.id + ").show();"
            }), jQuery(c).children().length ? jQuery(c).children().attr("onclick", d) : jQuery(c).attr("onclick", d)
        })
    })
} catch (err) {
    console.log(err)
}