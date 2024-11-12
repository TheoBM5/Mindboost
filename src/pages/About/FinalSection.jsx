import "./Section.css"
function FinalSection() {
  return (
    <>

    <section className='slides slides5'>
        <div className='progres-grid-cont'>
            <h2 className='title-section-about ia-title'>Inteligencia  Artificial</h2>
            <p className=' ia-subtitle' >Nuestra inteligencia artificial utiliza un árbol de decisiones para adaptar el contenido a tus necesidades. Personaliza tu estudio según tus respuestas y mejora tu rendimiento de manera eficiente.</p>
            <img src="/gif/treefinal1.gif" alt='arbol de desiciones' className="img-ia"/>
        </div>
    </section>
    <section className='slides slides6'>
        <div className='progres-grid-cont'>
            <img className="img-repeticion" src="/img/icon/olvido.webp" alt='IA'/>
            <h2 className='title-section-about repeticion-title'>Repeticion Espaciada</h2>
            <p className='repeticion-subtitle'>Aumenta la retención a largo plazo mediante la revisión de conceptos en intervalos estratégicos. Esta técnica optimiza el aprendizaje, ayudándote a recordar más con menos esfuerzo.</p>
        </div>
    </section>

    <section className='slides slides7'>
        <div className='progres-grid-cont'>

            <div className='progress-card'>
                <img src='/img/icon/progress2.webp'/>
                <div>
                <h3>Tema 1</h3>
                <p>Completado</p>
                </div>
            </div>
            <h2 className='title-section-about progreso-title'>Progreso</h2>
            <p className='description-progres'>Monitorea tu avance y visualiza cómo mejoras día a día. Mantente motivado al ver el impacto de tu esfuerzo</p>

        </div>
            <div className='fog-back'></div>
    </section>
  </>
  )
}
export default FinalSection