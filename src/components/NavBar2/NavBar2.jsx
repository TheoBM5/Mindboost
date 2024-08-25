import React from "react";
import Buton from '../ui/Boton/Buton'
import './NavBar2.css'
import Logo from "../ui/Logo/Logo"

const NavBar2 = ({ logoSrc, logoAlt, buttons, className }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo src={logoSrc} alt={logoAlt} className={className} />
      </div>
      <div className="navbar-buttons">
        {buttons.map((button, index) => (
          <Buton
            key={index}
            label={button.label}
            onClick={button.onClick}
            className="navbar-button-2"
          />
        ))}
      </div>
    </nav>
  )
}
export default NavBar2