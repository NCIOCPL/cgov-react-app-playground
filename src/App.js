import { Router } from '@reach/router';
import React, { useEffect } from "react";
import track from "react-tracking";

import "./styles/dictionaries.scss";

import { paths } from './constants';
import DisplayGlossary from './views/DisplayGlossary';
import SearchGlossary from './views/SearchGlossary';

const App = ({ tracking }) => {
  // example tracking setup for pageload
  useEffect(() => {
    tracking.trackEvent({action: 'pageLoad'})
  }, [tracking]);

  return (
      <Router basepath="/">
        <DisplayGlossary path={paths.HOME} />
        <SearchGlossary path={paths.SEARCH} />
        <DisplayGlossary path="/" />
      </Router>
  );
};

export default track({
  page: "app_load"
})(App);
