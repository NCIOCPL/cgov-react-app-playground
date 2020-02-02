import { Link } from "@reach/router";
import React from 'react';

const SearchGlossary = ({dictionaryName}) => {
  return (
    <div data-testid="search-glossary">
      <h3>{dictionaryName}</h3>
      <h4>This is the search page container</h4>
      <Link to='./'>Home page</Link>
    </div>
  );
};

export default SearchGlossary;