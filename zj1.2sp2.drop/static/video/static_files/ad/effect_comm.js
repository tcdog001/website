/*
常用页面效果,基于jquery,所有obj对象可用jquery选择器
Author: cosa
Creation Date: 2008-12-23
Updated Date:  2009-1-7
==slightbox==
属性{对象|关闭对象|不透明度[为0时不显示背景]|关闭延迟}
*/
function slightbox(obj,oclose,opacity,ctime){	
	var _this = this;
	_this.d = jQuery(obj);
	var mkdiv

	_this.cenvelop = function(){	
		if(opacity){
			mkdiv = document.createElement("div");
			jQuery(mkdiv).attr("id","win_pop_mask").css({position:"absolute",zIndex:"9998",left:"0",top:"0",background:"#000000"});			
			jQuery("body").append(jQuery(mkdiv));
			jQuery(mkdiv).css("opacity",opacity);
		}
		_this._resize();
	}
	
	_this._resize = function(){
		jQuery(mkdiv).css("height",Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight) + "px");
		jQuery(mkdiv).css("width",document.documentElement.scrollWidth + "px");
		var _x = Math.round((document.documentElement.clientWidth-this.d.width())/2);
		var _y = Math.round((document.documentElement.clientHeight-this.d.height())/2);
		_this.d.css({display:"block","position":"absolute","zIndex":"9999","left":_x+"px","top":_y+document.documentElement.scrollTop+"px"});
	}
	
	_this.closed = function(){
		jQuery(mkdiv).remove();
		_this.d.hide();
		return false;
	}
	
	var sctop = 0;
	
	jQuery(window).resize(function(){
		if(_this.d.css("display") == "none") return;
		_this._resize();
	});
	
	var top = (document.documentElement.clientHeight-this.d.height())/2;
	
	jQuery(window).scroll(function(){
		jQuery(mkdiv).css("height",Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight) + "px");
		jQuery(obj).css("top",document.documentElement.scrollTop - sctop + top + "px");	
		sctop = document.documentElement.scrollTop;
		top = parseInt(jQuery(obj).css("top"));
	});
	
	if(ctime){
		setTimeout(_this.closed, ctime)	
	}
	
	jQuery(oclose).click(function(){_this.closed();})
	
	_this.cenvelop();
}
/*
==新窗口提示==
{winopentips()}
*/
function winopentips(){
	var od = document.createElement("img");	
	jQuery(od).css({position:"absolute",top:"0",left:"0",visibility:"hidden",zIndex:"-2",width:"12px",height:"12px"});
	jQuery(od).attr({id:"hoverimg",src:"http://i3.dukuai.com/ui/style/09/ico/f02812.gif",width:"12px",height:"12px"});
	jQuery("body").append(od);
	jQuery("a").mouseover(function(){
		if(jQuery(this).attr("target") == "_blank"){
			jQuery(this).mousemove(function(event){
				var _w = jQuery(this).width();
				var _h = jQuery(this).height();	
				jQuery("#hoverimg").css({visibility:"visible",zIndex:"100"});
				if(jQuery.browser.msie){jQuery(od).css({left:event.clientX+12+"px",top:event.clientY+document.documentElement.scrollTop+15+"px"})}
				if(jQuery.browser.mozilla){jQuery(od).css({left:event.pageX+15+"px",top:event.pageY+17+"px"})}
			})
		}
	}).mouseout(function(){
		jQuery("#hoverimg").css("visibility","hidden");
	});
}
/*
==轮播{对象|对象属性}==
对象属性{宽度|高度|文字大小|自动切换时间}
*/
function dk_slideplayer(object,config){
	this.obj = object;
	this.config = config ? config : {width:"300px",height:"200px",fontsize:"12px",right:"10px",bottom:"10px",time:"5000"};
	this.pause = false;
	var _this = this;
	if(!this.config.right){
		this.config.right = "0px"
	}
	if(!this.config.bottom){
		this.config.bottom = "3px"
	}
	if(this.config.fontsize == "12px" || !this.config.fontsize){
		this.size = "12px";
		this.height = "21px";
		this.right = "6px";
		this.bottom = "10px";
	}else if(this.config.fontsize == "14px"){
		this.size = "14px";
		this.height = "23px";
		this.right = "6px";
		this.bottom = "15px";
	}
	this.count = jQuery(this.obj + " li").size();
	this.n =0;
	this.j =0;
	var t;
	this.factory = function(){
		jQuery(this.obj).css({position:"relative",zIndex:"0",margin:"0",padding:"0",width:this.config.width,height:this.config.height,overflow:"hidden"})
		jQuery(this.obj).prepend("<div style='position:absolute;z-index:20;right:"+this.config.right+";bottom:"+this.config.bottom+"'></div>");
		jQuery(this.obj + " li").css({width:"100%",height:"100%",overflow:"hidden"}).each(function(i){jQuery(_this.obj + " div").append("<a>"+(i+1)+"</a>")});

		jQuery(this.obj + " img").css({border:"none",width:"100%",height:"100%"})

		this.resetclass(this.obj + " div a",0);

		jQuery(this.obj + " p").each(function(i){			
			jQuery(this).parent().append(jQuery(this).clone(true));
			jQuery(this).html("");
			jQuery(this).css({position:"absolute",margin:"0",padding:"0",zIndex:"1",bottom:"0",left:"0",height:_this.height,width:"100%",background:"#000",opacity:"0.4",overflow:"hidden"})
			jQuery(this).next().css({position:"absolute",margin:"0",padding:"0",zIndex:"2",bottom:"0",left:"0",height:_this.height,lineHeight:_this.height,textIndent:"5px",width:"100%",textDecoration:"none",fontSize:_this.size,color:"#FFFFFF",background:"none",zIndex:"1",opacity:"1",overflow:"hidden"})
			if(i!= 0){jQuery(this).hide().next().hide()}
		});

		this.slide();
		this.addhover();
		t = setInterval(this.autoplay,this.config.time);
	}
	
	this.slide = function(){
		jQuery(this.obj + " div a").mouseover(function(){
			_this.j = jQuery(this).text() - 1;
			_this.n = _this.j;
			if (_this.j >= _this.count){return;}
			jQuery(_this.obj + " li").hide();
			jQuery(_this.obj + " p").hide();
			jQuery(_this.obj + " li").eq(_this.j).fadeIn("slow");
			jQuery(_this.obj + " li").eq(_this.j).find("p").show();
			_this.resetclass(_this.obj + " div a",_this.j);
		});
	}

	this.addhover = function(){
		jQuery(this.obj).hover(function(){clearInterval(t);}, function(){t = setInterval(_this.autoplay,_this.config.time)});
	}
	
	this.autoplay = function(){
		_this.n = _this.n >= (_this.count - 1) ? 0 : ++_this.n;
		jQuery(_this.obj + " div a").eq(_this.n).trigger('mouseover');
	}
	
	this.resetclass =function(obj,i){
		jQuery(obj).css({float:"left",marginRight:"3px",width:"15px",height:"14px",lineHeight:"15px",textAlign:"center",fontWeight:"800",fontSize:"12px",color:"#000",background:"#FFFFFF",cursor:"pointer"});
		jQuery(obj).eq(i).css({color:"#FFFFFF",background:"#FF7D01",textDecoration:"none"});
	}

	this.factory();
}
/*
选项卡|显示隐藏层
选项卡属性设置: {mobj:"#m1",mchild:"li",mclass:"tds",eobj:"#m2",echild:"div",first:"1"};
	      mobj: 触发鼠标事件
*/
function optioncard(config){
	this.config	 = config;
	var _this = this;
	
	this.resetall = function(i){
		if(!this.config.mchild && !this.config.echild){
			if(i==0){
				jQuery(_this.config.mobj).removeClass(_this.config.mclass);
				jQuery(_this.config.eobj).hide();
				return;
			}
			if(i==1){
				jQuery(_this.config.mobj).addClass(_this.config.mclass);
				jQuery(_this.config.eobj).show();
				return;
			}
		}else{
			jQuery(this.config.mobj).find(this.config.mchild).removeClass(this.config.mclass);
			jQuery(this.config.eobj).find(this.config.echild).hide();
			jQuery(this.config.mobj).find(this.config.mchild).eq(i).addClass(this.config.mclass);
			jQuery(this.config.eobj).find(this.config.echild).hide().eq(i).show();
		}
	}

	if(this.config.mchild && this.config.echild){
		if(!this.config.first) this.config.first = 1;
		this.resetall(this.config.first-1);
		jQuery(this.config.mobj).find(this.config.mchild).each(function(i){
			if("click" == _this.config.events){
				jQuery(this).click(function(){_this.resetall(i);return false;})
			}else{
				jQuery(this).mouseover(function(){_this.resetall(i);})
			}
		})
	}else{
		jQuery(this.config.mobj).hover(function(){_this.resetall(1)},function(){_this.resetall(0)});
		jQuery(this.config.eobj).hover(function(){_this.resetall(1)},function(){_this.resetall(0)});
	}	
}