import React from "react";
import Die from "./Die";
import { ReactComponent as Square } from '../assets/img/iconmonstr-square-filled.svg';
import { ReactComponent as Rhombus } from '../assets/img/iconmonstr-rhombus-filled.svg';
import { ReactComponent as Hexagon } from '../assets/img/iconmonstr-hexagon-filled.svg';
import { BADFLAGS } from "dns";

class DiceDisplay extends React.Component {
	render() {
		return <div className="dice-display-container">
			<Die>
				<Rhombus style={{ 
					fill: "#017301",
					width: "100px",
					height: "100px",
				}} />
			</Die>

			<Die>
				<Hexagon style={{ 
					fill: "#ccc500",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die>
				<Square style={{ 
					fill: "#00a2b8",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<br />
			<Die>
				<Rhombus style={{ 
					fill: "#7800bd",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die>
				<Hexagon style={{ 
					fill: "#b80202",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<Die>
				<Square style={{ 
					fill: "#000000",
					width: "100px",
					height: "100px",
				}} />
			</Die>
			
			<br />
			
			<Die>
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