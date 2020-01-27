/**
 * Simple Tab jQuery Plugin by Shannen Pio
 * With some help: https://css-tricks.com
 * On: 9 June 2012
 * https://www.linkedin.com/pulse/shannenpio-cloning-shannenpio-cloning
 */

(function($) {

    $.fn.simpleTab = function(settings) {

        settings = jQuery.extend({
            active: 1,
            fx: null,
            showSpeed: 400,
            hideSpeed: 400,
            showEasing: null,
            hideEasing: null,
            show: function() {},
            hide: function() {},
            change: function() {}
        }, settings);

        return this.each(function() {

            var $t = $(this),
                $tabContent = $t.children('[data-tab]'),
                visible = settings.active - 1;

            $t.addClass('simpleTab').prepend('<ul class="tab-wrapper"></ul>');

            $tabContent.addClass('tab-content').each(function() {
                $(this).hide();
                $t.find('.tab-wrapper').append('<li><a href="#">' + $(this).data('tab') + '</a></li>');
            }).eq(visible).show();

            $t.find('.tab-wrapper a').on("click", function() {
                var target = $(this).parent().index();
                $(this).closest('.tab-wrapper').find('.activeTab').removeClass('activeTab');
                $(this).addClass('activeTab');
                if (settings.fx == "slide") {
                    if ($tabContent.eq(target).is(':hidden')) {
                        $tabContent.slideUp(settings.hideSpeed, settings.hideEasing, function() {
                            settings.hide.call($t);
                        }).eq(target).slideDown(settings.showSpeed, settings.showEasing, function() {
                            settings.show.call($t);
                        });
                    }
                } else if (settings.fx == "fade") {
                    if ($tabContent.eq(target).is(':hidden')) {
                        $tabContent.hide().eq(target).fadeIn(settings.showSpeed, settings.showEasing, function() {
                            settings.show.call($t);
                        });
                    }
                } else if (settings.fx == "fancyslide") {
                    if ($tabContent.eq(target).is(':hidden')) {
                        $tabContent.slideUp(settings.hideSpeed, settings.hideEasing, function() {
                            settings.hide.call($t);
                        }).eq(target).delay(settings.hideSpeed).slideDown(settings.showSpeed, settings.showEasing, function() {
                            settings.show.call($t);
                        });
                    }
                } else {
                    if ($tabContent.eq(target).is(':hidden')) {
                        $tabContent.hide().eq(target).show();
                    }
                }
                settings.change.call($t);
                return false;
            }).eq(visible).addClass('activeTab');

        });

    };

})(jQuery);
