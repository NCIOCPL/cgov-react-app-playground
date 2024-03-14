import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FigureCgovVideo } from '..';

describe('<FigureCgovVideo /> component', () => {
	const mockFig = {
		videoId: 'mockId',
		classes: 'mock-class',
		videoTitle: 'Mock Title',
	};

	it('creates a figure with button for youtube video and no figcaption', () => {
		render(<FigureCgovVideo {...mockFig} />);
		const figure = screen.getByRole('figure');
		expect(figure).toBeInTheDocument();

		// Make sure we added a youtube player.
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('video-preview--container');

		// There should be no caption when there is no caption
		// eslint-disable testing-library/no-node-access
		expect(figure.getElementsByTagName('figcaption')).toHaveLength(0);
	});

	it('adds a figcaption when caption text is a child of the tag', () => {
		render(<FigureCgovVideo {...mockFig}>Mock caption</FigureCgovVideo>);
		const figure = screen.getByRole('figure');
		expect(figure).toBeInTheDocument();

		// Make sure we added a youtube player.
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('video-preview--container');

		// Make sure we have a caption
		expect(screen.getByText('Mock caption')).toBeInTheDocument();
	});
});
