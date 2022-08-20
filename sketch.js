let canvaswidth = 1080;
let canvasheight = 720;
let startButton = document;
let weightSlider;
let img;
let paintingimg;
let flowerButton;
let brush = 3;
let squareButton;
let normBrush;
let startProgram;

//loading in images
function preload() {
  img = loadImage("red-flower.png");
  imgpainting = loadImage("city2.png");
}

//This is the welcome page setup.
//Includes text & launch button.
function setup() {
  let cnv = createCanvas(1280, 720);
  cnv.position(30, 30);
  background(245, 238, 228);
  image(imgpainting, 140, 10, 1000, 700);
  textAlign(CENTER, CENTER);
  textSize(28);
  textStyle(BOLD);
  fill(0);
  text("Hello There!", 550, 150, 180, 100);
  textSize(18);
  textStyle(NORMAL);
  text("What will you be drawing for us today?", 285, 185, 700, 100);
  textSize(12);
  textStyle(ITALIC);
  text("HINT: [Del] key to clear your canvas.", 300, 600, 700, 100);
  startProgram = createButton("Click to Draw");
  startProgram.style("accent-color", "#f5eee4");
  startProgram.mousePressed(launch);
  startProgram.position(490, 380);
}

//Upon launch function: Creates the buttons and postitions them.
//This function also removes the initial "Click to Draw" button and calls the sketch tool canvas in baseSetup()
function launch() {
  colorPicker = createColorPicker("#ed225d");
  colorPicker.position(1120, 40);
  colorPicker.size(180, 30);
  normBrush = createButton("brush");
  normBrush.position(1030, 130);
  normBrush.mousePressed(lineBrush);
  weightSlider = createSlider(0, 100, 10);
  weightSlider.position(1135, 690);
  weightSlider.style("width", "150px");
  weightSlider.style("accent-color", "#f5eee4");
  flowerButton = createButton("flower");
  flowerButton.position(1030, 80);
  flowerButton.mousePressed(flower);
  imageMode(CENTER);
  squareButton = createButton("square");
  squareButton.position(1030, 180);
  squareButton.mousePressed(squareShape);
  console.log("calling");
  baseSetup();
  startProgram.remove();
}

//New canvas is created with a side bar (made with rect) for the tools used.
function baseSetup() {
  createCanvas(1280, 720);
  background(255);
  fill(100);
  stroke(0);
  rect(1080, 0, 200, 720);
  console.log("baserectangle");
  frameRate(120);
}

//The draw function calls the different brushes used.
//If button has been pressed, the following draws.
function draw() {
  if (brush != 3) {
    fill(100);
    stroke(0);
    strokeWeight(0);
    rect(1080, 0, 200, 720);
    //Console checking to see repitition.
    //Brush doesn't go out of canvas bounds.
    console.log("drawrectangle");
  }
  if (brush === 0 && mouseIsPressed === true) {
    // draw a stroke with current colour
    if (onCanvas(mouseX, mouseY, pmouseX, pmouseY)) {
      stroke(colorPicker.color());
      strokeWeight(weightSlider.value());
      line(mouseX, mouseY, pmouseX, pmouseY);
      stroke(0);
      strokeWeight(0);
      fill(100);
      rect(1080, 0, 200, 720);
    }
  } else if (brush === 1 && mouseIsPressed === true) {
    if (onCanvas(mouseX, mouseY, pmouseX, pmouseY)) {
      translate(mouseX, mouseY);
      image(img, 0, 0, 100, 100);
    }
  } else if (brush === 2 && mouseIsPressed === true) {
    if (onCanvas(mouseX, mouseY, pmouseX, pmouseY)) {
      fill(colorPicker.color());
      rect(mouseX, mouseY, weightSlider.value(), weightSlider.value());
    }
  }

  //This function checks to see if the mouse position is within the canvas.
  function onCanvas(mouseX, mouseY, pmouseX, pmouseY) {
    if (mouseX < canvaswidth && mouseY < canvasheight) {
      return true;
    } else return false;
  }
}

//The following functions changes the brush is the brush button was selected.
function lineBrush() {
  brush = 0;
}

function flower() {
  brush = 1;
}

function squareShape() {
  brush = 2;
}

//If you click the DEL key, your canvas will clear. 
function keyPressed() {
  if (keyCode === DELETE) {
  print("you've cleared the canvas.");
  clear();
  baseSetup();
  }
}
