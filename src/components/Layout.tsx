import {Nav} from './Nav'
import {css} from '@emotion/css'
import {ComponentChildren} from 'preact'
import {Paginator} from './Paginator'

interface Props {
	children: ComponentChildren
	className?: string
}

const styles = css`
  display: grid;
  grid-template-areas:
    'nav'
    'content'
    'foot';
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 1fr;

  & > nav {
    grid-area: nav;
    justify-self: end;
    margin-top: 10px;
    margin-right: calc(25px - 100vw + 100%);
  }

  & > section {
    grid-area: content;
    justify-self: center;
  }

  & > footer {
    grid-area: foot;
    justify-self: center;
  }
`

export const Layout = ({children, className}: Props) => {
	return (
		<div class={styles}>
			<Nav/>
			<section className={`w-11/12 max-w-3xl ${className ?? ''}`}>
				{children}
				<Paginator/>
			</section>
		</div>
	)
}
