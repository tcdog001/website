;function PHPADM_loadScript(url)
{
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
}
;function PHPADM_GetXmlHttpObject()
{
        var xmlHttp=null;
        try
        {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
        }
        catch (e)
        {
        // Internet Explorer
        try
        {
        xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        }
        return xmlHttp;
}
;function PHPADM_ReloadZoneCode()
{
    $zoneid=new Array();
    for(var i=0;i<arguments.length;i++)
    {
        $zoneid.push(arguments[i]);
    }
    var xmlHttp =PHPADM_GetXmlHttpObject();

    xmlHttp.onreadystatechange=function()
    {
        if(xmlHttp.readyState==4)
        {
            var jsonObject = eval("(" + xmlHttp.responseText + ")");
            
            for(var k in jsonObject)
            {
            	if(jsonObject[k] && jsonObject[k] != 'null') {
            		document.getElementById("PHPADM_ZONE_"+k).innerHTML=jsonObject[k];
            	}
            }
            
        }
    }
    var url="http://phpadm.runsky.com/adjs.php";
    url=url+"?zoneids="+$zoneid.join(",");
    url=url+"&n="+Math.random()*10000;
    url=url+"&ajax_post=1";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);    
    
}
;
function PHPADM_AdCouplet() {
	this.settings = {};
	this.settings.delta=0.8;
	this.settings.collection=[];
	this.settings.minwidth=800;
	
    var interval;
    var delay = 30;
    var closeB = false;

    var that = this;
    var customMethod=function() {
    	if(screen.width<=that.settings.minwidth || closeB)
		{
			for(var i=0;i<that.settings.collection.length;i++)
			{
				that.settings.collection[i].object.style.display = 'none';
			}
			return;
		}
    	for(var i=0;i<that.settings.collection.length;i++)
        {
            var followObj		= that.settings.collection[i].object;
            var followObj_x		= (typeof(that.settings.collection[i].x)=='string'?eval(that.settings.collection[i].x):that.settings.collection[i].x);
            var followObj_y		= (typeof(that.settings.collection[i].y)=='string'?eval(that.settings.collection[i].y):that.settings.collection[i].y);

            if(followObj.offsetLeft!=(document.body.scrollLeft+followObj_x)) {
                var dx=(document.body.scrollLeft+followObj_x-followObj.offsetLeft)*that.settings.delta;
                dx=(dx>0?1:-1)*Math.ceil(Math.abs(dx));
                followObj.style.left=followObj.offsetLeft+dx + 'px';
            }
            if(followObj.offsetTop!=(document.body.scrollTop+followObj_y)) {
                var dy=(document.body.scrollTop+followObj_y-followObj.offsetTop)*that.settings.delta;
                dy=(dy>0?1:-1)*Math.ceil(Math.abs(dy));
                followObj.style.top=followObj.offsetTop+dy + 'px';
            }
            followObj.style.display	= '';
        }
    };
	this.addItem = function(id,x,y)
	{
		var newItem	= {};
		newItem.object = document.getElementById(id);
		newItem.object.style.left = (typeof(x)=='string'?eval(x):x) + 'px';
        newItem.object.style.top = (typeof(x)=='string'?eval(y):y) + 'px';
		newItem.x = x;
		newItem.y = y;
		
		that.settings.collection.push(newItem);
	};
	this.Run=function(){
        interval=setInterval(customMethod,delay);
    };
    this.Close=function() {
    	closeB=true;
    	return;
    };
}
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
        obj.style.left = (x + that.settings.ScrollX) + "px";
        obj.style.top = (y + that.settings.ScrollY) + "px";
        rad=(Math.random()+1)*Math.PI/6;
        W=that.settings.moveWidth-obj.offsetWidth;
        H=that.settings.moveHeight-obj.offsetHeight;
        x = x + step*kx*dirx;
        if (x < 0){dirx = 1;x = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
        if (x > W){dirx = -1;x = W;kx=Math.sin(rad);ky=Math.cos(rad);}
        y = y + step*ky*diry;
        if (y < 0){diry = 1;y = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
        if (y > H){diry = -1;y = H;kx=Math.sin(rad);ky=Math.cos(rad);}
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
;function PHPADM_AdPop(id){
	this.settings = {};
	this.settings.PopUrl = '';
	this.settings.PopWidth = 0;
	this.settings.PopHeight = 0;
	this.settings.PopTop = 0;
	this.settings.PopLeft = 0;
	this.settings.Timeout=500;
	this.param = [];
	
	var that = this;
	var addLoadEvent = function(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
	    window.onload = func;
	  } else {  
	    window.onload = function() {
	      oldonload();
	      func();
	    }
	  }
	};
	var addEvent = function(obj,evtType,func,cap) {
	    cap=cap||false;
		if(obj.addEventListener){
		   obj.addEventListener(evtType,func,cap);
		   return true;
		}else if(obj.attachEvent){
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
	var obj = new Object();
	obj.ID = id;
	obj.Flag = 0;
	obj.timer = null;
	obj.getCookie = function(c_name)
	{
	    if(document.cookie.length<0) return '';
	    var offset = document.cookie.indexOf(c_name + '=');
	    if(offset == -1) return '';
	    offset += c_name.length+1;
	    var end = document.cookie.indexOf(";",offset);
	    if(end == -1){end = document.cookie.length;}
	    return unescape(document.cookie.substring(offset,end))
	};
	obj.setCookie = function(c_name,value,expireSeconds,domain)
	{
	    var exdate = new Date;
	    exdate.setTime(exdate.getTime() + expireSeconds*1000);
	    var days = (expireSeconds == null) ? '' : ';expires=' + exdate.toGMTString();
	    domain = (domain == null) ? '' : ';domain=' + domain;
	    document.cookie = c_name + '=' + escape(value) + days + domain;
	};
	obj.CustomMethod=function() {
		clearTimeout(obj.timer);
    	/*if(obj.getCookie(obj.ID) == '1') return;*/
		var win = window.open(that.settings.PopUrl, obj.ID, obj.Param);
    	if(win) {
    		obj.setCookie(obj.ID,'1',600);
    		obj.Flag = 1;
    		if(this.settings.Timeout>0) obj.timer=setTimeout(function(){win.close()}, that.settings.Timeout);
    	}
    };
    this.Run=function() {
    	that.param = ["height=" + that.settings.PopHeight, 
			         "width=" + that.settings.PopWidth, 
			         "top=" + that.settings.PopTop, 
			         "left=" + that.settings.PopLeft, 
			         "toolbar=no", "menubar=no", "scrollbars=no", "resizble=no", "location=no", "status=no"];
    	obj.Param = that.param.join(",");
    	addLoadEvent(function(){
    		addEvent(document,"click",obj.Flag || obj.CustomMethod);/*火狐单击弹*/
    		if( document.createEvent ) {
			  event = document.createEvent('MouseEvents');
			  event.initEvent( 'click', true, false );
			  document.dispatchEvent(event);
			} else if( document.createEventObject ) {
				document.fireEvent('click');
			}
    	});
    };
}
;function PHPADM_AdTransform(id){
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