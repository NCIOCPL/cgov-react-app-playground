import { render } from '@testing-library/react';
import React from 'react';

import DisplayGlossary from './DisplayGlossary';

test.only('Match dictionary name for loaded glossary', () => {
    const dictionaryName = 'NCI Dictionary of Cancer Terms';
    const { getByText } = render(<DisplayGlossary dictionaryName={dictionaryName} />);
    expect(getByText(dictionaryName)).toBeTruthy();
});
