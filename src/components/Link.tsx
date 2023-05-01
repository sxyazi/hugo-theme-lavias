import {Link as _Link, LinkProps, NavLink} from "react-router-dom"

interface Props {
	nav?: boolean
}

const defaultClass = "p-1 text-accent-600 dark:text-accent-400 rounded hover:bg-accent-100 dark:hover:bg-slate-700"

export const Link = ({nav, ...props}: Props & LinkProps) => {
	props.className = `${defaultClass} ${props.className ?? ""}`

	// An absolute URL linked to the external site
	if (typeof props.to === "string" && /^https:\/\//.test(props.to)) {
		return <a href={props.to} {...props}/>
	}

	return nav ? <NavLink {...props}/> : <_Link {...props}/>
}
