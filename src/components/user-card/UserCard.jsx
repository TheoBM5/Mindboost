import './UserCard.css'; 
import { Link } from 'react-router-dom'
export function UserCard() {
  return (
    <Link to={"/profile"} className='enlace'>
      <article className='user-Card'>
          <header className='user-Card-header'>
              <img  
              className='profile-image'
              alt='Imagen del usuario'
              src={'https://unavatar.io/youtube/TheoBM_5'}
              />
          <div className='user-info'>
              <strong>TheoBm5</strong>
              <span className='user-card-info'>teodorohugo5@gmail.com</span>
          </div>
          </header>
      </article>
    </Link>
  )
}

export default UserCard