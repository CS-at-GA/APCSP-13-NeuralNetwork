const colorList = ['maroon','brown','olive','teal','navy','red','orange','yellow','lime'];

let classification;
let inputs;

// Step 2: set your neural network options (Step 1 is in preload)
const neuralNetworkOptions = {
  task: 'classification',
  debug: true
}

const nueralNetworkTrainingOptions = {
  epochs: 32,
  batchSize: 12
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(neuralNetworkOptions);

function preload() {
  // Step 1: load data or create some data 
  loadTable('data.csv', 'csv', 'header', (table) => { // this runs after the table gets loaded. 
    // Step 4: add data to the neural network
    for( const row of table.getRows() ) {
      const input = {}
      table
      .columns
      .filter( c => c != 'Classification' )
      .forEach( c => {
        input[c] = row.getNum(c); 
      })
      const output = { classification: row.get('Classification') }
      nn.addData(input,output);
    } 
    
  });
}

// just a shortcut alias
function assignInputs() { inputs = nn.neuralNetworkData.meta.inputs } 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Step 5: normalize your data;
  nn.normalizeData();
  // Step 6: train your neural network
  nn.train(nueralNetworkTrainingOptions, assignInputs ); 
  
  noStroke();
  fill(random(colorList));  
  background(255);
  noLoop();
}

function draw() {
  background('white');
  if( classification ) {
    fill('black')
    text(`Result: ${classification.result} (${classification.confidence}%)`, 50, 20 );
    const numberOfInputs = Object.keys(inputs).length;
    const barHeight = (height - 100 - (numberOfInputs-1)*10) / (numberOfInputs);
    const barWidth = width - 100;
    const x = 50;
    let y = 50;
    let i = 0;
    for( const c of Object.keys(inputs) ) {      
      fill(colorList[i]);
      i++;
      rect(x,y,barWidth,barHeight);            
      markerX = map( classification.input[c],
        inputs[c].min, inputs[c].max,
        50,width-50 );
      noStroke();
      fill('black');
      rect( markerX - 5, y - 2, 10, barHeight + 4 );
      push();
      translate(x-2,y+barHeight);
      rotate(-PI/2);
      text(c,0,0)
      pop();
      y += barHeight + 10;
    }
  }
}

function keyPressed() {
  // Step 7: use the trained model by calling makeRandomClassification
  if( key === 'r' ) {
    makeRandomClassification();
  }
}

// Step 8: make a classification
function makeRandomClassification() {
  classification = {};
  classification.input = generateRandomInput(); 
  nn.classify(classification.input, handleResults);    
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
  if(error){
    console.error(error);
  } else {
    console.log(result)
    classification.result = result[0].label === "2"
    classification.confidence = round(result[0].confidence * 100, 2);
    redraw();
  }
}

function generateRandomInput() {
  return Object
    .keys(inputs)
    .reduce( (obj,c) => {
      obj[c] = random(inputs[c].min,inputs[c].max)
      return obj;
    }, {} )  
}