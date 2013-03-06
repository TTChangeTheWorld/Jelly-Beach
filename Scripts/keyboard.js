/**
 * Created with JetBrains PhpStorm.
 * User: master
 * Date: 2/24/13
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */

function keyDownTrigger(e){
    //alert(e.keyCode);
    options.gameStarted = true;
    if (e.keyCode==87){
        left_player.moveUp = true;
        //alert("TOP");
    }
    if (e.keyCode==72){

      right_player.moveRight = true;
    }
    if (e.keyCode==68){
        left_player.moveLeft = true;
    }
    if (e.keyCode==85){
        right_player.moveUp = true;
        //alert("OK");
    }
    if (e.keyCode==74){
       right_player.moveDown = true;
    }
    if (e.keyCode==75){
      right_player.moveLeft = true;
    }
    if (e.keyCode==65){
        left_player.moveRight = true;
    }
    if (e.keyCode==83){
        left_player.moveDown = true;
    }
}
function keyUpTrigger(e){
    //alert(e.keyCode);
    if (e.keyCode==72){
      right_player.moveRight = false;
    }
    if (e.keyCode==85){
        right_player.moveUp = false;
        right_player.jumping = false;
    }
    if (e.keyCode==74){
        right_player.moveDown = false;
    }
    if (e.keyCode==75){
        right_player.moveLeft = false;
    }
    if (e.keyCode==87){
        left_player.moveUp = false;
        left_player.jumping = false;
    }
    if (e.keyCode==68){
        left_player.moveLeft = false;
    }
    if (e.keyCode==65){
        left_player.moveRight = false;
    }
    if (e.keyCode==83){
        left_player.moveDown = false;
    }
}