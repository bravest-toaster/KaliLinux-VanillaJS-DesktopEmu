// MICHAEL ** BE ** SURE  ** TO ** LINK ** YOUR ** CUSTOM ** LIBRARIES ** AND **
// THE ** JQUERY ** CDN ** IT ** IS ** NOT ** IN ** THIS ** DEV ** FOLDER !
blackhole('#blackhole');
$(document).ready(function() {
    $("#my_audio").get(0).play();
});
function blackhole(element) {
	var h = $(element).height(),
	    w = $(element).width(),
	    cw = w,
	    ch = h,
	    maxorbit = 255, // distance from center
	    centery = ch/2,
	    centerx = cw/2;

	var startTime = new Date().getTime();
	//Set current time at 0 for holding vars later
	var currentTime = 0;
	var stars = [],
	    collapse = false, // 'on' hovered
	    expanse = false; // 'on' clicked

	var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo(element),
	    context = canvas.get(0).getContext("2d");

	context.globalCompositeOperation = "multiply";

	function setDPI(canvas, dpi) {
		// Set up CSS size if it's not set up already
		if (!canvas.get(0).style.width)
			canvas.get(0).style.width = canvas.get(0).width + 'px';
		if (!canvas.get(0).style.height)
			canvas.get(0).style.height = canvas.get(0).height + 'px';

		var scaleFactor = dpi / 96;
		canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
		canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
		var ctx = canvas.get(0).getContext('2d');
		ctx.scale(scaleFactor, scaleFactor);
	}
//NEW ROTATE MATH - Remember, old animation frame calls for both X and Y rotational axis movements broke Chrome
	function rotate(cx, cy, x, y, angle) {
		var radians = angle,
		    cos = Math.cos(radians),
		    sin = Math.sin(radians),
		    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
		    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return [nx, ny];
	}

	setDPI(canvas, 192);

	var star = function(){

		//Get a weighted number as to cause most star formation towards the certer of calculated circle element
		var rands = [];
		rands.push(Math.random() * (maxorbit/2) + 1);
		rands.push(Math.random() * (maxorbit/2) + maxorbit);

		this.orbital = (rands.reduce(function(p, c) {
			return p + c;
		}, 0) / rands.length);
		//Where random weighted numer stored - orbital - this.orbital

		this.x = centerx; // ALL these stars are center of X
		this.y = centery + this.orbital; // Set star Y position starting at the center y + the position in the current orbit
		this.yOrigin = centery + this.orbital;  //Var to track particle origin
		this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180; // LEAVE - 2.5 looks best - speed at which 'stars' rotate
		this.rotation = 0; // set current rotational variable at 0
		//USE RANDOM START ROT ORIGIN - otherwise stars will generate in a single file fucking line
		this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180; // Set the starting rotation
		this.id = stars.length;  // Set stars length so we can use later for trailing / wooshy / cool FX
		this.collapseBonus = this.orbital - (maxorbit * 0.7); //Set 'bonus' to randomly set some stars outside center element 'on' hover event
		if(this.collapseBonus < 0){ //If above 'bonus' is negative then..
			this.collapseBonus = 0; //Set @ 0 to prevent any stars forming INSIDE THE CENTER CIRCLE aka black hole / wormhole / dark star / quantum physics connundrum of existing entity we do not fully comprehend and just now took a grainy picture of
		}
		stars.push(this);
		this.color = 'rgba(255,255,255,'+ (1 - ((this.orbital) / 255)) +')'; // Color the star white, but make it more transparent the further out it is generated
		//Use hoverPos to carry remainders / calculated value plot points as to assist in next animation call on setTimeout calls or setIntervals
		//DON"T TRY TO CHANGE THIS AGAIN IT WILL LAG LIKE A MOTHER FUCKER
		this.hoverPos = centery + (maxorbit/2) + this.collapseBonus;  // Where the star will go on hover of the blackhole
		this.expansePos = centery + (this.id%100)*-10 + (Math.floor(Math.random() * 20) + 1); // Where the star will go when expansion takes place
		this.prevR = this.startRotation;
		this.prevX = this.x;
		this.prevY = this.y;
//		this.prevY = this.x - this.y(startRotation)
	}
	star.prototype.draw = function(){
		// the stars are not actually moving on the X axis in my code.  I'm simply rotating the canvas context for each star individually so that they all get rotated with the use of less complex math in each frame.
//Set rotation of ENTIRE canvas context for each star OR rotate ENTIRE CANVAS
//LEAVE FOLLOWING CONDITIONAL!
//Better math calcs than mine and uses less resources in clever way. 
		if(!expanse){
			this.rotation = this.startRotation + (currentTime * this.speed);
			if(!collapse){ // not hovered
				if(this.y > this.yOrigin){
					this.y-= 2.5;
				}
				if(this.y < this.yOrigin-4){
					this.y+= (this.yOrigin - this.y) / 10;
				}
			} else { // on hover
				this.trail = 1;
				if(this.y > this.hoverPos){
					this.y-= (this.hoverPos - this.y) / -5;
				}
				if(this.y < this.hoverPos-4){
					this.y+= 2.5;
				}
			}
		} else {
			this.rotation = this.startRotation + (currentTime * (this.speed / 2));
			if(this.y > this.expansePos){
				this.y-= Math.floor(this.expansePos - this.y) / -140;
			}
		}
		context.save();
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
		context.beginPath();
		var oldPos = rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);
		context.moveTo(oldPos[0],oldPos[1]);
		context.translate(centerx, centery);
		context.rotate(this.rotation);
		context.translate(-centerx, -centery);
		context.lineTo(this.x,this.y);
		context.stroke();
		context.restore();
		//Set prevR here and not above. Not global scope from earlier instantiation 
		this.prevR = this.rotation;
		this.prevX = this.x;
		this.prevY = this.y;
	}


	$('.centerHover').on('click',function(){
		collapse = false;
		expanse = true;

		$(this).addClass('open');
		$('.fullpage').addClass('open');
		setTimeout(function(){
			$('.header .welcome').removeClass('gone');
		}, 500);
		setTimeout(endIntro, 10000);
	});
	$('.centerHover').on('mouseover',function(){
		if(expanse == false){
			collapse = true;
		}
	});
	$('.centerHover').on('mouseout',function(){
		if(expanse == false){
			collapse = false;
		}
	});
	//SET CALLBACK on animation frame call. 1000 seems to flow nicely
	window.requestFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	//Set loop to 'clear' context. Not fully cleared context will allow for trailing light like a comet
	function loop(){
		var now = new Date().getTime();
		currentTime = (now - startTime) / 50;
		context.fillStyle = 'rgba(25,25,25,0.2)'; //context 'clearing' set here
		context.fillRect(0, 0, cw, ch);//use fillRect method instead
		//use 'for-each' method to call every star
		for(var i = 0; i < stars.length; i++){//For every or each 'star'
			if(stars[i] != stars){//If not existing at index
				stars[i].draw(); //THEN draw it
			}
		}
		//call request frame loop for ligth trails
		// Writing that above just got the "DUCK TAILS...WOO OOOO OOOO OOOO OOOOOOO" in my head
		requestFrame(loop);
	}

	//My ocd won't allow for mixed libraries
	//If your not michael and reading this remove this code below if you want the page to remain 'static' and not open to another page or net socket
	//Next page we used more vanilla JS so use this function to call new window
	function endIntro() {//Use this as it will give 'flow' to our pages
		window.open("codetyped.html", "_parent", "fullscreen,scrollbars", true);
	}
	function init(time){
		context.fillStyle = 'rgba(25,25,25,1)';  // Initial clear of the canvas, to avoid an issue where it all gets too dark
		context.fillRect(0, 0, cw, ch);
		for(var i = 0; i < 2500; i++){  // create 2500 stars
			new star();
		}
		loop();
	}
	init();
}