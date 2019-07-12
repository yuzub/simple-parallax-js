// https://boundlesstheatre.org.uk/15-25/projects/
! function() {
  for (var t, e = function() {}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], o = i.length, s = window.console = window.console || {}; o--;) t = i[o], s[t] || (s[t] = e)
}(), ! function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
  "use strict";
  var e = window.Slick || {};
  e = function() {
      function e(e, o) {
          var s, n = this;
          n.defaults = {
              accessibility: !0,
              adaptiveHeight: !1,
              appendArrows: t(e),
              appendDots: t(e),
              arrows: !0,
              asNavFor: null,
              prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
              nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
              autoplay: !1,
              autoplaySpeed: 3e3,
              centerMode: !1,
              centerPadding: "50px",
              cssEase: "ease",
              customPaging: function(e, i) {
                  return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
              },
              dots: !1,
              dotsClass: "slick-dots",
              draggable: !0,
              easing: "linear",
              edgeFriction: .35,
              fade: !1,
              focusOnSelect: !1,
              infinite: !0,
              initialSlide: 0,
              lazyLoad: "ondemand",
              mobileFirst: !1,
              pauseOnHover: !0,
              pauseOnFocus: !0,
              pauseOnDotsHover: !1,
              respondTo: "window",
              responsive: null,
              rows: 1,
              rtl: !1,
              slide: "",
              slidesPerRow: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 500,
              swipe: !0,
              swipeToSlide: !1,
              touchMove: !0,
              touchThreshold: 5,
              useCSS: !0,
              useTransform: !0,
              variableWidth: !1,
              vertical: !1,
              verticalSwiping: !1,
              waitForAnimate: !0,
              zIndex: 1e3
          }, n.initials = {
              animating: !1,
              dragging: !1,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
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
              transformsEnabled: !1,
              unslicked: !1
          }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = t(e).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.instanceUid = i++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
      }
      var i = 0;
      return e
  }(), e.prototype.activateADA = function() {
      var t = this;
      t.$slideTrack.find(".slick-active").attr({
          "aria-hidden": "false"
      }).find("a, input, button, select").attr({
          tabindex: "0"
      })
  }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, o) {
      var s = this;
      if ("boolean" == typeof i) o = i, i = null;
      else if (0 > i || i >= s.slideCount) return !1;
      s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? t(e).appendTo(s.$slideTrack) : o ? t(e).insertBefore(s.$slides.eq(i)) : t(e).insertAfter(s.$slides.eq(i)) : o === !0 ? t(e).prependTo(s.$slideTrack) : t(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, i) {
          t(i).attr("data-slick-index", e)
      }), s.$slidesCache = s.$slides, s.reinit()
  }, e.prototype.animateHeight = function() {
      var t = this;
      if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
          var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
          t.$list.animate({
              height: e
          }, t.options.speed)
      }
  }, e.prototype.animateSlide = function(e, i) {
      var o = {},
          s = this;
      s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
          left: e
      }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
          top: e
      }, s.options.speed, s.options.easing, i) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), t({
          animStart: s.currentLeft
      }).animate({
          animStart: e
      }, {
          duration: s.options.speed,
          easing: s.options.easing,
          step: function(t) {
              t = Math.ceil(t), s.options.vertical === !1 ? (o[s.animType] = "translate(" + t + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + t + "px)", s.$slideTrack.css(o))
          },
          complete: function() {
              i && i.call()
          }
      })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), i && setTimeout(function() {
          s.disableTransition(), i.call()
      }, s.options.speed))
  }, e.prototype.getNavTarget = function() {
      var e = this,
          i = e.options.asNavFor;
      return i && null !== i && (i = t(i).not(e.$slider)), i
  }, e.prototype.asNavFor = function(e) {
      var i = this,
          o = i.getNavTarget();
      null !== o && "object" == typeof o && o.each(function() {
          var i = t(this).slick("getSlick");
          i.unslicked || i.slideHandler(e, !0)
      })
  }, e.prototype.applyTransition = function(t) {
      var e = this,
          i = {};
      e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.autoPlay = function() {
      var t = this;
      t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
  }, e.prototype.autoPlayClear = function() {
      var t = this;
      t.autoPlayTimer && clearInterval(t.autoPlayTimer)
  }, e.prototype.autoPlayIterator = function() {
      var t = this,
          e = t.currentSlide + t.options.slidesToScroll;
      t.paused || t.interrupted || t.focussed || (t.options.infinite === !1 && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 === 0 && (t.direction = 1))), t.slideHandler(e))
  }, e.prototype.buildArrows = function() {
      var e = this;
      e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
          "aria-disabled": "true",
          tabindex: "-1"
      }))
  }, e.prototype.buildDots = function() {
      var e, i, o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
          for (o.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) i.append(t("<li />").append(o.options.customPaging.call(this, o, e)));
          o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
      }
  }, e.prototype.buildOut = function() {
      var e = this;
      e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
          t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
      }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
  }, e.prototype.buildRows = function() {
      var t, e, i, o, s, n, r, l = this;
      if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
          for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), t = 0; s > t; t++) {
              var a = document.createElement("div");
              for (e = 0; e < l.options.rows; e++) {
                  var d = document.createElement("div");
                  for (i = 0; i < l.options.slidesPerRow; i++) {
                      var c = t * r + (e * l.options.slidesPerRow + i);
                      n.get(c) && d.appendChild(n.get(c))
                  }
                  a.appendChild(d)
              }
              o.appendChild(a)
          }
          l.$slider.empty().append(o), l.$slider.children().children().children().css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block"
          })
      }
  }, e.prototype.checkResponsive = function(e, i) {
      var o, s, n, r = this,
          l = !1,
          a = r.$slider.width(),
          d = window.innerWidth || t(window).width();
      if ("window" === r.respondTo ? n = d : "slider" === r.respondTo ? n = a : "min" === r.respondTo && (n = Math.min(d, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
          s = null;
          for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
          null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || i) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
      }
  }, e.prototype.changeSlide = function(e, i) {
      var o, s, n, r = this,
          l = t(e.currentTarget);
      switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
          case "previous":
              s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, i);
              break;
          case "next":
              s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, i);
              break;
          case "index":
              var a = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
              r.slideHandler(r.checkNavigable(a), !1, i), l.children().trigger("focus");
              break;
          default:
              return
      }
  }, e.prototype.checkNavigable = function(t) {
      var e, i, o = this;
      if (e = o.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
      else
          for (var s in e) {
              if (t < e[s]) {
                  t = i;
                  break
              }
              i = e[s]
          }
      return t
  }, e.prototype.cleanUpEvents = function() {
      var e = this;
      e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.cleanUpSlideEvents = function() {
      var e = this;
      e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.cleanUpRows = function() {
      var t, e = this;
      e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
  }, e.prototype.clickHandler = function(t) {
      var e = this;
      e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
  }, e.prototype.destroy = function(e) {
      var i = this;
      i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
          t(this).attr("style", t(this).data("originalStyling"))
      }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
  }, e.prototype.disableTransition = function(t) {
      var e = this,
          i = {};
      i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.fadeSlide = function(t, e) {
      var i = this;
      i.cssTransitions === !1 ? (i.$slides.eq(t).css({
          zIndex: i.options.zIndex
      }), i.$slides.eq(t).animate({
          opacity: 1
      }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
          opacity: 1,
          zIndex: i.options.zIndex
      }), e && setTimeout(function() {
          i.disableTransition(t), e.call()
      }, i.options.speed))
  }, e.prototype.fadeSlideOut = function(t) {
      var e = this;
      e.cssTransitions === !1 ? e.$slides.eq(t).animate({
          opacity: 0,
          zIndex: e.options.zIndex - 2
      }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
          opacity: 0,
          zIndex: e.options.zIndex - 2
      }))
  }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
      var e = this;
      null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
  }, e.prototype.focusHandler = function() {
      var e = this;
      e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
          i.stopImmediatePropagation();
          var o = t(this);
          setTimeout(function() {
              e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
          }, 0)
      })
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
      var t = this;
      return t.currentSlide
  }, e.prototype.getDotCount = function() {
      var t = this,
          e = 0,
          i = 0,
          o = 0;
      if (t.options.infinite === !0)
          for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else if (t.options.centerMode === !0) o = t.slideCount;
      else if (t.options.asNavFor)
          for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else o = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
      return o - 1
  }, e.prototype.getLeft = function(t) {
      var e, i, o, s = this,
          n = 0;
      return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), s.options.infinite === !0 ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = i * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll !== 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (t - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * i * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (t + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), s.options.centerMode === !0 && s.options.infinite === !0 ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : s.options.centerMode === !0 && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = s.options.vertical === !1 ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + n, s.options.variableWidth === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, s.options.centerMode === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (s.$list.width() - o.outerWidth()) / 2)), e
  }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
      var e = this;
      return e.options[t]
  }, e.prototype.getNavigableIndexes = function() {
      var t, e = this,
          i = 0,
          o = 0,
          s = [];
      for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;) s.push(i), i = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
      return s
  }, e.prototype.getSlick = function() {
      return this
  }, e.prototype.getSlideCount = function() {
      var e, i, o, s = this;
      return o = s.options.centerMode === !0 ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, s.options.swipeToSlide === !0 ? (s.$slideTrack.find(".slick-slide").each(function(e, n) {
          return n.offsetLeft - o + t(n).outerWidth() / 2 > -1 * s.swipeLeft ? (i = n, !1) : void 0
      }), e = Math.abs(t(i).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
  }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
      var i = this;
      i.changeSlide({
          data: {
              message: "index",
              index: parseInt(t)
          }
      }, e)
  }, e.prototype.init = function(e) {
      var i = this;
      t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
  }, e.prototype.initADA = function() {
      var e = this;
      e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
          "aria-hidden": "true",
          tabindex: "-1"
      }).find("a, input, button, select").attr({
          tabindex: "-1"
      }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
          t(this).attr({
              role: "option",
              "aria-describedby": "slick-slide" + e.instanceUid + i
          })
      }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(i) {
          t(this).attr({
              role: "presentation",
              "aria-selected": "false",
              "aria-controls": "navigation" + e.instanceUid + i,
              id: "slick-slide" + e.instanceUid + i
          })
      }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
  }, e.prototype.initArrowEvents = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
          message: "previous"
      }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
          message: "next"
      }, t.changeSlide))
  }, e.prototype.initDotEvents = function() {
      var e = this;
      e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
          message: "index"
      }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.initSlideEvents = function() {
      var e = this;
      e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
  }, e.prototype.initializeEvents = function() {
      var e = this;
      e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
          action: "start"
      }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
          action: "move"
      }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
          action: "end"
      }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
          action: "end"
      }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.initUI = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show()
  }, e.prototype.keyHandler = function(t) {
      var e = this;
      t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
          data: {
              message: e.options.rtl === !0 ? "next" : "previous"
          }
      }) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({
          data: {
              message: e.options.rtl === !0 ? "previous" : "next"
          }
      }))
  }, e.prototype.lazyLoad = function() {
      function e(e) {
          t("img[data-lazy]", e).each(function() {
              var e = t(this),
                  i = t(this).attr("data-lazy"),
                  o = document.createElement("img");
              o.onload = function() {
                  e.animate({
                      opacity: 0
                  }, 100, function() {
                      e.attr("src", i).animate({
                          opacity: 1
                      }, 200, function() {
                          e.removeAttr("data-lazy").removeClass("slick-loading")
                      }), r.$slider.trigger("lazyLoaded", [r, e, i])
                  })
              }, o.onerror = function() {
                  e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, i])
              }, o.src = i
          })
      }
      var i, o, s, n, r = this;
      r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), i = r.$slider.find(".slick-slide").slice(s, n), e(i), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(o))
  }, e.prototype.loadSlider = function() {
      var t = this;
      t.setPosition(), t.$slideTrack.css({
          opacity: 1
      }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
  }, e.prototype.next = e.prototype.slickNext = function() {
      var t = this;
      t.changeSlide({
          data: {
              message: "next"
          }
      })
  }, e.prototype.orientationChange = function() {
      var t = this;
      t.checkResponsive(), t.setPosition()
  }, e.prototype.pause = e.prototype.slickPause = function() {
      var t = this;
      t.autoPlayClear(), t.paused = !0
  }, e.prototype.play = e.prototype.slickPlay = function() {
      var t = this;
      t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
  }, e.prototype.postSlide = function(t) {
      var e = this;
      e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
  }, e.prototype.prev = e.prototype.slickPrev = function() {
      var t = this;
      t.changeSlide({
          data: {
              message: "previous"
          }
      })
  }, e.prototype.preventDefault = function(t) {
      t.preventDefault()
  }, e.prototype.progressiveLazyLoad = function(e) {
      e = e || 1;
      var i, o, s, n = this,
          r = t("img[data-lazy]", n.$slider);
      r.length ? (i = r.first(), o = i.attr("data-lazy"), s = document.createElement("img"), s.onload = function() {
          i.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), n.options.adaptiveHeight === !0 && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, i, o]), n.progressiveLazyLoad()
      }, s.onerror = function() {
          3 > e ? setTimeout(function() {
              n.progressiveLazyLoad(e + 1)
          }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, o]), n.progressiveLazyLoad())
      }, s.src = o) : n.$slider.trigger("allImagesLoaded", [n])
  }, e.prototype.refresh = function(e) {
      var i, o, s = this;
      o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), i = s.currentSlide, s.destroy(!0), t.extend(s, s.initials, {
          currentSlide: i
      }), s.init(), e || s.changeSlide({
          data: {
              message: "index",
              index: i
          }
      }, !1)
  }, e.prototype.registerBreakpoints = function() {
      var e, i, o, s = this,
          n = s.options.responsive || null;
      if ("array" === t.type(n) && n.length) {
          s.respondTo = s.options.respondTo || "window";
          for (e in n)
              if (o = s.breakpoints.length - 1, i = n[e].breakpoint, n.hasOwnProperty(e)) {
                  for (; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === i && s.breakpoints.splice(o, 1), o--;
                  s.breakpoints.push(i), s.breakpointSettings[i] = n[e].settings
              }
          s.breakpoints.sort(function(t, e) {
              return s.options.mobileFirst ? t - e : e - t
          })
      }
  }, e.prototype.reinit = function() {
      var e = this;
      e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
  }, e.prototype.resize = function() {
      var e = this;
      t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
          e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
      }, 50))
  }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
      var o = this;
      return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : o.slideCount - 1) : t = e === !0 ? --t : t, o.slideCount < 1 || 0 > t || t > o.slideCount - 1 ? !1 : (o.unload(), i === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
  }, e.prototype.setCSS = function(t) {
      var e, i, o = this,
          s = {};
      o.options.rtl === !0 && (t = -t), e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px", s[o.positionProp] = t, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + i + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)", o.$slideTrack.css(s)))
  }, e.prototype.setDimensions = function() {
      var t = this;
      t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
          padding: "0px " + t.options.centerPadding
      }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
          padding: t.options.centerPadding + " 0px"
      })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
      var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
      t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
  }, e.prototype.setFade = function() {
      var e, i = this;
      i.$slides.each(function(o, s) {
          e = i.slideWidth * o * -1, i.options.rtl === !0 ? t(s).css({
              position: "relative",
              right: e,
              top: 0,
              zIndex: i.options.zIndex - 2,
              opacity: 0
          }) : t(s).css({
              position: "relative",
              left: e,
              top: 0,
              zIndex: i.options.zIndex - 2,
              opacity: 0
          })
      }), i.$slides.eq(i.currentSlide).css({
          zIndex: i.options.zIndex - 1,
          opacity: 1
      })
  }, e.prototype.setHeight = function() {
      var t = this;
      if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
          var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
          t.$list.css("height", e)
      }
  }, e.prototype.setOption = e.prototype.slickSetOption = function() {
      var e, i, o, s, n, r = this,
          l = !1;
      if ("object" === t.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === t.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
      else if ("multiple" === n) t.each(o, function(t, e) {
          r.options[t] = e
      });
      else if ("responsive" === n)
          for (i in s)
              if ("array" !== t.type(r.options.responsive)) r.options.responsive = [s[i]];
              else {
                  for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                  r.options.responsive.push(s[i])
              }
      l && (r.unload(), r.reinit())
  }, e.prototype.setPosition = function() {
      var t = this;
      t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
  }, e.prototype.setProps = function() {
      var t = this,
          e = document.body.style;
      t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
  }, e.prototype.setSlideClasses = function(t) {
      var e, i, o, s, n = this;
      i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= e && t <= n.slideCount - 1 - e ? n.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + t, i.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? i.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
  }, e.prototype.setupInfinite = function() {
      var e, i, o, s = this;
      if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (i = null, s.slideCount > s.options.slidesToShow)) {
          for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) i = e - 1, t(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
          for (e = 0; o > e; e += 1) i = e, t(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
          s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
              t(this).attr("id", "")
          })
      }
  }, e.prototype.interrupt = function(t) {
      var e = this;
      t || e.autoPlay(), e.interrupted = t
  }, e.prototype.selectHandler = function(e) {
      var i = this,
          o = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
          s = parseInt(o.attr("data-slick-index"));
      return s || (s = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(s), void i.asNavFor(s)) : void i.slideHandler(s)
  }, e.prototype.slideHandler = function(t, e, i) {
      var o, s, n, r, l, a = null,
          d = this;
      return e = e || !1, d.animating === !0 && d.options.waitForAnimate === !0 || d.options.fade === !0 && d.currentSlide === t || d.slideCount <= d.options.slidesToShow ? void 0 : (e === !1 && d.asNavFor(t), o = t, a = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, d.options.infinite === !1 && d.options.centerMode === !1 && (0 > t || t > d.getDotCount() * d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, i !== !0 ? d.animateSlide(r, function() {
          d.postSlide(o)
      }) : d.postSlide(o))) : d.options.infinite === !1 && d.options.centerMode === !0 && (0 > t || t > d.slideCount - d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, i !== !0 ? d.animateSlide(r, function() {
          d.postSlide(o)
      }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), s = 0 > o ? d.slideCount % d.options.slidesToScroll !== 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll !== 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (l = d.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), d.options.fade === !0 ? (i !== !0 ? (d.fadeSlideOut(n), d.fadeSlide(s, function() {
          d.postSlide(s)
      })) : d.postSlide(s), void d.animateHeight()) : void(i !== !0 ? d.animateSlide(a, function() {
          d.postSlide(s)
      }) : d.postSlide(s))))
  }, e.prototype.startLoad = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
  }, e.prototype.swipeDirection = function() {
      var t, e, i, o, s = this;
      return t = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(e, t), o = Math.round(180 * i / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
  }, e.prototype.swipeEnd = function(t) {
      var e, i, o = this;
      if (o.dragging = !1, o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
      if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
          switch (i = o.swipeDirection()) {
              case "left":
              case "down":
                  e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                  break;
              case "right":
              case "up":
                  e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
          }
          "vertical" != i && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
      } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
  }, e.prototype.swipeHandler = function(t) {
      var e = this;
      if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
          case "start":
              e.swipeStart(t);
              break;
          case "move":
              e.swipeMove(t);
              break;
          case "end":
              e.swipeEnd(t)
      }
  }, e.prototype.swipeMove = function(t) {
      var e, i, o, s, n, r = this;
      return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || n && 1 !== n.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), s = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + o * s : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * s, r.options.verticalSwiping === !0 && (r.swipeLeft = e + o * s), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
  }, e.prototype.swipeStart = function(t) {
      var e, i = this;
      return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
      var t = this;
      null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
  }, e.prototype.unload = function() {
      var e = this;
      t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, e.prototype.unslick = function(t) {
      var e = this;
      e.$slider.trigger("unslick", [e, t]), e.destroy()
  }, e.prototype.updateArrows = function() {
      var t, e = this;
      t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, e.prototype.updateDots = function() {
      var t = this;
      null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
  }, e.prototype.visibility = function() {
      var t = this;
      t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
  }, t.fn.slick = function() {
      var t, i, o = this,
          s = arguments[0],
          n = Array.prototype.slice.call(arguments, 1),
          r = o.length;
      for (t = 0; r > t; t++)
          if ("object" == typeof s || "undefined" == typeof s ? o[t].slick = new e(o[t], s) : i = o[t].slick[s].apply(o[t].slick, n), "undefined" != typeof i) return i;
      return o
  }
}), ! function() {
  "use strict";

  function t(o) {
      if (!o) throw new Error("No options passed to Waypoint constructor");
      if (!o.element) throw new Error("No element option passed to Waypoint constructor");
      if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
      this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis
      }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
  }
  var e = 0,
      i = {};
  t.prototype.queueTrigger = function(t) {
      this.group.queueTrigger(this, t)
  }, t.prototype.trigger = function(t) {
      this.enabled && this.callback && this.callback.apply(this, t)
  }, t.prototype.destroy = function() {
      this.context.remove(this), this.group.remove(this), delete i[this.key]
  }, t.prototype.disable = function() {
      return this.enabled = !1, this
  }, t.prototype.enable = function() {
      return this.context.refresh(), this.enabled = !0, this
  }, t.prototype.next = function() {
      return this.group.next(this)
  }, t.prototype.previous = function() {
      return this.group.previous(this)
  }, t.invokeAll = function(t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var s = 0, n = e.length; n > s; s++) e[s][t]()
  }, t.destroyAll = function() {
      t.invokeAll("destroy")
  }, t.disableAll = function() {
      t.invokeAll("disable")
  }, t.enableAll = function() {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this
  }, t.refreshAll = function() {
      t.Context.refreshAll()
  }, t.viewportHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight
  }, t.viewportWidth = function() {
      return document.documentElement.clientWidth
  }, t.adapters = [], t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0
  }, t.offsetAliases = {
      "bottom-in-view": function() {
          return this.context.innerHeight() - this.adapter.outerHeight()
      },
      "right-in-view": function() {
          return this.context.innerWidth() - this.adapter.outerWidth()
      }
  }, window.Waypoint = t
}(),
function() {
  "use strict";

  function t(t) {
      window.setTimeout(t, 1e3 / 60)
  }

  function e(t) {
      this.element = t, this.Adapter = s.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop()
      }, this.waypoints = {
          vertical: {},
          horizontal: {}
      }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, s.windowContext || (s.windowContext = !0, s.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
  }
  var i = 0,
      o = {},
      s = window.Waypoint,
      n = window.onload;
  e.prototype.add = function(t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      this.waypoints[e][t.key] = t, this.refresh()
  }, e.prototype.checkEmpty = function() {
      var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
      t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
  }, e.prototype.createThrottledResizeHandler = function() {
      function t() {
          e.handleResize(), e.didResize = !1
      }
      var e = this;
      this.adapter.on("resize.waypoints", function() {
          e.didResize || (e.didResize = !0, s.requestAnimationFrame(t))
      })
  }, e.prototype.createThrottledScrollHandler = function() {
      function t() {
          e.handleScroll(), e.didScroll = !1
      }
      var e = this;
      this.adapter.on("scroll.waypoints", function() {
          (!e.didScroll || s.isTouch) && (e.didScroll = !0, s.requestAnimationFrame(t))
      })
  }, e.prototype.handleResize = function() {
      s.Context.refreshAll()
  }, e.prototype.handleScroll = function() {
      var t = {},
          e = {
              horizontal: {
                  newScroll: this.adapter.scrollLeft(),
                  oldScroll: this.oldScroll.x,
                  forward: "right",
                  backward: "left"
              },
              vertical: {
                  newScroll: this.adapter.scrollTop(),
                  oldScroll: this.oldScroll.y,
                  forward: "down",
                  backward: "up"
              }
          };
      for (var i in e) {
          var o = e[i],
              s = o.newScroll > o.oldScroll,
              n = s ? o.forward : o.backward;
          for (var r in this.waypoints[i]) {
              var l = this.waypoints[i][r];
              if (null !== l.triggerPoint) {
                  var a = o.oldScroll < l.triggerPoint,
                      d = o.newScroll >= l.triggerPoint,
                      c = a && d,
                      p = !a && !d;
                  (c || p) && (l.queueTrigger(n), t[l.group.id] = l.group)
              }
          }
      }
      for (var u in t) t[u].flushTriggers();
      this.oldScroll = {
          x: e.horizontal.newScroll,
          y: e.vertical.newScroll
      }
  }, e.prototype.innerHeight = function() {
      return this.element == this.element.window ? s.viewportHeight() : this.adapter.innerHeight()
  }, e.prototype.remove = function(t) {
      delete this.waypoints[t.axis][t.key], this.checkEmpty()
  }, e.prototype.innerWidth = function() {
      return this.element == this.element.window ? s.viewportWidth() : this.adapter.innerWidth()
  }, e.prototype.destroy = function() {
      var t = [];
      for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
      for (var o = 0, s = t.length; s > o; o++) t[o].destroy()
  }, e.prototype.refresh = function() {
      var t, e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
      this.handleScroll(), t = {
          horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left"
          },
          vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top"
          }
      };
      for (var n in t) {
          var r = t[n];
          for (var l in this.waypoints[n]) {
              var a, d, c, p, u, h = this.waypoints[n][l],
                  f = h.options.offset,
                  v = h.triggerPoint,
                  w = 0,
                  g = null == v;
              h.element !== h.element.window && (w = h.adapter.offset()[r.offsetProp]), "function" == typeof f ? f = f.apply(h) : "string" == typeof f && (f = parseFloat(f), h.options.offset.indexOf("%") > -1 && (f = Math.ceil(r.contextDimension * f / 100))), a = r.contextScroll - r.contextOffset, h.triggerPoint = Math.floor(w + a - f), d = v < r.oldScroll, c = h.triggerPoint >= r.oldScroll, p = d && c, u = !d && !c, !g && p ? (h.queueTrigger(r.backward), o[h.group.id] = h.group) : !g && u ? (h.queueTrigger(r.forward), o[h.group.id] = h.group) : g && r.oldScroll >= h.triggerPoint && (h.queueTrigger(r.forward), o[h.group.id] = h.group)
          }
      }
      return s.requestAnimationFrame(function() {
          for (var t in o) o[t].flushTriggers()
      }), this
  }, e.findOrCreateByElement = function(t) {
      return e.findByElement(t) || new e(t)
  }, e.refreshAll = function() {
      for (var t in o) o[t].refresh()
  }, e.findByElement = function(t) {
      return o[t.waypointContextKey]
  }, window.onload = function() {
      n && n(), e.refreshAll()
  }, s.requestAnimationFrame = function(e) {
      var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
      i.call(window, e)
  }, s.Context = e
}(),
function() {
  "use strict";

  function t(t, e) {
      return t.triggerPoint - e.triggerPoint
  }

  function e(t, e) {
      return e.triggerPoint - t.triggerPoint
  }

  function i(t) {
      this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
  }
  var o = {
          vertical: {},
          horizontal: {}
      },
      s = window.Waypoint;
  i.prototype.add = function(t) {
      this.waypoints.push(t)
  }, i.prototype.clearTriggerQueues = function() {
      this.triggerQueues = {
          up: [],
          down: [],
          left: [],
          right: []
      }
  }, i.prototype.flushTriggers = function() {
      for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
              s = "up" === i || "left" === i;
          o.sort(s ? e : t);
          for (var n = 0, r = o.length; r > n; n += 1) {
              var l = o[n];
              (l.options.continuous || n === o.length - 1) && l.trigger([i])
          }
      }
      this.clearTriggerQueues()
  }, i.prototype.next = function(e) {
      this.waypoints.sort(t);
      var i = s.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
      return o ? null : this.waypoints[i + 1]
  }, i.prototype.previous = function(e) {
      this.waypoints.sort(t);
      var i = s.Adapter.inArray(e, this.waypoints);
      return i ? this.waypoints[i - 1] : null
  }, i.prototype.queueTrigger = function(t, e) {
      this.triggerQueues[e].push(t)
  }, i.prototype.remove = function(t) {
      var e = s.Adapter.inArray(t, this.waypoints);
      e > -1 && this.waypoints.splice(e, 1)
  }, i.prototype.first = function() {
      return this.waypoints[0]
  }, i.prototype.last = function() {
      return this.waypoints[this.waypoints.length - 1]
  }, i.findOrCreate = function(t) {
      return o[t.axis][t.name] || new i(t)
  }, s.Group = i
}(),
function() {
  "use strict";

  function t(t) {
      this.$element = e(t)
  }
  var e = window.jQuery,
      i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
      t.prototype[i] = function() {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t)
      }
  }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
      t[o] = e[o]
  }), i.adapters.push({
      name: "jquery",
      Adapter: t
  }), i.Adapter = t
}(),
function() {
  "use strict";

  function t(t) {
      return function() {
          var i = [],
              o = arguments[0];
          return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
              var s = t.extend({}, o, {
                  element: this
              });
              "string" == typeof s.context && (s.context = t(this).closest(s.context)[0]), i.push(new e(s))
          }), i
      }
  }
  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(), ! function(t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Headroom = e()
}(this, function() {
  "use strict";

  function t(t) {
      this.callback = t, this.ticking = !1
  }

  function e(t) {
      return t && "undefined" != typeof window && (t === window || t.nodeType)
  }

  function i(t) {
      if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
      var o, s, n = t || {};
      for (s = 1; s < arguments.length; s++) {
          var r = arguments[s] || {};
          for (o in r) "object" != typeof n[o] || e(n[o]) ? n[o] = n[o] || r[o] : n[o] = i(n[o], r[o])
      }
      return n
  }

  function o(t) {
      return t === Object(t) ? t : {
          down: t,
          up: t
      }
  }

  function s(t, e) {
      e = i(e, s.options), this.lastKnownScrollY = 0, this.elem = t, this.tolerance = o(e.tolerance), this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop, this.onBottom = e.onBottom, this.onNotBottom = e.onNotBottom
  }
  var n = {
      bind: !! function() {}.bind,
      classList: "classList" in document.documentElement,
      rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, t.prototype = {
      constructor: t,
      update: function() {
          this.callback && this.callback(), this.ticking = !1
      },
      requestTick: function() {
          this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
      },
      handleEvent: function() {
          this.requestTick()
      }
  }, s.prototype = {
      constructor: s,
      init: function() {
          return s.cutsTheMustard ? (this.debouncer = new t(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
      },
      destroy: function() {
          var t = this.classes;
          this.initialised = !1, this.elem.classList.remove(t.unpinned, t.pinned, t.top, t.notTop, t.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
      },
      attachEvent: function() {
          this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
      },
      unpin: function() {
          var t = this.elem.classList,
              e = this.classes;
          !t.contains(e.pinned) && t.contains(e.unpinned) || (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this))
      },
      pin: function() {
          var t = this.elem.classList,
              e = this.classes;
          t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this))
      },
      top: function() {
          var t = this.elem.classList,
              e = this.classes;
          t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this))
      },
      notTop: function() {
          var t = this.elem.classList,
              e = this.classes;
          t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this))
      },
      bottom: function() {
          var t = this.elem.classList,
              e = this.classes;
          t.contains(e.bottom) || (t.add(e.bottom), t.remove(e.notBottom), this.onBottom && this.onBottom.call(this))
      },
      notBottom: function() {
          var t = this.elem.classList,
              e = this.classes;
          t.contains(e.notBottom) || (t.add(e.notBottom), t.remove(e.bottom), this.onNotBottom && this.onNotBottom.call(this))
      },
      getScrollY: function() {
          return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
      },
      getViewportHeight: function() {
          return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      },
      getElementPhysicalHeight: function(t) {
          return Math.max(t.offsetHeight, t.clientHeight)
      },
      getScrollerPhysicalHeight: function() {
          return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
      },
      getDocumentHeight: function() {
          var t = document.body,
              e = document.documentElement;
          return Math.max(t.scrollHeight, e.scrollHeight, t.offsetHeight, e.offsetHeight, t.clientHeight, e.clientHeight)
      },
      getElementHeight: function(t) {
          return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
      },
      getScrollerHeight: function() {
          return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
      },
      isOutOfBounds: function(t) {
          var e = 0 > t,
              i = t + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
          return e || i
      },
      toleranceExceeded: function(t, e) {
          return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e]
      },
      shouldUnpin: function(t, e) {
          var i = t > this.lastKnownScrollY,
              o = t >= this.offset;
          return i && o && e
      },
      shouldPin: function(t, e) {
          var i = t < this.lastKnownScrollY,
              o = t <= this.offset;
          return i && e || o
      },
      update: function() {
          var t = this.getScrollY(),
              e = t > this.lastKnownScrollY ? "down" : "up",
              i = this.toleranceExceeded(t, e);
          this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), t + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(t, i) ? this.unpin() : this.shouldPin(t, i) && this.pin(), this.lastKnownScrollY = t)
      }
  }, s.options = {
      tolerance: {
          up: 0,
          down: 0
      },
      offset: 0,
      scroller: window,
      classes: {
          pinned: "headroom--pinned",
          unpinned: "headroom--unpinned",
          top: "headroom--top",
          notTop: "headroom--not-top",
          bottom: "headroom--bottom",
          notBottom: "headroom--not-bottom",
          initial: "headroom"
      }
  }, s.cutsTheMustard = "undefined" != typeof n && n.rAF && n.bind && n.classList, s
}),
function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.hoverIntent && t(jQuery)
}(function(t) {
  "use strict";
  var e, i, o = {
          interval: 100,
          sensitivity: 6,
          timeout: 0
      },
      s = 0,
      n = function(t) {
          e = t.pageX, i = t.pageY
      },
      r = function(t, o, s, l) {
          return Math.sqrt((s.pX - e) * (s.pX - e) + (s.pY - i) * (s.pY - i)) < l.sensitivity ? (o.off(s.event, n), delete s.timeoutId, s.isActive = !0, t.pageX = e, t.pageY = i, delete s.pX, delete s.pY, l.over.apply(o[0], [t])) : (s.pX = e, s.pY = i, s.timeoutId = setTimeout(function() {
              r(t, o, s, l)
          }, l.interval), void 0)
      },
      l = function(t, e, i, o) {
          return delete e.data("hoverIntent")[i.id], o.apply(e[0], [t])
      };
  t.fn.hoverIntent = function(e, i, a) {
      var d = s++,
          c = t.extend({}, o);
      t.isPlainObject(e) ? (c = t.extend(c, e), t.isFunction(c.out) || (c.out = c.over)) : c = t.isFunction(i) ? t.extend(c, {
          over: e,
          out: i,
          selector: a
      }) : t.extend(c, {
          over: e,
          out: e,
          selector: i
      });
      var p = function(e) {
          var i = t.extend({}, e),
              o = t(this),
              s = o.data("hoverIntent");
          s || o.data("hoverIntent", s = {});
          var a = s[d];
          a || (s[d] = a = {
              id: d
          }), a.timeoutId && (a.timeoutId = clearTimeout(a.timeoutId));
          var p = a.event = "mousemove.hoverIntent.hoverIntent" + d;
          if ("mouseenter" === e.type) {
              if (a.isActive) return;
              a.pX = i.pageX, a.pY = i.pageY, o.off(p, n).on(p, n), a.timeoutId = setTimeout(function() {
                  r(i, o, a, c)
              }, c.interval)
          } else {
              if (!a.isActive) return;
              o.off(p, n), a.timeoutId = setTimeout(function() {
                  l(i, o, a, c.out)
              }, c.timeout)
          }
      };
      return this.on({
          "mouseenter.hoverIntent": p,
          "mouseleave.hoverIntent": p
      }, c.selector)
  }
});

function pageHeight() {
  var e = $(window).height(),
      o = body.outerHeight();
  if (e > o) {
      var i = e - o;
      $("footer").css("marginTop", i)
  }
  $(".half-star").each(function() {
      var e = $(this).width(),
          o = e - e / 10;
      $(this).width(o)
  })
}

function sizeSlider() {
  var e = $(".slider-info div").map(function() {
          return $(this).height()
      }).get(),
      o = Math.max.apply(null, e);
  $(".slider-info div").css("min-height", o);
  var i = $(window).height(),
      t = $("header").outerHeight(),
      n = "0",
      s = i - t - n;
  $(".slider").height(s)
}
jQuery(document).ready(function(e) {
  if (body = e("body"), body.hasClass("show-intro")) {
      var o = ["-10", "3", "11", "22", "70", "6", "110", "40", "30", "100", "130", "90", "72", "60", "80", "66"],
          o = o.sort(function() {
              return .5 - Math.random()
          }),
          i = ["-111", "-5", "-10", "3", "13", "54", "67", "40", "30", "50", "20", "22", "-6", "-8", "2", "7"],
          i = i.sort(function() {
              return .5 - Math.random()
          });
      e("#intro-overlay .logostrip").each(function(t) {
          var n = o[t],
              s = i[t];
          e(this).css({
              top: n + "vh",
              "-webkit-transform": "rotate(" + s + "deg)",
              "-moz-transform": "rotate(" + s + "deg)",
              "-ms-transform": "rotate(" + s + "deg)",
              "-o-transform": "rotate(" + s + "deg)",
              transform: "rotate(" + s + "deg)"
          }).delay(220 * t).fadeIn(0)
      }).promise().done(function() {
          e("#intro-overlay").delay(800).fadeOut(), e(".home-slider").slick("slickGoTo", 0)
      }), e("#intro-overlay").click(function() {
          e(this).fadeOut(), e(".home-slider").slick("slickGoTo", 0)
      })
  }
  var t = e(window).width(),
      n = document.querySelector("header"),
      s = new Headroom(n, {
          offset: 200
      });
  s.init(), e("header nav ul li").not("header nav ul.sub-nav li").hoverIntent(function() {
      e("header nav ul li").removeClass("hovered"), e(this).addClass("hovered")
  }), e("header nav").hoverIntent(function() {}, function() {
      e("header nav ul li").removeClass("hovered")
  }), e(".home-slider").on("afterChange", function(o, i, t) {
      e(".slide-info-link").hide(), e(".slide-info-link.slide-info-" + t).fadeIn()
  }), e(".home-slider").slick({
      pauseOnHover: !1,
      autoplay: !0,
      autoplaySpeed: 4e3,
      arrows: !1,
      dots: !0,
      appendDots: ".slider-info"
  }), e(".slider-info").hover(function() {
      e(".home-slider").slick("slickPause")
  }, function() {
      e(".home-slider").slick("slickPlay")
  }), e(".production-slider").slick({
      dots: !0
  }), e(".top-news-slider").slick({
      dots: !0,
      appendDots: ".top-news-dots"
  }), e(".press-slider").slick({
      arrows: !1,
      dots: !0,
      infinite: !0,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [{
          breakpoint: 1023,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }]
  }), e(".scroll-block").waypoint(function(o) {
      e(this.element).addClass("in-view")
  }, {
      offset: "90%"
  }), e(".read-more").click(function(o) {
      o.preventDefault();
      var i = e(this),
          t = i.prev(".read-more-content");
      t.slideToggle(function() {
          t.is(":visible") ? i.addClass("less").html("<span>Read less</span>") : i.removeClass("less").html("<span>Read more</span>")
      })
  }), e("a.show-biog").click(function(o) {
      o.preventDefault();
      var i = e(this).next(".biog").html();
      if (1023 > t) var n = ".tablet-biog-wrapper",
          s = e(this).parent(),
          a = s.nextAll(n).first();
      else var n = ".biog-wrapper",
          s = e(this).closest(".biog-boxes"),
          a = s.next(n);
      e(this).hasClass("active") ? (a.slideUp(), s.find(".show-biog").removeClass("active")) : (e(".biog-wrapper-box").not(a).slideUp(), e(".show-biog").removeClass("active"), e(this).addClass("active"), a.find(".two-col").html(i), a.slideDown())
  }), e("body.blog .idea-wrap").hover(function() {
      body.addClass("idea-hovered")
  }, function() {
      body.removeClass("idea-hovered")
  }), e(".close-overlay").click(function(o) {
      o.preventDefault(), body.removeClass("show-mail"), e(".overlay").fadeOut("fast")
  }), e(".launch-search").click(function(o) {
      o.preventDefault(), e("#search-overlay").fadeIn("fast")
  }), sizeSlider(), e('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var o = e(this.hash);
          if (o = o.length ? o : e("[name=" + this.hash.slice(1) + "]"), o.length) return e("html, body").animate({
              scrollTop: o.offset().top
          }, 600), !1
      }
  }), e("#toggle-nav").click(function(o) {
      o.preventDefault(), body.toggleClass("nav-open"), e("header nav").toggle()
  }), 1025 > t && (e("header nav .parent-link").click(function(o) {
      o.preventDefault();
      var i = e(this).next(".sub-nav");
      e(".sub-nav").not(i).hide(), i.toggle()
  }), e(".anchor-link a").click(function() {
      e("header nav").hide()
  })), pageHeight()
}), $(window).resize(function() {
  sizeSlider(), pageHeight()
}), $(window).load(function() {
  sizeSlider()
});