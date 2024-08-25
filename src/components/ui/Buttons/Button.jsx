import React from "react";
import '../Buttons/Button.css'
const STYLES = [
  'button-accept',
  'button-green',
  'button-red',
  'button-orange',
  'button-yellow',
];


export function Button({ type, children, className, ...props }) {
  const buttonStyle = STYLES.includes(type) ? type : STYLES[0];
  return (
    <button
        className={`normal-buttons ${buttonStyle} ${className}`}
        {...props}
    >
        {children}
    </button>
  )
}
export default Button