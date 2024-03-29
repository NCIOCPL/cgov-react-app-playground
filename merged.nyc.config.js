'use strict';

/******
 * This file is the configuration for the final merged report.
 */
module.exports = {
	'report-dir': 'coverage/merged',
	'temp-dir': 'coverage/merged',
	reporter: ['html', 'json', 'lcov', 'text'],
	'check-coverage': true,
	branches: 75, // Target of 80 across all repos.
	lines: 80,
	functions: 80,
	statements: 80,
	exclude: [
		'cypress/**/*.js',
		'jest-test-setup.js',
		'src/serviceWorker.js',
		'src/setupTests.js',
		'*.test.js',
	],
};
