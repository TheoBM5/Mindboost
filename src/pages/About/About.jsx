import {Card, Button} from '../../components/ui/index'
import NavBar2 from '../../components/NavBar2/NavBar2'
import './About.css'
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/StarBackGround/Stars';
import ModesGrid from './ModesGrid';
import MainCover from './MainCover';
import InfoGrid from './InfoGrid';
import GeneralInfo from './GeneralInfo'
import FinalSection from './FinalSection';
function About() {
  const navigate = useNavigate();
  const buttons = [
    { label: 'Blog', onClick: () => navigate(`/`) },
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
          <FinalSection/>
      </div>

  )
}
export default About