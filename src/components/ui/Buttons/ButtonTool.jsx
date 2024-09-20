import '../Buttons/Button.css'
function ButtonTool({onClick, children }) {
  return (
    <button onClick={onClick} className="button-tool">
        {children}
    </button>
  )
}
export default ButtonTool