import React from "react";

type ButtonProps = {
	text: string,
	clickHandler: Function,
};

class Button extends React.Component<ButtonProps> {

	constructor( props: ButtonProps ) {
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick( event: React.MouseEvent<HTMLElement> ) {
		this.props.clickHandler( event );
	}

	render() {
		return (
		<button
			onClick={ this.handleClick }
		>
			{ this.props.text }
		</button>
		);
	}
}

export default Button;