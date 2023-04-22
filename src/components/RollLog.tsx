import React, { ReactNode } from "react";
import { RollOutcome } from "../App";
import Button from "./Button";

type RollLogProps = {
	rollLog: Array<RollOutcome>,
	handleReroll: Function,
	showRollLog: Boolean,
};

class RollLog extends React.Component<RollLogProps> {

	generateTableRows(): Array<ReactNode> {

		let rows: Array<ReactNode> = [];

		for( let i = 0; i < this.props.rollLog.length; i++ ) {

			let row: ReactNode;
			let rolledDice = this.props.rollLog[i].dice.filter( d => d.amount > 0 );
			let dice = '';
			let fullRoll = '';
			let calcRoll = '';

			for( let j = 0; j < rolledDice.length; j++ ) {

				let d = rolledDice[j];
				dice += d.amount + ' ' + d.displayName;
				dice += ( j + 1 ) === rolledDice.length ? '' : ', ';
				
			}

			// Don't log empty rolls
			if( dice === '' ) continue;

			for( let j = 0; j < this.props.rollLog[i].fullRoll.length; j++ ) {
				fullRoll += (this.props.rollLog[i].fullRoll[j].glyph) ? this.props.rollLog[i].fullRoll[j].glyph : '';
			}

			for( let j = 0; j < this.props.rollLog[i].calcRoll.length; j++ ) {
				calcRoll += (this.props.rollLog[i].calcRoll[j].glyph) ? this.props.rollLog[i].calcRoll[j].glyph : '';
			}

			row = (
			<tr>
				<td>{ dice }</td>
				<td className="symbols">{ fullRoll }</td>
				<td className="symbols">{ calcRoll }</td>
				<td>
					<Button 
						text="Roll Again" 
						clickHandler={ () => this.props.handleReroll( this.props.rollLog[i].dice ) } 
						className="btn btn-primary" 
					/>
				</td>
			</tr>
			);

			rows.push( row );

		}

		return rows;

	}

	render() {
		return this.props.showRollLog ? (
			<table className="roll-log">
				<thead>
					<tr>
						<th>Dice</th>
						<th>Roll</th>
						<th>Outcome</th>
						<th>ReRoll</th>
					</tr>
				</thead>
				<tbody>
					{ this.generateTableRows() }
				</tbody>
			</table>
		) : null;
	}
}

export default RollLog;