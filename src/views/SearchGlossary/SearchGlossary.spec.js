import { render } from '@testing-library/react';
import React from 'react';

import SearchGlossary from './SearchGlossary';

test.only('Match dictionary name for loaded glossary', () => {
    const dictionaryName = 'NCI Dictionary of Cancer Terms';
    const { getByText } = render(<SearchGlossary dictionaryName={dictionaryName} />);
    expect(getByText(dictionaryName)).toBeTruthy();
});
