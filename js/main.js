/*
window.addEventListener("orientationchange",onOrientationchange,false);
function onOrientationchange(){
  if(window.orientation === 180 || window.orientation === 0){
  alert("hello i m standing!");
  document.getElementById("all").style.transform="rotate(0deg)";
  document.getElementById("all").style.width=window.innerHeight;
  document.getElementById("all").style.height=window.innerWidth;
  }
}*/

var a=document.getElementById('al');
var b=document.getElementById('be');
var c=document.getElementById('ga');

var turtle=document.getElementById("turtleme");
turtle.style.left="45%";
var speed=0;
var pos=43;
window.addEventListener('deviceorientation', function(event){
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    a.innerHTML=Math.round(alpha);
    b.innerHTML=Math.round(beta);
    c.innerHTML=Math.round(gamma);
    speed=event.beta*0.1;

    if(speed<0)    
      turtle.style.transform="scaleX(-1)";
    else
      turtle.style.transform="scale(1)";
},false);

requestAnimationFrame(Move);
var timecount=0;
function Move(){
  timecount++;
  console.log(timecount);
  if(pos+speed<86&&pos+speed>0)
    pos=pos+speed;
  turtle.style.left=pos+"%";

window.requestAnimationFrame(Move)
}


var turtlebg=document.getElementById("turtle-bg");
var on=0;
var flyvelocity=17.1464;
var gravity=9.8;
turtlebg.addEventListener("touchstart", function(event){
  if(on == 1)
    event.preventDefault();
  else{
  on=1;
  var timeturtle=0;  
  var turtlefly = setInterval(function(event){
        if(timeturtle>600)
          {on=0;clearInterval(turtlefly); }
        else
          timeturtle=timeturtle+20;
        var time=timeturtle*0.001;
        var height=300*time-0.5*1000*time*time;
        if(height<0)
          height=0;
        
        turtle.style.bottom=height+"%";        
    }, 20)

    }
},false);







