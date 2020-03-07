// var goals = getElementById("goals");
// var tasks = getElementById("tasks");
var progress;
// var one = getElementById("one");
// var two = getElementById("two");
// var three = getElementById("three");
// var four = getElementById("four");
// var five = getElementById("five");

function fetch1(){
  fetch('https://dreamline-270317.appspot.com/users/all')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      progress = extractUserdata(data);// get bars from user 1
      console.log(progress);
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

function barDisplay(a){

}
// 1. extract all the bars from data base
// 2. make new bars according to the statistics
// -  With correct layout

function main(){
  fetch1();
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
