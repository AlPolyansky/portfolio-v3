// =========== Preloader module ===========

var preloaderModule = (function() {

    var base = new BaseModule();

var _addLoader = function () {

    var imgs = [];

    $.each($('*'), function () {
        var
            $this = $(this),
            background = $this.css('background-image'),
            img = $this.is('img');

        if (background != 'none') {
            var path = background.replace('url("', '').replace('")', '');
            imgs.push(path);
        }

        if (img) {
            var path = $this.attr('src');

            if (path) {
                imgs.push(path);
            }
        }
    });
    
    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {
        var image = $('<img>', {
            attr: {
                src: imgs[i]
            }
        });

        image.on({
            load : function () {
                setPercents(imgs.length, percentsTotal);
                percentsTotal++;
            },

            error : function () {
                percentsTotal++;
            }
        });
    }

    function setPercents(total, current) {
        var percent = Math.ceil(current / total * 100);
        $("body").addClass("no-scroll");
        if (percent >= 100) {
            $('.preloader').addClass("preloader--showOut");
            $("body").removeClass("no-scroll");
        }

        $('.preloader__percents').text(percent + '%');
    }
};
    


    return {
        init: function () {
            _addLoader();
        }
    }
})();