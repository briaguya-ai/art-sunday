import { h } from 'preact';
import ComfyJS from 'comfy.js';
import { useState, useReducer, useEffect } from 'preact/hooks';
import style from './style.css';

const levelRates = [0.5, 1, 0.75, 2, 1, 0.5];
const levelPoints = [570, 570, 1140, 570, 5700, 1140];

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

// class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//       baseHue: 0,
//       mode: 0,
//       currentLevel: 0,
//       pointsToNextLevel: 570,
//       currentHueChangeRate: 0.5,
//       nextHueChangeRate:
//     }
//   }
// }

const Home = ({ channel }) => {
  console.log(channel);
  debugger;
  if (!channel) {
    return (
      <div class={style.home}>add channel name to url</div>
    )
  }

	const [count, setCount] = useState(0);
	const [baseHue, setBaseHue] = useState(0);
	const [mode, setMode] = useState(0);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [pointsToNextLevel, setPointsToNextLevel] = useState(570);
	const [currentHueChangeRate, setCurrentHueChangeRate] = useState(levelRates[0]);
	const [nextHueChangeRate, setNextHueChangeRate] = useState(levelRates[1]);

  useEffect(() => {
    debugger;
    ComfyJS.onChat = ( user, message, flags, self, extra ) => {
      console.log("blarg");
    };
    ComfyJS.Init(channel);
  });

  // const client = new tmi.Client({
  // 	channels: [ 'briaguya0' ]
  // });
  //
  // client.connect();
  //
  // client.on('message', (channel, tags, message, self) => {
  // 	// "Alca: Hello, World!"
  // 	console.log(`${tags['display-name']}: ${message}`);
  // });

	const initialScore = 0;
	const reducer = (score, reps) => {
		setPointsToNextLevel(pointsToNextLevel - (currentHueChangeRate * reps))
		if(!pointsToNextLevel) {
			setMode((mode + 1) % 2);
			setCurrentLevel(currentLevel + 1);
			setCurrentHueChangeRate(levelRates.random());
			setPointsToNextLevel(levelPoints.random());
		}
		setBaseHue((baseHue + currentHueChangeRate * reps) % 360);
		return score + currentHueChangeRate * reps;
	};

	const [score, dispatch] = useReducer(reducer, initialScore);
  return (
		<div onMouseMove={() => dispatch(1)} class={style.home}>
		<div id="art-sunday">
			<div id="art" class="text">
				<h1 style={{color: `hsl(${baseHue},100%,${mode ? '75%' : '50%'})` }}>{`LEVEL: ${currentLevel}`}</h1>
			</div>
			<div id="sunday" class="text">
				<h1 style={{color: `hsl(${mode ? baseHue + 30 : baseHue + 180},100%,${mode ? '75%' : '50%'})` }}>{`SCORE: ${score}`}</h1>
			</div>
		</div>
			<div>
	      <p>Score: {score}</p>
				<p>Level: {currentLevel}</p>
				<p>pointsToNextLevel: {pointsToNextLevel}</p>
				<button onClick={() => dispatch(1)}>+1</button>
	      <button onClick={() => dispatch(-1)}>-1</button>
	      <button onClick={() => dispatch(0)}>reset</button>
	    </div>
		</div>
	);
}

export default Home;
