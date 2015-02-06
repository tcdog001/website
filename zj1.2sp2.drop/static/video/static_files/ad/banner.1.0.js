;
function PHPADM_AdBanner(id){
	this.settings=new Object();
	this.settings.IsInitialized=false;
	this.settings.adWrapID='';
	this.settings.imgID='';
	this.settings.maxHeight=0;
	this.settings.minHeight=0;
	this.settings.endImgURL='';
	this.settings.playTime=500;//切换成小图
	this.settings.timeout=1000;//大图展示时间
	
	var obj=document.getElementById(id);
	obj.style.overflow = 'hidden';
	var interval;
	var delay = 10;
	var that = this;
	var img;
	
	var curve = function(t, b, c, d, s) {//缓冲函数
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b
	};
	var play = function(from,to,playTime,onEnd){
		changeVal = to - from;
		playTime = playTime / 10;
		play_interval = null;
		(function time(from, change, position, delay, playTime) {
			if (position++ < playTime) {
				var x = Math.max(1, Math.abs(Math.ceil(curve(position, from, changeVal, playTime))));
				if(from == 0 && x > change) {
					x = change;
				}
				obj.style.height = x+ "px";
				setTimeout(function() {
					time(from, change, position, delay, playTime)
				}, delay);
			} else {
				onEnd && onEnd.call(obj, to)
			}
		})(from, changeVal, 0, delay, playTime);
	};
	var customMethod= function(){
		clearTimeout(interval);
		interval = setTimeout(function() {
			play(that.settings.maxHeight,0,that.settings.playTime,function(x) {
				img.src = that.settings.endImgURL;//预加载
				img.style.height = that.settings.minHeight + "px";
				curve = function(t, b, c, d) {//缓冲函数
					if ((t /= d) < (1 / 2.75)) {
						return c * (7.5625 * t * t) + b
					} else if (t < (2 / 2.75)) {
						return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
					} else if (t < (2.5 / 2.75)) {
						return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
					} else {
						return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
					}
				}
				play(0,that.settings.minHeight,600);
			})
		},that.settings.timeout);
	};
	this.Run=function() {
		img = document.getElementById(that.settings.imgID);
		var o = new Image;
		o.src = that.settings.endImgURL;//预加载
		interval=setTimeout(customMethod,delay);
    };
}