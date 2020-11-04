var threshold=1000;
var blackholeInit=25;
var blackhole=blackholeInit;
var fieldStrengthInit=1;
var fieldStrength=fieldStrengthInit;
var sink1, sink2;
var followForce=0.5;
var f;
var followers=[];
var numFollowers=4000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  f=new Follower(100,100);
  sink1=createVector(width/2,height/2);
  for(var i=0; i<numFollowers; i++){
    followers[i]=new Follower(random(width), random(height));
  }
  background(0);
  //Below function opens next phase in 60 seconds (length of luke's audio)
  setTimeout(function(){ window.location.assign("darkstarindex.html"); }, 60000);

}

function draw() {
  background(0,50);
  for(var i=followers.length-1; i>=0; i--){
    if(followers[i].update(sink1)){
      followers[i].show(); 
    } else {
      followers.splice(i,1);
    }
  }
  for(var i=followers.length; i<numFollowers; i++){
    followers[i]=new Follower(random(width), random(height));
  }
  blackhole+=0.2;
  if(blackhole>height/2){
    blackhole=blackholeInit;
    fieldStrength=fieldStrengthInit;
  }
  fieldStrength+=0.05;
}

function Follower(x,y){
  this.pos=createVector(x,y);
  
  
  this.update=function(sink){
    var dif=sink.copy();
    dif.sub(this.pos);
    var d=dif.mag();
    if(d<threshold){
      followForce=(100/d*100/d)*fieldStrength;
      if(d>blackhole+20){
        dif.setMag(followForce);
      } else {
        dif.setMag(1);
      }
      this.pos.add(dif);
      if(d<blackhole) return false;
      else return true;
    }
    return true;
  }
  
  this.show=function(){
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, random(0.5,1));

  }
  
}