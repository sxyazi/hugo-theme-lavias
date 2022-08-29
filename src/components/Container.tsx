interface Props {
  children: JSX.Element
}

export const Container = ({children}: Props) => {
  return (
    <div class="w-1/3">
      {children}
    </div>
  )
}
