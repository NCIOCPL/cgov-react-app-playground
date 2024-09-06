import React from 'react';
import { render, screen } from '@testing-library/react';
import EddlAnalyticsProvider from '../eddl-analytics-provider';
import { EddlAnalyticsHandler } from '../../utils/index';

jest.mock('../../utils/index', () => ({
	EddlAnalyticsHandler: jest.fn(() => jest.fn()),
}));

describe('EddlAnalyticsProvider', () => {
	it('should render without crashing', () => {
		const children = <div>Test</div>;
		const analyticsHandler = EddlAnalyticsHandler(window);

		render(
			<EddlAnalyticsProvider analyticsHandler={analyticsHandler} pageName="testPage" pageTitle="Test Page" pageMetaTitle="Test Meta Title" pageLanguage="English" pageAudience="Test Audience" pageChannel="Test Channel" pageContentGroup="Test Content Group" pagePublishedDate="Test Date">
				{children}
			</EddlAnalyticsProvider>
		);

		// Use Testing Library's query method
		const testElement = screen.getByText('Test');
		expect(testElement).toBeInTheDocument();
	});
});
