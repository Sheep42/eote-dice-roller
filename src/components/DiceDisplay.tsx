import React from "react";
import Die from "./Die";

class DiceDisplay extends React.Component {
	render() {
		return <div className="dice-display-container">
			<Die shape="square" amount={ 0 } />
			<Die shape="rhombus" amount={ 0 } />
			<Die shape="hexagon" amount={ 0 } />
		</div>;
	}
}

export default DiceDisplay;