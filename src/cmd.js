//    "dev": "vite",
//    "build": "tsc && vite build"
import {fileURLToPath} from 'node:url'
import {resolve} from 'node:path'
import process from 'node:process'
import child_process from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'

const command = process.argv[2]
const basePath = fileURLToPath(import.meta.url)

const extract = () => {
	const html = readFileSync('static/index.html', 'utf8')
	return {
		scripts: Array.from(html.matchAll(/<script .+?><\/script>/g)).map(m => m[0]),
		links: Array.from(html.matchAll(/<link .+?>/g)).map(m => m[0]),
	}
}

const replaceBase = (dev = false) => {
	let base = readFileSync('layouts/_default/baseof.html', 'utf8')
	const regLink = /<!-- Links -->[\s\S]+?<!-- \/Links -->/gm
	const regScript = /<!-- Scripts -->[\s\S]+?<!-- \/Scripts -->/gm

	const origin = base
	if (dev) {
		base = base.replaceAll(regLink, `<!-- Links -->\n<!-- /Links -->`)
		base = base.replaceAll(regScript, `<!-- Scripts -->\n<script type="module" src="/src/main.tsx"></script>\n<!-- /Scripts -->`)
	} else {
		const {scripts, links} = extract()
		base = base.replaceAll(regLink, `<!-- Links -->\n${links.join('\n')}\n<!-- /Links -->`)
		base = base.replaceAll(regScript, `<!-- Scripts -->\n${scripts.join('\n')}\n<!-- /Scripts -->`)
	}

	writeFileSync('layouts/_default/baseof.html', base)
	return () => {
		writeFileSync('layouts/_default/baseof.html', origin)
	}
}

switch (command) {
	case 'dev':
		const restore = replaceBase(true)
		child_process.execSync('rm -rf dist')
		try {
			child_process.execSync('hugo -d themes/lavias/dist', {
				cwd: resolve(basePath, '../../../../'),
			})
		} finally {
			restore()
		}
		child_process.spawnSync('pnpm', ['exec', 'vite', 'dev', 'dist', '--config', resolve(fileURLToPath(import.meta.url), '../../vite.config.js')], {
			stdio: 'inherit',
		})
		break

	case 'build':
		child_process.execSync('rm -rf static/assets static/index.html')
		child_process.spawnSync('pnpm', ['exec', 'vite', 'build', 'src', '--config', resolve(fileURLToPath(import.meta.url), '../../vite.config.js')], {
			stdio: 'inherit',
		})

		replaceBase()
		child_process.execSync('rm -rf static/index.html')
		break
}
