//하단 storiesfrom feitag
$(document).ready(function () {
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










