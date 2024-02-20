import './Container.css'
export function Container({children, className}) {
  return (
    <div className={"ContainerStyle" + className}>{children}</div>
  )
}
export default Container