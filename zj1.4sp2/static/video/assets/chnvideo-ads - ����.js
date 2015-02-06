function chnvideo_html5(json_url,log_options) {
    var json_url = json_url;
    var log_options = log_options;
    var ad_url;
    var ad_log_url;
    var player_content_type;
    //请求广告json文件，获取广告信息
    var ajax = new AjaxObj();
    ajax.swRequest({
        method:"GET",
        sync:false,
        url:json_url,
        success: function(msg) {
            ad_url = msg.start_AD.resource[0].address;
            ad_log_url = msg.start_AD.resource[0].logurl;
        },
        failure: function(a) {
        }
    });
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
 * example:
 * {
 *      video_content_url:"http://192.168.1.92:1972/bus/demovideo/a.mp4",  // 主视频url
 *      ad_json_url:"http://192.168.1.92:1972/bus/2-2001.json"  // 广告列表json文件url
 * }
 */
function Chnvideo_player(options) {
    var _player_id = "chnvideo_html5_player";
    var _video_content_url = options.video_content_url;
    var _ad_json_url = options.ad_json_url;
    var _log_options = options.log_options;
    this.create_player = function(player_box_id) {
        var player_box_el = document.getElementById(player_box_id);
        var player_html_str = '<video  id="'+ _player_id + '" class="video-js vjs-default-skin vjs-big-play-centered"\
                               controls="controls" preload="auto" width="600" height="480" data-setup="{}">\
                                <source src="' + _video_content_url + '" type="video/mp4" />\
                                </video>';
        player_box_el.outerHTML = player_html_str;
        var my_vjs = videojs(_player_id);
        my_vjs.ready(function(){
            var player = this;
            player.chnvideo_html5(_ad_json_url,_log_options);
        });
    }
}
