module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:testing-library/react',
		'plugin:prettier/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2016,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	// Plugins are configured by the recommended extensions above
	rules: {
		'react/display-name': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'jest/consistent-test-it': ['error', { fn: 'it' }],
		'jest/no-if': 'error',
		'jest/no-test-return-statement': 'error',
		'jest/require-to-throw-message': 'error',
		'jest/require-top-level-describe': 'error',
		'testing-library/no-await-sync-events': 'error',
		'testing-library/no-manual-cleanup': 'error',
		'testing-library/no-render-in-setup': 'error',
		'testing-library/prefer-explicit-assert': 'error',
		'testing-library/prefer-wait-for': 'error',
	},
	globals: {
		cy: true,
		Cypress: true,
		getFixture: true,
	},
};
