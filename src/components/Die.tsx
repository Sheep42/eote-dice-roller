import React, { ReactNode } from "react";

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
	};

	render() {
		return( 
		<span className="die">
			{ this.props.children }
			<input 
				type="number" 
				className="die-amount"
				data-key={ this.props.dieKey }
				min="0" 
				value={ this.props.amount.toString() } 
				onChange={ this.handleChange } 
			/>
		</span> 
		);
	}
}

export default Die;