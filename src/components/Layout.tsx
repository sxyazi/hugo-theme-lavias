import {Nav} from './Nav'
import {css} from '@emotion/css'
import {Footer} from './Footer'

interface Props {
  children: JSX.Element | JSX.Element[]
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

export const Layout = ({children}: Props) => {
  return (
    <div class={layout}>
      <Nav/>
      {children}
      <Footer/>
    </div>
  )
}
