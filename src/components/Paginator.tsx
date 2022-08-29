import {usePagination} from '../hooks/usePagination'
import {Link} from 'react-router-dom'
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'

export const Paginator = () => {
  const {prev, next} = usePagination()

  return (
    <div class="flex mt-4 pb-16">
      {next && <Link
				to={next}
				className="flex items-center text-blue-600 hover:underline underline-offset-4 mr-8">
				<MdNavigateBefore size="20"/> Next
			</Link>}

      {prev && <Link
				to={prev}
				className="flex items-center text-blue-600 hover:underline underline-offset-4">
				Prev <MdNavigateNext size="20"/>
			</Link>}
    </div>
  )
}
