function drawBallShadow(a){
	    field.save();
	    field.fillStyle="rgba(50,50,50,0.5)";
		field.beginPath();
		field.scale(2,1);
		field.arc(this.x/2, field.canvas.height-this.r,Math.max(10,this.r*(field.canvas.height-this.y)/800), 0, Math.PI*2);
		field.fill();
		//field.stroke();
		field.closePath();
		field.restore();
}
