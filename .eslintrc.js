module.exports = {
	root: true,

	env: {
		meteor: true,
		browser: true,
		node: true,
		es6: true,
	},

	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
	},

	plugins: [
		'meteor',
	],

	extends: [
		'eslint:recommended',
		'plugin:meteor/recommended',
	],

	// add your custom rules here
	rules: {
		'no-unused-vars': 0,
		'no-console': 0,
		'meteor/audit-argument-checks': 0,
		'meteor/template-names': 0,
		//'indent': ['error', 2],
		'no-mixed-spaces-and-tabs': 0,
	},

	// see https://github.com/dferber90/eslint-plugin-meteor/blob/master/docs/guides/setup.md#collections-and-globals
	globals: {
		Roles: true,
		FlowRouter: true,
	},

};
