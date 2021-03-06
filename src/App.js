import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import track from 'react-tracking';

import './styles/app.scss';

import { useAppPaths } from './hooks';
import { Home, ItemDetails, PageNotFound } from './views';

const App = () => {
	// this should be a DUMB component that just displays our display(group) components
	const { HomePath, ItemDetailsPath } = useAppPaths();

	return (
		<Router>
			<Routes>
				<Route path={HomePath()} element={<Home />} />
				<Route path={ItemDetailsPath()} element={<ItemDetails />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default track({
	page: 'app_load',
})(App);
