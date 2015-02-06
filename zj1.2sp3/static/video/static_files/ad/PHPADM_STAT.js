;function PHPADM_XmlHttpRequest(url,bannerinfoSet)
{
	var xmlHttp=null;
	if (window.XMLHttpRequest)
	{
		xmlHttp=new XMLHttpRequest();
	}
	else
	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}   
    xmlHttp.open("post",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send("bannerinfoSet="+bannerinfoSet);
}
;function PHPADM_ReloadZoneCode()
{
	var addListener = window.addEventListener ?
	function(el, type, fn) { el.addEventListener(type, fn, false); } :
	function(el, type, fn) { el.attachEvent('on' + type, fn); };
	var bannerinfoSet="";
	var bannerinfo=new Array();
	var zones=document.getElementsByName("PHPADM_ZONE_NAME");
	var zonesLength=zones.length;
	for(var i=0;i<zonesLength;i++){
		bannerinfo[i]=zones[i].getAttribute("bannerinfo");
		addListener(zones[i], 'click', function() {
			PHPADM_XmlHttpRequest("http://phpad.stat.com/adclick.php",this.getAttribute("bannerinfo"));
		});
	}
	bannerinfoSet="["
	for (var i = 0; i < zonesLength; i++) {
		bannerinfoSet+=bannerinfo[i]+",";
	};
	bannerinfoSet=bannerinfoSet.substr(0, bannerinfoSet.length-1);
	bannerinfoSet+="]";
	url="http://phpad.stat.com/adlog.php";
	PHPADM_XmlHttpRequest(url,bannerinfoSet);
};
