import {Input, Card, Button, Label} from "../../components/ui/index"
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'
import './FormsStyle.css'

function SignupForm() {
  const {
    register, 
    handleSubmit, 
    formState:{errors},
  } = useForm();

  const {signup, errors: signupErrors} = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async(data) => {
    const user = await signup(data)
    if(user){
      navigate('/')
    }
  })


  return (
      <div className="size-form">
          <Card>
          {
              signupErrors &&(
                signupErrors.map((err) => (
                  <p className="error-message">
                    {err}
                  </p>
                )))
            }
          <h3 className="title-style">Registro</h3>
            <form onSubmit={onSubmit}>
                <Label htmlFor="name">Nombre</Label>
                <Input placeholder = "Ingresa tu nombre completo" 
                  {...register('name',{
                    required: true,
                  })}  
                />
                {
                  errors.name && <p className="error-message">name is required</p>
                }

                <Label htmlFor="username">Usuario</Label>
                <Input placeholder = "Ingresa un usuario" 
                  {...register('username',{
                    required: true,
                  })}  
                />
                {
                  errors.username && <p className="error-message">user is required</p>
                }

                <Label htmlFor="email">Correo Electronico</Label>
                <Input type="email" placeholder = "Ingresa un correo electronico" 
                  {...register('email',{
                    required: true,
                  })}
                />
                {
                  errors.email && <p className="error-message">email is required</p>
                }
                <Label htmlFor="password">Contraseña</Label>
                <Input type="password" placeholder = "Ingresa una contraseña" 
                  {...register('password',{
                    required: true,
                  })}
                />
                {errors.password && (
              <p className="error-message">password is required</p>
            )}

              <Button type="submit">
                Registrarse
              </Button>
              <div className="sub-form">
                <p className="sub-text">¿Ya tienes una cuenta?</p>
                <Link className="link-to" to="/sign-in">
                  Iniciar sesion
                </Link>
              </div>
            </form>
          </Card>
      </div>
  )
}
export default SignupForm