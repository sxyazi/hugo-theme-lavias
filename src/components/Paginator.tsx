import {usePagination} from '../hooks/usePagination'
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'
import {Link} from './Link'

export const Paginator = () => {
  const {prev, next} = usePagination()

  return (
    <footer class="flex mt-4 pb-16">
      {next && <Link to={next} className="flex items-center mr-8">
				<MdNavigateBefore size="20"/> Next
			</Link>}

      {prev && <Link to={prev} className="flex items-center">
				Prev <MdNavigateNext size="20"/>
			</Link>}
    </footer>
  )
}
