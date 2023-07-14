import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import RemovableTag from '../RemovableTag';

describe('RemovableTag component', () => {
	const label = 'Mock Label';

	it('should render without crashing', () => {
		render(<RemovableTag label={label} />);
		expect(screen.queryByTestId('.cts-removable-tag')).toBeInTheDocument();
	});

	it('should display correct tag label', () => {
		render(<RemovableTag label={label} />);
		const tagLabel = screen.queryByTestId('.cts-removable-tag__label');
		expect(tagLabel).toHaveTextContent(label);
	});

	it('should have a button with correct aria-label and value', () => {
		render(<RemovableTag label={label} />);
		const tagButton = screen.getByRole('button');
		expect(tagButton).toHaveAttribute('aria-label', `remove ${label}`);
		expect(tagButton.value).toEqual(label);
	});

	it('should fire the onRemove handler when button is clicked', () => {
		const onRemove = jest.fn();
		render(<RemovableTag label={label} onRemove={onRemove} />);
		const tagButton = screen.getByRole('button');
		fireEvent.click(tagButton);
		expect(onRemove).toHaveBeenCalledWith({ label });
	});

	// This is to ensure that the default no-op onRemove is provided
	// and doesn't throw an error when invoked.
	it('should not throw an error when onRemove is not provided and button is clicked', () => {
		render(<RemovableTag label={label} />);
		const tagButton = screen.getByRole('button');
		expect(() => {
			fireEvent.click(tagButton);
		}).not.toThrow();
	});
});
