import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import YoutubeVideoPlayer from '..';

describe('<YoutubeVideoPlayer /> component', () => {
	const yid = 'fQwar_-QdiQ';

	function Player() {
		this.height = 390;
		this.width = 640;
		this.videoId = yid;
		this.events = {
			onReady: jest.fn(),
		};
	}
	const YTMock = {
		Player,
		PlayerState: {},
	};

	beforeEach(() => {
		Object.defineProperty(window, 'YT', { value: YTMock, writable: true });
	});

	it('creates a video preview container', () => {
		render(<YoutubeVideoPlayer youtubeId={yid} />);
		expect(screen.getByTestId('.youtube-video-player')).toBeInTheDocument();
	});

	it('loads the youtube iframe placeholder after clicking on the button', async () => {
		render(<YoutubeVideoPlayer youtubeId={yid} />);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(screen.getByTestId('#nci-video-player')).toBeInTheDocument();
		});
	});

	it('calls a supplied tracking event on click', async () => {
		const mockTrackingFn = jest.fn();
		render(
			<YoutubeVideoPlayer youtubeId={yid} trackVideoLoad={mockTrackingFn} />
		);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(mockTrackingFn).toHaveBeenCalled();
		});
	});

	it('should show error message after clicking on the button and YT is not defined', async () => {
		Object.defineProperty(window, 'YT', { value: undefined, writable: true });
		render(<YoutubeVideoPlayer youtubeId={yid} />);
		fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(
				screen.getByText('An error occurred. Please try again later.')
			).toBeInTheDocument();
		});
	});
});
