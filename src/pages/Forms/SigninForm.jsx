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
    console.log("Hola: ")
    const user = await signin(data);

    if(user){
      navigate('/')
    }

  })
  
  return (
      <div className="size-form">
          <Card>
          {
            loginErrors &&
              loginErrors.map((err) => (
                <p className="error-message">
                  {err}
                </p>
              ))
          }
          <h3 className="title-style">Sign-In</h3>
            <form onSubmit={onSubmit} className="form-sign">
            <Label htmlFor="name">Email</Label>
            <Input type="email" placeholder = "Enter your email" required
            title="Por favor introduzca una direccion de email valida"
                {...register('email',{
                  required: true,
                })}
                
              />
              {errors.email && <p className="error-message">Email is Required</p>}
              <Label htmlFor="name">Password</Label>
              <Input type="password" placeholder = "Enter your password" 
                {...register('password',{
                  required: true,
                })}
                
              />
              {/* <ButtonSign/> */}
              {errors.password && (<p className="error-message"> Password is Required</p>)}
              <Button type="submit">
                Sign-in
              </Button>
              <div className="sub-form">
                <p className="sub-text">Dont't have an account?</p>
                <Link className="link-to" to="/sign-up">
                  Register
                </Link>
              </div>
            </form>
          </Card>
      </div>
    )
  }

export default SigninForm