	$(document).ready(function() {
		$(".main_visual").bxSlider({
			auto: true, 
			speed: 500, 
			pause: 3000, 
			mode:"horizontal", 
			autoControls: true,
			pager:false,
			autoControlsCombine: true
		});

		$( '.prev' ).on( 'click', function () {
			mySlider.goToNextSlide();  //이전 슬라이드 배너로 이동
			return false;              //<a>에 링크 차단
		} );
		$( '.next' ).on( 'click', function () {
			mySlider.goToPrevSlide();  //다음 슬라이드 배너로 이동
			return false;              //<a>에 링크 차단
		} );

		$(".slider").bxSlider({
			pager:false, auto:true
		});
        
        
        
        /*토글*/
        
           // memu 클래스 바로 하위에 있는 a 태그를 클릭했을때
        $(".gnbmenu").on('click', function(){
            
            $(this).next().toggleClass('open');
//            if($('.menu_list').next().hasClass('open')){
//                $(this).css({'display:':'none','heihgt':0});
//            }
        });
        
        
        
 	}); /*  ready end*/
    
    
     
 

		