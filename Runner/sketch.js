var runner;
var obstacles = [];

var Runner = function(X, Y){
    this.X = X;
    this.Y = Y;
    this.W = 25;
    this.H = 25;
    
    this.draw = function(){
        fill(255);
        rect(this.X, this.Y, this.W, this.H);
    }
    
    this.move = function(amount){
        this.X += amount;
        this.draw();
    }
    
    this.jump = function(){
        this.X += this.X+20;
        this.Y += this.Y+60;
        this.draw();
        translate(this.X, this.Y);
        this.X = this.X+10;
        this.Y = this.Y+height-25;
        this.draw();
        translate(this.X, this.Y);
    }
}

var Obstacle = function(X, Y, W, H){
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    
    this.draw = function(){
        fill(255);
        rect(this.X, this.Y, this.W, this.H);
    }
}

function setup() {
    createCanvas(640,400);
    background(0);
    runner = new Runner(10,height-25);
    var lastxpos = 50;
    for(var i=0; i<100; i++){
        var randomX = random(lastxpos, lastxpos+100);
        obstacles[i] = new Obstacle(randomX, height-50, 10, 60);
        lastxpos = randomX+100;
    }
}

function draw() {
    background(0);
    translate(width/2-runner.X, height-(runner.Y+40));
    runner.move(5);
    for(var i=0; i<obstacles.length; i++){
        obstacles[i].draw();
    }
}

function keyPressed(){
    if(keyCode == 32){
        runner.jump();
    }
}