import {Card, Button} from '../../components/ui/index'
import NavBar2 from '../../components/NavBar2/NavBar2'
import './About.css'
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/StarBackGround/Stars';
import ModesGrid from './ModesGrid';
import MainCover from './MainCover';
import InfoGrid from './InfoGrid';
import GeneralInfo from './GeneralInfo'

function About() {
  const navigate = useNavigate();
  const buttons = [
    { label: 'Sign in', onClick: () => navigate(`/sign-in`) },
    { label: 'Sign up', onClick: () => navigate(`/sign-up`) },
  ];
  const handle_start = () =>{
    navigate(`/sign-in`);
    // navigate("/sign-in");
  }

  return (
      <div className='container-landing-page'>
        <Stars>
          <header>
            <NavBar2 logoSrc="/img/logo2.webp"
            logoAlt="My Logo"
            buttons={buttons}
            className={"logo-size-2"}
            />
          </header>
          <MainCover/>
        </Stars>
        <div className='slides slides2'>
         <ModesGrid/>
        </div>
        <div className='slides slides3 '>
          
          <InfoGrid/>
        </div>
        {/* <div className='slides slides4'>
          <GeneralInfo/>
        </div> */}
        <div className='slides slides5'>
          <div className='progres-text'>
            <h2 className='title-section-about'>Intelegencia artificial</h2>
            <p className='text-description-content'>Nuestra inteligencia artificial utiliza un árbol de decisiones para adaptar el contenido a tus necesidades. Personaliza tu estudio según tus respuestas y mejora tu rendimiento de manera eficiente.</p>
          </div>
          <img src="/gif/treefinal1.gif" alt='arbol de desiciones'/>
        </div>
        <div className='slides slides6'>
            <img src="/img/icon/olvido.webp" alt='IA'/>
            <div className='progres-text'>
              <h2 className='title-section-about'>Repeticion Espaciada</h2>
              <p className='text-description-content'>Aumenta la retención a largo plazo mediante la revisión de conceptos en intervalos estratégicos. Esta técnica optimiza el aprendizaje, ayudándote a recordar más con menos esfuerzo.</p>
            </div>
        </div>
        <div className='slides slides7'>
            <div className='progress-card'>
              <img src='/img/icon/progress2.webp'/>
              <div>
                <h3>Tema 1</h3>
                <p>Completado</p>
              </div>
            </div>
            <div className='progres-text'>

            <h2 className='title-section-about'>Progreso</h2>
            <p className='text-description-content'>Monitorea tu avance y visualiza cómo mejoras día a día. Mantente motivado al ver el impacto de tu esfuerzo</p>
            </div>
                <div className='fog-back'></div>
        </div>
        </div>

  )
}
export default About