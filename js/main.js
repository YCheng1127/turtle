/*
locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
locOrientation("landscape");*/
window.addEventListener("orientationchange",onOrientationchange,false);

function onOrientationchange(){
  if(window.orientation === 180 || window.orientation === 0){
    phonestatus=1;//stand
  /*
  alert("hello i m standing!");
  document.getElementById("all").style.transform="rotate(0deg)";
  document.getElementById("all").style.width=window.innerHeight;
  document.getElementById("all").style.height=window.innerWidth;*/
  }
  if(window.orientation === 90 || window.orientation === -90){
    phonestatus=2;//lie
  }
}
var phonestatus=1;

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
    if(phonestatus==2)
      speed=event.beta*0.1;    
    else if(phonestatus==1)
      speed=event.gamma*0.1;

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
/*  if(timecount%40 == 0)
    floatblack(timecount/40);*/
window.requestAnimationFrame(Move);
}



//make the turtle jump
var turtlebg=document.getElementById("turtle-bg");
var on=0;
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


//make a blacktomb
var floatblack=function(k){
  var pic = document.createElement("img");
  pic.src = "./blacktomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  turtlebg.appendChild(pic);
}



//make a bomb
var floatbomb=function(k){
  var pic = document.createElement("img");
  pic.src = "./bomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  turtlebg.appendChild(pic);
}

//make a flower
var floatflower=function(k){
  var pic = document.createElement("img");
  pic.src = "./flower.png";
  pic.style.width = "7%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*93)+1)+"%";
  turtlebg.appendChild(pic);
}
floatbomb(9);

//make a goldentomb
var floatgolden=function(k){
  var pic = document.createElement("img");
  pic.src = "./goldentomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  turtlebg.appendChild(pic);
}

//dropstone animation
var dropstone=function(ball){
  var timedrop=0;
  var dropball=setInterval(function(){
    timedrop=timedrop+20;
    ball.style.bottom = 100-timedrop*0.001*33.3+"%";

  },20);
} 

//dropflower animation
var dropflower=function(ball){
  var timedrop=0;
  var dropball=setInterval(function(){
    timedrop=timedrop+20;
    ball.style.bottom = 100-timedrop*0.001*20+"%";
    ball.style.transform = "rotate(" + timedrop*4 + "deg)";
 },20);
} 

//dropbomb animation
var dropbomb=function(ball,turtle){
  var timedrop=0;
  
  function timebomb(){ 
    timedrop=timedrop+16.7;
    ball.style.bottom = 100-timedrop*0.001*40+"%";
    ball.style.transform = "rotate(" + timedrop*0.2 + "deg)";
    dropball=requestAnimationFrame(timebomb); 
  }

  var dropball=requestAnimationFrame(timebomb);
} 
dropbomb(document.getElementById("floatball9"),turtle);
alert(parseInt(document.getElementById("floatball9").style.left)+parseInt(turtle.style.left));
