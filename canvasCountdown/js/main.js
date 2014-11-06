;define(function (require, exports, module) {

	var model = require('model') ;

	var Countdown = function (canvas) {
		this.hours = new Date().getHours(); 
		this.minutes = new Date().getMinutes();
		this.seconds = new Date().getSeconds();
		this.numArr = [];
		this.newBalls = [];
		this.RADIUS = 8;
		this.init(canvas) ;
	};

	Countdown.prototype.createCanvas = function (ele) {
		var ctx ;
		if ( ele.getContext ){
			ctx = ele.getContext('2d') ;
		}
		return ctx ;
	};

	Countdown.prototype.painter = function (info, ctx) {
		ctx.beginPath() ;
		ctx.moveTo(info.centerX, info.centerY) ;
		ctx.arc(info.centerX, info.centerY, info.radius, info.startA, info.endA, info.clockWise) ; 
		ctx.fill() ;
	};

	Countdown.prototype.printBalls = function (i, j, k, radius, ctx, numlen){
		var info = {};

		info.centerX = 2 * j * (radius + 1) + radius + 1 + 10 + numlen + 10*k;  
		info.centerY = 2 * i * (radius + 1) + radius + 1 + 10 ;
		info.radius = radius ; 
		info.startA = 0 ; 
		info.endA = 2 * Math.PI ;
		info.clockWise = false ; 

		this.painter( info, ctx) ;
	};

	Countdown.prototype.getDateData = function (hours, minutes, seconds) {
		var array = [] ;

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
	};

	Countdown.prototype.randomColor = function () {
		var rn = Math.random , floor = Math.floor, 
		    pixs = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'] ;
		return '#' + pixs[floor(rn() * 16)] + '' +
		             pixs[floor(rn() * 16)] + '' +
		             pixs[floor(rn() * 16)] + '' +
		             pixs[floor(rn() * 16)] + '' +
		             pixs[floor(rn() * 16)] + '' +
		             pixs[floor(rn() * 16)];
	};

	Countdown.prototype.update = function () {
		var that = this, date = new Date,
		    _hours = date.getHours() , 
		    _minutes = date.getMinutes() ,
		    _seconds = date.getSeconds() ,
		    _numArr = that.getDateData(_hours, _minutes, _seconds) ; 

		for (var i = 0; i < _numArr.length; i++) {
			if (_numArr[i] != that.numArr[i])
				that.addBalls(that.numWidth[i], that.numArr[i], i) ;
		}

		that.updateBalls() ;

		that.hours = _hours; that.minutes = _minutes; that.seconds = _seconds;
	};

	Countdown.prototype.render = function (ctx) {
		var that = this ; 
		that.numArr = that.getDateData(that.hours, that.minutes, that.seconds) ; 
		that.printNum(ctx) ;

		for (var i = 0; i < that.newBalls.length; i++) {
			ctx.fillStyle = that.newBalls[i].color ; 

			ctx.beginPath() ; 
			ctx.arc(that.newBalls[i].x, that.newBalls[i].y, that.RADIUS, 0, 2*Math.PI, true) ; 
			ctx.closePath() ;
			ctx.fill();
		}
	};

	Countdown.prototype.init = function (canvas) {
		var that = this, ctx, timer;

		that.canvas = document.getElementById(canvas)  ;

		that.canvas.height = 450  ;
		that.canvas.width = 1024 ;
		ctx = that.createCanvas(that.canvas) ; 
		that.render(ctx) ;

		timer = setInterval(function () {
			that.update() ; 
			that.render(ctx) ; 
		}, 50) ;
	} ;

	Countdown.prototype.printNum = function(ctx) {
		var that = this ,k, i, j, numlen = 0;
		that.numWidth = [0];

		ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
		ctx.fillStyle = 'rgb(0,102,153)';

		for(k = 0; k < that.numArr.length; k++){
			if ( typeof that.numArr[k] === 'number') {
				for(i = 0; i < 10; i++){
					for( j = 0; j < 7; j++ ){
						if( model[that.numArr[k]][i][j] !== 0){
							that.printBalls(i, j, k, that.RADIUS, ctx, numlen) ;
						}
					}
				}

				numlen += 2 * 7 * (that.RADIUS + 1);
				that.numWidth.push(numlen) ;
			} else {
				for(i = 0; i < 10; i++){
					for( j = 0; j < 4; j++ ){
						if( model[that.numArr[k]&&10][i][j] !== 0){
							that.printBalls(i, j, k, that.RADIUS, ctx, numlen) ;
						}
					}
				}

				numlen += 2 * 4 * (that.RADIUS + 1);
				that.numWidth.push(numlen) ;
			}
		}
		// console.log(that.numWidth) ;
	};

	Countdown.prototype.addBalls = function(lineWidth, num, k) {
		var that = this, rnd = Math.random ;
		for (var i = 0; i < model[num].length; i++) {
			for (var j = 0; j < model[num][i].length; j++) {
				if (model[num][i][j] == 1) {
					var aBall = {
						x:2 * j * (that.RADIUS + 1) + that.RADIUS + 1 + 10 + lineWidth + 10*k,
						y:2 * i * (that.RADIUS + 1) + that.RADIUS + 1 + 10,
						g:1.5 + rnd(),
						vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, 
						vy:-5, 
						color:that.randomColor()
					};
					that.newBalls.push(aBall) ;
				}
			}
		}
	};

	Countdown.prototype.updateBalls = function() {
		var that = this, del;
		for ( var i = 0 ; i < that.newBalls.length ; i ++ ) {

	        that.newBalls[i].x += that.newBalls[i].vx;
	        that.newBalls[i].y += that.newBalls[i].vy;
	        that.newBalls[i].vy += that.newBalls[i].g;

	        

	        if ( that.newBalls[i].y >= that.canvas.height-that.RADIUS ) {
	            that.newBalls[i].y = that.canvas.height-that.RADIUS;
	            that.newBalls[i].vy = - that.newBalls[i].vy*0.75;
	        }

	        if (that.newBalls[i].x < that.RADIUS || that.newBalls[i].x > that.canvas.width - that.RADIUS) {
	        	del = that.newBalls.splice(i, 1) ;
	        	del = null;
	        }
	    }
	};

	module.exports = Countdown ;
}) ;