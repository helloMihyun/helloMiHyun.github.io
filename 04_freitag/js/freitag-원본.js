$(document).ready(function(){ 	
	var bxSlide = $('.main_visual > .bxslider');
	var storiesSlider = $(".stories > .bxslider");
	var target = storiesSlider.children;
	var mql01 = window.matchMedia("screen and (max-width: 900px)");
	var mql02 = window.matchMedia("screen and (max-width: 699px)");
//메인비주얼의 bxSlider
	$(bxSlide).bxSlider({ 
		auto: true, 
		speed: 400, 
		pause: 3500, 
		mode:'horizontal', 
		autoControls: false, 
		pager:false,
		useCSS:false,
	}); 	
//		bxSlide.reloadSlider();
	//하단의 bxSlider
	if (mql01.matches) {
//		var target = $("bx-slider .target");
//		$(target).css("width","49.5%");
//		console.log(target);
		storiesSlider.bxSlider({ 
		/*
		auto: true, 
		speed: 100, 
		pause: 1000, 
		mode:'horizontal', 
		autoControls: false, 
		pager:false,
		useCSS:false,
		maxSlides:2,
		*/
		auto: true,pager:false, 
		minSlides: 2,
		maxSlides: 2,
		slideWidth: 360,
		sliderMargin: 0,
		sliderPadding: 0,
		autoControls: false,
	}); 	
		
//		console.log(target);
		console.log("화면의 너비가 900px 일때 li가 두개로 보여지며 슬라이드됩니다.");
	}if(mql02.matches){
		storiesSlider.bxSlider({  
			minSlides: 1,
			maxSlides: 1,
//			slideWidth: 0,
			sliderMargin: 0,
			sliderPadding: 0,
			autoControls: false,
			}); 	
	};
	
	
	
	
	
}); 

//else {
//		console.log("900이상일때 슬라이드 되지 않습니다.");
//	}
//$(document).ready(function(){ 
//	$('slider').resize(); 	
//});
//$( window ).resize(function() {
//  $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
//});

/*
$(document).ready(function(){ 
	var slider_img = $(".slider" > a > img);
	
	console.log("slider_img");
	
//	
//    $(slider_img).css('width', $(window).width()); 
//    $(slider_img).css('height', $(window).height()); 
//    $(window).resize(function() { 
//        $(slider_img).css('width', $(window).width()); 
//        $(slider_img).css('height', $(window).height()); 
//    }); 
});
*/


/*선생님*/
$(document).ready(function(){ 	
	var bxSlide = $('.main_visual > .bxslider');
	var storiesSlider = $(".stories > .bxslider");

	
//메인비주얼의 bxSlider
	$(bxSlide).bxSlider({ 
		auto: true, 
		speed: 400, 
		pause: 3500, 
		mode:'horizontal', 
		autoControls: false, 
		pager:false,
		useCSS:false,
	}); 
	//마이슬라이더라는 변수에 스토리.bxslider를 선언
	var myslide = $(storiesSlider).bxSlider({ 
		auto: true,
		speed:100,
		pager:false, 
		minSlides: 2,
		maxSlides: 2,
		slideWidth: 360,
		sliderMargin: 0,
		sliderPadding: 0,
		autoControls: false,
	});
	
//메인비주얼의 bxSlider 끝
//반응형
//	var m = matchMedia("screen and (max-width: 900px) and (min-width: 700px)");
//	var m2 = matchMedia("screen and (max-width: 699px)");
	
	//변수 클라이언트위드는 윈도우의 위드사이즈를 받아온다.
	var clientWidth = $(window).width();
	판단하기(clientWidth);
	
	//윈도우에서 이사이즈라는 이벤트가 일어날때 판단하기변수를 실행한다.
	window.addEventListener("reszie", function(){
		clientWidth = $(window).width();
		판단하기(clientWidth);
	})
	
	function 판단하기 (clientWidth) { 
		// 1023 이상일때 원하는 옵션으로 bxslider리로드
		if (clientWidth > 1023) {
			myslide.reloadSlider({
				auto: false,
				speed:100,
				pager:false, 
				minSlides: 2,
				maxSlides: 2,
				slideWidth: 360,
				sliderMargin: 0,
				sliderPadding: 0,
				autoControls: false,		
			});
		  // 679 ~ 1023 일때 원하는 옵션으로 bxslider리로드	
		} else if ( 900 < clientWidth > 700) {
			myslide.reloadSlider({
				auto: true,
				speed:100,
				pager:false, 
				minSlides: 2,
				maxSlides: 2,
				slideWidth: 360,
				sliderMargin: 0,
				sliderPadding: 0,
				autoControls: false,
			});
		}
	}
	

	
}); 
/*선생님*/



/*내가*/
$(document).ready(function(){ 	
	var bxSlide = $('.main_visual > .bxslider');
	var storiesSlider = $(".stories > .bxslider");
	var target = storiesSlider.children;
	var mql01 = window.matchMedia("screen and (max-width: 900px)");
	var mql02 = window.matchMedia("screen and (max-width: 699px)");
//메인비주얼의 bxSlider
	$(bxSlide).bxSlider({ 
		auto: true, 
		speed: 400, 
		pause: 3500, 
		mode:'horizontal', 
		autoControls: false, 
		pager:false,
		useCSS:false,
	}); 
//메인비주얼의 bxSlider 끝
//반응형
	var m = matchMedia("screen and (max-width: 900px) and (min-width: 700px)");
	var m2 = matchMedia("screen and (max-width: 699px)");
	m.media // -> "screen and (min-width: 1024px)"
	m.matches // -> true
	console.log(m);
	if (m.matches) {
		$(storiesSlider).bxSlider({ 
			auto: true,
			speed:100,
			pager:false, 
			minSlides: 2,
			maxSlides: 2,
			slideWidth: 360,
			sliderMargin: 0,
			sliderPadding: 0,
			autoControls: false,
		});
		console.log("hi");
	  // 1024px 이상에서 사용할 JavaScript
	} else {
		$(storiesSlider).bxSlider({ 
			auto: true,
			speed:100,
			pager:false, 
			minSlides: 1,
			maxSlides: 1,
			
			autoControls: false,
		});
	};
	  // 1024px 미만에서 사용할 JavaScript
	
//반응형 끝
}); 
/*내가*/






