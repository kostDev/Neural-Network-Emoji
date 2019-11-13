# Neural-Network-Emoji
Neural network for checking emoji (Use: [BrainJS](https://github.com/BrainJS/brain.js))

## How to run:
```
npm i
npm i -g nodemon
nodemon server.js
```
link: http://localhost:4004/

## How to train:
- In ```training_data.json``` I save simple object of each training for emoji which was draw.

example for heart:
```javascript
{
  "input": [1,0,0,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,0,0],
  "output": { "heart":1 }
}
```
- For training at first you should delete my data in file ```training_data.json```, or just use current data. 
- For training you should choose the emoji then draw this emoji on the grid and then press <b>training</b> button. if everything will be okey grid will be refresh.

## How to use:
- Just draw emoji on the grid and then press: <b>check</b>

## How add my emoji for training:
- Add your emoji in <b>select</b> tag as <b>option</b> (index.html) 
- Add line of ```yourEmoji: ${res.data.answer.yourEmoji.toFixed(2)}``` (main.js)

```html
<select class="custom-select" id="select">
  <option value="smile" selected>🙂</option>
	<option value="sad">☹️</option>
	<option value="flower">🌸</option>
	<option value="heart">❤</option>
</select>
```

```javascript
document.getElementById("answer-alert").innerHTML = `
  🙂: ${res.data.answer.smile.toFixed(2)},
  ☹️: ${res.data.answer.sad.toFixed(2)},
  🌸: ${res.data.answer.flower.toFixed(2)},
  ❤: ${res.data.answer.heart.toFixed(2)}
`;
```

Here is sreenshot of simple UI:
![Screenshot_1](https://github.com/kostDev/Neural-Network-Emoji/blob/master/public/screenshots/Screenshot1.png)
