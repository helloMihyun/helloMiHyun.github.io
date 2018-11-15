$(document).ready(function(){ 	
    $("span.menu_button").on('click',function(){
        $('header nav').toggleClass('on');
        $('header .newsletter').toggleClass('on');
    });
    $(".close").on('click',function(){
        $('header nav').toggleClass('on');
    });
    
    //네비게이션 원뎁스
//    $(".menu_nav h3").on('click',function(){
//        $('.menu_nav ul li').toggleClass('on');
//    });
//GNB (PC)
    $('.menu_nav>li').click(function(e) {
        e.preventDefault(e);
//        $(this).children().find('li').toggleClass('open');
        $(this).children().addClass('open').rmoveClass('up');
        $(this).children().addClass('up').rmoveClass('open');
        console.log(this.children);
    });
    var myScroll;
    window.onload = function() {
      myScroll = new IScroll('.menu', { 
        
        mouseWheel: true,
        scrollbars: true
      });
    }
    //메인비주얼의 Slider
/*    setMainUI('#main-visual');
    function setMainUI (selector) {
        var numSlide = $(selector).find('.slider a').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 5000;
        var startX = 0;
        var startY = 0;
        var delX = 0;
        var delY = 0;
        var offsetX = 0;

        showSlide(1);

//        $(selector).find('ul.indicator li a').on('click', function() {
//            var index = $(selector).find('ul.indicator li').index($(this).parent());
//            showSlide(index + 1);
//        });
        function showSlide(n) {
            clearTimeout(timerId);
            if (slideNow === 0) {
                $(selector).find('.slider a:eq(' + (n - 1) + ')').addClass('show');
            } else {
                var boxWidth = $(window).width();
                $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').find('p.bg').css({'width': boxWidth + 'px'});
                $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').removeClass('show').addClass('hide').one('transitionend', function() {
                    $(this).removeClass('hide');
                    $(this).find('p.bg').css({'width': '100%'});
                });
                $(selector).find('ul.slide li:eq(' + (n - 1) + ')').removeClass('hide').addClass('show');
            }
            $(selector).find('ul.indicator li').removeClass('on');
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').find('span.bar span').stop().css({'width': 0}).animate({'width': '100%'}, timerSpeed);
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : n + 1;
            slidePrev = (n - 1) < 1 ? numSlide : n - 1;
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }


    setMobileMainUI('#main-visual-mobile');
    function setMobileMainUI (selector) {
        var numSlide = $(selector).find('ul.slide li').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 5000;
        var startX = 0;
        var startY = 0;
        var delX = 0;
        var delY = 0;
        var offsetX = 0;
        var isDrag = false;

        showSlide(1);

        $(selector).find('ul.indicator li a').on('click', function() {
            var index = $(selector).find('ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });

        // mobile swipe
        $(selector).find('ul.slide').on('touchstart', function(e) {
            isDrag = true;
            $(selector).find('ul.slide').css({'transition': 'none'});
            clearTimeout(timerId);
            $(selector).find('ul.indicator li span.bar span').stop(true).css({'width': 0});
            startX = e.originalEvent.touches[0].clientX;
            startY = e.originalEvent.touches[0].clientY;
            offsetX = $(selector).find('ul.slide').position().left;
            //console.log(startX + ' / ' + startY);
        });
        $(document).on('touchmove', function(e) {
            if (isDrag === false) return false;
            delX = e.originalEvent.touches[0].clientX - startX;
            delY = e.originalEvent.touches[0].clientY - startY;
            if ((delX < 0 && slideNow === numSlide) || (delX > 0 && slideNow === 1)) {
                delX = delX / 5;
            }
            $(selector).find('ul.slide').css({'left': (offsetX + delX) + 'px'});
        });
        $(document).on('touchend', function() {
            if (delX < -50 && slideNow !== numSlide) {
                showSlide(slideNext);
            } else if (delX > 50 && slideNow !== 1) {
                showSlide(slidePrev);
            } else {
                showSlide(slideNow);
            }
            isDrag = false;
        });

        function showSlide(n) {
            clearTimeout(timerId);
            if (slideNow === 0) {
                $(selector).find('ul.slide li').each(function(i) {
                    $(this).css({'left': (i * 100) + '%', 'display': 'block'});
                });
                $(selector).find('ul.slide').css({'left': (-(n - 1) * 100) + '%'});
            } else {
                $(selector).find('ul.slide').css({'transition': 'left 0.5s ease 0s', 'left': (-(n - 1) * 100) + '%'});
            }
            $(selector).find('ul.slide li').removeClass('show');
            $(selector).find('ul.slide li:eq(' + (n - 1) + ')').addClass('show');
            $(selector).find('ul.indicator li').removeClass('on');
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : n + 1;
            slidePrev = (n - 1) < 1 ? numSlide : n - 1;
            timerId = setTimeout(function() {showSlide(slideNext)}, timerSpeed);
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ') span.bar span').stop(true).css({'width': 0}).animate({'width': '100%'}, timerSpeed);
        }
    }  */ 
    
    
    
    
    
    var slickSlide = $('.main_visual > .slickSlide');
	$(slickSlide).slick({ 
		autoplay: true, 
		autoplaySpeed:2500,
		speed: 500,
	}); 
    
    //하단 storiesfrom feitag
    $('.story_wrap').css("width","100%");
    $('.stories > ul > li').css("width","24.3816%");
    $('.responsive').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        dots: false,
        infinite: false,
  	responsive: [
    {
		breakpoint: 900,
        settings: {
        	slidesToShow: 2,
        	slidesToScroll: 2,
            autoplay: true,
      }
    },
    {
		breakpoint: 699,
			settings: {
        	slidesToShow: 1,
        	slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
	]	
	});
    
});








