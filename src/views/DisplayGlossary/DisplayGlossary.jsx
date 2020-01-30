import { Link } from '@reach/router';
import React from 'react';

import { paths } from '../../constants';
import { useStateValue } from '../../store/store';

const DisplayGlossary = () => {
  const [{ dictionaryTitle }] = useStateValue();
  return (
    <div data-testid="display-glossary">
        <h1 data-testid="dictionary-title">{dictionaryTitle}</h1>
        <h4>This is the display page container</h4>
        <div className="content">
            <p>The NCI Dictionary of Cancer Terms features 8,506 terms related to cancer and medicine.</p>
        </div>
        <Link to={ paths.SEARCH }>Search page</Link>
    </div>
  );
};

export default DisplayGlossary;