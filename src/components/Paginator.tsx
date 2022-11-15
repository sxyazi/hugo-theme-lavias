import {usePagination} from '../hooks'
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'
import {Link} from './Link'
import {useEffect} from 'preact/hooks'
import {preload} from '../utils'

export const Paginator = () => {
	const {prev, next} = usePagination()

	useEffect(() => {
		if (prev) preload(prev)
		if (next) preload(next)
	}, [prev, next])

	return (
		<footer class="flex mt-4 sm:pb-8">
			{next && <Link to={next} className="flex items-center mr-8">
				<MdNavigateBefore size="20"/> Next
			</Link>}

			{prev && <Link to={prev} className="flex items-center">
				Prev <MdNavigateNext size="20"/>
			</Link>}
		</footer>
	)
}
