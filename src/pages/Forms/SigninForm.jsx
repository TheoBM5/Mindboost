import {Input, Card, Button, Label} from "../../components/ui/index.js"
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ButtonSign from "../../components/ButtonSign/ButtonSign.jsx";
import './FormsStyle.css'

function SigninForm() {
  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {signin, errors:loginErrors} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const user = await signin(data);

    if(user){
      navigate('/')
    }

  })
  
  return (
      <div className="size-form">
          <Card className={"card-form-sign"}>
          {
            loginErrors &&
              loginErrors.map((err) => (
                <p className="error-message">
                  {err}
                </p>
              ))
          }
          <h3 className="title-style">Iniciar Sesion</h3>
            <form onSubmit={onSubmit} className="form-sign">
            <Label htmlFor="name">Email</Label>
            <Input type="email" placeholder = "Ingresa tu email" required
            title="Por favor introduzca una direccion de email valida"
                {...register('email',{
                  required: true,
                })}
                
              />
              {errors.email && <p className="error-message">Email is Required</p>}
              <Label htmlFor="name">Contraseña</Label>
              <Input type="password" placeholder = "Ingresa tu contraseña" 
                {...register('password',{
                  required: true,
                })}
                
              />
              {/* <ButtonSign/> */}
              {errors.password && (<p className="error-message"> Password is Required</p>)}
              <Button type="submit">
                Iniciar Sesion
              </Button>
              <div className="sub-form">
                <p className="sub-text">¿No tienes una cuenta?</p>
                <Link className="link-to" to="/sign-up">
                  Registrate
                </Link>
              </div>
            </form>
          </Card>
      </div>
    )
  }

export default SigninForm