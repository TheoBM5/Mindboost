import "./Label.css"
export function Label({ children, htmlFor }) {
    return (
      <label
        className="label-style"
        htmlFor={htmlFor}
      >
        {children}
      </label>
    );
  }
  
  export default Label;