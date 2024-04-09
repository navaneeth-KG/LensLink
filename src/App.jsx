import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Photographer/Login'
import Book from './pages/User/Book'
import Profile from './pages/Photographer/Profile';
import SignUp from './pages/Photographer/SignUp'
import PgProfile from './pages/User/PgProfile'
import UserLogin from './pages/User/Login'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/photographer/login' element={<Login/>}/>
        <Route path='/user/book' element={<Book/>}/>
        <Route path='/photographer/profile' element={<Profile/>}/>
        <Route path='/photographer/signup' element={<SignUp/>}/>
        <Route path='/user/pgprofile/:id' element={<PgProfile/>}/>
        <Route path='/user/login/' element={<UserLogin/>}/>
      </Routes>

      
    </div>
  )
}

export default App

