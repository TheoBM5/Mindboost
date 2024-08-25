import {Card, Input, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext"
import './FormsStyle.css'

function CardFormPage() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm ();
    const navigate = useNavigate();
    const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
    const params = useParams();
    const hasIdCard = params.hasOwnProperty('idcard');

    const onSubmit = handleSubmit(async(data)=>{
        let deck;
        if(!hasIdCard){
            deck = await createCard(params.deckid, data, params.id, 1);
        } else{
            deck = await updateCard(params.id, data)
        }
        if(deck)
        {
            navigate("/");
        }

    });

  return (
    <div className="size-form-card">
        <Card className="card-style">
            <form className="size-form-card-2" onSubmit={onSubmit}>
                <Label htmlFor="front">Front</Label>
                <button>hola</button>
                <TextArea 
                    {...register("front",{
                        required: true,
                    })}
                    placeholder="Front"
                    rows={3}
                    
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
                />
                {
                    errors.reverse && (
                        <p className="error-message">Reverse text is required</p>
                    )
                    
                }
                <footer className="buttons-card-new">
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