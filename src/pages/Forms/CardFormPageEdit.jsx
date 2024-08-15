import {Card, TextArea, Button, Label, Input} from "../../components/ui/index"
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import { useEffect } from "react";
import { ICON_NAMES } from "../../constants/icon"; 

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
            // console.log(JSON.stringify(CardObject, null, 2));
            console.log("carddddddddd",CardObject.content)
            const card_object = {front: CardObject.front, reverse: CardObject.reverse};
            setValue('front', CardObject.content.front);
            setValue('reverse', CardObject.content.reverse);
            if(CardObject.typecard === "3"){
                if(CardObject.content.imageUrl){
                    setValue('imgurl', CardObject.content.imageUrl);
                    console.log("cccccc",CardObject.content.imageUrl)
                }
                else{
                    setValue("icon", CardObject.content.icon)
                }
            }
            //updateCard(params.deckid, CardObject.id, card_object)
        }
    }, [CardObject]);

  return (
    <>
        <Card className="card-style-edit">
        {CardObject.typecard !== '3'?(
            <>
            <header className="button-header-edit">
                <button className="close-button-style" onClick={onClose}>
                    X
                </button>
            </header>
            <form className="size-form-edit" onSubmit={onSubmit}>
                {CardObject.typecard === '1' || CardObject.typecard === '2'   ?(
                    <>
                    <Label htmlFor="front">Front</Label>
                    <TextArea 
                    {...register("front",{
                        required: true,
                    })}
                    placeholder="Front"
                    rows={3}
                    />
                {
                    errors.front && (
                        <p className="error-message">front text is required</p>
                    )
                    
                }
                </>
                ):(
                    <>
                    <Label htmlFor="front">Titulo</Label>
                    <Input 
                    {...register("front",{
                        required: true,
                    })}
                    placeholder="Front"
                    rows={3}
                    />
                {
                    errors.front && (
                        <p className="error-message">front text is required</p>
                    )
                    
                }
                    </>
                    
                )}
                
                {CardObject.typecard === '1' || CardObject.typecard === '2'   ?(
                    <Label htmlFor="reverse">Reverse</Label>
                ):(
                    <Label htmlFor="reverse">Descripcion</Label>
                )}
                <TextArea 
                    {...register("reverse",{
                        required: true,
                    })}
                    placeholder="Reverse"
                    rows={3}
                />
                {
                    errors.reverse && (
                        <p className="error-message">reverse text is required</p>
                    )
                    
                }
                <footer className="buttons-card">
                    <Button onClick={handleDelete}>
                        Delete Card
                    </Button>
                    <Button onClick={onSubmit}>
                        Edit Card
                    </Button>
                </footer>
            </form>
            </>
        ):(
            <>
            <header className="button-header-edit">
                <button className="close-button-style" onClick={onClose}>
                    X
                </button>
            </header>
             <form className="size-form-edit" onSubmit={onSubmit}>
                {CardObject.content.imageUrl ? (
                    <>
                    <img className="img-edit-logro" src={CardObject.content.imageUrl}/>
                    <input type="image"
                       {...register("imageUrl",{
                           required: true,
                        })}
                        />
                    </>
                       
                ):(
                    <>
                    <img className="img-edit-logro" src={ICON_NAMES[CardObject.content.icon]}/>
                    <input type="image" src={ICON_NAMES[CardObject.content.icon]} 
                       {...register("icon",{
                           required: true,
                        })}
                        />
                        </>
                )}
                 <Label htmlFor="front">Front</Label>
                 <Input 
                 {...register("front",{
                     required: true,
                 })}
                 placeholder="Front"
                 rows={3}
                 />
             {
                 errors.front && (
                     <p className="error-message">front text is required</p>
                 )
             }
             <TextArea 
                    {...register("reverse",{
                        required: true,
                    })}
                    placeholder="Reverse"
                    rows={3}
                />
                {
                    errors.reverse && (
                        <p className="error-message">reverse text is required</p>
                    )
                    
                }
                <footer className="buttons-card">
                    <Button onClick={handleDelete}>
                        Delete Card
                    </Button>
                    <Button onClick={onSubmit}>
                        Edit Card
                    </Button>
                </footer>
            </form>
            </>
        )}
        </Card>
        </>
    )

}
export default CardFormPageEdit