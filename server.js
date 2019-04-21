const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const Brain = require("brain.js");
const TrainingData = { data: [] };
const trainingDataJson = './training_data.json';


fs.readFile(trainingDataJson, 'utf8', function (err, data) {
	if (err) return err;
	else if (data) {
		TrainingData.data = JSON.parse(data);
		net.train(JSON.parse(data));
	}
});


const config = {
    // binaryThresh: 0.5,
    outputSize: 3,
    hiddenLayers: [25],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    //leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
};

const net = new Brain.NeuralNetwork(config);

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/answer', function (req, res) {
	let answer = net.run(req.body.arr);
	console.log(answer)
	res.send({answer: answer})
});

app.post('/training', function (req, res) {
	console.log(req.body.input, req.body.output);
	let trainingData = {
		input: req.body.input,
		output: req.body.output
	};
	TrainingData.data.push(trainingData);
	fs.writeFile(trainingDataJson, JSON.stringify(TrainingData.data), (err) => err);

	let answer = net.train([ trainingData ]);
	res.send({posted: answer});
});

app.listen(4004, function () {
  console.log('Listening on port 4004!');
});
