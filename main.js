function btnHover(obj){
    var oDot = document.getElementById('movingDot');
    oDot.style.animation = 'none';
    startMove(oDot, {'top': obj.offsetTop, 'left': obj.offsetLeft, 'height': obj.offsetHeight, 'width': obj.offsetWidth}, 1);
}

function btnUnhover(obj, fnEnd){
    var oDot = document.getElementById('movingDot');
    startMove(oDot, {}, 100, function () {
        startMove(oDot, {'top': 300, 'left': obj.offsetLeft, 'height': 20, 'width': 20}, 1, function () {
            oDot.style.animation = 'anim 5s infinite';
        })
    })
}

function changeStatus(obj, str, event) {
    obj.style.display = str;
    event.stopPropagation;
}

window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
    document.getElementById('barMask').style.right = (1 - scrollTop/(height-document.documentElement.clientHeight)) * 100 + 'vw';
}

function displayBlock(obj, index, a){
    var oFeature = document.getElementsByClassName('feature');
    if(a == -1){
        startMoveWH(obj, {'height': 80, 'top': 200}, 10, displayChange(oFeature, obj, 'none'))
    }
    else{
        startMoveWH(obj, {'height':20, 'top': 200 + index * 20}, 10, displayChange(oFeature, obj, 'flex'))
    }
}

function displayChange(oFeature, obj, str){
    for(var i = 0; i < oFeature.length; i++){
        if(oFeature[i].id != obj.id) oFeature[i].style.display = str;
    }
}
