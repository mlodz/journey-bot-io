import '../ControlBoard.css';

import {useState} from 'react';


let commandData = {
  left: {
    label: "left",
    ascii: "↰",
    color: '#00a',
  },
  right: {
    label: "right",
    ascii: "↱",
    color: '#0a0',
  },
  move: {
    label: "move",
    ascii: "⇨",
    color: '#a00',
  },
};


export default function ControlBoard(props) {
  const validCommands = new Set(['move', 'left', 'right', 'beep']);
  const isCommand = str => {
    return validCommands.has(str.toLowerCase().trim());
  };

  const handleTyping = e => {
    let input = e.target.value || '';
    let pieces = input.split(",");
    let newCommands = pieces.filter(isCommand);
    props.onChangeCommands(newCommands);
  };

  const addCommand = command => {
    props.onChangeCommands([...props.commands, command]);
  };

  const clearCommands = () => {
    props.onChangeCommands([]);
  };
  const deleteLastCommand = () => {
    let newCommands = [...props.commands];
    newCommands.pop();
    props.onChangeCommands(newCommands);
  };

  return (
    <div className="ControlBoard" >
      <h2>Control Board</h2>
      <div className="content">
        <div>
          <ParsedCommands commands={props.commands}/>

          <input onClick={e => addCommand('move')} value="Move" type="button" disabled={props.disabled}/>
          <input onClick={e => addCommand('left')} value="Left" type="button" disabled={props.disabled} />
          <input onClick={e => addCommand('right')} value="Right" type="button" disabled={props.disabled} />
          <hr />
          <input onClick={e => clearCommands()} value="Clear" type="button" disabled={props.disabled} />
          <input onClick={e => deleteLastCommand()} value="Delete Last" type="button" disabled={props.disabled} />
        </div>
      </div>
    </div>
  );
}


function ParsedCommands(props) {
  let items = props.commands.map((c,i) => <li className={`command ${c}`} key={i}>{commandData[c].ascii}</li>);
  return (
    <ul className="command-list">
      {items}
    </ul>
  );
}
