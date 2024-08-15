import {Card, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import Reloj from "../../components/Reloj/Reloj";
import React, { useState, useEffect,useRef  } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext"
import './Contrarreloj.css'

function Contrarreloj() {
    const [timeClock, setTimeClock] = useState(0);
    const [timeSelected, setTimeSelected] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [editedIndex, setEditedIndex] = useState(null);
    const [timeEnded, setTimeEnded] = useState(false);
    const [isBlocked, setIsBlocked] = useState(true);
    const {register, handleSubmit, formState: {errors}, setValue, reset, clearErrors, getValues } = useForm ();
    const navigate = useNavigate();
    const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
    const params = useParams();
    const hasIdCard = params.hasOwnProperty('idcard');

    const onSubmit = handleSubmit ((data) => {
        const updatedResponses = [...responses];
        updatedResponses[currentQuestionIndex] = data;
        setResponses(updatedResponses);
        // Agregar una nueva tarjeta vacía y navegar a ella
        if(currentQuestionIndex>=responses.length-1){
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            clearErrors();
            reset()
        }
        else{
            setEditedIndex(currentQuestionIndex);
        }
      });

    const handlePrevious = (event) => {
        event.preventDefault()
        if (currentQuestionIndex > 0) {
            const previousIndex = currentQuestionIndex - 1;
            const previousResponse = responses[previousIndex] || { front: '', reverse: '' };
            setCurrentQuestionIndex(previousIndex);
            clearErrors(); // Limpiar errores antes de actualizar los campos
            setValue('front', previousResponse.front);
            setValue('reverse', previousResponse.reverse);
            setEditedIndex(null);
        }
    };

    const handleNext = (event) => {
        event.preventDefault()
        if (currentQuestionIndex < responses.length) {
            const posIndex = currentQuestionIndex + 1;
            const posResponse = responses[posIndex] || { front: '', reverse: '' };
            setCurrentQuestionIndex(posIndex);
            clearErrors(); // Limpiar errores antes de actualizar los campos
            setValue('front', posResponse.front);
            setValue('reverse', posResponse.reverse);
        } else {
            reset();
        }
        setEditedIndex(null);
    };

    const handleSelectQuestion = (index) => {
        
        setCurrentQuestionIndex(index);
        const indResponse = responses[index] 
        clearErrors(); // Limpiar errores antes de actualizar los campos
        setValue('front', indResponse.front);
        setValue('reverse', indResponse.reverse);
    }

    const handleTimeSelection = (time) => {
        setTimeClock(time * 60 * 1000);
    }

    const handleTimeSelectionScreen = () => {
            setIsBlocked(true)
            if (timeClock > 0) {
                setTimeSelected(true);
            } else {
                alert("Please select a time first.");
            }

    };

    const handleTimeEnd = () => {
        setTimeEnded(true);
        setIsBlocked(true);
    };

    const handleTimeStart = () => {
        setIsBlocked(false);
    };

    const handleSend = async () => {
        try {
            let deck;
            for (const data of responses) {
                if (!hasIdCard) {
                    deck = await createCard(params.deckid, data, params.id, 2);
                } else {
                    deck = await updateCard(params.id, data);
                }
            }
            if (deck) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error while handling send:", error);
        }
    };

  return (
    <div className="menu-time">
            {!timeSelected ? (
                <div className="time-selection">
                    <Card className="card-time">
                        <div className="order-card-time">
                            <h2>Select Time</h2>
                            <div className="button-minutes">
                                <Button className="buttons-time" onClick={() => handleTimeSelection(1)}>1 Min</Button>
                                <Button className="buttons-time" onClick={() => handleTimeSelection(15)}>15 Min</Button>
                                <Button className="buttons-time" onClick={() => handleTimeSelection(20)}>20 Min</Button>
                            </div>
                            <Button onClick={handleTimeSelectionScreen}>Start</Button>
                        </div>
                    </Card>
                </div>

    ) : (
                
    <div className="clock-grid">
        <div className="area-card-cont">
            <Card className="cardStyle2 card-style-clock">
                <form className="form-clock" onSubmit={onSubmit}>
                    {editedIndex === currentQuestionIndex && <p className="edit-message">Editado</p>}
                    <Label htmlFor="front">Front</Label>
                    <TextArea 
                        {...register("front",{
                            required: true,
                        })}
                        placeholder="Front"  
                        rows={3}
                        className="text-area-2"
                        disabled={isBlocked}
                    />
                    {errors.front && (
                        <p className="error-message">front text is required</p>
                    )
                        
                    }
                    <Label htmlFor="reverse">Reverse</Label>
                    <TextArea 
                        {...register("reverse",{
                            required: true,
                        })}
                        placeholder="Reverse"
                        rows={3}
                        className="text-area-2"
                        disabled={isBlocked}
                    />
                    {
                        errors.reverse && (
                            <p className="error-message">Reverse text is required</p>
                        )
                        
                    }
<div className="buttons-card-clock">
    {!timeEnded && (
        <>
            {isBlocked ? (
                null // Botón "Agregar" bloqueado antes de iniciar el tiempo
            ) : (
                // Botones "Anterior" y "Siguiente" cuando no ha terminado el tiempo
                <>
                    {currentQuestionIndex === responses.length ? (
                        <Button type="submit" className="add-button-clock">
                            Agregar
                        </Button>
                    ) : (
                        <Button type="submit" className="add-button-clock">
                            Editar
                        </Button>
                    )}
                    {currentQuestionIndex !== 0 && (
                        // Solo el botón "Anterior" cuando no es la primera tarjeta
                        <Button type="button" className="back-button-clock" onClick={handlePrevious}>
                            Anterior
                        </Button>
                    )}
                    {currentQuestionIndex < responses.length && (
                        <Button type="button" className="next-button-clock" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )}
                </>
            )}
        </>
    )}        
        {timeEnded && (
            <>
                <Button type="button" className="back-button-clock" onClick={handlePrevious}>
                    Anterior
                </Button>
                {currentQuestionIndex < responses.length - 1 && (
                    <Button type="button" className="next-button-clock" onClick={handleNext}>
                        Siguiente
                    </Button>
                )}
                {!isBlocked && (
                    <Button type="submit" className="add-button-clock">
                        Editar
                    </Button>
                )}
                <Button type="button" className="finish-button-clock" onClick={handleSend}>
                    Terminar
                </Button>
            </>
        )}

    </div>      
        </form>
            </Card>
            </div>
                
                <div className="clock-cont">
                    <Card className={"card-clock"}>
                        <div className="card-cont-clock">
                            <Reloj tipo={1} initialTime={timeClock} onTimeEnd={handleTimeEnd} onTimeStart={handleTimeStart} size="100px"/>
                        </div>
                        <div className="times-box">
                        {responses.map((_, index) => (
                                            <Button className={`button-cards-box ${currentQuestionIndex===index?'selected':''} ${editedIndex === index ? 'edited' : ''}`} 
                                                key={index} 
                                                onClick={() => handleSelectQuestion(index)}
                                                >
                                                {index + 1}
                                            </Button>
                                        ))}
                        </div>
                        <div className="edit-button">
                            {timeEnded?(
                                <Button onClick={() => setIsBlocked(false)}>Editar</Button>
                            ):null}
                        </div>
                    </Card>
                </div>
            </div>
       
        )} 
    </div>
     
    )
}
export default Contrarreloj