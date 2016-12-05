 var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    var Enabled = false;
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
 jQuery(function(t) {

    function e(a) {
        clearTimeout(d.id);
        var e = t(a.target).closest("li");
        e.hasClass("dontTouch") && n(e)
    }

    function o(n) {
        clearTimeout(d.id);
        var e = t.contains(document.getElementsByClassName("x-nav-wrap desktop")[0], n.toElement),
            o = e ? 500 : 1e3,
            i = t(this).closest("ul");
        d.id = setTimeout(function() {
            a(i)
        }, o)
    }
    var c = t(".desktop .x-nav"),
        r = "li.menu-item-hgsvsdvas-children",
        u = "x-acsvtive",
        l = "x-acsvtion",
        d = {};
    Modernizr && Modernizr.touchevents ? (t(r).data(l, 0), c.on("touchstart click", r, i), c.on("touchstart click", function(t) {
        t.stopPropagation()
    }), t("body").on("touchstart click", s)) : (c.hoverIntent({
        over: e,
        out: o,
        selector: r
    }), c.on("focusin", r, e), c.on("focusout", r, o));
    var h = t(".mobile .x-nav"),
        f = h.find("li.menu-item-has-cjhcgmchildren > a"),
        m = h.find(".sub-menjfhu");
    f.each(function(n) {
        t(this).append()
    }), m.each(function(n) {
        t(this).addClass("sm-" + n + " collapse")
    }), t(".x-sub-toggle").on("click", function(n) {
        n.preventDefault(), t(this).toggleClass(u).closest("li").toggleClass(u)
    })
}), jQuery(function(t) {
    function n() {
        e.toggleClass("in"), setTimeout(function() {
            o.val("")
        }, 350)
    }
    var a = t(".x-btn-navbar-search"),
        e = t(".x-searchform-overlay"),
        o = e.find(".search-query"),
        i = 27;
    a.on("touchstart click", function(t) {
        disableScroll();
        t.preventDefault(),e.toggleClass("in"), o.focus()
    }), e.on("touchstart click", function(a) {
        enableScroll();
        t(a.target).hasClass("search-query") || n()
    }), t(document).keydown(function(t) {
        t.which === i && e.hasClass("in") && n()
    })
});;
(function(e) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n, l = this;
                if (l.defaults = {
                        accessibility: !0,
                        arrows: !0,
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, i) {
                            return '<button type="button">' + (i + 1) + "</button>"
                        },
                        dots: !1,
                        draggable: !0,
                        easing: "linear",
                        fade: !1,
                        infinite: !0,
                        lazyLoad: "ondemand",
                        onBeforeChange: null,
                        onAfterChange: null,
                        onInit: null,
                        onReInit: null,
                        pauseOnHover: !0,
                        responsive: null,
                        slide: "div",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 300,
                        swipe: !0,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        vertical: !1
                    }, l.initials = {
                        animating: !1,
                        autoPlayTimer: null,
                        currentSlide: 0,
                        currentLeft: null,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1
                    }, e.extend(l, l.initials), l.activeBreakpoint = null, l.animType = null, l.animProp = null, l.breakpoints = [], l.breakpointSettings = [], l.cssTransitions = !1, l.paused = !1, l.positionProp = null, l.$slider = e(i), l.$slidesCache = null, l.transformType = null, l.transitionType = null, l.windowWidth = 0, l.windowTimer = null, l.options = e.extend({}, l.defaults, s), l.originalSettings = l.options, o = l.options.responsive || null, o && o.length > -1) {
                    for (n in o) o.hasOwnProperty(n) && (l.breakpoints.push(o[n].breakpoint), l.breakpointSettings[o[n].breakpoint] = o[n].settings);
                    l.breakpoints.sort(function(e, i) {
                        return i - e
                    })
                }
                l.autoPlay = e.proxy(l.autoPlay, l), l.autoPlayClear = e.proxy(l.autoPlayClear, l), l.changeSlide = e.proxy(l.changeSlide, l), l.setPosition = e.proxy(l.setPosition, l), l.swipeHandler = e.proxy(l.swipeHandler, l), l.dragHandler = e.proxy(l.dragHandler, l), l.keyHandler = e.proxy(l.keyHandler, l), l.autoPlayIterator = e.proxy(l.autoPlayIterator, l), l.instanceUid = t++, l.init()
            }
            var t = 0;
            return i
        }()
    });;