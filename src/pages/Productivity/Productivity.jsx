import './Productivity.css'
import { options } from '../../constants/productivitym';
import React, { useState } from 'react';
import {Card, Button} from "../../components/ui/index.js"
import { useNavigate } from 'react-router-dom';
function Productivity() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedOptions = formData.getAll('opcProd');

    const selected = options.filter(opt => selectedOptions.includes(opt.id));
    if (selected.length === 0) return null;
  
    // Ordenar por impacto (de mayor a menor)
    selected.sort((a, b) => b.impact - a.impact);
    console.log("op", selected[0])
    navigate(`/survey/${selected[0].id}`)

  };

  const opciones = [
    { id: "0", label: "Dejar todo al ultimo"},
    { id: "1", label: "Uso un calendario o agenda para planificar mis actividades con anticipación"},
    { id: "2", label: "Prioritizo mis tareas diarias según su importancia y urgencia."},
    { id: "3", label: "Evito distracciones mientras trabajo o estudio, como el uso de redes sociales."},
    { id: "4", label: "Paso demasiado tiempo revisando mi teléfono en lugar de concentrarme en mi trabajo"},
    { id: "5", label: "Frecuentemente comienzo nuevas tareas sin terminar las que ya había iniciado."},
    { id: "6", label: "Olvido planificar y termino improvisando mi día, lo que reduce mi eficiencia."},
    { id: "7", label: "Me aseguro de tomar pequeños descansos para mantener mi productividad."},
    { id: "8", label: "Delego tareas cuando es posible para centrarme en lo que es más importante."},
  ];


  return (
    <form onSubmit={handleSubmit}>
    <div className='cont-productivity'>
        <h1>Selecciona alguno de tus habitos de <span className='tiempo-ad'>Gestion de Tiempo</span></h1>
        <div className="panel-select-pro">
  
            <li><input type="checkbox" name='opcProd' id='opcProd1' value="option1"/><label htmlFor="opcProd1">{opciones[0].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd2' value="option2"/><label htmlFor="opcProd2">{opciones[1].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd3' value="option3"/><label htmlFor="opcProd3">{opciones[2].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd4' value="option4"/><label htmlFor="opcProd4">{opciones[3].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd5' value="option5"/><label htmlFor="opcProd5">{opciones[4].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd6' value="option6"/><label htmlFor="opcProd6">{opciones[5].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd7' value="option7"/><label htmlFor="opcProd7">{opciones[6].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd8' value="option8"/><label htmlFor="opcProd8">{opciones[7].label}</label></li>
            <li><input type="checkbox" name='opcProd' id='opcProd9' value="option9"/><label htmlFor="opcProd9">{opciones[8].label}</label></li>

        </div>
        <Button type="submit" className='button-send-pro'>Enviar</Button>
    </div>
    </form>
  )
}
export default Productivity