(function() {
   /**
    * 观止创想广告播放器插件
    * @param log_options 视频播放统计需要的外部参数
    * example:
    * log_options : {
    *     video_id : 100,
    *     video_title : "测试",
    *     category_id : 3,
    *     video_category : "新闻",
    *     bus_id : "1"
    * }
    * @param ad_options
    * example:
    * {
    *     ad_url : "/static_files/materials/60/jiaduobao_15s.mp4",
    *     ad_log_url : "/adlog.php?bannerid=76&amp;clientid=0&amp;zoneid=16&amp;block=0&amp;capping=0&amp;cb=46885717d6f344da6ae36b7a9a56e595"
    * }
    */
    function chnvideo_html5(log_options,ad_options) {
        var log_options = log_options;
        var ad_url = ad_options.ad_url;
        var ad_log_url = ad_options.ad_log_url;
        var player_content_type;

        var player = this;
        player.ads();
        player.on('contentupdate', function() {
            player.trigger('adsready');
        });

        player.on('readyforpreroll', function() {
            player.ads.startLinearAdMode();
            player.src(ad_url);

            player.one('durationchange', function() {
                player.play();
                player_content_type = 'ad';
                var ad_analysis_url = "/at.gif?" + ad_log_url;
                //广告播放统计
                pingback(ad_analysis_url);
            });
            player.one('ended', function() {
                player.ads.endLinearAdMode();
                player_content_type = 'video';
            });
        });
        var current_date = new Date();
        //当前时间戳就代表了一个用户的一次播放（同一个用户不会同一时刻播放两个视频）
        var sid = current_date.getTime();
        var video_log_ajax = new AjaxObj();
        setInterval(function() {
            if(player_content_type == 'video') {
                var fingerprint = new Fingerprint().get();
                var chnvideo_analysis_url = "/vt.gif?id=" + log_options.video_id + "&udid=" + fingerprint + "&sid=" + sid + "&title=" + log_options.video_title + "&cid=" + log_options.category_id + "&cat=" + log_options.video_category + "&bus=" + log_options.bus_id + "&ct=" + player.currentTime();
                //视频播放统计
                pingback(chnvideo_analysis_url);
            }
        },5000);
    };
    videojs.plugin('chnvideo_html5', chnvideo_html5);

   /**
    * 统计模块汇报函数
    * @param url 1像素的汇报图片地址
    */
    function pingback(url) {
        var el = document.createElement('img');
        el.setAttribute('style','display:none');
        el.async = true;
        el.src = url;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(el);
    }

   /**
    * ajax构造函数
    */
    function AjaxObj() {
        this.xmlHttp = null;
        this.Request = function(method, url, data, callback, sync) {
            if (window.ActiveXObject) {
                this.xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
            } else if (window.XMLHttpRequest) {
                this.xmlHttp = new XMLHttpRequest();
                if (this.xmlHttp.overrideMimeType) {
                    this.xmlHttp.overrideMimeType('text/xml');
                }
            }
            if (this.xmlHttp) {
                var self = this;
                if (callback)
                    this.xmlHttp.onreadystatechange = function(){callback(self.xmlHttp);};
                else
                    this.xmlHttp.onreadystatechange = function(){return;};
                if (!method)
                    method = "POST";
                method = method.toUpperCase();
                if (method == 'GET') {
                    this.xmlHttp.open('GET', url + ((typeof data=="string")?('?' + data):""), typeof sync == "boolean" ? sync : true);
                    this.xmlHttp.send(null);
                } else {
                    this.xmlHttp.open('POST', url, typeof sync == "boolean" ? sync : true);
                    this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    this.xmlHttp.send(data);
                }
            }
        };
        this.abort = function() {
            if (this.xmlHttp)
                this.xmlHttp.abort();
        };
        this.swRequest = function(cfg){
            if(!cfg.url)
            {
                return;
            }
            this.Request(cfg.method||"POST",cfg.url||"",cfg.data,function(req){
                if(req.readyState==4){
                    if(req.status==200 || req.status==0) {
                        var obj = null;
                        var text = req.responseText;
                        eval("obj = "+ text);
                        cfg.success.call(cfg.soap || this,obj);
                        return;
                    }
                    else {
                        cfg.failure.call(cfg.soap || this,"错误!");
                        return;
                    }
                }
            });
        };
    }

   /**
    * html5播放器构造函数
    * @param options
    *
    * example:
    * {
    *     video_content_url : "http://192.168.1.92:1972/demo/demovideo/a.mp4",
    *     ad_json_url : "http://192.168.1.92:1972/static_files/vms_zones/2-2001.json",
    *     log_options : {
    *         video_id : 100,
    *           video_title : "测试",
    *         category_id : 3,
    *         video_category : "新闻",
    *         bus_id : "1"
    *     }
    * }
    */
    window.Chnvideo_player = function(options) {
        // 设置播放器id
        var _player_id = "chnvideo_html5_player";
        // 视频文件url
        var _video_content_url = options.video_content_url;
        // 广告json文件url
        var _ad_json_url = options.ad_json_url;
        // 统计模块使用的参数对象
        var _log_options = options.log_options;

        // 公有方法，用于创建播放器
        this.create_player = function(player_box_id) {
            var player_box_el = document.getElementById(player_box_id);
            var player_html_str = '<video  id="'+ _player_id + '" class="video-js vjs-default-skin vjs-big-play-centered"\
                               controls="controls" autoplay preload="auto" width="300" height="170" data-setup="{}">\
                                <source src="' + _video_content_url + '" type="video/mp4" />\
                                </video>';
            // 在页面上生成html5播放器
            player_box_el.outerHTML = player_html_str;

            // videojs方法，用于注册videojs
            var my_vjs = videojs(_player_id);
            my_vjs.ready(function(){
                var player = this;
                //请求广告json文件，获取广告信息
                var ajax = new AjaxObj();
                ajax.swRequest({
                    method:"GET",
                    sync:false,
                    url:_ad_json_url,
                    success: function(msg) {
                        ad_options = {
                            ad_url : msg.start_AD.resource[0].address,
                            ad_log_url : msg.start_AD.resource[0].logurl
                        }
                        player.chnvideo_html5(_log_options,ad_options);
                    },
                    failure: function(a) {
                    }
                });
            });
        }
    }
}());
