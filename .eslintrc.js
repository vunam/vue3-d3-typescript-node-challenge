module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint' ],
	extends: [ 'plugin:@typescript-eslint/recommended', 'airbnb-typescript/base' ],
	parserOptions: {
		sourceType: 'module',
		project: './tsconfig.json'
	}
};