import React, { ReactNode } from "react";
import Button from "./Button";

type CritRollProps = {
	showCritRoll: Boolean,
};

type CritRollState = {
	critResult: number,
	critModifier: number,
};

class CritRoll extends React.Component<CritRollProps, CritRollState> {

	constructor( props: CritRollProps, state: CritRollState ) {
		super( props );
		this.state = {
			critResult: 0,
			critModifier: 0,
		};
	}

	render() {
		return this.props.showCritRoll ? (
			<section className="crit-roll">
				<p className="crit-result">{ this.state.critResult > 0 ? 'Rolled: ' + this.state.critResult.toString() : null }</p>

				<Button 
					text="Roll Crit"
					className="btn btn-primary"
					clickHandler={ () => { 
							this.setState({
								critResult: Math.floor( Math.random() * 100 ) + 1 + ( 10 * this.state.critModifier ),
							}); 
						} 
					}
				/>

				<div className="extra-crit-input">
					<span>Extra Crit</span>

					<input 
						type="number" 
						value={ this.state.critModifier } 
						min="0"
						onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) => { 

							let val: number = 0;

							if( event.target.value ) {
								val = parseInt( event.target.value, 10 );
							}

							this.setState( { 
								critModifier: val, 
							} );
						}
					} />

					<p className="help-text">+10 to result per extra advantage</p>
				</div>
			</section>
		) : null;
	}
}

export default CritRoll;