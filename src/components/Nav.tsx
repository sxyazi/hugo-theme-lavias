import {useNav} from '../hooks'
import {Link} from './Link'

export const Nav = () => {
  const nav = useNav()

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
