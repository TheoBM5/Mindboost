import {Card, Input, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDecks } from "../../context/DeckContext"
import {useEffect} from 'react'
import { ICON_NAMES } from "../../constants/icon"; 
import React, { useState } from 'react';
import './FormsStyle.css'

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
                navigate(`/deck/${deck.id}/new/card`);
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


  return (
    <div className="size-form">
        <Card>
            {
                deckErrors.map((error, i)=> (
                    <p key={i}>{error}</p>
                ))
            }
            <h2 className="title-style">
                {params.id ? "Edit Deck" : "Create Deck"}
            </h2>
            <form onSubmit={onSubmit}>
                <Label htmlFor="title">Title</Label>
                <Input type="text" placeholder="Title"
                    {
                        ...register('title',{
                            required:true, 
                    })}
                />
                {
                    errors.title && (
                        <p className="error-message">title is required</p>
                    )
                    
                }
                <Label htmlFor="description">Description</Label>
                <TextArea 
                    placeholder="Description"
                    rows={3}
                    {...register("description",{
                        required: true,
                    })}
                />
                {
                    errors.description && (
                        <p className="error-message">description text is required</p>
                    )
                }
                <Label htmlFor="icon">Icono</Label>
                <div className="preview-icon" >
                    {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "selected-icon"})}
                    <input type="hidden" {...register('img')} value={selectedIcon || ''} />
                    
                </div>
                    <Label htmlFor="icon">Select:</Label>
                <div className="icon-box">
                    {Object.entries(ICON_NAMES).map(([name, Icon]) => (
                    <Icon
                        key={name}
                        className={`menu-iconos ${selectedIcon === name ? 'active' : ''}`}
                        onClick={() => handleIconClick(name)}
                        
                    />
                    ))}
                </div>
                
                <div className="buton-button">
                    <Button>
                        {params.id ? "Edit Deck" : "Create Deck"}
                    </Button>
                </div>
            </form>
        </Card>
    </div>
  );
}
export default CardFormPage