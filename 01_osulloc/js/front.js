$(function(){

//	alert('g');
    // 메인비쥬얼 슬라이드
    $('.bxslider').bxSlider({
        mode:'fade', //default : 'horizontal', options: 'horizontal', 'vertical', 'fade'
        speed:1500, //default:500 이미지변환 속도
        auto: true, //default:false 자동 시작
        captions: true, // 이미지의 title 속성이 노출된다.
        pause: 8000,
        pager : false,
    });
    
    
    
    $('.weeklybest-con').bxSlider({
        controls : true,
        maxSlides : 4,
        slideWidth :200,
        moveSlides :1,
        slideMargin : 50,
        pager : false,
        speed:2000, //default:500 이미지변환 속도
        auto: true, //default:false 자동 시작
        captions: true,
    });
    
    
    $(function(){
        $('#menu').mouseenter(function(){
            $('#menu-wrap').stop().slideDown();
        });
        $('#menu').mouseleave(function(){
            $('#menu-wrap').stop().slideUp();
        });

    });
    
    /* 콘텐츠02 슬라이더 */
         
     $('#contents02wrap').bxSlider({
        mode:'fade', //default : 'horizontal', options: 'horizontal', 'vertical', 'fade'
        speed:500, //default:500 이미지변환 속도
        auto: true, //default:false 자동 시작
        //            captions: true, // 이미지의 title 속성이 노출된다.
        controls : false,
        slideWidth :960,
        //            autoHover :true,
        //            autoDelay:50,
        pager : true,
        pause: 8000,

    });
    
	 
	 /*   */
    
    
    
    
    
    
});
//메뉴 호버했을때 보더 보텀 색변화
/*$(function(){
   $('.menulist-a').on('mouseover',function(){
        $('.menulist-a').css({'border-bottom':'2px solid #dfd'});
    }).on('mouseout',function(){
        $('.menulist-a').css({'border-bottom':'none'});
   });
*/

/*

  */  


/*
//contents01 슬라이드
$(document).ready(function(){	
    $("#weeklybest").sudoSlider({ 
        
        auto:true
    });
});

*/




















