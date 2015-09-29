
$(function () {
	var obj = {
		render: function () {
			var firstDom = '<section class = "swiper-slide"><img class = "logo ani" swiper-animate-effect = "shake" swiper-animate-duration="0.2s"  src = '+data.firstSection.logo+'><img src = '+data.firstSection.bg+'><img class = "p1 ani" swiper-animate-effect = "fadeInDown" swiper-animate-duration="1s" swiper-animate-delay=".5s" src="'+data.firstSection.img1+'"><img  class = "p2 ani" swiper-animate-effect = "fadeInUp" swiper-animate-duration="1s" swiper-animate-delay=".5s" src="'+data.firstSection.img2+'"><img class = "move" src="'+data.firstSection.move+'"></section>',
				middleDom = '',
				specialDom = '<section class = "swiper-slide"><img src="'+data.special.bg+'"><img class = "move" src="'+data.special.move+'"><img class = "ani" swiper-animate-effect = "rotateInDownLeft" swiper-animate-duration="2s"src="'+data.special.img1+'"><img class = "circle" src="'+data.special.img3+'"><img class = "light" src="'+data.special.img2+'" ><a id = "show" href="javascript:void(0)"></a><p class = "cont6 moveUp">'+data.special.text+'</p></section>',
				lastDom = '<section class = "pagelast swiper-slide"><img src="'+data.lastSection.bg+'"><img class = "cont81 ani" swiper-animate-effect = "bounceInLeft" swiper-animate-duration="1s" src="'+data.lastSection.img2+'"><a id = "relay" href="javascript:void(0)"><img class = "ani" swiper-animate-effect = "bounceInLeft" swiper-animate-duration="2s" swiper-animate-delay=".5s"  src="'+data.lastSection.relay+'"></a><a id = "share" href="javascript:void(0)"><img class = "ani" swiper-animate-effect = "bounceInRight" swiper-animate-duration="2s" swiper-animate-delay=".5s" src="'+data.lastSection.share+'"></a><img class = "cont84" src="'+data.lastSection.erweima+'"><img class = "cont85 ani" swiper-animate-effect = "bounceInRight" swiper-animate-duration="2s" swiper-animate-delay="1s" src="'+data.lastSection.logo1+'"><div class="other ani" swiper-animate-effect = "rotateInUpLeft" swiper-animate-duration="1s" swiper-animate-delay="1s" >'+data.lastSection.text+'</p></div><img id = "mark" src="'+data.lastSection.mark+'"></section>';

			for (var i = 0,len = data.middleSections.length; i <len; i++) {
				middleDom += '<section class = "swiper-slide"><img src="'+data.middleSections[i].bg+'"><img class = "move" src="'+data.middleSections[i].move+'" alt=""><div class="cont"><h3 class = "ani" swiper-animate-effect = "rollIn" swiper-animate-duration="1.5s" swiper-animate-delay=".5s" >'+data.middleSections[i].h3+'</h3><p class = "ani" swiper-animate-effect = "fadeInLeft" swiper-animate-duration="1.5s" swiper-animate-delay="1s" >'+data.middleSections[i].p+'</p></div></section>' 
			};

			var wrapper = $(".swiper-wrapper");

			wrapper.append(firstDom);
			wrapper.append(middleDom);
			wrapper.append(specialDom);
			wrapper.append(lastDom);
		},

		swipers: function () {
			var mySwiper = new Swiper(".swiper-container", {
				direction:"vertical",
				mousewheelControl:true,
				onInit:function (swiper) {
					swiperAnimateCache(swiper);
					swiperAnimate(swiper);
				},
				onSlideChangeStart:function (swiper) {
					var showLight = {
						light:function() {
							var show = $("#show"),
								circle = $(".circle"),
								sections = $("section"),
								len = sections.length,
								light = $(".light");

							var pages = $("#swipers"),
								mark1 = $("#mark1"),
								lists = $("#list");

							if(mySwiper.activeIndex != len - 2) {
								light.removeClass("show1");
								circle.removeClass("hide1");
							}
							show.click(function () {
								light.addClass("show1");
								circle.addClass("hide1");
				
							})
						}
						
					}
				showLight.light();
				},
				onSlideChangeEnd:function (swiper) {
					swiperAnimate(swiper);

				}
			})
		},

		init: function () {
			var sizeRatio = $(window).width() / 640;
			var size = sizeRatio > 1 ? 1 : sizeRatio;
			$("body").css("font-size",size * 6.25 + "%");

			// 分享的遮罩
			var share = $("#share"),
				mark = $("#mark");

			share.click(function () {
				mark.show(500);
			});
			mark.click(function () {
				$(this).hide(500);
			})
		},

		// 音乐
		music:function () {
			if (data.musicUrls) {
			  (function(onSrc, offSrc, musicScr) {
			    var str = '<audio src="' + musicScr + '" loop="loop" id="autoplay" autoplay="autoplay"></audio><div class="musicBtn">' + '<img src="' + onSrc + '" class="onImg">' + '<img src="' + offSrc + '" class="offImg">' + '</div>';
			    $('body').append(str);
			    var audio = document.getElementById('autoplay');
			    $('.musicBtn').on('click', function() {
			      if (audio.paused) {
			        audio.play();
			        $('.musicBtn').removeClass('musicOff');
			      } else {
			        audio.pause();
			        $('.musicBtn').addClass('musicOff');
			      }
			    });
			  })(data.musicUrls.onSrc, data.musicUrls.offSrc, data.musicUrls.musicSrc);
			}
		},

		loads: function () {
			var that = this;
			function initView() {
				$(".loading").hide();

				that.render();
				that.init();
	 			that.swipers();
	 			that.music();
			}

			var loader = new resLoader( {
				resources:data.allImages,
				onStart:function (total) {}, 
				onProgress:function (current, total) {
					var percent = parseInt(current / total * 100) + "%";
					$(".pace-progress").text(percent);
				},
				onComplete: function (total) {
					initView();
				}
			})
			loader.start();
		}
	}
	obj.loads();
	// obj.render();
	// obj.swipers();
	// obj.init();

})