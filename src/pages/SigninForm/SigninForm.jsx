import {Input, Card, Button} from "../../components/ui/index.js"
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import './SigninForm.css'

function SigninForm() {
  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {signin, errors:loginErrors} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);

    if(user){
      navigate('/')
    }

  })
  
  return (
      <div className="sizeInForm">
          <Card>
          {
            loginErrors &&(
              loginErrors.map(err => (
                <p>
                  {err}
                </p>
              ))
            )
          }
          <h3>Iniciar Sesion</h3>
            <form onSubmit={onSubmit}>
            <Input type="email" placeholder = "Enter your email" 
                {...register('email',{
                  required: true,
                })}
              />
               {errors.email && <p>email is required</p>}
               <Input type="password" placeholder = "Enter your password" 
                  {...register('password',{
                    required: true,
                  })}
                />
                {errors.password && (<p>password is required</p>)}
              <Button type="submit">
                Register
              </Button>
              <div>
                <p >Dont't have an account?</p>
                <Link to="/sign-up">
                  Login
                </Link>
              </div>
            </form>
          </Card>
      </div>
    )
  }

export default SigninForm