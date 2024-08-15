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
          <div>
            <p>Realiza la encuesta que te permitira encontrar la mejor forma para estudiar</p> 
          </div>
        </div>
      </div>
  )
}
export default About