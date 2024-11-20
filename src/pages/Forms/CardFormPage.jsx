import React, { useState, useRef } from 'react';
import { Card, Input, TextArea, Button, Label } from "../../components/ui/index"
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCards } from "../../context/CardContext"
import './FormsStyle.css'
import Tutorial from "../../components/Tutorial/Tutorial";
import MarkdownEdit from "../../components/Markdown-edit/MarkdownEdit";

const tutorialSteps = [
    { 
        selector: '.card-style', 
        title: 'Frente', 
        message: 'Escribe aquí la pregunta o concepto que deseas estudiar.' 
    },
    { 
        selector: '.text-area-card-form', 
        title: 'Reverso', 
        message: 'Añade la respuesta o una descripción que explique el concepto del frente de la tarjeta.' 
    },
    { 
        selector: '.buttons-card-new', 
        title: 'Agregar', 
        message: 'Utiliza estos botones para agregar nuevas tarjetas a tu colección.' 
    },
];

function CardFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { createCard, updateCard, loadCard, errors: CardErrors } = useCards();
    const params = useParams();
    const hasIdCard = params.hasOwnProperty('idcard');
    const location = useLocation();
    const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
    console.log("tutorial", isTutorialActive)

    const startTutorial = () => setIsTutorialActive(true);
    const endTutorial = () => setIsTutorialActive(false);

    const onSubmit = handleSubmit(async (data) => {
        let deck;
        if (!hasIdCard) {
            deck = await createCard(params.deckid, data, params.id, 1);
        } else {
            deck = await updateCard(params.id, data)
        }
        if (deck) {
            navigate("/");
        }

    });

    const handleback = () => {
        navigate("/");
    }

    const maxLengthCharacter = params.mode == 10 ? 140 : params.mode == 11 ? 160 : params.mode == 12 ? 40 : undefined
    console.log("max", maxLengthCharacter)
    return (
        <div className="size-form-card">
            {isTutorialActive && (
                <Tutorial steps={tutorialSteps} onClose={endTutorial} />
            )}
            <Card className="card-style">
                <form className="size-form-card-2" onSubmit={onSubmit}>
                    <Label id="label-front-card" htmlFor="front">Front</Label>

                    <TextArea id="text-area-1-card" maxLength={maxLengthCharacter} className="text-area-card-form"
                        {...register("front", {
                            required: true,
                        })}
                        placeholder="Front"
                        rows={3}

                    />
                    {errors.front && (
                        <p className="error-message">front text is required</p>
                    )

                    }
                    <Label id="label-reverse-card" htmlFor="reverse">Reverse</Label>
                    <TextArea id="text-area-2-card" maxLength={maxLengthCharacter} className="text-area-card-form"
                        {...register("reverse", {
                            required: true,
                        })}
                        placeholder="Reverse"
                        rows={3}
                    />
                    {
                        errors.reverse && (
                            <p className="error-message">Reverse text is required</p>
                        )

                    }
                    <footer className="buttons-card-new">
                        <Button type="button" className="add-button" onClick={handleback}>
                            Regresar
                        </Button>
                        <Button type="submit" className="add-button">
                            +
                        </Button>
                        <Button type="submit">
                            {!params.id ? "Edit Card" : "Create Card"}
                        </Button>
                    </footer>
                </form>
            </Card>

        </div>
    )
}
export default CardFormPage