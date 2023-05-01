import {ComponentChildren, createContext, createRef, RefObject} from "preact"
import {EMPTY_DIV} from "../utils"
import {useLoading} from "../hooks/useLoading"
import {useTheme} from "../hooks"

export const AppContext = createContext<{
	path: RefObject<string>
	source: HTMLElement

	dark: boolean
	toggle:() => void
}>({
			path  : createRef(),
			source: EMPTY_DIV,

			dark  : false,
			toggle: () => void 0,
		})

export const AppProvider = ({children}: { children: ComponentChildren }) => {
	const {path, source} = useLoading()
	const {dark, toggle} = useTheme()

	return (
		<AppContext.Provider value={{
			source,
			path,
			dark,
			toggle,
		}}>
			{children}
		</AppContext.Provider>
	)
}
