import { Link } from "@reach/router";
import React from 'react';

import { paths } from "../../constants";

const SearchGlossary = ({dictionaryName}) => {
  return (
    <div data-testid="search-glossary">
      <h3>{dictionaryName}</h3>
      <h4>This is the search page container</h4>
      <Link to={ paths.HOME }>Home page</Link>
    </div>
  );
};

export default SearchGlossary;