import {useNav} from '../hooks'
import {Link} from './Link'
import {useEffect} from 'preact/hooks'
import {preload} from '../utils'

export const Nav = () => {
	const nav = useNav()

	useEffect(() => {
		nav.map(({link}) => preload(link))
	}, [nav])

	return (
		<nav>
			{nav.map((item) =>
				<Link nav={true} to={item.link} className="px-2">
					{item.name}
				</Link>,
			)}
		</nav>
	)
}
