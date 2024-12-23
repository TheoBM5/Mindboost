import {Routes, Route, Outlet} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import { DeckProvider } from './context/DeckContext';
import { CardProvider } from './context/CardContext';
import NavBar from './components/NavBar/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/HomeCard/Home';
import About from './pages/About/About';
import SigninForm from './pages/Forms/SigninForm';
import SignupForm from './pages/Forms/SignupForm';
import NotFound from './pages/NotFound/NotFound';
import DeckFormPage from './pages/Forms/DeckFormPage';
import Profile from './pages/Profile/Profile';
import FlashCard from './pages/FlashCard/FlashCard';
import CardFormPage from './pages/Forms/CardFormPage';
import EditCard from './pages/EditCard/EditCard';
import Stars from './components/StarBackGround/Stars';
import CardMode from './pages/CardMode/CardMode';
import Survey from './pages/Survey/Survey';
import Contrarreloj from './pages/Contrarreloj/Contrarreloj';
import Logro from './pages/Logro/Logro';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import RubberDuck from './pages/RubberDuck/RubberDuck';
import Productivity from './pages/Productivity/Productivity';
import Progreso from './pages/Progreso/Progreso';
import RubberDuckChat from './pages/RubberDuck2/RubberDuckChat';
import DuckOption from './components/Duck/DuckOption';
import ExcalidrawComp from "./pages/Excalidraw/Excalidraw";
import Analogia from './pages/Analogia/Analogia';
function App() {
  const {isAuth, loading} = useAuth();

  if (loading) return <h1>
    Cargando...
  </h1>
  return (
    <>
    
          <Routes>
            <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}>
              <Route path="/sign-up" element={<><Stars><NavBar/><SignupForm/></Stars></>} />
              <Route path="/sign-in" element={<><Stars><NavBar/><SigninForm/></Stars></>} />
              <Route path="/about" element={<About/>} />
            </Route>
            
            <Route element = {<ProtectedRoute isAllowed={isAuth} redirectTo="/sign-in" />}>
              <Route element={
                <DeckProvider>
                  <Outlet/> 
                </DeckProvider>
              }>
                <Route path='/' element={<><Home/></>} />
                <Route path="/deck/new" element={<DeckFormPage/>}/>
                <Route path="/deck/:id/:deckid/clock" element={<CardProvider><Contrarreloj/></CardProvider>}/>
                <Route path="/deck/:id/:deckid/achievement" element={<CardProvider><Logro/></CardProvider>}/>
                <Route path="/pomodoro" element={<CardProvider><Pomodoro/></CardProvider>}/>
                <Route path="/deck/:id/:deckid/duck" element={<CardProvider><DuckOption/></CardProvider>}/>
                <Route path="/deck/:id/:deckid/duckchat" element={<CardProvider><RubberDuckChat/></CardProvider>} />
                <Route path="/deck/:id/:deckid/duck1" element={<CardProvider><RubberDuck/></CardProvider>} />
                <Route path="/survey/:opc" element={<Survey/>}/>
                <Route path="/deck/:id/:deckid/new/modes" element={<CardMode/>}/>
                <Route path="/deck/new/modes" element={<CardMode/>}/>
                <Route path="/deck/:id/:deckid/new/card/:mode" element={<CardProvider><CardFormPage/></CardProvider>} />
                <Route path="/test" element={<CardProvider><Productivity/></CardProvider>} />
                <Route path="/progreso" element={<CardProvider><Progreso/></CardProvider>} />
                <Route path="/deck/:id/:deckid/analogia" element={<CardProvider><Analogia/></CardProvider>} />
                <Route path="/deck/:id/:deckid/canva" element={<CardProvider><ExcalidrawComp/></CardProvider>} />

                <Route path="/decks/:id/edit" element={<DeckFormPage/>}/>
                <Route path='/decks/:deckid/card/:idcard/edit' element={<CardFormPage/>} />
                <Route path='/decks/:deckid/card/edit' element={<CardProvider><EditCard/></CardProvider>} />
                
                <Route path="/study/:id/:deckid" element={<CardProvider><FlashCard/></CardProvider>}/>
              </Route>

              <Route path="/profile" element={<><Stars><Profile/></Stars></>}/>
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>

    </>
  );
}

export default App
