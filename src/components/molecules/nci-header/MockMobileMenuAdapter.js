export class MockMobileMenuAdapter {
	useUrlForNavigationId = true;

	getInitialMenuId() {
		return 0;
	}

	getNavigationLevel(id) {
		const navigationLevel = {
			id,
			label: 'Section 1',
			path: '#',
			langcode: 'en',
			hasChildren: true,
			items: [
				{
					id: 1,
					label: 'Item 1',
					path: '#',
					langcode: 'en',
					hasChildren: true,
				},
				{
					id: 2,
					label: 'Item 2',
					path: '#',
					langcode: 'en',
					hasChildren: false,
				},
			],
			parent: null,
		};

		return navigationLevel;
	}
}
