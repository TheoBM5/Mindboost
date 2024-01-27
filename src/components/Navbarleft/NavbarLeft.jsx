import {Card, Button} from "../../components/ui/index.js"
import { Link, NavLink } from 'react-router-dom'
import {navigation} from '../../constants/index.js'
import {useAuth} from "../../context/AuthContext.jsx"

import "./Navbarleft.css"
function NavbarLeft() {
  const {signout} = useAuth();
    return (
        <nav className="leftsidebar">
            
              <div className='side'>
                <span className='header-tittle'><h2 className='appTitulo'>MindBoost</h2></span>
                <ul className="list-Unorded">
                    {navigation.map((link) => {    
                    return (
                        <li
                            key={link.label}
                            className={`leftsidebar-link`}>
                            <NavLink
                              to={link.route}
                              className="nav-container">
                              <img
                                  src={link.imgURL}
                                  alt={link.label}
                                  className={"group-img"}
                              />
                              {link.label}
                            </NavLink>
                        </li>
                    );
              })}
            </ul>
            <li
              onClick={()=>{
                signout()
              }}
              >
              Logout
            </li>
              </div>
        </nav>
      )
    }
export default NavbarLeft