import React from "react";
import { ReactComponent as Square } from '../assets/img/iconmonstr-square-filled.svg';
import { ReactComponent as Rhombus } from '../assets/img/iconmonstr-rhombus-filled.svg';
import { ReactComponent as Hexagon } from '../assets/img/iconmonstr-hexagon-filled.svg';

interface IDieProps {
	shape: string,
	amount: Number,
};

function Die( props: IDieProps ) {
	
	var svgComponent;
	var svgComponents = [
		{
			shape: 'square', 
			component: Square,
		},
		{
			shape: 'rhombus', 
			component: Rhombus,
		},
		{
			shape: 'hexagon', 
			component: Hexagon,
		},
	];

	for( var i = 0; i < svgComponents.length; i++ ) {

		var component = svgComponents[i];

		if( props.shape === component.shape ) {
			svgComponent = <component.component />;
			break;
		}

	}

	return( <div>
		{ svgComponent }
	</div> );
}

export default Die;