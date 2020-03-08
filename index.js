// function btnHover(obj){
//     var oDot = document.getElementById('movingDot');
//     oDot.style.animation = 'none';
//     startMove(oDot, {'top': obj.offsetTop, 'left': obj.offsetLeft, 'height': "40px", 'width': "80px"}, 1);
// }
//
// function btnUnhover(obj, fnEnd){
//     var oDot = document.getElementById('movingDot');
//     startMove(oDot, {}, 100, function () {
//         startMove(oDot, {'top': 300, 'left': obj.offsetLeft, 'height': 20, 'width': 20}, 1, function () {
//             oDot.style.animation = 'anim 5s infinite';
//         })
//     })
// }

function changeStatus(obj, str) {
    obj.style.display = str;
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

document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    switchLiSuMethod("changeToLogIn", "changeToSignUp");
    var oBody = document.getElementById('wrapper');
    var oLiSu = document.getElementById('loginSignup');
    oLiSu.style.display = "block";
    startMove(oBody, {'opacity': 40}, 50);
    startMove(oLiSu, {'opacity': 100}, 50);
})
document.getElementById('signupBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    switchLiSuMethod("changeToSignUp", "changeToLogIn");
    var oBody = document.getElementById('wrapper');
    var oLiSu = document.getElementById('loginSignup');
    oLiSu.style.display = "block";
    startMove(oBody, {'opacity': 40}, 50);
    startMove(oLiSu, {'opacity': 100}, 50);
})
document.getElementById('btmSignupBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    switchLiSuMethod("changeToSignUp", "changeToLogIn");
    var oBody = document.getElementById('wrapper');
    var oLiSu = document.getElementById('loginSignup');
    oLiSu.style.display = "block";
    startMove(oBody, {'opacity': 40}, 50);
    startMove(oLiSu, {'opacity': 100}, 50);
})


function switchLiSuMethod(iThis, iOther){
    var oThisBtn = document.getElementById(iThis);
    var oOtherBtn = document.getElementById(iOther);
    oThisBtn.style.background = 'rgba(154, 18, 179, 1)';
    oOtherBtn.style.background = 'rgba(255, 255, 255, 1)';

    var oUNameP = document.getElementById('uNameP');
    var oUNameIp = document.getElementById('usernameIp');
    var oPWordP = document.getElementById('pWordP');
    var oPWordIp = document.getElementById('passwordIp');
    var oCfmP = document.getElementById('conPwordP');
    var oCfmIp = document.getElementById('confirmIp');
    if(iThis == 'changeToLogIn'){
        oUNameP.style.top = '23vh';
        oUNameIp.style.top = '25vh';
        oPWordP.style.top = '38vh';
        oPWordIp.style.top = '40vh';
        oCfmP.style.display = 'none';
        oCfmIp.style.display = 'none';
    }
    else{
        oUNameP.style.top = '18vh';
        oUNameIp.style.top = '20vh';
        oPWordP.style.top = '31vh';
        oPWordIp.style.top = '33vh';
        oCfmP.style.display = 'block';
        oCfmIp.style.display = 'block'
        oCfmP.style.top = '41vh';
        oCfmIp.style.top = '46vh';
    }
}

document.addEventListener("click", (e)=>{
    document.getElementById("loginSignup").style.display = "none";
    document.getElementById('wrapper').style.opacity = 100;
    document.getElementById('loginSignup').style.opacity = 0;
})

document.getElementById('loginSignup').addEventListener('click', (e) => {
    e.stopPropagation();
})
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        window.location.href = "./search.html";
        window.sessionStorage["query"] = document.getElementById('searchInput').value;
    }
})
