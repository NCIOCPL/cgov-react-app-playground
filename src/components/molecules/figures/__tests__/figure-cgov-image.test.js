import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FigureCgovImage } from '..';

describe('<FigureCgovImage /> component', () => {
	const mockFig = {
		altText: 'mock alt text',
		thumb_uri: 'http://mock.png',
	};

	it('creates a figure containing an image and does not create a figcaption when both credit and caption are absent', () => {
		render(<FigureCgovImage {...mockFig} />);
		const figure = screen.getByRole('figure');
		expect(figure).toBeInTheDocument();
		// There should be no caption when there is not a credit or caption
		// eslint-disable testing-library/no-node-access
		expect(figure.getElementsByTagName('figcaption')).toHaveLength(0);
	});

	it('creates a figure with classes when supplied with classes list', () => {
		render(<FigureCgovImage classes="mockstyle" {...mockFig} />);
		const figure = screen.getByRole('figure');
		expect(figure).toBeInTheDocument();
		expect(figure).toHaveClass('mockstyle');
		// There should be no caption when there is not a credit or caption
		// eslint-disable testing-library/no-node-access
		expect(figure.getElementsByTagName('figcaption')).toHaveLength(0);
	});

	it('creates a figcaption containing caption text when caption is supplied', () => {
		render(
			<FigureCgovImage
				caption="mock caption describing chickens"
				{...mockFig}
			/>
		);
		expect(
			screen.getByText('mock caption describing chickens')
		).toBeInTheDocument();
	});

	it('creates a figcaption containing a credit when a credit is supplied', () => {
		render(<FigureCgovImage credit="mock credit" {...mockFig} />);
		expect(screen.getByText('Credit: mock credit')).toBeInTheDocument();
	});

	it('includes an enlarge button when an enlarge_uri is supplied', () => {
		render(<FigureCgovImage enlarge_uri="http://mock.jpg" {...mockFig} />);
		const enlargeButton = screen.getByText('Enlarge');
		expect(enlargeButton).toBeInTheDocument();
		const hiddenText = within(enlargeButton).getByText(
			'this image in new window'
		);
		expect(hiddenText).toBeInTheDocument();
	});

	it("displays spanish text when language='es' is supplied", () => {
		render(
			<FigureCgovImage
				lang="es"
				enlarge_uri="http://mock.jpg"
				credit="mock credit"
				{...mockFig}
			/>
		);
		const enlargeButton = screen.getByText('Ampliar');
		expect(enlargeButton).toBeInTheDocument();
		const hiddenText = within(enlargeButton).getByText(
			'- abre en nueva ventana'
		);
		expect(hiddenText).toBeInTheDocument();

		expect(screen.getByText('Crédito: mock credit')).toBeInTheDocument();
	});
});
