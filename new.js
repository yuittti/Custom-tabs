'use strict';

(function($) {

    var $daysTabs = $('.prog-day-tab'),
        $days = $daysTabs.find('a'),
        $daysScenes = $('.prog-scenes-tabs'),
        $scenes = $daysScenes.find('a'),
        $progContent = $('.prog-content');

    $days.on('click', function(ev){
        ev.preventDefault();

        var choosedDay = $(this).data('day'),
            choosedScene = '',
            choosedContent = '';

        var curW = getWidth();

        if (curW <= 768) {
            $('.prog-days-tabs').toggleClass('-opened');
        }

        $daysTabs.removeClass('-active');
        $(this).closest('.prog-day-tab').addClass('-active');

        choosedScene = findDayScene(choosedDay);
        $daysScenes.removeClass('-active');
        if($(choosedScene).length) {
            $(choosedScene).addClass('-active');
        }

        choosedContent = findDayContent(choosedDay);
        $progContent.removeClass('-active');
        if($(choosedContent).length) {
            $(choosedContent).addClass('-active');
        }

    });

    $scenes.on('click', function(ev) {
        ev.preventDefault();
        var choosedScene = $(this).data('scene'),
            choosedDay = $(this).closest('.prog-scenes-tabs').data('day-scenes');
        var curW = getWidth();
        if (curW <= 768) {
            
            if ($(this).closest('.prog-scenes-tabs').hasClass('-opened')) {
                $(this).closest('.prog-scenes-tabs').removeClass('-opened');
            } else {
                $(this).closest('.prog-scenes-tabs').addClass('-opened');
            }
        }

        $(this).closest('.prog-scenes-tabs').find('.prog-scene-tab').removeClass('-active');
        $(this).closest('.prog-scene-tab').addClass('-active');

        $('.prog-content[data-day='+ choosedDay +']').find('.prog-day-scene-list').removeClass('-active');
        $('.prog-content[data-day='+ choosedDay +']').find('.prog-day-scene-list[data-scene='+ choosedScene +']').addClass('-active');
    });

    $('.prog-more').on('click', function(ev){
        $(this).closest('.prog-right').find('.prog-r-bottom').fadeToggle(200);
        $(this).toggleClass('-active');
    });

    function findDayScene(dataDay) {
        var res = [].filter.call($daysScenes, function(el, i) {
            var dataScene = $(el).data('day-scenes');
            return dataScene && dataScene == dataDay;
        });
        return res[0];
    };

    function findDayContent(dataDay) {
        var res = [].filter.call($progContent, function(el, i) {
            var dataContent = $(el).data('day');
            return dataContent && dataContent == dataDay;
        });
        return res[0];
    };

    function getWidth() {
        if (self.innerHeight) {
            return self.innerWidth;
        }

        if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }

        if (document.body) {
            return document.body.clientWidth;
        }
    };

})(jQuery);

(function($){
    $(document).ready(function(){
        var bodyPosition = 0;
        $('#videoGal').slick({
        slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: '<i class="fa fa-angle-double-right video-next"></i>',
            prevArrow: '<i class="fa fa-angle-double-left video-prev"></i>',
            variableWidth: false,
            centerMode: false,
            focusOnSelect: true,
            asNavFor: '#videoNavGal'
        });

        $('#videoNavGal').slick({
            //slidesToShow: smSlides,
            slidesToScroll: 1,
            asNavFor: '#videoGal',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            arrows: false
        });

        $('#videoGal').on('click', '.slick-slide', function(ev){
            ev.preventDefault();
            bodyPosition = $('body').scrollTop();
            var vId = $(this).data('video'),
                vIframeHtm = '<iframe src="https://www.youtube.com/embed/' + vId + '" frameborder="0" allowfullscreen></iframe>';
            $('#imgModal .modal-wrapper .video-content').html(vIframeHtm);

            $('body').addClass('modal-opened');
        
        });

        $('#whitePage, #imgModal .close-btn').on('click', function(ev){
            $('#imgModal .modal-wrapper .video-content').html('');
            $('body').removeClass('modal-opened');
            $('body').scrollTop(bodyPosition);
        });
    });
})(jQuery);