export { default } from './HomeNoSideNav';

// // Import component
// import { NCIBigFooter } from '@nciocpl/ncids-js';

// // Get HTMLElement
// const element = document.getElementById('nci-footer');

// // Create component with optional options
// const footer = NCIBigFooter.create(element, {
//     collapseButtonClass: '.usa-footer__nci-primary-link--accordion-header',
//     collapseWidth: 480,
// });

// // Listen for custom events
// footer.element.addEventListener('usa-footer:nav-links:collapse', (event) => {
//     console.log('collapsed', event);
// });

/**
 * Import components from the ncids-js package to use in the application.
 *
 * Refer to the [National Cancer Institute Design System documentation](https://designsystem-dev.cancer.gov/)
 * for details on available components and their configurations.
 */
import { NCIBigFooter } from '@nciocpl/ncids-js';

/**
 * Wait for the DOM to be fully loaded before executing the code.
 * This ensures that the 'nci-footer' element exists in the HTML document.
 */
window.addEventListener('DOMContentLoaded', () => {
	// @todo header menus

	const footerInstance = document.getElementById('nci-footer');
	if (footerInstance) {
		// Create an instance of the NCIBigFooter component and attach it to the element
		NCIBigFooter.create(footerInstance);
	}
});
