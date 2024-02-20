import {useAuth} from '../../context/AuthContext';
import {Card, Input, Button, Label} from '../../components/ui/index';
import "./Profile.css";
function Profile() {
    const {user} = useAuth()
    
    const onSubmit = console.log(user);



    return (
    <div className='back'>
        <div className='shadow'>
                <main className='prueba2'>
                    <Card>
                        <div className='blo'>
                            <div className='dis'>
                                <img src={user.gravatar}/>
                                <div className='date-text'>
                                    <Label htmlFor="creation">Fecha de creacion</Label>
                                    <p>{user.created_at}</p>
                                </div>
                            </div>
                            <div>
                                <form onSubmit={onSubmit}>
                                    <Label className="label-style" htmlFor="name">Name</Label>
                                    <Input type="name" value={user.name} readOnly/>
                                    <Label className="label-style"  htmlFor="email">Email</Label>
                                    <Input type="email" value={user.email} readOnly/>
                                    <Label className="label-style"  htmlFor="text">Pais</Label>
                                    <Input type="text" value={""} readOnly/>
                                    <Button>Editar</Button>
                                </form>
                            </div>
                        </div>
                    </Card>
                </main>

        </div>

    </div>
    )
}
export default Profile