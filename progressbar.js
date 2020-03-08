const max_bar = 5;
const goals = document.getElementById('goals');
const tasks = document.getElementById('tasks');
var maxone_left = false;
var maxone_right = false;
var task_count = 1;
var bar_count = 1;
var right_height = 4;
var left_height = 50;
var bar_count = 1;
var progressBars = [];
var currentBar = 0;

// var color = ["#ff0000","#00ff00","#fcba03","#ff00ff","#00ffff"];

// [
//   {
//     title: "DSFsd",
//     tasks: [
//       {description: "dsfsd"},
//       {description: "dsdfs"}
//     ]
//   }
// ]

// var taskNo = 1; use this to keep track of tasks number;

function plus(){
  if(maxone_left === false && bar_count <= max_bar){
    maxone_left = true;
    let plus = document.createElement("input");
    plus.innerHTML = "";
    plus.id = "bar_"+ bar_count.toString();
    plus.type = "text";
    plus.classList.add("plus-bar-left");

    // let tab = document.createElement("div");
    // tab.innerText = bar_count;
    // console.log(bar_count);

    let button = document.createElement("button");
    button.innerHTML = "√";
    button.classList.add("plus-button-left");
    button.style.marginTop = `${left_height}px`;
    // tab.style.marginTop = `${left_height}px`;
    left_height += 98;
    button.addEventListener("click", ()=>{
      document.getElementById(`bar_${bar_count}`);
      button.style.display = "none";
      plus.readOnly = "true";
      plus.classList.remove("plus-button-left");
      plus.classList.add("tab","tab-button");
      maxone_left = false;
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
  // if press, set maxone_left to true
}

function plus_task(){
  if(maxone_right === false){
    maxone_right = true;
    let p = document.createElement("input");
    p.innerHTML = "";
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
      p.addEventListener("click",()=>{
        p.classList.add("delete");
      })
    })
    tasks.appendChild(p);
    tasks.appendChild(button);
    // console.log(p.offsetTop);
    p.addEventListener("keyup", (e)=>{
      if (e.keyCode === 13){
        event.preventDefault();
        button.click();
      }
    })
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
