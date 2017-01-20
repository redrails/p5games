var player;
var balls = [];

var Player = function(X, Y){
    this.X = X;
    this.Y = Y;
    this.W = 20;
    this.H = 20;
    this.Color = color(0,250,199);
    this.score = 0;

    this.draw = function(){
        fill(this.Color);
        rect(this.X, this.Y, this.W, this.H);
    }
    
    this.move = function(where){
        switch(where){
            case "up":
                this.Y -= 5;
                break;
            case "down":
                this.Y += 5;
                break;
            case "right":
                this.X += 5;
                break;
            case "left":
                this.X -= 5;
                break;
        }
        this.draw();
    }
}

this.Ball = function(X, Y, radius, speedX, speedY){
    this.X = X;
    this.Y = Y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.Color = color(255,0,0);
    this.hitted = false;

    this.draw = function(){
        fill(this.Color);
        ellipse(this.X, this.Y, this.radius, this.radius);
    }
    
    this.update = function(){
        if (this.X < this.radius) {
          this.X = radius;
          this.speedX *= -1;
        } else if (this.X > width - this.radius) {
          this.X = width - radius;
          this.speedX *= -1;
        }
     
        if (this.Y  < this.radius) {
          this.Y = this.radius;
          this.speedY *= -1;
        } else if (this.Y > height - radius) {
          this.Y = height - this.radius;
          this.speedY *= -1;
        }
        this.X += this.speedX;
        this.Y += this.speedY;
        this.draw();
    }
    
    this.hits = function(p){
        var d = p5.Vector.dist(createVector(this.X, this.Y), createVector(p.X, p.Y));
        if(d >= this.radius + p.H && this.hitted){
            this.hitted = false;
            p.score++;
        }
        if(d < this.radius + p.H){
            this.hitted = true;
            return true;
        }
    }
    
}
 
function setup() {
    createCanvas(600, 400);
    player = new Player(width/2, height/2);
    
    for(var i=0; i<5; i++){
        balls[i] = new Ball(random(width), random(height), 30, random(5), random(5));
    }
}

function updateScore(){
    fill(255)
    text("Score: "+player.score,10,10)
}

function draw() {
    background(0);

    display();
    
    push();

    translate(width*0.8, height*0.5);
    rotate(frameCount / -100.0);
    star(0, 0, 10, 30, 5); 
    pop();
}

function star(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius2;
        var sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a+halfAngle) * radius1;
        sy = y + sin(a+halfAngle) * radius1;
        vertex(sx, sy);
        fill(250, 240, 98)
    }
    endShape(CLOSE);
}

function display() {
    for (var i = 0; i < balls.length; i++) {
        noStroke();
        balls[i].update();
        balls[i].hits(player);
    }
  
    player.draw();
    updateScore();
    if(keyIsDown(LEFT_ARROW)) {
        player.move("left");
    }
    
    if(keyIsDown(RIGHT_ARROW)) {
        player.move("right");
    }
    
    if(keyIsDown(UP_ARROW)) {
        player.move("up");        
    }
    
    if(keyIsDown(DOWN_ARROW)) {
        player.move("down");
    }
}