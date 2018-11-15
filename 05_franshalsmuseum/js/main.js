'use Script';
$(document).ready(function(){
    // clock script start
    $(function(){
	// Cache some selectors
        var clock = $('#clock'),
            ampm = clock.find('.ampm');
        // Map digits to their names (this will be an array)
        var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');
        // This object will hold the digit elements
        var digits = {};
        // Positions for the hours, minutes, and seconds
        var positions = [
            'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
        ];
        // Generate the digits with the needed markup,
        // and add them to the clock
        var digit_holder = clock.find('.digits');
        $.each(positions, function(){
            if(this == ':'){
                digit_holder.append('<div class="dots">');
            }
            else{
                var pos = $('<div>');
                for(var i=1; i<8; i++){
                    pos.append('<span class="d' + i + '">');
                }
                // Set the digits as key:value pairs in the digits object
                digits[this] = pos;

                // Add the digit elements to the page
                digit_holder.append(pos);
            }
        });
        // Add the weekday names

        var weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' '),
            weekday_holder = clock.find('.weekdays');
        $.each(weekday_names, function(){
            weekday_holder.append('<span>' + this + '</span>');
        });
        var weekdays = clock.find('.weekdays span');
        // Run a timer every second and update the clock
        (function update_time(){
            // Use moment.js to output the current time as a string
            // hh is for the hours in 12-hour format,
            // mm - minutes, ss-seconds (all with leading zeroes),
            // d is for day of week and A is for AM/PM
            var now = moment().format("hhmmssdA");

            digits.h1.attr('class', digit_to_name[now[0]]);
            digits.h2.attr('class', digit_to_name[now[1]]);
            digits.m1.attr('class', digit_to_name[now[2]]);
            digits.m2.attr('class', digit_to_name[now[3]]);
            digits.s1.attr('class', digit_to_name[now[4]]);
            digits.s2.attr('class', digit_to_name[now[5]]);

            // The library returns Sunday as the first day of the week.
            // Stupid, I know. Lets shift all the days one position down, 
            // and make Sunday last
            var dow = now[6];
            dow--;
            // Sunday!
            if(dow < 0){
                // Make it last
                dow = 6;
            }
            // Set the am/pm text:
            ampm.text(now[7]+now[8]);
            // Schedule this function to be run again in 1 sec
            setTimeout(update_time, 1000);
        })();
    });

$('.main-carousel').flickity();


//
//    var flkty = new Flickity( '.main-carousel', {
//      // options
//        revNextButtons: false,
//        pageDots: false,
//        contain:true,
//    }); 

    var scrollTop = 0;
    var offsetTop = 0;
    var windowHeight = 0;
    var page_container = 0;
    var elementHeight = 0;
    var startShow = 0;
    var footerTop = 0;
    var changeTop1 = 0;
    var changeTop2 = 0;
    
   $(window).scroll(function(){
       
    scrollTop = $(document).scrollTop(); //html문서에서의 높이
    windowScrollTop = $(window).scrollTop(); //화면에서의 높이
    offsetTop = $('.main_wrap').offset().top; //메인랩(fix를 감싸고 있는 부모)의 높이값
    windowHeight = $(window).height();
    startFix = $('.section_exhibition').offset().top;
    newTop = $('.section_new').offset().top;
    instaTop = $('.section_instagram').offset().top;
    endFix = $('footer').offset().top - windowHeight;
    page_container = $('.section_exhibition').offset().top;
       
    changeTop1 = (newTop - (windowHeight / 2));
    changeTop2 = (instaTop - (windowHeight / 2));
    
    /* 이미지 고정부분 */
    if (scrollTop <= startFix) {
        $('.spilit_artpieces').removeClass('fix');
//        console.log('none');
    } else if (scrollTop >= endFix) {
        $('.spilit_artpieces').removeClass('fix').addClass('bottom');
//        console.log('bottom');
    } else {
        $('.spilit_artpieces').removeClass('bottom').addClass('fix');
//        console.log('fix');
    }
    /* 이미지 전환 부분 */
    if(scrollTop < changeTop1){
        console.log('page1');
        $('.spilit_artpieces .image_top div').removeClass('new instagram');
        $('.spilit_artpieces .image_bottom div').removeClass('new instagram');
        $('gnb a').removeClass('new instagram exhibition');
    } else if (scrollTop >= changeTop1 && scrollTop <= changeTop2) {
        console.log('page2');
        $('.spilit_artpieces .image_top div').addClass('new').removeClass('instagram');
        $('.spilit_artpieces .image_bottom div').addClass('new').removeClass('instagram');
        $('gnb a').addClass('new').removeClass('instagram exhibition');
    } else if (scrollTop > changeTop2) {
        $('.spilit_artpieces .image_top div').addClass('instagram').removeClass('new');
        $('.spilit_artpieces .image_bottom div').addClass('instagram').removeClass('new');
        $('gnb a').addClass('instagram').removeClass('new exhibition');
        console.log('page3');
    }
}); //스크롤 픽스 끝 

    
    
    
    
    
    
    
    
    
    
});