import {Card, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import { useEffect } from "react";

function CardFormPageEdit({CardObject, onClose, handleUpdateRow }) {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm ();
    const navigate = useNavigate();
    const {updateCard, loadCard, deleteCard, errors: CardErrors} = useCards();
    const params = useParams();

    const onSubmit = handleSubmit(async(data)=>{
        const datainfo = {id: params.deckid, card:data, relation:"1"}
        updateCard(params.deckid, CardObject.id, datainfo)
        handleUpdateRow();
        onClose();
    });

    const handleDelete = () => {
        if (window.confirm("Do you really want to Delete the card?")){
            deleteCard(params.deckid, CardObject.id)
            onClose();
        }
    }

    useEffect(()=>{
        if(CardObject){
            //console.log(JSON.stringify(CardObject, null, 2));
            const card_object = {front: CardObject.front, reverse: CardObject.reverse};
            setValue('front', CardObject.front);
            setValue('reverse', CardObject.reverse);
            //updateCard(params.deckid, CardObject.id, card_object)
        }
    }, [CardObject]);

  return (
    <>
        <Card className="card-style-edit">
            <header className="button-header-edit">
                <button className="close-button-style" onClick={onClose}>
                    X
                </button>
            </header>
            <form className="size-form-edit" onSubmit={onSubmit}>
                <Label htmlFor="front">Front</Label>
                <TextArea 
                    {...register("front")}
                    placeholder="Front"
                    rows={3}
                ></TextArea>
                
                <Label htmlFor="reverse">Reverse</Label>
                <TextArea 
                    {...register("reverse")}
                    placeholder="Reverse"
                    rows={3}
                ></TextArea>
                <footer className="buttons-card">
                    <Button onClick={handleDelete}>
                        Delete Card
                    </Button>
                    <Button onClick={onSubmit}>
                        Edit Card
                    </Button>
                </footer>
            </form>
        </Card>
        </>
    )

}
export default CardFormPageEdit