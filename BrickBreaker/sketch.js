var ball;
var bricks;
var paddle;
var scoreCard;
var gameOver = false;

var Ball = function(X, Y, R){
    this.X = X;
    this.Y = Y;
    this.R = R;
    this.xvelocity = 8;
    this.yvelocity = -8;
    
    this.move = function(hitting){
        
        if(this.Y > height){
            gameOver = true;
        }
        
        if(this.X > width || this.X < 0){
            this.xvelocity *= -1;
        }
        if(this.Y > height || this.Y < 0 || hitting){
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
    
    this.hittingBrick = function(brik){
        return collidePointRect(this.X, this.Y, brik.X, brik.Y, brik.size, brik.size)

    }
    
    this.hittingPaddle = function(paddle){
        return collidePointRect(this.X, this.Y, paddle.X, paddle.Y, paddle.W, paddle.H)
    }
    
}


var Paddle = function(X, Y, W, H){
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


var Brick = function(X, Y, size, colour){
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

var score = function(X, Y){
    this.X = X;
    this.Y = Y;
    this.count = 0;
    
    this.add = function(points){
        points == null ? this.count++ : this.count+=points;
    }
    
    this.render = function(){
        textSize(30);
        text("Score: "+this.count, this.X, this.Y);
    }
}

function setup() {
    createCanvas(800,640);
    this.bricks = new Array(5);
    scoreCard = new score(30, height-20);
    var vert = 0;
    for(var i = 0; i<5; i++){
        bricks[i] = new Array(16);
        var horz = 0;
        for(var j = 0; j<16; j++){
            bricks[i][j] = new Brick(horz, vert, 50, color(random(255), random(255), random(255)));
            horz+=50;
        }
        vert += 50;
    }
    
    ball = new Ball(width/2, height-20, 25);
    paddle = new Paddle(width/2, height-20, 120, 20);
}

function renderGameOver(status){
    background(0);
    if(status){
        textSize(60);
        color(0,255,0);
        text("You win!", width/4, height/2);
    } else {
        textSize(60);
        color(255,0,0);
        text("You win!", width/4, height/2); 
    }
}

function removeElement(array, element){
    for(var i = 0; i<array.length; i++){
        var index = array[i].indexOf(element);
        if(index > -1){
            array[i].splice(index, 1);
        }
    }

}

function checkCollisions(brik){
    if(ball.hittingBrick(brik)){
        scoreCard.add();
        removeElement(bricks, brik);
        return true;
    }
    return false;
}

function draw() {
    if(gameOver){
        renderGameOver(false);
    } else {
        background(255);
        
        scoreCard.render();
    
        if(keyIsDown(RIGHT_ARROW)){
            paddle.move(1);
        } else if(keyIsDown(LEFT_ARROW)){
            paddle.move(0);
        }
        var flag = false;
        outer: 
            for(var i = 0; i<bricks.length; i++){
                for(var j = 0; j<bricks[i].length; j++){
                    bricks[i][j].render();
                    flag = checkCollisions(bricks[i][j]);
                    if(flag){
                        break outer;
                    }
                }
        }
    
        if(ball.hittingPaddle(paddle)){
            flag = true;
        }
        
        ball.move(flag);
        ball.render();
        paddle.render();
    }
}

