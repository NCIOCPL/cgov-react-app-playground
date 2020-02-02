import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./store/store";
import { AnalyticsProvider } from "./tracking";

const initialize = ({
  appId = "@@/DEFAULT_DICTIONARY",
  baseUrl = '/',
  analyticsHandler = data => {},
  dictionaryEndpoint = "",
  dictionaryName = "Dictionary",
  dictionaryIntroText = "",
  language = "en", // en|es (English|Spanish)
  rootId = "NCI-app-root"
} = {}) => {
  const appRootDOMNode = document.getElementById(rootId);
  const isRehydrating = appRootDOMNode.getAttribute("data-isRehydrating");

  //populate global state with init params
  const initialState = {
    appId,
    baseUrl,
    dictionaryEndpoint,
    dictionaryName,
    dictionaryIntroText,
    language
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_GLOBAL":
        return {
          ...state,
          [action.payload.field]: action.payload.value
        };
      case "LOAD_GLOBALS":
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };

  if (isRehydrating) {
    ReactDOM.hydrate(
      <StateProvider initialState={initialState} reducer={reducer}>
        <AnalyticsProvider analyticsHandler={analyticsHandler}>
          <App baseUrl={baseUrl} />
        </AnalyticsProvider>
      </StateProvider>,
      appRootDOMNode
    );
  } else {
    ReactDOM.render(
      <StateProvider initialState={initialState} reducer={reducer} >
        <AnalyticsProvider analyticsHandler={analyticsHandler}>
          <App baseUrl={baseUrl} />
        </AnalyticsProvider>
      </StateProvider>,
      appRootDOMNode
    );
  }
  return appRootDOMNode;
};

const getProductionTestBase = () => {
  const url = window.location.pathname;
  const components = url.split('/');
  if (components.length < 2) {
    throw Error("Path does not match expectations");
  }
  return '/' + ([components[0], components[1]].join('/'));
};

// The following lets us run the app in dev not in situ as would normally be the case.
if (process.env.NODE_ENV !== "production") {
  initialize({
    analyticsHandler: (data) => { console.log(data); },
    dictionaryName: 'NCI Dictionary of Cancer Terms',
    dictionaryIntroText: 'Intro Text Here'
  });
} else if (window?.location?.host === 'react-app-dev.cancer.gov') {
  // This is for product testing
  initialize({
    baseUrl: getProductionTestBase(),
    analyticsHandler: (data) => { console.log(data); },
    dictionaryName: 'NCI Dictionary of Cancer Terms',
    dictionaryIntroText: 'Intro Text Here'
  });
}

export default initialize;
