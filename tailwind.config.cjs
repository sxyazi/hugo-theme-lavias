const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {},
		colors: {
			white: colors.white,
			slate: colors.slate,
			accent: colors.pink,
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
	darkMode: 'class',
}
