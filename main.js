
function btnHover(obj){
    var oDot = document.getElementById('movingDot');
    oDot.style.animation = 'none';
    startMove(oDot, {'top': obj.offsetTop, 'left': obj.offsetLeft, 'height': 40, 'width': 80}, 1);
}

function btnUnhover(obj){
    var oDot = document.getElementById('movingDot');
    startMove(oDot, {}, 100, function () {
        startMove(oDot, {'top': 300, 'left': obj.offsetLeft, 'height': 20, 'width': 20}, 1, function () {
            oDot.style.animation = 'anim 5s infinite';
        })
    })
}
