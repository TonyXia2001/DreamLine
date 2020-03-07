var maxone_left = false;
var maxone_right = false;
const goals = document.getElementById('goals');
const tasks = document.getElementById('tasks');

function plus(){
  if(maxone_left === false){
    maxone_left = true;
    let plus = document.createElement("input");
    plus.innerHTML = "";
    plus.type = "text";
    plus.classList.add("plus-bar");

    let button = document.createElement("button");
    button.innerHTML = "√";
    button.classList.add("plus-button");
    goals.append(plus);
    goals.append(button);
  }
  // if press, set maxone_left to true
}

function plus_task(){
  let p = document.createElement("input");
  p.innerHTML = "";
  p.type = "text";
  tasks.append(p);
}
