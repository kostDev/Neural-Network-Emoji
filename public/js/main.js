axios.defaults.baseURL = 'http://localhost:4004';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const BLOCK_SIZE = 100;
const ROW_SIZE   = 5;
const COL_SIZE 	 = 5;
const CELL_COLOR = "red";
const GRID = new Array(ROW_SIZE);
let netGRID = [];

function setup() {
	createCanvas(501, 501);
	background('#fae');
	createGrid();
}

function draw() {
	GRID.map(
		arr => {
			arr.map( obj => {
				if(obj.fill) fill(obj.color);
				else fill("white");
				rect(obj.basicPostionX, obj.basicPostionY, obj.blockSizeW, obj.blockSizeH)
			});
		}
	);
}

function createGrid() {
	let blockSizeW = BLOCK_SIZE;
	let blockSizeH = BLOCK_SIZE;

	for(let y = 0; y <  COL_SIZE; y++){
		GRID[y] = new Array(COL_SIZE);
		for (let x = 0; x < ROW_SIZE; x++) {
			GRID[y][x] = {
				pos: {x: x, y: y },
				basicPostionX: x * BLOCK_SIZE,
				basicPostionY: y * BLOCK_SIZE,
				blockSizeW: blockSizeW,
				blockSizeH: blockSizeH,
				color: CELL_COLOR,
				fill: false
			};
		}
	}
}

function mousePressed() {
	let MouseX = Math.floor(mouseX / 100);
	let MouseY = Math.floor(mouseY / 100);
	if( MouseX >= 0 && MouseY >= 0 && MouseX < ROW_SIZE && MouseY < ROW_SIZE) {
		GRID[MouseY][MouseX].fill = !GRID[MouseY][MouseX].fill;
	}
	let tempArr = [];
	GRID.map(arr => arr.map(obj => tempArr.push( obj.fill ? 1  : 0 )));
	netGRID = tempArr;
  	//return false;
}


function getAnswer() {
	axios.post('/answer', {arr: netGRID})
	.then(function (res) {
	    console.log(res.data.answer);
	    clearGrid ();
		// sad: 	0,
		// smile:   0,
		// flower:  0
	    document.getElementById("answer-alert").innerHTML = `
	    	🙂: ${res.data.answer.smile.toFixed(2)},
	    	☹️: ${res.data.answer.sad.toFixed(2)}, 
	    	🌸: ${res.data.answer.flower.toFixed(2)},
	    	❤: ${res.data.answer.heart.toFixed(2)}
	    `;
	    document.getElementById("answer-alert").style.display = "block";
	});
}

function trainingNet() {
	let emoji = select.selectedOptions[0].text;
	let name  = select.selectedOptions[0].value;
	let trainingData = {
		input: netGRID , output: {}
	};
	trainingData.output[name] = 1;
	axios.post('/training', trainingData ).then(function(res) {
		console.log(res.data.posted);
		clearGrid ();
	});
}

function clearGrid () {
	GRID.map(arr => arr.map(obj => obj.fill = false));
}

function hideAlert() {
	document.getElementById("answer-alert").style.display = "none";
}
