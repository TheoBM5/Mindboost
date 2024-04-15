import {Card, Input, TextArea, Button, Label} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDecks } from "../../context/DeckContext"
import {useEffect} from 'react'
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
                setValue('title', deck.title);
                setValue('description', deck.description);
            });
        }
    }, []);

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
                        <span>Title is required</span>
                    )
                    
                }
                <Label htmlFor="description">Description</Label>
                <TextArea 
                    placeholder="Description"
                    rows={3}
                    {...register("description")}
                 ></TextArea>
                 <Button>
                    {params.id ? "Edit Deck" : "Create Deck"}
                 </Button>
            </form>
        </Card>
    </div>
  );
}
export default CardFormPage