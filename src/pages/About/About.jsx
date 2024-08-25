import {Card, Button} from '../../components/ui/index'
import './About.css'
function About() {
  return (
    
      <div className='container-page'>
        <div className='slides slides1'>
          <h2>Mindboost</h2>
          <p>Es una pagina que busca acercar a los estudiantes con mejores técnicas de estudio para así potenciar su aprendizaje</p>
        </div>
        <div className='slides slides2 panel-content'>
          <section className='cont-1 container-tile'> Flashcards 
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-2 container-tile'> Mapa Mental 
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-3 container-tile'> Estudio intercalado 
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-4 container-tile'> Mapa Conceptual 
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-main container-tile'> Repetición Espaciada 
              <div className="tooltip">Para saber más</div>
            </section>
          <section className='cont-f container-tile'> Vista Nodo 
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