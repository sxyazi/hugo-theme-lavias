import {usePagination} from "../hooks"
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md"
import {Link} from "./Link"
import {useEffect} from "preact/hooks"
import {preload} from "../utils"

export const Paginator = () => {
	const {prev, next} = usePagination()

	useEffect(() => {
		if (prev) preload(prev)
		if (next) preload(next)
	}, [prev, next])

	return (
		<footer className="flex mt-4 sm:pb-8">
			{next && <Link to={next} className="flex items-center pr-2.5">
				<MdNavigateBefore size="20" /> Prev
			</Link>}

			{prev && <Link to={prev} className="flex items-center pl-2.5">
				Next <MdNavigateNext size="20" />
			</Link>}
		</footer>
	)
}
