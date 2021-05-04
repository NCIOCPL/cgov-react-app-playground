import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AudioPlayer from '../';

describe('<AudioPlayer /> component', () => {
	it('creates an HTML5 audio element', () => {
		render(<AudioPlayer audioSrc="mock.mp3" />);
		expect(screen.getByTestId('audio')).toBeInTheDocument();
		expect(screen.getByTestId('audio')).toHaveAttribute('preload', 'none');
	});

	it('renders a button with screenreader text', () => {
		render(<AudioPlayer audioSrc="mock.mp3" />);
		expect(screen.getByText('Listen to pronunciation')).toBeInTheDocument();
	});

	it('has spanish screenreader text if language is specified as spanish', () => {
		render(<AudioPlayer audioSrc="mock.mp3" lang="es" />);
		expect(screen.getByText('escuchar la pronunciación')).toBeInTheDocument();
	});

	it('shows error state when audio throws an error', async () => {
		const rejectStub = jest
			.spyOn(window.HTMLMediaElement.prototype, 'play')
			.mockRejectedValue(
				new Error({
					name: 'NotSupportedError',
					message: 'The element has no supported sources.',
				})
			);
		render(<AudioPlayer audioSrc="mock.mp3" />);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(rejectStub).toHaveBeenCalled();
		});
	});

	it('plays the specified file', async () => {
		const playStub = jest
			.spyOn(window.HTMLMediaElement.prototype, 'play')
			.mockResolvedValue(true);

		render(<AudioPlayer audioSrc="mock.mp3" />);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(playStub).toHaveBeenCalled();
		});
	});

	it('pauses playback if file is playing', async () => {
		const playStub = jest
			.spyOn(window.HTMLMediaElement.prototype, 'play')
			.mockResolvedValue(true);

		const pauseStub = jest
			.spyOn(window.HTMLMediaElement.prototype, 'pause')
			.mockResolvedValue(true);

		render(<AudioPlayer audioSrc="mock.mp3" />);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(playStub).toHaveBeenCalled();
		});
		fireEvent.click(screen.getByRole('button'));
		fireEvent.pause(screen.getByTestId('audio'));
		await waitFor(() => {
			expect(pauseStub).toHaveBeenCalled();
		});
	});

	it("fires tracking event when 'ended' event occurs", () => {
		const mockTrackingFn = jest.fn();
		render(<AudioPlayer audioSrc="mock.mp3" tracking={mockTrackingFn} />);
		ReactTestUtils.Simulate.ended(screen.getByTestId('audio'));
		expect(mockTrackingFn).toHaveBeenCalled();
	});
});
