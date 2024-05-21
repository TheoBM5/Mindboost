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
          <h3 className="title-style">Register</h3>
            <form onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input placeholder = "Enter your fullname" 
                  {...register('name',{
                    required: true,
                  })}  
                />
                {
                  errors.name && <p className="error-message">name is required</p>
                }

                <Label htmlFor="username">User</Label>
                <Input placeholder = "Enter your username" 
                  {...register('username',{
                    required: true,
                  })}  
                />
                {
                  errors.username && <p className="error-message">user is required</p>
                }

                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder = "Enter your email" 
                  {...register('email',{
                    required: true,
                  })}
                />
                {
                  errors.email && <p className="error-message">email is required</p>
                }
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder = "Enter your password" 
                  {...register('password',{
                    required: true,
                  })}
                />
                {errors.password && (
              <p className="error-message">password is required</p>
            )}

              <Button type="submit">
                Register
              </Button>
              <div className="sub-form">
                <p className="sub-text">Already have an account?</p>
                <Link className="link-to" to="/sign-in">
                  Login
                </Link>
              </div>
            </form>
          </Card>
      </div>
  )
}
export default SignupForm