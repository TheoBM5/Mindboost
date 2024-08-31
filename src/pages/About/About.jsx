import {Card, Button} from '../../components/ui/index'
import NavBar2 from '../../components/NavBar2/NavBar2'
import './About.css'
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/StarBackGround/Stars';

const buttons = [
  { label: 'Sign in', onClick: () => alert('Home clicked!') },
  { label: 'Sign up', onClick: () => alert('Home clicked!') },
];

function About() {
  const navigate = useNavigate();
  const handle_start = () =>{
    navigate(`/sign-in`);
    // navigate("/sign-in");
  }

  return (
    
      <div className='container-page'>
        <Stars>
        <div className='container-main-landing'>
          <header>
            <NavBar2 logoSrc="/img/logo2.webp"
            logoAlt="My Logo"
            buttons={buttons}
            className={"logo-size-2"}
            />
          </header>
          <div className='slides slides1 main-grid' >
            <img src='/img/astronaut2.webp' className='img-landing'/>
            <img className='title-landing' src="img/logo2.webp"/>
            <h3 className='subtext-landing'>Dale un boost a tus estudios con Mindboost 
              <span className='texto-desc-landing'> Maximiza tu potencial con estrategias que se adaptan a ti</span></h3>
            <Button className='start-landing' onClick={handle_start}>Comenzar</Button>
          </div>
        </div>
        </Stars>
        <div className='slides slides2 panel-content'>
          <section className='cont-1 container-tile'> Flashcards 
              <img src="img/Flash_landing.webp" alt='flash cards' className='img-tile-grid'/>
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-2 container-tile'> Rubber Duck
              <img src="img/duck.webp" alt='Pato de goma hablando' className='img-tile-grid' />
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-3 container-tile'> Analogia
            <img src="img/comic.webp" alt='comic' className='img-tile-grid' />
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-4 container-tile'> Mapa Conceptual 
              <img src="img/concept.webp" alt='Mapa conceptual' className='img-tile-grid' />
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-main container-tile'> Repetición Espaciada 
              <img src="img/repeticion.webp" alt='astronauta mapa mental' className='img-tile-grid-main' />
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-f container-tile'> Mapa Mental
              <img src="img/mindmap.webp" alt='astronauta mapa mental' className='img-tile-grid-2' />
              <div className="tooltip">Para saber más</div>
              
            </section>

        </div>
        <div className='slides slides3 '>
          <div className='panel-information1'>
            <h3 className='info-1'>Apuntes</h3>
            <h3 className='info-2'>Tiempo</h3>
            <h3 className='info-3'>Metodo</h3>
            <p className='info-g'>Img</p>
          </div>
        </div>
        <div className='slides slides4'>
          <div className='panel-detail-information'>
            <h3 className='info-detail-1'>Apuntes</h3>
            <h3 className='info-detail-2'>Tiempo</h3>
            <h3 className='info-detail-3'>Metodo</h3>
            <p className='info-img'>Img</p>
          </div>
        </div>
        <div className='slides slides5'>
            <img alt='IA'/>
            <h2>Intelegencia artificial</h2>
        </div>
        <div className='slides slides6'>
            <h2>Repeticion Espaciada</h2>
            <img alt='IA'/>
        </div>
        <div className='slides slides7'>
            <img alt='Progress'/>
            <h2>Progreso</h2>
        </div>
      </div>
  )
}
export default About