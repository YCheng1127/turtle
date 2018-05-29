
var begin=0;//0:not start, 1:start 2:over
var rules=document.getElementById("rules");
var start=document.getElementById("start");
var turtleback=document.getElementById("turtleback");
//start when press start
start.addEventListener("click",function(event){
  event.stopPropagation();
  start.style.display="none";
  begin=1;
  rules.style.display="none";
  
  //重新計算
  point=0;
  timeconstant=61;
},false)
//detect if the button is pressed, if pressed begin==1, then the gamefunction start
var run=requestAnimationFrame(rungame);
function rungame(){//st
 if(begin==1){ //if start button pressed
   turtleback.style.display="block";
//detect if the phone orientation change
window.addEventListener("orientationchange",onOrientationchange,false);

function onOrientationchange(){
  if(window.orientation === 180 || window.orientation === 0){
    phonestatus=1;//stand
    turtleback.style.display="block"
  }
  if(window.orientation === 90 || window.orientation === -90){
    phonestatus=2;//lie
    turtleback.style.display="none";
  }
}

var phonestatus=1;//detect the phone status
if(window.innerWidth<window.innerHeight)
  phonestatus=1;
else
  phonestatus=2;

var score=document.getElementById("Score");//point
var point=0;
var gametime=document.getElementById("Time");//time
var timeconstant=61;

var turtle=document.getElementById("turtleme");//get turtle
var turtleshocked=document.getElementById("turtleshocked");//turtle shockedface
turtle.style.left="45%";//initital position
turtleshocked.style.left="45%";
turtle.style.bottom="0%";
turtle.style.bottom="0%";

var speed=0;
var pos=43;//turtle position
//detect angle then change the speed
window.addEventListener('deviceorientation', function Detectspeed(event){
    if(phonestatus==2)
      speed=event.beta*0.1;    
    else if(phonestatus==1)
      speed=event.gamma*0.1;

    if(speed<0){    
      turtle.style.transform="scaleX(-1)";
      turtleshocked.style.transform="scaleX(-1)";
    }
    else{
      turtle.style.transform="scale(1)";
      turtleshocked.style.transform="scale(1)";
    }
},false);

var move=requestAnimationFrame(Move);//start the turtle move animation
var grow=0;
var growconstant=14;
var growtime=0;
var timecount=0;
var on=0;//for jumping turtle
var jumptime=0;// for jumping turtle

var turtlebg=document.getElementById("turtle-bg");
turtlebg.style.display="block";
var r=0;
var balllist=["flower","black","black","golden","bomb","bomb","black","black","golden","black","golden","bomb","golden","black","black","bomb"];
var timedrop=[];//for floatingball
var balls=[];//for floatingball
var type=[];//for floatingball
var timedroptest=0;
function Move(){
  timecount++;
  /*console.log(timecount);*/
  
  gametime.innerHTML=Math.floor(timeconstant-timecount/60);

  if(pos+speed<100-growconstant&&pos+speed>0)
    pos=pos+speed;
  turtle.style.left=pos+"%";
  turtleshocked.style.left=pos+"%";
  /*console.log("grow="+grow);*/
  //grow the turtle when eat flower
  if(grow==1){
    growtime=growtime+16.66667;
    growconstant=growconstant+0.055;
    turtle.style.width=growconstant+"%";
    turtleshocked.style.width=growconstant+"%";
    if(growtime>=1500){
    grow=0;
    growtime=0;
    }
  }
  //make balls randomly
  if(timecount%40 == 0){
    if(Math.floor((Math.random()*5)+1)!=2){
      var draw=balllist[Math.floor(Math.random()*15)];
      if(draw=="bomb"){
        floatbomb(timecount/40);
        balls[timecount/40]=["bomb",0];
       }
      else if(draw=="flower"){
        floatflower(timecount/40);
        balls[timecount/40]=["flower",0];
      }
      else if(draw=="black"){
        floatblack(timecount/40);
        balls[timecount/40]=["black",0];
      }
      else if(draw=="golden"){
        floatgolden(timecount/40);
        balls[timecount/40]=["golden",0];
      }
    }    
  }
  for(r=0;r<balls.length;r++){
    if(document.getElementById("floatball"+r)){
      if(balls[r][0]=="black")
        dropstone(document.getElementById("floatball"+r),turtle,r);
      else if(balls[r][0]=="golden")
        dropstone(document.getElementById("floatball"+r),turtle,r);
      else if(balls[r][0]=="flower")
        dropflower(document.getElementById("floatball"+r),turtle,r);
      else if(balls[r][0]=="bomb")
        dropbomb(document.getElementById("floatball"+r),turtle,r);
    }
  }
  
  //jumpturtle
  if(on==1){
    jumptime=jumptime+16.6666667;
    if(jumptime>600){
      on=0;
      jumptime=0;
    }
    turtle.style.bottom=jumptime*0.001*300-0.5*1000*jumptime*jumptime*0.001*0.001+"%";
    turtleshocked.style.bottom=turtle.style.bottom;
  }

  score.innerHTML="&nbsp"+point;
move=requestAnimationFrame(Move);

  if(timecount/60>60){
    begin=2;//times up and turn begin to 2 for closing all the request animation and eventlistener
    cancelAnimationFrame(move);
  }
}
/*
if(begin == 2)
{
window.removeEventListener("touchstart",JUMP(event),false);//I tried to cancel the eventlistener but i failed
window.removeEventListener('deviceorientation',Detectspeed,false);//neither
}*/

//make the turtle jump
window.addEventListener("touchstart",function JUMP(event){
  if(on == 1)
    event.preventDefault();
  else{
  on=1;
    }
},false);
begin=0;//prevent the turtle animation to start so many times

//make a blacktomb
var floatblack=function(k){
  var pic = document.createElement("img");
  pic.src = "turtle/blacktomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  pic.style.transform="rotate("+Math.floor((Math.random()*360))+"deg)";
  turtlebg.appendChild(pic);
}



//make a bomb
var floatbomb=function(k){
  var pic = document.createElement("img");
  pic.src = "turtle/bomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  turtlebg.appendChild(pic);
}

//make a flower
var floatflower=function(k){
  var pic = document.createElement("img");
  pic.src = "turtle/flower.png";
  pic.style.width = "7%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*93)+1)+"%";
  turtlebg.appendChild(pic);
}

//make a goldentomb
var floatgolden=function(k){
  var pic = document.createElement("img");
  pic.src = "turtle/goldentomb.png";
  pic.style.width = "8%";
  pic.setAttribute("id","floatball"+k);
  pic.style.position="absolute";
  pic.style.left=Math.floor((Math.random()*92)+1)+"%";
  pic.style.transform="rotate("+Math.floor((Math.random()*360))+"deg)";
  turtlebg.appendChild(pic);
}

//dropstone animation
var dropstone=function(ball,turtle,i){
  
    balls[i][1]=balls[i][1]+16.7;
    ball.style.bottom = 100-balls[i][1]*0.001*33.3+"%";
    if(parseInt(turtle.style.left)-parseInt(ball.style.left)<8&&parseInt(turtle.style.left)-parseInt(ball.style.left)>(-growconstant)&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)<growconstant*0.644&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)>(-9.3)){
      if(balls[i][0]=="black")
        point=point+5;
      else if(balls[i][0]=="golden")
        point=point+10;
      ball.remove();
      turtleshocked.style.visibility="hidden";
    }
    else if(parseInt(ball.style.bottom)<-22)
      ball.remove();
} 

//dropflower animation
var dropflower=function(ball,turtle,i){
 
    balls[i][1]=balls[i][1]+16.7;
    ball.style.bottom = 100-balls[i][1]*0.001*20+"%";
    ball.style.transform = "rotate(" + balls[i][1]*4 + "deg)";    
    if(parseInt(turtle.style.left)-parseInt(ball.style.left)<7&parseInt(turtle.style.left)-parseInt(ball.style.left)>(-growconstant)&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)<growconstant*0.644&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)>(-7)){
      ball.remove();
      grow=1;
    }
    else if(parseInt(ball.style.bottom)<-22)
      ball.remove();
} 

//dropbomb animation
var dropbomb=function(ball,turtle,i){
   
    balls[i][1]=balls[i][1]+16.7;
    ball.style.bottom = 100-balls[i][1]*0.001*40+"%";
    ball.style.transform = "rotate(" + balls[i][1]*0.2 + "deg)"; 
    if(parseInt(turtle.style.left)-parseInt(ball.style.left)<8&&parseInt(turtle.style.left)-parseInt(ball.style.left)>(-growconstant)&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)<growconstant*0.644&&parseInt(ball.style.bottom)-parseInt(turtle.style.bottom)>(-8)){
      point=point-15;
      ball.remove();
      turtleshocked.style.visibility="visible";
    }
    else if(parseInt(ball.style.bottom)<-22)
      ball.remove();
} 
}//end if
run=requestAnimationFrame(rungame);
/*時間到後停止偵測遊戲開始，因為要可以繼續玩所以先關掉
if(begin==2){
  cancelAnimationFrame(rungame); 
}*/

}//end

turtleback.addEventListener("click",function(event){
  /*event.stopPropagation();*/
  alert("hello");
  /*You can code here
   *
   *
   *
   * */
},false)
