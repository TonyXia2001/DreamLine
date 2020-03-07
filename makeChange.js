function getStyle(obj, name) {
    if (obj.currentStyle)
        return obj.currentStyle[name];
    else
        return getComputedStyle(obj, false)[name];
}

function startMove(obj, json, v, fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var bStop = true;
        for (var attr in json){
            var cur = attr=='opacity' ?
                Math.round(parseFloat(getStyle(obj, attr))*100)
                : parseInt(getStyle(obj, attr));
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[attr])
                bStop = false;
            if (attr == 'opacity')
                obj.style.opacity = (cur + speed) / 100;
            else
                obj.style[attr] = cur + speed + 'px';
        }

        if (bStop) {
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        }
    }, v);
}

function startMoveWH(obj, json, v, dir, fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var bStop = true;
        for (var attr in json){
            var cur = attr=='opacity' ?
                Math.round(parseFloat(getStyle(obj, attr))*100)
                : parseInt(getStyle(obj, attr));
            if(attr == 'height' || attr =='top'){
                cur = Math.round(cur / document.documentElement.clientHeight * 100);
                if(attr == 'height')console.log('a' + cur);
            }
            else if (attr == 'width')
                cur = parseInt(cur / document.documentElement.clientWidth * 100);
            if (cur != json[attr])
                bStop = false;
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
            if (attr == 'opacity')
                obj.style.opacity = (cur + speed) / 100;
            else{
                if(attr == 'height' || attr == 'top')
                    obj.style[attr] = cur + speed + 'vh';
                else if(attr == 'width')
                    obj.style[attr] = cur + speed + 'vw';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        }
    }, v);
}
