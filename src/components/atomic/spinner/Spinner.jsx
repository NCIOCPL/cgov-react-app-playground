import React from 'react';

import './Spinner.scss';

const Spinner = () => (
	<div data-testid=".nci-spinner" className="nci-spinner">
		<div data-testid=".spinkit" className="spinkit spinner">
			<div data-testid=".dot1" className="dot1"></div>
			<div data-testid=".dot2" className="dot2"></div>
		</div>
	</div>
);

export default Spinner;
