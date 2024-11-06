import {useAuth} from '../../context/AuthContext';
import {Card, Input, Button, Label} from '../../components/ui/index';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
function Profile() {
    const {user} = useAuth()
    const navigate = useNavigate()

    const onSubmit = () =>{
        console.log("envio")
      }

    const handleRegresar = () =>{
        navigate("/")
      }
    

    return (
        <div className='shadow'>
            <Card className={"card-profile"}>
                <div className='blo'>
                    <div className='dis'>
                        <img className="img-profile-edit" src={user.gravatar}/>
                        <div className='date-text'>
                            <Label htmlFor="creation">Fecha de creacion</Label>
                            <p>{new Date(user.created_at).toISOString().split('T')[0]}</p>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={onSubmit}>
                            <Label className="label-style" htmlFor="name">Name</Label>
                            <Input className="input-profile" type="name" value={user.name} readOnly/>
                            <Label className="label-style"  htmlFor="email">Email</Label>
                            <Input className="input-profile" type="email" value={user.email} readOnly/>
                            <Label className="label-style"  htmlFor="text">Pais</Label>
                            <Input className="input-profile" type="text" value={""} readOnly/>
                            <footer className='buttons-edit-profile'>
                                <Button>Editar</Button>
                                <Button type={"button"} onClick={handleRegresar}>Regresar</Button>
                            </footer>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default Profile