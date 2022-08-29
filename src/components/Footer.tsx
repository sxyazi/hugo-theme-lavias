import {usePagination} from '../hooks/usePagination'
import {Link} from 'react-router-dom'
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'

export const Footer = () => {
  const {prev, next} = usePagination()

  return (
    <footer class="flex mt-4 pb-16">
      {prev && <Link
				to={prev}
				className="flex items-center text-blue-600 hover:underline underline-offset-4">
				<MdNavigateBefore size="20"/> Prev
			</Link>}

      {next && <Link
				to={next}
				className="flex items-center ml-8 text-blue-600 hover:underline underline-offset-4">
				Next <MdNavigateNext size="20"/>
			</Link>}
    </footer>
  )
}
