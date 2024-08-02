import React from "react";
import { diceSymbols, DieSymbol } from "../App";
import Button from "./Button";

type ResultsBoxProps = {
	fullRoll: Array<DieSymbol>,
	calcRoll: Array<DieSymbol>,
};

type ResultsBoxState = {
	rollDisplay: string,
	rollCalced: string,
	copyClick:  boolean,
};

class ResultsBox extends React.Component<ResultsBoxProps, ResultsBoxState> {

	constructor( props: ResultsBoxProps ) {

		super( props );

		this.state = {
			rollDisplay: "",
			rollCalced: "",
			copyClick: false,
		};

		this.copyResults = this.copyResults.bind( this );
		this.calcResults = this.calcResults.bind( this );

	}

	componentDidMount(): void {
		this.calcResults( this.state );
	}

	componentDidUpdate( prevProps: ResultsBoxProps, prevState: ResultsBoxState ): void {

		if( this.state.copyClick ) {
			setTimeout( () => {
				this.setState( { copyClick: false } );
			}, 750 );
		}

		this.calcResults( prevState );
	}
	
	copyResults() {

		if( !navigator.clipboard ) { return; }

		navigator.clipboard.writeText( this.state.rollCalced ).then(
			() => {
				this.setState( { copyClick: true } );
			},
			( err ) => {
				console.error( err );
			}
		);

	}

	calcResults( prevState: ResultsBoxState ) {

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
	
		} else if( this.props.fullRoll.length > 0 ) {
			rollCalced = 'Wash';
		}

		if( prevState.rollDisplay != rollDisplay || prevState.rollCalced != rollCalced ) {
			this.setState( { rollDisplay, rollCalced } );
		}

	}

	render() {
		return (
		<div className="results">
			<div className="results-box">
				{ this.state.rollDisplay }
			</div>

			<p className="results-calced">
				{ this.state.rollCalced } 
				<span className={ this.state.copyClick ? "copied-confirm show" : "copied-confirm" }>Copied!</span>
			</p>

			{ this.state.rollCalced && navigator.clipboard && <Button text="Copy" title="Copy result to your clipboard" className="btn btn-primary" clickHandler={ this.copyResults } /> }
		</div>
		);
	}
	
}

export default ResultsBox;
