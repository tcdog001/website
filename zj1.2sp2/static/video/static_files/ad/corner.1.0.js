;
function PHPADM_AdCorner(id){
	this.settings = {};
	this.settings.IsInitialized=false;
	this.settings.btnMin='';
	this.settings.btnMax='';
	this.settings.btnShow='';
	this.settings.btnClose='';
	this.settings.objContent='';
	this.settings.playTime=500;/*缓冲函数调用次数*/
	this.settings.timeout=1000;/*效果延迟展示时间*/
	
	var obj=document.getElementById(id);
	var btnShow;
	var btnClose;
	var objContent;
	
	var interval;
	var delay = 10;
	var that = this;
	
	var addEvent = function (obj,evtType,func,cap){
	    cap=cap||false;
		if(obj.addEventListener){
		     obj.addEventListener(evtType,func,cap);
		   return true;
		} else if(obj.attachEvent){
		        if(cap){
		         obj.setCapture();
		         return true;
		     }else{
		      return obj.attachEvent("on" + evtType,func);
		   }
		} else {
		   return false;
	    }
	};
	var getYScroll = function() {
	    var scrollTop,scrollFoot;
	    
		if (self.pageYOffset) {
			scrollTop = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		
		var h1 = /BackCompat/i.test(document.compatMode)?document.body.clientHeight:document.documentElement.clientHeight;
		var h2 = obj.offsetHeight;

		that.settings.scrollTop = scrollTop + h1 - h2;
		that.settings.scrollFoot = scrollTop + h1 + h2;
	};
	var curve = function(t, b, c, d, s) {/*缓冲函数*/
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b
	};
	var play = function(from,to,playTime){
		clearTimeout(obj.timer);
		
		changeVal = to - from;
		playTime = playTime / 10;
		
		(function time(position) {
			if(!position) position = 0;
			if (position++ < playTime) {
				obj.style.top = Math.max(1, Math.abs(Math.ceil(curve(position, from, changeVal, playTime))))+ "px";
				setTimeout(function(){time(position)},delay);
			}
		})();
	};
	var customMethod= function() {
		clearTimeout(interval);
		
		interval = setTimeout(function() {
			obj.style.display = 'block';
			
			getYScroll();
			obj.style.top = that.settings.scrollFoot + 'px';

			play(that.settings.scrollFoot,that.settings.scrollTop,that.settings.playTime);
		},that.settings.timeout);/*延迟执行*/
	};
	var show = function(x) {
		var d = btnShow.status == 1 ? [0,'icons max',that.settings.BtnMax,'block'] : [1,'icons min',that.settings.BtnMin,'none']
		btnShow.status = d[0];
		btnShow.classname = d[1];
		btnShow.title = d[2];
		objContent.style.display = d[3];
		getYScroll();
		obj.style.top = that.settings.scrollTop + 'px';
		play(that.settings.scrollFoot,that.settings.scrollTop,that.settings.playTime);
		this.blur()
	};
	var close = function(x) {
		obj.style.display = 'none';
	};
	this.Run=function() {
		btnShow = document.getElementById(that.settings.btnShow);
		btnClose = document.getElementById(that.settings.btnClose);
		objContent = document.getElementById(that.settings.objContent);
		
		addEvent(btnShow,"click",show);
		addEvent(btnClose,"click",close);
		
		interval=setTimeout(customMethod,delay);
    }
}