import { Router } from '@reach/router';
import React, { useEffect } from "react";
import { useStateValue } from "./store/store";
import track from "react-tracking";

import "./styles/dictionaries.scss";

import { paths } from './constants';
import DisplayGlossary from './views/DisplayGlossary';
import SearchGlossary from './views/SearchGlossary';

const App = ({ tracking, baseUrl }) => {
  // this should be a DUMB component that just displays our display(group) components
  const [{ basePath, dictionaryName }] = useStateValue();

  //example tracking setup for pageload
  useEffect(() => {
    tracking.trackEvent({action: 'pageLoad'})
  }, [tracking]);

  return (
      <Router basepath={ basePath }>
        <DisplayGlossary path={paths.HOME} dictionaryName={dictionaryName} />
        <SearchGlossary path={paths.SEARCH} dictionaryName={dictionaryName} />
      </Router>
  );
};

export default track({
  page: "app_load"
})(App);
