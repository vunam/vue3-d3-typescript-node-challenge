module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint' ],
	extends: [
		'plugin:vue/essential',
		'plugin:@typescript-eslint/recommended',
		'airbnb-typescript/base',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		project: './tsconfig.json'
	}
};
