import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Photographer/Login';
import Book from './pages/User/Book';
import Profile from './pages/Photographer/Profile';
import SignUp from './pages/Photographer/SignUp';
import PgProfile from './pages/User/PgProfile';
import UserLogin from './pages/User/Login';
import PgBooking from './pages/Photographer/MyBookings';
import UserBookings from './pages/User/MyBooking';
import PgReview from './pages/User/PgReview';
import About from './pages/About';
import Services from './pages/Services';
import ServicePage from './pages/Service';
import ProfileBook from './pages/User/ProfileBook';
import Gallery from './pages/Gallery';
import PgList from './pages/PgList';
import PgEditProfile from './pages/Photographer/EditProfile';
import CommonSignIn from './pages/SignIn';
import UserProfile from './pages/User/Profile';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/details/:id" element={<ServicePage />} />
        <Route path="/service/details/gallery/:id" element={<Gallery />} />
        <Route path="/service/details/pglist/:id" element={<PgList />} />
        <Route path="/signin" element={<CommonSignIn/>} />


        <Route path="/photographer/login" element={<Login />} />
        <Route path="/photographer/profile" element={<Profile />} />
        <Route path="/photographer/signup" element={<SignUp />} />
        <Route path="/pg/mybooking" element={<PgBooking />} />
        <Route path="/photographer/profile/edit/:id" element={<PgEditProfile />} />



        <Route path="/user/book" element={<Book />} />
        <Route path="/user/pgprofile/:id" element={<PgProfile />} />
        <Route path="/user/login/" element={<UserLogin />} />
        <Route path="/user/mybooking/" element={<UserBookings />} />
        <Route path="/user/pg-review/:id" element={<PgReview />} />
        <Route path="/user/pgprofile/book/:id" element={<ProfileBook />} />
        <Route path="/user/profile/" element={<UserProfile/>} />

      </Routes>
    </div>
  );
};

export default App;
