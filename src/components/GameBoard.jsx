import '../GameBoard.css';


export default function GameBoard(props) {
  let height = 8;
  let width = 12;

  let rows = [];
  for (let row = 0; row < height; row++) {
    let row = [];
    for (let col = 0; col < width; col++) {
      row.push(Math.floor(Math.random() * 10));
    }
    rows.push(row);
  }


  let widthUnit = 100 / width;
  let heightUnit = 100 / height;

  let heroAngle = props.hero.angle;
  let heroLeft = props.hero.position.x * widthUnit;
  let heroTop = props.hero.position.y * heightUnit;
  let heroStyle = {
    transform: `rotate(${heroAngle}deg)`,
    left: `${heroLeft}%`,
    top: `${heroTop}%`,
  };


	return (
		<div className="GameBoard">
      <h2>Game Board</h2>
      <div className="content">
        <div className="GameBoardWrapper">
          <span className="hero" style={heroStyle}>B</span>
          <table>
            <tbody>
              {rows.map((row, i) => <Row row={row} key={i} y={i} position={props.position} hero={props.hero} />)}
            </tbody>
          </table>
        </div>
      </div>
		</div>
	);
}

function Row(props) {
  return (
    <tr>
      {props.row.map((col, i) => <Cell col={col} key={i} y={props.y} x={i} position={props.position} hero={props.hero} />)}
    </tr>
  );
}

function Cell(props) {
  let {x, y, position} = props;
  let occupied = false; //position.x === x && position.y == y;
  let content = "";
  let style = {};
  let angle = 0;
  if (occupied) {
    angle = props.hero.angle;
    style = {transform: `rotate(${angle}deg)`};
    content = "A";
    return (
      <td className="hero">
        <span className="hero" style={style}>
          A
        </span>
      </td>
    );
  }

  return (
    <td></td>
  );
}
