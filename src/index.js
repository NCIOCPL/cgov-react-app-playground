import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./store/store";
import { reducer } from './store/reducer';
import { AnalyticsProvider } from "./tracking";
import { getBasePath } from './utilities/url';

const initialize = ({
  appId = "@@/DEFAULT_DICTIONARY",
  analyticsHandler = data => {},
  basePath = getBasePath(),
  dictionaryEndpoint = "",
  dictionaryTitle = "Dictionary",
  dictionaryIntroText = "",
  language = "en", // en|es (English|Spanish)
  rootId = "NCI-app-root"
} = {}) => {
  const appRootDOMNode = document.getElementById(rootId);
  const isRehydrating = appRootDOMNode.getAttribute("data-isRehydrating");

  //populate global state with init params
  const initialState = {
    appId,
    basePath,
    dictionaryEndpoint,
    dictionaryTitle,
    dictionaryIntroText,
    language
  };

  if (isRehydrating) {
    ReactDOM.hydrate(
      <StateProvider initialState={initialState} reducer={reducer}>
        <AnalyticsProvider analyticsHandler={analyticsHandler}>
          <App />
        </AnalyticsProvider>
      </StateProvider>,
      appRootDOMNode
    );
  } else {
    ReactDOM.render(
      <StateProvider initialState={initialState} reducer={reducer} >
        <AnalyticsProvider analyticsHandler={analyticsHandler}>
          <App />
        </AnalyticsProvider>
      </StateProvider>,
      appRootDOMNode
    );
  }
  return appRootDOMNode;
};

// The following lets us run the app in dev not in situ as would normally be the case.
if (process.env.NODE_ENV !== "production") {
  initialize({
    analyticsHandler: (data) => { console.log(data); },
    dictionaryTitle: 'NCI Dictionary of Cancer Terms',
    dictionaryIntroText: 'Intro Text Here'
  });
}

export default initialize;
