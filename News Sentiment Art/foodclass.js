let buttefrly_img;
let butterfly1;
let butterflies = [];
let sentimentScore = 7;


function preload() {
  dallepants = loadImage('assets/dalleplants.png');
  butterfly_img = loadImage('assets/butterfly.jpg');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  for(let i = 0; i < sentimentScore; i++){
    butterflies[i] = new Butterfly(butterfly_img, random(width), random(height), random(0.1, 0.5));
  }
}

function draw(){
    background(200);
    image(dallepants, width/2, height/2);
    for(let i = 0; i < sentimentScore; i++){
      butterflies[i].display();
      butterflies[i].move();
    }
}


class Butterfly {
    constructor(img, x, y, scale) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.scale = scale;
    }
  
    display() {
      push();
      translate(this.x, this.y);
      scale(this.scale);
      image(this.img, 0, 0); 
      pop();
      }

      move(){
        this.x = this.x + random(-10, 10);
        this.y = this.y + random(-10, 10);
      }
     
    }




  
  
  
  
  
  
  