import { Link } from "@reach/router";
import React from 'react';

import { paths } from '../../constants';
import { useStateValue } from '../../store/store';

const SearchGlossary = () => {
  const [{ dictionaryTitle }] = useStateValue();
  return (
    <div data-testid="search-glossary">
      <h1 data-testid="dictionary-title">{dictionaryTitle}</h1>
      <h4>This is the search page container</h4>
      <Link to={ paths.HOME }>Home page</Link>
    </div>
  );
};

export default SearchGlossary;