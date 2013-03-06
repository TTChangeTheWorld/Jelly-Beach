/**
 * Created with JetBrains PhpStorm.
 * User: master
 * Date: 2/24/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

function jumpPlayer(a){
  if (a.bot.y >= field.canvas.height - a.bot.r) a.vy = 0;
  if (a.bot.y < field.canvas.height) a.vy+=0.8;
  if (a.jumping) a.vy-=0.25;
  if (a.vy>0) a.jumping = false;
  if (a.moveUp&&(a.bot.y >= field.canvas.height - a.bot.r)){
      a.vy = -20;
      a.jumping = true;
     // alert("JUUMP");
  }
  if (a.bot.y > field.canvas.height - a.bot.r) {
      a.bot.y = field.canvas.height - a.bot.r;
      a.top.y = field.canvas.height - a.bot.r * 2;
  }
  a.top.y += a.vy;
  a.bot.y += a.vy;
}

function netCollisionLeft(a){
    if (a.top.x > field.canvas.width /2 - a.bot.r - net.width) a.top.x = field.canvas.width / 2 - a.bot.r - net.width;
    if (a.bot.x > field.canvas.width /2 - a.bot.r - net.width) a.bot.x = field.canvas.width / 2 - a.bot.r - net.width;
    if (a.top.x < a.bot.r) a.top.x = a.bot.r;
    if (a.bot.x < a.bot.r) a.bot.x = a.bot.r;
}

function moveLeftPlayer(a){
    jumpPlayer(a);
    if (a.moveLeft){
        a.top.x+=5;
        a.bot.x+=5;
    }
    if (a.moveRight) {
        a.top.x-=5;
        a.bot.x-=5;
    }

}

function moveRightPlayer(a){
    jumpPlayer(a);
    if (a.moveLeft){
        a.top.x+=5;
        a.bot.x+=5;
    }
    if (a.moveRight) {
        a.top.x-=5;
        a.bot.x-=5;
    }

}

function moveBall(a){
    a.x+= a.vx;
    a.y+= a.vy;
    if (options.gameStarted){
        if (a.y + a.r < field.canvas.width)a.vy+=0.35;
        if (a.vx!=0)
            a.rotate+= a.vx/80;
    }
    if (Math.sqrt((a.y - field.canvas.height/3)*(a.y - field.canvas.height/3) + (a.x - net.x - net.width / 2)*(a.x - net.x - net.width / 2)) <= a.r + net.width/2){
        //alert("LOL");
        a.y = a.py;
        a.x = a.px;
        help = (Math.sqrt(a.vx* a.vx+ a.vy* a.vy));
        a.vy = (a.py - field.canvas.height/3)/Math.sqrt((a.y - field.canvas.height/3)*(a.y - field.canvas.height/3) + (a.x - net.x - net.width / 2)*(a.x - net.x - net.width / 2)) * help;
        //alert(a.vy);
        a.vx = (a.px - net.x - net.width/2)/Math.sqrt((a.y  - field.canvas.height/3)*(a.y -  field.canvas.height/3) + (a.x - net.x - net.width / 2)*(a.x - net.x - net.width / 2))*help;
    }
    if (a.y  + a.r > field.canvas.height){
        a.y = a.py;
        a.vy = -Math.abs(a.vy)*0.5;
    }
    if (a.y > field.canvas.height /3 - a.r){
      if ((a.x + a.r >= net.x)&&(a.x + a.r <=net.x + net.width)){
          a.x = a.px;
          //alert(a.vx);
          a.vx = -Math.abs(a.vx)*0.5;
          //alert(a.vx);
      }
      if ((a.x - a.r <= net.x + net.width)&&(a.x - a.r >=net.x)){
          a.x = a.px
          a.vx = Math.abs(a.vx)*0.5;
          //alert(a.vx);
      }
    }
    if (a.x - a.r <= 0){
        a.x = a.px;
        a.vx = Math.abs(a.vx)*0.5;
    }
    if (a.x + a.r > field.canvas.width){
        a.x = a.px;
        a.vx = -Math.abs(a.vx)*0.5;
    }
    a.px = a.x;
    a.py = a.y;
}

function ballCollision(p, b){
  if (Math.sqrt((b.x - p.x)*(b.x - p.x) + (b.y - p.y)*(b.y - p.y)) < p.r + b.r){

      b.vx = (b.x - p.x) / Math.sqrt((b.x - p.x)*(b.x - p.x) + (b.y - p.y)*(b.y - p.y)) * 15;
      b.vy = (b.y - p.y) / Math.sqrt((b.x - p.x)*(b.x - p.x) + (b.y - p.y)*(b.y - p.y)) * 15;
      b.x = b.px;// p.x + (b.x - p.x) / Math.sqrt((b.x - p.x)*(b.x - p.x) + (b.y - p.y)*(b.y - p.y)) * (p.r + b.r);
      b.y = b.py;//p.y +(b.y - p.y) / Math.sqrt((b.x - p.x)*(b.x - p.x) + (b.y - p.y)*(b.y - p.y)) * (p.r + b.r);
      return true;
  }
  return false;
}

function moving(){
  //alert("moving!");
  moveLeftPlayer(left_player);
  moveRightPlayer(right_player);
  moveBall(ball);
  //netCollisionLeft(left_player);
  if (ballCollision(left_player.top, ball)|| ballCollision(left_player.bot, ball)){
      left_player.top.x = left_player.top.px;
      left_player.top.y = left_player.top.py;
      left_player.bot.x = left_player.bot.px;
      left_player.bot.y = left_player.bot.py;
  }
  if (ballCollision(right_player.top, ball)|| ballCollision(right_player.bot, ball)){
      right_player.top.x = right_player.top.px;
      right_player.top.y = right_player.top.py;
      right_player.bot.x = right_player.bot.px;
      right_player.bot.y = right_player.bot.py;
  }
  left_player.top.px = left_player.top.x;
  left_player.top.py = left_player.top.y;
  left_player.bot.px = left_player.bot.x;
  left_player.bot.py = left_player.bot.y
  right_player.top.px = right_player.top.x;
  right_player.top.py = right_player.top.y;
  right_player.bot.px = right_player.bot.x;
  right_player.bot.py = right_player.bot.y;
  setTimeout("moving()",16);
}