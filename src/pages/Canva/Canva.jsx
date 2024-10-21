import React, { useState } from 'react';
import Excalidraw from 'excalidraw';

function Canva() {
    const [elements, setElements] = useState([]);
  return (
    <Excalidraw
      initialData={{ elements }}
      onChange={(newElements) => setElements(newElements)}
    />
  )
}
export default Canva