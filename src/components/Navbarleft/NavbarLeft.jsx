import {Card, Button} from "../../components/ui/index.js"
import { Link, NavLink } from 'react-router-dom'
import {navigation} from '../../constants/index.js'
import {useAuth} from "../../context/AuthContext.jsx"
import {UserCard} from "../user-card/UserCard.jsx"
import React, { useState } from "react";
import ModalCard from "../ui/ModalCard/ModalCard.jsx"
import "./Navbarleft.css"

function NavbarLeft() {
  const {signout} = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
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


              <button className="leftsidebar-link nav-container button-new"
                onClick={() => {
                  setModalOpen(true); // Abre el modal al hacer clic en "New"
                }}
              >
                <img
                  src="src/assets/icons/plus.svg"
                  alt="New"
                  className={"group-img"}
                />
                New
              </button>
              {modalOpen && <ModalCard setModalOpen={setModalOpen}/>}
            </ul>
            
            <footer className="cont-out">
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

            </footer>
          </div>
        </nav>
      )
    }
export default NavbarLeft


