(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });

  // Magnific popup calls
  // $('.popup-gallery').magnificPopup({
  //   delegate: 'a',
  //   type: 'image',
  //   tLoading: 'Loading image #%curr%...',
  //   mainClass: 'mfp-img-mobile',
  //   gallery: {
  //     enabled: true,
  //     navigateByImgClick: true,
  //     preload: [0, 1]
  //   },
  //   image: {
  //     tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  //   }
  // });
  

var data = [
  {
    username:"Osulloc", 
    // Key "username" means that Magnific Popup will look for an element with class "mfp-username" in markup and will replace its inner HTML with the value.
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/01_osulloc', // Key "userWebsite_href" means that Magnific Popup will look fo`r an element with class "mfp-userWebsite" and will change its "href" attribute. Instead of ending "href" you may put any other attribute.
    userAvatarUrl_img: 'img/portfolio/fullsize/1.jpg', 
      // Prefix "_img" is special. With it Magnific Popup finds an  element "userAvatarUrl" and replaces it completely with image tag.
    explan:'2016년도 오설록 홈페이지를 photoshop과 illust를 사용하여 리뉴얼 디자인하고 html, css, j-query를 사용하여 제작하였습니다.<br />기업형 페이지로 제작하여 메인이 되는 페이지와 서브페이지 2장으로 구성되어 있습니다.<br />' 
  },
  {
    username:"hanssem",
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/02_hanssem',
    userAvatarUrl_img:'img/portfolio/fullsize/2.jpg',
    explan:'한샘닷컴의 홈페이지를 저만의 코드로 구현하여 제작하였습니다.<br />기업형 페이지로 제작하여 메인이 되는 페이지와 서브페이지 2장으로 구성되어 있습니다.'

  },
  {
    // username:"vans",
    // userWebsite_href: 'http://yamyamtomato.dothome.co.kr/03_vans',
    // userAvatarUrl_img:'img/portfolio/fullsize/3.jpg',
    // explan:'반스 홈페이지를 photoshop과 illust를 사용하여 리뉴얼 디자인하고 html, css, j-qeury를 사용하여 제작하였습니다.<br />원페이지로 구성된 사이트로 반응형이 가능한 사이트로 제작하였습니다.'
    username:"vans",
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/03_vans',
    userAvatarUrl_img:'img/portfolio/fullsize/3.jpg',
    explan:'사이트 업데이트 중 입니다.' 
  },
  {
    username:"freitag",
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/04_freitag',
    userAvatarUrl_img:'img/portfolio/fullsize/4.jpg',
    explan: '프라이탁의 홈페이지를 저만의 코드로 구현하여 제작하였습니다.<br />원페이지로 구성된 사이트로 반응형이 가능한 사이트로 900px과 699px의 화면에 맞는 layout으로 제작하였습니다. '
  },
  {
    username:"FransHals Museum",
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/05_franshalsmuseum',
    userAvatarUrl_img:'img/portfolio/fullsize/5.jpg',
    explan:'"FransHals Museum" 홈페이지를 저만의 코드로 구현하여 제작하였습니다.<br />원페이지로 구성된 사이트로 콘텐츠 부분을 좌우로 나눠 각각의 컨텐츠 내용을 확인 할 수 있습니다.'
  },
  {
    username: "Administrator Page / Basic Form UI & UI Elements",
    userWebsite_href: 'http://yamyamtomato.dothome.co.kr/06_admin',
    userAvatarUrl_img:'img/portfolio/fullsize/6.jpg',
    explan:'사이트의 통일성과 작업 속도 향상을 위해 정확한 가이드 클래스를 모듈화하여 폼, 버튼, 레이아웃 서식 등을 제작하여 관리가 용이하도록 만들어 두었습니다.'
  }
];

// initalize popup
$('.popup-gallery').magnificPopup({ 
  key: 'my-popup', 
  items: data,
  type: 'inline',
//  type: 'image',
  mainClass: 'mfp-img-mobile',
  inline: {
    // Define markup. Class names should match key names.
    markup: '<div class="white-popup"><div class="mfp-close"></div>'+
              '<a class="mfp-userWebsite">'+
                '<h2 class="mfp-username"></h2>'+
                '<div class="mfp-userAvatarUrl"></div>'+
                '<p class="">사이트 바로가기</p>'+
              '</a>'+
              '<div class="mfp-explan"></div>'+
            '</div>'
  },
  gallery: {
    enabled: true,
    navigateByImgClick: true,
//    preload:[0,1]
  },
  callbacks: {
    markupParse: function(template, values, item) {
 
      // optionally apply your own logic - modify "template" element based on data in "values"
      console.log(template, values, item);
    }
  }
});


// 구글지도
// var map = new naver.maps.Map('map');
//       var myaddress = '합정동';// 도로명 주소나 지번 주소만 가능 (건물명 불가!!!!)
//       naver.maps.Service.geocode({address: myaddress}, function(status, response) {
//           if (status !== naver.maps.Service.Status.OK) {
//               // return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
//           }
//           var result = response.result;
//           // 검색 결과 갯수: result.total
//           // 첫번째 결과 결과 주소: result.items[0].address
//           // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
//           var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
//           map.setCenter(myaddr); // 검색된 좌표로 지도 이동
//           // 마커 표시
//           var marker = new naver.maps.Marker({
//             position: myaddr,
//             map: map
//           });
//           // 마커 클릭 이벤트 처리
//           naver.maps.Event.addListener(marker, "click", function(e) {
//             if (infowindow.getMap()) {
//                 infowindow.close();
//             } else {
//                 infowindow.open(map, marker);
//             }
//           });
//           // 마크 클릭시 인포윈도우 오픈
//           var infowindow = new naver.maps.InfoWindow({
//               content: '<h4> [네이버 개발자센터]</h4><a href="https://developers.naver.com" target="_blank"><img src="https://developers.naver.com/inc/devcenter/images/nd_img.png"></a>'
//           });
//       });



   window.onload = function(){
    var mymap = document.getElementById('map');   
    var latlng = new google.maps.LatLng(37.549233, 126.913377);
    var gmap = new google.maps.Map(
        mymap, {
        zoom: 17,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // ICON pointer
    var marker = new google.maps.Marker({
        position: latlng,
        map: gmap,
        title:'마포구'
    });
        google.maps.event.addListener(marker, 'click', function(event){
            alert('저는 마포구에 거주하고 있습니다.');
        });

    };



})(jQuery); // End of use strict
