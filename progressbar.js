const max_bar = 5;
const goals = document.getElementById('goals');
const tasks = document.getElementById('tasks');
const plus_item = document.getElementById('plus-item');
const add_task = document.getElementById('add-task');
var maxone_left = false;
var maxone_right = false;
var task_count = 0;
var right_height = 4;
var left_height = 50;
var bar_count = 0;
var progressBars = [];
var currentBar = 0;
var rendering = false;

plus_item.addEventListener("click", plus_bar);

function plus_bar(){
    if(maxone_left === false && bar_count <= max_bar){
        maxone_left = true;

        // add a progress bar
        let plus = document.createElement("input");
        plus.innerHTML = "";
        plus.id = "bar_"+ bar_count.toString();
        plus.type = "text";
        plus.classList.add("plus-bar-left");

        // add a confirm button
        let button = document.createElement("button");
        button.innerHTML = "√";
        button.classList.add("plus-button-left");
        button.style.marginTop = `${left_height}px`;
        left_height += 98;

        button.addEventListener("click", ()=>{
            let confirmedPbar = document.getElementById(`bar_${bar_count}`);
            button.style.display = "none";
            confirmedPbar.readOnly = "true";
            confirmedPbar.classList.remove("plus-button-left");
            confirmedPbar.classList.add("tab","tab-button");
            maxone_left = false;

            // create a copy in the progressBars array
            let t = {};
            t.title = plus.value;
            t.tasks = [];
            progressBars.push(t);
            console.log(progressBars);

            confirmedPbar.addEventListener("click",()=>{
                let num = parseInt(plus.id[plus.id.length-1]);
                currentBar = num;
                console.log(currentBar);
                render();
            })
            bar_count += 1;
            // add_bar_to_server(t);
        })
        plus.addEventListener("keyup", (e)=>{
            if (e.keyCode === 13){
                event.preventDefault();
                button.click();
            }
        })

        goals.appendChild(plus);
        goals.appendChild(button);
    }
}

add_task.addEventListener("click", plus_task);
function plus_task(e, taskName){
    if(maxone_right === false){
        maxone_right = true;
        let p = document.createElement("input");
        p.innerHTML = taskName || "";
        p.type = "text";
        p.id = "task_"+ task_count.toString();
        p.classList.add("plus-bar-right");

        let button = document.createElement("button");
        button.innerHTML = "√";
        button.classList.add("plus-button-right");
        button.style.marginTop = `${right_height}px`;
        right_height += 60;

        tasks.appendChild(p);
        tasks.appendChild(button);

        button.addEventListener("click", ()=>{
            // console.log(task_count);
            let currTask = document.getElementById(`task_${task_count}`);
            button.style.display = "none";
            currTask.readOnly = "true";
            currTask.classList.remove("plus-button-right");
            currTask.classList.add("shorten");
            maxone_right = false;
            if (!rendering) {
                let des = {"description": currTask.value};
                progressBars[currentBar].tasks.push(des);
            }
            // console.log(progressBars);
            currTask.addEventListener("click",()=>{
                currTask.classList.add("delete");
                let task_id = parseInt(currTask.id.split("_")[1]);
                progressBars[currentBar].tasks[task_id].completion = true;
                progressBars[currentBar].completed++;
                changeBarDisplay(progressBars[currentBar].completed /
                    progressBars[currentBar].tasks.length * 100);
                // update_tasks_to_server(currentBar);
            })
            changeBarDisplay(progressBars[currentBar].completed /
                progressBars[currentBar].tasks.length * 100);
            void document.offsetTop;
            task_count++;
            // update_tasks_to_server(currentBar);
        })

        if (taskName != undefined){
            document.getElementById(`task_${task_count}`).value = taskName;
            if (progressBars[currentBar].tasks[task_count].completion) {
                document.getElementById(`task_${task_count}`).classList.add("delete");
            }
            button.click();
        }
        // console.log(p.offsetTop);
        p.addEventListener("keyup", (e)=>{
            if (e.keyCode === 13){
                event.preventDefault();
                button.click();
            }
        })
    }
}

function render(){
    rendering = true;

    // reset useful variables
    tasks.innerHTML = "";
    task_count = 0;
    right_height = 4;
    let load = progressBars[currentBar];

    // count completed
    var completed = 0;
    for (var t of load.tasks){
        if (t.completion) {
            completed++;
        }
        console.log(t);
        plus_task("asdf",t.description);
    }
    progressBars[currentBar].completed = completed;

    // set progress bar
    if (completed == 0) {
        changeBarDisplay(0);
    } else {
        changeBarDisplay(completed/load.tasks.length * 100);
    }

    // finish rendering
    rendering = false;
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

async function add_bar_to_server(param) {
    var header = window.sessionStorage['authorizedHeader'];
    var body = {
        username: window.sessionStorage['username'],
        title: param.title,
        tasks: []
    }
    try {
        let response = await fetch('https://dreamline-270317.appspot.com/users/progress', {
            method: 'POST',
            body: JSON.stringify(body),
            header: header
        });
    } catch (e) {
        alert("failed to update to server");
        window.location.href = ".";
    }
}

async function update_tasks_to_server(barid) {
    var header = window.sessionStorage["authorizedHeader"];
    var body = {
        tasks: progressBars[barid].tasks,
        username: window.sessionStorage["username"]
    };
    try {
        fetch(`https://dreamline-270317.appspot.com/users/${barid}/tasks`, {
            method: 'PUT',
            header: header,
            body: body
        });
    } catch (e) {
        alert("error updating tasks");
        window.location.href = ".";
    }
}
