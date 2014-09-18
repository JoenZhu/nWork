var Countdown = {} ; 
Countdown.createCanvas = function  (ele) {
	var ctx ;
	if ( ele.getContext ){
		ctx = ele.getContext('2d') ;
	}
	return ctx ;
}

Countdown.painter = function (info, ctx) {
	ctx.beginPath() ;
	ctx.moveTo(info.centerX, info.centerY) ;
	ctx.arc(info.centerX, info.centerY, info.radius, info.startA, info.endA, info.clockWise) ; 
	ctx.fill() ;
}

(function(){
	var canvas = document.getElementById('myCan')  ,
		ctx ;
		canvas.height = 860  ;
		canvas.width = 1024 ;
	ctx = Countdown.createCanvas(canvas) ; 
	ctx.fillStyle('rgb(0,102,153)') ;
})() ;