import { useNavigate } from 'react-router-dom';
import {Card, Button} from '../../components/ui/index'
import './About.css'
function MainCover() {
    const navigate = useNavigate();
    const handle_start = () =>{
      navigate(`/sign-in`);
      // navigate("/sign-in");
    }
  
  return (
    <div className='slides slides1' >
            <div className='main-grid'>
              <img src='/img/astronaut2.webp' className='img-landing'/>
              <div className='cont-world'>
                <img src='/img/world.webp' alt='world'/>
              </div>
              
              <img className='title-landing' src="img/logo2.webp"/>
              <h3 className='subtext-landing'>Dale un boost a tus estudios con Mindboost 
                <span className='texto-desc-landing'> Maximiza tu potencial con estrategias que se adaptan a ti</span></h3>
              <Button className='start-landing' onClick={handle_start}>Comenzar</Button>
            </div>
          </div>
  )
}
export default MainCover