var ball;
var bricks;
var paddle;

var Ball = function(X, Y, R){
    this.X = X;
    this.Y = Y;
    this.R = R;
    this.xvelocity = 4;
    this.yvelocity = -4;
    
    this.move = function(hitting){
        if(this.X > width || this.X < 0 || hitting){
            this.xvelocity *= -1;
        } else if(this.Y > height || this.Y < 0 || hitting){
            this.yvelocity *= -1;
        } 
        this.X += this.xvelocity;
        this.Y += this.yvelocity;
    }
    
    this.render = function(){
        fill(color(0,200,0));
        strokeWeight(2);
        ellipse(this.X, this.Y, this.R, this.R);
    }
}

this.Paddle = function(X, Y, W, H){
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    
    this.render = function(){
        fill(color(0,0,255));
        rect(this.X, this.Y, this.W, this.H);
    }
    
    this.move = function(type){
        if(type == 0){
            this.X -= 10;
        } else {
            this.X += 10;
        }
        this.render();
    }
}


this.Brick = function(X, Y, size, colour){
    this.X = X;
    this.Y = Y;
    this.size = size;
    this.broken = false;
    this.colour = colour;
    
    this.render = function(){
        fill(this.colour);
        strokeWeight(3);
        rect(this.X, this.Y, this.size, this.size);
    }
    
    this.break = function(){
        this.broken = true;
    }
    
    
}

function setup() {
    createCanvas(800,640);
    this.bricks = new Array(5);
    
    //var colours = [new color(255,0,0), new color(0,255,0), new color(0,0,255)];
    var vert = 0;
    for(var i = 0; i<5; i++){
        bricks[i] = new Array(16);
        var horz = 0;
        for(var j = 0; j<16; j++){
            bricks[i][j] = new Brick(horz, vert, 50, color(255,0,0));
            horz+=50;
        }
        vert += 50;
    }
    
    ball = new Ball(width/2, height-20, 25);
    paddle = new Paddle(width/2, height-20, 120, 20);
}

function draw() {
    background(255);
    for(var i = 0; i<bricks.length; i++){
        for(var j = 0; j<bricks[i].length; j++){
            bricks[i][j].render();
            // if(  ){
            //     ball.move(true);
            // } else {
            //     ball.move(false);
            // }
        }
    }
    ball.move();
    ball.render();
    paddle.render();
}

function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        paddle.move(1);
    } else if(keyCode == LEFT_ARROW){
        paddle.move(0);
    }
}
