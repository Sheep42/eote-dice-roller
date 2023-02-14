import React from "react";
import { RollOutcome } from "../App";

type RollLogProps = {
	rollLog: Array<RollOutcome>,
};

class RollLog extends React.Component<RollLogProps> {
	render() {
		return (
			<table className="roll-log">

			</table>
		);
	}
}

export default RollLog;