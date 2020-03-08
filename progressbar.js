const max_bar = 5;
const goals = document.getElementById('goals');
const tasks = document.getElementById('tasks');
const plus_item = document.getElementById('plus-item');
const add_task = document.getElementById('add-task');
var maxone_left = false;
var maxone_right = false;
var task_count = 1;
var right_height = 4;
var left_height = 50;
var bar_count = 0;
var progressBars = [];
var currentBar = 0;

plus_item.addEventListener("click", plus_bar);

function plus_bar(){
  if(maxone_left === false && bar_count <= max_bar){
    maxone_left = true;
    let plus = document.createElement("input"); // create an input box
    plus.innerHTML = "";
    plus.id = "bar_"+ bar_count.toString(); // give it a name by index starting from 0
    plus.type = "text";
    plus.classList.add("plus-bar-left");
    let button = document.createElement("button");
    button.innerHTML = "√";
    button.classList.add("plus-button-left");
    button.style.marginTop = `${left_height}px`;
    left_height += 98; // make button the same height with the input line
    button.addEventListener("click", ()=>{
      document.getElementById(`bar_${bar_count}`);
      button.style.display = "none";
      plus.readOnly = "true"; // when calling the button, make the text readOnly
      plus.classList.remove("plus-button-left"); // remove the left button
      plus.classList.add("tab","tab-button"); // add a tab for future selection
      maxone_left = false;
      let t = {}; // task
      t.title = plus.value; // set title to the text of plus(taskName)
      progressBars.push(t);
      plus.addEventListener("click",()=>{
        let num = parseInt(plus.id[plus.id.length-1]);
        currentBar = num;
        render();
        bar_count += 1;
      })
    })

    goals.append(plus);
    goals.append(button);
    console.log(plus.offsetTop);
    plus.addEventListener("keyup", (e)=>{
      if (e.keyCode === 13){
        event.preventDefault();
        button.click();
      }
    })
    bar_count++;
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
    task_count++;
    p.classList.add("plus-bar-right");

    let button = document.createElement("button");
    button.innerHTML = "√";
    button.classList.add("plus-button-right");
    button.style.marginTop = `${right_height}px`;
    right_height += 60;
    button.addEventListener("click", ()=>{
      document.getElementById(`task_${task_count}`);
      button.style.display = "none";
      p.readOnly = "true";
      p.classList.remove("plus-button-right");
      p.classList.add("shorten");
      maxone_right = false;
      let des = {"description": p.value};
      progressBars[currentBar].tasks = progressBars[currentBar].tasks || [];
      progressBars[currentBar].tasks.push(des);
      console.log(progressBars);
      p.addEventListener("click",()=>{
        p.classList.add("delete");
      })
    })
    tasks.appendChild(p);
    tasks.appendChild(button);
    if (taskName != undefined){
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
  tasks.innerHTML = "";
  let load = progressBars[currentBar];
  for (var t of load.tasks){
      plus_task("asdf",t.description);
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

 document.getElementById('searchText').addEventListener('keyup', (e) => {
     if (e.keyCode == 13) {
         window.sessionStorage["query"] = document.getElementById('searchText').value;
         window.location.href = "./search.html";
     }
 })
