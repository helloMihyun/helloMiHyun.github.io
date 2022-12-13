$(document).ready(function(){
  //  ====  //
      
      // $('.gnb_menu_wrap').removeClass('active');
      $('#openGnbBtn').on('click',function(){
          $('.gnb_menu_wrap').fadeIn();
          $('.gnb_menu_wrap').addClass('active');
          $('body').addClass('bodyfix');
      });
      $('.close_menu_btn').on('click',function(){
          $('.gnb_menu_wrap').fadeOut();
          $('.gnb_menu_wrap').removeClass('active');
          $('body').removeClass('bodyfix');
      });
      
      
  //  ====  //
  
  //  ====  //
  
  function scroll_top(){
      $('body').append('<button class="topScroll">�곷떒�쇰줈</button>');
      var scrollBtn = $(".topScroll");
      scrollBtn.hide();
  
          this.init = function(){
              this.scrollBtn = ".topScroll",
              this.speed = 400;
              this.initEvent();
          };
          this.initEvent = function(){
              var objThis = this;
              $(window).scroll(function(){
                  var sc = $(window).scrollTop();
                  if(sc >= 100){
                      $(objThis.scrollBtn).stop().fadeIn();
                  }else{
                      $(objThis.scrollBtn).stop().fadeOut();
                  }
              });
              $(this.scrollBtn).on("click", function(){
                  console.log('o');
                  $(window).scrollTop(0);
                  // $("body").stop().animate({
                  //      windowTop : 0
                  // },objThis.speed);
              });
          };
          this.init();
      }
      scroll_top();
  
  //  ====  //
  });