//歌曲列表
var Zzx = function(o){
	this.setting     = (typeof o === 'object') ? o : {};
	this.target 	 = this.setting.target || 'newSong';
	this.type        = typeof this.setting.type === 'number' ? this.setting.type : parseInt(this.setting.type);
	this.firstCount  = typeof this.setting.firstCount === 'number' ? this.setting.firstCount : parseInt(this.setting.firstCount);
	this.Count  	 = typeof this.setting.Count === 'number' ? this.setting.Count : parseInt(this.setting.Count);
	this.content     = $("#content");					
	//初始化
	this.init();		
}

Zzx.prototype ={
	init:function(){
		//列表初始化
		this.content.html("");
		//堆栈指针初始化
		this.stack = 0;
		//图片路径
		this.imgPath = '/resource/music/kugou/20150106/';		
		//定时器
		this.timer = null;			
		//测试JSON数据（可以替换为AJAX请求返回值）
		this.testJson = {
						list:[
						
{src:"congcongnanian.jpg",title:"\u738B\u83F2\uFF0D\u5306\u5306\u90A3\u5E74",song:"congcongnanian.mp3"},{src:"xiaopingguo.jpg",title:"\u7B77\u5B50\u5144\u5F1F\uFF0D\u5C0F\u82F9\u679C",song:"xiaopingguo.mp3"},{src:"xihuanni.jpg",title:"\u9093\u7D2B\u68CB\uFF0D\u559C\u6B22\u4F60",song:"xihuanni.mp3"},{src:"canglangzhige.jpg",title:"\u6C6A\u5CF0\uFF0D\u6CA7\u6D6A\u4E4B\u6B4C",song:"canglangzhige.mp3"},{src:"pingfanzhilu.jpg",title:"\u6734\u6811\uFF0D\u5E73\u51E1\u4E4B\u8DEF",song:"pingfanzhilu.mp3"},{src:"geiwoyigeliyouwangji.jpg",title:"A-Lin - \u7ED9\u6211\u4E00\u4E2A\u7406\u7531\u5FD8\u8BB0",song:"geiwoyigeliyouwangji.mp3"},{src:"wigglewiggle.jpg",title:"Hello Venus - Wiggle Wiggle",song:"wigglewiggle.mp3"},{src:"wenshijian.jpg",title:"\u9648\u7FD4 - \u95EE\u4E16\u95F4",song:"wenshijian.mp3"},{src:"chongdong.jpg",title:"\u8521\u5065\u96C5 - \u51B2\u52A8",song:"chongdong.mp3"},{src:"xiaobai.jpg",title:"\u540E\u5F26 - \u5C0F\u767D",song:"xiaobai.mp3"},{src:"machine.jpg",title:"EXO - Machine",song:"machine.mp3"},{src:"youaijiubupa.jpg",title:"\u5E84\u5FC3\u598D - \u6709\u7231\u5C31\u4E0D\u6015",song:"youaijiubupa.mp3"},{src:"qianqiu.jpg",title:"\u5B59\u6960 - \u5343\u79CB",song:"qianqiu.mp3"},{src:"qinaide.jpg",title:"\u5218\u5FB7\u534E - \u4EB2\u7231\u7684",song:"qinaide.mp3"},{src:"huozhe.jpg",title:"\u90DD\u4E91 - \u6D3B\u7740",song:"huozhe.mp3"},{src:"wodeshijie.jpg",title:"\u591A\u4EAE - \u6211\u7684\u4E16\u754C",song:"wodeshijie.mp3"},{src:"nideshijie.jpg",title:"EXO - \u4F60\u7684\u4E16\u754C",song:"nideshijie.mp3"},{src:"dongdeziji.jpg",title:"\u6768\u4E1E\u7433 - \u61C2\u5F97\u81EA\u5DF1",song:"dongdeziji.mp3"},{src:"piaoyangguohailaikanni.jpg",title:"\u674E\u5B97\u76DB - \u6F02\u6D0B\u8FC7\u6D77\u6765\u770B\u4F60",song:"piaoyangguohailaikanni.mp3"},{src:"caibutou.jpg",title:"\u4E01\u5F53 - \u731C\u4E0D\u900F",song:"caibutou.mp3"},{src:"lucky.jpg",title:"EXO - Lucky",song:"lucky.mp3"},{src:"letitgo.jpg",title:"\u6797\u5FD7\u70AB - Let It Go",song:"letitgo.mp3"},{src:"lianaigeyan.jpg",title:"\u5D14\u6012 - \u604B\u7231\u683C\u8A00",song:"lianaigeyan.mp3"},{src:"tianchuang.jpg",title:"\u5F20\u656C\u8F69\u3001\u5BB9\u7956\u513F - \u5929\u7A97",song:"tianchuang.mp3"},{src:"beiershuang.jpg",title:"\u5927\u5F20\u4F1F - \u500D\u513F\u723D",song:"beiershuang.mp3"},{src:"youjiancuiyan.jpg",title:"\u9093\u4E3D\u541B\uFF0D\u53C8\u89C1\u708A\u70DF",song:"youjiancuiyan.mp3"},{src:"cengjingdeni.jpg",title:"\u8BB8\u5DCD\u3001\u738B\u5EFA\u623F - \u66FE\u7ECF\u7684\u4F60",song:"cengjingdeni.mp3"},{src:"dida.jpg",title:"\u6881\u5FC3\u9890 - \u6EF4\u7B54",song:"dida.mp3"},{src:"xinniandaji.jpg",title:"\u7F57\u5BBE - \u65B0\u5E74\u5927\u5409",song:"xinniandaji.mp3"},{src:"buliaoqing.jpg",title:"\u738B\u97F5\u58F9 - \u4E0D\u4E86\u60C5",song:"buliaoqing.mp3"},{src:"gaizenmeban.jpg",title:"\u5B59\u5B50\u6DB5 - \u8BE5\u600E\u4E48\u529E",song:"gaizenmeban.mp3"},{src:"woaini.jpg",title:"\u9EC4\u7F8E\u73CD - \u6211\u7231\u4F60",song:"woaini.mp3"},{src:"nidetianmi.jpg",title:"\u8303\u6653\u8431 - \u4F60\u7684\u751C\u871C",song:"nidetianmi.mp3"},{src:"chuzhongmoyang.jpg",title:"\u5B59\u5B50\u6DB5 - \u521D\u8877\u6A21\u6837",song:"chuzhongmoyang.mp3"},{src:"nvrenhua.jpg",title:"\u6885\u8273\u82B3 - \u5973\u4EBA\u82B1",song:"nvrenhua.mp3"},{src:"woshou.jpg",title:"\u7EB5\u8D2F\u7EBF - \u63E1\u624B",song:"woshou.mp3"},{src:"jiandan.jpg",title:"\u9EC4\u4E49\u8FBE - \u7B80\u5355",song:"jiandan.mp3"},{src:"taotai.jpg",title:"\u9648\u5955\u8FC5\u3001\u5468\u6770\u4F26 - \u6DD8\u6C70",song:"taotai.mp3"},{src:"nishirucinanyiwangji.jpg",title:"\u674E\u5B87\u6625 - \u4F60\u662F\u5982\u6B64\u96BE\u4EE5\u5FD8\u8BB0",song:"nishirucinanyiwangji.mp3"},{src:"xiangnile.jpg",title:"\u5B59\u9752 - \u60F3\u4F60\u4E86",song:"xiangnile.mp3"},{src:"zaiailidengni.jpg",title:"\u6768\u5CF0 - \u5728\u7231\u91CC\u7B49\u4F60",song:"zaiailidengni.mp3"},{src:"lvcheng.jpg",title:"\u9648\u5347\uFF0D\u65C5\u7A0B",song:"lvcheng.mp3"},{src:"fanxing.jpg",title:"\u81F3\u4E0A\u52B1\u5408\uFF0D\u7E41\u661F",song:"fanxing.mp3"},{src:"yuguozhihou.jpg",title:"\u5218\u5FC3\uFF0D\u96E8\u8FC7\u4E4B\u540E",song:"yuguozhihou.mp3"},{src:"xiangsiyin.jpg",title:"\u8463\u8D1E\uFF0D\u76F8\u601D\u5F15",song:"xiangsiyin.mp3"},{src:"qinshi.jpg",title:"\u97F3\u9891\u602A\u7269\uFF0D\u7434\u5E08",song:"qinshi.mp3"},{src:"zenmechangqingge.jpg",title:"\u5218\u60DC\u541B\uFF0D\u600E\u4E48\u5531\u60C5\u6B4C",song:"zenmechangqingge.mp3"},{src:"nanian.jpg",title:"\u4EFB\u7136\uFF0D\u90A3\u5E74",song:"nanian.mp3"},{src:"yigerendejie.jpg",title:"\u6B22\u5B50\uFF0D\u4E00\u4E2A\u4EBA\u7684\u8857",song:"yigerendejie.mp3"},{src:"beiweidechengnuo.jpg",title:"\u4E54\u6D0B\uFF0D\u5351\u5FAE\u7684\u627F\u8BFA",song:"beiweidechengnuo.mp3"}

							]
						}
		this.createList(true);
		this.addHandle();
	},
	
	//创建内容列表
	createList:function(boolen){		
		//boolen:true/false确定是否初次载入，
		this.ulNode = document.createElement("ul");
		this.ulNode.id = this.target+"list";
		this.content.append(this.ulNode);
		this.ulTarget = $("#"+this.ulNode.id);
		this.createMore();
		this.loadList(boolen);
	},
	
	//创建更多按钮
	createMore:function(){	
		this.moreNode = document.createElement("div");
		this.moreNode.className = 'm';
		this.moreNode.innerHTML = '更多';
		this.moreNode.id = this.target+'more';
		this.moreTarget = $("#"+this.moreNode.id);
	},
	
	//加载列表	
	loadList:function(boolen){		
		var oList = this.testJson.list;
		var oLength;		
		if(boolen){  //计算加载歌曲数
			oLength = oList.length > this.firstCount ? this.firstCount: oList.length;			
		}else{
			oLength = (oList.length-this.stack) > this.Count ? this.Count: (oList.length-this.stack);				
		}	
		if(oLength<=0){
			this.moreTarget.text("这是最后一页了！");
		};
		
		if(!this.moreTarget[0]){
			this.content.append(this.moreNode);				
		};
		
		for(var i = 0 ; i < oLength ; i++){				
			this.loadDate(oList);
		}
		
	},
	
	//加载列表数据	
	loadDate:function(oList){			
		switch(this.type){  
			//根据不同的模块 定制不同的数据展示形式
			case 1:this.ulTarget.append('<li onclick="myControl.selectList(this,'+this.stack+')">'
									  + '<div class="frmPlay"><i></i></div>'
									  + '<span style="display:none;" class="musicData" pic='+oList[this.stack].src+' title='+oList[this.stack].title+' value='+oList[this.stack].song+'></span>'
									  + '<div class="l"><img class="picStyle" src="'+this.imgPath+oList[this.stack].src+'"/></div>'
									  + '<div class="textBox">'+oList[this.stack].title+'<p>e路网</p></div>'
									  + '</li>');
										break;
			case 2:this.content[0].innerHTML  = '此模块建设中...';
										break;
			default :alert("该模块出错！");
		}
		this.stack+=1;
	},
	
	//绑定事件
	addHandle:function(){
		var that = this;
		$("#"+this.moreNode.id).bind('click',function(){
			//加载更多列表
			that.createList(false);
		});
	}
	
}
//播放器控制面板	
var Control = function(o){
	this.setting         = (typeof o === 'object')? o : {};		
	this.audio           = this.setting.audio;
	this.progressWrap    = this.setting.progressWrap;
	this.playModeNode    = this.setting.playModeNode;
	this.playBtn         = this.setting.playBtn;
	this.playTitle       = this.setting.playTitle;
	this.singerHead      = this.setting.singerHead;
	this.progress        = this.setting.progress;
	this.oWinObj         = this.setting.oWinObj;
	this.allTimeNode     = this.setting.allTimeNode;	  
	this.currentTimeNode = this.setting.currentTimeNode;  
	this.path            = '/resource/music/kugou/20150106/';  //歌曲路径（相对于html）
	this.imgPath         = '/resource/music/kugou/20150106/';   //图片路径（相对于html）
	this.init();
}

Control.prototype = {	
	//初始化
	init:function(){
		//播放控制	
		this.start = true;
		//定时器
		this.timer = null;				
		this.audio.src = null;			
		//可选播放模式
		this.ModeData = [
			{mode:'default',text:'顺序播放模式'},
			{mode:'random',text:'随机播放模式'},
			{mode:'single',text:'单曲循环模式'}
		];
		//默认播放模式
		this.ModeIndex = 0;
		this.playMode = this.ModeData[this.ModeIndex].mode;	
	},
	
	//选择歌曲列表
	selectList:function(_this,stack){	
		var allow = true;
		var index = null;
		this.oLi = _this;
		this.oUl = _this.parentNode;	
		if(index == stack && !this.start ){
			allow = false;
		}
		index = stack;
		this.loadMusic();
		if(allow){
			this.goPlay();
		}else{
			this.goPause();
		}											
	},
	
	//上一首
	prev:function(){
		if(this.oLi.previousSibling!=null){	
			this.oLi = this.oLi.previousSibling;
			this.loadMusic();
		}else{
			this.oWindow("已经是第一首了哦！");
		}
		this.goPlay();
	},
	
	//主控
	mainControl:function(){
		if(this.start){
			this.goPlay();
		}else{
			this.goPause();
		}	
	},
	
	//下一首
	next:function(){
		if(this.oLi.nextSibling!=null){
			this.oLi = this.oLi.nextSibling;
			this.loadMusic();
		}else{
			this.oWindow("已经是最后一首了哦！")
		}
		this.goPlay();
	},
	
	//播放模式选择
	selectMode:function(){
		this.ModeIndex = (this.ModeIndex<(this.ModeData.length-1))?(this.ModeIndex+1):0;
		this.playMode = this.ModeData[this.ModeIndex].mode;
		this.oWindow(this.ModeData[this.ModeIndex].text);
		this.playModeNode.attr("class","mode-"+this.playMode);
	},
	
	//播放进度选择
	selectTime:function(event){
		var moveTo = event.pageX - this.progressWrap.offset().left;
		this.audio.currentTime = moveTo/parseInt(this.progressWrap.css("width"))*this.audio.duration;
		this.progress.css("width",moveTo+"px");
	},
	
	//自动播放
	autoPlay:function(){
		//监听歌曲结束
		var that = this;
		this.audio.addEventListener('ended', function () {
			if(typeof that.playMode==='string')
			{	//播放模式判断	
				switch(that.playMode){
					case 'default': that.oLi = (that.oLi.nextSibling!=null)?that.oLi.nextSibling:that.oUl.childNodes[0];
									break;
					 case 'random': that.oLi = that.oUl.childNodes[Math.round(Math.random()*(that.oUl.childNodes.length-1))];
									break;
					 case 'single': ;
						   default: ;
				}
				that.loadMusic();
				that.goPlay();
			}else{
				that.oWindow("循环类型不符!");		
			}
		},false);
	},
	
	//加载要播放的歌曲
	loadMusic:function(){
			$obj = $(this.oLi)
			var song = $obj.find(".musicData").attr("value");	
			var pic = $obj.find(".musicData").attr("pic");
			var title = $obj.find(".musicData").attr("title");
			this.singerHead.attr("src",this.imgPath + pic)
			this.audio.src = this.path + song;// +'.mp3'
			this.playTitle.html(title);
	},
	
	//判断当前是否歌曲列表
	songReady:function(){
		if(!this.audio.src){
			this.oWindow("请先选择歌曲！")
			return false;
		}else{
			return true;
		}
	},
	
	//转换为时间格式
	timeDispose:function (number) {
		var minute = parseInt(number / 60);
		var second = parseInt(number % 60);
		minute = minute >= 10 ? minute : "0" + minute;
		second = second >= 10 ? second : "0" + second;
		return minute + ":" + second;
	},	
	
	//自定义提示框
	oWindow:function(oText){
		this.oWinObj.show();
		this.oWinObj.html(oText);
		var doc = document.documentElement;
		var oWinX = (doc.clientWidth - this.oWinObj[0].offsetWidth)/2;
		var oWinY = (doc.clientHeight - this.oWinObj[0].offsetHeight-50)/2;
		this.oWinObj.css('left',oWinX+'px');
		this.oWinObj.css('top',oWinY+'px');
		var _this = this;
		setTimeout(function(){_this.oWinObj.hide();},1000)
	},
	
	//播放时间
	oTime:function(){
		if(this.audio.readyState >=4){
			var currentProgress = Math.round(this.audio.currentTime/this.audio.duration*parseInt(this.progressWrap.css("width")));
			this.progress.css("width",currentProgress+"px");
			this.allTimeNode.html(this.timeDispose(this.audio.duration));
			this.currentTimeNode.html(this.timeDispose(this.audio.currentTime));
		}
	},
	
	//播放
	goPlay:function(){
		if(this.songReady()){		
			this.audio.play();
			var _this = this;
			this.goPlayStyle();
			this.timer = setInterval(function(){_this.oTime()},1000)
			this.start = false;
			this.autoPlay();
		}
	},
	
	//暂停
	goPause:function(){
		this.audio.pause();
		this.goPauseStyle();
		clearInterval(this.timer);
		this.start = true;
	},
	
	//播放样式
	goPlayStyle:function(){
		var $oLiIndex = $(this.oLi);
		$(".frmPause").removeClass("frmPause");
		$oLiIndex.find(".frmPlay").addClass("frmPause");				
		this.playBtn.addClass("pause");
		this.playBtn.removeClass("play");
	},
	
	//暂停样式
	goPauseStyle:function(){
		var $oLiIndex = $(this.oLi);
		$(".frmPause").removeClass("frmPause");
		this.playBtn.addClass("play");
		this.playBtn.removeClass("pause");	
	}			
}

function ZzxMusic(){

	var aa={};
	//模块设置
	var setting = {
		newSong:{'target':'newSong','type':'1','firstCount':50,'Count':5},//50意思是 初次载入显示50条，点击更多一次现实5条
		songCharts:{'target':'newSong','type':'1','firstCount':2,'Count':4},
		singer:{'target':'newSong','type':'1','firstCount':8,'Count':7},
		radioStation:{'target':'newSong','type':'1','firstCount':9,'Count':2}
	};
	
	//默认加载模块
	aa.newSong = new Zzx(setting.newSong);	
	
	//模块初始化
	$(".menu_tagList").children("li").bind('click',function(){
		for(var i in setting){
			if($(this).attr("id")==i){
				if(typeof aa[i]==='undefined'){
					aa[i] = new Zzx(setting[i]);
				}else{
					aa[i].init();
				}				
			}
		}
		$(".menu_hover").removeClass("menu_hover");
		$(this).addClass("menu_hover");
	})		
}

//实例化控制台
var myControl = new Control({
			 audio : document.getElementById("myMusic"), //播放器
	  playModeNode : $("#modeButton"),	 //模式选择按钮
		   playBtn : $("#playButton"),   //主控按钮
		 playTitle : $("#musicTitle"),   //歌曲TITLE容器
		singerHead : $("#singerHead"),   //歌曲插图容器
	  progressWrap : $("#progressWrap"), //歌曲进度条容器
		  progress : $("#progress"),     //歌曲进度条
		   oWinObj : $("#oWindow"),		 //警告窗容器
	   allTimeNode : $("#totleTime"),    //当前时间容器
   currentTimeNode : $("#currentTime")   //当前时间容器
});	

ZzxMusic();