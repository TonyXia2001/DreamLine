arr = [
    {
        title: "yes0",
        tasks:[
            {description: "hello world"},
            {description: "good morning"}
        ]
    },
    {
        title: "no1",
        tasks:[
            {description: "bye world"}
        ]
    },
    {
        title: "yes2",
        tasks:[
            {description: "hello world"},
            {description: "good morning"}
        ]
    },
    {
        title: "no3",
        tasks:[
            {description: "bye world"}
        ]
    },
    {
        title: "yes4",
        tasks:[
            {description: "hello world"},
            {description: "good morning"}
        ]
    },
    {
        title: "no5",
        tasks:[
            {description: "bye world"}
        ]
    },
    {
        title: "yes6",
        tasks:[
            {description: "hello world"},
            {description: "good morning"}
        ]
    },
    {
        title: "no7",
        tasks:[
            {description: "bye world"}
        ]
    }
]

var page = 0;
var maxPage = 0;
var currPage = 0;

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
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
    for(let j = 0; j < oTasks.length; j++)
        oTasks[j].style.display = 'none';
    let count = 0;
    for (let j = 0; j < i; j++) {
        count += arr[j].tasks.length;
    }
    for(let j = 0; j < arr[i].tasks.length; j++)
        oTasks[count + j].style.display = 'flex';
}

window.onload= function () {
    loadResult(arr);
    let oEles = document.getElementsByClassName('divTitle');
    let oTasks = document.getElementsByClassName('mainTask');
    for(let i = 0; i<oEles.length; i++){
        var clickListeners = oEles[i].addEventListener('click', function () {
            showTasks(oTasks, arr, i);
        });
    }
    maxPage = Math.floor(oEles.length/7);
    displayBatch(oEles, 0);
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
