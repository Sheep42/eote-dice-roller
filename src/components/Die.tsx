import React, { ReactNode } from "react";
import { ReactComponent as Square } from '../assets/img/iconmonstr-square-filled.svg';
import { ReactComponent as Rhombus } from '../assets/img/iconmonstr-rhombus-filled.svg';
import { ReactComponent as Hexagon } from '../assets/img/iconmonstr-hexagon-filled.svg';

type DieProps = {
	children: ReactNode,
};

type DieState = {
	amount: Number
};

class Die extends React.Component<DieProps, DieState> {
	
	constructor( props: DieProps ) {
		super( props );
		this.state = {
			amount: 0,
		};

		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( event: React.ChangeEvent<HTMLInputElement> ) {
		if( event.target.value === '' ) {
			this.setState({
				amount: 0,
			});
		} else {
			this.setState({
				amount: parseInt( event.target.value, 10 ),
			});
		}
	};

	render() {
		return( 
		<span className="die">
			{ this.props.children }
			<input 
				type="number" 
				className="die-amount"
				min="0" 
				value={ this.state.amount.toString() } 
				onChange={ this.handleChange } 
			/>
		</span> 
		);
	}
}

export default Die;