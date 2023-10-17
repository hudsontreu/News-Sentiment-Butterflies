const api1 = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2cdc04ba031d4c04bc5e9abb2aefbfdf';

let news;
let sentiment;
let sentimentScore;
let articleNum = 3;
let colorVal;
let queryInterval = 50000;
let testVal = 0.7;
let buttefrly_img;
let butterfly1;
let butterflies = [];
let butterflyNum;

function preload() {
  dallepants = loadImage('assets/dalleplants.png');
  butterfly_img = loadImage('assets/butterflyTrans.png');
}

function setup() {
  createCanvas(600,600);
  imageMode(CENTER);
  sentiment = ml5.sentiment('movieReviews', modelReady);

  apiInterval = setInterval(jsonCall, queryInterval);

  let stopButton = createButton('Stop Querying API');
  stopButton.position(10, height + 10);
  stopButton.mousePressed(stopQueryingAPI);

  let startButton = createButton('Start Querying API');
  startButton.position(150, height + 10); 
  startButton.mousePressed(startQueryingAPI);
  
}

function jsonCall(){
  loadJSON(api1, gotData)
}

function draw(){
  background(200);
  image(dallepants, width/2, height/2);
  if(sentimentScore){
    text(sentimentScore, 10, 30);
    for(let i = 0; i <= butterflyNum; i++){
      butterflies[i].display();
      butterflies[i].move();
    }
  }
}


function gotData(data){
  news = data;
  analyzeSentiment();
}


function modelReady() {
    console.log("Model Loaded!");
}

function analyzeSentiment() {
    let s = sentiment.predict(news.articles[articleNum].title).score;
    let s1 = sentiment.predict(news.articles[articleNum + 1].title).score;
    let s2 = sentiment.predict(news.articles[articleNum + 2].title).score;
    let s3 = sentiment.predict(news.articles[articleNum + 3].title).score;
    let s4 = sentiment.predict(news.articles[articleNum + 4].title).score;

    sentimentScore = (s + s1 + s2 + s3 + s4) / 5;
    butterflyNum = map(sentimentScore, 0, 1, 0, 10);

     // Fill butterflies array
    for(let i = 0; i <= butterflyNum; i++){
      butterflies[i] = new Butterfly(butterfly_img, random(width), random(height), random(0.15, 0.4));
    }

    console.log(s, s1, s2, s3, s4);
    console.log(sentimentScore);
    console.log(news.articles[articleNum].title);
    console.log(news.articles[articleNum + 1].title);
    console.log(news.articles[articleNum + 2].title);
    console.log(news.articles[articleNum + 3].title);
    console.log(news.articles[articleNum + 4].title);
}



function startQueryingAPI() {
  if(!apiInterval) {
      apiInterval = setInterval(jsonCall, 1000);
  }
}

function stopQueryingAPI() {
  clearInterval(apiInterval);
  apiInterval = null;
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
      let moveX = random(-10, 10);
      let moveY = random(-10, 10);
    
      if(this.x + moveX < 0 || this.x + moveX > width) {
          moveX = -moveX;  
      }
  
      if(this.y + moveY < 0 || this.y + moveY > height) {
          moveY = -moveY;  
      }
      
      this.x = this.x + moveX;
      this.y = this.y + moveY;
    }
   
  }

