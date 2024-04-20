import './style.css';
import { getId } from '../../utils';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getRole } from '../../utils';
import { useState } from 'react';
const Navbar = () => {
  // const fetchUser=async()=>{
  //   if(getRole()=='user'){

  //   }else if(getRole()=='photographer')

  // }
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const onClick = () => {
    setState(!state);
  };
  const onClick2 = () => {
    navigate('/user/login');
  };

  return (
    <div className="navbar">
      <p>Lens Link</p>

      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>

        <Link to="/services">
          <li>Services</li>
        </Link>
        <li style={{ cursor: 'pointer' }}>
          {getId() ? (
            <img
              src="/video.jpg"
              alt="profile pic"
              style={{ borderRadius: '50%', height: '30px', width: '30px' }}
              onClick={onClick}
            />
          ) : (
            <p onClick={onClick2}>Sign Up</p>
          )}
        </li>
      </ul>
      {state ? <DropDown setState={setState} /> : ''}
    </div>
  );
};

export default Navbar;

const DropDown = ({ setState }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (getRole() == 'user') {
      navigate('/user/mybooking');
    } else if (getRole() == 'photographer') {
      navigate('/pg/mybooking');
    }
    setState(false);
  };
  const onClick2 = () => {
    if (
      (getId() && getRole() == 'photographer') ||
      (getId() && getRole() == 'user')
    ) {
      localStorage.removeItem('token');

      // window.location.reload();
      navigate('/');
      setState(false);
    }
  };
  const onClick3 = () => {
    if (getRole() == 'user') {
      navigate('/user/mybooking');
    } else if (getRole() == 'photographer') {
      navigate('/photographer/profile');
    }
    setState(false);
  };
  return (
    <div className="drop-down-cont">
      <p onClick={onClick3}>profile</p>
      <p onClick={onClick}>my bookings</p>
      <p onClick={onClick2}>logout</p>
    </div>
  );
};
