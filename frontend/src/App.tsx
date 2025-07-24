import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
