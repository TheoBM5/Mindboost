import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Duck.css';


function DuckOption() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };

    const handleCancelar = () =>{
        navigate(`/deck/${params.id}/${params.deckid}/new/modes`)
      }
    
    const handleSelectMode = () => {
        if(selectedOption === "rubberDuck"){
            navigate(`/deck/${params.id}/${params.deckid}/duck1`, { state: isTutorialActive } );
        }
        else{
            navigate(`/deck/${params.id}/${params.deckid}/duckchat`, { state:  isTutorialActive } );
        }
    }

  return (
    <main className="main-grid-option-duck">
      <h3 className='select-title-duck'>Selecciona un Modo:</h3>
         <section 
        className={`card-duck-opt ${selectedOption === 'rubberDuck' ? 'selected' : ''}`}
        onClick={() => handleOptionSelect('rubberDuck')}
      >
        <img className="img-duck-option" src="/img/icon/duckchat.webp" alt="Pato de Goma" />    
        <h3 className='title-pato-opt'>Pato de Goma</h3>
      </section>

      <section 
        className={`card-duck-opt ${selectedOption === 'chatDuck' ? 'selected' : ''}`}
        onClick={() => handleOptionSelect('chatDuck')}
      >
        <img className="img-duck-option"  src="/img/duck.webp" alt="Chat con Pato de Goma" />    
        <h3 className='title-pato-opt'>Chat con Pato de Goma</h3>
      </section>

        <footer className='button-duck-option'>
            <button onClick={handleCancelar}>Cancel</button>
            <button onClick={handleSelectMode}>Seleccionar</button>
        </footer>
    </main>
  )
}
export default DuckOption