import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './polyfills';

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { ClientContextProvider } from 'react-fetching-library';

import App from './App';
import {
	getAxiosClient,
	replacingRequestInterceptor,
} from './services/api/common';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import { StateProvider } from './store/store';
import { AnalyticsProvider, EddlAnalyticsProvider } from './tracking';
import { getProductTestBase } from './utils';
import { ErrorBoundary } from './views';

/**
 * Initializes the Playground App.
 * @param {object} params - Configuration for the app
 * @param {string} params.analyticsName - The name of the dictionary for analytics purposes.
 */
const initialize = ({
	analyticsChannel = 'Search',
	// This should still be configurable in case someone is hosting
	// this outside of the digital platform, and wants to hookup
	// their own analytics. See index.html for an overly complicated
	// configuration that handles logging to the console.
	analyticsHandler = 'EddlAnalyticsHandler',
	analyticsContentGroup = 'Global Search',
	analyticsPublishedDate = 'unknown',
	appId = '@@/DEFAULT_REACT_APP_ID',
	baseHost = 'http://localhost:3000',
	basePath = '/',
	apiEndpoint = '/api/sampleapi/v1/',
	canonicalHost = 'https://www.cancer.gov',
	language = 'en',
	rootId = 'NCI-app-root',
	siteName = 'National Cancer Institute',
	title = 'NCI Search Results',
} = {}) => {
	const appRootDOMNode = document.getElementById(rootId);
	const isRehydrating = appRootDOMNode.getAttribute('data-isRehydrating');

	//populate global state with init params
	const initialState = {
		apiEndpoint,
		appId,
		analyticsChannel,
		analyticsContentGroup,
		analyticsPublishedDate,
		baseHost,
		basePath,
		canonicalHost,
		language,
		siteName,
		title,
	};

	// Determine the analytics HoC we are going to use.
	// The following allows the app to be more portable, cgov will
	// default to using EDDL Analytics. Other sites could supplier
	// their own custom handler.
	const AnalyticsHoC = ({ children }) =>
		analyticsHandler === 'EddlAnalyticsHandler' ? (
			<EddlAnalyticsProvider
				pageLanguage={language === 'es' ? 'spanish' : 'english'}
				pageChannel={analyticsChannel}
				pageContentGroup={analyticsContentGroup}
				publishedDate={analyticsPublishedDate}>
				{children}
			</EddlAnalyticsProvider>
		) : (
			<AnalyticsProvider analyticsHandler={analyticsHandler}>
				{children}
			</AnalyticsProvider>
		);

	AnalyticsHoC.propTypes = {
		children: PropTypes.node,
	};

	// Setup any interceptors for RFL.
	const interceptors = [
		replacingRequestInterceptor('sampleAPI', {
			API_ENDPOINT: apiEndpoint,
		}),
	];

	const AppBlock = () => {
		return (
			<StateProvider initialState={initialState} reducer={reducer}>
				<AnalyticsHoC>
					<ClientContextProvider client={getAxiosClient(interceptors)}>
						<ErrorBoundary>
							<App />
						</ErrorBoundary>
					</ClientContextProvider>
				</AnalyticsHoC>
			</StateProvider>
		);
	};

	if (isRehydrating) {
		ReactDOM.hydrate(<AppBlock />, appRootDOMNode);
	} else {
		ReactDOM.render(<AppBlock />, appRootDOMNode);
	}
	return appRootDOMNode;
};

export default initialize;

//add initialize to window
window.CgovReactAppPlayground = initialize;

// The following lets us run the app in dev not in situ as would normally be the case.
const appParams = window.APP_PARAMS || {};
const integrationTestOverrides = window.INT_TEST_APP_PARAMS || {};
if (process.env.NODE_ENV !== 'production') {
	//This is DEV
	const dictSettings = {
		...appParams,
		...integrationTestOverrides,
		searchEndpoint: '/api/sitewidesearch/v1/',
	};
	initialize(dictSettings);
} else if (window?.location?.host === 'react-app-dev.cancer.gov') {
	// This is for product testing
	const dictSettings = {
		...appParams,
		...integrationTestOverrides,
		...{ basePath: getProductTestBase() },
		apiEndpoint: `${getProductTestBase()}/api/sampleapi/v1/`,
	};
	initialize(dictSettings);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
