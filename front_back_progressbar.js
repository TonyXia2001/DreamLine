// var goals = getElementById("goals");
// var tasks = getElementById("tasks");
var progress;
var bar_status = document.getElementsByClassName("bar-status")

function fetch1(){
  fetch('https://dreamline-270317.appspot.com/users/all')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      progress = extractUserdata(data);// get bars from user 1
      console.log(progress[0]);
      console.log(progress[0][0].tasks[0].completion);
      changeBarDisplay(barRatio(progress[0][0].tasks));
  });
}

function gettasks(a){
  var c = [];
  for (let j = 0; j < a.length; j++){
    c.push(a[j]);
  }
  return c;
}

function extractUserdata(a){
  var b = [];
  for (let i = 0; i < a.length; i++){
      b.push(gettasks(a[i].progressBars));
    }
  return b;
}

function barRatio(progressData){
  let count = 0;
  for (let i = 0; i < progressData.length; i++){
    if (progressData[i].completion === true){
      count++;
    }
  }
  if(count === 0) {return count;}
  return ((100*count/progressData.length));
}
function changeBarDisplay(ratio){
  console.log(ratio);
  if(ratio < 20){
    ratio_string = ratio.toString() + "%";
    console.log(ratio_string);
    bar_status[0].style.width = ratio_string;
    bar_status[1].style.width = 0;
    bar_status[2].style.width = 0;
    bar_status[3].style.width = 0;
    bar_status[4].style.width = 0;
  }
  if(ratio >= 20 && ratio <= 40){
    ratio -= 20;
    ratio_string = ratio.toString() + "%";
    console.log(ratio_string);
    bar_status[0].style.width = "20%";
    bar_status[1].style.width = ratio_string;
    bar_status[2].style.width = 0;
    bar_status[3].style.width = 0;
    bar_status[4].style.width = 0;
  }
  if(ratio >= 40 && ratio <= 60){
    ratio -= 40;
    ratio_string = ratio.toString() + "%";
    console.log(ratio_string);
    bar_status[1].style.width = "20%";
    bar_status[0].style.width = "20%";
    bar_status[2].style.width = ratio_string;
    bar_status[3].style.width = 0;
    bar_status[4].style.width = 0;
  }
  if(ratio >= 60 && ratio <= 80){
    ratio -= 60;
    ratio_string = ratio.toString() + "%";
    console.log(ratio_string);
    bar_status[1].style.width = "20%";
    bar_status[0].style.width = "20%";
    bar_status[2].style.width = "20%";
    bar_status[3].style.width = ratio_string;
    bar_status[4].style.width = 0;
  }
  if(ratio >= 80 && ratio <= 100){
    ratio -= 80;
    ratio_string = ratio.toString() + "%";
    console.log(ratio_string);
    bar_status[1].style.width = "20%";
    bar_status[0].style.width = "20%";
    bar_status[2].style.width = "20%";
    bar_status[3].style.width = "20%";
    bar_status[4].style.width = ratio_string;
  }
}
// 1. extract all the bars from data base
// 2. make new bars according to the statistics
// -  With correct layout

function main(){
  fetch1();
  console.log(bar_status);
}

main();

// (2) [{…}, {…}]
// 0:
// completion: false
// tasks: Array(2)
// 0:
// completion: false
// _id: "5e63e94979955b57f74088bb"
// description: "des a"
// __proto__: Object
// 1: {completion: false, _id: "5e63e94979955b57f74088bc", description: "des b"}
// length: 2
// __proto__: Array(0)
// _id: "5e63e0a69773fa642dbba590"
// title: "Finish Dream Line"
// __proto__: Object
