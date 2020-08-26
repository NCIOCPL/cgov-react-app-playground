import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';

import Home from '../Home';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store.js');

describe('Home component(English)', () => {
	test('should links on home page', async () => {
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

		const { container } = render(
			<MockAnalyticsProvider>
				<MemoryRouter initialEntries={['/']}>
					<Home />
				</MemoryRouter>
			</MockAnalyticsProvider>
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(container.querySelectorAll('a').length).toEqual(4);
	});
});
