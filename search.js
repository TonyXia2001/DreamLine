var page = 0;
var maxPage = 0;
var currPage = 0;
var selectedTitleAndTasks = {};

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + 255 + ',' + r().toFixed(1) + ')';
}

function displayBatch(Eles, batch){
    for(let i = 0; i < Eles.length; i++)
        Eles[i].style.display = 'none';
    for(let i = 7*batch; i<Eles.length && i < 7 * batch + 7; i++){
        Eles[i].style.display = 'flex';
    }
}

function loadResult(results) {
    let oLCol = document.getElementsByClassName('leftColumn');
    let oMain = document.getElementsByClassName('mainContents');
    for(let i = 0; i < results.length; i++){
        let onew = document.createElement('div');
        onew.innerHTML = results[i].title;
        onew.classList.add('divTitle');
        onew.style.top = 9 + 10 * (i % 7) + 'vh';
        onew.style.display = 'none';
        oLCol[0].appendChild(onew);
        for(let j = 0; j < results[i].tasks.length; j++){
            let onew1 = document.createElement('div');
            onew1.innerHTML = results[i].tasks[j].description;
            onew1.classList.add('mainTask');
            onew1.style.height = 60 / results[i].tasks.length + 'vh';
            onew1.style.top = 16 + j * 60 / results[i].tasks.length + 'vh';
            onew1.style.background = random_rgba();
            onew1.style.display = 'none';
            oMain[0].appendChild(onew1);
        }
    }
}

function showTasks(oTasks, arr, i) {
    selectedTitleAndTasks.title = arr[i].title;
    selectedTitleAndTasks.tasks = arr[i].tasks;
    var items = document.getElementsByClassName('divTitle')
    for(let i = 0; i < items.length; i++)
        items[i].style.background = 'rgba(156, 238, 255, 0)';
    items[i].style.background = 'rgba(73, 52, 255, 1)';
    for(let j = 0; j < oTasks.length; j++)
        oTasks[j].style.display = 'none';
    let count = 0;
    for (let j = 0; j < i; j++) {
        count += arr[j].tasks.length;
    }
    for(let j = 0; j < arr[i].tasks.length; j++)
        oTasks[count + j].style.display = 'flex';
}

function changePage(dir) {
    let oEles = document.getElementsByClassName('divTitle');
    if(currPage + dir < 0 || currPage + dir > maxPage)
        alert("You  have reach the end!")
    else{
        currPage += dir;
        displayBatch(oEles, currPage);
        document.getElementById('pageNum').innerHTML = currPage + 1;
    }
}

function displayData(result) {
    loadResult(result);
    let oEles = document.getElementsByClassName('divTitle');
    let oTasks = document.getElementsByClassName('mainTask');
    for(let i = 0; i<oEles.length; i++){
        var clickListeners = oEles[i].addEventListener('click', function () {
            showTasks(oTasks, result, i);
        });
    }
    maxPage = Math.floor(oEles.length/7);
    displayBatch(oEles, 0);
    if(oTasks.length != 0)
        showTasks(oTasks, result, 0);
}

async function searchAndDisplay(txt) {
    removeElementsByClass('divTitle');
    removeElementsByClass('mainTask');
    if(!txt){
        document.getElementById('pMainContents').innerHTML = '';
        return;
    }
    var response = await fetch(`https://dreamline-270317.appspot.com/search/${txt}`);
    var result = await response.json();
    if(result.length != 0){
        document.getElementById('pMainContents').innerHTML = '';
        displayData(result);
    }
    else{
        document.getElementById('pMainContents').innerHTML = 'Search item not found!';
    }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

document.getElementById('searchTerm').addEventListener('keyup', (e)=>{
    if (e.keyCode == 13) {
        var txt = document.getElementById('searchTerm').value;
        searchAndDisplay(txt);
    }
})

document.getElementById('searchButton').addEventListener('click', ()=>{
    var txt = document.getElementById('searchTerm').value;
    searchAndDisplay(txt);
})

window.onload = function () {
    if(window.sessionStorage["query"]){
        searchAndDisplay(window.sessionStorage["query"]);
    }
}

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


document.getElementById('CopyBtn').addEventListener('click', async ()=>{
    if(selectedTitleAndTasks.title == null){
        alert("Please select a progress bar first!");
        return;
    }
    var uName = window.sessionStorage["username"];
    var body = {
        username: uName,
        title: selectedTitleAndTasks.title,
        tasks: selectedTitleAndTasks.tasks
    };
    var header = window.sessionStorage["authorizedHeader"];
    try {
        var response = await fetch(`https://dreamline-270317.appspot.com/progress`, {
            method: 'POST',
            header: header,
            body: body
        })
        window.location.href = "progressbar.html";
    } catch (e) {
        alert("Please log in to save result!");
        window.location.href = ".";
    }
})

function logout() {
    window.sessionStorage["username"] = null;
    window.sessionStorage["authorizedHeader"] = null;
    alert("successfully log out!")
}
