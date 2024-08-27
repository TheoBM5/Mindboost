import './Productivity.css'
import { options } from '../../constants/productivitym';
import React, { useState } from 'react';
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

    // Aquí puedes manejar lo que quieras hacer con los valores seleccionados
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='cont-productivity'>
        <h1>Selecciona alguno de tus habitos de gestion de tiempo</h1>
        <div className="panel-select-pro">
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option1"/> Dejar todo al ultimo</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option2"/> Uso un calendario o agenda para planificar mis actividades con anticipación</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option3"/> Prioritizo mis tareas diarias según su importancia y urgencia.</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option4"/> Evito distracciones mientras trabajo o estudio, como el uso de redes sociales.</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option5"/> Paso demasiado tiempo revisando mi teléfono en lugar de concentrarme en mi trabajo</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option6"/> Frecuentemente comienzo nuevas tareas sin terminar las que ya había iniciado.</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option7"/> Olvido planificar y termino improvisando mi día, lo que reduce mi eficiencia.</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option8"/> Me aseguro de tomar pequeños descansos para mantener mi productividad.</label>
            <label className="button-checkbox"><input name="opcProd" type="checkbox" value="option9"/> Delego tareas cuando es posible para centrarme en lo que es más importante.</label>
        </div>
        <button className='button-send-pro' type="submit">Enviar</button>
    </div>
    </form>
  )
}
export default Productivity