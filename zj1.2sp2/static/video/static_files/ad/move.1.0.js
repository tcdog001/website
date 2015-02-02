;
function PHPADM_AdMove(id){
	this.settings = {};
	this.settings.IsInitialized=false;
	this.settings.ScrollX=0;
	this.settings.ScrollY=0;
	this.settings.moveWidth=0;
	this.settings.moveHeight=0;
	
    var obj=document.getElementById(id);
    obj.style.position="absolute";
    var W=this.settings.moveWidth-obj.offsetWidth;
    var H=this.settings.moveHeight-obj.offsetHeight;
    var x = W*Math.random(),y = H*Math.random();
    var rad = (Math.random()+1)*Math.PI/6;
    var kx = Math.sin(rad),ky=Math.cos(rad);
    var dirx = (Math.random()<0.5?1:-1), diry = (Math.random()<0.5?1:-1);
    var delay = 10;
    var step = 1;
    var interval;
    
    var addEvent = function(obj,evtType,func,cap){
	    cap=cap||false;
		if(obj.addEventListener){
		   obj.addEventListener(evtType,func,cap);
		   return true;
		} else if(obj.attachEvent){
	        if(cap){
	        	obj.setCapture();
	        	return true;
		    } else {
		      return obj.attachEvent("on" + evtType,func);
		   }
		} else {
			return false;
		}
	};

	var getPageScroll = function(){
	    var xScroll,yScroll;
		if (self.pageXOffset) {
		   xScroll = self.pageXOffset;
		} else if (document.documentElement && document.documentElement.scrollLeft){
		   xScroll = document.documentElement.scrollLeft;
		} else if (document.body) {
		   xScroll = document.body.scrollLeft;
		}
		if (self.pageYOffset) {
		   yScroll = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){
		   yScroll = document.documentElement.scrollTop;
		} else if (document.body) {
		   yScroll = document.body.scrollTop;
		}

		return new Array(xScroll,yScroll);
	};

	var getPageSize = function(){
	    var xScroll, yScroll;
	    if (window.innerHeight && window.scrollMaxY) { 
	        xScroll = document.body.scrollWidth;
	        yScroll = window.innerHeight + window.scrollMaxY;
	    } else if (document.body.scrollHeight > document.body.offsetHeight){
	        xScroll = document.body.scrollWidth;
	        yScroll = document.body.scrollHeight;
	    } else {
	        xScroll = document.body.offsetWidth;
	        yScroll = document.body.offsetHeight;
	    }
	    var windowWidth, windowHeight;
	    if (self.innerHeight) {
	        windowWidth = self.innerWidth;
	        windowHeight = self.innerHeight;
	    } else if (document.documentElement && document.documentElement.clientHeight) {
	        windowWidth = document.documentElement.clientWidth;
	        windowHeight = document.documentElement.clientHeight;
	    } else if (document.body) {
	        windowWidth = document.body.clientWidth;
	        windowHeight = document.body.clientHeight;
	    } 
	    if(yScroll < windowHeight){
	        pageHeight = windowHeight;
	    } else { 
	        pageHeight = yScroll;
	    }
	    if(xScroll < windowWidth){ 
	        pageWidth = windowWidth;
	    } else {
	        pageWidth = xScroll;
	    }
	    return new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	}
    var customMethod=function() {
        rad=(Math.random()+1)*Math.PI/6;
        W=that.settings.moveWidth-obj.offsetWidth;
        H=that.settings.moveHeight-obj.offsetHeight;
        x = x + step*kx*dirx;
        if (x < 0){dirx = 1;x = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
        if (x > W){dirx = -1;x = W;kx=Math.sin(rad);ky=Math.cos(rad);}
        y = y + step*ky*diry;
        if (y < 0){diry = 1;y = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
        if (y > H){diry = -1;y = H;kx=Math.sin(rad);ky=Math.cos(rad);}
        obj.style.left = (x + that.settings.ScrollX) + "px";
        obj.style.top = (y + that.settings.ScrollY) + "px";
    };
    
    var that = this;
    this.Resize=function(){
	    var winsize = getPageSize();
	    that.settings.moveWidth = winsize[2];
	    that.settings.moveHeight = winsize[3];
	    that.Scroll();
	};
    this.Scroll=function(){
	    var winscroll=getPageScroll();
	    that.settings.ScrollX = winscroll[0];
	    that.settings.ScrollY = winscroll[1];
	};
    this.Run=function(){
    	if(!that.settings.IsInitialized){
    		that.settings.IsInitialized=true;
        }
    	
        interval=setInterval(customMethod,delay);
        obj.onmouseover=function(){clearInterval(interval);}
        obj.onmouseout=function(){interval=setInterval(customMethod, delay);}
        
        addEvent(window,"resize",that.Resize);
    	addEvent(window,"scroll",that.Scroll);
    	that.Resize();
    };
}