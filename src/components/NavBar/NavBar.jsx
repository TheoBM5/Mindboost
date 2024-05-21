import { Link, NavLink, useLocation} from "react-router-dom"
import {Container} from "../ui/index"
import "./NavBar.css"
function NavBar() {
  const location = useLocation();
  console.log(location)
  return (
    <nav className="background-nav">
        <div className="cont">
  
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
        </div>

    </nav>
  )
}
export default NavBar