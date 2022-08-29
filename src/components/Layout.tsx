import {Nav} from './Nav'
import {css} from '@emotion/css'
import {ComponentChildren} from 'preact'

interface Props {
  children: ComponentChildren
  className?: string
}

const layout = css`
  display: grid;
  grid-template-areas:
    'nav'
    'main'
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
    grid-area: main;
    justify-self: center;
  }

  & > footer {
    grid-area: foot;
    justify-self: center;
  }
`

export const Layout = ({children, className}: Props) => {
  return (
    <div class={layout}>
      <Nav/>
      <section className={`w-11/12 max-w-3xl ${className ?? ''}`}>
        {children}
      </section>
    </div>
  )
}
