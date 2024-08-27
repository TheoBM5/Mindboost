import React from "react";
import Buton from '../ui/Boton/Buton'
import './NavBar2.css'
import Logo from "../ui/Logo/Logo"
import { useNavigate } from 'react-router-dom';
const NavBar2 = ({ logoSrc, logoAlt, buttons, className}) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/`)
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleHome}>
        <Logo src={logoSrc} alt={logoAlt} className={className}/>
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