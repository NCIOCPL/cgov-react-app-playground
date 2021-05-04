import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import RemovableTag from '../RemovableTag';

describe('RemovableTag component', () => {
	it('should have expected button label and fire onRemove handler', () => {
		const key = 'test-id';
		const label = 'Mock Label';
		const onRemove = jest.fn();
		render(<RemovableTag key={key} label={label} onRemove={onRemove} />);
		const tagLabel = screen.queryByTestId('.cts-removable-tag__label');
		expect(screen.queryByTestId('.cts-removable-tag')).toBeInTheDocument();
		expect(
			screen.queryByTestId('.cts-removable-tag__button')
		).toBeInTheDocument();
		expect(tagLabel).toHaveTextContent(label);
		expect(tagLabel).toBeInTheDocument();
		const tagButton = screen.getByRole('button');
		expect(tagButton.value).toEqual(label);
		fireEvent.click(tagButton);
		expect(onRemove).toHaveBeenCalled();
	});
});
