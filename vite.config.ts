import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {resolve} from 'node:path'
import {nativeSW} from 'vite-plugin-native-sw'

export default defineConfig({
	plugins: [
		preact(),
		nativeSW({
			entries: [{
				src: resolve(__dirname, 'src/service-worker.ts'),
				dist: 'sw.js',
			}],
		}),
	],
	esbuild: {
		legalComments: 'none',
	},
	resolve: {
		alias: {
			'/src': resolve(__dirname, 'src'),
		},
	},
	build: {
		emptyOutDir: false,
		outDir: resolve(__dirname, 'static'),
	},
})
