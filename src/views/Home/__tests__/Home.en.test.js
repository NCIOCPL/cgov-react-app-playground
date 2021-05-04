import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Home from '../Home';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store.js');

const analyticsHandler = jest.fn(() => {});

describe('Home component(English)', () => {
	it('should links on home page', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const title = 'NCI Search Results';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				title,
			},
		]);

		render(
			<MockAnalyticsProvider>
				<MemoryRouter initialEntries={['/']}>
					<Home />
				</MemoryRouter>
			</MockAnalyticsProvider>
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getAllByRole('link')).toHaveLength(4);
	});

	it('should fire click event on link', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'es';
		const title = 'NCI Search Results';
		const altLanguageBasePath = '/espanol/publicaciones/diccionario';
		const siteName = 'National Cancer Insitute';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				title,
				altLanguageBasePath,
				siteName,
			},
		]);

		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<MemoryRouter initialEntries={['/']}>
					<Home />
				</MemoryRouter>
			</MockAnalyticsProvider>
		);

		const links = screen.getAllByRole('link');
		for (const link of links) {
			fireEvent.click(link);
			expect(analyticsHandler).toHaveBeenCalled();
		}
	});
});
