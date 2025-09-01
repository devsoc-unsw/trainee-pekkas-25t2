import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TodoPage from './pages/TodoPage/TodoPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import PackPage from './pages/PackPage/PackPage';
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/pack" element={<PackPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
