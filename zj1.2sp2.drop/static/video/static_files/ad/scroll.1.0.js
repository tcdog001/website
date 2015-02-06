function phpadGetElement(_id) {
    return (document.getElementById) ? document.getElementById(_id) : document.all[_id];
}
var phpadStartScroll = {};
phpadStartScroll.scrollObj = {};
phpadStartScroll.phpadScrollInit = function() {
    for (var i = 0; i < arguments.length; i++) {
        phpadStartScroll.scrollObj[arguments[i]] = phpadGetElement(arguments[i]);
        if (phpadStartScroll.scrollObj[arguments[i]] == null) continue;
        phpadStartScroll.scrollObj[arguments[i]]._scrolldelay = Math.max(parseFloat(phpadStartScroll.scrollObj[arguments[i]].getAttribute("delay") || 0) * 1000, 0);
        phpadStartScroll.scrollObj[arguments[i]]._orienStr = (phpadStartScroll.scrollObj[arguments[i]].getAttribute("orien") || "auto").toUpperCase();
        phpadStartScroll.scrollObj[arguments[i]]._inTimer = null;
        phpadStartScroll.scrollObj[arguments[i]]._outTimer = null;
        phpadStartScroll.scrollObj[arguments[i]]._hover = false;
        phpadStartScroll.scrollObj[arguments[i]].scrDivs = new Array();
        phpadStartScroll.scrollObj[arguments[i]]._nextItemIndex = 0;
        phpadStartScroll.scrollObj[arguments[i]]._activeItem;
        phpadStartScroll.scrollObj[arguments[i]]._statue = 0;
        phpadStartScroll.scrollObj[arguments[i]]._percent = 10;
        phpadStartScroll.scrollObj[arguments[i]]._stepLength = 2;
        phpadStartScroll.scrollObj[arguments[i]]._moveSpeedDelay = 100;
        phpadStartScroll.scrollObj[arguments[i]].onmouseover = function() {
            this._hover = true;
        }
        phpadStartScroll.scrollObj[arguments[i]].onmouseout = function() {
            this._hover = false;
        }
        phpadStartScroll.scrollObj[arguments[i]].getNextItemIndex = function(offset) {
            return (this._nextItemIndex + offset) % this.scrDivs.length;
        }
        phpadStartScroll.scrollObj[arguments[i]].setOrien = function() {
            if (this._orienStr == "UP") {
                this._orientation = 1;
            } else if (this._orienStr == "RIGHT") {
                this._orientation = 2;
            } else if (this._orienStr == "DOWN") {
                this._orientation = 3;
            } else if (this._orienStr == "LEFT") {
                this._orientation = 4;
            } else if (this._orienStr == "LU") {
                this._orientation = 5;
            } else if (this._orienStr == "RU") {
                this._orientation = 6;
            } else if (this._orienStr == "RD") {
                this._orientation = 7;
            } else if (this._orienStr == "LD") {
                this._orientation = 8;
            } else if (this._orienStr == "AUTO1") {
                this._orientation = Math.floor(Math.random() * 4) + 1;
            } else if (this._orienStr == "AUTO2") {
                this._orientation = Math.floor(Math.random() * 4) + 5;
            } else if (this._orienStr == "AUTO") {
                this._orientation = Math.floor(Math.random() * 8) + 1;
            } else {
                this._orientation = Math.floor(Math.random() * 8) + 1;
            }
        }
        var divs = phpadStartScroll.scrollObj[arguments[i]].getElementsByTagName("div");
        var divIndex = 0;
        for (var di = 0; di < divs.length; di++) {
            if (divs[di].className == "scrollItem") {
                divs[di]._index = divIndex;
                divs[di]._scrolldelay = divs[di].getAttribute("delay") ? (parseFloat(divs[di].getAttribute("delay")) * 1000) : phpadStartScroll.scrollObj[arguments[i]]._scrolldelay;
                divs[di]._top = 0;
                divs[di]._left = 0;
                divs[di].style.visibility = "visible";
                divs[di]._percentLocal = phpadStartScroll.scrollObj[arguments[i]]._percent;
                if (divIndex == 0) {
                    phpadStartScroll.scrollObj[arguments[i]]._activeItem = divs[di];
                    divs[di]._percentLocal = -2;
                    divs[di].style.left = 0;
                    divs[di].style.top = 0;
                }
                divs[di].setLocal = function() {
                    switch (this.parentNode._orientation) {
                    case 1:
                        this.style.left = 0;
                        this.style.top = this.parentNode.offsetHeight + "px";
                        break;
                    case 2:
                        this.style.left = -this.offsetWidth + "px";
                        this.style.top = 0;
                        break;
                    case 3:
                        this.style.left = 0;
                        this.style.top = -this.offsetHeight + "px";
                        break;
                    case 4:
                        this.style.left = this.parentNode.offsetWidth + "px";
                        this.style.top = 0;
                        break;
                    case 5:
                        this.style.left = this.parentNode.offsetWidth + "px";
                        this.style.top = this.parentNode.offsetHeight + "px";
                        break;
                    case 6:
                        this.style.left = -this.offsetWidth + "px";
                        this.style.top = this.parentNode.offsetHeight + "px";
                        break;
                    case 7:
                        this.style.left = -this.offsetWidth + "px";
                        this.style.top = -this.offsetHeight + "px";
                        break;
                    case 8:
                        this.style.left = this.parentNode.offsetWidth + "px";
                        this.style.top = -this.offsetHeight + "px";
                    }
                }
                divs[di].scrollIN = function() {
                    if (! (this.parentNode._hover && this.parentNode._statue == 0)) {
                        var percent = this.parentNode._percent;
                        if (this._percentLocal >= 0) {
                            this.parentNode._statue = 1;
                            var orien = this.parentNode._orientation;
                            if (orien == 1) {
                                this.style.top = (this.parentNode.offsetHeight * (this._percentLocal / percent)) + "px";
                            } else if (orien == 2) {
                                this.style.left = (this.parentNode.offsetWidth * ((percent - this._percentLocal) / percent)) - this.offsetWidth + "px";
                            } else if (orien == 3) {
                                this.style.top = ((this.parentNode.offsetHeight) * ((percent - this._percentLocal) / percent)) - this.offsetHeight + "px";
                            } else if (orien == 4) {
                                this.style.left = (this.parentNode.offsetWidth * (this._percentLocal / percent)) + "px";
                            } else if (orien == 5) {
                                this.style.top = (this.parentNode.offsetHeight * (this._percentLocal / percent)) + "px";
                                this.style.left = (this.parentNode.offsetWidth * (this._percentLocal / percent)) + "px";
                            } else if (orien == 6) {
                                this.style.top = (this.parentNode.offsetHeight * (this._percentLocal / percent)) + "px";
                                this.style.left = (this.parentNode.offsetWidth * ((percent - this._percentLocal) / percent)) - this.offsetWidth + "px";
                            } else if (orien == 7) {
                                this.style.left = (this.parentNode.offsetWidth * ((percent - this._percentLocal) / percent)) - this.offsetWidth + "px";
                                this.style.top = ((this.parentNode.offsetHeight) * ((percent - this._percentLocal) / percent)) - this.offsetHeight + "px";
                            } else if (orien == 8) {
                                this.style.top = ((this.parentNode.offsetHeight) * ((percent - this._percentLocal) / percent)) - this.offsetHeight + "px";
                                this.style.left = (this.parentNode.offsetWidth * (this._percentLocal / percent)) + "px";
                            }
                            this._percentLocal -= this.parentNode._stepLength;
                        }
                    }
                    if (this._percentLocal > -this.parentNode._stepLength) {
                        this.parentNode._inTimer = window.setTimeout("phpadStartScroll.scrollObj['" + this.parentNode.id + "'].scrDivs[" + this._index + "].scrollIN()", this.parentNode._moveSpeedDelay);
                    } else {
                        this._percentLocal = 0;
                        window.clearTimeout(this.parentNode._inTimer);
                        this.parentNode._statue = 0;
                        this._top = parseInt(this.style.top) || 0;
                        this._left = parseInt(this.style.left) || 0;
                        this.parentNode._nextItemIndex = this.parentNode.getNextItemIndex(1);
                        this.parentNode.setOrien();
                        this.parentNode.scrDivs[this.parentNode._nextItemIndex].setLocal();
                        if (this.parentNode._nextItemIndex != this._index) {
                            window.setTimeout("phpadStartScroll.scrollObj['" + this.parentNode.id + "'].scrDivs[" + this._index + "].scrollOUT()", this._scrolldelay);
                            window.setTimeout("phpadStartScroll.scrollObj['" + this.parentNode.id + "'].scrDivs[" + this.parentNode._nextItemIndex + "].scrollIN()", this._scrolldelay);
                        }
                    }
                }
                divs[di].scrollOUT = function() {
                    var percent = this.parentNode._percent;
                    if (! (this.parentNode._hover && this.parentNode._statue == 0)) {
                        this.parentNode._statue = 1;
                        var orien = this.parentNode._orientation;
                        if (this._percentLocal <= percent) {
                            if (orien == 1) {
                                this.style.top = ( - (this._percentLocal / percent * (this.offsetHeight + this._top)) - 6) + "px";
                            } else if (orien == 2) {
                                this.style.left = this._left + ((this._percentLocal / percent * (this.parentNode.offsetWidth - this._left)) + 6) + "px";
                            } else if (orien == 3) {
                                this.style.top = this._top + ((this._percentLocal / percent * (this.parentNode.offsetHeight - this._top)) + 6) + "px";
                            } else if (orien == 4) {
                                this.style.left = ( - (this._percentLocal / percent * (this.offsetWidth + this._left)) - 6) + "px";
                            } else if (orien == 5) {
                                this.style.top = ( - (this._percentLocal / percent * (this.offsetHeight + this._top)) - 6) + "px";
                                this.style.left = ( - (this._percentLocal / percent * (this.offsetWidth + this._left)) - 6) + "px";
                            } else if (orien == 6) {
                                this.style.top = ( - (this._percentLocal / percent * (this.offsetHeight + this._top)) - 6) + "px";
                                this.style.left = this._left + ((this._percentLocal / percent * (this.parentNode.offsetWidth - this._left)) + 6) + "px";
                            } else if (orien == 7) {
                                this.style.left = this._left + ((this._percentLocal / percent * (this.parentNode.offsetWidth - this._left)) + 6) + "px";
                                this.style.top = this._top + ((this._percentLocal / percent * (this.parentNode.offsetHeight - this._top)) + 6) + "px";
                            } else if (orien == 8) {
                                this.style.top = this._top + ((this._percentLocal / percent * (this.parentNode.offsetHeight - this._top)) + 6) + "px";
                                this.style.left = ( - (this._percentLocal / percent * (this.offsetWidth + this._left)) - 6) + "px";
                            }
                            this._percentLocal += this.parentNode._stepLength;
                        }
                    }
                    if (this._percentLocal < (percent + this.parentNode._stepLength)) {
                        this.parentNode._outTimer = window.setTimeout("phpadStartScroll.scrollObj['" + this.parentNode.id + "'].scrDivs[" + this._index + "].scrollOUT()", this.parentNode._moveSpeedDelay);
                    } else {
                        this._percentLocal = percent;
                        window.clearTimeout(this.parentNode._outTimer);
                    }
                }
                phpadStartScroll.scrollObj[arguments[i]].scrDivs[divIndex++] = divs[di];
                if (phpadStartScroll.scrollObj[arguments[i]]._orientation == null || phpadStartScroll.scrollObj[arguments[i]]._orientation == 0) {
                    divs[di].parentNode.setOrien();
                }
                if (di == 0) {} else {
                    divs[di].setLocal();
                }
            }
        }
        if (phpadStartScroll.scrollObj[arguments[i]].scrDivs[0] && phpadStartScroll.scrollObj[arguments[i]].scrDivs.length > 1) {
            phpadStartScroll.scrollObj[arguments[i]].scrDivs[0].scrollIN();
        }
    }
}