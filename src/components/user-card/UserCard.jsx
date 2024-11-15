import './UserCard.css'; 
import {useAuth} from '../../context/AuthContext';
import { Link } from 'react-router-dom'
import React from "react";
export function UserCard({className}) {

  const {user} = useAuth()
  console.log("->img",user)
  return (
    <Link to={"/profile"} className='enlace'>
      <article className={`user-Card ${className}`}>
          <header className='user-Card-header'>
              <img  
              className='profile-image'
              alt='Imagen del usuario'
              src={user.gravatar}
              />
          <div className='user-info'>
              <strong>{user.name}</strong>
              <span className='user-card-info'>{user.email}</span>
          </div>
          </header>
      </article>
    </Link>
  )
}

export default UserCard