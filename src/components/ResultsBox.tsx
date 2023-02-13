import React from "react";
import { diceSymbols, DieSymbol } from "../App";

type ResultsBoxProps = {
	fullRoll: Array<DieSymbol>,
	calcRoll: Array<DieSymbol>
};

class ResultsBox extends React.Component<ResultsBoxProps> {

	render() {
		
		let rollDisplay = '';
		let rollCalced = '';

		for( let i = 0; i < this.props.fullRoll.length; i++ ) {

			if( this.props.fullRoll[i].glyph ) {
				rollDisplay += this.props.fullRoll[i].glyph;
			}

		}

		if( this.props.calcRoll.length > 0 ) {

			// Count the calced results for display
			let counter: {[key: string]: number} = {};
			for( let i = 0; i < this.props.calcRoll.length; i++ ) {
	
				if( counter[this.props.calcRoll[i].key] ) {
					counter[this.props.calcRoll[i].key] += 1;
				} else {
					counter[this.props.calcRoll[i].key] = 1;
				}
	
			}
	
			// Create the calced display
			let i = 0;
			for( let prop in counter ) {
				rollCalced += counter[prop] + ' ' + diceSymbols[prop].displayName;
				rollCalced += i < Object.keys( counter ).length - 1 ? ', ' : '';
				i++;
			}
	
		} else {
			rollCalced = 'Wash';
		}

		return (
		<div className="results">
			<div className="results-box">
				{ rollDisplay }
			</div>
			<p className="results-calced">{ rollCalced }</p>
		</div>
		);
	}
	
}

export default ResultsBox;