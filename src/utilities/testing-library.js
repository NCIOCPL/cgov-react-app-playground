import { render } from '@testing-library/react';
import React from 'react';

import { StateProvider } from '../store/store';
import { reducer } from '../store/reducer';
import { AnalyticsProvider } from '../tracking';
import { getBasePath } from './url';

const initialState = {
    appId: "mockAppId",
    analyticsHandler: data => {},
    dictionaryEndpoint: "",
    dictionaryTitle: "NCI Dictionary of Cancer Terms",
    dictionaryIntroText: "",
    basePath: getBasePath(),
    language: "en", // en|es (English|Spanish)
    rootId: "NCI-app-root"
};

const Providers = ({ children }) => {
    const { analyticsHandler } = initialState;
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <AnalyticsProvider analyticsHandler={analyticsHandler}>
                { children }
            </AnalyticsProvider>
        </StateProvider>
    );
};

const customTestRender = (ui, options) => {
    return render(ui, { wrapper: Providers, ...options });
};

export * from '@testing-library/react';
export { customTestRender as render };