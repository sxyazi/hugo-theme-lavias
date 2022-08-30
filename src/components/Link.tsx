import {Link as _Link, LinkProps, NavLink} from 'react-router-dom'
import React from 'preact/compat'

interface Props {
  nav?: boolean
}

export const Link = ({nav, className, ...props}: Props & LinkProps) => {
  className = `text-pink-600 dark:text-pink-400 hover:underline underline-offset-4 ${className ?? ''}`

  return (
    nav ?
      <NavLink className={className} {...props}/> :
      <_Link className={className} {...props}/>
  )
}
