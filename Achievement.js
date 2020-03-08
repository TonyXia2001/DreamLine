let clickUserIcon = document.getElementById('userMenuBlock').addEventListener('mouseover', (e)=>{
    let oUserMenu = document.getElementById('userMenu');
    startMove(oUserMenu, {}, 10, function () {
        startMoveWH(oUserMenu, {'height': 20, 'width': 8}, 10);
    })
    e.stopPropagation();
})

let OffUserIcon = document.getElementById('userMenuBlock').addEventListener('mouseout', (e)=>{
    let oUserMenu = document.getElementById('userMenu');
    startMove(oUserMenu, {}, 10, function () {
        startMoveWH(oUserMenu, {'height': 0, 'width': 0}, 10);
    })
    e.stopPropagation();
})

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + 255 + ',' + r().toFixed(1) + ')';
}

function loadResult(results) {
    let oLCol = document.getElementById('content');
    for(let i = 0; i < results.length; i++){
        let onew = document.createElement('div');
        onew.innerHTML = results[i].title;
        onew.classList.add('achiContent');
        onew.style.top = 30 + i * 25 + 'vh';
        oLCol[0].appendChild(onew);
    }
}

document.getElementById('searchTerm').addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        window.sessionStorage["query"] = document.getElementById('searchTerm').value;
        window.location.href = "./search.html";
    }
})
