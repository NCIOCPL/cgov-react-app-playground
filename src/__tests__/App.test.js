import { act, render } from '@testing-library/react';
import axios from 'axios';
import nock from 'nock';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { MemoryRouter, useLocation } from 'react-router';

import { useAppPaths } from '../hooks';
import { getAxiosClient } from '../services/api/common';
import { useStateValue } from '../store/store.js';
import { MockAnalyticsProvider } from '../tracking';
import Home from '../views/Home';

jest.mock('../store/store.js');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('App component', () => {
	let location;

	function ComponentWithLocation() {
		location = useLocation();
		return <div />;
	}

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it('HomePath route exists and matches expected route', async () => {
		const basePath = '/';
		const language = 'en';
		const siteName = 'National Cancer Institute';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				language,
				siteName,
			},
		]);

		const { HomePath } = useAppPaths();

		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<MemoryRouter initialEntries={[HomePath()]}>
						<ClientContextProvider client={getAxiosClient([])}>
							<ComponentWithLocation RenderComponent={Home} />
						</ClientContextProvider>
					</MemoryRouter>
				</MockAnalyticsProvider>
			);
		});

		const expectedLocationObject = {
			pathname: '/',
			search: '',
			hash: '',
			state: null,
			key: expect.any(String),
		};

		expect(location).toMatchObject(expectedLocationObject);
	});
});
