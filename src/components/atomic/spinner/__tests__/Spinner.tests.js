import { render, screen } from '@testing-library/react';
import React from 'react';

import Spinner from '../Spinner';

describe('Spinner component', () => {
	it('should have expected button label and fire onRemove handler', () => {
		render(<Spinner />);
		expect(screen.getByTestId('.nci-spinner')).toBeInTheDocument();
		expect(screen.getByTestId('.spinkit')).toBeInTheDocument();
		expect(screen.getByTestId('.dot1')).toBeInTheDocument();
		expect(screen.getByTestId('.dot2')).toBeInTheDocument();
	});
});
