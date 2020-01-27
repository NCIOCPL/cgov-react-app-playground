import { Link } from '@reach/router';
import React from 'react';

import { paths } from '../../constants';

const DisplayGlossary = ({dictionaryName}) => {
  return (
    <div data-testid="display-glossary">
      <h3>{dictionaryName}</h3>
        <h4>This is the display page container</h4>
      <Link to={ paths.SEARCH }>Search page</Link>
    </div>
  );
};

export default DisplayGlossary;