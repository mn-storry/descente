var ui = {
	/*
	* comment  : reset
	*/
	window: {
		$this: $(window),
		height: null,
		scrollTop: null
	},
	document: {
		$this: $(document),
		height: null,
	},
	$header: null,
	init: function() {
		this.fxEventWindow();
		//this.fxHeader();
		this.fxCheckAll();
		this.fxSlide();
		this.fxpageTop();
		this.fxoutOff();
		this.fxCopyUrl();
	},
	/**
     * comment  : �덈룄�� �대깽��
     * param    :
     * @author  :
     * @date    :
     */
	 fxEventWindow: function() {
		$(function() {
				ui.$body = $('body');
				ui.$topBanner = $('.top-banner');
				ui.$header = $('header');
				ui.$headerTop = $('.header-top');
				ui.$wrap = $('.wrap');
				ui.$footer = $('footer');
				ui.$quickMenu = $('.quick-menu');
		});
		ui.window.$this.on({
				'load': function() {
						ui.window.scrollTop = ui.window.$this.scrollTop();
						ui.window.height = ui.window.$this.height();
						ui.document.height = ui.document.$this.height();
						ui.$topBanner.height = ui.$topBanner.outerHeight();
						ui.$header.height = ui.$header.outerHeight();
						ui.$wrap.height = ui.$wrap.outerHeight();
						ui.$footer.height = ui.$footer.outerHeight();
				},
				'scroll': function() {
						ui.window.scrollTop = ui.window.$this.scrollTop();
						ui.window.height = ui.window.$this.height();
						ui.document.height = ui.document.$this.height();
						ui.$topBanner.height = ui.$topBanner.outerHeight();
						ui.$header.height = ui.$header.outerHeight();
						ui.$wrap.height = ui.$wrap.outerHeight();
						ui.$footer.height = ui.$footer.outerHeight();
				},
				'resize': function() {
						ui.window.height = ui.window.$this.height();
				}
		})
},
	/*
	* comment  : check all checkbox
	*/
	/*
	* comment  : slide
	*/
	fxSlide: function() {
		$('.slide-trg').each(function(){
			var $trg = $(this);
			if ( $trg.hasClass('active') ) {
        $(this).closest('.slide-title').next('.slide-cont').find('.inner').css('display', 'block');
			}
		});
		$(document).on('click', '.slide-wrap .slide-trg', function(e) {
      var slideTime = 300;
			e.preventDefault();
			console.log('fxSlide');
			if ($(this).closest('.slide-title').next('.slide-cont').find(' .inner').css('display') === 'block') {
				$(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
			} else {
        $(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).addClass('active');
        $(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
				$(this).closest('.slide-title').next('.slide-cont').find('.inner').slideDown(slideTime);
			}
		});
	},
  fxpageTop: function() {
    $(document).on('click', '.page-top', function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
    });
  },
  fxoutOff: function() {
		$('[data-tipopen]').on('click', function(){
			$(this).closest('.tooltip').find('.tooltip-cont').addClass('active');;
			return false;
		});
    $(window).on('click', function(event) {
      if (!$(event.target).closest('[data-widthout]').length) {
        $('[data-widthout]').removeClass('active');
      }
    });
  },
	fxCopyUrl: function() {
		var ct;
		$(document).on('click', '.clipboard', function(e) {
			e.preventDefault();
			end();
			var dummy = document.createElement("input");
			var text = location.href;
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			$('.toast-msg').addClass('active');
			start();
    });

    function start() {
			ct = setTimeout(function() {
				$('.toast-msg').removeClass('active');
			}, 1000);
    }

    function end() {
      clearTimeout(ct);
    }
	},
}

function offsetEvent() {
	$('.offset-event').each(function() {
		var offsetArea = $(this).offset().top;
		
		if (offsetArea - 1200 < $(window).scrollTop()) {
			$(this).addClass('active');
		}else {
			$(this).removeClass('active');
		}
	});
}


$(function() {
  //ui.init();

	$('.video-item').mouseenter(function(){
		$(this).addClass('active');
		$(this).find('video').get(0).play();
	})
	.mouseleave(function(){
		$(this).removeClass('active');
		$(this).find('video').get(0).currentTime = 0;
		$(this).find('video').get(0).pause();
	});

  AOS.init({
	  duration: 1000
  });

  if ($('.offset-event').length) {
    ui.window.$this.on({
      'load': function() {
        offsetEvent();
      },
      'scroll': function() {
        offsetEvent();
      },
    });
  }

  // $('.gnb').on('click', function(){
  //   console.log('a');
  //   $('header').addClass('fix');
  // });

  $('#gnb-menu').on('mouseenter', function(){
	if(!$('header').hasClass('over')){
		$('header').addClass('over');
		$('header').addClass('fix');
	}
	// if(!$('header').hasClass('fix')){
	// 	$(this).addClass('fix')
	// }
  });

  $('#gnb-menu').on('mouseleave', function(){
		$('header').removeClass('over');
		$('main').removeClass('active');
		$('#gnb-menu > li').removeClass('hover');

		if($(window).scrollTop() == 0){
			$('header').removeClass('fix');
		}
  });

	
  $('#gnb-menu > li').hover(function(){
    $('#gnb-menu').find('.gnb-sub-wrap').removeClass('show');
    $(this).closest('li').find('.gnb-sub-wrap').addClass('show');
		$('#gnb-menu > li').removeClass('hover');
		$(this).addClass('hover');
	
		if( $(this).closest('li').find('.gnb-sub-wrap').length > 0){
		//if($('.gnb-sub-wrap').is(':visible')){
			$('main').addClass('active');
		}else {
			$('main').removeClass('active');
		}
  });

  // GNB
  var burger = $('.menu-trigger');
  
  burger.on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
  })
  

  //Visual
  var mainVisual = new Swiper('.mySwiper', {
    speed: 400,
    slidesPerView: 1,
    //loop : true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });

  var productList = new Swiper('.product-list', {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: false,
    speed: 500,
  });

  var playList = new Swiper('.section-play', {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: false,
    speed: 500,
  });


  // Video 
  var btnPlay = $('.video-area button');

  btnPlay.on('click', function(){
    var video = $(this).closest('div');

    if(!video.hasClass('active')){
      $(this).children('img').attr('src', '../../assets/images/btn_pause.png');
      video.addClass('active').find('video').get(0).play();
    
    } else {
      $(this).children('img').attr('src', '../../assets/images/btn_play.png');
      video.removeClass('active').find('video').get(0).pause();
    }
  });
  
});


/*
function offsetEvent() {
	var offsetValue = $('[data-offset]');

	$('.offset-event').each(function() {
		var offsetArea = $(this).offset().top;
		var offPosition = $this.data('offset');
		var win_h = $(window).scrollTop();
		
		if (win_h > offsetArea - offPosition) {
			$(this).addClass('active');
		}else {
			$(this).removeClass('active');
		}
	});
}
*/

function offsetActive() {
	$('.section-spotlight').each(function() {
		  var offsetValue = $(this).offset().top;
		  if (offsetValue - 450 < $(window).scrollTop()) {
				$(this).addClass('active');
		  }else {
				$(this).removeClass('active');
			}
	});
}

$(window).on({
	'load': function(){
			this.isDown = false;
			this.preTop = $(window).scrollTop();
		offsetActive();
	},
	'scroll': function() {
				offsetActive();

				var winH = $(window).height(),
						winTop = $(window).scrollTop(),
						docH = $(document).height();

				$('header').removeClass('over');
				$('main').removeClass('active');
				$('#gnb-menu > li').removeClass('hover'); 

				if (winTop > this.preTop && !this.isDown) {
						this.isDown = true;
						$('header').removeClass('fix over').addClass('slideUp');
						$('.gnb-sub-wrap').hide();
						setTimeout(function(){
							$('.gnb-sub-wrap').removeAttr('style');
						},500);
				} else if (winTop < this.preTop && this.isDown) {
						this.isDown = false;
						$('header').addClass('fix').removeClass('slideUp');
				}

				if (winTop > docH - winH) {
						this.isDown = true;
						console.log('a')
				} else if (winTop <= 0) {
					this.isDown = false;
					$('header').removeClass('fix');
				}

				this.preTop = winTop;
		}
	
});