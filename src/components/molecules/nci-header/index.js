import { NCIExtendedHeaderWithMegaMenu } from '@nciocpl/ncids-js';
import { MockMegaMenuAdapter } from './MockMegaMenuAdapter';
import { MockMobileMenuAdapter } from './MockMobileMenuAdapter';

export const headerInit = () => {
	const headerInstance = document.getElementById('nci-header');
	if (headerInstance) {
		NCIExtendedHeaderWithMegaMenu.create(headerInstance, {
			megaMenuSource: new MockMegaMenuAdapter(),
			mobileMenuSource: new MockMobileMenuAdapter(),
		});
	}
};
