
const jestRules = require('eslint-plugin-jest').rules;
const jestDomRules = require('eslint-plugin-jest-dom').rules;
const testLibRules = require('eslint-plugin-testing-library').rules;

const disableAllRules = (pluginName, rules) => {
	return Object.keys(rules).reduce((ac, ruleName) => {
		return {
			...ac,
			[`${pluginName}/${ruleName}`]: 'off',
		};
	}, {});
};

// We need to turn off jest rules for cypress because
// Cypress uses expect.
const cypressRuleDisables = {
	...disableAllRules('jest', jestRules),
	...disableAllRules('jest-dom', jestDomRules),
	...disableAllRules('testing-library', testLibRules),
};

module.exports = {
	extends: [
		"@nciocpl/eslint-config-react",
		"plugin:testing-library/react",
		"plugin:jest/recommended",
		"plugin:jest-dom/recommended"
	],
	plugins: [
		"testing-library",
		"jest",
		"jest-dom"
	],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2018,  // Update this to a more recent version
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		requireConfigFile: false,  // Add this line if you don't have a babel config file
		babelOptions: {
			presets: ["@babel/preset-react"]  // Add this line
		},
	},
	rules: {
		"testing-library/no-render-in-setup": "off", // This is now no-render-in-lifecycle.  Remove when NCIOCPL standards are updated.
		'testing-library/no-render-in-lifecycle': 'error',

		"testing-library/prefer-wait-for": "off", // This is now prefer-find-by. Remove when NCIOCPL standards are updated.
		"testing-library/prefer-find-by": "error",

		"jest/no-if": "off", // Removed in eslint-plugin-jest 28. This is now no-conditional-in-test.  Note: v28 and above only supports for node 20+. Remove when NCIOCPL standards are updated.
		"jest/no-conditional-in-test": "error",
	},
	globals: {
		cy: true,
		Cypress: true,
		getFixture: true,
	},
	overrides: [
		{
			files: ['cypress/**/*.js'],
			rules: cypressRuleDisables,
		},
	],
};
