import React from 'react';

import SearchGlossary from '../SearchGlossary';
import { render } from '../../../utilities/testing-library';

test.only('Match dictionary name for loaded glossary', () => {
    const dictionaryTitle = 'NCI Dictionary of Cancer Terms';
    const { getByTestId } = render(<SearchGlossary />);
    expect(getByTestId('dictionary-title')).toHaveTextContent(dictionaryTitle);
});
