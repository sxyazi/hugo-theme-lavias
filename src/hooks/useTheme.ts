import {useEffect, useState} from "preact/hooks"

export const useTheme = () => {
	const [dark, setDark] = useState<boolean>(() =>
		"theme" in localStorage
			? localStorage.theme === "dark"
			: window.matchMedia("(prefers-color-scheme: dark)").matches,
	)

	useEffect(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event: MediaQueryListEvent) => {
				localStorage.removeItem("theme")
				setDark(event.matches)
			})
	}, [])

	useEffect(() => {
		if (dark) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [dark])

	return {
		dark,
		toggle: () => setDark(dark => {
			localStorage.setItem("theme", dark ? "light" : "dark")
			return !dark
		}),
	}
}
