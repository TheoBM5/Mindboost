import {Card, Button} from "../../components/ui/index.js"
import { Link, NavLink } from 'react-router-dom'
import {navigation} from '../../constants/index.js'
import {useAuth} from "../../context/AuthContext.jsx"
import {UserCard} from "../user-card/UserCard.jsx"
import "./Navbarleft.css"

function NavbarLeft() {
  const {signout} = useAuth();
    return (
        <nav className="leftsidebar">
            
              <div className='side'>
                <span className='header-tittle'><h2 className='appTitulo'>MindBoost</h2></span>
                
                <UserCard/>
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
            <div className="cont-out">
                <a className="link-out"
                    onClick={()=>{
                      signout()
                    }}
                    >
                    <img  className="logout-img"
                      src={"src/assets/icons/logout-2.svg"}
                    />
                    <p>Salir</p>
                </a>

            </div>
              </div>
        </nav>
      )
    }
export default NavbarLeft