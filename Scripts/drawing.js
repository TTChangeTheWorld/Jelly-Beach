/**
 * Created with JetBrains PhpStorm.
 * User: master
 * Date: 2/24/13
 * Time: 2:32 AM
 * To change this template use File | Settings | File Templates.
 */


function drawCircle(a){
  // Just drawing of object circle
  field.fillStyle = a.color;
  field.beginPath();
  field.arc(a.x, a.y, a.r, 0, Math.PI * 2, false);
  field.fill();
  //field.stroke();
  field.closePath();
  return ;
}

function drawJelly(a){
    //Just drawing of our Jelly

}


function drawNet(){
  field.fillStyle="#aaaaaa";
  field.fillRect(net.x, field.canvas.height / 3, net.width, net.height);
  field.fillStyle="#aaaaaa";
  field.beginPath();
  field.arc(net.x + net.width / 2 , field.canvas.height / 3, net.width / 2, 0, Math.PI * 2, false);
  field.fill();
  field.closePath();
  ///-field.arc
}

function redraw(){
    field.fillStyle="white";

    field.fillRect(0,0,1000,1000);
    field.drawImage(options.background, 0, 0);
    ball.drawShadow();
    drawNet();
    left_player.redraw();
    right_player.redraw();
    ball.redraw();
    setTimeout("redraw()", 16);
    return;
}