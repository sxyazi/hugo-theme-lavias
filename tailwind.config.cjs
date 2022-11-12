/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
	darkMode: 'class',
}
