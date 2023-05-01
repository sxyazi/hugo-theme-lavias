import {extended, formatting, javascript, preact, typescript} from "@sxyazi/eslint-config"

export default [
	...javascript,
	...typescript,

	...preact,

	...extended,
	...formatting,
]

