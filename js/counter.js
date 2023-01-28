(function($) {
    $.fn.counter = function(settings) { 
        var settings = $.extend({
            type: 'numeric', // 'numeric', 'bar', 'both'
            duration: 1500,
            suffix: '',
            shapeClass: '.counter-shape',
            numberClass: '.counter-number'
        }, settings);

        function numeric(elem, child) {
            elem = (child) ? elem.find(child) : elem;

            $({origin: elem.text()}).animate({origin: targetNum}, {
                duration: settings.duration,
                easing: 'swing',
                step: function() {   
                    elem.text(Math.floor(this.origin) + settings.suffix);
                },
                complete: function() {
                    elem.text(this.origin + settings.suffix);
                }        
            });
        }

        function bar(elem, child) {
            elem = (child) ? elem.find(child) : elem;
        
            elem.css({'display': 'inline-block'}).animate({width: `${targetNum}%`}, {
                duration: settings.duration,
                easing: 'swing',
            });
        }
         
        $(this).each(function() {
            var elem = $(this);
            var visibleTop = elem.offset().top - $(window).height();
            var visibleBottom = elem.offset().top + elem.height();

            if($(window).scrollTop() > visibleTop && $(window).scrollTop() < visibleBottom && !elem.data('counter-complete')) {
                targetNum = elem.data('counter');

                if(settings.type == 'numeric')
                    numeric(elem);
                else if(settings.type == 'bar')
                    bar(elem);
                else if(settings.type == 'both') {
                    if(!$(elem).find(settings.shapeClass).length)
                        $(elem).append(`<div class="${settings.shapeClass.split('.').join('')}"></div>`);

                    if(!$(elem).find(settings.numberClass).length)
                        $(elem).append(`<div class="${settings.numberClass.split('.').join('')}"></div>`);                          

                    numeric(elem, settings.numberClass);
                    bar(elem, settings.shapeClass);
                }
                
                elem.data('counter-complete', 'true');
            } 
        });
    }; 
}(jQuery));