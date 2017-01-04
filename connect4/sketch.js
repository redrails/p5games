var turn;
var slots;
var p1;
var p2;
var won;

var Player = function(name, colour) {
    this.name = name;
    this.colour = colour;
}

var Slot = function(X, Y, W, H, dropMatrix) {

    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
    this.filled = false;
    this.filledColor = null;
    this.dropMatrix = dropMatrix;

    this.Fill = function(player) {
        this.filled = true;
        this.filledColor = player.colour;
    }
    this.draw = function() {
        if (this.filled) {
            fill(this.filledColor);
        } else {
            fill(200);
        }
        ellipse(this.X, this.Y, this.W, this.H);
    }
}

function setup() {
    createCanvas(800, 500);
    slots = new Array(10);
    for (var i = 0; i < 10; i++) {
        slots[i] = new Array(10);
        for (var j = 0; j < 10; j++) {
            slots[i][j] = new Slot(i * 50 + 25, j * 50 + 25, 30, 30);
        }
    }
    textSize(32);
    p1 = new Player("Player 1", color(255, 0, 0));
    p2 = new Player("Player 2", color(0, 0, 255));
    turn = p1;

}


function draw() {
    background(0);
    fill(0);
    stroke(255);
    strokeWeight(2);
    
    checkWinState(p1);
    if(won == p1){
        fill(won.colour);
        noStroke();
        textSize(72);
        text(won.name + " wins!",width/4,height/2);
        return;
    }
    checkWinState(p2);
    if(won == p2){
        fill(won.colour);
        noStroke();
        textSize(72);
        text(won.name + " wins!",width/4,height/2);
        return;
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            fill(100);
            rect(i * 50, j * 50, 50, 50);
            fill(200);
        }
    }
    for (var i = 0; i < slots.length; i++) {
        for (var j = 0; j < slots[i].length; j++) {
            slots[i][j].draw();
        }
    }
    
    statusBoard();
}

function checkWinState(checking) {
    won = null;
    
    for (var i = 0; i < slots.length; i++) {
        for(var j = 0; j<slots[i].length-4; j++){
            if(
                slots[i][j].filledColor   == checking.colour &&
                slots[i][j+1].filledColor == checking.colour &&
                slots[i][j+2].filledColor == checking.colour &&
                slots[i][j+3].filledColor == checking.colour
            ){
                won = checking;
            }

        }
    }
    for(var i=0; i<slots.length; i++){
        for(var j=0; j<slots[i].length; j++){
            if(
                slots[i][j].filledColor   == checking.colour &&
                slots[i+1][j].filledColor == checking.colour &&
                slots[i+2][j].filledColor == checking.colour &&
                slots[i+3][j].filledColor == checking.colour
            ){
                won = checking;
            }
        }
    }
    
}

function dropCounter(col) {

    for (var i = slots[col].length - 1; i >= 0; i--) {
        if (slots[col][i].filled) {
            continue;
        } else {
            slots[col][i].Fill(turn);
            break;
        }
    }

}

function statusBoard() {
    fill(255);
    noStroke();
    text("Current Turn:", 510, 50);
    fill(turn.colour);
    text(turn.name, 510, 80);

}

function keyPressed() {
    
    if(won !== null){
        return;
    }
    
    switch (keyCode) {
        case 49:
            dropCounter(0);
            break;
        case 50:
            dropCounter(1);
            break;
        case 51:
            dropCounter(2);
            break;
        case 52:
            dropCounter(3);
            break;
        case 53:
            dropCounter(4);
            break;
        case 54:
            dropCounter(5);
            break;
        case 55:
            dropCounter(6);
            break;
        case 56:
            dropCounter(7);
            break;
        case 57:
            dropCounter(8);
            break;
        case 48:
            dropCounter(9);
            break;
    }
    if (turn == p1) {
        turn = p2;
    } else {
        turn = p1;
    }
}