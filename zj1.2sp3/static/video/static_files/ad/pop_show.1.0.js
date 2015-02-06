;function PHPADM_PopShow(id){
	this.settings = {};
	this.settings.swfSrc = '';
	this.settings.Width = 0;
	this.settings.Height = 0;
	this.settings.iconSrc = 0;
	this.settings.iconWidth = 0;
	this.settings.iconHeight = 0;
	this.settings.adHref = '';
	this.settings.showTime=5;
	this.settings.closeIconSrc = '';
	this.settings.closeLittleIconSrc = '';
	this.settings.replayIconSrc = '';
	this.settings.contentBagLoader = '';
	this.settings.contentBgIframe = '';
	this.settings.closedLayer = '';
	this.settings.floatPos = 2;
	this.param = [];
	var mybody = (document.compatMode&&document.compatMode.toLowerCase() == "css1compat")?document.documentElement:document.body;
	var floatType;
	var ie6 = !-[1,]&&!window.XMLHttpRequest;
	var contentBagLoader;
	var closedLayer;
	var iframeBg;
	var that = this;
	var interval;
	var _interval;
	var delay = 10;
	var isClose = 0;
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
	var createOpenedHtml = function () {
		var fragMent = document.createDocumentFragment()
		contentBagLoader = document.createElement('div');
		contentBagLoader.id = that.settings.contentBagLoader;
		contentBagLoader.style.cssText = 'width:'+that.settings.Width+'px;height:'+(that.settings.Height+24)+'px;overflow:hidden;display:block;position:'+floatType+';';
		closeDiv 	= document.createElement('div');
		closeDiv.style.cssText = 'margin:2px 0px;height:22px;line-height:22px;';
		closeSpan = document.createElement('span');
		closeSpan.style.cssText = 'height:22px;float:right;cursor:pointer;';
		closeSpan.innerHTML = '<img src="' + that.settings.closeIconSrc + '" border="0"/>';
		closeSpan.onclick = function(){that.Hidden(isClose,that.settings.floatPos);};
		closeDiv.appendChild(closeSpan);
		contentDiv = document.createElement('div');
		contentDiv.style.cssText = 'width:'+that.settings.Width+'px;height:'+(that.settings.Height)+'px;position:relative;overflow:hidden;';
		var code = getShowHtml();
		if(code) {
			contentDiv.innerHTML = code;
		} else {
			return false;
		}
		iframeBg = document.createElement('iframe');
		iframeBg.id = that.settings.contentBgIframe;
		iframeBg.vspace=0;
		iframeBg.hspace=0;
		iframeBg.allowTransparency="true";
		iframeBg.scrolling="no";
		iframeBg.marginWidth=0;
		iframeBg.marginHeight=0;
		iframeBg.frameBorder=0;
		iframeBg.style.cssText = 'position:'+floatType+'; visibility:inherit;width:' + that.settings.Width + 'px;height:' + (that.settings.Height+24) + 'px;z-index:-1;filter:Alpha(Opacity=0); opacity:0.0; MozOpacity:0.0; KhtmlOpacity:0.0;';
		if(that.settings.floatPos == 2){
			contentBagLoader.appendChild(contentDiv);
			contentBagLoader.appendChild(closeDiv);
		}else{
			contentBagLoader.appendChild(closeDiv);
			contentBagLoader.appendChild(contentDiv);
		}
		contentBagLoader.appendChild(iframeBg);
		fragMent.appendChild(contentBagLoader);
		document.body.appendChild(fragMent);
	};
	var createClosedHmtl = function () {
		var fragMent = document.createDocumentFragment();
		closedLayer = document.createElement('div');
		closedLayer.id = that.settings.closedLayer;
		closedLayer.style.cssText = 'width:'+that.settings.iconWidth+'px;height:'+(that.settings.iconHeight+25)+'px;overflow:hidden;position:'+floatType+';display:block;border:0px;';
		closedLayer.innerHTML = '<a href="'+that.settings.adHref+'" target="_blank"><img style="height:'+that.settings.iconHeight+'px;width:'+that.settings.iconWidth+'px;border:0px;" src="'+that.settings.iconSrc+'"></a>';
		imageContent = document.createElement('div');
		imageContent.style.cssText ='width:'+that.settings.iconWidth+'px;height:15px;padding:2px 0;';
		closeIcon = document.createElement('div');
		closeIcon.style.cssText = 'float:right;';
		closeIcon.innerHTML = '<img src="'+that.settings.closeLittleIconSrc+'" border="0" style="cursor:pointer" />';
		closeIcon.onclick = function(){that.closeAd();};
		replayIcon = document.createElement('div');
		replayIcon.style.cssText = 'float:left;';
		replayIcon.innerHTML = '<img src="'+that.settings.replayIconSrc+'" border="0" style="cursor:pointer" />';
		replayIcon.onclick = function(){that.Show();};
		imageContent.appendChild(replayIcon);
		imageContent.appendChild(closeIcon);
		if(that.settings.floatPos == 1 || that.settings.floatPos == 3){
			closedLayer.appendChild(imageContent);
		} else {
			closedLayer.insertBefore(imageContent,closedLayer.firstChild);
		}
		fragMent.appendChild(closedLayer);
		mybody.appendChild(fragMent);
		fragMent = '';
	};
	var getShowHtml = function () {
		if (/swf$/.test(that.settings.swfSrc)) {
			return '<EMBED src='+ that.settings.swfSrc +' quality=high  WIDTH='+that.settings.Width+' HEIGHT='+that.settings.Height+' TYPE=application/x-shockwave-flash wmode=opaque></EMBED><a href="'+that.settings.adHref+'" target="_blank" style="position:absolute;bottom:0;top:0;left:0;bottom:0;right:0;width:100%;height:'+(that.settings.Height)+'px;filter:alpha(opacity=0);opacity:0;background:#FFF;cursor:pointer;display:block;"></a>';
		}else{
			return '<a href="'+that.settings.adHref+'" style="cursor:pointer;" target="_blank"><img src="'+ that.settings.swfSrc +'" style="border:0px;"/></a>';
		}
	};
	this.Hidden = function (closeFlag,cpos) {
		if(_interval) {
			 clearTimeout(_interval);
		}
		if(!closeFlag) {
			if(contentBagLoader && contentBagLoader.style.display=='block'){
				contentBagLoader.style.display = 'none';
			}
			if (closedLayer && closedLayer.style.display == "none") {
				closedLayer.style.display = "block";
				if(ie6 && cpos){
					if(cpos == 1 || cpos == 3){
						closedLayer.style.top = (mybody.scrollTop)+"px";
					}else if(cpos == 2 || cpos == 4){
						var t = mybody.clientHeight - closedLayer.offsetHeight-24;
						closedLayer.style.top = ((t > 0 ? t : 0)+mybody.scrollTop)+"px";
					}
				}
			}
		} else {
			if(contentBagLoader && contentBagLoader.style.display=='block'){
				contentBagLoader.style.display = 'none';
			}
		}
	};
	this.closeAd = function () {
		if (contentBagLoader) {
			contentBagLoader.innerHTML = "";
		}
		if (closedLayer) {
			closedLayer.innerHTML = "";
		}
	};
	var setPosition = function () {
		var mLeft = (mybody.clientWidth-that.settings.Width)/2,mTop = (mybody.clientHeight-that.settings.Height)/2;
		if(that.settings.floatPos == 1){
			iframeBg.style.left = mLeft+'px';
			iframeBg.style.top = mTop+'px';
			contentBagLoader.style.left = mLeft+'px';
			contentBagLoader.style.top = mTop+'px';
		}else if(that.settings.floatPos == 2){
			iframeBg.style.left = mLeft+'px';
			iframeBg.style.top = '0px';
			contentBagLoader.style.left = mLeft+'px';
			contentBagLoader.style.top = '0px';
		}else if(that.settings.floatPos == 3){
			iframeBg.style.left = mLeft+'px';
			iframeBg.style.bottom = '0px';
			contentBagLoader.style.left = mLeft+'px';
			contentBagLoader.style.bottom = '0px';
		}
		if(closedLayer){
			switch(that.settings.iconPos){
				case 1:
					closedLayer.style.left = '0px';
					closedLayer.style.top =  '0px';
				break;
				case 2:
					closedLayer.style.left = '0px';
					closedLayer.style.bottom =  '0px';
				break;
				case 3:
					closedLayer.style.right = '0px';
					closedLayer.style.top =  '0px';
				break;
				case 4:
					closedLayer.style.right = '0px';
					closedLayer.style.bottom =  '0px';
				break;
			}
		}
		
	};
	this.Show=function() {
		clearTimeout(interval);
		createOpenedHtml();
    	if(!isClose) {
			createClosedHmtl();
		}
    	if(that.settings.floatType != 1) {
			if(ie6) {
				addEvent(document,"onscroll",function() {
					var t = mybody.scrollTop;
					var mTop = (mybody.clientHeight-that.settings.height)/2,littleCloseTop = (mybody.clientHeight-that.littlesettings.height)/2;
					if(contentBagLoader && contentBagLoader.style.display=='block'){
						if(that.settings.floatPos == 2){
							contentBagLoader.style.top = t+'px';
							iframeBg.style.top = t+'px';
						}else if(that.settings.floatPos == 3){
							contentBagLoader.style.top = t+(mybody.clientHeight-that.settings.height)+'px';
							iframeBg.style.top = t+(mybody.clientHeight-that.settings.height)+'px';
						}else{
							contentBagLoader.style.top = mTop+t+'px';
							iframeBg.style.top = mTop+t+'px';
						}
					}
					if(closedLayer && closedLayer.style.display=='block'){
						if(that.littlesettings.floatPos == 1 || that.littlesettings.floatPos == 3){
							closedLayer.style.top = t+'px';
						}else if(that.littlesettings.floatPos == 2 || that.littlesettings.floatPos == 4){
							closedLayer.style.top = t+(mybody.clientHeight-that.littlesettings.height-24)+'px';
						}
					}
				});/*火狐单击弹*/
			}
		}
		setPosition();
		if(contentBagLoader && contentBagLoader.style.display=='none'){
			contentBagLoader.style.display = 'block';
			if(ie6){
				if(pos == 2){
					contentBagLoader.style.top = mybody.scrollTop+"px";
					contentBgIframe.style.top = mybody.scrollTop+"px";
				}else if(pos == 3){
					var m = mybody.clientHeight - contentBagLoader.offsetHeight+mybody.scrollTop;
					contentBagLoader.style.top = (m>0 ? m:0 )+"px";
					contentBgIframe.style.top = (m>0 ? m:0 )+"px";
				}else if(pos == 1){
					var m = (mybody.clientHeight - contentBagLoader.offsetHeight)/2+mybody.scrollTop;
					contentBagLoader.style.top = (m>0 ? m:0 )+"px";
					contentBgIframe.style.top = (m>0 ? m:0 )+"px";
				}
			}
		}
		if (closedLayer && closedLayer.style.display == "block") {
			closedLayer.style.display = "none";
		}
		if(that.settings&&that.settings.showTime) {
			_interval = setTimeout(function(){that.Hidden(false);},that.settings.showTime*1000);
		}
    };
    this.Run=function() {
    	floatType = (that.settings.floatType == 1 ? 'absolute':'fixed');
    	if(ie6){
    		floatType = "absolute";
    	}
    	interval=setTimeout(that.Show,delay);
    }
}