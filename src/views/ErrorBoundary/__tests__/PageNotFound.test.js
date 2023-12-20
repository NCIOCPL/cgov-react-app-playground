import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PageNotFound from '../PageNotFound';
import { useStateValue } from '../../../store/store';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store');

describe('PageNotFound component', () => {
	it('should show error page title ( English )', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
			},
		]);

		render(
			<MockAnalyticsProvider>
				<PageNotFound />
			</MockAnalyticsProvider>
		);

		const expectedPageTitle = 'Page Not Found';
		expect(screen.getByText(expectedPageTitle)).toBeInTheDocument();
		const searchBox = screen.getAllByLabelText('Search', {
			selector: 'input',
		});
		const searchButton = screen.getByRole('button', { name: 'Search' });
		fireEvent.change(searchBox[0], { target: { value: 'chicken' } });
		fireEvent.click(searchButton);
	});

	it('should show error page title ( Espanol )', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'es';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
			},
		]);

		render(
			<MockAnalyticsProvider>
				<PageNotFound />
			</MockAnalyticsProvider>
		);

		const expectedPageTitle = 'No se encontró la página';
		expect(screen.getByText(expectedPageTitle)).toBeInTheDocument();
		const searchBox = screen.getAllByLabelText('Buscar', {
			selector: 'input',
		});
		const searchButton = screen.getByRole('button', { name: 'Buscar' });
		fireEvent.change(searchBox[0], { target: { value: 'pollo' } });
		fireEvent.click(searchButton);
	});
});
