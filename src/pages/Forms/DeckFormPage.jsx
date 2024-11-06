import {Card, Input, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDecks } from "../../context/DeckContext"
import {useEffect} from 'react'
import { ICON_NAMES } from "../../constants/icon"; 
import React, { useState } from 'react';
import './FormsStyle.css'
import './FormStyleDeck.css'

function CardFormPage() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm ();
    const navigate = useNavigate();
    const {createDeck, updateDeck, loadDeck, errors: deckErrors} = useDecks();
    const params = useParams();

    const onSubmit = handleSubmit(async(data)=>{
        let deck;
        if(!params.id){

            deck = await createDeck(data);
            if(deck)
            {
                navigate(`/`);

            }
            
        } else{
            deck = await updateDeck(params.id, data)
        }
    });

    useEffect(()=>{
        if(params.id){
            loadDeck(params.id).then(deck=>{
                console.log(deck)
                setValue('title', deck.title);
                setValue('description', deck.description);
                setSelectedIcon(deck.icon_name); // Actualiza el estado de selectedIcon
                setValue('icon', deck.icon_name); 
            });
        }
    }, []);
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleIconClick = (name) => {
      setSelectedIcon(name);
      setValue('icon', name);
    };

    const handleback = () =>{
        navigate("/");
    }

  return (
    <div className="size-form-card">
        <Card className="card-style-deck">
            {
                deckErrors.map((error, i)=> (
                    <p key={i}>{error}</p>
                ))
            }
            <h2 className="title-style-deck">
                {params.id ? "Editar Deck" : "Crear Deck"}
            </h2>
            <form className="size-form-deck" onSubmit={onSubmit}>
                <Label className="label-style-deck" htmlFor="title">Title</Label>
                <Input className="input-form-deck" type="text" placeholder="Title"
                    {
                        ...register('title',{
                            required:true, 
                    })}
                />
                {
                    errors.title && (
                        <p className="error-message-deck">title is required</p>
                    )
                    
                }
                <Label className="label-style-deck" htmlFor="description">Descripcion</Label>
                <TextArea className="text-area-deck-form"
                    placeholder="Description"
                    rows={3}
                    {...register("description",{
                        required: true,
                    })}
                />
                {
                    errors.description && (
                        <p className="error-message-deck">description text is required</p>
                    )
                }
                <Label className="label-style-deck" htmlFor="icon">Icono</Label>
                <div className="preview-icon" >
                    {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "selected-icon"})}
                    <input type="hidden" {...register('img')} value={selectedIcon || ''} />
                    
                </div>
                    <Label className="label-style-deck" htmlFor="icon">Seleccionar:</Label>
                <div className="icon-box">
                    {Object.entries(ICON_NAMES).map(([name, Icon]) => (
                    <Icon
                        key={name}
                        className={`menu-iconos ${selectedIcon === name ? 'active' : ''}`}
                        onClick={() => handleIconClick(name)}
                        
                    />
                    ))}
                </div>
                
                <div className="buton-cont-deck">
                    <Button type="button" onClick={handleback}>
                        Cancelar
                    </Button>
                    <Button>
                        {params.id ? "Editar" : "Crear"}
                    </Button>
                    
                </div>
            </form>
        </Card>
    </div>
  );
}
export default CardFormPage