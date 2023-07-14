import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ItemDetails from '../ItemDetails.jsx';
import { MockAnalyticsProvider } from '../../../tracking';
import { useCustomQuery } from '../../../hooks';

jest.mock('../../../store/store.js');
jest.mock('../../../hooks/customFetch.js');

describe('Item Detail Page Component', () => {
	describe('ItemDetails component', () => {
		// Reset the spinner before each test
		beforeEach(() => {
			useCustomQuery.mockReturnValue({
				loading: true,
				payload: [],
			});
		});

		it('should initially display a spinner', async () => {
			render(
				<MockAnalyticsProvider>
					<MemoryRouter initialEntries={['/item/12345']}>
						<ItemDetails />
					</MemoryRouter>
				</MockAnalyticsProvider>
			);

			expect(screen.getByTestId('.nci-spinner')).toBeInTheDocument();
		});
	});
});
