import {Card, Button} from '../../components/ui/index'
import './FlashCard.css'

function FlashCard() {
  return (
    <div className='card-size'>
      <div className='content'>
        <Card className="estiloCard">
            <p>Hola como estas</p>
        </Card>
        <div className='line-buttons'>
            <Button type={"button-red"}>Muy mal</Button>
            <Button type={"button-orange"}>Mal</Button>
            <Button type={"button-yellow"}>Bien</Button>
            <Button type={"button-green"}>Muy Bien</Button>
        </div>
      </div>
    </div>
  )
}
export default FlashCard