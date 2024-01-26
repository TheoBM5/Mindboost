import {Input, Card, Button} from "../../components/ui/index"
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'
import './SignupForm.css'

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
    <div className="sizeForm">
        <Card>
        {
            signupErrors &&(
              signupErrors.map((err) => (
                <p>
                  {err}
                </p>
              )))
          }
        <h3>Register</h3>
          <form onSubmit={onSubmit}>
              <Input placeholder = "Enter your fullname" 
                {...register('name',{
                  required: true,
                })}  
              />
              {
                errors.name && <p>name is required</p>
              }
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
              {errors.password && (
            <p>password is required</p>
          )}

            <Button type="submit">
              Register
            </Button>
            <div>
              <p >Already have an account?</p>
              <Link to="/sign-in">
                Login
              </Link>
            </div>
          </form>
        </Card>
    </div>
  )
}
export default SignupForm