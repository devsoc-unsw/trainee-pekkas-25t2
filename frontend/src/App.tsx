import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/friends-page" element={<FriendsPage />}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App
