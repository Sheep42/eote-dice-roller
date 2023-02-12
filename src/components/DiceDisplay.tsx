import React from "react";
import Die from "./Die";
import { ReactComponent as Square } from '../assets/img/iconmonstr-square-filled.svg';
import { ReactComponent as Rhombus } from '../assets/img/iconmonstr-rhombus-filled.svg';
import { ReactComponent as Hexagon } from '../assets/img/iconmonstr-hexagon-filled.svg';
import { DiceRoll, diceTypes, getAmountForDie, getDiceRollForKey } from "../App";

type DisplayProps = {
	numberChangeHandler: Function,
	currentRoll: Array<DiceRoll>,
};

class DiceDisplay extends React.Component<DisplayProps> {

	// constructor( props: DisplayProps ) {
	// 	super( props );
	// }

	render() {
		return <div className="dice-display-container">
			<Die
				dieKey={ diceTypes.green.key }
				amount={ getAmountForDie( diceTypes.green.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Rhombus style={{ 
					fill: "#017301",
					width: "100px",
					height: "100px",
				}} />
			</Die>

			<Die
				dieKey={ diceTypes.yellow.key }
				amount={ getAmountForDie( diceTypes.yellow.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Hexagon style={{ 
					fill: "#ccc500",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die
				dieKey={ diceTypes.blue.key }
				amount={ getAmountForDie( diceTypes.blue.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Square style={{ 
					fill: "#00a2b8",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<br />
			<Die
				dieKey={ diceTypes.purple.key }
				amount={ getAmountForDie( diceTypes.purple.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Rhombus style={{ 
					fill: "#7800bd",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die
				dieKey={ diceTypes.red.key }
				amount={ getAmountForDie( diceTypes.red.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Hexagon style={{ 
					fill: "#b80202",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die
				dieKey={ diceTypes.black.key }
				amount={ getAmountForDie( diceTypes.black.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Square style={{ 
					fill: "#000000",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<br />
			
			<Die
				dieKey={ diceTypes.force.key }
				amount={ getAmountForDie( diceTypes.force.key, this.props.currentRoll ) }
				changeHandler={ this.props.numberChangeHandler }
			>
				<Hexagon style={{ 
					fill: "#ffffff",
					width: "100px",
					height: "100px",
				}} />
			</Die>
		</div>;
	}
}

export default DiceDisplay;