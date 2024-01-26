import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignupForm from './pages/SignupForm/SignupForm';
import SigninForm from './pages/SigninForm/SigninForm';

import './index.css'
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/sign-up" element={<SignupForm/>} />
        <Route path="/sign-in" element={<SigninForm/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </>
  );
}

export default App
