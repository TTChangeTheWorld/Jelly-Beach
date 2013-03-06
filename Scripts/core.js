/**
 * Created with JetBrains PhpStorm.
 * User: master
 * Date: 2/24/13
 * Time: 2:20 AM
 * To change this template use File | Settings | File Templates.
 */


function Circle(x, y, r, color){
  //Constructor of Circle class
  //Used in Jelly Class
  this.r = r;
  this.x = x;
  this.y = y;
  this.px = x;
  this.py = y;
  this.color = color;
  this.redraw = function(){
      field.fillStyle = this.color;
      field.beginPath();
      field.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      field.fill();
      //field.stroke();
      field.closePath();
      return ;
  }
}

function Ball(){
    this.x = field.canvas.width / 4;
    this.y = field.canvas.height / 3;
    this.px = this.x;
    this.py = this.y;
    this.vx = 0;
    this.vy = 0;
    this.r = 30;
    this.rotate = 0;
    this.redraw = function (){
        field.save();
        field.translate(this.x, this.y);
        field.rotate(this.rotate);
        field.drawImage(options.ball, -this.r,-this.r);
        field.restore();
        field.fillStyle="#000000";
        field.fillRect(this.x -5, 0, 10, 5);
    }
    this.drawShadow = function(){
        field.save();
        field.fillStyle="#444444";
        field.beginPath();
        field.scale(2,1);
        field.arc(this.x/2, field.canvas.height-this.r,this.r*(field.canvas.height-this.y)/500,  0,Math.PI*2);
        field.fill();
        //field.stroke();
        field.closePath();
        field.restore();
    }
}

function PlayerClass(x, y, color){
    //Constructor of Jelly class
    this.x = x;
    this.y = y;
    this.jump = false;
    this.moveDown = false;
    this.moveUp = false;
    this.vy = 0;
    this.moveLeft = false;
    this.moveRight = false;
    this.jumping = false;
    this.top = new Circle(x, y - options.jelly.bot.r, options.jelly.top.r, color);
    this.bot = new Circle(x, y, options.jelly.bot.r, color);
    this.redraw = function (){
        this.bot.redraw();
        this.top.redraw();
    }
}

function init(){
  //This is function where everything is initialized
  canvas = document.getElementById("MainField");
  field = canvas.getContext("2d");
  //We got object of our canvas
  //Object options. It is just options of everything
  options = Object();
  field.canvas.width = 1000;
  varForDebug = 0;
  options.jelly = Object();
  options.jelly.top = Object();
  options.jelly.top.r = 30;
  options.jelly.bot = Object();
  options.jelly.bot.r = 40;
  options.background = new Image();
  options.background.src = "Images/background.png";
  options.ball = new Image();
  options.ball.src = "Images/ball.png";
  options.gameStarted = false;
  net = Object();
  //ball = Object();

  net.width = 16;
  net.height = field.canvas.height /3 * 2;
  net.x = field.canvas.width/2 - net.width/2;
  left_player = new PlayerClass(field.canvas.width/4, field.canvas.height-options.jelly.bot.r,"#0000ff");
  right_player = new PlayerClass(field.canvas.width/4*3, field.canvas.height-options.jelly.bot.r,"#ff0000");
  ball = new Ball();
  //Setting triggers of keys
  document.onkeydown = keyDownTrigger;
  document.onkeyup = keyUpTrigger;
  //Set intervals of redrawing and timeout of moving
  setTimeout("redraw()", 16);
  setTimeout("moving()", 16);
  //alert("OK");
}
