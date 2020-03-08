const max_bar = 5;
var maxone_left = false;
var maxone_right = false;
var task_count = 1;
var bar_count = 1;
var right_height = 4;
var left_height = 48;
var bar_count = 1;
var color = ["#ff0000","#00ff00","#fcba03","#ff00ff","#00ffff"];

// var taskNo = 1; use this to keep track of tasks number;
const goals = document.getElementById('goals');
const tasks = document.getElementById('tasks');

function plus(){
  if(maxone_left === false && bar_count <= max_bar){
    maxone_left = true;
    let plus = document.createElement("input");
    plus.innerHTML = "";
    plus.id = "bar_"+ bar_count.toString();
    plus.type = "text";
    plus.classList.add("plus-bar-left");

    let number = document.createElement("div");
    number.innerText = bar_count;
    number.classList.add("number-box");
    number.style.background = color[2];
    console.log(bar_count);

    let button = document.createElement("button");
    button.innerHTML = "√";
    button.classList.add("plus-button-left");
    button.style.background = color[2];
    button.style.marginTop = `${left_height}px`;
    number.style.marginTop = `${left_height}px`;
    left_height += 78;
    button.addEventListener("click", ()=>{
      document.getElementById(`bar_${bar_count}`);
      goals.append(number);
      button.style.display = "none";
      plus.readOnly = "true";
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

function confirm_left(button){

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
      maxone_right = false;
    })
    tasks.appendChild(p);
    tasks.appendChild(button);
    console.log(p.offsetTop);

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
