import React from 'react';

import DisplayGlossary from '../DisplayGlossary';
import { render } from '../../../utilities/testing-library';

test.only('Match dictionary name for loaded glossary', () => {
    const dictionaryTitle = 'NCI Dictionary of Cancer Terms';
    const { getByTestId } = render(<DisplayGlossary />);
    expect(getByTestId('dictionary-title')).toHaveTextContent(dictionaryTitle);
});
