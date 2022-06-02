// slick slider
!(function (i) {
  'use strict'
  'function' == typeof define && define.amd
    ? define(['jquery'], i)
    : 'undefined' != typeof exports
    ? (module.exports = i(require('jquery')))
    : i(jQuery)
})(function (i) {
  'use strict'
  var e = window.Slick || {}
  ;((e = (function () {
    var e = 0
    return function (t, o) {
      var s,
        n = this
      ;(n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1)
        },
        dots: !1,
        dotsClass: 'slick-dots',
        draggable: !0,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: '',
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
        zIndex: 1e3,
      }),
        (n.initials = {
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
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = 'hidden'),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = 'visibilitychange'),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data('slick') || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = 'mozHidden'),
            (n.visibilityChange = 'mozvisibilitychange'))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = 'webkitHidden'),
            (n.visibilityChange = 'webkitvisibilitychange')),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0)
    }
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find('.slick-active')
      .attr({ 'aria-hidden': 'false' })
      .find('a, input, button, select')
      .attr({ tabindex: '0' })
  }),
    (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
      var s = this
      if ('boolean' == typeof t) (o = t), (t = null)
      else if (t < 0 || t >= s.slideCount) return !1
      s.unload(),
        'number' == typeof t
          ? 0 === t && 0 === s.$slides.length
            ? i(e).appendTo(s.$slideTrack)
            : o
            ? i(e).insertBefore(s.$slides.eq(t))
            : i(e).insertAfter(s.$slides.eq(t))
          : !0 === o
          ? i(e).prependTo(s.$slideTrack)
          : i(e).appendTo(s.$slideTrack),
        (s.$slides = s.$slideTrack.children(this.options.slide)),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function (e, t) {
          i(t).attr('data-slick-index', e)
        }),
        (s.$slidesCache = s.$slides),
        s.reinit()
    }),
    (e.prototype.animateHeight = function () {
      var i = this
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0)
        i.$list.animate({ height: e }, i.options.speed)
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t,
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t,
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  ;(i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = 'translate(' + i + 'px, 0px)'),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = 'translate(0px,' + i + 'px)'),
                        s.$slideTrack.css(o))
                },
                complete: function () {
                  t && t.call()
                },
              },
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = 'translate3d(' + e + 'px, 0px, 0px)')
              : (o[s.animType] = 'translate3d(0px,' + e + 'px, 0px)'),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call()
              }, s.options.speed))
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor
      return t && null !== t && (t = i(t).not(e.$slider)), t
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget()
      null !== t &&
        'object' == typeof t &&
        t.each(function () {
          var t = i(this).slick('getSlick')
          t.unslicked || t.slideHandler(e, !0)
        })
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {}
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + ' ' + e.options.speed + 'ms ' + e.options.cssEase)
        : (t[e.transitionType] =
            'opacity ' + e.options.speed + 'ms ' + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }),
    (e.prototype.autoPlay = function () {
      var i = this
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed,
          ))
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this
      i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }),
    (e.prototype.buildArrows = function () {
      var e = this
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass('slick-arrow')),
        (e.$nextArrow = i(e.options.nextArrow).addClass('slick-arrow')),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass('slick-hidden')
              .removeAttr('aria-hidden tabindex'),
            e.$nextArrow
              .removeClass('slick-hidden')
              .removeAttr('aria-hidden tabindex'),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass('slick-hidden')
              .attr({ 'aria-disabled': 'true', tabindex: '-1' }))
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass('slick-dotted'),
            t = i('<ul />').addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i('<li />').append(o.options.customPaging.call(this, o, e)))
        ;(o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find('li').first().addClass('slick-active')
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this
      ;(e.$slides = e.$slider
        .children(e.options.slide + ':not(.slick-cloned)')
        .addClass('slick-slide')),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr('data-slick-index', e)
            .data('originalStyling', i(t).attr('style') || '')
        }),
        e.$slider.addClass('slick-slider'),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css('opacity', 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i('img[data-lazy]', e.$slider).not('[src]').addClass('slick-loading'),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          'number' == typeof e.currentSlide ? e.currentSlide : 0,
        ),
        !0 === e.options.draggable && e.$list.addClass('draggable')
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement('div')
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement('div')
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t)
              n.get(c) && a.appendChild(n.get(c))
            }
            d.appendChild(a)
          }
          o.appendChild(d)
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + '%',
              display: 'inline-block',
            })
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width()
      if (
        ('window' === r.respondTo
          ? (n = a)
          : 'slider' === r.respondTo
          ? (n = d)
          : 'min' === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]))
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              'unslick' === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s],
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              'unslick' === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s],
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger('breakpoint', [r, l])
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget)
      switch (
        (l.is('a') && e.preventDefault(),
        l.is('li') || (l = l.closest('li')),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case 'previous':
          ;(s =
            0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t)
          break
        case 'next':
          ;(s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t)
          break
        case 'index':
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger('focus')
          break
        default:
          return
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1]
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t
            break
          }
          t = e[o]
        }
      return i
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this
      e.options.dots &&
        null !== e.$dots &&
        (i('li', e.$dots)
          .off('click.slick', e.changeSlide)
          .off('mouseenter.slick', i.proxy(e.interrupt, e, !0))
          .off('mouseleave.slick', i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off('keydown.slick', e.keyHandler)),
        e.$slider.off('focus.slick blur.slick'),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off('click.slick', e.changeSlide),
          e.$nextArrow && e.$nextArrow.off('click.slick', e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off('keydown.slick', e.keyHandler),
            e.$nextArrow && e.$nextArrow.off('keydown.slick', e.keyHandler))),
        e.$list.off('touchstart.slick mousedown.slick', e.swipeHandler),
        e.$list.off('touchmove.slick mousemove.slick', e.swipeHandler),
        e.$list.off('touchend.slick mouseup.slick', e.swipeHandler),
        e.$list.off('touchcancel.slick mouseleave.slick', e.swipeHandler),
        e.$list.off('click.slick', e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off('keydown.slick', e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off('click.slick', e.selectHandler),
        i(window).off(
          'orientationchange.slick.slick-' + e.instanceUid,
          e.orientationChange,
        ),
        i(window).off('resize.slick.slick-' + e.instanceUid, e.resize),
        i('[draggable!=true]', e.$slideTrack).off(
          'dragstart',
          e.preventDefault,
        ),
        i(window).off('load.slick.slick-' + e.instanceUid, e.setPosition)
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this
      e.$list.off('mouseenter.slick', i.proxy(e.interrupt, e, !0)),
        e.$list.off('mouseleave.slick', i.proxy(e.interrupt, e, !1))
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr('style'),
        e.$slider.empty().append(i))
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }),
    (e.prototype.destroy = function (e) {
      var t = this
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i('.slick-cloned', t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass('slick-disabled slick-arrow slick-hidden')
            .removeAttr('aria-hidden aria-disabled tabindex')
            .css('display', ''),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass('slick-disabled slick-arrow slick-hidden')
            .removeAttr('aria-hidden aria-disabled tabindex')
            .css('display', ''),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              'slick-slide slick-active slick-center slick-visible slick-current',
            )
            .removeAttr('aria-hidden')
            .removeAttr('data-slick-index')
            .each(function () {
              i(this).attr('style', i(this).data('originalStyling'))
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass('slick-slider'),
        t.$slider.removeClass('slick-initialized'),
        t.$slider.removeClass('slick-dotted'),
        (t.unslicked = !0),
        e || t.$slider.trigger('destroy', [t])
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {}
      ;(t[e.transitionType] = ''),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call()
            }, t.options.speed))
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing,
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }))
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
      var e = this
      null !== i &&
        ((e.$slidesCache = e.$slides),
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }),
    (e.prototype.focusHandler = function () {
      var e = this
      e.$slider
        .off('focus.slick blur.slick')
        .on('focus.slick blur.slick', '*', function (t) {
          t.stopImmediatePropagation()
          var o = i(this)
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(':focus')), e.autoPlay())
          }, 0)
        })
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
      return this.currentSlide
    }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow)
      else if (!0 === i.options.centerMode) o = i.slideCount
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow)
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll,
          )
      return o - 1
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children('.slick-slide').eq(i)
              : n.$slideTrack
                  .children('.slick-slide')
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children('.slick-slide').eq(i)
                : n.$slideTrack
                    .children('.slick-slide')
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      )
    }),
    (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
      return this.options[i]
    }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = []
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow)
      return s
    }),
    (e.prototype.getSlick = function () {
      return this
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find('.slick-slide').each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1
            }),
            Math.abs(i(e).attr('data-slick-index') - o.currentSlide) || 1)
          : o.options.slidesToScroll
      )
    }),
    (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
      this.changeSlide({ data: { message: 'index', index: parseInt(i) } }, e)
    }),
    (e.prototype.init = function (e) {
      var t = this
      i(t.$slider).hasClass('slick-initialized') ||
        (i(t.$slider).addClass('slick-initialized'),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger('init', [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay())
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount
        })
      e.$slides
        .add(e.$slideTrack.find('.slick-cloned'))
        .attr({ 'aria-hidden': 'true', tabindex: '-1' })
        .find('a, input, button, select')
        .attr({ tabindex: '-1' }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find('.slick-cloned'))
            .each(function (t) {
              var s = o.indexOf(t)
              i(this).attr({
                role: 'tabpanel',
                id: 'slick-slide' + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    'aria-describedby':
                      'slick-slide-control' + e.instanceUid + s,
                  })
            }),
          e.$dots
            .attr('role', 'tablist')
            .find('li')
            .each(function (s) {
              var n = o[s]
              i(this).attr({ role: 'presentation' }),
                i(this)
                  .find('button')
                  .first()
                  .attr({
                    role: 'tab',
                    id: 'slick-slide-control' + e.instanceUid + s,
                    'aria-controls': 'slick-slide' + e.instanceUid + n,
                    'aria-label': s + 1 + ' of ' + t,
                    'aria-selected': null,
                    tabindex: '-1',
                  })
            })
            .eq(e.currentSlide)
            .find('button')
            .attr({ 'aria-selected': 'true', tabindex: '0' })
            .end())
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr('tabindex', 0)
      e.activateADA()
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off('click.slick')
          .on('click.slick', { message: 'previous' }, i.changeSlide),
        i.$nextArrow
          .off('click.slick')
          .on('click.slick', { message: 'next' }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on('keydown.slick', i.keyHandler),
          i.$nextArrow.on('keydown.slick', i.keyHandler)))
    }),
    (e.prototype.initDotEvents = function () {
      var e = this
      !0 === e.options.dots &&
        (i('li', e.$dots).on(
          'click.slick',
          { message: 'index' },
          e.changeSlide,
        ),
        !0 === e.options.accessibility &&
          e.$dots.on('keydown.slick', e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i('li', e.$dots)
            .on('mouseenter.slick', i.proxy(e.interrupt, e, !0))
            .on('mouseleave.slick', i.proxy(e.interrupt, e, !1))
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this
      e.options.pauseOnHover &&
        (e.$list.on('mouseenter.slick', i.proxy(e.interrupt, e, !0)),
        e.$list.on('mouseleave.slick', i.proxy(e.interrupt, e, !1)))
    }),
    (e.prototype.initializeEvents = function () {
      var e = this
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          'touchstart.slick mousedown.slick',
          { action: 'start' },
          e.swipeHandler,
        ),
        e.$list.on(
          'touchmove.slick mousemove.slick',
          { action: 'move' },
          e.swipeHandler,
        ),
        e.$list.on(
          'touchend.slick mouseup.slick',
          { action: 'end' },
          e.swipeHandler,
        ),
        e.$list.on(
          'touchcancel.slick mouseleave.slick',
          { action: 'end' },
          e.swipeHandler,
        ),
        e.$list.on('click.slick', e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on('keydown.slick', e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on('click.slick', e.selectHandler),
        i(window).on(
          'orientationchange.slick.slick-' + e.instanceUid,
          i.proxy(e.orientationChange, e),
        ),
        i(window).on(
          'resize.slick.slick-' + e.instanceUid,
          i.proxy(e.resize, e),
        ),
        i('[draggable!=true]', e.$slideTrack).on('dragstart', e.preventDefault),
        i(window).on('load.slick.slick-' + e.instanceUid, e.setPosition),
        i(e.setPosition)
    }),
    (e.prototype.initUI = function () {
      var i = this
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show()
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this
      i.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? 'next' : 'previous' },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? 'previous' : 'next' },
            }))
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i('img[data-lazy]', e).each(function () {
          var e = i(this),
            t = i(this).attr('data-lazy'),
            o = i(this).attr('data-srcset'),
            s = i(this).attr('data-sizes') || n.$slider.attr('data-sizes'),
            r = document.createElement('img')
          ;(r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr('srcset', o), s && e.attr('sizes', s)),
                e.attr('src', t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr('data-lazy data-srcset data-sizes').removeClass(
                    'slick-loading',
                  )
                }),
                n.$slider.trigger('lazyLoaded', [n, e, t])
            })
          }),
            (r.onerror = function () {
              e
                .removeAttr('data-lazy')
                .removeClass('slick-loading')
                .addClass('slick-lazyload-error'),
                n.$slider.trigger('lazyLoadError', [n, e, t])
            }),
            (r.src = t)
        })
      }
      var t,
        o,
        s,
        n = this
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1),
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find('.slick-slide').slice(o, s)),
        'anticipated' === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find('.slick-slide'), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find('.slick-slide'))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find('.slick-cloned').slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider
                .find('.slick-cloned')
                .slice(-1 * n.options.slidesToShow),
            )
    }),
    (e.prototype.loadSlider = function () {
      var i = this
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass('slick-loading'),
        i.initUI(),
        'progressive' === i.options.lazyLoad && i.progressiveLazyLoad()
    }),
    (e.prototype.next = e.prototype.slickNext = function () {
      this.changeSlide({ data: { message: 'next' } })
    }),
    (e.prototype.orientationChange = function () {
      var i = this
      i.checkResponsive(), i.setPosition()
    }),
    (e.prototype.pause = e.prototype.slickPause = function () {
      var i = this
      i.autoPlayClear(), (i.paused = !0)
    }),
    (e.prototype.play = e.prototype.slickPlay = function () {
      var i = this
      i.autoPlay(),
        (i.options.autoplay = !0),
        (i.paused = !1),
        (i.focussed = !1),
        (i.interrupted = !1)
    }),
    (e.prototype.postSlide = function (e) {
      var t = this
      t.unslicked ||
        (t.$slider.trigger('afterChange', [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr('tabindex', 0).focus()))
    }),
    (e.prototype.prev = e.prototype.slickPrev = function () {
      this.changeSlide({ data: { message: 'previous' } })
    }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault()
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i('img[data-lazy]', l.$slider)
      d.length
        ? ((t = d.first()),
          (o = t.attr('data-lazy')),
          (s = t.attr('data-srcset')),
          (n = t.attr('data-sizes') || l.$slider.attr('data-sizes')),
          ((r = document.createElement('img')).onload = function () {
            s && (t.attr('srcset', s), n && t.attr('sizes', n)),
              t
                .attr('src', o)
                .removeAttr('data-lazy data-srcset data-sizes')
                .removeClass('slick-loading'),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger('lazyLoaded', [l, t, o]),
              l.progressiveLazyLoad()
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1)
                }, 500)
              : (t
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading')
                  .addClass('slick-lazyload-error'),
                l.$slider.trigger('lazyLoadError', [l, t, o]),
                l.progressiveLazyLoad())
          }),
          (r.src = o))
        : l.$slider.trigger('allImagesLoaded', [l])
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this
      ;(o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: 'index', index: t } }, !1)
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null
      if ('array' === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || 'window'
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings)
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i
        })
      }
    }),
    (e.prototype.reinit = function () {
      var e = this
      ;(e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass('slick-slide')),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on('click.slick', e.selectHandler),
        e.setSlideClasses(
          'number' == typeof e.currentSlide ? e.currentSlide : 0,
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger('reInit', [e])
    }),
    (e.prototype.resize = function () {
      var e = this
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          ;(e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50)))
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
      var o = this
      if (
        ((i =
          'boolean' == typeof i
            ? !0 === (e = i)
              ? 0
              : o.slideCount - 1
            : !0 === e
            ? --i
            : i),
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
      )
        return !1
      o.unload(),
        !0 === t
          ? o.$slideTrack.children().remove()
          : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        (o.$slides = o.$slideTrack.children(this.options.slide)),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        (o.$slidesCache = o.$slides),
        o.reinit()
    }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {}
      !0 === o.options.rtl && (i = -i),
        (e = 'left' == o.positionProp ? Math.ceil(i) + 'px' : '0px'),
        (t = 'top' == o.positionProp ? Math.ceil(i) + 'px' : '0px'),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = 'translate(' + e + ', ' + t + ')'),
                o.$slideTrack.css(s))
              : ((s[o.animType] = 'translate3d(' + e + ', ' + t + ', 0px)'),
                o.$slideTrack.css(s)))
    }),
    (e.prototype.setDimensions = function () {
      var i = this
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: '0px ' + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow,
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + ' 0px' })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children('.slick-slide').length,
              ),
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children('.slick-slide').length,
              ),
            ))
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width()
      !1 === i.options.variableWidth &&
        i.$slideTrack.children('.slick-slide').width(i.slideWidth - e)
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this
      t.$slides.each(function (o, s) {
        ;(e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: 'relative',
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: 'relative',
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 })
    }),
    (e.prototype.setHeight = function () {
      var i = this
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0)
        i.$list.css('height', e)
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption = function () {
      var e,
        t,
        o,
        s,
        n,
        r = this,
        l = !1
      if (
        ('object' === i.type(arguments[0])
          ? ((o = arguments[0]), (l = arguments[1]), (n = 'multiple'))
          : 'string' === i.type(arguments[0]) &&
            ((o = arguments[0]),
            (s = arguments[1]),
            (l = arguments[2]),
            'responsive' === arguments[0] && 'array' === i.type(arguments[1])
              ? (n = 'responsive')
              : void 0 !== arguments[1] && (n = 'single')),
        'single' === n)
      )
        r.options[o] = s
      else if ('multiple' === n)
        i.each(o, function (i, e) {
          r.options[i] = e
        })
      else if ('responsive' === n)
        for (t in s)
          if ('array' !== i.type(r.options.responsive))
            r.options.responsive = [s[t]]
          else {
            for (e = r.options.responsive.length - 1; e >= 0; )
              r.options.responsive[e].breakpoint === s[t].breakpoint &&
                r.options.responsive.splice(e, 1),
                e--
            r.options.responsive.push(s[t])
          }
      l && (r.unload(), r.reinit())
    }),
    (e.prototype.setPosition = function () {
      var i = this
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger('setPosition', [i])
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style
      ;(i.positionProp = !0 === i.options.vertical ? 'top' : 'left'),
        'top' === i.positionProp
          ? i.$slider.addClass('slick-vertical')
          : i.$slider.removeClass('slick-vertical'),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ('number' == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = 'OTransform'),
          (i.transformType = '-o-transform'),
          (i.transitionType = 'OTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = 'MozTransform'),
          (i.transformType = '-moz-transform'),
          (i.transitionType = 'MozTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = 'webkitTransform'),
          (i.transformType = '-webkit-transform'),
          (i.transitionType = 'webkitTransition'),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = 'msTransform'),
          (i.transformType = '-ms-transform'),
          (i.transitionType = 'msTransition'),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = 'transform'),
          (i.transformType = 'transform'),
          (i.transitionType = 'transition')),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType)
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this
      if (
        ((t = n.$slider
          .find('.slick-slide')
          .removeClass('slick-active slick-center slick-current')
          .attr('aria-hidden', 'true')),
        n.$slides.eq(i).addClass('slick-current'),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0
        ;(e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass('slick-center')
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass('slick-center')),
          n.$slides.eq(i).addClass('slick-center')
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass('slick-active')
              .attr('aria-hidden', 'false')
          : t.length <= n.options.slidesToShow
          ? t.addClass('slick-active').attr('aria-hidden', 'false')
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false')
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false'))
      ;('ondemand' !== n.options.lazyLoad &&
        'anticipated' !== n.options.lazyLoad) ||
        n.lazyLoad()
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass('slick-cloned')
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass('slick-cloned')
        s.$slideTrack
          .find('.slick-cloned')
          .find('[id]')
          .each(function () {
            i(this).attr('id', '')
          })
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this
      i || e.autoPlay(), (e.interrupted = i)
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is('.slick-slide')
          ? i(e.target)
          : i(e.target).parents('.slick-slide'),
        s = parseInt(o.attr('data-slick-index'))
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s)
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o)
                })
              : a.postSlide(o))
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o)
                })
              : a.postSlide(o))
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger('beforeChange', [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick('getSlick')).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s)
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            )
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s)
              })
            : a.postSlide(s)
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass('slick-loading')
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? 'left'
            : 'right'
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? 'left'
            : 'right'
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? 'right'
            : 'left'
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? 'down'
            : 'up'
          : 'vertical'
      )
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger('edge', [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case 'left':
          case 'down':
            ;(e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0)
            break
          case 'right':
          case 'up':
            ;(e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1)
        }
        'vertical' != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger('swipe', [o, t]))
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}))
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this
      if (
        !(
          !1 === e.options.swipe ||
          ('ontouchend' in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf('mouse'))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case 'start':
            e.swipeStart(i)
            break
          case 'move':
            e.swipeMove(i)
            break
          case 'end':
            e.swipeEnd(i)
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)),
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)),
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && 'right' === t) ||
                  (l.currentSlide >= l.getDotCount() && 'left' === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      )
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0)
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
      var i = this
      null !== i.$slidesCache &&
        (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }),
    (e.prototype.unload = function () {
      var e = this
      i('.slick-cloned', e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass('slick-slide slick-active slick-visible slick-current')
          .attr('aria-hidden', 'true')
          .css('width', '')
    }),
    (e.prototype.unslick = function (i) {
      var e = this
      e.$slider.trigger('unslick', [e, i]), e.destroy()
    }),
    (e.prototype.updateArrows = function () {
      var i = this
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass('slick-disabled')
            .attr('aria-disabled', 'false'),
          i.$nextArrow
            .removeClass('slick-disabled')
            .attr('aria-disabled', 'false'),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$nextArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false'))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$prevArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false'))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass('slick-disabled')
                .attr('aria-disabled', 'true'),
              i.$prevArrow
                .removeClass('slick-disabled')
                .attr('aria-disabled', 'false')))
    }),
    (e.prototype.updateDots = function () {
      var i = this
      null !== i.$dots &&
        (i.$dots.find('li').removeClass('slick-active').end(),
        i.$dots
          .find('li')
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass('slick-active'))
    }),
    (e.prototype.visibility = function () {
      var i = this
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1))
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length
      for (i = 0; i < r; i++)
        if (
          ('object' == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t
      return o
    })
})
// end slick slider

// light gallery
!(function (a, b) {
  'function' == typeof define && define.amd
    ? define(['jquery'], function (a) {
        return b(a)
      })
    : 'object' == typeof module && module.exports
    ? (module.exports = b(require('jquery')))
    : b(a.jQuery)
})(this, function (a) {
  !(function () {
    'use strict'
    function b(b, d) {
      if (
        ((this.el = b),
        (this.$el = a(b)),
        (this.s = a.extend({}, c, d)),
        this.s.dynamic &&
          'undefined' !== this.s.dynamicEl &&
          this.s.dynamicEl.constructor === Array &&
          !this.s.dynamicEl.length)
      )
        throw 'When using dynamic mode, you must also define dynamicEl as an Array.'
      return (
        (this.modules = {}),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.hideBartimeout = !1),
        (this.isTouch = 'ontouchstart' in document.documentElement),
        this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
        this.s.dynamic
          ? (this.$items = this.s.dynamicEl)
          : 'this' === this.s.selector
          ? (this.$items = this.$el)
          : '' !== this.s.selector
          ? this.s.selectWithin
            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
            : (this.$items = this.$el.find(a(this.s.selector)))
          : (this.$items = this.$el.children()),
        (this.$slide = ''),
        (this.$outer = ''),
        this.init(),
        this
      )
    }
    var c = {
      mode: 'lg-slide',
      cssEasing: 'ease',
      easing: 'linear',
      speed: 600,
      height: '100%',
      width: '100%',
      addClass: '',
      startClass: 'lg-start-zoom',
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !0,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: '.lg-sub-html',
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: '',
      selectWithin: '',
      nextHtml: '',
      prevHtml: '',
      index: !1,
      iframeMaxWidth: '100%',
      download: !0,
      counter: !0,
      appendCounterTo: '.lg-toolbar',
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
    }
    ;(b.prototype.init = function () {
      var b = this
      b.s.preload > b.$items.length && (b.s.preload = b.$items.length)
      var c = window.location.hash
      c.indexOf('lg=' + this.s.galleryId) > 0 &&
        ((b.index = parseInt(c.split('&slide=')[1], 10)),
        a('body').addClass('lg-from-hash'),
        a('body').hasClass('lg-on') ||
          (setTimeout(function () {
            b.build(b.index)
          }),
          a('body').addClass('lg-on'))),
        b.s.dynamic
          ? (b.$el.trigger('onBeforeOpen.lg'),
            (b.index = b.s.index || 0),
            a('body').hasClass('lg-on') ||
              setTimeout(function () {
                b.build(b.index), a('body').addClass('lg-on')
              }))
          : b.$items.on('click.lgcustom', function (c) {
              try {
                c.preventDefault(), c.preventDefault()
              } catch (a) {
                c.returnValue = !1
              }
              b.$el.trigger('onBeforeOpen.lg'),
                (b.index = b.s.index || b.$items.index(this)),
                a('body').hasClass('lg-on') ||
                  (b.build(b.index), a('body').addClass('lg-on'))
            })
    }),
      (b.prototype.build = function (b) {
        var c = this
        c.structure(),
          a.each(a.fn.lightGallery.modules, function (b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
          }),
          c.slide(b, !1, !1, !1),
          c.s.keyPress && c.keyPress(),
          c.$items.length > 1
            ? (c.arrow(),
              setTimeout(function () {
                c.enableDrag(), c.enableSwipe()
              }, 50),
              c.s.mousewheel && c.mousewheel())
            : c.$slide.on('click.lg', function () {
                c.$el.trigger('onSlideClick.lg')
              }),
          c.counter(),
          c.closeGallery(),
          c.$el.trigger('onAfterOpen.lg'),
          c.$outer.on('mousemove.lg click.lg touchstart.lg', function () {
            c.$outer.removeClass('lg-hide-items'),
              clearTimeout(c.hideBartimeout),
              (c.hideBartimeout = setTimeout(function () {
                c.$outer.addClass('lg-hide-items')
              }, c.s.hideBarsDelay))
          }),
          c.$outer.trigger('mousemove.lg')
      }),
      (b.prototype.structure = function () {
        var b,
          c = '',
          d = '',
          e = 0,
          f = '',
          g = this
        for (
          a('body').append('<div class="lg-backdrop"></div>'),
            a('.lg-backdrop').css(
              'transition-duration',
              this.s.backdropDuration + 'ms',
            ),
            e = 0;
          e < this.$items.length;
          e++
        )
          c += '<div class="lg-item"></div>'
        if (
          (this.s.controls &&
            this.$items.length > 1 &&
            (d =
              '<div class="lg-actions"><button class="lg-prev lg-icon">' +
              this.s.prevHtml +
              '</button><button class="lg-next lg-icon">' +
              this.s.nextHtml +
              '</button></div>'),
          '.lg-sub-html' === this.s.appendSubHtmlTo &&
            (f = '<div class="lg-sub-html"></div>'),
          (b =
            '<div class="lg-outer ' +
            this.s.addClass +
            ' ' +
            this.s.startClass +
            '"><div class="lg" style="width:' +
            this.s.width +
            '; height:' +
            this.s.height +
            '"><div class="lg-inner">' +
            c +
            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
            d +
            f +
            '</div></div>'),
          a('body').append(b),
          (this.$outer = a('.lg-outer')),
          (this.$slide = this.$outer.find('.lg-item')),
          this.s.useLeft
            ? (this.$outer.addClass('lg-use-left'), (this.s.mode = 'lg-slide'))
            : this.$outer.addClass('lg-use-css3'),
          g.setTop(),
          a(window).on('resize.lg orientationchange.lg', function () {
            setTimeout(function () {
              g.setTop()
            }, 100)
          }),
          this.$slide.eq(this.index).addClass('lg-current'),
          this.doCss()
            ? this.$outer.addClass('lg-css3')
            : (this.$outer.addClass('lg-css'), (this.s.speed = 0)),
          this.$outer.addClass(this.s.mode),
          this.s.enableDrag &&
            this.$items.length > 1 &&
            this.$outer.addClass('lg-grab'),
          this.s.showAfterLoad && this.$outer.addClass('lg-show-after-load'),
          this.doCss())
        ) {
          var h = this.$outer.find('.lg-inner')
          h.css('transition-timing-function', this.s.cssEasing),
            h.css('transition-duration', this.s.speed + 'ms')
        }
        setTimeout(function () {
          a('.lg-backdrop').addClass('in')
        }),
          setTimeout(function () {
            g.$outer.addClass('lg-visible')
          }, this.s.backdropDuration),
          this.s.download &&
            this.$outer
              .find('.lg-toolbar')
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>',
              ),
          (this.prevScrollTop = a(window).scrollTop())
      }),
      (b.prototype.setTop = function () {
        if ('100%' !== this.s.height) {
          var b = a(window).height(),
            c = (b - parseInt(this.s.height, 10)) / 2,
            d = this.$outer.find('.lg')
          b >= parseInt(this.s.height, 10)
            ? d.css('top', c + 'px')
            : d.css('top', '0px')
        }
      }),
      (b.prototype.doCss = function () {
        return !!(function () {
          var a = [
              'transition',
              'MozTransition',
              'WebkitTransition',
              'OTransition',
              'msTransition',
              'KhtmlTransition',
            ],
            b = document.documentElement,
            c = 0
          for (c = 0; c < a.length; c++) if (a[c] in b.style) return !0
        })()
      }),
      (b.prototype.isVideo = function (a, b) {
        var c
        if (
          ((c = this.s.dynamic
            ? this.s.dynamicEl[b].html
            : this.$items.eq(b).attr('data-html')),
          !a)
        )
          return c
            ? { html5: !0 }
            : (console.error(
                'lightGallery :- data-src is not pvovided on slide item ' +
                  (b + 1) +
                  '. Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html',
              ),
              !1)
        var d = a.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i,
          ),
          e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
          f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
          g = a.match(
            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i,
          )
        return d
          ? { youtube: d }
          : e
          ? { vimeo: e }
          : f
          ? { dailymotion: f }
          : g
          ? { vk: g }
          : void 0
      }),
      (b.prototype.counter = function () {
        this.s.counter &&
          a(this.s.appendCounterTo).append(
            '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              '</span></div>',
          )
      }),
      (b.prototype.addHtml = function (b) {
        var c,
          d,
          e = null
        if (
          (this.s.dynamic
            ? this.s.dynamicEl[b].subHtmlUrl
              ? (c = this.s.dynamicEl[b].subHtmlUrl)
              : (e = this.s.dynamicEl[b].subHtml)
            : ((d = this.$items.eq(b)),
              d.attr('data-sub-html-url')
                ? (c = d.attr('data-sub-html-url'))
                : ((e = d.attr('data-sub-html')),
                  this.s.getCaptionFromTitleOrAlt &&
                    !e &&
                    (e =
                      d.attr('title') || d.find('img').first().attr('alt')))),
          !c)
        )
          if (void 0 !== e && null !== e) {
            var f = e.substring(0, 1)
            ;('.' !== f && '#' !== f) ||
              (e =
                this.s.subHtmlSelectorRelative && !this.s.dynamic
                  ? d.find(e).html()
                  : a(e).html())
          } else e = ''
        '.lg-sub-html' === this.s.appendSubHtmlTo
          ? c
            ? this.$outer.find(this.s.appendSubHtmlTo).load(c)
            : this.$outer.find(this.s.appendSubHtmlTo).html(e)
          : c
          ? this.$slide.eq(b).load(c)
          : this.$slide.eq(b).append(e),
          void 0 !== e &&
            null !== e &&
            ('' === e
              ? this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .addClass('lg-empty-html')
              : this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .removeClass('lg-empty-html')),
          this.$el.trigger('onAfterAppendSubHtml.lg', [b])
      }),
      (b.prototype.preload = function (a) {
        var b = 1,
          c = 1
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++)
          this.loadContent(a + b, !1, 0)
        for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
          this.loadContent(a - c, !1, 0)
      }),
      (b.prototype.loadContent = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = !1,
          m = function (b) {
            for (var c = [], d = [], e = 0; e < b.length; e++) {
              var g = b[e].split(' ')
              '' === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1])
            }
            for (var h = a(window).width(), i = 0; i < c.length; i++)
              if (parseInt(c[i], 10) > h) {
                f = d[i]
                break
              }
          }
        if (k.s.dynamic) {
          if (
            (k.s.dynamicEl[b].poster &&
              ((l = !0), (g = k.s.dynamicEl[b].poster)),
            (j = k.s.dynamicEl[b].html),
            (f = k.s.dynamicEl[b].src),
            k.s.dynamicEl[b].responsive)
          ) {
            m(k.s.dynamicEl[b].responsive.split(','))
          }
          ;(h = k.s.dynamicEl[b].srcset), (i = k.s.dynamicEl[b].sizes)
        } else {
          if (
            (k.$items.eq(b).attr('data-poster') &&
              ((l = !0), (g = k.$items.eq(b).attr('data-poster'))),
            (j = k.$items.eq(b).attr('data-html')),
            (f =
              k.$items.eq(b).attr('href') || k.$items.eq(b).attr('data-src')),
            k.$items.eq(b).attr('data-responsive'))
          ) {
            m(k.$items.eq(b).attr('data-responsive').split(','))
          }
          ;(h = k.$items.eq(b).attr('data-srcset')),
            (i = k.$items.eq(b).attr('data-sizes'))
        }
        var n = !1
        k.s.dynamic
          ? k.s.dynamicEl[b].iframe && (n = !0)
          : 'true' === k.$items.eq(b).attr('data-iframe') && (n = !0)
        var o = k.isVideo(f, b)
        if (!k.$slide.eq(b).hasClass('lg-loaded')) {
          if (n)
            k.$slide
              .eq(b)
              .prepend(
                '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                  k.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  f +
                  '"  allowfullscreen="true"></iframe></div></div>',
              )
          else if (l) {
            var p = ''
            ;(p =
              o && o.youtube
                ? 'lg-has-youtube'
                : o && o.vimeo
                ? 'lg-has-vimeo'
                : 'lg-has-html5'),
              k.$slide
                .eq(b)
                .prepend(
                  '<div class="lg-video-cont ' +
                    p +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    g +
                    '" /></div></div>',
                )
          } else
            o
              ? (k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>',
                  ),
                k.$el.trigger('hasVideo.lg', [b, f, j]))
              : k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                      f +
                      '" /></div>',
                  )
          if (
            (k.$el.trigger('onAferAppendSlide.lg', [b]),
            (e = k.$slide.eq(b).find('.lg-object')),
            i && e.attr('sizes', i),
            h)
          ) {
            e.attr('srcset', h)
            try {
              picturefill({ elements: [e[0]] })
            } catch (a) {
              console.warn(
                'lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.',
              )
            }
          }
          '.lg-sub-html' !== this.s.appendSubHtmlTo && k.addHtml(b),
            k.$slide.eq(b).addClass('lg-loaded')
        }
        k.$slide
          .eq(b)
          .find('.lg-object')
          .on('load.lg error.lg', function () {
            var c = 0
            d && !a('body').hasClass('lg-from-hash') && (c = d),
              setTimeout(function () {
                k.$slide.eq(b).addClass('lg-complete'),
                  k.$el.trigger('onSlideItemLoad.lg', [b, d || 0])
              }, c)
          }),
          o && o.html5 && !l && k.$slide.eq(b).addClass('lg-complete'),
          !0 === c &&
            (k.$slide.eq(b).hasClass('lg-complete')
              ? k.preload(b)
              : k.$slide
                  .eq(b)
                  .find('.lg-object')
                  .on('load.lg error.lg', function () {
                    k.preload(b)
                  }))
      }),
      (b.prototype.slide = function (b, c, d, e) {
        var f = this.$outer.find('.lg-current').index(),
          g = this
        if (!g.lGalleryOn || f !== b) {
          var h = this.$slide.length,
            i = g.lGalleryOn ? this.s.speed : 0
          if (!g.lgBusy) {
            if (this.s.download) {
              var j
              ;(j = g.s.dynamic
                ? !1 !== g.s.dynamicEl[b].downloadUrl &&
                  (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                : 'false' !== g.$items.eq(b).attr('data-download-url') &&
                  (g.$items.eq(b).attr('data-download-url') ||
                    g.$items.eq(b).attr('href') ||
                    g.$items.eq(b).attr('data-src'))),
                j
                  ? (a('#lg-download').attr('href', j),
                    g.$outer.removeClass('lg-hide-download'))
                  : g.$outer.addClass('lg-hide-download')
            }
            if (
              (this.$el.trigger('onBeforeSlide.lg', [f, b, c, d]),
              (g.lgBusy = !0),
              clearTimeout(g.hideBartimeout),
              '.lg-sub-html' === this.s.appendSubHtmlTo &&
                setTimeout(function () {
                  g.addHtml(b)
                }, i),
              this.arrowDisable(b),
              e || (b < f ? (e = 'prev') : b > f && (e = 'next')),
              c)
            ) {
              this.$slide.removeClass('lg-prev-slide lg-current lg-next-slide')
              var k, l
              h > 2
                ? ((k = b - 1),
                  (l = b + 1),
                  0 === b && f === h - 1
                    ? ((l = 0), (k = h - 1))
                    : b === h - 1 && 0 === f && ((l = 0), (k = h - 1)))
                : ((k = 0), (l = 1)),
                'prev' === e
                  ? g.$slide.eq(l).addClass('lg-next-slide')
                  : g.$slide.eq(k).addClass('lg-prev-slide'),
                g.$slide.eq(b).addClass('lg-current')
            } else
              g.$outer.addClass('lg-no-trans'),
                this.$slide.removeClass('lg-prev-slide lg-next-slide'),
                'prev' === e
                  ? (this.$slide.eq(b).addClass('lg-prev-slide'),
                    this.$slide.eq(f).addClass('lg-next-slide'))
                  : (this.$slide.eq(b).addClass('lg-next-slide'),
                    this.$slide.eq(f).addClass('lg-prev-slide')),
                setTimeout(function () {
                  g.$slide.removeClass('lg-current'),
                    g.$slide.eq(b).addClass('lg-current'),
                    g.$outer.removeClass('lg-no-trans')
                }, 50)
            g.lGalleryOn
              ? (setTimeout(function () {
                  g.loadContent(b, !0, 0)
                }, this.s.speed + 50),
                setTimeout(function () {
                  ;(g.lgBusy = !1),
                    g.$el.trigger('onAfterSlide.lg', [f, b, c, d])
                }, this.s.speed))
              : (g.loadContent(b, !0, g.s.backdropDuration),
                (g.lgBusy = !1),
                g.$el.trigger('onAfterSlide.lg', [f, b, c, d])),
              (g.lGalleryOn = !0),
              this.s.counter && a('#lg-counter-current').text(b + 1)
          }
          g.index = b
        }
      }),
      (b.prototype.goToNextSlide = function (a) {
        var b = this,
          c = b.s.loop
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index + 1 < b.$slide.length
              ? (b.index++,
                b.$el.trigger('onBeforeNextSlide.lg', [b.index]),
                b.slide(b.index, a, !1, 'next'))
              : c
              ? ((b.index = 0),
                b.$el.trigger('onBeforeNextSlide.lg', [b.index]),
                b.slide(b.index, a, !1, 'next'))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass('lg-right-end'),
                setTimeout(function () {
                  b.$outer.removeClass('lg-right-end')
                }, 400)))
      }),
      (b.prototype.goToPrevSlide = function (a) {
        var b = this,
          c = b.s.loop
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index > 0
              ? (b.index--,
                b.$el.trigger('onBeforePrevSlide.lg', [b.index, a]),
                b.slide(b.index, a, !1, 'prev'))
              : c
              ? ((b.index = b.$items.length - 1),
                b.$el.trigger('onBeforePrevSlide.lg', [b.index, a]),
                b.slide(b.index, a, !1, 'prev'))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass('lg-left-end'),
                setTimeout(function () {
                  b.$outer.removeClass('lg-left-end')
                }, 400)))
      }),
      (b.prototype.keyPress = function () {
        var b = this
        this.$items.length > 1 &&
          a(window).on('keyup.lg', function (a) {
            b.$items.length > 1 &&
              (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()),
              39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()))
          }),
          a(window).on('keydown.lg', function (a) {
            !0 === b.s.escKey &&
              27 === a.keyCode &&
              (a.preventDefault(),
              b.$outer.hasClass('lg-thumb-open')
                ? b.$outer.removeClass('lg-thumb-open')
                : b.destroy())
          })
      }),
      (b.prototype.arrow = function () {
        var a = this
        this.$outer.find('.lg-prev').on('click.lg', function () {
          a.goToPrevSlide()
        }),
          this.$outer.find('.lg-next').on('click.lg', function () {
            a.goToNextSlide()
          })
      }),
      (b.prototype.arrowDisable = function (a) {
        !this.s.loop &&
          this.s.hideControlOnEnd &&
          (a + 1 < this.$slide.length
            ? this.$outer
                .find('.lg-next')
                .removeAttr('disabled')
                .removeClass('disabled')
            : this.$outer
                .find('.lg-next')
                .attr('disabled', 'disabled')
                .addClass('disabled'),
          a > 0
            ? this.$outer
                .find('.lg-prev')
                .removeAttr('disabled')
                .removeClass('disabled')
            : this.$outer
                .find('.lg-prev')
                .attr('disabled', 'disabled')
                .addClass('disabled'))
      }),
      (b.prototype.setTranslate = function (a, b, c) {
        this.s.useLeft
          ? a.css('left', b)
          : a.css({ transform: 'translate3d(' + b + 'px, ' + c + 'px, 0px)' })
      }),
      (b.prototype.touchMove = function (b, c) {
        var d = c - b
        Math.abs(d) > 15 &&
          (this.$outer.addClass('lg-dragging'),
          this.setTranslate(this.$slide.eq(this.index), d, 0),
          this.setTranslate(
            a('.lg-prev-slide'),
            -this.$slide.eq(this.index).width() + d,
            0,
          ),
          this.setTranslate(
            a('.lg-next-slide'),
            this.$slide.eq(this.index).width() + d,
            0,
          ))
      }),
      (b.prototype.touchEnd = function (a) {
        var b = this
        'lg-slide' !== b.s.mode && b.$outer.addClass('lg-slide'),
          this.$slide
            .not('.lg-current, .lg-prev-slide, .lg-next-slide')
            .css('opacity', '0'),
          setTimeout(function () {
            b.$outer.removeClass('lg-dragging'),
              a < 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToNextSlide(!0)
                : a > 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToPrevSlide(!0)
                : Math.abs(a) < 5 && b.$el.trigger('onSlideClick.lg'),
              b.$slide.removeAttr('style')
          }),
          setTimeout(function () {
            b.$outer.hasClass('lg-dragging') ||
              'lg-slide' === b.s.mode ||
              b.$outer.removeClass('lg-slide')
          }, b.s.speed + 100)
      }),
      (b.prototype.enableSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1
        a.s.enableSwipe &&
          a.doCss() &&
          (a.$slide.on('touchstart.lg', function (c) {
            a.$outer.hasClass('lg-zoomed') ||
              a.lgBusy ||
              (c.preventDefault(),
              a.manageSwipeClass(),
              (b = c.originalEvent.targetTouches[0].pageX))
          }),
          a.$slide.on('touchmove.lg', function (e) {
            a.$outer.hasClass('lg-zoomed') ||
              (e.preventDefault(),
              (c = e.originalEvent.targetTouches[0].pageX),
              a.touchMove(b, c),
              (d = !0))
          }),
          a.$slide.on('touchend.lg', function () {
            a.$outer.hasClass('lg-zoomed') ||
              (d
                ? ((d = !1), a.touchEnd(c - b))
                : a.$el.trigger('onSlideClick.lg'))
          }))
      }),
      (b.prototype.enableDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1
        b.s.enableDrag &&
          b.doCss() &&
          (b.$slide.on('mousedown.lg', function (d) {
            b.$outer.hasClass('lg-zoomed') ||
              b.lgBusy ||
              a(d.target).text().trim() ||
              (d.preventDefault(),
              b.manageSwipeClass(),
              (c = d.pageX),
              (e = !0),
              (b.$outer.scrollLeft += 1),
              (b.$outer.scrollLeft -= 1),
              b.$outer.removeClass('lg-grab').addClass('lg-grabbing'),
              b.$el.trigger('onDragstart.lg'))
          }),
          a(window).on('mousemove.lg', function (a) {
            e &&
              ((f = !0),
              (d = a.pageX),
              b.touchMove(c, d),
              b.$el.trigger('onDragmove.lg'))
          }),
          a(window).on('mouseup.lg', function (g) {
            f
              ? ((f = !1), b.touchEnd(d - c), b.$el.trigger('onDragend.lg'))
              : (a(g.target).hasClass('lg-object') ||
                  a(g.target).hasClass('lg-video-play')) &&
                b.$el.trigger('onSlideClick.lg'),
              e &&
                ((e = !1),
                b.$outer.removeClass('lg-grabbing').addClass('lg-grab'))
          }))
      }),
      (b.prototype.manageSwipeClass = function () {
        var a = this.index + 1,
          b = this.index - 1
        this.s.loop &&
          this.$slide.length > 2 &&
          (0 === this.index
            ? (b = this.$slide.length - 1)
            : this.index === this.$slide.length - 1 && (a = 0)),
          this.$slide.removeClass('lg-next-slide lg-prev-slide'),
          b > -1 && this.$slide.eq(b).addClass('lg-prev-slide'),
          this.$slide.eq(a).addClass('lg-next-slide')
      }),
      (b.prototype.mousewheel = function () {
        var a = this
        a.$outer.on('mousewheel.lg', function (b) {
          b.deltaY &&
            (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
            b.preventDefault())
        })
      }),
      (b.prototype.closeGallery = function () {
        var b = this,
          c = !1
        this.$outer.find('.lg-close').on('click.lg', function () {
          b.destroy()
        }),
          b.s.closable &&
            (b.$outer.on('mousedown.lg', function (b) {
              c = !!(
                a(b.target).is('.lg-outer') ||
                a(b.target).is('.lg-item ') ||
                a(b.target).is('.lg-img-wrap')
              )
            }),
            b.$outer.on('mousemove.lg', function () {
              c = !1
            }),
            b.$outer.on('mouseup.lg', function (d) {
              ;(a(d.target).is('.lg-outer') ||
                a(d.target).is('.lg-item ') ||
                (a(d.target).is('.lg-img-wrap') && c)) &&
                (b.$outer.hasClass('lg-dragging') || b.destroy())
            }))
      }),
      (b.prototype.destroy = function (b) {
        var c = this
        b ||
          (c.$el.trigger('onBeforeClose.lg'),
          a(window).scrollTop(c.prevScrollTop)),
          b &&
            (c.s.dynamic || this.$items.off('click.lg click.lgcustom'),
            a.removeData(c.el, 'lightGallery')),
          this.$el.off('.lg.tm'),
          a.each(a.fn.lightGallery.modules, function (a) {
            c.modules[a] && c.modules[a].destroy()
          }),
          (this.lGalleryOn = !1),
          clearTimeout(c.hideBartimeout),
          (this.hideBartimeout = !1),
          a(window).off('.lg'),
          a('body').removeClass('lg-on lg-from-hash'),
          c.$outer && c.$outer.removeClass('lg-visible'),
          a('.lg-backdrop').removeClass('in'),
          setTimeout(function () {
            c.$outer && c.$outer.remove(),
              a('.lg-backdrop').remove(),
              b || c.$el.trigger('onCloseAfter.lg')
          }, c.s.backdropDuration + 50)
      }),
      (a.fn.lightGallery = function (c) {
        return this.each(function () {
          if (a.data(this, 'lightGallery'))
            try {
              a(this).data('lightGallery').init()
            } catch (a) {
              console.error('lightGallery has not initiated properly')
            }
          else a.data(this, 'lightGallery', new b(this, c))
        })
      }),
      (a.fn.lightGallery.modules = {})
  })()
}),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = {
          autoplay: !1,
          pause: 5e3,
          progressBar: !0,
          fourceAutoplay: !1,
          autoplayControls: !0,
          appendAutoplayControlsTo: '.lg-toolbar',
        },
        c = function (c) {
          return (
            (this.core = a(c).data('lightGallery')),
            (this.$el = a(c)),
            !(this.core.$items.length < 2) &&
              ((this.core.s = a.extend({}, b, this.core.s)),
              (this.interval = !1),
              (this.fromAuto = !0),
              (this.canceledOnTouch = !1),
              (this.fourceAutoplayTemp = this.core.s.fourceAutoplay),
              this.core.doCss() || (this.core.s.progressBar = !1),
              this.init(),
              this)
          )
        }
      ;(c.prototype.init = function () {
        var a = this
        a.core.s.autoplayControls && a.controls(),
          a.core.s.progressBar &&
            a.core.$outer
              .find('.lg')
              .append(
                '<div class="lg-progress-bar"><div class="lg-progress"></div></div>',
              ),
          a.progress(),
          a.core.s.autoplay &&
            a.$el.one('onSlideItemLoad.lg.tm', function () {
              a.startlAuto()
            }),
          a.$el.on('onDragstart.lg.tm touchstart.lg.tm', function () {
            a.interval && (a.cancelAuto(), (a.canceledOnTouch = !0))
          }),
          a.$el.on(
            'onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm',
            function () {
              !a.interval &&
                a.canceledOnTouch &&
                (a.startlAuto(), (a.canceledOnTouch = !1))
            },
          )
      }),
        (c.prototype.progress = function () {
          var a,
            b,
            c = this
          c.$el.on('onBeforeSlide.lg.tm', function () {
            c.core.s.progressBar &&
              c.fromAuto &&
              ((a = c.core.$outer.find('.lg-progress-bar')),
              (b = c.core.$outer.find('.lg-progress')),
              c.interval &&
                (b.removeAttr('style'),
                a.removeClass('lg-start'),
                setTimeout(function () {
                  b.css(
                    'transition',
                    'width ' + (c.core.s.speed + c.core.s.pause) + 'ms ease 0s',
                  ),
                    a.addClass('lg-start')
                }, 20))),
              c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(),
              (c.fromAuto = !1)
          })
        }),
        (c.prototype.controls = function () {
          var b = this
          a(this.core.s.appendAutoplayControlsTo).append(
            '<span class="lg-autoplay-button lg-icon"></span>',
          ),
            b.core.$outer
              .find('.lg-autoplay-button')
              .on('click.lg', function () {
                a(b.core.$outer).hasClass('lg-show-autoplay')
                  ? (b.cancelAuto(), (b.core.s.fourceAutoplay = !1))
                  : b.interval ||
                    (b.startlAuto(),
                    (b.core.s.fourceAutoplay = b.fourceAutoplayTemp))
              })
        }),
        (c.prototype.startlAuto = function () {
          var a = this
          a.core.$outer
            .find('.lg-progress')
            .css(
              'transition',
              'width ' + (a.core.s.speed + a.core.s.pause) + 'ms ease 0s',
            ),
            a.core.$outer.addClass('lg-show-autoplay'),
            a.core.$outer.find('.lg-progress-bar').addClass('lg-start'),
            (a.interval = setInterval(function () {
              a.core.index + 1 < a.core.$items.length
                ? a.core.index++
                : (a.core.index = 0),
                (a.fromAuto = !0),
                a.core.slide(a.core.index, !1, !1, 'next')
            }, a.core.s.speed + a.core.s.pause))
        }),
        (c.prototype.cancelAuto = function () {
          clearInterval(this.interval),
            (this.interval = !1),
            this.core.$outer.find('.lg-progress').removeAttr('style'),
            this.core.$outer.removeClass('lg-show-autoplay'),
            this.core.$outer.find('.lg-progress-bar').removeClass('lg-start')
        }),
        (c.prototype.destroy = function () {
          this.cancelAuto(), this.core.$outer.find('.lg-progress-bar').remove()
        }),
        (a.fn.lightGallery.modules.autoplay = c)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = b(require('jquery')))
      : b(a.jQuery)
  })(this, function (a) {
    !(function () {
      'use strict'
      function b() {
        return (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        )
      }
      var c = { fullScreen: !0 },
        d = function (b) {
          return (
            (this.core = a(b).data('lightGallery')),
            (this.$el = a(b)),
            (this.core.s = a.extend({}, c, this.core.s)),
            this.init(),
            this
          )
        }
      ;(d.prototype.init = function () {
        var a = ''
        if (this.core.s.fullScreen) {
          if (
            !(
              document.fullscreenEnabled ||
              document.webkitFullscreenEnabled ||
              document.mozFullScreenEnabled ||
              document.msFullscreenEnabled
            )
          )
            return
          ;(a = '<span class="lg-fullscreen lg-icon"></span>'),
            this.core.$outer.find('.lg-toolbar').append(a),
            this.fullScreen()
        }
      }),
        (d.prototype.requestFullscreen = function () {
          var a = document.documentElement
          a.requestFullscreen
            ? a.requestFullscreen()
            : a.msRequestFullscreen
            ? a.msRequestFullscreen()
            : a.mozRequestFullScreen
            ? a.mozRequestFullScreen()
            : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
        }),
        (d.prototype.exitFullscreen = function () {
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.msExitFullscreen
            ? document.msExitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }),
        (d.prototype.fullScreen = function () {
          var c = this
          a(document).on(
            'fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg',
            function () {
              c.core.$outer.toggleClass('lg-fullscreen-on')
            },
          ),
            this.core.$outer.find('.lg-fullscreen').on('click.lg', function () {
              b() ? c.exitFullscreen() : c.requestFullscreen()
            })
        }),
        (d.prototype.destroy = function () {
          b() && this.exitFullscreen(),
            a(document).off(
              'fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg',
            )
        }),
        (a.fn.lightGallery.modules.fullscreen = d)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = { pager: !1 },
        c = function (c) {
          return (
            (this.core = a(c).data('lightGallery')),
            (this.$el = a(c)),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.pager && this.core.$items.length > 1 && this.init(),
            this
          )
        }
      ;(c.prototype.init = function () {
        var b,
          c,
          d,
          e = this,
          f = ''
        if (
          (e.core.$outer
            .find('.lg')
            .append('<div class="lg-pager-outer"></div>'),
          e.core.s.dynamic)
        )
          for (var g = 0; g < e.core.s.dynamicEl.length; g++)
            f +=
              '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
              e.core.s.dynamicEl[g].thumb +
              '" /></div></span>'
        else
          e.core.$items.each(function () {
            e.core.s.exThumbImage
              ? (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).attr(e.core.s.exThumbImage) +
                  '" /></div></span>')
              : (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).find('img').attr('src') +
                  '" /></div></span>')
          })
        ;(c = e.core.$outer.find('.lg-pager-outer')),
          c.html(f),
          (b = e.core.$outer.find('.lg-pager-cont')),
          b.on('click.lg touchend.lg', function () {
            var b = a(this)
            ;(e.core.index = b.index()), e.core.slide(e.core.index, !1, !0, !1)
          }),
          c.on('mouseover.lg', function () {
            clearTimeout(d), c.addClass('lg-pager-hover')
          }),
          c.on('mouseout.lg', function () {
            d = setTimeout(function () {
              c.removeClass('lg-pager-hover')
            })
          }),
          e.core.$el.on('onBeforeSlide.lg.tm', function (a, c, d) {
            b.removeClass('lg-pager-active'),
              b.eq(d).addClass('lg-pager-active')
          })
      }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.pager = c)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = {
          thumbnail: !0,
          animateThumb: !0,
          currentPagerPosition: 'middle',
          thumbWidth: 100,
          thumbHeight: '80px',
          thumbContHeight: 100,
          thumbMargin: 5,
          exThumbImage: !1,
          showThumbByDefault: !0,
          toogleThumb: !0,
          pullCaptionUp: !0,
          enableThumbDrag: !0,
          enableThumbSwipe: !0,
          swipeThreshold: 50,
          loadYoutubeThumbnail: !0,
          youtubeThumbSize: 1,
          loadVimeoThumbnail: !0,
          vimeoThumbSize: 'thumbnail_small',
          loadDailymotionThumbnail: !0,
        },
        c = function (c) {
          return (
            (this.core = a(c).data('lightGallery')),
            (this.core.s = a.extend({}, b, this.core.s)),
            (this.$el = a(c)),
            (this.$thumbOuter = null),
            (this.thumbOuterWidth = 0),
            (this.thumbTotalWidth =
              this.core.$items.length *
              (this.core.s.thumbWidth + this.core.s.thumbMargin)),
            (this.thumbIndex = this.core.index),
            this.core.s.animateThumb && (this.core.s.thumbHeight = '100%'),
            (this.left = 0),
            this.init(),
            this
          )
        }
      ;(c.prototype.init = function () {
        var a = this
        this.core.s.thumbnail &&
          this.core.$items.length > 1 &&
          (this.core.s.showThumbByDefault &&
            setTimeout(function () {
              a.core.$outer.addClass('lg-thumb-open')
            }, 700),
          this.core.s.pullCaptionUp &&
            this.core.$outer.addClass('lg-pull-caption-up'),
          this.build(),
          this.core.s.animateThumb && this.core.doCss()
            ? (this.core.s.enableThumbDrag && this.enableThumbDrag(),
              this.core.s.enableThumbSwipe && this.enableThumbSwipe(),
              (this.thumbClickable = !1))
            : (this.thumbClickable = !0),
          this.toogle(),
          this.thumbkeyPress())
      }),
        (c.prototype.build = function () {
          function b(a, b, c) {
            var g,
              h = d.core.isVideo(a, c) || {},
              i = ''
            h.youtube || h.vimeo || h.dailymotion
              ? h.youtube
                ? (g = d.core.s.loadYoutubeThumbnail
                    ? '//img.youtube.com/vi/' +
                      h.youtube[1] +
                      '/' +
                      d.core.s.youtubeThumbSize +
                      '.jpg'
                    : b)
                : h.vimeo
                ? d.core.s.loadVimeoThumbnail
                  ? ((g = '//i.vimeocdn.com/video/error_' + f + '.jpg'),
                    (i = h.vimeo[1]))
                  : (g = b)
                : h.dailymotion &&
                  (g = d.core.s.loadDailymotionThumbnail
                    ? '//www.dailymotion.com/thumbnail/video/' +
                      h.dailymotion[1]
                    : b)
              : (g = b),
              (e +=
                '<div data-vimeo-id="' +
                i +
                '" class="lg-thumb-item" style="width:' +
                d.core.s.thumbWidth +
                'px; height: ' +
                d.core.s.thumbHeight +
                '; margin-right: ' +
                d.core.s.thumbMargin +
                'px"><img src="' +
                g +
                '" /></div>'),
              (i = '')
          }
          var c,
            d = this,
            e = '',
            f = '',
            g =
              '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>'
          switch (this.core.s.vimeoThumbSize) {
            case 'thumbnail_large':
              f = '640'
              break
            case 'thumbnail_medium':
              f = '200x150'
              break
            case 'thumbnail_small':
              f = '100x75'
          }
          if (
            (d.core.$outer.addClass('lg-has-thumb'),
            d.core.$outer.find('.lg').append(g),
            (d.$thumbOuter = d.core.$outer.find('.lg-thumb-outer')),
            (d.thumbOuterWidth = d.$thumbOuter.width()),
            d.core.s.animateThumb &&
              d.core.$outer
                .find('.lg-thumb')
                .css({ width: d.thumbTotalWidth + 'px', position: 'relative' }),
            this.core.s.animateThumb &&
              d.$thumbOuter.css('height', d.core.s.thumbContHeight + 'px'),
            d.core.s.dynamic)
          )
            for (var h = 0; h < d.core.s.dynamicEl.length; h++)
              b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h)
          else
            d.core.$items.each(function (c) {
              d.core.s.exThumbImage
                ? b(
                    a(this).attr('href') || a(this).attr('data-src'),
                    a(this).attr(d.core.s.exThumbImage),
                    c,
                  )
                : b(
                    a(this).attr('href') || a(this).attr('data-src'),
                    a(this).find('img').attr('src'),
                    c,
                  )
            })
          d.core.$outer.find('.lg-thumb').html(e),
            (c = d.core.$outer.find('.lg-thumb-item')),
            c.each(function () {
              var b = a(this),
                c = b.attr('data-vimeo-id')
              c &&
                a.getJSON(
                  '//www.vimeo.com/api/v2/video/' + c + '.json?callback=?',
                  { format: 'json' },
                  function (a) {
                    b.find('img').attr('src', a[0][d.core.s.vimeoThumbSize])
                  },
                )
            }),
            c.eq(d.core.index).addClass('active'),
            d.core.$el.on('onBeforeSlide.lg.tm', function () {
              c.removeClass('active'), c.eq(d.core.index).addClass('active')
            }),
            c.on('click.lg touchend.lg', function () {
              var b = a(this)
              setTimeout(function () {
                ;((d.thumbClickable && !d.core.lgBusy) || !d.core.doCss()) &&
                  ((d.core.index = b.index()),
                  d.core.slide(d.core.index, !1, !0, !1))
              }, 50)
            }),
            d.core.$el.on('onBeforeSlide.lg.tm', function () {
              d.animateThumb(d.core.index)
            }),
            a(window).on(
              'resize.lg.thumb orientationchange.lg.thumb',
              function () {
                setTimeout(function () {
                  d.animateThumb(d.core.index),
                    (d.thumbOuterWidth = d.$thumbOuter.width())
                }, 200)
              },
            )
        }),
        (c.prototype.setTranslate = function (a) {
          this.core.$outer
            .find('.lg-thumb')
            .css({ transform: 'translate3d(-' + a + 'px, 0px, 0px)' })
        }),
        (c.prototype.animateThumb = function (a) {
          var b = this.core.$outer.find('.lg-thumb')
          if (this.core.s.animateThumb) {
            var c
            switch (this.core.s.currentPagerPosition) {
              case 'left':
                c = 0
                break
              case 'middle':
                c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2
                break
              case 'right':
                c = this.thumbOuterWidth - this.core.s.thumbWidth
            }
            ;(this.left =
              (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c),
              this.left > this.thumbTotalWidth - this.thumbOuterWidth &&
                (this.left = this.thumbTotalWidth - this.thumbOuterWidth),
              this.left < 0 && (this.left = 0),
              this.core.lGalleryOn
                ? (b.hasClass('on') ||
                    this.core.$outer
                      .find('.lg-thumb')
                      .css('transition-duration', this.core.s.speed + 'ms'),
                  this.core.doCss() ||
                    b.animate({ left: -this.left + 'px' }, this.core.s.speed))
                : this.core.doCss() || b.css('left', -this.left + 'px'),
              this.setTranslate(this.left)
          }
        }),
        (c.prototype.enableThumbDrag = function () {
          var b = this,
            c = 0,
            d = 0,
            e = !1,
            f = !1,
            g = 0
          b.$thumbOuter.addClass('lg-grab'),
            b.core.$outer
              .find('.lg-thumb')
              .on('mousedown.lg.thumb', function (a) {
                b.thumbTotalWidth > b.thumbOuterWidth &&
                  (a.preventDefault(),
                  (c = a.pageX),
                  (e = !0),
                  (b.core.$outer.scrollLeft += 1),
                  (b.core.$outer.scrollLeft -= 1),
                  (b.thumbClickable = !1),
                  b.$thumbOuter.removeClass('lg-grab').addClass('lg-grabbing'))
              }),
            a(window).on('mousemove.lg.thumb', function (a) {
              e &&
                ((g = b.left),
                (f = !0),
                (d = a.pageX),
                b.$thumbOuter.addClass('lg-dragging'),
                (g -= d - c),
                g > b.thumbTotalWidth - b.thumbOuterWidth &&
                  (g = b.thumbTotalWidth - b.thumbOuterWidth),
                g < 0 && (g = 0),
                b.setTranslate(g))
            }),
            a(window).on('mouseup.lg.thumb', function () {
              f
                ? ((f = !1),
                  b.$thumbOuter.removeClass('lg-dragging'),
                  (b.left = g),
                  Math.abs(d - c) < b.core.s.swipeThreshold &&
                    (b.thumbClickable = !0))
                : (b.thumbClickable = !0),
                e &&
                  ((e = !1),
                  b.$thumbOuter.removeClass('lg-grabbing').addClass('lg-grab'))
            })
        }),
        (c.prototype.enableThumbSwipe = function () {
          var a = this,
            b = 0,
            c = 0,
            d = !1,
            e = 0
          a.core.$outer.find('.lg-thumb').on('touchstart.lg', function (c) {
            a.thumbTotalWidth > a.thumbOuterWidth &&
              (c.preventDefault(),
              (b = c.originalEvent.targetTouches[0].pageX),
              (a.thumbClickable = !1))
          }),
            a.core.$outer.find('.lg-thumb').on('touchmove.lg', function (f) {
              a.thumbTotalWidth > a.thumbOuterWidth &&
                (f.preventDefault(),
                (c = f.originalEvent.targetTouches[0].pageX),
                (d = !0),
                a.$thumbOuter.addClass('lg-dragging'),
                (e = a.left),
                (e -= c - b),
                e > a.thumbTotalWidth - a.thumbOuterWidth &&
                  (e = a.thumbTotalWidth - a.thumbOuterWidth),
                e < 0 && (e = 0),
                a.setTranslate(e))
            }),
            a.core.$outer.find('.lg-thumb').on('touchend.lg', function () {
              a.thumbTotalWidth > a.thumbOuterWidth && d
                ? ((d = !1),
                  a.$thumbOuter.removeClass('lg-dragging'),
                  Math.abs(c - b) < a.core.s.swipeThreshold &&
                    (a.thumbClickable = !0),
                  (a.left = e))
                : (a.thumbClickable = !0)
            })
        }),
        (c.prototype.toogle = function () {
          var a = this
          a.core.s.toogleThumb &&
            (a.core.$outer.addClass('lg-can-toggle'),
            a.$thumbOuter.append(
              '<span class="lg-toogle-thumb lg-icon"></span>',
            ),
            a.core.$outer.find('.lg-toogle-thumb').on('click.lg', function () {
              a.core.$outer.toggleClass('lg-thumb-open')
            }))
        }),
        (c.prototype.thumbkeyPress = function () {
          var b = this
          a(window).on('keydown.lg.thumb', function (a) {
            38 === a.keyCode
              ? (a.preventDefault(), b.core.$outer.addClass('lg-thumb-open'))
              : 40 === a.keyCode &&
                (a.preventDefault(), b.core.$outer.removeClass('lg-thumb-open'))
          })
        }),
        (c.prototype.destroy = function () {
          this.core.s.thumbnail &&
            this.core.$items.length > 1 &&
            (a(window).off(
              'resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb',
            ),
            this.$thumbOuter.remove(),
            this.core.$outer.removeClass('lg-has-thumb'))
        }),
        (a.fn.lightGallery.modules.Thumbnail = c)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = b(require('jquery')))
      : b(a.jQuery)
  })(this, function (a) {
    !(function () {
      'use strict'
      function b(a, b, c, d) {
        var e = this
        if (
          (e.core.$slide
            .eq(b)
            .find('.lg-video')
            .append(e.loadVideo(c, 'lg-object', !0, b, d)),
          d)
        )
          if (e.core.s.videojs)
            try {
              videojs(
                e.core.$slide.eq(b).find('.lg-html5').get(0),
                e.core.s.videojsOptions,
                function () {
                  !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play()
                },
              )
            } catch (a) {
              console.error('Make sure you have included videojs')
            }
          else
            !e.videoLoaded &&
              e.core.s.autoplayFirstVideo &&
              e.core.$slide.eq(b).find('.lg-html5').get(0).play()
      }
      function c(a, b) {
        var c = this.core.$slide.eq(b).find('.lg-video-cont')
        c.hasClass('lg-has-iframe') ||
          (c.css('max-width', this.core.s.videoMaxWidth),
          (this.videoLoaded = !0))
      }
      function d(b, c, d) {
        var e = this,
          f = e.core.$slide.eq(c),
          g = f.find('.lg-youtube').get(0),
          h = f.find('.lg-vimeo').get(0),
          i = f.find('.lg-dailymotion').get(0),
          j = f.find('.lg-vk').get(0),
          k = f.find('.lg-html5').get(0)
        if (g)
          g.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*',
          )
        else if (h)
          try {
            $f(h).api('pause')
          } catch (a) {
            console.error('Make sure you have included froogaloop2 js')
          }
        else if (i) i.contentWindow.postMessage('pause', '*')
        else if (k)
          if (e.core.s.videojs)
            try {
              videojs(k).pause()
            } catch (a) {
              console.error('Make sure you have included videojs')
            }
          else k.pause()
        j && a(j).attr('src', a(j).attr('src').replace('&autoplay', '&noplay'))
        var l
        l = e.core.s.dynamic
          ? e.core.s.dynamicEl[d].src
          : e.core.$items.eq(d).attr('href') ||
            e.core.$items.eq(d).attr('data-src')
        var m = e.core.isVideo(l, d) || {}
        ;(m.youtube || m.vimeo || m.dailymotion || m.vk) &&
          e.core.$outer.addClass('lg-hide-download')
      }
      var e = {
          videoMaxWidth: '855px',
          autoplayFirstVideo: !0,
          youtubePlayerParams: !1,
          vimeoPlayerParams: !1,
          dailymotionPlayerParams: !1,
          vkPlayerParams: !1,
          videojs: !1,
          videojsOptions: {},
        },
        f = function (b) {
          return (
            (this.core = a(b).data('lightGallery')),
            (this.$el = a(b)),
            (this.core.s = a.extend({}, e, this.core.s)),
            (this.videoLoaded = !1),
            this.init(),
            this
          )
        }
      ;(f.prototype.init = function () {
        var e = this
        e.core.$el.on('hasVideo.lg.tm', b.bind(this)),
          e.core.$el.on('onAferAppendSlide.lg.tm', c.bind(this)),
          e.core.doCss() &&
          e.core.$items.length > 1 &&
          (e.core.s.enableSwipe || e.core.s.enableDrag)
            ? e.core.$el.on('onSlideClick.lg.tm', function () {
                var a = e.core.$slide.eq(e.core.index)
                e.loadVideoOnclick(a)
              })
            : e.core.$slide.on('click.lg', function () {
                e.loadVideoOnclick(a(this))
              }),
          e.core.$el.on('onBeforeSlide.lg.tm', d.bind(this)),
          e.core.$el.on('onAfterSlide.lg.tm', function (a, b) {
            e.core.$slide.eq(b).removeClass('lg-video-playing')
          }),
          e.core.s.autoplayFirstVideo &&
            e.core.$el.on('onAferAppendSlide.lg.tm', function (a, b) {
              if (!e.core.lGalleryOn) {
                var c = e.core.$slide.eq(b)
                setTimeout(function () {
                  e.loadVideoOnclick(c)
                }, 100)
              }
            })
      }),
        (f.prototype.loadVideo = function (b, c, d, e, f) {
          var g = '',
            h = 1,
            i = '',
            j = this.core.isVideo(b, e) || {}
          if (
            (d &&
              (h = this.videoLoaded
                ? 0
                : this.core.s.autoplayFirstVideo
                ? 1
                : 0),
            j.youtube)
          )
            (i = '?wmode=opaque&autoplay=' + h + '&enablejsapi=1'),
              this.core.s.youtubePlayerParams &&
                (i = i + '&' + a.param(this.core.s.youtubePlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-youtube ' +
                c +
                '" width="560" height="315" src="//www.youtube.com/embed/' +
                j.youtube[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>')
          else if (j.vimeo)
            (i = '?autoplay=' + h + '&api=1'),
              this.core.s.vimeoPlayerParams &&
                (i = i + '&' + a.param(this.core.s.vimeoPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vimeo ' +
                c +
                '" width="560" height="315"  src="//player.vimeo.com/video/' +
                j.vimeo[1] +
                i +
                '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
          else if (j.dailymotion)
            (i = '?wmode=opaque&autoplay=' + h + '&api=postMessage'),
              this.core.s.dailymotionPlayerParams &&
                (i = i + '&' + a.param(this.core.s.dailymotionPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-dailymotion ' +
                c +
                '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
                j.dailymotion[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>')
          else if (j.html5) {
            var k = f.substring(0, 1)
            ;('.' !== k && '#' !== k) || (f = a(f).html()), (g = f)
          } else
            j.vk &&
              ((i = '&autoplay=' + h),
              this.core.s.vkPlayerParams &&
                (i = i + '&' + a.param(this.core.s.vkPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vk ' +
                c +
                '" width="560" height="315" src="//vk.com/video_ext.php?' +
                j.vk[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>'))
          return g
        }),
        (f.prototype.loadVideoOnclick = function (a) {
          var b = this
          if (
            a.find('.lg-object').hasClass('lg-has-poster') &&
            a.find('.lg-object').is(':visible')
          )
            if (a.hasClass('lg-has-video')) {
              var c = a.find('.lg-youtube').get(0),
                d = a.find('.lg-vimeo').get(0),
                e = a.find('.lg-dailymotion').get(0),
                f = a.find('.lg-html5').get(0)
              if (c)
                c.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  '*',
                )
              else if (d)
                try {
                  $f(d).api('play')
                } catch (a) {
                  console.error('Make sure you have included froogaloop2 js')
                }
              else if (e) e.contentWindow.postMessage('play', '*')
              else if (f)
                if (b.core.s.videojs)
                  try {
                    videojs(f).play()
                  } catch (a) {
                    console.error('Make sure you have included videojs')
                  }
                else f.play()
              a.addClass('lg-video-playing')
            } else {
              a.addClass('lg-video-playing lg-has-video')
              var g,
                h,
                i = function (c, d) {
                  if (
                    (a
                      .find('.lg-video')
                      .append(b.loadVideo(c, '', !1, b.core.index, d)),
                    d)
                  )
                    if (b.core.s.videojs)
                      try {
                        videojs(
                          b.core.$slide
                            .eq(b.core.index)
                            .find('.lg-html5')
                            .get(0),
                          b.core.s.videojsOptions,
                          function () {
                            this.play()
                          },
                        )
                      } catch (a) {
                        console.error('Make sure you have included videojs')
                      }
                    else
                      b.core.$slide
                        .eq(b.core.index)
                        .find('.lg-html5')
                        .get(0)
                        .play()
                }
              b.core.s.dynamic
                ? ((g = b.core.s.dynamicEl[b.core.index].src),
                  (h = b.core.s.dynamicEl[b.core.index].html),
                  i(g, h))
                : ((g =
                    b.core.$items.eq(b.core.index).attr('href') ||
                    b.core.$items.eq(b.core.index).attr('data-src')),
                  (h = b.core.$items.eq(b.core.index).attr('data-html')),
                  i(g, h))
              var j = a.find('.lg-object')
              a.find('.lg-video').append(j),
                a.find('.lg-video-object').hasClass('lg-html5') ||
                  (a.removeClass('lg-complete'),
                  a
                    .find('.lg-video-object')
                    .on('load.lg error.lg', function () {
                      a.addClass('lg-complete')
                    }))
            }
        }),
        (f.prototype.destroy = function () {
          this.videoLoaded = !1
        }),
        (a.fn.lightGallery.modules.video = f)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = function () {
          var a = !1,
            b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
          return b && parseInt(b[2], 10) < 54 && (a = !0), a
        },
        c = {
          scale: 1,
          zoom: !0,
          actualSize: !0,
          enableZoomAfter: 300,
          useLeftForZoom: b(),
        },
        d = function (b) {
          return (
            (this.core = a(b).data('lightGallery')),
            (this.core.s = a.extend({}, c, this.core.s)),
            this.core.s.zoom &&
              this.core.doCss() &&
              (this.init(),
              (this.zoomabletimeout = !1),
              (this.pageX = a(window).width() / 2),
              (this.pageY = a(window).height() / 2 + a(window).scrollTop())),
            this
          )
        }
      ;(d.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>'
        b.core.s.actualSize &&
          (c += '<span id="lg-actual-size" class="lg-icon"></span>'),
          b.core.s.useLeftForZoom
            ? b.core.$outer.addClass('lg-use-left-for-zoom')
            : b.core.$outer.addClass('lg-use-transition-for-zoom'),
          this.core.$outer.find('.lg-toolbar').append(c),
          b.core.$el.on('onSlideItemLoad.lg.tm.zoom', function (c, d, e) {
            var f = b.core.s.enableZoomAfter + e
            a('body').hasClass('lg-from-hash') && e
              ? (f = 0)
              : a('body').removeClass('lg-from-hash'),
              (b.zoomabletimeout = setTimeout(function () {
                b.core.$slide.eq(d).addClass('lg-zoomable')
              }, f + 30))
          })
        var d = 1,
          e = function (c) {
            var d,
              e,
              f = b.core.$outer.find('.lg-current .lg-image'),
              g = (a(window).width() - f.prop('offsetWidth')) / 2,
              h =
                (a(window).height() - f.prop('offsetHeight')) / 2 +
                a(window).scrollTop()
            ;(d = b.pageX - g), (e = b.pageY - h)
            var i = (c - 1) * d,
              j = (c - 1) * e
            f
              .css('transform', 'scale3d(' + c + ', ' + c + ', 1)')
              .attr('data-scale', c),
              b.core.s.useLeftForZoom
                ? f
                    .parent()
                    .css({ left: -i + 'px', top: -j + 'px' })
                    .attr('data-x', i)
                    .attr('data-y', j)
                : f
                    .parent()
                    .css(
                      'transform',
                      'translate3d(-' + i + 'px, -' + j + 'px, 0)',
                    )
                    .attr('data-x', i)
                    .attr('data-y', j)
          },
          f = function () {
            d > 1 ? b.core.$outer.addClass('lg-zoomed') : b.resetZoom(),
              d < 1 && (d = 1),
              e(d)
          },
          g = function (c, e, g, h) {
            var i,
              j = e.prop('offsetWidth')
            i = b.core.s.dynamic
              ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j
              : b.core.$items.eq(g).attr('data-width') || e[0].naturalWidth || j
            var k
            b.core.$outer.hasClass('lg-zoomed')
              ? (d = 1)
              : i > j && ((k = i / j), (d = k || 2)),
              h
                ? ((b.pageX = a(window).width() / 2),
                  (b.pageY = a(window).height() / 2 + a(window).scrollTop()))
                : ((b.pageX =
                    c.pageX || c.originalEvent.targetTouches[0].pageX),
                  (b.pageY =
                    c.pageY || c.originalEvent.targetTouches[0].pageY)),
              f(),
              setTimeout(function () {
                b.core.$outer.removeClass('lg-grabbing').addClass('lg-grab')
              }, 10)
          },
          h = !1
        b.core.$el.on('onAferAppendSlide.lg.tm.zoom', function (a, c) {
          var d = b.core.$slide.eq(c).find('.lg-image')
          d.on('dblclick', function (a) {
            g(a, d, c)
          }),
            d.on('touchstart', function (a) {
              h
                ? (clearTimeout(h), (h = null), g(a, d, c))
                : (h = setTimeout(function () {
                    h = null
                  }, 300)),
                a.preventDefault()
            })
        }),
          a(window).on(
            'resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom',
            function () {
              ;(b.pageX = a(window).width() / 2),
                (b.pageY = a(window).height() / 2 + a(window).scrollTop()),
                e(d)
            },
          ),
          a('#lg-zoom-out').on('click.lg', function () {
            b.core.$outer.find('.lg-current .lg-image').length &&
              ((d -= b.core.s.scale), f())
          }),
          a('#lg-zoom-in').on('click.lg', function () {
            b.core.$outer.find('.lg-current .lg-image').length &&
              ((d += b.core.s.scale), f())
          }),
          a('#lg-actual-size').on('click.lg', function (a) {
            g(
              a,
              b.core.$slide.eq(b.core.index).find('.lg-image'),
              b.core.index,
              !0,
            )
          }),
          b.core.$el.on('onBeforeSlide.lg.tm', function () {
            ;(d = 1), b.resetZoom()
          }),
          b.zoomDrag(),
          b.zoomSwipe()
      }),
        (d.prototype.resetZoom = function () {
          this.core.$outer.removeClass('lg-zoomed'),
            this.core.$slide
              .find('.lg-img-wrap')
              .removeAttr('style data-x data-y'),
            this.core.$slide.find('.lg-image').removeAttr('style data-scale'),
            (this.pageX = a(window).width() / 2),
            (this.pageY = a(window).height() / 2 + a(window).scrollTop())
        }),
        (d.prototype.zoomSwipe = function () {
          var a = this,
            b = {},
            c = {},
            d = !1,
            e = !1,
            f = !1
          a.core.$slide.on('touchstart.lg', function (c) {
            if (a.core.$outer.hasClass('lg-zoomed')) {
              var d = a.core.$slide.eq(a.core.index).find('.lg-object')
              ;(f =
                d.prop('offsetHeight') * d.attr('data-scale') >
                a.core.$outer.find('.lg').height()),
                (e =
                  d.prop('offsetWidth') * d.attr('data-scale') >
                  a.core.$outer.find('.lg').width()),
                (e || f) &&
                  (c.preventDefault(),
                  (b = {
                    x: c.originalEvent.targetTouches[0].pageX,
                    y: c.originalEvent.targetTouches[0].pageY,
                  }))
            }
          }),
            a.core.$slide.on('touchmove.lg', function (g) {
              if (a.core.$outer.hasClass('lg-zoomed')) {
                var h,
                  i,
                  j = a.core.$slide.eq(a.core.index).find('.lg-img-wrap')
                g.preventDefault(),
                  (d = !0),
                  (c = {
                    x: g.originalEvent.targetTouches[0].pageX,
                    y: g.originalEvent.targetTouches[0].pageY,
                  }),
                  a.core.$outer.addClass('lg-zoom-dragging'),
                  (i = f
                    ? -Math.abs(j.attr('data-y')) + (c.y - b.y)
                    : -Math.abs(j.attr('data-y'))),
                  (h = e
                    ? -Math.abs(j.attr('data-x')) + (c.x - b.x)
                    : -Math.abs(j.attr('data-x'))),
                  (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) &&
                    (a.core.s.useLeftForZoom
                      ? j.css({ left: h + 'px', top: i + 'px' })
                      : j.css(
                          'transform',
                          'translate3d(' + h + 'px, ' + i + 'px, 0)',
                        ))
              }
            }),
            a.core.$slide.on('touchend.lg', function () {
              a.core.$outer.hasClass('lg-zoomed') &&
                d &&
                ((d = !1),
                a.core.$outer.removeClass('lg-zoom-dragging'),
                a.touchendZoom(b, c, e, f))
            })
        }),
        (d.prototype.zoomDrag = function () {
          var b = this,
            c = {},
            d = {},
            e = !1,
            f = !1,
            g = !1,
            h = !1
          b.core.$slide.on('mousedown.lg.zoom', function (d) {
            var f = b.core.$slide.eq(b.core.index).find('.lg-object')
            ;(h =
              f.prop('offsetHeight') * f.attr('data-scale') >
              b.core.$outer.find('.lg').height()),
              (g =
                f.prop('offsetWidth') * f.attr('data-scale') >
                b.core.$outer.find('.lg').width()),
              b.core.$outer.hasClass('lg-zoomed') &&
                a(d.target).hasClass('lg-object') &&
                (g || h) &&
                (d.preventDefault(),
                (c = { x: d.pageX, y: d.pageY }),
                (e = !0),
                (b.core.$outer.scrollLeft += 1),
                (b.core.$outer.scrollLeft -= 1),
                b.core.$outer.removeClass('lg-grab').addClass('lg-grabbing'))
          }),
            a(window).on('mousemove.lg.zoom', function (a) {
              if (e) {
                var i,
                  j,
                  k = b.core.$slide.eq(b.core.index).find('.lg-img-wrap')
                ;(f = !0),
                  (d = { x: a.pageX, y: a.pageY }),
                  b.core.$outer.addClass('lg-zoom-dragging'),
                  (j = h
                    ? -Math.abs(k.attr('data-y')) + (d.y - c.y)
                    : -Math.abs(k.attr('data-y'))),
                  (i = g
                    ? -Math.abs(k.attr('data-x')) + (d.x - c.x)
                    : -Math.abs(k.attr('data-x'))),
                  b.core.s.useLeftForZoom
                    ? k.css({ left: i + 'px', top: j + 'px' })
                    : k.css(
                        'transform',
                        'translate3d(' + i + 'px, ' + j + 'px, 0)',
                      )
              }
            }),
            a(window).on('mouseup.lg.zoom', function (a) {
              e &&
                ((e = !1),
                b.core.$outer.removeClass('lg-zoom-dragging'),
                !f ||
                  (c.x === d.x && c.y === d.y) ||
                  ((d = { x: a.pageX, y: a.pageY }),
                  b.touchendZoom(c, d, g, h)),
                (f = !1)),
                b.core.$outer.removeClass('lg-grabbing').addClass('lg-grab')
            })
        }),
        (d.prototype.touchendZoom = function (a, b, c, d) {
          var e = this,
            f = e.core.$slide.eq(e.core.index).find('.lg-img-wrap'),
            g = e.core.$slide.eq(e.core.index).find('.lg-object'),
            h = -Math.abs(f.attr('data-x')) + (b.x - a.x),
            i = -Math.abs(f.attr('data-y')) + (b.y - a.y),
            j =
              (e.core.$outer.find('.lg').height() - g.prop('offsetHeight')) / 2,
            k = Math.abs(
              g.prop('offsetHeight') * Math.abs(g.attr('data-scale')) -
                e.core.$outer.find('.lg').height() +
                j,
            ),
            l = (e.core.$outer.find('.lg').width() - g.prop('offsetWidth')) / 2,
            m = Math.abs(
              g.prop('offsetWidth') * Math.abs(g.attr('data-scale')) -
                e.core.$outer.find('.lg').width() +
                l,
            )
          ;(Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) &&
            (d && (i <= -k ? (i = -k) : i >= -j && (i = -j)),
            c && (h <= -m ? (h = -m) : h >= -l && (h = -l)),
            d
              ? f.attr('data-y', Math.abs(i))
              : (i = -Math.abs(f.attr('data-y'))),
            c
              ? f.attr('data-x', Math.abs(h))
              : (h = -Math.abs(f.attr('data-x'))),
            e.core.s.useLeftForZoom
              ? f.css({ left: h + 'px', top: i + 'px' })
              : f.css('transform', 'translate3d(' + h + 'px, ' + i + 'px, 0)'))
        }),
        (d.prototype.destroy = function () {
          var b = this
          b.core.$el.off('.lg.zoom'),
            a(window).off('.lg.zoom'),
            b.core.$slide.off('.lg.zoom'),
            b.core.$el.off('.lg.tm.zoom'),
            b.resetZoom(),
            clearTimeout(b.zoomabletimeout),
            (b.zoomabletimeout = !1)
        }),
        (a.fn.lightGallery.modules.zoom = d)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = { hash: !0 },
        c = function (c) {
          return (
            (this.core = a(c).data('lightGallery')),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.hash &&
              ((this.oldHash = window.location.hash), this.init()),
            this
          )
        }
      ;(c.prototype.init = function () {
        var b,
          c = this
        c.core.$el.on('onAfterSlide.lg.tm', function (a, b, d) {
          history.replaceState
            ? history.replaceState(
                null,
                null,
                window.location.pathname +
                  window.location.search +
                  '#lg=' +
                  c.core.s.galleryId +
                  '&slide=' +
                  d,
              )
            : (window.location.hash =
                'lg=' + c.core.s.galleryId + '&slide=' + d)
        }),
          a(window).on('hashchange.lg.hash', function () {
            b = window.location.hash
            var a = parseInt(b.split('&slide=')[1], 10)
            b.indexOf('lg=' + c.core.s.galleryId) > -1
              ? c.core.slide(a, !1, !1)
              : c.core.lGalleryOn && c.core.destroy()
          })
      }),
        (c.prototype.destroy = function () {
          this.core.s.hash &&
            (this.oldHash &&
            this.oldHash.indexOf('lg=' + this.core.s.galleryId) < 0
              ? history.replaceState
                ? history.replaceState(null, null, this.oldHash)
                : (window.location.hash = this.oldHash)
              : history.replaceState
              ? history.replaceState(
                  null,
                  document.title,
                  window.location.pathname + window.location.search,
                )
              : (window.location.hash = ''),
            this.core.$el.off('.lg.hash'))
        }),
        (a.fn.lightGallery.modules.hash = c)
    })()
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (a) {
          return b(a)
        })
      : 'object' == typeof exports
      ? (module.exports = b(require('jquery')))
      : b(jQuery)
  })(0, function (a) {
    !(function () {
      'use strict'
      var b = {
          share: !0,
          facebook: !0,
          facebookDropdownText: 'Facebook',
          twitter: !0,
          twitterDropdownText: 'Twitter',
          googlePlus: !0,
          googlePlusDropdownText: 'GooglePlus',
          pinterest: !0,
          pinterestDropdownText: 'Pinterest',
        },
        c = function (c) {
          return (
            (this.core = a(c).data('lightGallery')),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.share && this.init(),
            this
          )
        }
      ;(c.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">'
        ;(c += b.core.s.facebook
          ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
            this.core.s.facebookDropdownText +
            '</span></a></li>'
          : ''),
          (c += b.core.s.twitter
            ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.twitterDropdownText +
              '</span></a></li>'
            : ''),
          (c += b.core.s.googlePlus
            ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.googlePlusDropdownText +
              '</span></a></li>'
            : ''),
          (c += b.core.s.pinterest
            ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.pinterestDropdownText +
              '</span></a></li>'
            : ''),
          (c += '</ul></span>'),
          this.core.$outer.find('.lg-toolbar').append(c),
          this.core.$outer
            .find('.lg')
            .append('<div id="lg-dropdown-overlay"></div>'),
          a('#lg-share').on('click.lg', function () {
            b.core.$outer.toggleClass('lg-dropdown-active')
          }),
          a('#lg-dropdown-overlay').on('click.lg', function () {
            b.core.$outer.removeClass('lg-dropdown-active')
          }),
          b.core.$el.on('onAfterSlide.lg.tm', function (c, d, e) {
            setTimeout(function () {
              a('#lg-share-facebook').attr(
                'href',
                'https://www.facebook.com/sharer/sharer.php?u=' +
                  encodeURIComponent(
                    b.getSahreProps(e, 'facebookShareUrl') ||
                      window.location.href,
                  ),
              ),
                a('#lg-share-twitter').attr(
                  'href',
                  'https://twitter.com/intent/tweet?text=' +
                    b.getSahreProps(e, 'tweetText') +
                    '&url=' +
                    encodeURIComponent(
                      b.getSahreProps(e, 'twitterShareUrl') ||
                        window.location.href,
                    ),
                ),
                a('#lg-share-googleplus').attr(
                  'href',
                  'https://plus.google.com/share?url=' +
                    encodeURIComponent(
                      b.getSahreProps(e, 'googleplusShareUrl') ||
                        window.location.href,
                    ),
                ),
                a('#lg-share-pinterest').attr(
                  'href',
                  'http://www.pinterest.com/pin/create/button/?url=' +
                    encodeURIComponent(
                      b.getSahreProps(e, 'pinterestShareUrl') ||
                        window.location.href,
                    ) +
                    '&media=' +
                    encodeURIComponent(b.getSahreProps(e, 'src')) +
                    '&description=' +
                    b.getSahreProps(e, 'pinterestText'),
                )
            }, 100)
          })
      }),
        (c.prototype.getSahreProps = function (a, b) {
          var c = ''
          if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b]
          else {
            var d = this.core.$items.eq(a).attr('href'),
              e = this.core.$items.eq(a).data(b)
            c = 'src' === b ? d || e : e
          }
          return c
        }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.share = c)
    })()
  })
// end light gallery

// video js
;(function () {
  var b = void 0,
    f = !0,
    j = null,
    l = !1
  function m() {
    return function () {}
  }
  function n(a) {
    return function () {
      return this[a]
    }
  }
  function p(a) {
    return function () {
      return a
    }
  }
  var s
  document.createElement('video')
  document.createElement('audio')
  document.createElement('track')
  function t(a, c, d) {
    if ('string' === typeof a) {
      0 === a.indexOf('#') && (a = a.slice(1))
      if (t.Ca[a])
        return (
          c &&
            t.log.warn(
              'Player "' +
                a +
                '" is already initialised. Options will not be applied.',
            ),
          d && t.Ca[a].I(d),
          t.Ca[a]
        )
      a = t.m(a)
    }
    if (!a || !a.nodeName)
      throw new TypeError('The element or ID supplied is not valid. (videojs)')
    return a.player || new t.Player(a, c, d)
  }
  var videojs = (window.videojs = t)
  t.fc = '4.12'
  t.sd = 'https:' == document.location.protocol ? 'https://' : 'http://'
  t.VERSION = '4.12.15'
  t.options = {
    techOrder: ['html5', 'flash'],
    html5: {},
    flash: {},
    width: 300,
    height: 150,
    defaultVolume: 0,
    playbackRates: [],
    inactivityTimeout: 2e3,
    children: {
      mediaLoader: {},
      posterImage: {},
      loadingSpinner: {},
      textTrackDisplay: {},
      bigPlayButton: {},
      controlBar: {},
      errorDisplay: {},
      textTrackSettings: {},
    },
    language:
      document.getElementsByTagName('html')[0].getAttribute('lang') ||
      (navigator.languages && navigator.languages[0]) ||
      navigator.Ef ||
      navigator.language ||
      'en',
    languages: {},
    notSupportedMessage: 'No compatible source was found for this video.',
  }
  'GENERATED_CDN_VSN' !== t.fc &&
    (videojs.options.flash.swf =
      t.sd + 'vjs.zencdn.net/' + t.fc + '/video-js.swf')
  t.Gd = function (a, c) {
    t.options.languages[a] =
      t.options.languages[a] !== b ? t.Z.Aa(t.options.languages[a], c) : c
    return t.options.languages
  }
  t.Ca = {}
  'function' === typeof define && define.amd
    ? define('videojs', [], function () {
        return videojs
      })
    : 'object' === typeof exports &&
      'object' === typeof module &&
      (module.exports = videojs)
  t.Ga = t.CoreObject = m()
  t.Ga.extend = function (a) {
    var c, d
    a = a || {}
    c = a.init || a.l || this.prototype.init || this.prototype.l || m()
    d = function () {
      c.apply(this, arguments)
    }
    d.prototype = t.i.create(this.prototype)
    d.prototype.constructor = d
    d.extend = t.Ga.extend
    d.create = t.Ga.create
    for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e])
    return d
  }
  t.Ga.create = function () {
    var a = t.i.create(this.prototype)
    this.apply(a, arguments)
    return a
  }
  t.b = function (a, c, d) {
    if (t.i.isArray(c)) return v(t.b, a, c, d)
    var e = t.getData(a)
    e.G || (e.G = {})
    e.G[c] || (e.G[c] = [])
    d.s || (d.s = t.s++)
    e.G[c].push(d)
    e.ba ||
      ((e.disabled = l),
      (e.ba = function (c) {
        if (!e.disabled) {
          c = t.Nb(c)
          var d = e.G[c.type]
          if (d)
            for (var d = d.slice(0), k = 0, q = d.length; k < q && !c.Nc(); k++)
              d[k].call(a, c)
        }
      }))
    1 == e.G[c].length &&
      (a.addEventListener
        ? a.addEventListener(c, e.ba, l)
        : a.attachEvent && a.attachEvent('on' + c, e.ba))
  }
  t.n = function (a, c, d) {
    if (t.Ic(a)) {
      var e = t.getData(a)
      if (e.G) {
        if (t.i.isArray(c)) return v(t.n, a, c, d)
        if (c) {
          var g = e.G[c]
          if (g) {
            if (d) {
              if (d.s)
                for (e = 0; e < g.length; e++)
                  g[e].s === d.s && g.splice(e--, 1)
            } else e.G[c] = []
            t.xc(a, c)
          }
        } else for (g in e.G) (c = g), (e.G[c] = []), t.xc(a, c)
      }
    }
  }
  t.xc = function (a, c) {
    var d = t.getData(a)
    0 === d.G[c].length &&
      (delete d.G[c],
      a.removeEventListener
        ? a.removeEventListener(c, d.ba, l)
        : a.detachEvent && a.detachEvent('on' + c, d.ba))
    t.hb(d.G) && (delete d.G, delete d.ba, delete d.disabled)
    t.hb(d) && t.Zc(a)
  }
  t.Nb = function (a) {
    function c() {
      return f
    }
    function d() {
      return l
    }
    if (!a || !a.Sb) {
      var e = a || window.event
      a = {}
      for (var g in e)
        'layerX' !== g &&
          'layerY' !== g &&
          'keyLocation' !== g &&
          (('returnValue' == g && e.preventDefault) || (a[g] = e[g]))
      a.target || (a.target = a.srcElement || document)
      a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement
      a.preventDefault = function () {
        e.preventDefault && e.preventDefault()
        a.returnValue = l
        a.ee = c
        a.defaultPrevented = f
      }
      a.ee = d
      a.defaultPrevented = l
      a.stopPropagation = function () {
        e.stopPropagation && e.stopPropagation()
        a.cancelBubble = f
        a.Sb = c
      }
      a.Sb = d
      a.stopImmediatePropagation = function () {
        e.stopImmediatePropagation && e.stopImmediatePropagation()
        a.Nc = c
        a.stopPropagation()
      }
      a.Nc = d
      if (a.clientX != j) {
        g = document.documentElement
        var h = document.body
        a.pageX =
          a.clientX +
          ((g && g.scrollLeft) || (h && h.scrollLeft) || 0) -
          ((g && g.clientLeft) || (h && h.clientLeft) || 0)
        a.pageY =
          a.clientY +
          ((g && g.scrollTop) || (h && h.scrollTop) || 0) -
          ((g && g.clientTop) || (h && h.clientTop) || 0)
      }
      a.which = a.charCode || a.keyCode
      a.button != j &&
        (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0)
    }
    return a
  }
  t.o = function (a, c) {
    var d = t.Ic(a) ? t.getData(a) : {},
      e = a.parentNode || a.ownerDocument
    'string' === typeof c && (c = { type: c, target: a })
    c = t.Nb(c)
    d.ba && d.ba.call(a, c)
    if (e && !c.Sb() && c.bubbles !== l) t.o(e, c)
    else if (
      !e &&
      !c.defaultPrevented &&
      ((d = t.getData(c.target)), c.target[c.type])
    ) {
      d.disabled = f
      if ('function' === typeof c.target[c.type]) c.target[c.type]()
      d.disabled = l
    }
    return !c.defaultPrevented
  }
  t.N = function (a, c, d) {
    function e() {
      t.n(a, c, e)
      d.apply(this, arguments)
    }
    if (t.i.isArray(c)) return v(t.N, a, c, d)
    e.s = d.s = d.s || t.s++
    t.b(a, c, e)
  }
  function v(a, c, d, e) {
    t.tc.forEach(d, function (d) {
      a(c, d, e)
    })
  }
  var w = Object.prototype.hasOwnProperty
  t.e = function (a, c) {
    var d
    c = c || {}
    d = document.createElement(a || 'div')
    t.i.ca(c, function (a, c) {
      ;-1 !== a.indexOf('aria-') || 'role' == a
        ? d.setAttribute(a, c)
        : (d[a] = c)
    })
    return d
  }
  t.va = function (a) {
    return a.charAt(0).toUpperCase() + a.slice(1)
  }
  t.i = {}
  t.i.create =
    Object.create ||
    function (a) {
      function c() {}
      c.prototype = a
      return new c()
    }
  t.i.ca = function (a, c, d) {
    for (var e in a) w.call(a, e) && c.call(d || this, e, a[e])
  }
  t.i.D = function (a, c) {
    if (!c) return a
    for (var d in c) w.call(c, d) && (a[d] = c[d])
    return a
  }
  t.i.Od = function (a, c) {
    var d, e, g
    a = t.i.copy(a)
    for (d in c)
      w.call(c, d) &&
        ((e = a[d]),
        (g = c[d]),
        (a[d] = t.i.ib(e) && t.i.ib(g) ? t.i.Od(e, g) : c[d]))
    return a
  }
  t.i.copy = function (a) {
    return t.i.D({}, a)
  }
  t.i.ib = function (a) {
    return (
      !!a &&
      'object' === typeof a &&
      '[object Object]' === a.toString() &&
      a.constructor === Object
    )
  }
  t.i.isArray =
    Array.isArray ||
    function (a) {
      return '[object Array]' === Object.prototype.toString.call(a)
    }
  t.ge = function (a) {
    return a !== a
  }
  t.bind = function (a, c, d) {
    function e() {
      return c.apply(a, arguments)
    }
    c.s || (c.s = t.s++)
    e.s = d ? d + '_' + c.s : c.s
    return e
  }
  t.ua = {}
  t.s = 1
  t.expando = 'vdata' + new Date().getTime()
  t.getData = function (a) {
    var c = a[t.expando]
    c || (c = a[t.expando] = t.s++)
    t.ua[c] || (t.ua[c] = {})
    return t.ua[c]
  }
  t.Ic = function (a) {
    a = a[t.expando]
    return !(!a || t.hb(t.ua[a]))
  }
  t.Zc = function (a) {
    var c = a[t.expando]
    if (c) {
      delete t.ua[c]
      try {
        delete a[t.expando]
      } catch (d) {
        a.removeAttribute ? a.removeAttribute(t.expando) : (a[t.expando] = j)
      }
    }
  }
  t.hb = function (a) {
    for (var c in a) if (a[c] !== j) return l
    return f
  }
  t.Pa = function (a, c) {
    return -1 !== (' ' + a.className + ' ').indexOf(' ' + c + ' ')
  }
  t.p = function (a, c) {
    t.Pa(a, c) || (a.className = '' === a.className ? c : a.className + ' ' + c)
  }
  t.r = function (a, c) {
    var d, e
    if (t.Pa(a, c)) {
      d = a.className.split(' ')
      for (e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1)
      a.className = d.join(' ')
    }
  }
  t.A = t.e('video')
  var x = document.createElement('track')
  x.Tb = 'captions'
  x.ed = 'en'
  x.label = 'English'
  t.A.appendChild(x)
  t.P = navigator.userAgent
  t.zd = /iPhone/i.test(t.P)
  t.yd = /iPad/i.test(t.P)
  t.Ad = /iPod/i.test(t.P)
  t.xd = t.zd || t.yd || t.Ad
  var aa = t,
    y
  var z = t.P.match(/OS (\d+)_/i)
  y = z && z[1] ? z[1] : b
  aa.ff = y
  t.wd = /Android/i.test(t.P)
  var ba = t,
    B
  var C = t.P.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
    D,
    E
  C
    ? ((D = C[1] && parseFloat(C[1])),
      (E = C[2] && parseFloat(C[2])),
      (B = D && E ? parseFloat(C[1] + '.' + C[2]) : D ? D : j))
    : (B = j)
  ba.ec = B
  t.Bd = t.wd && /webkit/i.test(t.P) && 2.3 > t.ec
  t.gc = /Firefox/i.test(t.P)
  t.gf = /Chrome/i.test(t.P)
  t.pa = /MSIE\s8\.0/.test(t.P)
  t.Db = !!(
    'ontouchstart' in window ||
    (window.ud && document instanceof window.ud)
  )
  t.td = 'backgroundSize' in t.A.style
  t.ad = function (a, c) {
    t.i.ca(c, function (c, e) {
      e === j || 'undefined' === typeof e || e === l
        ? a.removeAttribute(c)
        : a.setAttribute(c, e === f ? '' : e)
    })
  }
  t.Oa = function (a) {
    var c, d, e, g
    c = {}
    if (a && a.attributes && 0 < a.attributes.length) {
      d = a.attributes
      for (var h = d.length - 1; 0 <= h; h--) {
        e = d[h].name
        g = d[h].value
        if (
          'boolean' === typeof a[e] ||
          -1 !== ',autoplay,controls,loop,muted,default,'.indexOf(',' + e + ',')
        )
          g = g !== j ? f : l
        c[e] = g
      }
    }
    return c
  }
  t.rf = function (a, c) {
    var d = ''
    document.defaultView && document.defaultView.getComputedStyle
      ? (d = document.defaultView.getComputedStyle(a, '').getPropertyValue(c))
      : a.currentStyle &&
        (d = a['client' + c.substr(0, 1).toUpperCase() + c.substr(1)] + 'px')
    return d
  }
  t.Rb = function (a, c) {
    c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
  }
  t.bb = {}
  t.m = function (a) {
    0 === a.indexOf('#') && (a = a.slice(1))
    return document.getElementById(a)
  }
  t.Na = function (a, c) {
    c = c || a
    var d = Math.floor(a % 60),
      e = Math.floor((a / 60) % 60),
      g = Math.floor(a / 3600),
      h = Math.floor((c / 60) % 60),
      k = Math.floor(c / 3600)
    if (isNaN(a) || Infinity === a) g = e = d = '-'
    g = 0 < g || 0 < k ? g + ':' : ''
    return (
      g +
      (((g || 10 <= h) && 10 > e ? '0' + e : e) + ':') +
      (10 > d ? '0' + d : d)
    )
  }
  t.Id = function () {
    document.body.focus()
    document.onselectstart = p(l)
  }
  t.Xe = function () {
    document.onselectstart = p(f)
  }
  t.trim = function (a) {
    return (a + '').replace(/^\s+|\s+$/g, '')
  }
  t.round = function (a, c) {
    c || (c = 0)
    return Math.round(a * Math.pow(10, c)) / Math.pow(10, c)
  }
  t.xa = function (a, c) {
    return a === b && c === b
      ? {
          length: 0,
          start: function () {
            throw Error('This TimeRanges object is empty')
          },
          end: function () {
            throw Error('This TimeRanges object is empty')
          },
        }
      : {
          length: 1,
          start: function () {
            return a
          },
          end: function () {
            return c
          },
        }
  }
  t.Ie = function (a) {
    try {
      var c = window.localStorage || l
      c && (c.volume = a)
    } catch (d) {
      22 == d.code || 1014 == d.code
        ? t.log('LocalStorage Full (VideoJS)', d)
        : 18 == d.code
        ? t.log('LocalStorage not allowed (VideoJS)', d)
        : t.log('LocalStorage Error (VideoJS)', d)
    }
  }
  t.Xd = function (a) {
    a.match(/^https?:\/\//) ||
      (a = t.e('div', { innerHTML: '<a href="' + a + '">x</a>' }).firstChild
        .href)
    return a
  }
  t.Ae = function (a) {
    var c, d, e, g
    g = 'protocol hostname port pathname search hash host'.split(' ')
    d = t.e('a', { href: a })
    if ((e = '' === d.host && 'file:' !== d.protocol))
      (c = t.e('div')),
        (c.innerHTML = '<a href="' + a + '"></a>'),
        (d = c.firstChild),
        c.setAttribute('style', 'display:none; position:absolute;'),
        document.body.appendChild(c)
    a = {}
    for (var h = 0; h < g.length; h++) a[g[h]] = d[g[h]]
    'http:' === a.protocol && (a.host = a.host.replace(/:80$/, ''))
    'https:' === a.protocol && (a.host = a.host.replace(/:443$/, ''))
    e && document.body.removeChild(c)
    return a
  }
  function F(a, c) {
    var d, e
    d = Array.prototype.slice.call(c)
    e = m()
    e = window.console || { log: e, warn: e, error: e }
    a ? d.unshift(a.toUpperCase() + ':') : (a = 'log')
    t.log.history.push(d)
    d.unshift('VIDEOJS:')
    if (e[a].apply) e[a].apply(e, d)
    else e[a](d.join(' '))
  }
  t.log = function () {
    F(j, arguments)
  }
  t.log.history = []
  t.log.error = function () {
    F('error', arguments)
  }
  t.log.warn = function () {
    F('warn', arguments)
  }
  t.Vd = function (a) {
    var c, d
    a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect())
    if (!c) return { left: 0, top: 0 }
    a = document.documentElement
    d = document.body
    return {
      left: t.round(
        c.left +
          (window.pageXOffset || d.scrollLeft) -
          (a.clientLeft || d.clientLeft || 0),
      ),
      top: t.round(
        c.top +
          (window.pageYOffset || d.scrollTop) -
          (a.clientTop || d.clientTop || 0),
      ),
    }
  }
  t.tc = {}
  t.tc.forEach = function (a, c, d) {
    if (t.i.isArray(a) && c instanceof Function)
      for (var e = 0, g = a.length; e < g; ++e) c.call(d || t, a[e], e, a)
    return a
  }
  t.bf = function (a, c) {
    var d, e, g, h, k, q, r
    'string' === typeof a && (a = { uri: a })
    videojs.Z.Aa({ method: 'GET', timeout: 45e3 }, a)
    c = c || m()
    q = function () {
      window.clearTimeout(k)
      c(j, e, e.response || e.responseText)
    }
    r = function (a) {
      window.clearTimeout(k)
      if (!a || 'string' === typeof a) a = Error(a)
      c(a, e)
    }
    d = window.XMLHttpRequest
    'undefined' === typeof d &&
      (d = function () {
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP.6.0')
        } catch (a) {}
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP.3.0')
        } catch (c) {}
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP')
        } catch (d) {}
        throw Error('This browser does not support XMLHttpRequest.')
      })
    e = new d()
    e.uri = a.uri
    d = t.Ae(a.uri)
    g = window.location
    d.protocol + d.host !== g.protocol + g.host &&
    window.XDomainRequest &&
    !('withCredentials' in e)
      ? ((e = new window.XDomainRequest()),
        (e.onload = q),
        (e.onerror = r),
        (e.onprogress = m()),
        (e.ontimeout = m()))
      : ((h = 'file:' == d.protocol || 'file:' == g.protocol),
        (e.onreadystatechange = function () {
          if (4 === e.readyState) {
            if (e.Ue) return r('timeout')
            200 === e.status || (h && 0 === e.status) ? q() : r()
          }
        }),
        a.timeout &&
          (k = window.setTimeout(function () {
            4 !== e.readyState && ((e.Ue = f), e.abort())
          }, a.timeout)))
    try {
      e.open(a.method || 'GET', a.uri, f)
    } catch (u) {
      r(u)
      return
    }
    a.withCredentials && (e.withCredentials = f)
    a.responseType && (e.responseType = a.responseType)
    try {
      e.send()
    } catch (A) {
      r(A)
    }
  }
  t.Z = {}
  t.Z.Aa = function (a, c) {
    var d, e, g
    a = t.i.copy(a)
    for (d in c)
      c.hasOwnProperty(d) &&
        ((e = a[d]),
        (g = c[d]),
        (a[d] = t.i.ib(e) && t.i.ib(g) ? t.Z.Aa(e, g) : c[d]))
    return a
  }
  t.z = m()
  s = t.z.prototype
  s.ab = {}
  s.b = function (a, c) {
    var d = this.addEventListener
    this.addEventListener = Function.prototype
    t.b(this, a, c)
    this.addEventListener = d
  }
  s.addEventListener = t.z.prototype.b
  s.n = function (a, c) {
    t.n(this, a, c)
  }
  s.removeEventListener = t.z.prototype.n
  s.N = function (a, c) {
    t.N(this, a, c)
  }
  s.o = function (a) {
    var c = a.type || a
    'string' === typeof a && (a = { type: c })
    a = t.Nb(a)
    if (this.ab[c] && this['on' + c]) this['on' + c](a)
    t.o(this, a)
  }
  s.dispatchEvent = t.z.prototype.o
  t.a = t.Ga.extend({
    l: function (a, c, d) {
      this.d = a
      this.q = t.i.copy(this.q)
      c = this.options(c)
      this.Qa = c.id || (c.el && c.el.id)
      this.Qa ||
        (this.Qa = ((a.id && a.id()) || 'no_player') + '_component_' + t.s++)
      this.pe = c.name || j
      this.c = c.el || this.e()
      this.R = []
      this.cb = {}
      this.eb = {}
      this.Kc()
      this.I(d)
      if (c.$c !== l) {
        var e, g
        this.k().reportUserActivity &&
          ((e = t.bind(this.k(), this.k().reportUserActivity)),
          this.b('touchstart', function () {
            e()
            this.clearInterval(g)
            g = this.setInterval(e, 250)
          }),
          (a = function () {
            e()
            this.clearInterval(g)
          }),
          this.b('touchmove', e),
          this.b('touchend', a),
          this.b('touchcancel', a))
      }
    },
  })
  s = t.a.prototype
  s.dispose = function () {
    this.o({ type: 'dispose', bubbles: l })
    if (this.R)
      for (var a = this.R.length - 1; 0 <= a; a--)
        this.R[a].dispose && this.R[a].dispose()
    this.eb = this.cb = this.R = j
    this.n()
    this.c.parentNode && this.c.parentNode.removeChild(this.c)
    t.Zc(this.c)
    this.c = j
  }
  s.d = f
  s.k = n('d')
  s.options = function (a) {
    return a === b ? this.q : (this.q = t.Z.Aa(this.q, a))
  }
  s.e = function (a, c) {
    return t.e(a, c)
  }
  s.v = function (a) {
    var c = this.d.language(),
      d = this.d.languages()
    return d && d[c] && d[c][a] ? d[c][a] : a
  }
  s.m = n('c')
  s.wa = function () {
    return this.B || this.c
  }
  s.id = n('Qa')
  s.name = n('pe')
  s.children = n('R')
  s.Yd = function (a) {
    return this.cb[a]
  }
  s.da = function (a) {
    return this.eb[a]
  }
  s.aa = function (a, c) {
    var d, e
    'string' === typeof a
      ? ((e = a),
        (c = c || {}),
        (d = c.componentClass || t.va(e)),
        (c.name = e),
        (d = new window.videojs[d](this.d || this, c)))
      : (d = a)
    this.R.push(d)
    'function' === typeof d.id && (this.cb[d.id()] = d)
    ;(e = e || (d.name && d.name())) && (this.eb[e] = d)
    'function' === typeof d.el && d.el() && this.wa().appendChild(d.el())
    return d
  }
  s.removeChild = function (a) {
    'string' === typeof a && (a = this.da(a))
    if (a && this.R) {
      for (var c = l, d = this.R.length - 1; 0 <= d; d--)
        if (this.R[d] === a) {
          c = f
          this.R.splice(d, 1)
          break
        }
      c &&
        ((this.cb[a.id()] = j),
        (this.eb[a.name()] = j),
        (c = a.m()) &&
          c.parentNode === this.wa() &&
          this.wa().removeChild(a.m()))
    }
  }
  s.Kc = function () {
    var a, c, d, e, g, h
    a = this
    c = a.options()
    if ((d = c.children))
      if (
        ((h = function (d, e) {
          c[d] !== b && (e = c[d])
          e !== l && (a[d] = a.aa(d, e))
        }),
        t.i.isArray(d))
      )
        for (var k = 0; k < d.length; k++)
          (e = d[k]),
            'string' == typeof e ? ((g = e), (e = {})) : (g = e.name),
            h(g, e)
      else t.i.ca(d, h)
  }
  s.T = p('')
  s.b = function (a, c, d) {
    var e, g, h
    'string' === typeof a || t.i.isArray(a)
      ? t.b(this.c, a, t.bind(this, c))
      : ((e = t.bind(this, d)),
        (h = this),
        (g = function () {
          h.n(a, c, e)
        }),
        (g.s = e.s),
        this.b('dispose', g),
        (d = function () {
          h.n('dispose', g)
        }),
        (d.s = e.s),
        a.nodeName
          ? (t.b(a, c, e), t.b(a, 'dispose', d))
          : 'function' === typeof a.b && (a.b(c, e), a.b('dispose', d)))
    return this
  }
  s.n = function (a, c, d) {
    !a || 'string' === typeof a || t.i.isArray(a)
      ? t.n(this.c, a, c)
      : ((d = t.bind(this, d)),
        this.n('dispose', d),
        a.nodeName
          ? (t.n(a, c, d), t.n(a, 'dispose', d))
          : (a.n(c, d), a.n('dispose', d)))
    return this
  }
  s.N = function (a, c, d) {
    var e, g, h
    'string' === typeof a || t.i.isArray(a)
      ? t.N(this.c, a, t.bind(this, c))
      : ((e = t.bind(this, d)),
        (g = this),
        (h = function () {
          g.n(a, c, h)
          e.apply(this, arguments)
        }),
        (h.s = e.s),
        this.b(a, c, h))
    return this
  }
  s.o = function (a) {
    t.o(this.c, a)
    return this
  }
  s.I = function (a) {
    a &&
      (this.ya
        ? a.call(this)
        : (this.mb === b && (this.mb = []), this.mb.push(a)))
    return this
  }
  s.Va = function () {
    this.ya = f
    var a = this.mb
    this.mb = []
    if (a && 0 < a.length) {
      for (var c = 0, d = a.length; c < d; c++) a[c].call(this)
      this.o('ready')
    }
  }
  s.Pa = function (a) {
    return t.Pa(this.c, a)
  }
  s.p = function (a) {
    t.p(this.c, a)
    return this
  }
  s.r = function (a) {
    t.r(this.c, a)
    return this
  }
  s.show = function () {
    this.r('vjs-hidden')
    return this
  }
  s.W = function () {
    this.p('vjs-hidden')
    return this
  }
  function G(a) {
    a.r('vjs-lock-showing')
  }
  s.width = function (a, c) {
    return ca(this, 'width', a, c)
  }
  s.height = function (a, c) {
    return ca(this, 'height', a, c)
  }
  s.Qd = function (a, c) {
    return this.width(a, f).height(c)
  }
  function ca(a, c, d, e) {
    if (d !== b) {
      if (d === j || t.ge(d)) d = 0
      a.c.style[c] =
        -1 !== ('' + d).indexOf('%') || -1 !== ('' + d).indexOf('px')
          ? d
          : 'auto' === d
          ? ''
          : d + 'px'
      e || a.o('resize')
      return a
    }
    if (!a.c) return 0
    d = a.c.style[c]
    e = d.indexOf('px')
    return -1 !== e
      ? parseInt(d.slice(0, e), 10)
      : parseInt(a.c['offset' + t.va(c)], 10)
  }
  function da(a) {
    var c, d, e, g, h, k, q, r
    c = 0
    d = j
    a.b('touchstart', function (a) {
      1 === a.touches.length &&
        ((d = t.i.copy(a.touches[0])), (c = new Date().getTime()), (g = f))
    })
    a.b('touchmove', function (a) {
      1 < a.touches.length
        ? (g = l)
        : d &&
          ((k = a.touches[0].pageX - d.pageX),
          (q = a.touches[0].pageY - d.pageY),
          (r = Math.sqrt(k * k + q * q)),
          10 < r && (g = l))
    })
    h = function () {
      g = l
    }
    a.b('touchleave', h)
    a.b('touchcancel', h)
    a.b('touchend', function (a) {
      d = j
      g === f &&
        ((e = new Date().getTime() - c),
        200 > e && (a.preventDefault(), this.o('tap')))
    })
  }
  s.setTimeout = function (a, c) {
    function d() {
      this.clearTimeout(e)
    }
    a = t.bind(this, a)
    var e = setTimeout(a, c)
    d.s = 'vjs-timeout-' + e
    this.b('dispose', d)
    return e
  }
  s.clearTimeout = function (a) {
    function c() {}
    clearTimeout(a)
    c.s = 'vjs-timeout-' + a
    this.n('dispose', c)
    return a
  }
  s.setInterval = function (a, c) {
    function d() {
      this.clearInterval(e)
    }
    a = t.bind(this, a)
    var e = setInterval(a, c)
    d.s = 'vjs-interval-' + e
    this.b('dispose', d)
    return e
  }
  s.clearInterval = function (a) {
    function c() {}
    clearInterval(a)
    c.s = 'vjs-interval-' + a
    this.n('dispose', c)
    return a
  }
  t.w = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      da(this)
      this.b('tap', this.u)
      this.b('click', this.u)
      this.b('focus', this.kb)
      this.b('blur', this.jb)
    },
  })
  s = t.w.prototype
  s.e = function (a, c) {
    var d
    c = t.i.D(
      {
        className: this.T(),
        role: 'button',
        'aria-live': 'polite',
        tabIndex: 0,
      },
      c,
    )
    d = t.a.prototype.e.call(this, a, c)
    c.innerHTML ||
      ((this.B = t.e('div', { className: 'vjs-control-content' })),
      (this.Ib = t.e('span', {
        className: 'vjs-control-text',
        innerHTML: this.v(this.ta) || 'Need Text',
      })),
      this.B.appendChild(this.Ib),
      d.appendChild(this.B))
    return d
  }
  s.T = function () {
    return 'vjs-control ' + t.a.prototype.T.call(this)
  }
  s.u = m()
  s.kb = function () {
    t.b(document, 'keydown', t.bind(this, this.ka))
  }
  s.ka = function (a) {
    if (32 == a.which || 13 == a.which) a.preventDefault(), this.u()
  }
  s.jb = function () {
    t.n(document, 'keydown', t.bind(this, this.ka))
  }
  t.S = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.Hd = this.da(this.q.barName)
      this.handle = this.da(this.q.handleName)
      this.b('mousedown', this.lb)
      this.b('touchstart', this.lb)
      this.b('focus', this.kb)
      this.b('blur', this.jb)
      this.b('click', this.u)
      this.b(a, 'controlsvisible', this.update)
      this.b(a, this.Uc, this.update)
    },
  })
  s = t.S.prototype
  s.e = function (a, c) {
    c = c || {}
    c.className += ' vjs-slider'
    c = t.i.D(
      {
        role: 'slider',
        'aria-valuenow': 0,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        tabIndex: 0,
      },
      c,
    )
    return t.a.prototype.e.call(this, a, c)
  }
  s.lb = function (a) {
    a.preventDefault()
    t.Id()
    this.p('vjs-sliding')
    this.b(document, 'mousemove', this.la)
    this.b(document, 'mouseup', this.Ba)
    this.b(document, 'touchmove', this.la)
    this.b(document, 'touchend', this.Ba)
    this.la(a)
  }
  s.la = m()
  s.Ba = function () {
    t.Xe()
    this.r('vjs-sliding')
    this.n(document, 'mousemove', this.la)
    this.n(document, 'mouseup', this.Ba)
    this.n(document, 'touchmove', this.la)
    this.n(document, 'touchend', this.Ba)
    this.update()
  }
  s.update = function () {
    if (this.c) {
      var a,
        c = this.Qb(),
        d = this.handle,
        e = this.Hd
      if ('number' !== typeof c || c !== c || 0 > c || Infinity === c) c = 0
      a = c
      if (d) {
        a = this.c.offsetWidth
        var g = d.m().offsetWidth
        a = g ? g / a : 0
        c *= 1 - a
        a = c + a / 2
        d.m().style.left = t.round(100 * c, 2) + '%'
      }
      e && (e.m().style.width = t.round(100 * a, 2) + '%')
    }
  }
  function ea(a, c) {
    var d, e, g, h
    d = a.c
    e = t.Vd(d)
    h = g = d.offsetWidth
    d = a.handle
    if (a.options().vertical)
      return (
        (h = e.top),
        (e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY),
        d && ((d = d.m().offsetHeight), (h += d / 2), (g -= d)),
        Math.max(0, Math.min(1, (h - e + g) / g))
      )
    g = e.left
    e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX
    d && ((d = d.m().offsetWidth), (g += d / 2), (h -= d))
    return Math.max(0, Math.min(1, (e - g) / h))
  }
  s.kb = function () {
    this.b(document, 'keydown', this.ka)
  }
  s.ka = function (a) {
    if (37 == a.which || 40 == a.which) a.preventDefault(), this.fd()
    else if (38 == a.which || 39 == a.which) a.preventDefault(), this.gd()
  }
  s.jb = function () {
    this.n(document, 'keydown', this.ka)
  }
  s.u = function (a) {
    a.stopImmediatePropagation()
    a.preventDefault()
  }
  t.ga = t.a.extend()
  t.ga.prototype.defaultValue = 0
  t.ga.prototype.e = function (a, c) {
    c = c || {}
    c.className += ' vjs-slider-handle'
    c = t.i.D(
      {
        innerHTML:
          '<span class="vjs-control-text">' + this.defaultValue + '</span>',
      },
      c,
    )
    return t.a.prototype.e.call(this, 'div', c)
  }
  t.qa = t.a.extend()
  function fa(a, c) {
    a.aa(c)
    c.b(
      'click',
      t.bind(a, function () {
        G(this)
      }),
    )
  }
  t.qa.prototype.e = function () {
    var a = this.options().zc || 'ul'
    this.B = t.e(a, { className: 'vjs-menu-content' })
    a = t.a.prototype.e.call(this, 'div', {
      append: this.B,
      className: 'vjs-menu',
    })
    a.appendChild(this.B)
    t.b(a, 'click', function (a) {
      a.preventDefault()
      a.stopImmediatePropagation()
    })
    return a
  }
  t.M = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
      this.selected(c.selected)
    },
  })
  t.M.prototype.e = function (a, c) {
    return t.w.prototype.e.call(
      this,
      'li',
      t.i.D({ className: 'vjs-menu-item', innerHTML: this.v(this.q.label) }, c),
    )
  }
  t.M.prototype.u = function () {
    this.selected(f)
  }
  t.M.prototype.selected = function (a) {
    a
      ? (this.p('vjs-selected'), this.c.setAttribute('aria-selected', f))
      : (this.r('vjs-selected'), this.c.setAttribute('aria-selected', l))
  }
  t.O = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
      this.update()
      this.b('keydown', this.ka)
      this.c.setAttribute('aria-haspopup', f)
      this.c.setAttribute('role', 'button')
    },
  })
  s = t.O.prototype
  s.update = function () {
    var a = this.La()
    this.za && this.removeChild(this.za)
    this.za = a
    this.aa(a)
    this.H && 0 === this.H.length
      ? this.W()
      : this.H && 1 < this.H.length && this.show()
  }
  s.Ja = l
  s.La = function () {
    var a = new t.qa(this.d)
    this.options().title &&
      a.wa().appendChild(
        t.e('li', {
          className: 'vjs-menu-title',
          innerHTML: t.va(this.options().title),
          Se: -1,
        }),
      )
    if ((this.H = this.createItems()))
      for (var c = 0; c < this.H.length; c++) fa(a, this.H[c])
    return a
  }
  s.Ka = m()
  s.T = function () {
    return this.className + ' vjs-menu-button ' + t.w.prototype.T.call(this)
  }
  s.kb = m()
  s.jb = m()
  s.u = function () {
    this.N(
      'mouseout',
      t.bind(this, function () {
        G(this.za)
        this.c.blur()
      }),
    )
    this.Ja ? H(this) : ga(this)
  }
  s.ka = function (a) {
    32 == a.which || 13 == a.which
      ? (this.Ja ? H(this) : ga(this), a.preventDefault())
      : 27 == a.which && (this.Ja && H(this), a.preventDefault())
  }
  function ga(a) {
    a.Ja = f
    a.za.p('vjs-lock-showing')
    a.c.setAttribute('aria-pressed', f)
    a.H && 0 < a.H.length && a.H[0].m().focus()
  }
  function H(a) {
    a.Ja = l
    G(a.za)
    a.c.setAttribute('aria-pressed', l)
  }
  t.J = function (a) {
    'number' === typeof a
      ? (this.code = a)
      : 'string' === typeof a
      ? (this.message = a)
      : 'object' === typeof a && t.i.D(this, a)
    this.message || (this.message = t.J.Pd[this.code] || '')
  }
  t.J.prototype.code = 0
  t.J.prototype.message = ''
  t.J.prototype.status = j
  t.J.gb = 'MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED'.split(
    ' ',
  )
  t.J.Pd = {
    1: 'You aborted the video playback',
    2: 'A network error caused the video download to fail part-way.',
    3: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.',
    4: 'The video could not be loaded, either because the server or network failed or because the format is not supported.',
    5: 'The video is encrypted and we do not have the keys to decrypt it.',
  }
  for (var I = 0; I < t.J.gb.length; I++)
    (t.J[t.J.gb[I]] = I), (t.J.prototype[t.J.gb[I]] = I)
  var J, ha, K, L
  J = [
    'requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror'.split(
      ' ',
    ),
    'webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror'.split(
      ' ',
    ),
    'webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror'.split(
      ' ',
    ),
    'mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror'.split(
      ' ',
    ),
    'msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError'.split(
      ' ',
    ),
  ]
  ha = J[0]
  for (L = 0; L < J.length; L++)
    if (J[L][1] in document) {
      K = J[L]
      break
    }
  if (K) {
    t.bb.Pb = {}
    for (L = 0; L < K.length; L++) t.bb.Pb[ha[L]] = K[L]
  }
  t.Player = t.a.extend({
    l: function (a, c, d) {
      this.L = a
      a.id = a.id || 'vjs_video_' + t.s++
      this.Te = a && t.Oa(a)
      c = t.i.D(ia(a), c)
      this.Pc = c.language || t.options.language
      this.je = c.languages || t.options.languages
      this.K = {}
      this.Vc = c.poster || ''
      this.Jb = !!c.controls
      a.controls = l
      c.$c = l
      ja(this, 'audio' === this.L.nodeName.toLowerCase())
      t.a.call(this, this, c, d)
      this.controls()
        ? this.p('vjs-controls-enabled')
        : this.p('vjs-controls-disabled')
      ja(this) && this.p('vjs-audio')
      t.Ca[this.Qa] = this
      c.plugins &&
        t.i.ca(
          c.plugins,
          function (a, c) {
            this[a](c)
          },
          this,
        )
      var e, g, h, k, q
      e = t.bind(this, this.reportUserActivity)
      this.b('mousedown', function () {
        e()
        this.clearInterval(g)
        g = this.setInterval(e, 250)
      })
      this.b('mousemove', function (a) {
        if (a.screenX != k || a.screenY != q)
          (k = a.screenX), (q = a.screenY), e()
      })
      this.b('mouseup', function () {
        e()
        this.clearInterval(g)
      })
      this.b('keydown', e)
      this.b('keyup', e)
      this.setInterval(function () {
        if (this.Fa) {
          this.Fa = l
          this.userActive(f)
          this.clearTimeout(h)
          var a = this.options().inactivityTimeout
          0 < a &&
            (h = this.setTimeout(function () {
              this.Fa || this.userActive(l)
            }, a))
        }
      }, 250)
    },
  })
  s = t.Player.prototype
  s.language = function (a) {
    if (a === b) return this.Pc
    this.Pc = a
    return this
  }
  s.languages = n('je')
  s.q = t.options
  s.dispose = function () {
    this.o('dispose')
    this.n('dispose')
    t.Ca[this.Qa] = j
    this.L && this.L.player && (this.L.player = j)
    this.c && this.c.player && (this.c.player = j)
    this.h && this.h.dispose()
    t.a.prototype.dispose.call(this)
  }
  function ia(a) {
    var c,
      d,
      e = { sources: [], tracks: [] }
    c = t.Oa(a)
    d = c['data-setup']
    d !== j && t.i.D(c, t.JSON.parse(d || '{}'))
    t.i.D(e, c)
    if (a.hasChildNodes()) {
      var g, h
      a = a.childNodes
      g = 0
      for (h = a.length; g < h; g++)
        (c = a[g]),
          (d = c.nodeName.toLowerCase()),
          'source' === d
            ? e.sources.push(t.Oa(c))
            : 'track' === d && e.tracks.push(t.Oa(c))
    }
    return e
  }
  s.e = function () {
    var a = (this.c = t.a.prototype.e.call(this, 'div')),
      c = this.L,
      d
    c.removeAttribute('width')
    c.removeAttribute('height')
    d = t.Oa(c)
    t.i.ca(d, function (c) {
      'class' == c ? (a.className = d[c]) : a.setAttribute(c, d[c])
    })
    c.id += '_html5_api'
    c.className = 'vjs-tech'
    c.player = a.player = this
    this.p('vjs-paused')
    this.width(this.q.width, f)
    this.height(this.q.height, f)
    c.ce = c.networkState
    c.parentNode && c.parentNode.insertBefore(a, c)
    t.Rb(c, a)
    this.c = a
    this.b('loadstart', this.te)
    this.b('waiting', this.ze)
    this.b(['canplay', 'canplaythrough', 'playing', 'ended'], this.ye)
    this.b('seeking', this.we)
    this.b('seeked', this.ve)
    this.b('ended', this.qe)
    this.b('play', this.Xb)
    this.b('firstplay', this.re)
    this.b('pause', this.Wb)
    this.b('progress', this.ue)
    this.b('durationchange', this.Sc)
    this.b('fullscreenchange', this.se)
    return a
  }
  function ka(a, c, d) {
    a.h && ((a.ya = l), a.h.dispose(), (a.h = l))
    'Html5' !== c && a.L && (t.f.Kb(a.L), (a.L = j))
    a.Ta = c
    a.ya = l
    var e = t.i.D({ source: d, parentEl: a.c }, a.q[c.toLowerCase()])
    d &&
      ((a.Cc = d.type),
      d.src == a.K.src &&
        0 < a.K.currentTime &&
        (e.startTime = a.K.currentTime),
      (a.K.src = d.src))
    a.h = new window.videojs[c](a, e)
    a.h.I(function () {
      this.d.Va()
    })
  }
  s.te = function () {
    this.r('vjs-ended')
    this.error(j)
    this.paused() ? la(this, l) : this.o('firstplay')
  }
  s.Jc = l
  function la(a, c) {
    c !== b &&
      a.Jc !== c &&
      ((a.Jc = c)
        ? (a.p('vjs-has-started'), a.o('firstplay'))
        : a.r('vjs-has-started'))
  }
  s.Xb = function () {
    this.r('vjs-ended')
    this.r('vjs-paused')
    this.p('vjs-playing')
    la(this, f)
  }
  s.ze = function () {
    this.p('vjs-waiting')
  }
  s.ye = function () {
    this.r('vjs-waiting')
  }
  s.we = function () {
    this.p('vjs-seeking')
  }
  s.ve = function () {
    this.r('vjs-seeking')
  }
  s.re = function () {
    this.q.starttime && this.currentTime(this.q.starttime)
    this.p('vjs-has-started')
  }
  s.Wb = function () {
    this.r('vjs-playing')
    this.p('vjs-paused')
  }
  s.ue = function () {
    1 == this.bufferedPercent() && this.o('loadedalldata')
  }
  s.qe = function () {
    this.p('vjs-ended')
    this.q.loop
      ? (this.currentTime(0), this.play())
      : this.paused() || this.pause()
  }
  s.Sc = function () {
    var a = M(this, 'duration')
    a &&
      (0 > a && (a = Infinity),
      this.duration(a),
      Infinity === a ? this.p('vjs-live') : this.r('vjs-live'))
  }
  s.se = function () {
    this.isFullscreen() ? this.p('vjs-fullscreen') : this.r('vjs-fullscreen')
  }
  function N(a, c, d) {
    if (a.h && !a.h.ya)
      a.h.I(function () {
        this[c](d)
      })
    else
      try {
        a.h[c](d)
      } catch (e) {
        throw (t.log(e), e)
      }
  }
  function M(a, c) {
    if (a.h && a.h.ya)
      try {
        return a.h[c]()
      } catch (d) {
        throw (
          (a.h[c] === b
            ? t.log(
                'Video.js: ' +
                  c +
                  ' method not defined for ' +
                  a.Ta +
                  ' playback technology.',
                d,
              )
            : 'TypeError' == d.name
            ? (t.log(
                'Video.js: ' +
                  c +
                  ' unavailable on ' +
                  a.Ta +
                  ' playback technology element.',
                d,
              ),
              (a.h.ya = l))
            : t.log(d),
          d)
        )
      }
  }
  s.play = function () {
    N(this, 'play')
    return this
  }
  s.pause = function () {
    N(this, 'pause')
    return this
  }
  s.paused = function () {
    return M(this, 'paused') === l ? l : f
  }
  s.currentTime = function (a) {
    return a !== b
      ? (N(this, 'setCurrentTime', a), this)
      : (this.K.currentTime = M(this, 'currentTime') || 0)
  }
  s.duration = function (a) {
    if (a !== b) return (this.K.duration = parseFloat(a)), this
    this.K.duration === b && this.Sc()
    return this.K.duration || 0
  }
  s.remainingTime = function () {
    return this.duration() - this.currentTime()
  }
  s.buffered = function () {
    var a = M(this, 'buffered')
    if (!a || !a.length) a = t.xa(0, 0)
    return a
  }
  s.bufferedPercent = function () {
    var a = this.duration(),
      c = this.buffered(),
      d = 0,
      e,
      g
    if (!a) return 0
    for (var h = 0; h < c.length; h++)
      (e = c.start(h)), (g = c.end(h)), g > a && (g = a), (d += g - e)
    return d / a
  }
  s.volume = function (a) {
    if (a !== b)
      return (
        (a = Math.max(0, Math.min(1, parseFloat(a)))),
        (this.K.volume = a),
        N(this, 'setVolume', a),
        t.Ie(a),
        this
      )
    a = parseFloat(M(this, 'volume'))
    return isNaN(a) ? 1 : a
  }
  s.muted = function (a) {
    return a !== b ? (N(this, 'setMuted', a), this) : M(this, 'muted') || l
  }
  s.Sa = function () {
    return M(this, 'supportsFullScreen') || l
  }
  s.Mc = l
  s.isFullscreen = function (a) {
    return a !== b ? ((this.Mc = !!a), this) : this.Mc
  }
  s.isFullScreen = function (a) {
    t.log.warn(
      'player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")',
    )
    return this.isFullscreen(a)
  }
  s.requestFullscreen = function () {
    var a = t.bb.Pb
    this.isFullscreen(f)
    a
      ? (t.b(
          document,
          a.fullscreenchange,
          t.bind(this, function (c) {
            this.isFullscreen(document[a.fullscreenElement])
            this.isFullscreen() === l &&
              t.n(document, a.fullscreenchange, arguments.callee)
            this.o('fullscreenchange')
          }),
        ),
        this.c[a.requestFullscreen]())
      : this.h.Sa()
      ? N(this, 'enterFullScreen')
      : (this.Fc(), this.o('fullscreenchange'))
    return this
  }
  s.requestFullScreen = function () {
    t.log.warn(
      'player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")',
    )
    return this.requestFullscreen()
  }
  s.exitFullscreen = function () {
    var a = t.bb.Pb
    this.isFullscreen(l)
    if (a) document[a.exitFullscreen]()
    else
      this.h.Sa()
        ? N(this, 'exitFullScreen')
        : (this.Lb(), this.o('fullscreenchange'))
    return this
  }
  s.cancelFullScreen = function () {
    t.log.warn(
      'player.cancelFullScreen() has been deprecated, use player.exitFullscreen()',
    )
    return this.exitFullscreen()
  }
  s.Fc = function () {
    this.fe = f
    this.Rd = document.documentElement.style.overflow
    t.b(document, 'keydown', t.bind(this, this.Gc))
    document.documentElement.style.overflow = 'hidden'
    t.p(document.body, 'vjs-full-window')
    this.o('enterFullWindow')
  }
  s.Gc = function (a) {
    27 === a.keyCode &&
      (this.isFullscreen() === f ? this.exitFullscreen() : this.Lb())
  }
  s.Lb = function () {
    this.fe = l
    t.n(document, 'keydown', this.Gc)
    document.documentElement.style.overflow = this.Rd
    t.r(document.body, 'vjs-full-window')
    this.o('exitFullWindow')
  }
  s.selectSource = function (a) {
    for (var c = 0, d = this.q.techOrder; c < d.length; c++) {
      var e = t.va(d[c]),
        g = window.videojs[e]
      if (g) {
        if (g.isSupported())
          for (var h = 0, k = a; h < k.length; h++) {
            var q = k[h]
            if (g.canPlaySource(q)) return { source: q, h: e }
          }
      } else
        t.log.error(
          'The "' +
            e +
            '" tech is undefined. Skipped browser support check for that tech.',
        )
    }
    return l
  }
  s.src = function (a) {
    if (a === b) return M(this, 'src')
    t.i.isArray(a)
      ? ma(this, a)
      : 'string' === typeof a
      ? this.src({ src: a })
      : a instanceof Object &&
        (a.type && !window.videojs[this.Ta].canPlaySource(a)
          ? ma(this, [a])
          : ((this.K.src = a.src),
            (this.Cc = a.type || ''),
            this.I(function () {
              window.videojs[this.Ta].prototype.hasOwnProperty('setSource')
                ? N(this, 'setSource', a)
                : N(this, 'src', a.src)
              'auto' == this.q.preload && this.load()
              this.q.autoplay && this.play()
            })))
    return this
  }
  function ma(a, c) {
    var d = a.selectSource(c)
    d
      ? d.h === a.Ta
        ? a.src(d.source)
        : ka(a, d.h, d.source)
      : (a.setTimeout(function () {
          this.error({
            code: 4,
            message: this.v(this.options().notSupportedMessage),
          })
        }, 0),
        a.Va())
  }
  s.load = function () {
    N(this, 'load')
    return this
  }
  s.currentSrc = function () {
    return M(this, 'currentSrc') || this.K.src || ''
  }
  s.Nd = function () {
    return this.Cc || ''
  }
  s.Ra = function (a) {
    return a !== b
      ? (N(this, 'setPreload', a), (this.q.preload = a), this)
      : M(this, 'preload')
  }
  s.autoplay = function (a) {
    return a !== b
      ? (N(this, 'setAutoplay', a), (this.q.autoplay = a), this)
      : M(this, 'autoplay')
  }
  s.loop = function (a) {
    return a !== b
      ? (N(this, 'setLoop', a), (this.q.loop = a), this)
      : M(this, 'loop')
  }
  s.poster = function (a) {
    if (a === b) return this.Vc
    a || (a = '')
    this.Vc = a
    N(this, 'setPoster', a)
    this.o('posterchange')
    return this
  }
  s.controls = function (a) {
    return a !== b
      ? ((a = !!a),
        this.Jb !== a &&
          ((this.Jb = a)
            ? (this.r('vjs-controls-disabled'),
              this.p('vjs-controls-enabled'),
              this.o('controlsenabled'))
            : (this.r('vjs-controls-enabled'),
              this.p('vjs-controls-disabled'),
              this.o('controlsdisabled'))),
        this)
      : this.Jb
  }
  t.Player.prototype.bc
  s = t.Player.prototype
  s.usingNativeControls = function (a) {
    return a !== b
      ? ((a = !!a),
        this.bc !== a &&
          ((this.bc = a)
            ? (this.p('vjs-using-native-controls'),
              this.o('usingnativecontrols'))
            : (this.r('vjs-using-native-controls'),
              this.o('usingcustomcontrols'))),
        this)
      : this.bc
  }
  s.ja = j
  s.error = function (a) {
    if (a === b) return this.ja
    if (a === j) return (this.ja = a), this.r('vjs-error'), this
    this.ja = a instanceof t.J ? a : new t.J(a)
    this.o('error')
    this.p('vjs-error')
    t.log.error(
      '(CODE:' + this.ja.code + ' ' + t.J.gb[this.ja.code] + ')',
      this.ja.message,
      this.ja,
    )
    return this
  }
  s.ended = function () {
    return M(this, 'ended')
  }
  s.seeking = function () {
    return M(this, 'seeking')
  }
  s.seekable = function () {
    return M(this, 'seekable')
  }
  s.Fa = f
  s.reportUserActivity = function () {
    this.Fa = f
  }
  s.ac = f
  s.userActive = function (a) {
    return a !== b
      ? ((a = !!a),
        a !== this.ac &&
          ((this.ac = a)
            ? ((this.Fa = f),
              this.r('vjs-user-inactive'),
              this.p('vjs-user-active'),
              this.o('useractive'))
            : ((this.Fa = l),
              this.h &&
                this.h.N('mousemove', function (a) {
                  a.stopPropagation()
                  a.preventDefault()
                }),
              this.r('vjs-user-active'),
              this.p('vjs-user-inactive'),
              this.o('userinactive'))),
        this)
      : this.ac
  }
  s.playbackRate = function (a) {
    return a !== b
      ? (N(this, 'setPlaybackRate', a), this)
      : this.h && this.h.featuresPlaybackRate
      ? M(this, 'playbackRate')
      : 1
  }
  s.Lc = l
  function ja(a, c) {
    return c !== b ? ((a.Lc = !!c), a) : a.Lc
  }
  s.networkState = function () {
    return M(this, 'networkState')
  }
  s.readyState = function () {
    return M(this, 'readyState')
  }
  s.textTracks = function () {
    return this.h && this.h.textTracks()
  }
  s.X = function () {
    return this.h && this.h.remoteTextTracks()
  }
  s.addTextTrack = function (a, c, d) {
    return this.h && this.h.addTextTrack(a, c, d)
  }
  s.ha = function (a) {
    return this.h && this.h.addRemoteTextTrack(a)
  }
  s.Da = function (a) {
    this.h && this.h.removeRemoteTextTrack(a)
  }
  t.tb = t.a.extend()
  t.tb.prototype.q = {
    sf: 'play',
    children: {
      playToggle: {},
      currentTimeDisplay: {},
      timeDivider: {},
      durationDisplay: {},
      remainingTimeDisplay: {},
      liveDisplay: {},
      progressControl: {},
      fullscreenToggle: {},
      volumeControl: {},
      muteToggle: {},
      playbackRateMenuButton: {},
      subtitlesButton: {},
      captionsButton: {},
      chaptersButton: {},
    },
  }
  t.tb.prototype.e = function () {
    return t.e('div', { className: 'vjs-control-bar' })
  }
  t.hc = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.hc.prototype.e = function () {
    var a = t.a.prototype.e.call(this, 'div', {
      className: 'vjs-live-controls vjs-control',
    })
    this.B = t.e('div', {
      className: 'vjs-live-display',
      innerHTML:
        '<span class="vjs-control-text">' +
        this.v('Stream Type') +
        '</span>' +
        this.v('LIVE'),
      'aria-live': 'off',
    })
    a.appendChild(this.B)
    return a
  }
  t.kc = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
      this.b(a, 'play', this.Xb)
      this.b(a, 'pause', this.Wb)
    },
  })
  s = t.kc.prototype
  s.ta = 'Play'
  s.T = function () {
    return 'vjs-play-control ' + t.w.prototype.T.call(this)
  }
  s.u = function () {
    this.d.paused() ? this.d.play() : this.d.pause()
  }
  s.Xb = function () {
    this.r('vjs-paused')
    this.p('vjs-playing')
    this.c.children[0].children[0].innerHTML = this.v('Pause')
  }
  s.Wb = function () {
    this.r('vjs-playing')
    this.p('vjs-paused')
    this.c.children[0].children[0].innerHTML = this.v('Play')
  }
  t.ub = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.b(a, 'timeupdate', this.fa)
    },
  })
  t.ub.prototype.e = function () {
    var a = t.a.prototype.e.call(this, 'div', {
      className: 'vjs-current-time vjs-time-controls vjs-control',
    })
    this.B = t.e('div', {
      className: 'vjs-current-time-display',
      innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
      'aria-live': 'off',
    })
    a.appendChild(this.B)
    return a
  }
  t.ub.prototype.fa = function () {
    var a = this.d.nb ? this.d.K.currentTime : this.d.currentTime()
    this.B.innerHTML =
      '<span class="vjs-control-text">' +
      this.v('Current Time') +
      '</span> ' +
      t.Na(a, this.d.duration())
  }
  t.vb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.b(a, 'timeupdate', this.fa)
      this.b(a, 'loadedmetadata', this.fa)
    },
  })
  t.vb.prototype.e = function () {
    var a = t.a.prototype.e.call(this, 'div', {
      className: 'vjs-duration vjs-time-controls vjs-control',
    })
    this.B = t.e('div', {
      className: 'vjs-duration-display',
      innerHTML:
        '<span class="vjs-control-text">' +
        this.v('Duration Time') +
        '</span> 0:00',
      'aria-live': 'off',
    })
    a.appendChild(this.B)
    return a
  }
  t.vb.prototype.fa = function () {
    var a = this.d.duration()
    a &&
      (this.B.innerHTML =
        '<span class="vjs-control-text">' +
        this.v('Duration Time') +
        '</span> ' +
        t.Na(a))
  }
  t.qc = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.qc.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-time-divider',
      innerHTML: '<div><span>/</span></div>',
    })
  }
  t.Cb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.b(a, 'timeupdate', this.fa)
    },
  })
  t.Cb.prototype.e = function () {
    var a = t.a.prototype.e.call(this, 'div', {
      className: 'vjs-remaining-time vjs-time-controls vjs-control',
    })
    this.B = t.e('div', {
      className: 'vjs-remaining-time-display',
      innerHTML:
        '<span class="vjs-control-text">' +
        this.v('Remaining Time') +
        '</span> -0:00',
      'aria-live': 'off',
    })
    a.appendChild(this.B)
    return a
  }
  t.Cb.prototype.fa = function () {
    this.d.duration() &&
      (this.B.innerHTML =
        '<span class="vjs-control-text">' +
        this.v('Remaining Time') +
        '</span> -' +
        t.Na(this.d.remainingTime()))
  }
  t.Ya = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
    },
  })
  t.Ya.prototype.ta = 'Fullscreen'
  t.Ya.prototype.T = function () {
    return 'vjs-fullscreen-control ' + t.w.prototype.T.call(this)
  }
  t.Ya.prototype.u = function () {
    this.d.isFullscreen()
      ? (this.d.exitFullscreen(), (this.Ib.innerHTML = this.v('Fullscreen')))
      : (this.d.requestFullscreen(),
        (this.Ib.innerHTML = this.v('Non-Fullscreen')))
  }
  t.Bb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.Bb.prototype.q = { children: { seekBar: {} } }
  t.Bb.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-progress-control vjs-control',
    })
  }
  t.nc = t.S.extend({
    l: function (a, c) {
      t.S.call(this, a, c)
      this.b(a, 'timeupdate', this.Ea)
      a.I(t.bind(this, this.Ea))
    },
  })
  s = t.nc.prototype
  s.q = {
    children: { loadProgressBar: {}, playProgressBar: {}, seekHandle: {} },
    barName: 'playProgressBar',
    handleName: 'seekHandle',
  }
  s.Uc = 'timeupdate'
  s.e = function () {
    return t.S.prototype.e.call(this, 'div', {
      className: 'vjs-progress-holder',
      'aria-label': 'video progress bar',
    })
  }
  s.Ea = function () {
    var a = this.d.nb ? this.d.K.currentTime : this.d.currentTime()
    this.c.setAttribute('aria-valuenow', t.round(100 * this.Qb(), 2))
    this.c.setAttribute('aria-valuetext', t.Na(a, this.d.duration()))
  }
  s.Qb = function () {
    return this.d.currentTime() / this.d.duration()
  }
  s.lb = function (a) {
    t.S.prototype.lb.call(this, a)
    this.d.nb = f
    this.d.p('vjs-scrubbing')
    this.$e = !this.d.paused()
    this.d.pause()
  }
  s.la = function (a) {
    a = ea(this, a) * this.d.duration()
    a == this.d.duration() && (a -= 0.1)
    this.d.currentTime(a)
  }
  s.Ba = function (a) {
    t.S.prototype.Ba.call(this, a)
    this.d.nb = l
    this.d.r('vjs-scrubbing')
    this.$e && this.d.play()
  }
  s.gd = function () {
    this.d.currentTime(this.d.currentTime() + 5)
  }
  s.fd = function () {
    this.d.currentTime(this.d.currentTime() - 5)
  }
  t.yb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.b(a, 'progress', this.update)
    },
  })
  t.yb.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-load-progress',
      innerHTML:
        '<span class="vjs-control-text"><span>' +
        this.v('Loaded') +
        '</span>: 0%</span>',
    })
  }
  t.yb.prototype.update = function () {
    var a,
      c,
      d,
      e,
      g = this.d.buffered()
    a = this.d.duration()
    var h,
      k = this.d
    h = k.buffered()
    k = k.duration()
    h = h.end(h.length - 1)
    h > k && (h = k)
    k = this.c.children
    this.c.style.width = 100 * (h / a || 0) + '%'
    for (a = 0; a < g.length; a++)
      (c = g.start(a)),
        (d = g.end(a)),
        (e = k[a]) || (e = this.c.appendChild(t.e())),
        (e.style.left = 100 * (c / h || 0) + '%'),
        (e.style.width = 100 * ((d - c) / h || 0) + '%')
    for (a = k.length; a > g.length; a--) this.c.removeChild(k[a - 1])
  }
  t.jc = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.jc.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-play-progress',
      innerHTML:
        '<span class="vjs-control-text"><span>' +
        this.v('Progress') +
        '</span>: 0%</span>',
    })
  }
  t.Za = t.ga.extend({
    l: function (a, c) {
      t.ga.call(this, a, c)
      this.b(a, 'timeupdate', this.fa)
    },
  })
  t.Za.prototype.defaultValue = '00:00'
  t.Za.prototype.e = function () {
    return t.ga.prototype.e.call(this, 'div', {
      className: 'vjs-seek-handle',
      'aria-live': 'off',
    })
  }
  t.Za.prototype.fa = function () {
    var a = this.d.nb ? this.d.K.currentTime : this.d.currentTime()
    this.c.innerHTML =
      '<span class="vjs-control-text">' + t.Na(a, this.d.duration()) + '</span>'
  }
  t.Fb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      a.h && a.h.featuresVolumeControl === l && this.p('vjs-hidden')
      this.b(a, 'loadstart', function () {
        a.h.featuresVolumeControl === l
          ? this.p('vjs-hidden')
          : this.r('vjs-hidden')
      })
    },
  })
  t.Fb.prototype.q = { children: { volumeBar: {} } }
  t.Fb.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-volume-control vjs-control',
    })
  }
  t.Eb = t.S.extend({
    l: function (a, c) {
      t.S.call(this, a, c)
      this.b(a, 'volumechange', this.Ea)
      a.I(t.bind(this, this.Ea))
    },
  })
  s = t.Eb.prototype
  s.Ea = function () {
    this.c.setAttribute('aria-valuenow', t.round(100 * this.d.volume(), 2))
    this.c.setAttribute(
      'aria-valuetext',
      t.round(100 * this.d.volume(), 2) + '%',
    )
  }
  s.q = {
    children: { volumeLevel: {}, volumeHandle: {} },
    barName: 'volumeLevel',
    handleName: 'volumeHandle',
  }
  s.Uc = 'volumechange'
  s.e = function () {
    return t.S.prototype.e.call(this, 'div', {
      className: 'vjs-volume-bar',
      'aria-label': 'volume level',
    })
  }
  s.la = function (a) {
    this.d.muted() && this.d.muted(l)
    this.d.volume(ea(this, a))
  }
  s.Qb = function () {
    return this.d.muted() ? 0 : this.d.volume()
  }
  s.gd = function () {
    this.d.volume(this.d.volume() + 0.1)
  }
  s.fd = function () {
    this.d.volume(this.d.volume() - 0.1)
  }
  t.rc = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.rc.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-volume-level',
      innerHTML: '<span class="vjs-control-text"></span>',
    })
  }
  t.Gb = t.ga.extend()
  t.Gb.prototype.defaultValue = '00:00'
  t.Gb.prototype.e = function () {
    return t.ga.prototype.e.call(this, 'div', {
      className: 'vjs-volume-handle',
    })
  }
  t.ra = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
      this.b(a, 'volumechange', this.update)
      a.h && a.h.featuresVolumeControl === l && this.p('vjs-hidden')
      this.b(a, 'loadstart', function () {
        a.h.featuresVolumeControl === l
          ? this.p('vjs-hidden')
          : this.r('vjs-hidden')
      })
    },
  })
  t.ra.prototype.e = function () {
    return t.w.prototype.e.call(this, 'div', {
      className: 'vjs-mute-control vjs-control',
      innerHTML:
        '<div><span class="vjs-control-text">' +
        this.v('Mute') +
        '</span></div>',
    })
  }
  t.ra.prototype.u = function () {
    this.d.muted(this.d.muted() ? l : f)
  }
  t.ra.prototype.update = function () {
    var a = this.d.volume(),
      c = 3
    0 === a || this.d.muted()
      ? (c = 0)
      : 0.33 > a
      ? (c = 1)
      : 0.67 > a && (c = 2)
    this.d.muted()
      ? this.c.children[0].children[0].innerHTML != this.v('Unmute') &&
        (this.c.children[0].children[0].innerHTML = this.v('Unmute'))
      : this.c.children[0].children[0].innerHTML != this.v('Mute') &&
        (this.c.children[0].children[0].innerHTML = this.v('Mute'))
    for (a = 0; 4 > a; a++) t.r(this.c, 'vjs-vol-' + a)
    t.p(this.c, 'vjs-vol-' + c)
  }
  t.Ha = t.O.extend({
    l: function (a, c) {
      t.O.call(this, a, c)
      this.b(a, 'volumechange', this.af)
      a.h && a.h.featuresVolumeControl === l && this.p('vjs-hidden')
      this.b(a, 'loadstart', function () {
        a.h.featuresVolumeControl === l
          ? this.p('vjs-hidden')
          : this.r('vjs-hidden')
      })
      this.p('vjs-menu-button')
    },
  })
  t.Ha.prototype.La = function () {
    var a = new t.qa(this.d, { zc: 'div' }),
      c = new t.Eb(this.d, this.q.volumeBar)
    c.b('focus', function () {
      a.p('vjs-lock-showing')
    })
    c.b('blur', function () {
      G(a)
    })
    a.aa(c)
    return a
  }
  t.Ha.prototype.u = function () {
    t.ra.prototype.u.call(this)
    t.O.prototype.u.call(this)
  }
  t.Ha.prototype.e = function () {
    return t.w.prototype.e.call(this, 'div', {
      className: 'vjs-volume-menu-button vjs-menu-button vjs-control',
      innerHTML:
        '<div><span class="vjs-control-text">' +
        this.v('Mute') +
        '</span></div>',
    })
  }
  t.Ha.prototype.af = t.ra.prototype.update
  t.lc = t.O.extend({
    l: function (a, c) {
      t.O.call(this, a, c)
      this.pd()
      this.od()
      this.b(a, 'loadstart', this.pd)
      this.b(a, 'ratechange', this.od)
    },
  })
  s = t.lc.prototype
  s.ta = 'Playback Rate'
  s.className = 'vjs-playback-rate'
  s.e = function () {
    var a = t.O.prototype.e.call(this)
    this.Oc = t.e('div', { className: 'vjs-playback-rate-value', innerHTML: 1 })
    a.appendChild(this.Oc)
    return a
  }
  s.La = function () {
    var a = new t.qa(this.k()),
      c = this.k().options().playbackRates
    if (c)
      for (var d = c.length - 1; 0 <= d; d--)
        a.aa(new t.Ab(this.k(), { rate: c[d] + 'x' }))
    return a
  }
  s.Ea = function () {
    this.m().setAttribute('aria-valuenow', this.k().playbackRate())
  }
  s.u = function () {
    for (
      var a = this.k().playbackRate(),
        c = this.k().options().playbackRates,
        d = c[0],
        e = 0;
      e < c.length;
      e++
    )
      if (c[e] > a) {
        d = c[e]
        break
      }
    this.k().playbackRate(d)
  }
  function na(a) {
    return (
      a.k().h &&
      a.k().h.featuresPlaybackRate &&
      a.k().options().playbackRates &&
      0 < a.k().options().playbackRates.length
    )
  }
  s.pd = function () {
    na(this) ? this.r('vjs-hidden') : this.p('vjs-hidden')
  }
  s.od = function () {
    na(this) && (this.Oc.innerHTML = this.k().playbackRate() + 'x')
  }
  t.Ab = t.M.extend({
    zc: 'button',
    l: function (a, c) {
      var d = (this.label = c.rate),
        e = (this.Wc = parseFloat(d, 10))
      c.label = d
      c.selected = 1 === e
      t.M.call(this, a, c)
      this.b(a, 'ratechange', this.update)
    },
  })
  t.Ab.prototype.u = function () {
    t.M.prototype.u.call(this)
    this.k().playbackRate(this.Wc)
  }
  t.Ab.prototype.update = function () {
    this.selected(this.k().playbackRate() == this.Wc)
  }
  t.mc = t.w.extend({
    l: function (a, c) {
      t.w.call(this, a, c)
      this.update()
      a.b('posterchange', t.bind(this, this.update))
    },
  })
  s = t.mc.prototype
  s.dispose = function () {
    this.k().n('posterchange', this.update)
    t.w.prototype.dispose.call(this)
  }
  s.e = function () {
    var a = t.e('div', { className: 'vjs-poster', tabIndex: -1 })
    t.td || ((this.Mb = t.e('img')), a.appendChild(this.Mb))
    return a
  }
  s.update = function () {
    var a = this.k().poster()
    this.na(a)
    a ? this.show() : this.W()
  }
  s.na = function (a) {
    var c
    this.Mb
      ? (this.Mb.src = a)
      : ((c = ''),
        a && (c = 'url("' + a + '")'),
        (this.c.style.backgroundImage = c))
  }
  s.u = function () {
    this.d.play()
  }
  t.ic = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
    },
  })
  t.ic.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-loading-spinner',
    })
  }
  t.rb = t.w.extend()
  t.rb.prototype.e = function () {
    return t.w.prototype.e.call(this, 'div', {
      className: 'vjs-big-play-button',
      innerHTML: '<span aria-hidden="true"></span>',
      'aria-label': 'play video',
    })
  }
  t.rb.prototype.u = function () {
    this.d.play()
  }
  t.wb = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.update()
      this.b(a, 'error', this.update)
    },
  })
  t.wb.prototype.e = function () {
    var a = t.a.prototype.e.call(this, 'div', {
      className: 'vjs-error-display',
    })
    this.B = t.e('div')
    a.appendChild(this.B)
    return a
  }
  t.wb.prototype.update = function () {
    this.k().error() && (this.B.innerHTML = this.v(this.k().error().message))
  }
  var O
  t.j = t.a.extend({
    l: function (a, c, d) {
      c = c || {}
      c.$c = l
      t.a.call(this, a, c, d)
      this.featuresProgressEvents || this.ne()
      this.featuresTimeupdateEvents || this.oe()
      this.be()
      this.featuresNativeTextTracks || this.Sd()
      this.de()
    },
  })
  s = t.j.prototype
  s.be = function () {
    var a, c
    a = this.k()
    c = function () {
      a.controls() && !a.usingNativeControls() && this.Fd()
    }
    this.I(c)
    this.b(a, 'controlsenabled', c)
    this.b(a, 'controlsdisabled', this.De)
    this.I(function () {
      this.networkState && 0 < this.networkState() && this.k().o('loadstart')
    })
  }
  s.Fd = function () {
    var a
    this.b('mousedown', this.u)
    this.b('touchstart', function () {
      a = this.d.userActive()
    })
    this.b('touchmove', function () {
      a && this.k().reportUserActivity()
    })
    this.b('touchend', function (a) {
      a.preventDefault()
    })
    da(this)
    this.b('tap', this.xe)
  }
  s.De = function () {
    this.n('tap')
    this.n('touchstart')
    this.n('touchmove')
    this.n('touchleave')
    this.n('touchcancel')
    this.n('touchend')
    this.n('click')
    this.n('mousedown')
  }
  s.u = function (a) {
    0 === a.button &&
      this.k().controls() &&
      (this.k().paused() ? this.k().play() : this.k().pause())
  }
  s.xe = function () {
    this.k().userActive(!this.k().userActive())
  }
  s.ne = function () {
    this.Qc = f
    this.We()
  }
  s.me = function () {
    this.Qc = l
    this.hd()
  }
  s.We = function () {
    this.Ce = this.setInterval(function () {
      var a = this.k().bufferedPercent()
      this.Jd != a && this.k().o('progress')
      this.Jd = a
      1 === a && this.hd()
    }, 500)
  }
  s.hd = function () {
    this.clearInterval(this.Ce)
  }
  s.oe = function () {
    var a = this.d
    this.Vb = f
    this.b(a, 'play', this.md)
    this.b(a, 'pause', this.qb)
    this.N('timeupdate', function () {
      this.featuresTimeupdateEvents = f
      this.Rc()
    })
  }
  s.Rc = function () {
    var a = this.d
    this.Vb = l
    this.qb()
    this.n(a, 'play', this.md)
    this.n(a, 'pause', this.qb)
  }
  s.md = function () {
    this.Bc && this.qb()
    this.Bc = this.setInterval(function () {
      this.k().o('timeupdate')
    }, 250)
  }
  s.qb = function () {
    this.clearInterval(this.Bc)
    this.k().o('timeupdate')
  }
  s.dispose = function () {
    this.Qc && this.me()
    this.Vb && this.Rc()
    t.a.prototype.dispose.call(this)
  }
  s.Zb = function () {
    this.Vb && this.k().o('timeupdate')
  }
  s.de = function () {
    function a() {
      var a = c.da('textTrackDisplay')
      a && a.C()
    }
    var c = this.d,
      d
    if ((d = this.textTracks()))
      d.addEventListener('removetrack', a),
        d.addEventListener('addtrack', a),
        this.b(
          'dispose',
          t.bind(this, function () {
            d.removeEventListener('removetrack', a)
            d.removeEventListener('addtrack', a)
          }),
        )
  }
  s.Sd = function () {
    var a = this.d,
      c,
      d,
      e
    window.WebVTT ||
      ((e = document.createElement('script')),
      (e.src = a.options()['vtt.js'] || '../node_modules/vtt.js/dist/vtt.js'),
      a.m().appendChild(e),
      (window.WebVTT = f))
    if ((d = this.textTracks()))
      (c = function () {
        var c, d, e
        e = a.da('textTrackDisplay')
        e.C()
        for (c = 0; c < this.length; c++)
          (d = this[c]),
            d.removeEventListener('cuechange', t.bind(e, e.C)),
            'showing' === d.mode &&
              d.addEventListener('cuechange', t.bind(e, e.C))
      }),
        d.addEventListener('change', c),
        this.b(
          'dispose',
          t.bind(this, function () {
            d.removeEventListener('change', c)
          }),
        )
  }
  s.textTracks = function () {
    this.d.ld = this.d.ld || new t.F()
    return this.d.ld
  }
  s.X = function () {
    this.d.Xc = this.d.Xc || new t.F()
    return this.d.Xc
  }
  O = function (a, c, d, e, g) {
    var h = a.textTracks()
    g = g || {}
    g.kind = c
    d && (g.label = d)
    e && (g.language = e)
    g.player = a.d
    a = new t.t(g)
    P(h, a)
    return a
  }
  t.j.prototype.addTextTrack = function (a, c, d) {
    if (!a) throw Error('TextTrack kind is required but was not provided')
    return O(this, a, c, d)
  }
  t.j.prototype.ha = function (a) {
    a = O(this, a.kind, a.label, a.language, a)
    P(this.X(), a)
    return { Y: a }
  }
  t.j.prototype.Da = function (a) {
    Q(this.textTracks(), a)
    Q(this.X(), a)
  }
  t.j.prototype.bd = m()
  t.j.prototype.featuresVolumeControl = f
  t.j.prototype.featuresFullscreenResize = l
  t.j.prototype.featuresPlaybackRate = l
  t.j.prototype.featuresProgressEvents = l
  t.j.prototype.featuresTimeupdateEvents = l
  t.j.prototype.featuresNativeTextTracks = l
  t.j.dc = function (a) {
    a.registerSourceHandler = function (c, d) {
      var e = a.cd
      e || (e = a.cd = [])
      d === b && (d = e.length)
      e.splice(d, 0, c)
    }
    a.ob = function (c) {
      for (var d = a.cd || [], e, g = 0; g < d.length; g++)
        if ((e = d[g].canHandleSource(c))) return d[g]
      return j
    }
    a.wc = function (c) {
      var d = a.ob(c)
      return d ? d.canHandleSource(c) : ''
    }
    a.prototype.ma = function (c) {
      var d = a.ob(c)
      d ||
        (a.nativeSourceHandler
          ? (d = a.nativeSourceHandler)
          : t.log.error('No source hander found for the current source.'))
      this.ia()
      this.n('dispose', this.ia)
      this.fb = c
      this.$b = d.handleSource(c, this)
      this.b('dispose', this.ia)
      return this
    }
    a.prototype.ia = function () {
      this.$b && this.$b.dispose && this.$b.dispose()
    }
  }
  t.media = {}
  t.f = t.j.extend({
    l: function (a, c, d) {
      var e, g, h
      if (c.nativeCaptions === l || c.nativeTextTracks === l)
        this.featuresNativeTextTracks = l
      t.j.call(this, a, c, d)
      for (d = t.f.xb.length - 1; 0 <= d; d--) this.b(t.f.xb[d], this.Td)
      ;(c = c.source) &&
        (this.c.currentSrc !== c.src || (a.L && 3 === a.L.ce)) &&
        this.ma(c)
      if (this.c.hasChildNodes()) {
        d = this.c.childNodes
        e = d.length
        for (c = []; e--; )
          (g = d[e]),
            (h = g.nodeName.toLowerCase()),
            'track' === h &&
              (this.featuresNativeTextTracks ? P(this.X(), g.track) : c.push(g))
        for (d = 0; d < c.length; d++) this.c.removeChild(c[d])
      }
      if (t.Db && a.options().nativeControlsForTouch === f) {
        var k, q, r, u
        k = this
        q = this.k()
        c = q.controls()
        k.c.controls = !!c
        r = function () {
          k.c.controls = f
        }
        u = function () {
          k.c.controls = l
        }
        q.b('controlsenabled', r)
        q.b('controlsdisabled', u)
        c = function () {
          q.n('controlsenabled', r)
          q.n('controlsdisabled', u)
        }
        k.b('dispose', c)
        q.b('usingcustomcontrols', c)
        q.usingNativeControls(f)
      }
      a.I(function () {
        this.src() &&
          this.L &&
          this.q.autoplay &&
          this.paused() &&
          (delete this.L.poster, this.play())
      })
      this.Va()
    },
  })
  s = t.f.prototype
  s.dispose = function () {
    t.f.Kb(this.c)
    t.j.prototype.dispose.call(this)
  }
  s.e = function () {
    var a = this.d,
      c,
      d,
      e,
      g = a.L
    if (!g || this.movingMediaElementInDOM === l) {
      g
        ? ((e = g.cloneNode(l)), t.f.Kb(g), (g = e), (a.L = j))
        : ((g = t.e('video')),
          (e = videojs.Z.Aa({}, a.Te)),
          (!t.Db || a.options().nativeControlsForTouch !== f) &&
            delete e.controls,
          t.ad(g, t.i.D(e, { id: a.id() + '_html5_api', class: 'vjs-tech' })))
      g.player = a
      if (a.q.nd)
        for (e = 0; e < a.q.nd.length; e++)
          (c = a.q.nd[e]),
            (d = document.createElement('track')),
            (d.Tb = c.Tb),
            (d.label = c.label),
            (d.ed = c.ed),
            (d.src = c.src),
            'default' in c && d.setAttribute('default', 'default'),
            g.appendChild(d)
      t.Rb(g, a.m())
    }
    c = ['autoplay', 'preload', 'loop', 'muted']
    for (e = c.length - 1; 0 <= e; e--) {
      d = c[e]
      var h = {}
      'undefined' !== typeof a.q[d] && (h[d] = a.q[d])
      t.ad(g, h)
    }
    return g
  }
  s.Td = function (a) {
    'error' == a.type && this.error()
      ? this.k().error(this.error().code)
      : ((a.bubbles = l), this.k().o(a))
  }
  s.play = function () {
    this.c.play()
  }
  s.pause = function () {
    this.c.pause()
  }
  s.paused = function () {
    return this.c.paused
  }
  s.currentTime = function () {
    return this.c.currentTime
  }
  s.Zb = function (a) {
    try {
      this.c.currentTime = a
    } catch (c) {
      t.log(c, 'Video is not ready. (Video.js)')
    }
  }
  s.duration = function () {
    return this.c.duration || 0
  }
  s.buffered = function () {
    return this.c.buffered
  }
  s.volume = function () {
    return this.c.volume
  }
  s.Oe = function (a) {
    this.c.volume = a
  }
  s.muted = function () {
    return this.c.muted
  }
  s.Ke = function (a) {
    this.c.muted = a
  }
  s.width = function () {
    return this.c.offsetWidth
  }
  s.height = function () {
    return this.c.offsetHeight
  }
  s.Sa = function () {
    return 'function' == typeof this.c.webkitEnterFullScreen &&
      (/Android/.test(t.P) || !/Chrome|Mac OS X 10.5/.test(t.P))
      ? f
      : l
  }
  s.Ec = function () {
    var a = this.c
    'webkitDisplayingFullscreen' in a &&
      this.N('webkitbeginfullscreen', function () {
        this.d.isFullscreen(f)
        this.N('webkitendfullscreen', function () {
          this.d.isFullscreen(l)
          this.d.o('fullscreenchange')
        })
        this.d.o('fullscreenchange')
      })
    a.paused && a.networkState <= a.ef
      ? (this.c.play(),
        this.setTimeout(function () {
          a.pause()
          a.webkitEnterFullScreen()
        }, 0))
      : a.webkitEnterFullScreen()
  }
  s.Ud = function () {
    this.c.webkitExitFullScreen()
  }
  function oa(a, c) {
    var d = /^blob\:/i
    return c && a && d.test(a) ? c : a
  }
  s.src = function (a) {
    var c = this.c.src
    if (a === b) return oa(c, this.dd)
    this.na(a)
  }
  s.na = function (a) {
    this.c.src = a
  }
  s.load = function () {
    this.c.load()
  }
  s.currentSrc = function () {
    var a = this.c.currentSrc
    return !this.fb ? a : oa(a, this.fb.src)
  }
  s.poster = function () {
    return this.c.poster
  }
  s.bd = function (a) {
    this.c.poster = a
  }
  s.Ra = function () {
    return this.c.Ra
  }
  s.Me = function (a) {
    this.c.Ra = a
  }
  s.autoplay = function () {
    return this.c.autoplay
  }
  s.He = function (a) {
    this.c.autoplay = a
  }
  s.controls = function () {
    return this.c.controls
  }
  s.loop = function () {
    return this.c.loop
  }
  s.Je = function (a) {
    this.c.loop = a
  }
  s.error = function () {
    return this.c.error
  }
  s.seeking = function () {
    return this.c.seeking
  }
  s.seekable = function () {
    return this.c.seekable
  }
  s.ended = function () {
    return this.c.ended
  }
  s.playbackRate = function () {
    return this.c.playbackRate
  }
  s.Le = function (a) {
    this.c.playbackRate = a
  }
  s.networkState = function () {
    return this.c.networkState
  }
  s.readyState = function () {
    return this.c.readyState
  }
  s.textTracks = function () {
    return !this.featuresNativeTextTracks
      ? t.j.prototype.textTracks.call(this)
      : this.c.textTracks
  }
  s.addTextTrack = function (a, c, d) {
    return !this.featuresNativeTextTracks
      ? t.j.prototype.addTextTrack.call(this, a, c, d)
      : this.c.addTextTrack(a, c, d)
  }
  s.ha = function (a) {
    if (!this.featuresNativeTextTracks) return t.j.prototype.ha.call(this, a)
    var c = document.createElement('track')
    a = a || {}
    a.kind && (c.kind = a.kind)
    a.label && (c.label = a.label)
    if (a.language || a.srclang) c.srclang = a.language || a.srclang
    a['default'] && (c['default'] = a['default'])
    a.id && (c.id = a.id)
    a.src && (c.src = a.src)
    this.m().appendChild(c)
    P(this.X(), c.Y)
    return c
  }
  s.Da = function (a) {
    if (!this.featuresNativeTextTracks) return t.j.prototype.Da.call(this, a)
    var c, d
    Q(this.X(), a)
    c = this.m().querySelectorAll('track')
    for (d = 0; d < c.length; d++)
      if (c[d] === a || c[d].track === a) {
        c[d].parentNode.removeChild(c[d])
        break
      }
  }
  t.f.isSupported = function () {
    try {
      t.A.volume = 0.5
    } catch (a) {
      return l
    }
    return !!t.A.canPlayType
  }
  t.j.dc(t.f)
  var pa = t.f.prototype.ma,
    qa = t.f.prototype.ia
  t.f.prototype.ma = function (a) {
    var c = pa.call(this, a)
    this.dd = a.src
    return c
  }
  t.f.prototype.ia = function () {
    this.dd = b
    return qa.call(this)
  }
  t.f.nativeSourceHandler = {}
  t.f.nativeSourceHandler.canHandleSource = function (a) {
    function c(a) {
      try {
        return t.A.canPlayType(a)
      } catch (c) {
        return ''
      }
    }
    return a.type
      ? c(a.type)
      : a.src
      ? ((a = (a = a.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i)) && a[1]),
        c('video/' + a))
      : ''
  }
  t.f.nativeSourceHandler.handleSource = function (a, c) {
    c.na(a.src)
  }
  t.f.nativeSourceHandler.dispose = m()
  t.f.registerSourceHandler(t.f.nativeSourceHandler)
  t.f.Ld = function () {
    var a = t.A.volume
    t.A.volume = a / 2 + 0.1
    return a !== t.A.volume
  }
  t.f.Kd = function () {
    var a = t.A.playbackRate
    t.A.playbackRate = a / 2 + 0.1
    return a !== t.A.playbackRate
  }
  t.f.Re = function () {
    var a
    ;(a = !!t.A.textTracks) &&
      0 < t.A.textTracks.length &&
      (a = 'number' !== typeof t.A.textTracks[0].mode)
    a && t.gc && (a = l)
    return a
  }
  t.f.prototype.featuresVolumeControl = t.f.Ld()
  t.f.prototype.featuresPlaybackRate = t.f.Kd()
  t.f.prototype.movingMediaElementInDOM = !t.xd
  t.f.prototype.featuresFullscreenResize = f
  t.f.prototype.featuresProgressEvents = f
  t.f.prototype.featuresNativeTextTracks = t.f.Re()
  var S,
    ra = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
    sa = /^video\/mp4/i
  t.f.Tc = function () {
    4 <= t.ec &&
      (S || (S = t.A.constructor.prototype.canPlayType),
      (t.A.constructor.prototype.canPlayType = function (a) {
        return a && ra.test(a) ? 'maybe' : S.call(this, a)
      }))
    t.Bd &&
      (S || (S = t.A.constructor.prototype.canPlayType),
      (t.A.constructor.prototype.canPlayType = function (a) {
        return a && sa.test(a) ? 'maybe' : S.call(this, a)
      }))
  }
  t.f.Ye = function () {
    var a = t.A.constructor.prototype.canPlayType
    t.A.constructor.prototype.canPlayType = S
    S = j
    return a
  }
  t.f.Tc()
  t.f.xb = 'loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange'.split(
    ' ',
  )
  t.f.Kb = function (a) {
    if (a) {
      a.player = j
      for (a.parentNode && a.parentNode.removeChild(a); a.hasChildNodes(); )
        a.removeChild(a.firstChild)
      a.removeAttribute('src')
      if ('function' === typeof a.load)
        try {
          a.load()
        } catch (c) {}
    }
  }
  t.g = t.j.extend({
    l: function (a, c, d) {
      t.j.call(this, a, c, d)
      var e = c.source
      d = a.id() + '_flash_api'
      var g = a.q,
        g = t.i.D(
          {
            readyFunction: 'videojs.Flash.onReady',
            eventProxyFunction: 'videojs.Flash.onEvent',
            errorEventProxyFunction: 'videojs.Flash.onError',
            autoplay: g.autoplay,
            preload: g.Ra,
            loop: g.loop,
            muted: g.muted,
          },
          c.flashVars,
        ),
        h = t.i.D({ wmode: 'opaque', bgcolor: '#000000' }, c.params)
      d = t.i.D({ id: d, name: d, class: 'vjs-tech' }, c.attributes)
      e &&
        this.I(function () {
          this.ma(e)
        })
      t.Rb(this.c, c.parentEl)
      c.startTime &&
        this.I(function () {
          this.load()
          this.play()
          this.currentTime(c.startTime)
        })
      t.gc &&
        this.I(function () {
          this.b('mousemove', function () {
            this.k().o({ type: 'mousemove', bubbles: l })
          })
        })
      a.b('stageclick', a.reportUserActivity)
      this.c = t.g.Dc(c.swf, this.c, g, h, d)
    },
  })
  s = t.g.prototype
  s.dispose = function () {
    t.j.prototype.dispose.call(this)
  }
  s.play = function () {
    this.ended() && this.setCurrentTime(0)
    this.c.vjs_play()
  }
  s.pause = function () {
    this.c.vjs_pause()
  }
  s.src = function (a) {
    return a === b ? this.currentSrc() : this.na(a)
  }
  s.na = function (a) {
    a = t.Xd(a)
    this.c.vjs_src(a)
    if (this.d.autoplay()) {
      var c = this
      this.setTimeout(function () {
        c.play()
      }, 0)
    }
  }
  t.g.prototype.setCurrentTime = function (a) {
    this.ke = a
    this.c.vjs_setProperty('currentTime', a)
    t.j.prototype.Zb.call(this)
  }
  t.g.prototype.currentTime = function () {
    return this.seeking() ? this.ke || 0 : this.c.vjs_getProperty('currentTime')
  }
  t.g.prototype.currentSrc = function () {
    return this.fb ? this.fb.src : this.c.vjs_getProperty('currentSrc')
  }
  t.g.prototype.load = function () {
    this.c.vjs_load()
  }
  t.g.prototype.poster = function () {
    this.c.vjs_getProperty('poster')
  }
  t.g.prototype.setPoster = m()
  s = t.g.prototype
  s.seekable = function () {
    return 0 === this.duration() ? t.xa() : t.xa(0, this.duration())
  }
  s.buffered = function () {
    return !this.c.vjs_getProperty
      ? t.xa()
      : t.xa(0, this.c.vjs_getProperty('buffered'))
  }
  s.duration = function () {
    return !this.c.vjs_getProperty ? 0 : this.c.vjs_getProperty('duration')
  }
  s.Sa = p(l)
  s.Ec = p(l)
  function ta() {
    var a = T[U],
      c = a.charAt(0).toUpperCase() + a.slice(1)
    ua['set' + c] = function (c) {
      return this.c.vjs_setProperty(a, c)
    }
  }
  function va(a) {
    ua[a] = function () {
      return this.c.vjs_getProperty(a)
    }
  }
  var ua = t.g.prototype,
    T = 'rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted'.split(
      ' ',
    ),
    wa = 'error networkState readyState seeking initialTime startOffsetTime paused played ended videoTracks audioTracks videoWidth videoHeight'.split(
      ' ',
    ),
    U
  for (U = 0; U < T.length; U++) va(T[U]), ta()
  for (U = 0; U < wa.length; U++) va(wa[U])
  t.g.isSupported = function () {
    return 10 <= t.g.version()[0]
  }
  t.j.dc(t.g)
  t.g.nativeSourceHandler = {}
  t.g.nativeSourceHandler.canHandleSource = function (a) {
    return !a.type
      ? ''
      : a.type.replace(/;.*/, '').toLowerCase() in t.g.Wd
      ? 'maybe'
      : ''
  }
  t.g.nativeSourceHandler.handleSource = function (a, c) {
    c.na(a.src)
  }
  t.g.nativeSourceHandler.dispose = m()
  t.g.registerSourceHandler(t.g.nativeSourceHandler)
  t.g.Wd = {
    'video/flv': 'FLV',
    'video/x-flv': 'FLV',
    'video/mp4': 'MP4',
    'video/m4v': 'MP4',
  }
  t.g.onReady = function (a) {
    var c
    if ((c = (a = t.m(a)) && a.parentNode && a.parentNode.player))
      (a.player = c), t.g.checkReady(c.h)
  }
  t.g.checkReady = function (a) {
    a.m() &&
      (a.m().vjs_getProperty
        ? a.Va()
        : this.setTimeout(function () {
            t.g.checkReady(a)
          }, 50))
  }
  t.g.onEvent = function (a, c) {
    t.m(a).player.o(c)
  }
  t.g.onError = function (a, c) {
    var d = t.m(a).player,
      e = 'FLASH: ' + c
    'srcnotfound' == c ? d.error({ code: 4, message: e }) : d.error(e)
  }
  t.g.version = function () {
    var a = '0,0,0'
    try {
      a = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
        .GetVariable('$version')
        .replace(/\D+/g, ',')
        .match(/^,?(.+),?$/)[1]
    } catch (c) {
      try {
        navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin &&
          (a = (
            navigator.plugins['Shockwave Flash 2.0'] ||
            navigator.plugins['Shockwave Flash']
          ).description
            .replace(/\D+/g, ',')
            .match(/^,?(.+),?$/)[1])
      } catch (d) {}
    }
    return a.split(',')
  }
  t.g.Dc = function (a, c, d, e, g) {
    a = t.g.$d(a, d, e, g)
    a = t.e('div', { innerHTML: a }).childNodes[0]
    d = c.parentNode
    c.parentNode.replaceChild(a, c)
    a[t.expando] = c[t.expando]
    var h = d.childNodes[0]
    setTimeout(function () {
      h.style.display = 'block'
    }, 1e3)
    return a
  }
  t.g.$d = function (a, c, d, e) {
    var g = '',
      h = '',
      k = ''
    c &&
      t.i.ca(c, function (a, c) {
        g += a + '=' + c + '&amp;'
      })
    d = t.i.D(
      {
        movie: a,
        flashvars: g,
        allowScriptAccess: 'always',
        allowNetworking: 'all',
      },
      d,
    )
    t.i.ca(d, function (a, c) {
      h += '<param name="' + a + '" value="' + c + '" />'
    })
    e = t.i.D({ data: a, width: '100%', height: '100%' }, e)
    t.i.ca(e, function (a, c) {
      k += a + '="' + c + '" '
    })
    return (
      '<object type="application/x-shockwave-flash" ' +
      k +
      '>' +
      h +
      '</object>'
    )
  }
  t.g.Qe = { 'rtmp/mp4': 'MP4', 'rtmp/flv': 'FLV' }
  t.g.Df = function (a, c) {
    return a + '&' + c
  }
  t.g.Pe = function (a) {
    var c = { yc: '', jd: '' }
    if (!a) return c
    var d = a.indexOf('&'),
      e
    ;-1 !== d
      ? (e = d + 1)
      : ((d = e = a.lastIndexOf('/') + 1), 0 === d && (d = e = a.length))
    c.yc = a.substring(0, d)
    c.jd = a.substring(e, a.length)
    return c
  }
  t.g.ie = function (a) {
    return a in t.g.Qe
  }
  t.g.Dd = /^rtmp[set]?:\/\//i
  t.g.he = function (a) {
    return t.g.Dd.test(a)
  }
  t.g.Yb = {}
  t.g.Yb.canHandleSource = function (a) {
    return t.g.ie(a.type) || t.g.he(a.src) ? 'maybe' : ''
  }
  t.g.Yb.handleSource = function (a, c) {
    var d = t.g.Pe(a.src)
    c.setRtmpConnection(d.yc)
    c.setRtmpStream(d.jd)
  }
  t.g.registerSourceHandler(t.g.Yb)
  t.Cd = t.a.extend({
    l: function (a, c, d) {
      t.a.call(this, a, c, d)
      if (!a.q.sources || 0 === a.q.sources.length) {
        c = 0
        for (d = a.q.techOrder; c < d.length; c++) {
          var e = t.va(d[c]),
            g = window.videojs[e]
          if (g && g.isSupported()) {
            ka(a, e)
            break
          }
        }
      } else a.src(a.q.sources)
    },
  })
  t.oc = { disabled: 'disabled', hidden: 'hidden', showing: 'showing' }
  t.Ed = {
    subtitles: 'subtitles',
    captions: 'captions',
    descriptions: 'descriptions',
    chapters: 'chapters',
    metadata: 'metadata',
  }
  t.t = function (a) {
    var c, d, e, g, h, k, q, r, u, A, R
    a = a || {}
    if (!a.player) throw Error('A player was not provided.')
    c = this
    if (t.pa)
      for (R in ((c = document.createElement('custom')), t.t.prototype))
        c[R] = t.t.prototype[R]
    c.d = a.player
    e = t.oc[a.mode] || 'disabled'
    g = t.Ed[a.kind] || 'subtitles'
    h = a.label || ''
    k = a.language || a.srclang || ''
    d = a.id || 'vjs_text_track_' + t.s++
    if ('metadata' === g || 'chapters' === g) e = 'hidden'
    c.V = []
    c.Ia = []
    q = new t.U(c.V)
    r = new t.U(c.Ia)
    A = l
    u = t.bind(c, function () {
      this.activeCues
      A && (this.trigger('cuechange'), (A = l))
    })
    'disabled' !== e && c.d.b('timeupdate', u)
    Object.defineProperty(c, 'kind', {
      get: function () {
        return g
      },
      set: Function.prototype,
    })
    Object.defineProperty(c, 'label', {
      get: function () {
        return h
      },
      set: Function.prototype,
    })
    Object.defineProperty(c, 'language', {
      get: function () {
        return k
      },
      set: Function.prototype,
    })
    Object.defineProperty(c, 'id', {
      get: function () {
        return d
      },
      set: Function.prototype,
    })
    Object.defineProperty(c, 'mode', {
      get: function () {
        return e
      },
      set: function (a) {
        t.oc[a] &&
          ((e = a),
          'showing' === e && this.d.b('timeupdate', u),
          this.o('modechange'))
      },
    })
    Object.defineProperty(c, 'cues', {
      get: function () {
        return !this.Ub ? j : q
      },
      set: Function.prototype,
    })
    Object.defineProperty(c, 'activeCues', {
      get: function () {
        var a, c, d, e, g
        if (!this.Ub) return j
        if (0 === this.cues.length) return r
        e = this.d.currentTime()
        a = 0
        c = this.cues.length
        for (d = []; a < c; a++)
          (g = this.cues[a]),
            g.startTime <= e && g.endTime >= e
              ? d.push(g)
              : g.startTime === g.endTime &&
                g.startTime <= e &&
                g.startTime + 0.5 >= e &&
                d.push(g)
        A = l
        if (d.length !== this.Ia.length) A = f
        else
          for (a = 0; a < d.length; a++)
            -1 === xa.call(this.Ia, d[a]) && (A = f)
        this.Ia = d
        r.pb(this.Ia)
        return r
      },
      set: Function.prototype,
    })
    a.src ? ya(a.src, c) : (c.Ub = f)
    if (t.pa) return c
  }
  t.t.prototype = t.i.create(t.z.prototype)
  t.t.prototype.constructor = t.t
  t.t.prototype.ab = { cuechange: 'cuechange' }
  t.t.prototype.sc = function (a) {
    var c = this.d.textTracks(),
      d = 0
    if (c) for (; d < c.length; d++) c[d] !== this && c[d].Yc(a)
    this.V.push(a)
    this.cues.pb(this.V)
  }
  t.t.prototype.Yc = function (a) {
    for (var c = 0, d = this.V.length, e, g = l; c < d; c++)
      (e = this.V[c]), e === a && (this.V.splice(c, 1), (g = f))
    g && this.Ac.pb(this.V)
  }
  var ya, V, xa
  ya = function (a, c) {
    t.bf(
      a,
      t.bind(this, function (a, e, g) {
        if (a) return t.log.error(a)
        c.Ub = f
        V(g, c)
      }),
    )
  }
  V = function (a, c) {
    if ('function' !== typeof window.WebVTT)
      window.setTimeout(function () {
        V(a, c)
      }, 25)
    else {
      var d = new window.WebVTT.Parser(
        window,
        window.vttjs,
        window.WebVTT.StringDecoder(),
      )
      d.oncue = function (a) {
        c.sc(a)
      }
      d.onparsingerror = function (a) {
        t.log.error(a)
      }
      d.parse(a)
      d.flush()
    }
  }
  xa = function (a, c) {
    var d
    if (this == j) throw new TypeError('"this" is null or not defined')
    var e = Object(this),
      g = e.length >>> 0
    if (0 === g) return -1
    d = +c || 0
    Infinity === Math.abs(d) && (d = 0)
    if (d >= g) return -1
    for (d = Math.max(0 <= d ? d : g - Math.abs(d), 0); d < g; ) {
      if (d in e && e[d] === a) return d
      d++
    }
    return -1
  }
  t.F = function (a) {
    var c = this,
      d,
      e = 0
    if (t.pa)
      for (d in ((c = document.createElement('custom')), t.F.prototype))
        c[d] = t.F.prototype[d]
    a = a || []
    c.Ua = []
    for (
      Object.defineProperty(c, 'length', {
        get: function () {
          return this.Ua.length
        },
      });
      e < a.length;
      e++
    )
      P(c, a[e])
    if (t.pa) return c
  }
  t.F.prototype = t.i.create(t.z.prototype)
  t.F.prototype.constructor = t.F
  t.F.prototype.ab = {
    change: 'change',
    addtrack: 'addtrack',
    removetrack: 'removetrack',
  }
  for (var za in t.F.prototype.ab) t.F.prototype['on' + za] = j
  function P(a, c) {
    var d = a.Ua.length
    '' + d in a ||
      Object.defineProperty(a, d, {
        get: function () {
          return this.Ua[d]
        },
      })
    c.addEventListener(
      'modechange',
      t.bind(a, function () {
        this.o('change')
      }),
    )
    a.Ua.push(c)
    a.o({ type: 'addtrack', Y: c })
  }
  function Q(a, c) {
    for (var d = 0, e = a.length, g; d < e; d++)
      if (((g = a[d]), g === c)) {
        a.Ua.splice(d, 1)
        break
      }
    a.o({ type: 'removetrack', Y: c })
  }
  t.F.prototype.ae = function (a) {
    for (var c = 0, d = this.length, e = j, g; c < d; c++)
      if (((g = this[c]), g.id === a)) {
        e = g
        break
      }
    return e
  }
  t.U = function (a) {
    var c = this,
      d
    if (t.pa)
      for (d in ((c = document.createElement('custom')), t.U.prototype))
        c[d] = t.U.prototype[d]
    t.U.prototype.pb.call(c, a)
    Object.defineProperty(c, 'length', { get: n('le') })
    if (t.pa) return c
  }
  t.U.prototype.pb = function (a) {
    var c = this.length || 0,
      d = 0,
      e = a.length
    this.V = a
    this.le = a.length
    a = function (a) {
      '' + a in this ||
        Object.defineProperty(this, '' + a, {
          get: function () {
            return this.V[a]
          },
        })
    }
    if (c < e) for (d = c; d < e; d++) a.call(this, d)
  }
  t.U.prototype.Zd = function (a) {
    for (var c = 0, d = this.length, e = j, g; c < d; c++)
      if (((g = this[c]), g.id === a)) {
        e = g
        break
      }
    return e
  }
  t.sa = t.a.extend({
    l: function (a, c, d) {
      t.a.call(this, a, c, d)
      a.b('loadstart', t.bind(this, this.Ve))
      a.I(
        t.bind(this, function () {
          if (a.h && a.h.featuresNativeTextTracks) this.W()
          else {
            var c, d, h
            a.b('fullscreenchange', t.bind(this, this.C))
            d = a.q.tracks || []
            for (c = 0; c < d.length; c++) (h = d[c]), this.d.ha(h)
          }
        }),
      )
    },
  })
  t.sa.prototype.Ve = function () {
    this.d.h && this.d.h.featuresNativeTextTracks ? this.W() : this.show()
  }
  t.sa.prototype.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-text-track-display',
    })
  }
  t.sa.prototype.Md = function () {
    'function' === typeof window.WebVTT &&
      window.WebVTT.processCues(window, [], this.c)
  }
  function W(a, c) {
    return (
      'rgba(' +
      parseInt(a[1] + a[1], 16) +
      ',' +
      parseInt(a[2] + a[2], 16) +
      ',' +
      parseInt(a[3] + a[3], 16) +
      ',' +
      c +
      ')'
    )
  }
  var Aa = {
    tf: 'monospace',
    zf: 'sans-serif',
    Bf: 'serif',
    uf: '"Andale Mono", "Lucida Console", monospace',
    vf: '"Courier New", monospace',
    xf: 'sans-serif',
    yf: 'serif',
    kf: '"Comic Sans MS", Impact, fantasy',
    Af: '"Monotype Corsiva", cursive',
    Cf: '"Andale Mono", "Lucida Console", monospace, sans-serif',
  }
  t.sa.prototype.C = function () {
    var a = this.d.textTracks(),
      c = 0,
      d
    this.Md()
    if (a)
      for (; c < a.length; c++) (d = a[c]), 'showing' === d.mode && this.Ze(d)
  }
  t.sa.prototype.Ze = function (a) {
    if ('function' === typeof window.WebVTT && a.activeCues) {
      for (
        var c = 0, d = this.d.textTrackSettings.Hc(), e, g = [];
        c < a.activeCues.length;
        c++
      )
        g.push(a.activeCues[c])
      window.WebVTT.processCues(window, a.activeCues, this.c)
      for (c = g.length; c--; ) {
        a = g[c].lf
        d.color && (a.firstChild.style.color = d.color)
        if (d.kd)
          try {
            a.firstChild.style.color = W(d.color || '#fff', d.kd)
          } catch (h) {}
        d.backgroundColor &&
          (a.firstChild.style.backgroundColor = d.backgroundColor)
        if (d.vc)
          try {
            a.firstChild.style.backgroundColor = W(
              d.backgroundColor || '#000',
              d.vc,
            )
          } catch (k) {}
        if (d.cc)
          if (d.rd)
            try {
              a.style.backgroundColor = W(d.cc, d.rd)
            } catch (q) {}
          else a.style.backgroundColor = d.cc
        d.Ma &&
          ('dropshadow' === d.Ma
            ? (a.firstChild.style.textShadow =
                '2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222')
            : 'raised' === d.Ma
            ? (a.firstChild.style.textShadow =
                '1px 1px #222, 2px 2px #222, 3px 3px #222')
            : 'depressed' === d.Ma
            ? (a.firstChild.style.textShadow =
                '1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222')
            : 'uniform' === d.Ma &&
              (a.firstChild.style.textShadow =
                '0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222'))
        d.Ob &&
          1 !== d.Ob &&
          ((e = window.wf(a.style.fontSize)),
          (a.style.fontSize = e * d.Ob + 'px'),
          (a.style.height = 'auto'),
          (a.style.top = 'auto'),
          (a.style.bottom = '2px'))
        d.fontFamily &&
          'default' !== d.fontFamily &&
          ('small-caps' === d.fontFamily
            ? (a.firstChild.style.fontVariant = 'small-caps')
            : (a.firstChild.style.fontFamily = Aa[d.fontFamily]))
      }
    }
  }
  t.$ = t.M.extend({
    l: function (a, c) {
      var d = (this.Y = c.track),
        e = a.textTracks(),
        g,
        h
      e &&
        ((g = t.bind(this, function () {
          var a = 'showing' === this.Y.mode,
            c,
            d,
            g
          if (this instanceof t.zb) {
            a = f
            d = 0
            for (g = e.length; d < g; d++)
              if (
                ((c = e[d]), c.kind === this.Y.kind && 'showing' === c.mode)
              ) {
                a = l
                break
              }
          }
          this.selected(a)
        })),
        e.addEventListener('change', g),
        a.b('dispose', function () {
          e.removeEventListener('change', g)
        }))
      c.label = d.label || d.language || 'Unknown'
      c.selected = d['default'] || 'showing' === d.mode
      t.M.call(this, a, c)
      e &&
        e.onchange === b &&
        this.b(['tap', 'click'], function () {
          if ('object' !== typeof window.vd)
            try {
              h = new window.vd('change')
            } catch (a) {}
          h ||
            ((h = document.createEvent('Event')), h.initEvent('change', f, f))
          e.dispatchEvent(h)
        })
    },
  })
  t.$.prototype.u = function () {
    var a = this.Y.kind,
      c = this.d.textTracks(),
      d,
      e = 0
    t.M.prototype.u.call(this)
    if (c)
      for (; e < c.length; e++)
        (d = c[e]),
          d.kind === a && (d.mode = d === this.Y ? 'showing' : 'disabled')
  }
  t.zb = t.$.extend({
    l: function (a, c) {
      c.track = {
        kind: c.kind,
        player: a,
        label: c.kind + ' off',
        default: l,
        mode: 'disabled',
      }
      t.$.call(this, a, c)
      this.selected(f)
    },
  })
  t.sb = t.$.extend({
    l: function (a, c) {
      c.track = {
        kind: c.kind,
        player: a,
        label: c.kind + ' settings',
        default: l,
        mode: 'disabled',
      }
      t.$.call(this, a, c)
      this.p('vjs-texttrack-settings')
    },
  })
  t.sb.prototype.u = function () {
    this.k().da('textTrackSettings').show()
  }
  t.Q = t.O.extend({
    l: function (a, c) {
      var d, e
      t.O.call(this, a, c)
      d = this.d.textTracks()
      1 >= this.H.length && this.W()
      d &&
        ((e = t.bind(this, this.update)),
        d.addEventListener('removetrack', e),
        d.addEventListener('addtrack', e),
        this.d.b('dispose', function () {
          d.removeEventListener('removetrack', e)
          d.removeEventListener('addtrack', e)
        }))
    },
  })
  t.Q.prototype.Ka = function () {
    var a = [],
      c,
      d
    this instanceof t.oa &&
      (!this.k().h || !this.k().h.featuresNativeTextTracks) &&
      a.push(new t.sb(this.d, { kind: this.ea }))
    a.push(new t.zb(this.d, { kind: this.ea }))
    d = this.d.textTracks()
    if (!d) return a
    for (var e = 0; e < d.length; e++)
      (c = d[e]), c.kind === this.ea && a.push(new t.$(this.d, { track: c }))
    return a
  }
  t.oa = t.Q.extend({
    l: function (a, c, d) {
      t.Q.call(this, a, c, d)
      this.c.setAttribute('aria-label', 'Captions Menu')
    },
  })
  t.oa.prototype.ea = 'captions'
  t.oa.prototype.ta = 'Captions'
  t.oa.prototype.className = 'vjs-captions-button'
  t.oa.prototype.update = function () {
    var a = 2
    t.Q.prototype.update.call(this)
    this.k().h && this.k().h.featuresNativeTextTracks && (a = 1)
    this.H && this.H.length > a ? this.show() : this.W()
  }
  t.$a = t.Q.extend({
    l: function (a, c, d) {
      t.Q.call(this, a, c, d)
      this.c.setAttribute('aria-label', 'Subtitles Menu')
    },
  })
  t.$a.prototype.ea = 'subtitles'
  t.$a.prototype.ta = 'Subtitles'
  t.$a.prototype.className = 'vjs-subtitles-button'
  t.Wa = t.Q.extend({
    l: function (a, c, d) {
      t.Q.call(this, a, c, d)
      this.c.setAttribute('aria-label', 'Chapters Menu')
    },
  })
  s = t.Wa.prototype
  s.ea = 'chapters'
  s.ta = 'Chapters'
  s.className = 'vjs-chapters-button'
  s.Ka = function () {
    var a = [],
      c,
      d
    d = this.d.textTracks()
    if (!d) return a
    for (var e = 0; e < d.length; e++)
      (c = d[e]), c.kind === this.ea && a.push(new t.$(this.d, { track: c }))
    return a
  }
  s.La = function () {
    for (
      var a = this.d.textTracks() || [],
        c = 0,
        d = a.length,
        e,
        g,
        h = (this.H = []);
      c < d;
      c++
    )
      if (((e = a[c]), e.kind == this.ea))
        if (e.Ac) {
          g = e
          break
        } else
          (e.mode = 'hidden'),
            window.setTimeout(
              t.bind(this, function () {
                this.La()
              }),
              100,
            )
    a = this.za
    a === b &&
      ((a = new t.qa(this.d)),
      a.wa().appendChild(
        t.e('li', {
          className: 'vjs-menu-title',
          innerHTML: t.va(this.ea),
          Se: -1,
        }),
      ))
    if (g) {
      e = g.cues
      for (var k, c = 0, d = e.length; c < d; c++)
        (k = e[c]),
          (k = new t.Xa(this.d, { track: g, cue: k })),
          h.push(k),
          a.aa(k)
      this.aa(a)
    }
    0 < this.H.length && this.show()
    return a
  }
  t.Xa = t.M.extend({
    l: function (a, c) {
      var d = (this.Y = c.track),
        e = (this.cue = c.cue),
        g = a.currentTime()
      c.label = e.text
      c.selected = e.startTime <= g && g < e.endTime
      t.M.call(this, a, c)
      d.addEventListener('cuechange', t.bind(this, this.update))
    },
  })
  t.Xa.prototype.u = function () {
    t.M.prototype.u.call(this)
    this.d.currentTime(this.cue.startTime)
    this.update(this.cue.startTime)
  }
  t.Xa.prototype.update = function () {
    var a = this.cue,
      c = this.d.currentTime()
    this.selected(a.startTime <= c && c < a.endTime)
  }
  function X(a) {
    var c
    a.Ge ? (c = a.Ge[0]) : a.options && (c = a.options[a.options.selectedIndex])
    return c.value
  }
  function Y(a, c) {
    var d, e
    if (c) {
      for (
        d = 0;
        d < a.options.length && !((e = a.options[d]), e.value === c);
        d++
      );
      a.selectedIndex = d
    }
  }
  t.pc = t.a.extend({
    l: function (a, c) {
      t.a.call(this, a, c)
      this.W()
      t.b(
        this.m().querySelector('.vjs-done-button'),
        'click',
        t.bind(this, function () {
          this.Fe()
          this.W()
        }),
      )
      t.b(
        this.m().querySelector('.vjs-default-button'),
        'click',
        t.bind(this, function () {
          this.m().querySelector('.vjs-fg-color > select').selectedIndex = 0
          this.m().querySelector('.vjs-bg-color > select').selectedIndex = 0
          this.m().querySelector('.window-color > select').selectedIndex = 0
          this.m().querySelector('.vjs-text-opacity > select').selectedIndex = 0
          this.m().querySelector('.vjs-bg-opacity > select').selectedIndex = 0
          this.m().querySelector(
            '.vjs-window-opacity > select',
          ).selectedIndex = 0
          this.m().querySelector('.vjs-edge-style select').selectedIndex = 0
          this.m().querySelector('.vjs-font-family select').selectedIndex = 0
          this.m().querySelector('.vjs-font-percent select').selectedIndex = 2
          this.C()
        }),
      )
      t.b(
        this.m().querySelector('.vjs-fg-color > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-bg-color > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.window-color > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-text-opacity > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-bg-opacity > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-window-opacity > select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-font-percent select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-edge-style select'),
        'change',
        t.bind(this, this.C),
      )
      t.b(
        this.m().querySelector('.vjs-font-family select'),
        'change',
        t.bind(this, this.C),
      )
      a.options().persistTextTrackSettings && this.Ee()
    },
  })
  s = t.pc.prototype
  s.e = function () {
    return t.a.prototype.e.call(this, 'div', {
      className: 'vjs-caption-settings vjs-modal-overlay',
      innerHTML:
        '<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>',
    })
  }
  s.Hc = function () {
    var a, c, d, e, g, h, k, q, r, u
    a = this.m()
    g = X(a.querySelector('.vjs-edge-style select'))
    h = X(a.querySelector('.vjs-font-family select'))
    k = X(a.querySelector('.vjs-fg-color > select'))
    d = X(a.querySelector('.vjs-text-opacity > select'))
    q = X(a.querySelector('.vjs-bg-color > select'))
    c = X(a.querySelector('.vjs-bg-opacity > select'))
    r = X(a.querySelector('.window-color > select'))
    e = X(a.querySelector('.vjs-window-opacity > select'))
    a = window.parseFloat(X(a.querySelector('.vjs-font-percent > select')))
    c = {
      backgroundOpacity: c,
      textOpacity: d,
      windowOpacity: e,
      edgeStyle: g,
      fontFamily: h,
      color: k,
      backgroundColor: q,
      windowColor: r,
      fontPercent: a,
    }
    for (u in c)
      ('' === c[u] || 'none' === c[u] || ('fontPercent' === u && 1 === c[u])) &&
        delete c[u]
    return c
  }
  s.Ne = function (a) {
    var c = this.m()
    Y(c.querySelector('.vjs-edge-style select'), a.Ma)
    Y(c.querySelector('.vjs-font-family select'), a.fontFamily)
    Y(c.querySelector('.vjs-fg-color > select'), a.color)
    Y(c.querySelector('.vjs-text-opacity > select'), a.kd)
    Y(c.querySelector('.vjs-bg-color > select'), a.backgroundColor)
    Y(c.querySelector('.vjs-bg-opacity > select'), a.vc)
    Y(c.querySelector('.window-color > select'), a.cc)
    Y(c.querySelector('.vjs-window-opacity > select'), a.rd)
    ;(a = a.Ob) && (a = a.toFixed(2))
    Y(c.querySelector('.vjs-font-percent > select'), a)
  }
  s.Ee = function () {
    var a
    try {
      a = JSON.parse(window.localStorage.getItem('vjs-text-track-settings'))
    } catch (c) {}
    a && this.Ne(a)
  }
  s.Fe = function () {
    var a
    if (this.d.options().persistTextTrackSettings) {
      a = this.Hc()
      try {
        t.hb(a)
          ? window.localStorage.removeItem('vjs-text-track-settings')
          : window.localStorage.setItem(
              'vjs-text-track-settings',
              JSON.stringify(a),
            )
      } catch (c) {}
    }
  }
  s.C = function () {
    var a = this.d.da('textTrackDisplay')
    a && a.C()
  }
  if (
    'undefined' !== typeof window.JSON &&
    'function' === typeof window.JSON.parse
  )
    t.JSON = window.JSON
  else {
    t.JSON = {}
    var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
    t.JSON.parse = function (a, c) {
      function d(a, e) {
        var k,
          q,
          r = a[e]
        if (r && 'object' === typeof r)
          for (k in r)
            Object.prototype.hasOwnProperty.call(r, k) &&
              ((q = d(r, k)), q !== b ? (r[k] = q) : delete r[k])
        return c.call(a, e, r)
      }
      var e
      a = String(a)
      Z.lastIndex = 0
      Z.test(a) &&
        (a = a.replace(Z, function (a) {
          return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }))
      if (
        /^[\],:{}\s]*$/.test(
          a
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              ']',
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
        )
      )
        return (
          (e = eval('(' + a + ')')),
          'function' === typeof c ? d({ '': e }, '') : e
        )
      throw new SyntaxError('JSON.parse(): invalid or malformed JSON data')
    }
  }
  t.uc = function () {
    var a, c, d, e
    a = document.getElementsByTagName('video')
    c = document.getElementsByTagName('audio')
    var g = []
    if (a && 0 < a.length) {
      d = 0
      for (e = a.length; d < e; d++) g.push(a[d])
    }
    if (c && 0 < c.length) {
      d = 0
      for (e = c.length; d < e; d++) g.push(c[d])
    }
    if (g && 0 < g.length) {
      d = 0
      for (e = g.length; d < e; d++)
        if ((c = g[d]) && c.getAttribute)
          c.player === b &&
            ((a = c.getAttribute('data-setup')), a !== j && videojs(c))
        else {
          t.Hb()
          break
        }
    } else t.qd || t.Hb()
  }
  t.Hb = function () {
    setTimeout(t.uc, 1)
  }
  'complete' === document.readyState
    ? (t.qd = f)
    : t.N(window, 'load', function () {
        t.qd = f
      })
  t.Hb()
  t.Be = function (a, c) {
    t.Player.prototype[a] = c
  }
  var Ba = this
  function $(a, c) {
    var d = a.split('.'),
      e = Ba
    !(d[0] in e) && e.execScript && e.execScript('var ' + d[0])
    for (var g; d.length && (g = d.shift()); )
      !d.length && c !== b ? (e[g] = c) : (e = e[g] ? e[g] : (e[g] = {}))
  }
  $('videojs', t)
  $('_V_', t)
  $('videojs.options', t.options)
  $('videojs.players', t.Ca)
  $('videojs.TOUCH_ENABLED', t.Db)
  $('videojs.cache', t.ua)
  $('videojs.Component', t.a)
  t.a.prototype.player = t.a.prototype.k
  t.a.prototype.options = t.a.prototype.options
  t.a.prototype.init = t.a.prototype.l
  t.a.prototype.dispose = t.a.prototype.dispose
  t.a.prototype.createEl = t.a.prototype.e
  t.a.prototype.contentEl = t.a.prototype.wa
  t.a.prototype.el = t.a.prototype.m
  t.a.prototype.addChild = t.a.prototype.aa
  t.a.prototype.getChild = t.a.prototype.da
  t.a.prototype.getChildById = t.a.prototype.Yd
  t.a.prototype.children = t.a.prototype.children
  t.a.prototype.initChildren = t.a.prototype.Kc
  t.a.prototype.removeChild = t.a.prototype.removeChild
  t.a.prototype.on = t.a.prototype.b
  t.a.prototype.off = t.a.prototype.n
  t.a.prototype.one = t.a.prototype.N
  t.a.prototype.trigger = t.a.prototype.o
  t.a.prototype.triggerReady = t.a.prototype.Va
  t.a.prototype.show = t.a.prototype.show
  t.a.prototype.hide = t.a.prototype.W
  t.a.prototype.width = t.a.prototype.width
  t.a.prototype.height = t.a.prototype.height
  t.a.prototype.dimensions = t.a.prototype.Qd
  t.a.prototype.ready = t.a.prototype.I
  t.a.prototype.addClass = t.a.prototype.p
  t.a.prototype.removeClass = t.a.prototype.r
  t.a.prototype.hasClass = t.a.prototype.Pa
  t.a.prototype.buildCSSClass = t.a.prototype.T
  t.a.prototype.localize = t.a.prototype.v
  t.a.prototype.setInterval = t.a.prototype.setInterval
  t.a.prototype.setTimeout = t.a.prototype.setTimeout
  $('videojs.EventEmitter', t.z)
  t.z.prototype.on = t.z.prototype.b
  t.z.prototype.addEventListener = t.z.prototype.addEventListener
  t.z.prototype.off = t.z.prototype.n
  t.z.prototype.removeEventListener = t.z.prototype.removeEventListener
  t.z.prototype.one = t.z.prototype.N
  t.z.prototype.trigger = t.z.prototype.o
  t.z.prototype.dispatchEvent = t.z.prototype.dispatchEvent
  t.Player.prototype.ended = t.Player.prototype.ended
  t.Player.prototype.enterFullWindow = t.Player.prototype.Fc
  t.Player.prototype.exitFullWindow = t.Player.prototype.Lb
  t.Player.prototype.preload = t.Player.prototype.Ra
  t.Player.prototype.remainingTime = t.Player.prototype.remainingTime
  t.Player.prototype.supportsFullScreen = t.Player.prototype.Sa
  t.Player.prototype.currentType = t.Player.prototype.Nd
  t.Player.prototype.requestFullScreen = t.Player.prototype.requestFullScreen
  t.Player.prototype.requestFullscreen = t.Player.prototype.requestFullscreen
  t.Player.prototype.cancelFullScreen = t.Player.prototype.cancelFullScreen
  t.Player.prototype.exitFullscreen = t.Player.prototype.exitFullscreen
  t.Player.prototype.isFullScreen = t.Player.prototype.isFullScreen
  t.Player.prototype.isFullscreen = t.Player.prototype.isFullscreen
  t.Player.prototype.textTracks = t.Player.prototype.textTracks
  t.Player.prototype.remoteTextTracks = t.Player.prototype.X
  t.Player.prototype.addTextTrack = t.Player.prototype.addTextTrack
  t.Player.prototype.addRemoteTextTrack = t.Player.prototype.ha
  t.Player.prototype.removeRemoteTextTrack = t.Player.prototype.Da
  t.Player.prototype.seekable = t.Player.prototype.seekable
  $('videojs.MediaLoader', t.Cd)
  $('videojs.TextTrackDisplay', t.sa)
  $('videojs.ControlBar', t.tb)
  $('videojs.Button', t.w)
  $('videojs.PlayToggle', t.kc)
  $('videojs.FullscreenToggle', t.Ya)
  $('videojs.BigPlayButton', t.rb)
  $('videojs.LoadingSpinner', t.ic)
  $('videojs.CurrentTimeDisplay', t.ub)
  $('videojs.DurationDisplay', t.vb)
  $('videojs.TimeDivider', t.qc)
  $('videojs.RemainingTimeDisplay', t.Cb)
  $('videojs.LiveDisplay', t.hc)
  $('videojs.ErrorDisplay', t.wb)
  $('videojs.Slider', t.S)
  $('videojs.ProgressControl', t.Bb)
  $('videojs.SeekBar', t.nc)
  $('videojs.LoadProgressBar', t.yb)
  $('videojs.PlayProgressBar', t.jc)
  $('videojs.SeekHandle', t.Za)
  $('videojs.VolumeControl', t.Fb)
  $('videojs.VolumeBar', t.Eb)
  $('videojs.VolumeLevel', t.rc)
  $('videojs.VolumeMenuButton', t.Ha)
  $('videojs.VolumeHandle', t.Gb)
  $('videojs.MuteToggle', t.ra)
  $('videojs.PosterImage', t.mc)
  $('videojs.Menu', t.qa)
  $('videojs.MenuItem', t.M)
  $('videojs.MenuButton', t.O)
  $('videojs.PlaybackRateMenuButton', t.lc)
  $('videojs.ChaptersTrackMenuItem', t.Xa)
  $('videojs.TextTrackButton', t.Q)
  $('videojs.TextTrackMenuItem', t.$)
  $('videojs.OffTextTrackMenuItem', t.zb)
  $('videojs.CaptionSettingsMenuItem', t.sb)
  t.O.prototype.createItems = t.O.prototype.Ka
  t.Q.prototype.createItems = t.Q.prototype.Ka
  t.Wa.prototype.createItems = t.Wa.prototype.Ka
  $('videojs.SubtitlesButton', t.$a)
  $('videojs.CaptionsButton', t.oa)
  $('videojs.ChaptersButton', t.Wa)
  $('videojs.MediaTechController', t.j)
  t.j.withSourceHandlers = t.j.dc
  t.j.prototype.featuresVolumeControl = t.j.prototype.qf
  t.j.prototype.featuresFullscreenResize = t.j.prototype.mf
  t.j.prototype.featuresPlaybackRate = t.j.prototype.nf
  t.j.prototype.featuresProgressEvents = t.j.prototype.of
  t.j.prototype.featuresTimeupdateEvents = t.j.prototype.pf
  t.j.prototype.setPoster = t.j.prototype.bd
  t.j.prototype.textTracks = t.j.prototype.textTracks
  t.j.prototype.remoteTextTracks = t.j.prototype.X
  t.j.prototype.addTextTrack = t.j.prototype.addTextTrack
  t.j.prototype.addRemoteTextTrack = t.j.prototype.ha
  t.j.prototype.removeRemoteTextTrack = t.j.prototype.Da
  $('videojs.Html5', t.f)
  t.f.Events = t.f.xb
  t.f.isSupported = t.f.isSupported
  t.f.canPlaySource = t.f.wc
  t.f.patchCanPlayType = t.f.Tc
  t.f.unpatchCanPlayType = t.f.Ye
  t.f.prototype.setCurrentTime = t.f.prototype.Zb
  t.f.prototype.setVolume = t.f.prototype.Oe
  t.f.prototype.setMuted = t.f.prototype.Ke
  t.f.prototype.setPreload = t.f.prototype.Me
  t.f.prototype.setAutoplay = t.f.prototype.He
  t.f.prototype.setLoop = t.f.prototype.Je
  t.f.prototype.enterFullScreen = t.f.prototype.Ec
  t.f.prototype.exitFullScreen = t.f.prototype.Ud
  t.f.prototype.playbackRate = t.f.prototype.playbackRate
  t.f.prototype.setPlaybackRate = t.f.prototype.Le
  t.f.selectSourceHandler = t.f.ob
  t.f.prototype.setSource = t.f.prototype.ma
  t.f.prototype.disposeSourceHandler = t.f.prototype.ia
  t.f.prototype.textTracks = t.f.prototype.textTracks
  t.f.prototype.remoteTextTracks = t.f.prototype.X
  t.f.prototype.addTextTrack = t.f.prototype.addTextTrack
  t.f.prototype.addRemoteTextTrack = t.f.prototype.ha
  t.f.prototype.removeRemoteTextTrack = t.f.prototype.Da
  $('videojs.Flash', t.g)
  t.g.isSupported = t.g.isSupported
  t.g.canPlaySource = t.g.wc
  t.g.onReady = t.g.onReady
  t.g.embed = t.g.Dc
  t.g.version = t.g.version
  t.g.prototype.setSource = t.g.prototype.ma
  t.g.selectSourceHandler = t.g.ob
  t.g.prototype.setSource = t.g.prototype.ma
  t.g.prototype.disposeSourceHandler = t.g.prototype.ia
  $('videojs.TextTrack', t.t)
  $('videojs.TextTrackList', t.F)
  $('videojs.TextTrackCueList', t.U)
  $('videojs.TextTrackSettings', t.pc)
  t.t.prototype.id = t.t.prototype.id
  t.t.prototype.label = t.t.prototype.label
  t.t.prototype.kind = t.t.prototype.Tb
  t.t.prototype.mode = t.t.prototype.mode
  t.t.prototype.cues = t.t.prototype.Ac
  t.t.prototype.activeCues = t.t.prototype.jf
  t.t.prototype.addCue = t.t.prototype.sc
  t.t.prototype.removeCue = t.t.prototype.Yc
  t.F.prototype.getTrackById = t.F.prototype.ae
  t.U.prototype.getCueById = t.F.prototype.Zd
  $('videojs.CaptionsTrack', t.cf)
  $('videojs.SubtitlesTrack', t.hf)
  $('videojs.ChaptersTrack', t.df)
  $('videojs.autoSetup', t.uc)
  $('videojs.plugin', t.Be)
  $('videojs.createTimeRange', t.xa)
  $('videojs.util', t.Z)
  t.Z.mergeOptions = t.Z.Aa
  t.addLanguage = t.Gd
})()
!(function (a) {
  var b = (a.vttjs = {}),
    c = b.VTTCue,
    d = b.VTTRegion,
    e = a.VTTCue,
    f = a.VTTRegion
  ;(b.shim = function () {
    ;(b.VTTCue = c), (b.VTTRegion = d)
  }),
    (b.restore = function () {
      ;(b.VTTCue = e), (b.VTTRegion = f)
    })
})(this),
  (function (a, b) {
    function c(a) {
      if ('string' != typeof a) return !1
      var b = h[a.toLowerCase()]
      return b ? a.toLowerCase() : !1
    }
    function d(a) {
      if ('string' != typeof a) return !1
      var b = i[a.toLowerCase()]
      return b ? a.toLowerCase() : !1
    }
    function e(a) {
      for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b]
        for (var d in c) a[d] = c[d]
      }
      return a
    }
    function f(a, b, f) {
      var h = this,
        i = /MSIE\s8\.0/.test(navigator.userAgent),
        j = {}
      i ? (h = document.createElement('custom')) : (j.enumerable = !0),
        (h.hasBeenReset = !1)
      var k = '',
        l = !1,
        m = a,
        n = b,
        o = f,
        p = null,
        q = '',
        r = !0,
        s = 'auto',
        t = 'start',
        u = 50,
        v = 'middle',
        w = 50,
        x = 'middle'
      return (
        Object.defineProperty(
          h,
          'id',
          e({}, j, {
            get: function () {
              return k
            },
            set: function (a) {
              k = '' + a
            },
          }),
        ),
        Object.defineProperty(
          h,
          'pauseOnExit',
          e({}, j, {
            get: function () {
              return l
            },
            set: function (a) {
              l = !!a
            },
          }),
        ),
        Object.defineProperty(
          h,
          'startTime',
          e({}, j, {
            get: function () {
              return m
            },
            set: function (a) {
              if ('number' != typeof a)
                throw new TypeError('Start time must be set to a number.')
              ;(m = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'endTime',
          e({}, j, {
            get: function () {
              return n
            },
            set: function (a) {
              if ('number' != typeof a)
                throw new TypeError('End time must be set to a number.')
              ;(n = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'text',
          e({}, j, {
            get: function () {
              return o
            },
            set: function (a) {
              ;(o = '' + a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'region',
          e({}, j, {
            get: function () {
              return p
            },
            set: function (a) {
              ;(p = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'vertical',
          e({}, j, {
            get: function () {
              return q
            },
            set: function (a) {
              var b = c(a)
              if (b === !1)
                throw new SyntaxError(
                  'An invalid or illegal string was specified.',
                )
              ;(q = b), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'snapToLines',
          e({}, j, {
            get: function () {
              return r
            },
            set: function (a) {
              ;(r = !!a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'line',
          e({}, j, {
            get: function () {
              return s
            },
            set: function (a) {
              if ('number' != typeof a && a !== g)
                throw new SyntaxError(
                  'An invalid number or illegal string was specified.',
                )
              ;(s = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'lineAlign',
          e({}, j, {
            get: function () {
              return t
            },
            set: function (a) {
              var b = d(a)
              if (!b)
                throw new SyntaxError(
                  'An invalid or illegal string was specified.',
                )
              ;(t = b), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'position',
          e({}, j, {
            get: function () {
              return u
            },
            set: function (a) {
              if (0 > a || a > 100)
                throw new Error('Position must be between 0 and 100.')
              ;(u = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'positionAlign',
          e({}, j, {
            get: function () {
              return v
            },
            set: function (a) {
              var b = d(a)
              if (!b)
                throw new SyntaxError(
                  'An invalid or illegal string was specified.',
                )
              ;(v = b), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'size',
          e({}, j, {
            get: function () {
              return w
            },
            set: function (a) {
              if (0 > a || a > 100)
                throw new Error('Size must be between 0 and 100.')
              ;(w = a), (this.hasBeenReset = !0)
            },
          }),
        ),
        Object.defineProperty(
          h,
          'align',
          e({}, j, {
            get: function () {
              return x
            },
            set: function (a) {
              var b = d(a)
              if (!b)
                throw new SyntaxError(
                  'An invalid or illegal string was specified.',
                )
              ;(x = b), (this.hasBeenReset = !0)
            },
          }),
        ),
        (h.displayState = void 0),
        i ? h : void 0
      )
    }
    var g = 'auto',
      h = { '': !0, lr: !0, rl: !0 },
      i = { start: !0, middle: !0, end: !0, left: !0, right: !0 }
    ;(f.prototype.getCueAsHTML = function () {
      return WebVTT.convertCueToDOMTree(window, this.text)
    }),
      (a.VTTCue = a.VTTCue || f),
      (b.VTTCue = f)
  })(this, this.vttjs || {}),
  (function (a, b) {
    function c(a) {
      if ('string' != typeof a) return !1
      var b = f[a.toLowerCase()]
      return b ? a.toLowerCase() : !1
    }
    function d(a) {
      return 'number' == typeof a && a >= 0 && 100 >= a
    }
    function e() {
      var a = 100,
        b = 3,
        e = 0,
        f = 100,
        g = 0,
        h = 100,
        i = ''
      Object.defineProperties(this, {
        width: {
          enumerable: !0,
          get: function () {
            return a
          },
          set: function (b) {
            if (!d(b)) throw new Error('Width must be between 0 and 100.')
            a = b
          },
        },
        lines: {
          enumerable: !0,
          get: function () {
            return b
          },
          set: function (a) {
            if ('number' != typeof a)
              throw new TypeError('Lines must be set to a number.')
            b = a
          },
        },
        regionAnchorY: {
          enumerable: !0,
          get: function () {
            return f
          },
          set: function (a) {
            if (!d(a))
              throw new Error('RegionAnchorX must be between 0 and 100.')
            f = a
          },
        },
        regionAnchorX: {
          enumerable: !0,
          get: function () {
            return e
          },
          set: function (a) {
            if (!d(a))
              throw new Error('RegionAnchorY must be between 0 and 100.')
            e = a
          },
        },
        viewportAnchorY: {
          enumerable: !0,
          get: function () {
            return h
          },
          set: function (a) {
            if (!d(a))
              throw new Error('ViewportAnchorY must be between 0 and 100.')
            h = a
          },
        },
        viewportAnchorX: {
          enumerable: !0,
          get: function () {
            return g
          },
          set: function (a) {
            if (!d(a))
              throw new Error('ViewportAnchorX must be between 0 and 100.')
            g = a
          },
        },
        scroll: {
          enumerable: !0,
          get: function () {
            return i
          },
          set: function (a) {
            var b = c(a)
            if (b === !1)
              throw new SyntaxError(
                'An invalid or illegal string was specified.',
              )
            i = b
          },
        },
      })
    }
    var f = { '': !0, up: !0 }
    ;(a.VTTRegion = a.VTTRegion || e), (b.VTTRegion = e)
  })(this, this.vttjs || {}),
  (function (a) {
    function b(a, b) {
      ;(this.name = 'ParsingError'),
        (this.code = a.code),
        (this.message = b || a.message)
    }
    function c(a) {
      function b(a, b, c, d) {
        return 3600 * (0 | a) + 60 * (0 | b) + (0 | c) + (0 | d) / 1e3
      }
      var c = a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/)
      return c
        ? c[3]
          ? b(c[1], c[2], c[3].replace(':', ''), c[4])
          : c[1] > 59
          ? b(c[1], c[2], 0, c[4])
          : b(0, c[1], c[2], c[4])
        : null
    }
    function d() {
      this.values = o(null)
    }
    function e(a, b, c, d) {
      var e = d ? a.split(d) : [a]
      for (var f in e)
        if ('string' == typeof e[f]) {
          var g = e[f].split(c)
          if (2 === g.length) {
            var h = g[0],
              i = g[1]
            b(h, i)
          }
        }
    }
    function f(a, f, g) {
      function h() {
        var d = c(a)
        if (null === d)
          throw new b(b.Errors.BadTimeStamp, 'Malformed timestamp: ' + k)
        return (a = a.replace(/^[^\sa-zA-Z-]+/, '')), d
      }
      function i(a, b) {
        var c = new d()
        e(
          a,
          function (a, b) {
            switch (a) {
              case 'region':
                for (var d = g.length - 1; d >= 0; d--)
                  if (g[d].id === b) {
                    c.set(a, g[d].region)
                    break
                  }
                break
              case 'vertical':
                c.alt(a, b, ['rl', 'lr'])
                break
              case 'line':
                var e = b.split(','),
                  f = e[0]
                c.integer(a, f),
                  c.percent(a, f) ? c.set('snapToLines', !1) : null,
                  c.alt(a, f, ['auto']),
                  2 === e.length &&
                    c.alt('lineAlign', e[1], ['start', 'middle', 'end'])
                break
              case 'position':
                ;(e = b.split(',')),
                  c.percent(a, e[0]),
                  2 === e.length &&
                    c.alt('positionAlign', e[1], ['start', 'middle', 'end'])
                break
              case 'size':
                c.percent(a, b)
                break
              case 'align':
                c.alt(a, b, ['start', 'middle', 'end', 'left', 'right'])
            }
          },
          /:/,
          /\s/,
        ),
          (b.region = c.get('region', null)),
          (b.vertical = c.get('vertical', '')),
          (b.line = c.get('line', 'auto')),
          (b.lineAlign = c.get('lineAlign', 'start')),
          (b.snapToLines = c.get('snapToLines', !0)),
          (b.size = c.get('size', 100)),
          (b.align = c.get('align', 'middle')),
          (b.position = c.get(
            'position',
            { start: 0, left: 0, middle: 50, end: 100, right: 100 },
            b.align,
          )),
          (b.positionAlign = c.get(
            'positionAlign',
            {
              start: 'start',
              left: 'start',
              middle: 'middle',
              end: 'end',
              right: 'end',
            },
            b.align,
          ))
      }
      function j() {
        a = a.replace(/^\s+/, '')
      }
      var k = a
      if ((j(), (f.startTime = h()), j(), '-->' !== a.substr(0, 3)))
        throw new b(
          b.Errors.BadTimeStamp,
          "Malformed time stamp (time stamps must be separated by '-->'): " + k,
        )
      ;(a = a.substr(3)), j(), (f.endTime = h()), j(), i(a, f)
    }
    function g(a, b) {
      function d() {
        function a(a) {
          return (b = b.substr(a.length)), a
        }
        if (!b) return null
        var c = b.match(/^([^<]*)(<[^>]+>?)?/)
        return a(c[1] ? c[1] : c[2])
      }
      function e(a) {
        return p[a]
      }
      function f(a) {
        for (; (o = a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/)); )
          a = a.replace(o[0], e)
        return a
      }
      function g(a, b) {
        return !s[b.localName] || s[b.localName] === a.localName
      }
      function h(b, c) {
        var d = q[b]
        if (!d) return null
        var e = a.document.createElement(d)
        e.localName = d
        var f = r[b]
        return f && c && (e[f] = c.trim()), e
      }
      for (
        var i, j = a.document.createElement('div'), k = j, l = [];
        null !== (i = d());

      )
        if ('<' !== i[0]) k.appendChild(a.document.createTextNode(f(i)))
        else {
          if ('/' === i[1]) {
            l.length &&
              l[l.length - 1] === i.substr(2).replace('>', '') &&
              (l.pop(), (k = k.parentNode))
            continue
          }
          var m,
            n = c(i.substr(1, i.length - 2))
          if (n) {
            ;(m = a.document.createProcessingInstruction('timestamp', n)),
              k.appendChild(m)
            continue
          }
          var o = i.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/)
          if (!o) continue
          if (((m = h(o[1], o[3])), !m)) continue
          if (!g(k, m)) continue
          o[2] && (m.className = o[2].substr(1).replace('.', ' ')),
            l.push(o[1]),
            k.appendChild(m),
            (k = m)
        }
      return j
    }
    function h(a) {
      function b(a, b) {
        for (var c = b.childNodes.length - 1; c >= 0; c--)
          a.push(b.childNodes[c])
      }
      function c(a) {
        if (!a || !a.length) return null
        var d = a.pop(),
          e = d.textContent || d.innerText
        if (e) {
          var f = e.match(/^.*(\n|\r)/)
          return f ? ((a.length = 0), f[0]) : e
        }
        return 'ruby' === d.tagName
          ? c(a)
          : d.childNodes
          ? (b(a, d), c(a))
          : void 0
      }
      var d,
        e = [],
        f = ''
      if (!a || !a.childNodes) return 'ltr'
      for (b(e, a); (f = c(e)); )
        for (var g = 0; g < f.length; g++) {
          d = f.charCodeAt(g)
          for (var h = 0; h < t.length; h++) if (t[h] === d) return 'rtl'
        }
      return 'ltr'
    }
    function i(a) {
      if (
        'number' == typeof a.line &&
        (a.snapToLines || (a.line >= 0 && a.line <= 100))
      )
        return a.line
      if (
        !a.track ||
        !a.track.textTrackList ||
        !a.track.textTrackList.mediaElement
      )
        return -1
      for (
        var b = a.track, c = b.textTrackList, d = 0, e = 0;
        e < c.length && c[e] !== b;
        e++
      )
        'showing' === c[e].mode && d++
      return -1 * ++d
    }
    function j() {}
    function k(a, b, c) {
      var d = /MSIE\s8\.0/.test(navigator.userAgent),
        e = 'rgba(255, 255, 255, 1)',
        f = 'rgba(0, 0, 0, 0.8)'
      d && ((e = 'rgb(255, 255, 255)'), (f = 'rgb(0, 0, 0)')),
        j.call(this),
        (this.cue = b),
        (this.cueDiv = g(a, b.text))
      var i = {
        color: e,
        backgroundColor: f,
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'inline',
      }
      d ||
        ((i.writingMode =
          '' === b.vertical
            ? 'horizontal-tb'
            : 'lr' === b.vertical
            ? 'vertical-lr'
            : 'vertical-rl'),
        (i.unicodeBidi = 'plaintext')),
        this.applyStyles(i, this.cueDiv),
        (this.div = a.document.createElement('div')),
        (i = {
          textAlign: 'middle' === b.align ? 'center' : b.align,
          font: c.font,
          whiteSpace: 'pre-line',
          position: 'absolute',
        }),
        d ||
          ((i.direction = h(this.cueDiv)),
          (i.writingMode =
            '' === b.vertical
              ? 'horizontal-tb'
              : 'lr' === b.vertical
              ? 'vertical-lr'
              : ('vertical-rl'.stylesunicodeBidi = 'plaintext'))),
        this.applyStyles(i),
        this.div.appendChild(this.cueDiv)
      var k = 0
      switch (b.positionAlign) {
        case 'start':
          k = b.position
          break
        case 'middle':
          k = b.position - b.size / 2
          break
        case 'end':
          k = b.position - b.size
      }
      this.applyStyles(
        '' === b.vertical
          ? {
              left: this.formatStyle(k, '%'),
              width: this.formatStyle(b.size, '%'),
            }
          : {
              top: this.formatStyle(k, '%'),
              height: this.formatStyle(b.size, '%'),
            },
      ),
        (this.move = function (a) {
          this.applyStyles({
            top: this.formatStyle(a.top, 'px'),
            bottom: this.formatStyle(a.bottom, 'px'),
            left: this.formatStyle(a.left, 'px'),
            right: this.formatStyle(a.right, 'px'),
            height: this.formatStyle(a.height, 'px'),
            width: this.formatStyle(a.width, 'px'),
          })
        })
    }
    function l(a) {
      var b,
        c,
        d,
        e,
        f = /MSIE\s8\.0/.test(navigator.userAgent)
      if (a.div) {
        ;(c = a.div.offsetHeight),
          (d = a.div.offsetWidth),
          (e = a.div.offsetTop)
        var g =
          (g = a.div.childNodes) &&
          (g = g[0]) &&
          g.getClientRects &&
          g.getClientRects()
        ;(a = a.div.getBoundingClientRect()),
          (b = g
            ? Math.max((g[0] && g[0].height) || 0, a.height / g.length)
            : 0)
      }
      ;(this.left = a.left),
        (this.right = a.right),
        (this.top = a.top || e),
        (this.height = a.height || c),
        (this.bottom = a.bottom || e + (a.height || c)),
        (this.width = a.width || d),
        (this.lineHeight = void 0 !== b ? b : a.lineHeight),
        f && !this.lineHeight && (this.lineHeight = 13)
    }
    function m(a, b, c, d) {
      function e(a, b) {
        for (var e, f = new l(a), g = 1, h = 0; h < b.length; h++) {
          for (
            ;
            a.overlapsOppositeAxis(c, b[h]) ||
            (a.within(c) && a.overlapsAny(d));

          )
            a.move(b[h])
          if (a.within(c)) return a
          var i = a.intersectPercentage(c)
          g > i && ((e = new l(a)), (g = i)), (a = new l(f))
        }
        return e || f
      }
      var f = new l(b),
        g = b.cue,
        h = i(g),
        j = []
      if (g.snapToLines) {
        var k
        switch (g.vertical) {
          case '':
            ;(j = ['+y', '-y']), (k = 'height')
            break
          case 'rl':
            ;(j = ['+x', '-x']), (k = 'width')
            break
          case 'lr':
            ;(j = ['-x', '+x']), (k = 'width')
        }
        var m = f.lineHeight,
          n = m * Math.round(h),
          o = c[k] + m,
          p = j[0]
        Math.abs(n) > o && ((n = 0 > n ? -1 : 1), (n *= Math.ceil(o / m) * m)),
          0 > h &&
            ((n += '' === g.vertical ? c.height : c.width), (j = j.reverse())),
          f.move(p, n)
      } else {
        var q = (f.lineHeight / c.height) * 100
        switch (g.lineAlign) {
          case 'middle':
            h -= q / 2
            break
          case 'end':
            h -= q
        }
        switch (g.vertical) {
          case '':
            b.applyStyles({ top: b.formatStyle(h, '%') })
            break
          case 'rl':
            b.applyStyles({ left: b.formatStyle(h, '%') })
            break
          case 'lr':
            b.applyStyles({ right: b.formatStyle(h, '%') })
        }
        ;(j = ['+y', '-x', '+x', '-y']), (f = new l(b))
      }
      var r = e(f, j)
      b.move(r.toCSSCompatValues(c))
    }
    function n() {}
    var o =
      Object.create ||
      (function () {
        function a() {}
        return function (b) {
          if (1 !== arguments.length)
            throw new Error('Object.create shim only accepts one parameter.')
          return (a.prototype = b), new a()
        }
      })()
    ;(b.prototype = o(Error.prototype)),
      (b.prototype.constructor = b),
      (b.Errors = {
        BadSignature: { code: 0, message: 'Malformed WebVTT signature.' },
        BadTimeStamp: { code: 1, message: 'Malformed time stamp.' },
      }),
      (d.prototype = {
        set: function (a, b) {
          this.get(a) || '' === b || (this.values[a] = b)
        },
        get: function (a, b, c) {
          return c
            ? this.has(a)
              ? this.values[a]
              : b[c]
            : this.has(a)
            ? this.values[a]
            : b
        },
        has: function (a) {
          return a in this.values
        },
        alt: function (a, b, c) {
          for (var d = 0; d < c.length; ++d)
            if (b === c[d]) {
              this.set(a, b)
              break
            }
        },
        integer: function (a, b) {
          ;/^-?\d+$/.test(b) && this.set(a, parseInt(b, 10))
        },
        percent: function (a, b) {
          var c
          return (c = b.match(/^([\d]{1,3})(\.[\d]*)?%$/)) &&
            ((b = parseFloat(b)), b >= 0 && 100 >= b)
            ? (this.set(a, b), !0)
            : !1
        },
      })
    var p = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&lrm;': '‎',
        '&rlm;': '‏',
        '&nbsp;': ' ',
      },
      q = {
        c: 'span',
        i: 'i',
        b: 'b',
        u: 'u',
        ruby: 'ruby',
        rt: 'rt',
        v: 'span',
        lang: 'span',
      },
      r = { v: 'title', lang: 'lang' },
      s = { rt: 'ruby' },
      t = [
        1470,
        1472,
        1475,
        1478,
        1488,
        1489,
        1490,
        1491,
        1492,
        1493,
        1494,
        1495,
        1496,
        1497,
        1498,
        1499,
        1500,
        1501,
        1502,
        1503,
        1504,
        1505,
        1506,
        1507,
        1508,
        1509,
        1510,
        1511,
        1512,
        1513,
        1514,
        1520,
        1521,
        1522,
        1523,
        1524,
        1544,
        1547,
        1549,
        1563,
        1566,
        1567,
        1568,
        1569,
        1570,
        1571,
        1572,
        1573,
        1574,
        1575,
        1576,
        1577,
        1578,
        1579,
        1580,
        1581,
        1582,
        1583,
        1584,
        1585,
        1586,
        1587,
        1588,
        1589,
        1590,
        1591,
        1592,
        1593,
        1594,
        1595,
        1596,
        1597,
        1598,
        1599,
        1600,
        1601,
        1602,
        1603,
        1604,
        1605,
        1606,
        1607,
        1608,
        1609,
        1610,
        1645,
        1646,
        1647,
        1649,
        1650,
        1651,
        1652,
        1653,
        1654,
        1655,
        1656,
        1657,
        1658,
        1659,
        1660,
        1661,
        1662,
        1663,
        1664,
        1665,
        1666,
        1667,
        1668,
        1669,
        1670,
        1671,
        1672,
        1673,
        1674,
        1675,
        1676,
        1677,
        1678,
        1679,
        1680,
        1681,
        1682,
        1683,
        1684,
        1685,
        1686,
        1687,
        1688,
        1689,
        1690,
        1691,
        1692,
        1693,
        1694,
        1695,
        1696,
        1697,
        1698,
        1699,
        1700,
        1701,
        1702,
        1703,
        1704,
        1705,
        1706,
        1707,
        1708,
        1709,
        1710,
        1711,
        1712,
        1713,
        1714,
        1715,
        1716,
        1717,
        1718,
        1719,
        1720,
        1721,
        1722,
        1723,
        1724,
        1725,
        1726,
        1727,
        1728,
        1729,
        1730,
        1731,
        1732,
        1733,
        1734,
        1735,
        1736,
        1737,
        1738,
        1739,
        1740,
        1741,
        1742,
        1743,
        1744,
        1745,
        1746,
        1747,
        1748,
        1749,
        1765,
        1766,
        1774,
        1775,
        1786,
        1787,
        1788,
        1789,
        1790,
        1791,
        1792,
        1793,
        1794,
        1795,
        1796,
        1797,
        1798,
        1799,
        1800,
        1801,
        1802,
        1803,
        1804,
        1805,
        1807,
        1808,
        1810,
        1811,
        1812,
        1813,
        1814,
        1815,
        1816,
        1817,
        1818,
        1819,
        1820,
        1821,
        1822,
        1823,
        1824,
        1825,
        1826,
        1827,
        1828,
        1829,
        1830,
        1831,
        1832,
        1833,
        1834,
        1835,
        1836,
        1837,
        1838,
        1839,
        1869,
        1870,
        1871,
        1872,
        1873,
        1874,
        1875,
        1876,
        1877,
        1878,
        1879,
        1880,
        1881,
        1882,
        1883,
        1884,
        1885,
        1886,
        1887,
        1888,
        1889,
        1890,
        1891,
        1892,
        1893,
        1894,
        1895,
        1896,
        1897,
        1898,
        1899,
        1900,
        1901,
        1902,
        1903,
        1904,
        1905,
        1906,
        1907,
        1908,
        1909,
        1910,
        1911,
        1912,
        1913,
        1914,
        1915,
        1916,
        1917,
        1918,
        1919,
        1920,
        1921,
        1922,
        1923,
        1924,
        1925,
        1926,
        1927,
        1928,
        1929,
        1930,
        1931,
        1932,
        1933,
        1934,
        1935,
        1936,
        1937,
        1938,
        1939,
        1940,
        1941,
        1942,
        1943,
        1944,
        1945,
        1946,
        1947,
        1948,
        1949,
        1950,
        1951,
        1952,
        1953,
        1954,
        1955,
        1956,
        1957,
        1969,
        1984,
        1985,
        1986,
        1987,
        1988,
        1989,
        1990,
        1991,
        1992,
        1993,
        1994,
        1995,
        1996,
        1997,
        1998,
        1999,
        2e3,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2036,
        2037,
        2042,
        2048,
        2049,
        2050,
        2051,
        2052,
        2053,
        2054,
        2055,
        2056,
        2057,
        2058,
        2059,
        2060,
        2061,
        2062,
        2063,
        2064,
        2065,
        2066,
        2067,
        2068,
        2069,
        2074,
        2084,
        2088,
        2096,
        2097,
        2098,
        2099,
        2100,
        2101,
        2102,
        2103,
        2104,
        2105,
        2106,
        2107,
        2108,
        2109,
        2110,
        2112,
        2113,
        2114,
        2115,
        2116,
        2117,
        2118,
        2119,
        2120,
        2121,
        2122,
        2123,
        2124,
        2125,
        2126,
        2127,
        2128,
        2129,
        2130,
        2131,
        2132,
        2133,
        2134,
        2135,
        2136,
        2142,
        2208,
        2210,
        2211,
        2212,
        2213,
        2214,
        2215,
        2216,
        2217,
        2218,
        2219,
        2220,
        8207,
        64285,
        64287,
        64288,
        64289,
        64290,
        64291,
        64292,
        64293,
        64294,
        64295,
        64296,
        64298,
        64299,
        64300,
        64301,
        64302,
        64303,
        64304,
        64305,
        64306,
        64307,
        64308,
        64309,
        64310,
        64312,
        64313,
        64314,
        64315,
        64316,
        64318,
        64320,
        64321,
        64323,
        64324,
        64326,
        64327,
        64328,
        64329,
        64330,
        64331,
        64332,
        64333,
        64334,
        64335,
        64336,
        64337,
        64338,
        64339,
        64340,
        64341,
        64342,
        64343,
        64344,
        64345,
        64346,
        64347,
        64348,
        64349,
        64350,
        64351,
        64352,
        64353,
        64354,
        64355,
        64356,
        64357,
        64358,
        64359,
        64360,
        64361,
        64362,
        64363,
        64364,
        64365,
        64366,
        64367,
        64368,
        64369,
        64370,
        64371,
        64372,
        64373,
        64374,
        64375,
        64376,
        64377,
        64378,
        64379,
        64380,
        64381,
        64382,
        64383,
        64384,
        64385,
        64386,
        64387,
        64388,
        64389,
        64390,
        64391,
        64392,
        64393,
        64394,
        64395,
        64396,
        64397,
        64398,
        64399,
        64400,
        64401,
        64402,
        64403,
        64404,
        64405,
        64406,
        64407,
        64408,
        64409,
        64410,
        64411,
        64412,
        64413,
        64414,
        64415,
        64416,
        64417,
        64418,
        64419,
        64420,
        64421,
        64422,
        64423,
        64424,
        64425,
        64426,
        64427,
        64428,
        64429,
        64430,
        64431,
        64432,
        64433,
        64434,
        64435,
        64436,
        64437,
        64438,
        64439,
        64440,
        64441,
        64442,
        64443,
        64444,
        64445,
        64446,
        64447,
        64448,
        64449,
        64467,
        64468,
        64469,
        64470,
        64471,
        64472,
        64473,
        64474,
        64475,
        64476,
        64477,
        64478,
        64479,
        64480,
        64481,
        64482,
        64483,
        64484,
        64485,
        64486,
        64487,
        64488,
        64489,
        64490,
        64491,
        64492,
        64493,
        64494,
        64495,
        64496,
        64497,
        64498,
        64499,
        64500,
        64501,
        64502,
        64503,
        64504,
        64505,
        64506,
        64507,
        64508,
        64509,
        64510,
        64511,
        64512,
        64513,
        64514,
        64515,
        64516,
        64517,
        64518,
        64519,
        64520,
        64521,
        64522,
        64523,
        64524,
        64525,
        64526,
        64527,
        64528,
        64529,
        64530,
        64531,
        64532,
        64533,
        64534,
        64535,
        64536,
        64537,
        64538,
        64539,
        64540,
        64541,
        64542,
        64543,
        64544,
        64545,
        64546,
        64547,
        64548,
        64549,
        64550,
        64551,
        64552,
        64553,
        64554,
        64555,
        64556,
        64557,
        64558,
        64559,
        64560,
        64561,
        64562,
        64563,
        64564,
        64565,
        64566,
        64567,
        64568,
        64569,
        64570,
        64571,
        64572,
        64573,
        64574,
        64575,
        64576,
        64577,
        64578,
        64579,
        64580,
        64581,
        64582,
        64583,
        64584,
        64585,
        64586,
        64587,
        64588,
        64589,
        64590,
        64591,
        64592,
        64593,
        64594,
        64595,
        64596,
        64597,
        64598,
        64599,
        64600,
        64601,
        64602,
        64603,
        64604,
        64605,
        64606,
        64607,
        64608,
        64609,
        64610,
        64611,
        64612,
        64613,
        64614,
        64615,
        64616,
        64617,
        64618,
        64619,
        64620,
        64621,
        64622,
        64623,
        64624,
        64625,
        64626,
        64627,
        64628,
        64629,
        64630,
        64631,
        64632,
        64633,
        64634,
        64635,
        64636,
        64637,
        64638,
        64639,
        64640,
        64641,
        64642,
        64643,
        64644,
        64645,
        64646,
        64647,
        64648,
        64649,
        64650,
        64651,
        64652,
        64653,
        64654,
        64655,
        64656,
        64657,
        64658,
        64659,
        64660,
        64661,
        64662,
        64663,
        64664,
        64665,
        64666,
        64667,
        64668,
        64669,
        64670,
        64671,
        64672,
        64673,
        64674,
        64675,
        64676,
        64677,
        64678,
        64679,
        64680,
        64681,
        64682,
        64683,
        64684,
        64685,
        64686,
        64687,
        64688,
        64689,
        64690,
        64691,
        64692,
        64693,
        64694,
        64695,
        64696,
        64697,
        64698,
        64699,
        64700,
        64701,
        64702,
        64703,
        64704,
        64705,
        64706,
        64707,
        64708,
        64709,
        64710,
        64711,
        64712,
        64713,
        64714,
        64715,
        64716,
        64717,
        64718,
        64719,
        64720,
        64721,
        64722,
        64723,
        64724,
        64725,
        64726,
        64727,
        64728,
        64729,
        64730,
        64731,
        64732,
        64733,
        64734,
        64735,
        64736,
        64737,
        64738,
        64739,
        64740,
        64741,
        64742,
        64743,
        64744,
        64745,
        64746,
        64747,
        64748,
        64749,
        64750,
        64751,
        64752,
        64753,
        64754,
        64755,
        64756,
        64757,
        64758,
        64759,
        64760,
        64761,
        64762,
        64763,
        64764,
        64765,
        64766,
        64767,
        64768,
        64769,
        64770,
        64771,
        64772,
        64773,
        64774,
        64775,
        64776,
        64777,
        64778,
        64779,
        64780,
        64781,
        64782,
        64783,
        64784,
        64785,
        64786,
        64787,
        64788,
        64789,
        64790,
        64791,
        64792,
        64793,
        64794,
        64795,
        64796,
        64797,
        64798,
        64799,
        64800,
        64801,
        64802,
        64803,
        64804,
        64805,
        64806,
        64807,
        64808,
        64809,
        64810,
        64811,
        64812,
        64813,
        64814,
        64815,
        64816,
        64817,
        64818,
        64819,
        64820,
        64821,
        64822,
        64823,
        64824,
        64825,
        64826,
        64827,
        64828,
        64829,
        64848,
        64849,
        64850,
        64851,
        64852,
        64853,
        64854,
        64855,
        64856,
        64857,
        64858,
        64859,
        64860,
        64861,
        64862,
        64863,
        64864,
        64865,
        64866,
        64867,
        64868,
        64869,
        64870,
        64871,
        64872,
        64873,
        64874,
        64875,
        64876,
        64877,
        64878,
        64879,
        64880,
        64881,
        64882,
        64883,
        64884,
        64885,
        64886,
        64887,
        64888,
        64889,
        64890,
        64891,
        64892,
        64893,
        64894,
        64895,
        64896,
        64897,
        64898,
        64899,
        64900,
        64901,
        64902,
        64903,
        64904,
        64905,
        64906,
        64907,
        64908,
        64909,
        64910,
        64911,
        64914,
        64915,
        64916,
        64917,
        64918,
        64919,
        64920,
        64921,
        64922,
        64923,
        64924,
        64925,
        64926,
        64927,
        64928,
        64929,
        64930,
        64931,
        64932,
        64933,
        64934,
        64935,
        64936,
        64937,
        64938,
        64939,
        64940,
        64941,
        64942,
        64943,
        64944,
        64945,
        64946,
        64947,
        64948,
        64949,
        64950,
        64951,
        64952,
        64953,
        64954,
        64955,
        64956,
        64957,
        64958,
        64959,
        64960,
        64961,
        64962,
        64963,
        64964,
        64965,
        64966,
        64967,
        65008,
        65009,
        65010,
        65011,
        65012,
        65013,
        65014,
        65015,
        65016,
        65017,
        65018,
        65019,
        65020,
        65136,
        65137,
        65138,
        65139,
        65140,
        65142,
        65143,
        65144,
        65145,
        65146,
        65147,
        65148,
        65149,
        65150,
        65151,
        65152,
        65153,
        65154,
        65155,
        65156,
        65157,
        65158,
        65159,
        65160,
        65161,
        65162,
        65163,
        65164,
        65165,
        65166,
        65167,
        65168,
        65169,
        65170,
        65171,
        65172,
        65173,
        65174,
        65175,
        65176,
        65177,
        65178,
        65179,
        65180,
        65181,
        65182,
        65183,
        65184,
        65185,
        65186,
        65187,
        65188,
        65189,
        65190,
        65191,
        65192,
        65193,
        65194,
        65195,
        65196,
        65197,
        65198,
        65199,
        65200,
        65201,
        65202,
        65203,
        65204,
        65205,
        65206,
        65207,
        65208,
        65209,
        65210,
        65211,
        65212,
        65213,
        65214,
        65215,
        65216,
        65217,
        65218,
        65219,
        65220,
        65221,
        65222,
        65223,
        65224,
        65225,
        65226,
        65227,
        65228,
        65229,
        65230,
        65231,
        65232,
        65233,
        65234,
        65235,
        65236,
        65237,
        65238,
        65239,
        65240,
        65241,
        65242,
        65243,
        65244,
        65245,
        65246,
        65247,
        65248,
        65249,
        65250,
        65251,
        65252,
        65253,
        65254,
        65255,
        65256,
        65257,
        65258,
        65259,
        65260,
        65261,
        65262,
        65263,
        65264,
        65265,
        65266,
        65267,
        65268,
        65269,
        65270,
        65271,
        65272,
        65273,
        65274,
        65275,
        65276,
        67584,
        67585,
        67586,
        67587,
        67588,
        67589,
        67592,
        67594,
        67595,
        67596,
        67597,
        67598,
        67599,
        67600,
        67601,
        67602,
        67603,
        67604,
        67605,
        67606,
        67607,
        67608,
        67609,
        67610,
        67611,
        67612,
        67613,
        67614,
        67615,
        67616,
        67617,
        67618,
        67619,
        67620,
        67621,
        67622,
        67623,
        67624,
        67625,
        67626,
        67627,
        67628,
        67629,
        67630,
        67631,
        67632,
        67633,
        67634,
        67635,
        67636,
        67637,
        67639,
        67640,
        67644,
        67647,
        67648,
        67649,
        67650,
        67651,
        67652,
        67653,
        67654,
        67655,
        67656,
        67657,
        67658,
        67659,
        67660,
        67661,
        67662,
        67663,
        67664,
        67665,
        67666,
        67667,
        67668,
        67669,
        67671,
        67672,
        67673,
        67674,
        67675,
        67676,
        67677,
        67678,
        67679,
        67840,
        67841,
        67842,
        67843,
        67844,
        67845,
        67846,
        67847,
        67848,
        67849,
        67850,
        67851,
        67852,
        67853,
        67854,
        67855,
        67856,
        67857,
        67858,
        67859,
        67860,
        67861,
        67862,
        67863,
        67864,
        67865,
        67866,
        67867,
        67872,
        67873,
        67874,
        67875,
        67876,
        67877,
        67878,
        67879,
        67880,
        67881,
        67882,
        67883,
        67884,
        67885,
        67886,
        67887,
        67888,
        67889,
        67890,
        67891,
        67892,
        67893,
        67894,
        67895,
        67896,
        67897,
        67903,
        67968,
        67969,
        67970,
        67971,
        67972,
        67973,
        67974,
        67975,
        67976,
        67977,
        67978,
        67979,
        67980,
        67981,
        67982,
        67983,
        67984,
        67985,
        67986,
        67987,
        67988,
        67989,
        67990,
        67991,
        67992,
        67993,
        67994,
        67995,
        67996,
        67997,
        67998,
        67999,
        68e3,
        68001,
        68002,
        68003,
        68004,
        68005,
        68006,
        68007,
        68008,
        68009,
        68010,
        68011,
        68012,
        68013,
        68014,
        68015,
        68016,
        68017,
        68018,
        68019,
        68020,
        68021,
        68022,
        68023,
        68030,
        68031,
        68096,
        68112,
        68113,
        68114,
        68115,
        68117,
        68118,
        68119,
        68121,
        68122,
        68123,
        68124,
        68125,
        68126,
        68127,
        68128,
        68129,
        68130,
        68131,
        68132,
        68133,
        68134,
        68135,
        68136,
        68137,
        68138,
        68139,
        68140,
        68141,
        68142,
        68143,
        68144,
        68145,
        68146,
        68147,
        68160,
        68161,
        68162,
        68163,
        68164,
        68165,
        68166,
        68167,
        68176,
        68177,
        68178,
        68179,
        68180,
        68181,
        68182,
        68183,
        68184,
        68192,
        68193,
        68194,
        68195,
        68196,
        68197,
        68198,
        68199,
        68200,
        68201,
        68202,
        68203,
        68204,
        68205,
        68206,
        68207,
        68208,
        68209,
        68210,
        68211,
        68212,
        68213,
        68214,
        68215,
        68216,
        68217,
        68218,
        68219,
        68220,
        68221,
        68222,
        68223,
        68352,
        68353,
        68354,
        68355,
        68356,
        68357,
        68358,
        68359,
        68360,
        68361,
        68362,
        68363,
        68364,
        68365,
        68366,
        68367,
        68368,
        68369,
        68370,
        68371,
        68372,
        68373,
        68374,
        68375,
        68376,
        68377,
        68378,
        68379,
        68380,
        68381,
        68382,
        68383,
        68384,
        68385,
        68386,
        68387,
        68388,
        68389,
        68390,
        68391,
        68392,
        68393,
        68394,
        68395,
        68396,
        68397,
        68398,
        68399,
        68400,
        68401,
        68402,
        68403,
        68404,
        68405,
        68416,
        68417,
        68418,
        68419,
        68420,
        68421,
        68422,
        68423,
        68424,
        68425,
        68426,
        68427,
        68428,
        68429,
        68430,
        68431,
        68432,
        68433,
        68434,
        68435,
        68436,
        68437,
        68440,
        68441,
        68442,
        68443,
        68444,
        68445,
        68446,
        68447,
        68448,
        68449,
        68450,
        68451,
        68452,
        68453,
        68454,
        68455,
        68456,
        68457,
        68458,
        68459,
        68460,
        68461,
        68462,
        68463,
        68464,
        68465,
        68466,
        68472,
        68473,
        68474,
        68475,
        68476,
        68477,
        68478,
        68479,
        68608,
        68609,
        68610,
        68611,
        68612,
        68613,
        68614,
        68615,
        68616,
        68617,
        68618,
        68619,
        68620,
        68621,
        68622,
        68623,
        68624,
        68625,
        68626,
        68627,
        68628,
        68629,
        68630,
        68631,
        68632,
        68633,
        68634,
        68635,
        68636,
        68637,
        68638,
        68639,
        68640,
        68641,
        68642,
        68643,
        68644,
        68645,
        68646,
        68647,
        68648,
        68649,
        68650,
        68651,
        68652,
        68653,
        68654,
        68655,
        68656,
        68657,
        68658,
        68659,
        68660,
        68661,
        68662,
        68663,
        68664,
        68665,
        68666,
        68667,
        68668,
        68669,
        68670,
        68671,
        68672,
        68673,
        68674,
        68675,
        68676,
        68677,
        68678,
        68679,
        68680,
        126464,
        126465,
        126466,
        126467,
        126469,
        126470,
        126471,
        126472,
        126473,
        126474,
        126475,
        126476,
        126477,
        126478,
        126479,
        126480,
        126481,
        126482,
        126483,
        126484,
        126485,
        126486,
        126487,
        126488,
        126489,
        126490,
        126491,
        126492,
        126493,
        126494,
        126495,
        126497,
        126498,
        126500,
        126503,
        126505,
        126506,
        126507,
        126508,
        126509,
        126510,
        126511,
        126512,
        126513,
        126514,
        126516,
        126517,
        126518,
        126519,
        126521,
        126523,
        126530,
        126535,
        126537,
        126539,
        126541,
        126542,
        126543,
        126545,
        126546,
        126548,
        126551,
        126553,
        126555,
        126557,
        126559,
        126561,
        126562,
        126564,
        126567,
        126568,
        126569,
        126570,
        126572,
        126573,
        126574,
        126575,
        126576,
        126577,
        126578,
        126580,
        126581,
        126582,
        126583,
        126585,
        126586,
        126587,
        126588,
        126590,
        126592,
        126593,
        126594,
        126595,
        126596,
        126597,
        126598,
        126599,
        126600,
        126601,
        126603,
        126604,
        126605,
        126606,
        126607,
        126608,
        126609,
        126610,
        126611,
        126612,
        126613,
        126614,
        126615,
        126616,
        126617,
        126618,
        126619,
        126625,
        126626,
        126627,
        126629,
        126630,
        126631,
        126632,
        126633,
        126635,
        126636,
        126637,
        126638,
        126639,
        126640,
        126641,
        126642,
        126643,
        126644,
        126645,
        126646,
        126647,
        126648,
        126649,
        126650,
        126651,
        1114109,
      ]
    ;(j.prototype.applyStyles = function (a, b) {
      b = b || this.div
      for (var c in a) a.hasOwnProperty(c) && (b.style[c] = a[c])
    }),
      (j.prototype.formatStyle = function (a, b) {
        return 0 === a ? 0 : a + b
      }),
      (k.prototype = o(j.prototype)),
      (k.prototype.constructor = k),
      (l.prototype.move = function (a, b) {
        switch (((b = void 0 !== b ? b : this.lineHeight), a)) {
          case '+x':
            ;(this.left += b), (this.right += b)
            break
          case '-x':
            ;(this.left -= b), (this.right -= b)
            break
          case '+y':
            ;(this.top += b), (this.bottom += b)
            break
          case '-y':
            ;(this.top -= b), (this.bottom -= b)
        }
      }),
      (l.prototype.overlaps = function (a) {
        return (
          this.left < a.right &&
          this.right > a.left &&
          this.top < a.bottom &&
          this.bottom > a.top
        )
      }),
      (l.prototype.overlapsAny = function (a) {
        for (var b = 0; b < a.length; b++) if (this.overlaps(a[b])) return !0
        return !1
      }),
      (l.prototype.within = function (a) {
        return (
          this.top >= a.top &&
          this.bottom <= a.bottom &&
          this.left >= a.left &&
          this.right <= a.right
        )
      }),
      (l.prototype.overlapsOppositeAxis = function (a, b) {
        switch (b) {
          case '+x':
            return this.left < a.left
          case '-x':
            return this.right > a.right
          case '+y':
            return this.top < a.top
          case '-y':
            return this.bottom > a.bottom
        }
      }),
      (l.prototype.intersectPercentage = function (a) {
        var b = Math.max(
            0,
            Math.min(this.right, a.right) - Math.max(this.left, a.left),
          ),
          c = Math.max(
            0,
            Math.min(this.bottom, a.bottom) - Math.max(this.top, a.top),
          ),
          d = b * c
        return d / (this.height * this.width)
      }),
      (l.prototype.toCSSCompatValues = function (a) {
        return {
          top: this.top - a.top,
          bottom: a.bottom - this.bottom,
          left: this.left - a.left,
          right: a.right - this.right,
          height: this.height,
          width: this.width,
        }
      }),
      (l.getSimpleBoxPosition = function (a) {
        var b = a.div ? a.div.offsetHeight : a.tagName ? a.offsetHeight : 0,
          c = a.div ? a.div.offsetWidth : a.tagName ? a.offsetWidth : 0,
          d = a.div ? a.div.offsetTop : a.tagName ? a.offsetTop : 0
        a = a.div
          ? a.div.getBoundingClientRect()
          : a.tagName
          ? a.getBoundingClientRect()
          : a
        var e = {
          left: a.left,
          right: a.right,
          top: a.top || d,
          height: a.height || b,
          bottom: a.bottom || d + (a.height || b),
          width: a.width || c,
        }
        return e
      }),
      (n.StringDecoder = function () {
        return {
          decode: function (a) {
            if (!a) return ''
            if ('string' != typeof a)
              throw new Error('Error - expected string data.')
            return decodeURIComponent(encodeURIComponent(a))
          },
        }
      }),
      (n.convertCueToDOMTree = function (a, b) {
        return a && b ? g(a, b) : null
      })
    var u = 0.05,
      v = 'sans-serif',
      w = '1.5%'
    ;(n.processCues = function (a, b, c) {
      function d(a) {
        for (var b = 0; b < a.length; b++)
          if (a[b].hasBeenReset || !a[b].displayState) return !0
        return !1
      }
      if (!a || !b || !c) return null
      for (; c.firstChild; ) c.removeChild(c.firstChild)
      var e = a.document.createElement('div')
      if (
        ((e.style.position = 'absolute'),
        (e.style.left = '0'),
        (e.style.right = '0'),
        (e.style.top = '0'),
        (e.style.bottom = '0'),
        (e.style.margin = w),
        c.appendChild(e),
        d(b))
      ) {
        var f = [],
          g = l.getSimpleBoxPosition(e),
          h = Math.round(g.height * u * 100) / 100,
          i = { font: h + 'px ' + v }
        !(function () {
          for (var c, d, h = 0; h < b.length; h++)
            (d = b[h]),
              (c = new k(a, d, i)),
              e.appendChild(c.div),
              m(a, c, g, f),
              (d.displayState = c.div),
              f.push(l.getSimpleBoxPosition(c))
        })()
      } else for (var j = 0; j < b.length; j++) e.appendChild(b[j].displayState)
    }),
      (n.Parser = function (a, b, c) {
        c || ((c = b), (b = {})),
          b || (b = {}),
          (this.window = a),
          (this.vttjs = b),
          (this.state = 'INITIAL'),
          (this.buffer = ''),
          (this.decoder = c || new TextDecoder('utf8')),
          (this.regionList = [])
      }),
      (n.Parser.prototype = {
        reportOrThrowError: function (a) {
          if (!(a instanceof b)) throw a
          this.onparsingerror && this.onparsingerror(a)
        },
        parse: function (a) {
          function c() {
            for (
              var a = i.buffer, b = 0;
              b < a.length && '\r' !== a[b] && '\n' !== a[b];

            )
              ++b
            var c = a.substr(0, b)
            return (
              '\r' === a[b] && ++b,
              '\n' === a[b] && ++b,
              (i.buffer = a.substr(b)),
              c
            )
          }
          function g(a) {
            var b = new d()
            if (
              (e(
                a,
                function (a, c) {
                  switch (a) {
                    case 'id':
                      b.set(a, c)
                      break
                    case 'width':
                      b.percent(a, c)
                      break
                    case 'lines':
                      b.integer(a, c)
                      break
                    case 'regionanchor':
                    case 'viewportanchor':
                      var e = c.split(',')
                      if (2 !== e.length) break
                      var f = new d()
                      if (
                        (f.percent('x', e[0]),
                        f.percent('y', e[1]),
                        !f.has('x') || !f.has('y'))
                      )
                        break
                      b.set(a + 'X', f.get('x')), b.set(a + 'Y', f.get('y'))
                      break
                    case 'scroll':
                      b.alt(a, c, ['up'])
                  }
                },
                /=/,
                /\s/,
              ),
              b.has('id'))
            ) {
              var c = new (i.vttjs.VTTRegion || i.window.VTTRegion)()
              ;(c.width = b.get('width', 100)),
                (c.lines = b.get('lines', 3)),
                (c.regionAnchorX = b.get('regionanchorX', 0)),
                (c.regionAnchorY = b.get('regionanchorY', 100)),
                (c.viewportAnchorX = b.get('viewportanchorX', 0)),
                (c.viewportAnchorY = b.get('viewportanchorY', 100)),
                (c.scroll = b.get('scroll', '')),
                i.onregion && i.onregion(c),
                i.regionList.push({ id: b.get('id'), region: c })
            }
          }
          function h(a) {
            e(
              a,
              function (a, b) {
                switch (a) {
                  case 'Region':
                    g(b)
                }
              },
              /:/,
            )
          }
          var i = this
          a && (i.buffer += i.decoder.decode(a, { stream: !0 }))
          try {
            var j
            if ('INITIAL' === i.state) {
              if (!/\r\n|\n/.test(i.buffer)) return this
              j = c()
              var k = j.match(/^WEBVTT([ \t].*)?$/)
              if (!k || !k[0]) throw new b(b.Errors.BadSignature)
              i.state = 'HEADER'
            }
            for (var l = !1; i.buffer; ) {
              if (!/\r\n|\n/.test(i.buffer)) return this
              switch ((l ? (l = !1) : (j = c()), i.state)) {
                case 'HEADER':
                  ;/:/.test(j) ? h(j) : j || (i.state = 'ID')
                  continue
                case 'NOTE':
                  j || (i.state = 'ID')
                  continue
                case 'ID':
                  if (/^NOTE($|[ \t])/.test(j)) {
                    i.state = 'NOTE'
                    break
                  }
                  if (!j) continue
                  if (
                    ((i.cue = new (i.vttjs.VTTCue || i.window.VTTCue)(
                      0,
                      0,
                      '',
                    )),
                    (i.state = 'CUE'),
                    -1 === j.indexOf('-->'))
                  ) {
                    i.cue.id = j
                    continue
                  }
                case 'CUE':
                  try {
                    f(j, i.cue, i.regionList)
                  } catch (m) {
                    i.reportOrThrowError(m),
                      (i.cue = null),
                      (i.state = 'BADCUE')
                    continue
                  }
                  i.state = 'CUETEXT'
                  continue
                case 'CUETEXT':
                  var n = -1 !== j.indexOf('-->')
                  if (!j || (n && (l = !0))) {
                    i.oncue && i.oncue(i.cue), (i.cue = null), (i.state = 'ID')
                    continue
                  }
                  i.cue.text && (i.cue.text += '\n'), (i.cue.text += j)
                  continue
                case 'BADCUE':
                  j || (i.state = 'ID')
                  continue
              }
            }
          } catch (m) {
            i.reportOrThrowError(m),
              'CUETEXT' === i.state && i.cue && i.oncue && i.oncue(i.cue),
              (i.cue = null),
              (i.state = 'INITIAL' === i.state ? 'BADWEBVTT' : 'BADCUE')
          }
          return this
        },
        flush: function () {
          var a = this
          try {
            if (
              ((a.buffer += a.decoder.decode()),
              (a.cue || 'HEADER' === a.state) &&
                ((a.buffer += '\n\n'), a.parse()),
              'INITIAL' === a.state)
            )
              throw new b(b.Errors.BadSignature)
          } catch (c) {
            a.reportOrThrowError(c)
          }
          return a.onflush && a.onflush(), this
        },
      }),
      (a.WebVTT = n)
  })(this, this.vttjs || {})
!(function (a, t, e, n, m) {
  ;(m = t.location),
    Math.random() > 0.01 ||
      (a.src =
        '//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-2&utmn=1&utmhn=' +
        n(m.hostname) +
        '&utmsr=' +
        t.screen.availWidth +
        'x' +
        t.screen.availHeight +
        '&utmul=' +
        (e.language || e.userLanguage || '').toLowerCase() +
        '&utmr=' +
        n(m.href) +
        '&utmp=' +
        n(m.hostname + m.pathname) +
        '&utmcc=__utma%3D1.' +
        Math.floor(1e10 * Math.random()) +
        '.1.1.1.1%3B' +
        '&utme=8(vjsv)9(v4.12.15)')
})(new Image(), window, navigator, encodeURIComponent)
// end video js

$(window).on('load', function () {})

$(window).on('load', function () {
  // start slide main
  if ($('.showSlideMain').length) {
    $('.showSlideMain').slick({
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      fade: false,
      swipeToSlide: true,
      prevArrow: btnLeftSlideType1,
      nextArrow: btnRightSlideType1,
      lazyLoad: 'progressive',
      useTransform: false,
    })
  }
  // end start slide main

  // slide flat design

  if ($('.showSlideDesign').length) {
    $('.showSlideDesign').slick({
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      useTransform: false,
      slidesToShow: 4,
      swipeToSlide: true,
      prevArrow: btnLeftSlideType1,
      nextArrow: btnRightSlideType1,
      lazyLoad: 'progressive',
      arrows: true,
      dots: false,
      useTransform: false,
      responsive: [
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    })
  }

  // end slide flat design

  // slide gallery image

  if ($('.showSlideGallMobile').length) {
    $('.showSlideGallMobile').slick({
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      useTransform: false,
      slidesToShow: 2,
      swipeToSlide: true,
      prevArrow: btnLeftSlideType1,
      nextArrow: btnRightSlideType1,
      lazyLoad: 'progressive',
      arrows: true,
      dots: false,
      useTransform: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    })
  }

  // end slide gallery image

  // slide testimonal
  if ($('.slideTestimonial').length) {
    $('.slideTestimonial').slick({
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      useTransform: false,
      slidesToShow: 2,
      swipeToSlide: true,
      lazyLoad: 'progressive',
      arrows: false,
      dots: true,
      useTransform: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    })
  }
  // end slide testimonal

  $('.listImgServices').lightGallery({
    showThumbByDefault: true,
    download: false,
    fullScreen: true,
    zoom: false,
    scale: false,
    autoplayControls: false,
    videojs: false,
    share: false,
    counter: false,
    getCaptionFromTitleOrAlt: false,
    thumbnail: false,
    controls: true,
  })

  //wraplightGallery
  $('.wraplightGallery').lightGallery({
    showThumbByDefault: true,
    download: false,
    fullScreen: true,
    zoom: false,
    scale: false,
    autoplayControls: false,
    videojs: false,
    share: false,
    counter: false,
    getCaptionFromTitleOrAlt: false,
    thumbnail: false,
    controls: true,
  })
  // end wraplightGallery
})
