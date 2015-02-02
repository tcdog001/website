define(function(require, exports, module) {
	var $ = require('zepto');
	var modIscroll = require("mod-iscroll");

	function indexSlider() {
		var clientWidth = document.body.clientWidth;
		var SIZEWH = 720 / 260;
		var $dots;
		var $dotActive;
		var indexSlider;
		var timer;
		var autoTimer;
		var lis;
		var isTouching = false;
		var $slider;
		var $imgs;
		var $pics;
		var pageLen;

		function initDoms() {
			lis = $(".pics li");
			$slider = $(".index .slider");
			$imgs = $(".pics img");
			$pics = $(".pics");
			pageLen = $imgs.length;
		}

		function adjustHeight() {
			clientWidth = document.body.clientWidth;
			$slider.css("height", (clientWidth > 768 ? 768 : clientWidth) / SIZEWH);
		}

		function initEventBind(){
			$(window).on("resize", function() {
				clearTimeout(timer);
				clearTimeout(autoTimer);
				timer = setTimeout(function() {
					adjustHeight();
					indexSlider.refresh();
					initAutoScroll();
				}, 10);
			});

			$pics.on('touchstart', function() {
				isTouching = true;
				clearTimeout(autoTimer);
			})

			$pics.on('touchend', function() {
				isTouching = false;
				initAutoScroll();
			})	
		}

		function initStyles() {
			lis.css("width", 100 / lis.length + '%');
			$pics.css('width', lis.length * 100 + '%');
			adjustHeight();
		}

		function refreshDots(curPageIndex) {
			$dotActive && $dotActive.removeClass("cur");
			$dotActive = $dots.eq(curPageIndex);
			
			$dotActive.addClass("cur");
		}

		function initSlider() {
			indexSlider = new modIscroll("#J_sliderT", {
				scrollX: true,
				scrollY: false,
				mouseWheel: false,
				click: true,
				snap: "li"
			});
			setTimeout(function() {
				
				$slider.css("opacity", 1);
			}, 0);

			indexSlider.on('scrollEnd', function() {
				var curPageIndex = indexSlider.currentPage.pageX;
				refreshDots(curPageIndex);
			})
		}

		function initDots() {
			var tmp = [];
			tmp.push('<ul class="dots">');
			for (i = 0; i < lis.length; i++) {
				tmp.push('<li ' + (i == 0 ? 'class="cur"' : '') + '></li>');
			}
			tmp.push('</ul>');
			$("#J_sliderT .control").append(tmp.join(""));
			$dots = $("#J_sliderT .dots li");
			$dotActive = $("#J_sliderT .dots .cur");
		}

		function initAutoScroll() {
			clearTimeout(autoTimer);
			autoTimer = setTimeout(function() {
				clearTimeout(autoTimer);
				var curPageX = indexSlider.currentPage.pageX;
				if (!isTouching) {
					if(curPageX == pageLen - 1){
						indexSlider.goToPage(0,0);
					}else{
						indexSlider.next();
					}
					autoTimer = setTimeout(arguments.callee, 4000);
				}
			}, 4000);
		}

		function init() {
			initDoms();
			initStyles();
			initSlider();
			initDots();
			initEventBind();
			initAutoScroll();
		}
		init();
	}
	indexSlider();

	module.exports = {
		init: function() {
			console.debug("index init");
		}
	}
});