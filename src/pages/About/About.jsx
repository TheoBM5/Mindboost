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
          <section className='cont-1'> Flashcards </section>
          <section className='cont-2'> Mapa Mental </section>
          <section className='cont-3'> Estudio intercalado </section>
          <section className='cont-4'> Mapa Conceptual </section>
          <section className='cont-main'> Repetición Espaciada </section>
          <section className='cont-f'> Vista Nodo </section>

        </div>
        <div className='slides slides3 '>
          <div>

          </div>
        </div>
      </div>
  )
}
export default About