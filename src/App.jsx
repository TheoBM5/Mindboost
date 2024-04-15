import {Routes, Route, Outlet} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import { DeckProvider } from './context/DeckContext';
import { CardProvider } from './context/CardContext';
import NavBar from './components/NavBar/NavBar';
import {Container} from './components/ui/index';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/HomeCard/Home';
import About from './pages/About/About';
import SigninForm from './pages/Forms/SigninForm';
import SignupForm from './pages/Forms/SignupForm';
import Navbarleft from './components/Navbarleft/NavbarLeft';
import NotFound from './pages/NotFound';
import DeckFormPage from './pages/Forms/DeckFormPage';
import Profile from './pages/Profile/Profile';
import FlashCard from './pages/FlashCard/FlashCard';
import CardFormPage from './pages/Forms/CardFormPage';
import EditCard from './pages/EditCard/EditCard';

function App() {
  const {isAuth, loading} = useAuth();

  if (loading) return <h1>
    Cargando...
  </h1>
  return (
    <>
          <Routes>
            <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}>
              <Route path="/sign-up" element={<><NavBar/><SignupForm/></>} />
              <Route path="/sign-in" element={<><NavBar/><SigninForm/></>} />
              <Route path="/about" element={<About/>} />
            </Route>
            
            <Route element = {<ProtectedRoute isAllowed={isAuth} redirectTo="/sign-in" />}>
              <Route element={
                <DeckProvider>
                  <Outlet/> 
                </DeckProvider>
              }>
                <Route path='/' element={<><Container><Navbarleft/><Home/></Container></>} />
                <Route path="/deck/new" element={<DeckFormPage/>}/>
                <Route path="/decks/:id/edit" element={<DeckFormPage/>}/>
                <Route path='decks/:deckid/card/:idcard/edit' element={<CardFormPage/>} />
                <Route path='decks/:deckid/card/edit' element={<CardProvider><EditCard/></CardProvider>} />
                <Route path="/deck/:deckid/new/card" element={<CardProvider><CardFormPage/></CardProvider>} />
                <Route path="/study" element={<FlashCard/>}/>
              </Route>

              <Route path="/profile" element={<Profile/>}/>
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>

    </>
  );
}

export default App
