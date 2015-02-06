;
function PHPADM_AdTransform(id){
	this.settings = {};
	this.settings.IsInitialized=false;
	this.settings.adWrapID='ad_banner_1';
	this.settings.adSlider = '';//轮播数字编号 
	this.settings.adNums = '';//轮播数字编号 
	this.settings.adLength = 0;//广告长度 
	this.settings.Index = 0;//当前编号 
	this.settings.Current = 0;//当前位置 
	this.settings.Target = 0;//目标位置 
	this.settings.Auto=true;//是否自动切换 
	this.settings.Pause=2000;//停顿时间 
	this.settings.playTime=500;//缓冲函数调用次数 
	
	var obj =document.getElementById(id);
	obj.style.overflow = 'hidden';
	obj.style.position = "relative";
	var slider;
	var nums;
	var adCount;
	
	var interval1;
	var interval2;
	var delay = 30;
	var that = this;
	
	var addEvent = function(obj,evtType,func,cap) {
	    cap=cap||false;
		if(obj.addEventListener){
		     obj.addEventListener(evtType,func,cap);
		   return true;
		}else if(obj.attachEvent){
		        if(cap) {
		         obj.setCapture();
		         return true;
		     }else{
		      return obj.attachEvent("on" + evtType,func);
		   }
		}else{
		   return false;
	    }
	};
	var curve = function(t, b, c, d, s) {//缓冲函数 
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b
	}
	var play = function(from,to,playTime){//播放 
		clearTimeout(interval2);
		
		changeVal = to - from;
		playTime = playTime / 10;
		
		(function time(position) {
			if(!position) position = 0;
			if (position++ < playTime) {
				slider.style.left = (-1 * Math.max(0, Math.abs(Math.ceil(curve(position, from, changeVal, playTime))))) + "px";
				interval2 = setTimeout(function(){time(position)},delay);
			}
		})();
	}
	var each = function(list, fun) {
		for(var i=0,o;o=list[i];i++) {
			fun(o,i);
		}
	};
	var customMethod= function(){
		clearTimeout(interval1);

		//边界检查 
		if(that.settings.Index < 0) {
			that.settings.Index = adCount - 1;
		} else if (that.settings.Index >= adCount) { 
			that.settings.Index = 0; 
		}
		
		each(nums, function(o, i){o.className = that.settings.Index == i ? 'on' : ''});
		
		that.settings.Current = parseInt(slider.style.left);//当前位置 
		
		that.settings.Target = -1 * that.settings.adLength * that.settings.Index;//目标位置 

		//移动长度 
		play(that.settings.Current,that.settings.Target,that.settings.playTime);
		
		if(that.settings.Auto) {
			interval1 = setTimeout(function(){that.settings.Index++;customMethod();},that.settings.Pause);
		}
	};
	this.Run=function() {
		
		slider = document.getElementById(that.settings.adSlider);
		slider.style.position = "absolute";
		slider.style.top = 0;
		slider.style.left = 0;
		
		nums = document.getElementById(that.settings.adNums).getElementsByTagName("li");
		adCount = nums.length;
		
		each(nums, function(o, i) {
			addEvent(o,'mouseover',function(){o.className = 'on';that.settings.Index = i;that.settings.Auto = false;customMethod();});
			addEvent(o,'mouseout',function(){o.className = '';that.settings.Auto = true;customMethod();});
		});
		
		interval1=setTimeout(customMethod,delay);
    };
}