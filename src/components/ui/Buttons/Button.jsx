import '../Buttons/Button.css'

export function Button({ children, className, ...props }) {
  return (
    <button
        className="buttonStyle">
        {children}
    </button>
  )
}
export default Button