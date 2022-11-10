import {useNav} from '../hooks'
import {Link} from './Link'
import {useEffect} from 'preact/hooks'
import {preload} from '../utils'
import {MdDarkMode, MdLightMode} from 'react-icons/md'
import {css} from '@emotion/css'
import {useContext} from 'preact/compat'
import {AppContext} from '../providers/AppProvider'

const styles = css`
  svg {
    display: inline;
    vertical-align: sub;
  }
`

export const Nav = () => {
	const nav = useNav()
	const {dark, toggle} = useContext(AppContext)

	useEffect(() => {
		nav.map(({link}) => link.replace(/\//g, '') && preload(link))
	}, [nav])

	return (
		<nav class={styles}>
			{nav.map((item) =>
				<Link nav={true} to={item.link} className="px-2">
					{item.name}
				</Link>,
			)}
			<button class="px-2 text-pink-600 dark:text-pink-400" onClick={toggle}>
				{dark ? <MdLightMode size="19"/> : <MdDarkMode size="19"/>}
			</button>
		</nav>
	)
}
