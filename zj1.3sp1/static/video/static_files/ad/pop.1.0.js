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