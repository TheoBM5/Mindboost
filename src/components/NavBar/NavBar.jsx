import { Link, NavLink, useLocation} from "react-router-dom"
import {Container} from "../ui/index"
import "./NavBar.css"
function NavBar() {
  const location = useLocation();
  return (
    <nav className="background-nav">
      <h1 className="title-bar">Mindboost</h1>
      <div className="link-container">
        <NavLink className="text-link" to="/about">
          About
        </NavLink>
        {location.pathname === '/sign-in' ? (
          <NavLink className="text-link" to="/sign-up">
            Sign-up
          </NavLink>
        ) : (
          <NavLink className="text-link" to="/sign-in">
            Sign-in
          </NavLink>
        )}
      </div>
    </nav>
  )
}
export default NavBar