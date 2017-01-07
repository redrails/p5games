var ball1;
var walls;
var gameIsOver;

var Ball = function(X, Y, W, H){
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    this.draw = function(){
        fill(255);
        this.Y += 2;
        ellipse(this.X, this.Y, this.W, this.H);
    }
    this.proble = function(){
        this.Y -= 5;
    }
}

var Wall = function(X, Y, W, H){
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    this.V = 2;
    
    this.draw = function(){
        fill(color(255,0,0));
        rect(this.X, this.Y, this.W, this.H);
    }
    
    this.moving = function(){
        this.X -= this.V;
        this.draw();
    }
    
}

function collisionDetection(){

    for(var i=0; i<walls.length; i++){
        if(
            ball1.X + ball1.W > walls[i].X &&
            ball1.X < walls[i].X + walls[i].W &&
            ball1.Y + ball1.H > walls[i].Y &&
            ball1.Y < walls[i].Y + walls[i].H
        ){
            gameIsOver = true;
        }
    }
}

function gameOverScreen(){
    background(0);
    textSize(32);
    text("GAME OVER!!!", width/2, height/2)
}

function setup() {
    createCanvas(600,400);
    background(0);
    gameIsOver = false;
    ball1 = new Ball(60, height/2,30,30)
    walls = new Array(200);
    var startPoint = 30;
    var spacing = ball1.H+100;
    for(var i = 0; i < walls.length; i+=2){
        var heightTop = random(height/4, height-50)
        walls[i] = new Wall(startPoint*10, 0, 15, heightTop);
        walls[i+1] = new Wall(startPoint*10, heightTop+spacing, 15, height/2+heightTop);
        startPoint+=15;
    }
}

function draw() {
    
    collisionDetection();

    if(gameIsOver){
        gameOverScreen();
    } else {
        if (keyIsDown(32)){
            ball1.probe();
        }
        if (keyIsDown(UP_ARROW)){
            ball1.Y -= 10;
        }
        
        background(0);
        ball1.draw();
        for(var i = 0; i<walls.length; i++){
            walls[i].moving();
        }
        
    }
}