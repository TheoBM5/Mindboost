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
    const deckId = params.hasOwnProperty('deckid');
    const onSubmit = handleSubmit(async(data)=>{
        let deck;
        if(!hasIdCard){
            deck = await createCard(params.deckid, data, 1);
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
            <form className="size-form2" onSubmit={onSubmit}>
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
                    <Button className="add-button">
                        +
                    </Button>
                    <Button>
                        {params.id ? "Edit Card" : "Create Card"}
                    </Button>
                </footer>
            </form>
        </Card>

    </div>
    )
}
export default CardFormPage