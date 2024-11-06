import React from "react";
import "./Label.css"
export function Label({ children, htmlFor, className }) {
  return (
    <label
      className={`label-style-comp ${className || ""}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
  
  export default Label;