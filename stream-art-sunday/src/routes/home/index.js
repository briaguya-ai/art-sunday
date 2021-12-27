import { h } from 'preact';
import { useState, useReducer } from 'preact/hooks';
import style from './style.css';

// artColorString() {
// 	switch (this.mode) {
// 		case 1:
// 			return 'hsl('+this.baseHue+',100%,75%)';
// 		default:
// 			return 'hsl('+this.baseHue+',100%,50%)';
// 	}
// },
// sundayColorString() {
// 	switch (this.mode) {
// 		case 1:
// 			return 'hsl('+(this.baseHue + 30)%360+',100%,75%)';
// 		default:
// 			return 'hsl('+(this.baseHue + 180)%360+',100%,50%)';
// 	}
// },
// artText() {
// 	if(this.endgame)
// 		return 'SCORE';
// 	return 'ART!';
// },
// sundayText() {
// 	if(this.endgame)
// 		return this.score;
// 	return 'SUNDAY!';
// }

// <div id="art-sunday">
// 	<div id="art" class="text">
// 		<h1 style={`{ color: ${artColorString} }`}>{artText}</h1>
// 	</div>
// 	<div id="sunday" class="text">
// 		<h1 style={`{ color: ${sundayColorString} }`}>{sundayText}</h1>
// 	</div>
// </div>


// fadeSeven() {
// 	this.baseHue = (this.baseHue + this.hueChangeRate) % 360
// 	this.score += this.hueChangeRate
// 	if (this.score % 570 === 0) {
// 		this.mode = (this.mode + 1) % 2
// 		switch (this.score) {
// 			case 24510:
// 				console.log('endgame')
// 				this.endgame = true
// 				break
// 			case 17670:
// 				this.hueChangeRate = 2
// 				this.maxChangeRate = 2
// 				break
// 			case 9120:
// 				this.hueChangeRate = 0.5
// 				this.maxChangeRate = 2
// 				break
// 			case 5700:
// 				this.hueChangeRate = 1
// 				this.maxChangeRate = 0.5
// 				break
// 			default:
// 				this.hueChangeRate += (this.maxChangeRate - this.hueChangeRate) / 2
// 		}
// 	}
// }


const Home = () => {
	// const [count, setCount] = useState(0);
	const [baseHue, setBaseHue] = useState(0);
	const [mode, setMode] = useState(0);
	const [endgame, setEndgame] = useState(false);
	const [currentHueChangeRate, setCurrentHueChangeRate] = useState(0.5);
	const [maxHueChangeRate, setMaxHueChangeRate] = useState(1);

	const initialScore = 0;
	const reducer = (score, reps) => {
		if(score % 570 === 0) {
			setMode((mode + 1) % 2)
			setCurrentHueChangeRate((maxHueChangeRate - currentHueChangeRate) / 2)
		}
		setBaseHue((baseHue + currentHueChangeRate * reps) % 360)
		return score + currentHueChangeRate * reps
	};

	const [score, dispatch] = useReducer(reducer, initialScore);
  return (
		<div onMouseMove={() => dispatch(1)} class={style.home}>
		<div id="art-sunday">
			<div id="art" class="text">
				<h1 style={{color: `hsl(${baseHue},100%,${mode ? '75%' : '50%'})` }}>{endgame ? 'SCORE' : 'ART'}</h1>
			</div>
			<div id="sunday" class="text">
				<h1 style={{color: `hsl(${mode ? baseHue + 30 : baseHue + 180},100%,${mode ? '75%' : '50%'})` }}>{endgame ? score : 'SUNDAY'}</h1>
			</div>
		</div>
			<div>
	      <p>Score: {score}</p>
				<button onClick={() => dispatch(1)}>+1</button>
	      <button onClick={() => dispatch(-1)}>-1</button>
	      <button onClick={() => dispatch(0)}>reset</button>
	    </div>
		</div>
	);
}

export default Home;
