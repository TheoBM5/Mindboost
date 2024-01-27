import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import {useAuth} from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import {Container} from './components/ui/index'
import SignupForm from './pages/SignupForm/SignupForm';
import SigninForm from './pages/SigninForm/SigninForm';
import Navbarleft from './components/Navbarleft/NavbarLeft';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import './index.css'

function App() {
  const {isAuth} = useAuth()
  return (
    <>
      <Navbarleft/>
      <Container>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}>
            <Route path="/sign-up" element={<SignupForm/>} />
            <Route path="/sign-in" element={<SigninForm/>} />
          </Route>
          <Route element = {<ProtectedRoute isAllowed={isAuth} redirectTo="/sign-in" />}>
            <Route path='/' element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App
