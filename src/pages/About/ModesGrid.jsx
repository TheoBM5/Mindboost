import './About.css'

function ModesGrid() {
  return (
    <div className='panel-content'>
          <section className='cont-1 container-tile'> 
              <p className="title-grid-modes">Flashcards</p> 
              <img src="img/icon/tarjetaz.webp" alt='flash cards' className='img-tile-grid'/>
              <div className="tooltip">
                <div className='text-tooltip-description'>Revisa conceptos clave con tarjetas que te ayudarán a retener la información rápidamente. </div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>
          <section className='cont-2 container-tile'> 
              <p className="title-grid-modes">Rubber Duck</p>
              <img src="img/icon/duckblue.webp" alt='Pato de goma hablando' className='img-tile-grid' />
              <div className="tooltip">
                <div className='text-tooltip-description'>Explica tus ideas a un "pato de goma" para identificar y resolver problemas de forma más eficiente. </div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>
          <section className='cont-3 container-tile'> 
            <p className="title-grid-modes">Analogia</p>
            <img src="img/icon/comic2.webp" alt='comic' className='img-tile-grid' />
              <div className="tooltip">
                <div className='text-tooltip-description'>Simplifica temas complicados creando historias o analogías visuales que los hagan más comprensibles.</div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>
          <section className='cont-4 container-tile'> 
            <p className="title-grid-modes">Mapa Conceptual</p>
              <img src="img/icon/conceptmap.webp" alt='Mapa conceptual' className='img-tile-grid' />
              <div className="tooltip">
                <div className='text-tooltip-description'> Estructura conceptos complejos en un esquema claro y fácil de seguir. </div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>
          <section className='cont-main container-tile'> 
            <p className="title-grid-modes">Repetición Espaciada</p>
              <img src="img/tiempo.webp" alt='astronauta mapa mental' className='img-tile-grid-main' />
              <div className="tooltip">
                <div className='text-tooltip-description'>Refuerza tu memoria a largo plazo repasando contenido en intervalos estratégicos.</div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>
          <section className='cont-f container-tile'> 
            <p className="title-grid-modes">Mapa Mental</p>
              <img src="img/icon/panel.webp" alt='astronauta mapa mental' className='img-tile-grid-2' />
              <div className="tooltip">
                <div className='text-tooltip-description'> Organiza ideas de manera visual para entender conexiones y desbloquear tu creatividad.</div>
                <div className='sub-mainfo'>Para saber más</div>
              </div>
            </section>

        </div>
  )
}
export default ModesGrid