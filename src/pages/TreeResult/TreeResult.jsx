import React, { useState } from 'react';
import NavBar2 from "../../components/NavBar2/NavBar2"
import Buton from "../../components/ui/Boton/Buton";
import './TreeResult.css'
import CardR from "../../components/CardResult/CardR";
import {answersTree} from "../../constants/treeAns.js";
import { useNavigate } from 'react-router-dom';
const buttons = [
  // { label: 'Home', onClick: () => alert('Home clicked!') },
];
function TreeResult({type1, type2, type3, type4}) {
  const navigate = useNavigate();
  const cards = [ answersTree[type3], answersTree[type1], answersTree[type2], answersTree[type4]];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCardActive, setCurrentCardActive] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setCurrentCardIndex(index); // Update the extra card to match the selected card
    if(currentCardActive!=null){
      setCurrentCardActive(null);
    }
    else{
      setCurrentCardActive(true);
    }
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % cards.length;
      setSelectedIndex(nextIndex); // Update the selected card border
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => {
      const prevIndexAdjusted = (prevIndex - 1 + cards.length) % cards.length;
      setSelectedIndex(prevIndexAdjusted); // Update the selected card border
      return prevIndexAdjusted;
    });
  };


  const handleRestart = () => {
    navigate("/test");
  }

  const handleHome = () => {
    navigate("/");
  }

  return (
    <>
      <header>
        <NavBar2 logoSrc="/img/logo2.webp"
        logoAlt="My Logo"
        buttons={buttons}
        className={"logo-size-2"}
        />
      </header>
      <main className="container-r">
        <div className={`grid-result ${currentCardActive !== null ? 'grid-small' : ''}`}>
        {Object.keys(cards).map((key) => {
            const answer = cards[key];
            return (
              <CardR
                key={answer.id}
                onClick={() => handleSelect(answer.id)}
                imageSrc={answer.img}
                imageAlt={`Image of ${answer.name}`}
                title={answer.name}
                subtitle={answer.type}
                classNameSub = {"subtitle-result"}
                className={`card-style-select-tree ${selectedIndex === answer.id ? 'selected' : ''}`}
              />
            );
          })}
        </div>
        {currentCardActive !== null && (
            <>
            <div className="extra-card">
              <CardR
                imageSrc="/img/duck.webp"
                imageAlt={`Example Image ${currentCardIndex + 1}`}
                title={`This is ${cards[currentCardIndex]}`}
                
                className="card-r-uniq"
              />
             <div className="navigation-buttons">
              <button onClick={handlePrevious} disabled={currentCardIndex === 0}>Previous</button>
              <button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}>Next</button>
            </div>
            </div>
            <div className="circles-content-mode"></div>
          </>
        )}
      </main>
      <footer className='footer-result'>
        <Buton
        // key={index}
        label={"Reintentar"}
        className={"button-tree-respond"}
        onClick={handleRestart}
        />
        <Buton
        // key={index}
        label={"Inicio"}
        onClick={handleHome}
        className={"button-tree-respond"}/>
      </footer>
    </>
  )
}
export default TreeResult