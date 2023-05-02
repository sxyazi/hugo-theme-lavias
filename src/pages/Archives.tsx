import { Archive, useArchives, useTitle } from "../hooks"
import { Layout } from "../components/Layout"
import { formatDate } from "../utils"
import { Link } from "../components/Link"

const Line = ({ archive }: { archive: Archive }) => {
	return (
		<article className="mb-4">
			<Link to={archive.link}>{archive.title}</Link>
			<time className="ml-2 text-xs text-slate-500 dark:text-slate-400">{formatDate(archive.date, "w, m d, Y")}</time>
		</article>
	)
}

export const Archives = () => {
	const archives = useArchives()
	useTitle("Archives")

	let lastYear: number
	return (
		<Layout>
			{archives.length > 0 && <h2 className="font-medium text-xl mb-4 dark:text-slate-200">Archives:</h2>}

			{archives.map(archive => {
				let newYear = false
				if (lastYear !== archive.year) {
					newYear = true
					lastYear = archive.year
				}

				return (
					<>
						{newYear && <h2 className="mt-10 mb-5 text-lg dark:text-slate-200">{archive.year}</h2>}
						<Line archive={archive}/>
					</>
				)
			})}
		</Layout>
	)
}
