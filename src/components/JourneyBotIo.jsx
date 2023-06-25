import '../JourneyBotIo.css';
import {useEffect, useState} from 'react';

import GameBoard from './GameBoard';
import ControlBoard from './ControlBoard';


const defaultCommands = ['move', 'right', 'move', 'left', 'move'];
const defaultPosition = {x: 1, y: 1};
const defaultHero = {
  position: defaultPosition,
  angle: 0,
};


export default function JourneyBotIo() {
  const [commands, setCommands] = useState(defaultCommands);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [hero, setHero] = useState(defaultHero);

  let isRunning = commandIndex >= 0;

  useEffect(() => {
    if (commandIndex < 0) {
      return;
    }
    if (commandIndex >= commands.length) {
      setCommandIndex(-1);
      return;
    }

    setTimeout(() => {
      setCommandIndex(p => p + 1);
    }, 600);


    let command = commands[commandIndex];

    if (command === 'left') {
      setHero({
        ...hero,
        angle: hero.angle - 90
      });
    }
    if (command === 'right') {
      setHero({
        ...hero,
        angle: hero.angle + 90
      });
    }
    if (command === 'move') {
      // translate the angle into 0, 1, 2, 3
      let direction= Math.floor(
        (
          (((hero.angle % 360) + 360) % 360)
            / 90) % 4);

      let newPosition;
      if (direction === 0) { // move right
        newPosition = {
          x: hero.position.x+1,
          y:hero.position.y
        };
      }
      if (direction === 1) { // move down
        newPosition = {
          x: hero.position.x,
          y:hero.position.y + 1,
        };
      }
      if (direction === 2) { // move left
        newPosition = {
          x: hero.position.x-1,
          y:hero.position.y
        };
      }
      if (direction === 3) { // move up
        newPosition = {
          x: hero.position.x,
          y:hero.position.y - 1,
        };
      }

      setHero({
        ...hero,
        position: newPosition,
      });
    }

  }, [commandIndex, commands]);

  const onChangeCommands = newCommands => {
    setCommands([...newCommands]);
  };

	return (
			<div className="JourneyBotIo">
        <h1>Journey Bot Io</h1>
        <div className="content">
          <ControlBoard
            commands={commands}
            onChangeCommands={onChangeCommands}
            disabled={isRunning}
          />

          <input onClick={() => setCommandIndex(0)} value="Execute" type="button" disabled={isRunning}/>

          <GameBoard commands={commands} position={hero.position} hero={hero}/>
        </div>
			</div>
	);
}
