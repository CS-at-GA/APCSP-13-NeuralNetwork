const colorList = ['maroon','brown','olive','teal','navy','red','orange','yellow','lime'];

let data;
let stats;
let classification;

// Step 2: set your neural network options (Step 1 is in preload)
const neuralNetworkOptions = {
  task: 'classification',
  debug: true
}

const nueralNetworkTrainingOptions = {
  epochs: 64,
  batchSize: 12
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(neuralNetworkOptions);

function preload() {
  // Step 1: load data or create some data 
  loadTable('data.csv', 'csv', 'header', (table) => { // this runs after the table gets loaded. 
    data = table;
    stats = table
    .columns
    .filter( c => c != 'Classification' )
    .reduce( (obj,c) => {
      obj[c] = {min:Infinity, max:-Infinity}
      return obj;
    }, {} )
    // Step 4: add data to the neural network
    for( const row of table.getRows() ) {
      const input = {}
      table
      .columns
      .filter( c => c != 'Classification' )
      .forEach( c => {
        const value = row.getNum(c); 
        stats[c].min = min(stats[c].min, value);
        stats[c].max = max(stats[c].max, value);
        input[c] = value
      })
      const output = { classification: row.get('Classification') }
      nn.addData(input,output);
    }    
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Step 5: normalize your data;
  nn.normalizeData();
  // Step 6: train your neural network
  // Step 7: use the trained model by calling
  //   makeRandomClassification upon training completion.
  nn.train(nueralNetworkTrainingOptions, makeRandomClassification);
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
    const barHeight = (height - 100 - (data.columns.length-2)*10) / (data.columns.length-1);
    const barWidth = width - 100;
    const x = 50;
    let y = 50;
    for( let i = 0; i < data.columns.length-1; i++ ) {      
      const c = data.columns[i]
      fill(colorList[i]);
      rect(x,y,barWidth,barHeight);            
      markerX = map( classification.input[c],
        stats[c].min, stats[c].max,
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
  if( key === 'r' ) {
    makeRandomClassification();
  }
}

// Step 8: make a classification
function makeRandomClassification() {
  classification = {};
  let input = generateRandomInput();
  classification.input = input; 
  nn.classify(input, handleResults);    
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
  return data
  .columns
  .filter( c => c != 'Classification' )
  .reduce( (obj,c) => {
    obj[c] = random(stats[c].min,stats[c].max)
    return obj;
  }, {} )  
}