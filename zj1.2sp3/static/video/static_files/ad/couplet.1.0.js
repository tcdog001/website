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