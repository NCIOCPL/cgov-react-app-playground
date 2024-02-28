import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Pager from '../pager';
import { useStateValue } from '../../../../store/store.js';

jest.mock('../../../../store/store.js');

let current = 0;
describe('SPager(English)', () => {
	beforeEach(async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const searchSiteFilter = 'all';
		const title = 'NCI Search Results';
		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				searchSiteFilter,
				title,
			},
		]);
		// moves counter up one each test
		current += 1;
	});
	// counter 1
	it('Should load the pager component', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={current}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('...')).toBeInTheDocument();
		expect(screen.getByText(/Next/)).toBeInTheDocument();
	});
	// counter 2
	it('Nav element is there and link options', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={current}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.queryAllByText(/.../)[1]).toHaveClass('show-for-sr');
		expect(screen.queryAllByText(/.../)[2]).toHaveClass('show-for-sr');
		expect(screen.getAllByRole('link')[0]).toHaveTextContent('< Previous');
		expect(screen.getAllByRole('link')[3]).toHaveClass('total_pages');
		expect(screen.getAllByRole('listitem')[4]).toHaveClass(
			'pager__ellipses--right'
		);
	});
	// counter 3
	it('Href and urls', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={current}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.queryAllByText(/3/)[0]).toHaveClass('pager__button active');
		expect(screen.getAllByRole('link')[2]).toHaveAttribute(
			'href',
			'?swKeyword=tumor&page=2&pageunit=20'
		);
		expect(screen.getAllByRole('link')[1]).toHaveAttribute(
			'href',
			'?swKeyword=tumor&page=1&pageunit=20'
		);
	});

	// Test when current page is 1
	it('should not render previous button when current page is 1', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={1}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.queryByText(/< Previous/)).not.toBeInTheDocument();
	});

	// Test when current page is the last page
	it('should not render next button when current page is the last page', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={10}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.queryByText(/Next >/)).not.toBeInTheDocument();
	});

	// Test when there is only one page
	it('should only render one page button when there is only one page', () => {
		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<Pager
					current={1}
					totalResults={20}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
		expect(screen.queryAllByRole('listitem')).toHaveLength(1);
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.queryByText(/< Previous/)).not.toBeInTheDocument();
		expect(screen.queryByText(/Next >/)).not.toBeInTheDocument();
	});
});
