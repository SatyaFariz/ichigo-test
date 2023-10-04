import { useState } from 'react';
import './App.css';

function shuffle(colors) {
  const array = [...colors]
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function App() {
  const [colors, setColors] = useState([
    '#0089e0',
    '#e53459',
    '#8d7a5b',
    '#b95e62',
    '#7f01cb',
    '#00b29f',
    '#007b67',
    '#6953fe',
    '#475c6d'
  ])

  const onBoxClick = () => {
    setColors(shuffle(colors))
  }

  return (
    <div className="App">
      <div className='container1234 container'>
        <div className='box1 box' style={{ backgroundColor: colors[0] }} onClick={onBoxClick}>
          1
        </div>

        <div className='container234 container'>
          <div className='box2 box' style={{ backgroundColor: colors[1] }} onClick={onBoxClick}>
            2
          </div>
          <div className='container34 container'>
            <div className='box3 box' style={{ backgroundColor: colors[2] }} onClick={onBoxClick}>
              3
            </div>
            <div className='box4 box'  style={{ backgroundColor: colors[3] }} onClick={onBoxClick}>
              4
            </div>
          </div>
        </div>
      </div>

      <div className='container56789 container'>
        <div className='box5 box' style={{ backgroundColor: colors[4] }} onClick={onBoxClick}>
          5
        </div>
        <div className='box6 box' style={{ backgroundColor: colors[5] }} onClick={onBoxClick}>
          6
        </div>
        <div className='box7 box' style={{ backgroundColor: colors[6] }} onClick={onBoxClick}>
          7
        </div>
        <div className='box8 box' style={{ backgroundColor: colors[7] }} onClick={onBoxClick}>
          8
        </div>
        <div className='box9 box' style={{ backgroundColor: colors[8] }} onClick={onBoxClick}>
          9
        </div>
      </div>
    </div>
  );
}

export default App;
