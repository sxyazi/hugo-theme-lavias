const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme  : {
		extend: {},
		colors: {
			transparent: "transparent",
			white      : colors.white,
			slate      : colors.slate,
			accent     : colors.pink,
		},
	},
	darkMode: "class",
}
