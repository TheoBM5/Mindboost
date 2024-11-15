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
  const [openBar, setOpenBar] = useState(true);
  const [buttonSide, setButtonSide] = useState(false);

  // const handleNavBar = () =>{
  //   setOpenBar = 
  // }

    return (
      <>
          <Button className="menu-button-side" onClick={() => setButtonSide(!buttonSide)}>O</Button>
          <nav className={`${openBar ? "side" : "side-mini"} ${buttonSide ? "max-side" : ""}`} onClick={() => setOpenBar(!openBar)}>
            <div className="start-side">
              <span className='header-tittle'><img className="logo-left" src="/img/logo2.webp" alt="Mindboost"/></span>
              <UserCard className={`${openBar ? "" : "profile-img-bar"}`}/>
            </div>
            <ul className="list-Unorded">
                {navigation.map((link) => {    
                return (
                    <li
                        key={link.label}
                        className="list-link">
                        <NavLink
                          to={link.route}
                          className={`${openBar ? "nav-anchor" : "nav-ancho-mini"}`}
                          >
                          <img
                              src={link.imgURL}
                              alt={link.label}
                              className={"group-img"}
                          />
                          <span>{link.label}</span>
                        </NavLink>
                    </li>
                );
              })}

            </ul>
            <footer className="cont-out">
              <button className={`${openBar ? "button-new" : "new-button-mini"}`}
                onClick={() => {
                  setModalOpen(true); 
                }}
              >
                <img
                  src="src/assets/icons/plus.svg"
                  alt="New"
                  className={"group-img"}
                />
                <span >Nuevo</span>

              </button>
              
              <a className="link-out"
                  onClick={()=>{
                    signout()
                  }}
                  >
                  <img  className="logout-img"
                    src={"src/assets/icons/logout-2.svg"}
                  />
                  <p className={`${openBar ? "" : "text-mini"}`}>Salir</p>
              </a>

              </footer>
            
          </nav>

        {modalOpen && <ModalCard setModalOpen={setModalOpen}/>}
        </>
      )
    }
export default NavbarLeft


