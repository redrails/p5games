/**
 * Flappy Bird concept game in p5.js.
 * This documentation is written in the JsDoc style ()
 *
*/

var ball1;      // Create a ball variable which will be the object that the user controls
var walls;      // These are the walls that will be the challenge of the game, it will be contained in an array
var gameIsOver; // Game Over status - boolean value

/**
 * Creates an instance of the ball object
 * 
 * @constructor
 * @param {number} X The X value of the ball
 * @param {number} Y The Y value of the ball
 * @param {number} W The width of the ball
 * @param {number} H The height of the ball
 * 
 */
var Ball = function(X, Y, W, H){
    
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    
    // The draw function is to draw the ball each frame in the canvas.
    this.draw = function(){
        fill(255);
        this.Y += 2;
        ellipse(this.X, this.Y, this.W, this.H);
    }
    
    // The probe function fires when the spacebar is pressed acts as the acceleration velocity of the ball, raising it up.
    // The velocity of the ball changes in a linear way rising it 7 pixels each frame.
    this.probe = function(){
        this.Y -= 7;
    }
}

/**
 * Creates an instance of the wall object
 * 
 * @constructor
 * @param {number} X The X value of the wall
 * @param {number} Y The Y value of the wall
 * @param {number} W The width of the wall
 * @param {number} H The height of the wall
 * 
 */
var Wall = function(X, Y, W, H){
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;

    // Velocity of the moving wall, this must be a constant value across the game, possibly can be altered to be
    // changed when the game gets more difficult.
    this.V = 2; 
    
    // The draw function will draw the wall on each frame on the canvas.
    this.draw = function(){
        fill(color(255,0,0));
        rect(this.X, this.Y, this.W, this.H);
    }
    
    // This function will move the wall each second towards the left hand side of the screen.
    // The game simulates the moving player by actually translating the walls off the canvas.
    this.moving = function(){
        this.X -= this.V;
        this.draw();
    }
    
}

/**
 * This function is used to check when the ball collides with any wall.
 */

function collisionDetection(){

    for(var i=0; i<walls.length; i++){

        /**
         * To check the collision, we check the bounds of the rect walls against the bounds of the ball.
         * To do this we compare the coordinates of the ball to the coordinates of the wall.
         * Ball pos (x) + Ball width (w) > Wall Start coord (x)
         * Ball pos (x) < Wall pos (x) + Wall width (w)
         * Ball pos (y) + Ball height (h) > Wall pos (y)
         * Ball pos (y) < Wall pos (y) + Wall height (h)
         */

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

/**
 * This function re-renders the screen to a gameover screen when the game is over.
 */
function gameOverScreen(){
    background(0);
    textSize(32);
    text("GAME OVER!!!", width/2, height/2)
}


function setup() {
    createCanvas(600,400);
    background(0);

    gameIsOver = false; // Starting value of the game over is false.

    ball1 = new Ball(60, height/2,30,30) // Create a new ball that starts at (60, 200)

    walls = new Array(200); // Preload the walls array to be able to add wall objects inside it.

    var startPoint = 30; // Create the start point for the walls.
    var spacing = ball1.H+100; // Set the verticle spacing between the walls.
                               // So that the ball can pass through

    // In this loop we create a set of two walls at each iteration.
    // The reason for this is so that we can add a spacing between them but keep the X value the same,
    // this mimics the concept of having a gap between one wall.
    // The spacing between each wall is 15 as the startPoint increments.
    for(var i = 0; i < walls.length; i+=2){
        var heightTop = random(height/4, height-50)
        walls[i] = new Wall(startPoint*10, 0, 15, heightTop);
        walls[i+1] = new Wall(startPoint*10, heightTop+spacing, 15, height/2+heightTop);
        startPoint+=15;
    }
}

/**
 * Draw loop to draw the frames of the game.
 */
function draw() {
    
    collisionDetection();

    // Check if game is over, if it is then draw the gameover screen, otherwise
    // draw the normal canvas.
    if(gameIsOver){
        gameOverScreen();
    } else {
        // If spacebar is clicked, probe the ball to rise.
        if (keyIsDown(32)){
            ball1.probe();
        }
        background(0);
        // Draw the ball on the canvas.
        ball1.draw();

        // Draw all the walls in the array on the canvas, but update their position to be
        // moving to the left each frame. This renders as a nice smooth animation.
        for(var i = 0; i<walls.length; i++){
            walls[i].moving();
        }
        
    }
}