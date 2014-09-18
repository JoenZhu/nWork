var Countdown = {} ; 
Countdown.createCanvas = function (ele) {
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

Countdown.printNum = function (i, j, k, radius,ctx){
	var info = {} ;

	info.centerX = 2 * j * (radius + 1) + radius + 1 + 10 + 2 * 7 * k * (radius + 1) + 10*k;  
	info.centerY = 2 * i * (radius + 1) + radius + 1 + 10 ;
	info.radius = radius ; 
	info.startA = 0 ; 
	info.endA = 2 * Math.PI ;
	info.clockWise = false ; 

	Countdown.painter( info, ctx) ;

}

Countdown.getDateData = function ( ) {
	var date = new Date , 
		hours = date.getHours() ,
		minutes = date.getMinutes(),
		seconds = date.getSeconds() ,
		array = [] ;

	// push time data to array ; 
	array.push(Math.floor(hours / 10)) ;
	array.push(hours % 10) ;
	array.push(':') ;
	array.push(Math.floor(minutes / 10)) ;
	array.push(minutes % 10) ;
	array.push(':') ;
	array.push(Math.floor(seconds / 10)) ;
	array.push(seconds % 10) ;

	return array ;
}

window.onload = function(){
	var canvas = document.getElementById('myCan')  ,
		ctx ,
		RADIUS = 8 , 
		k, i, j, info;
		tArray = [] ;
	canvas.height = 860  ;
	canvas.width = 1024 ;

	tArray = Countdown.getDateData() ;
	console.log(tArray.join(' '));
	ctx = Countdown.createCanvas(canvas) ; 
	ctx.fillStyle = 'rgb(0,102,153)' ;

	for(k = 0; k < tArray.length; k++){
		if ( typeof tArray[k] === 'number') {
			for(i = 0; i < 10; i++){
				for( j = 0; j < 7; j++ ){
					if( model[tArray[k]][i][j] !== 0){
						Countdown.printNum(i, j, k, RADIUS, ctx) ;
					}
				}
			}
		};
	}
} ;