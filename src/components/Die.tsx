import React, { ReactNode } from "react";
import { diceTypes } from "../App";

type DieProps = {
	children: ReactNode,
	changeHandler: Function,
	amount: Number,
	dieKey: string,
};

class Die extends React.Component<DieProps> {
	
	constructor( props: DieProps ) {
		super( props );
		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( event: React.ChangeEvent<HTMLInputElement> ) {
		let key = event.target.dataset.key;
		this.props.changeHandler( event, key );
	}

	handleFocus( event: React.FocusEvent<HTMLInputElement> ) {
		event.target.select();
	}

	handleClick( event: React.MouseEvent<HTMLElement> ) {
		let input: HTMLInputElement|null = event.currentTarget.querySelector( '.die-amount' );
		input?.focus();
	}

	render() {
		return( 
		<span className={ this.props.dieKey === diceTypes.force.key ? "die white-bg" : "die" }
			onClick={ this.handleClick }
		>
			{ this.props.children }
			<input 
				type="number" 
				className="die-amount"
				data-key={ this.props.dieKey }
				min="0" 
				value={ this.props.amount.toString() } 
				onFocus={ this.handleFocus }
				onChange={ this.handleChange } 
			/>
		</span> 
		);
	}
}

export default Die;