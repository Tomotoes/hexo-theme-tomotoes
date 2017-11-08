jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }
});

(function ($) {
    $.fn.bumpyText = function (options) {
        var defaults = {
            bounceHeight: '1.3em',
            bounceUpDuration: 500,
            bounceDownDuration: 700,
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var obj = $(this);
            if (obj.text() !== obj.html()) {
                return
            };
            var text = obj.text();
            var newMarkup = '';
            for (var i = 0; i <= text.length; i++) {
                var character = text.slice(i, i + 1);
                newMarkup += ($.trim(character)) ? '<span class="bumpy-char">' + character + '</span>' : character
            }
            obj.html(newMarkup);
            obj.find('span.bumpy-char').each(function () {
                $(this).mouseover(function () {
                    $(this).animate({
                        bottom: options.bounceHeight
                    }, {
                        queue: false,
                        duration: options.bounceUpDuration,
                        easing: 'easeOutCubic',
                        complete: function () {
                            $(this).animate({
                                bottom: 0
                            }, {
                                queue: false,
                                duration: options.bounceDownDuration,
                                easing: 'easeOutBounce'
                            })
                        }
                    })
                })
            })
        })
    }
})(jQuery);
