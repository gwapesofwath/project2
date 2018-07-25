
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvasHeight = canvas.height;
canvasWidth = canvas.width

var dx = 0 
var dy = 0;
var direction = true

function Z(xCoord, yCoord, dx, dy, direction) {
    this.x = xCoord
    this.y = yCoord
    this.dy = dy
    this.dx = dx
    this.direction = direction

    this.update = function(){
        //making the Z wiggle
        // if (this.dx < 20 && this.direction) {
        //     this.dx++
        // }
        // else if (this.dx === 20 && this.direction) {
        //     this.direction = false;
        // }
    
        // if (this.dx > -20 && !this.direction) {
        //     this.dx--
        // }
        // else if (this.dx === -20 && !this.direction)  {
        //     this.direction = true;
        // }
        
        //if Z gets to top of page it resets down at the bottom
        if (this.dy === -canvasHeight - this.y) {
            this.dy = 0
            this.dx = Math.floor(Math.random() * -1000) - 1
        }
        // if (this.dx === )

        this.dx++;
        this.dy--;
        this.draw()
    }

    this.draw = function() {

        context.translate(this.dx, this.dy); /// translate (move)
    
        //The Letter Z
        context.beginPath();
    
        context.moveTo(this.x, this.y + canvasHeight); // x+0
        context.lineTo(this.x-10, this.y + canvasHeight); // x+10
        context.lineTo(this.x-2, this.y + canvasHeight-9); // x+2
        context.lineTo(this.x-5, this.y + canvasHeight-9); // x+5
        context.lineTo(this.x-10, this.y + canvasHeight-9); // x+10
        context.lineTo(this.x-10, this.y + canvasHeight-10); // x+10
        context.lineTo(this.x, this.y + canvasHeight-10); // x+0
        context.lineTo(this.x-8, this.y + canvasHeight-1); // x+8
        context.lineTo(this.x, this.y + canvasHeight-1); // x+0
        context.lineTo(this.x, this.y + canvasHeight);  // x+0
    
        // complete custom shape
        context.closePath();
        context.lineWidth = 4;
        context.fillStyle = 'white';
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        
        context.translate(-this.dx, -this.dy); /// translate (move)
       
        
    }

}

var ZArr = []
//for loop to make all the Z's
for (var index = 0; index < 60; index++) {

    var randomX = Math.random() * canvasWidth;
    var randomY = Math.floor(Math.random() * 1400) + 1  
    
    var newZ = new Z(randomX - 1300, randomY, dx, dy, direction);

    ZArr.push(newZ)
}

// console.log(ZArr)
    
function executeFrame() {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (let index = 0; index < ZArr.length; index++) {
        ZArr[index].update();  
    }

    requestAnimationFrame(executeFrame);
}

//start animation
executeFrame();