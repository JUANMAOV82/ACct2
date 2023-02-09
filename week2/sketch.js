var circle1 = 200;
var rot;
var col;
var freq = 0.000005; 
var cont = 0;
var r;

let numRecord = 80
let dataURL = "https://io.adafruit.com/api/v2/yuanlinxue/feeds/2/data?limit="+numRecord+"&include=value"
let myElements = []

function preload() {
  fetchData();
}

function setup() {
  createCanvas(600, 600);	
  
  setInterval(fetchData, 1000)
}

let count = 0;

function draw() {
  let change = 0;
  background(10,20,30);
  translate(300, 300);
  
  if(myElements.length > 0){
      change = myElements[count]
  }
  
  rotate(radians(rot));
  ellipseMode(RADIUS);
  for (var i=0; i<500; i ++) {
    circle1= 200 + 50*sin(millis()*freq*i);
    col=map(circle1,150,250,255,60);
    r=map(circle1,150,250,7,1);
    fill(col,0,74);
    noStroke();
    ellipse(change*2*cos(i), change*2*sin(i),r,r);    
    rot=rot+0.00005; 	
 }
  
  if(frameCount % 60 < 1){
      count++;
      if(count > 99){
        count = 0;
      }
  } 
}

function fetchData(){
  loadJSON(dataURL, handleData, handleError)
}

function handleData(result){
  myElements = [];
  // console.info(result)
  result.forEach((datapoint)=>{
     //console.log(datapoint.value);
    
  myElements.push(datapoint.value);
  })
  //console.log(myElements.length);
}

function handleError(err){
  console.error(err);
}