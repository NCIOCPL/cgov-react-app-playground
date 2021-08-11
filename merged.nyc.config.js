'use strict';

/******
 * This file is the configuration for the final merged report.
 */
module.exports = {
	'report-dir': 'coverage/merged',
	'temp-dir': 'coverage/merged',
	reporter: ['html', 'json', 'lcov', 'text'],
	'check-coverage': true,
	branches: 80,
	lines: 80,
	functions: 80,
	statements: 80,
};
