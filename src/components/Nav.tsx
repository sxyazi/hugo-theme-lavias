import {useNav} from '../hooks'
import {NavLink} from 'react-router-dom'

export const Nav = () => {
  const nav = useNav()

  return (
    <nav>
      {nav.map((item) =>
        <NavLink to={item.link}
                 className="px-2 text-blue-600 hover:underline hover:underline-offset-4">
          {item.name}
        </NavLink>,
      )}
    </nav>
  )
}
