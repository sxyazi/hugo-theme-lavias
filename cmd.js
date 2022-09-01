import {dirname, resolve} from 'node:path'
import child_process from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'
import process from 'node:process'
import {fileURLToPath} from 'node:url'

const base = dirname(fileURLToPath(import.meta.url))

const extract = () => {
	const html = readFileSync('static/index.html', 'utf8')
	return {
		scripts: Array.from(html.matchAll(/<script .+?><\/script>/g)).map(m => m[0]),
		links: Array.from(html.matchAll(/<link .+?>/g)).map(m => m[0]),
	}
}

const replaceBase = (dev = false) => {
	let htm = readFileSync('layouts/_default/baseof.html', 'utf8')
	const reLink = /<!-- Links -->[\s\S]+?<!-- \/Links -->/gm
	const reScript = /<!-- Scripts -->[\s\S]+?<!-- \/Scripts -->/gm

	const origin = htm
	if (dev) {
		htm = htm.replaceAll(reLink, `<!-- Links -->\n<!-- /Links -->`)
		htm = htm.replaceAll(reScript, `<!-- Scripts -->\n<script type="module" src="/src/main.tsx"></script>\n<!-- /Scripts -->`)
	} else {
		const {scripts, links} = extract()
		htm = htm.replaceAll(reLink, `<!-- Links -->\n${links.join('\n')}\n<!-- /Links -->`)
		htm = htm.replaceAll(reScript, `<!-- Scripts -->\n${scripts.join('\n')}\n<!-- /Scripts -->`)
	}

	writeFileSync('layouts/_default/baseof.html', htm)
	return () => {
		writeFileSync('layouts/_default/baseof.html', origin)
	}
}

switch (process.argv[2]) {
	case 'dev':
		const restore = replaceBase(true)
		child_process.execSync('rm -rf dist')
		try {
			child_process.execSync('hugo -d themes/hugo-theme-lavias/dist --config config.yaml,themes/hugo-theme-lavias/hugo.dev.yaml', {
				cwd: resolve(base, '../../'),
			})
		} finally {
			restore()
		}
		child_process.spawnSync('pnpm', ['exec', 'vite', 'dev', 'dist', '--config', resolve(base, 'vite.config.js')], {
			stdio: 'inherit',
		})
		break

	case 'build':
		child_process.execSync('rm -rf static/assets static/index.html')
		child_process.spawnSync('pnpm', ['exec', 'vite', 'build', 'src', '--config', resolve(base, 'vite.config.js')], {
			stdio: 'inherit',
		})

		replaceBase()
		child_process.execSync('rm -rf static/index.html')
		break
}
