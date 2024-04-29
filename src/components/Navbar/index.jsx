import './style.css';
import { getId } from '../../utils';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { getRole } from '../../utils';
import { useEffect, useState } from 'react';
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
    navigate('/signin');
  };
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    if (getRole() == 'user') {
      const response = await axios.get(`/user/${getId()}`);
      setUser(response.data);
    } else if (getRole() == 'photographer') {
      const response = await axios.get(
        `/photographer/${getId()}`
      );
      setUser(response.data);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [state]);
  return (
    <div className="navbar">
      <p className="logo">Lens Link</p>

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
              src={user.image ? user.image : '/user.jpg'}
              alt="profile pic"
              style={{ borderRadius: '50%', height: '30px', width: '30px' }}
              onClick={onClick}
            />
          ) : (
            <p onClick={onClick2}>Sign In</p>
          )}
        </li>
      </ul>
      {state ? (
        <DropDown setState={setState} user={user} fetchUser={fetchUser} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Navbar;

const DropDown = ({ setState, user, fetchUser }) => {
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

      
      navigate('/');
      setState(false);
      window.location.reload();
    }
  };
  const onClick3 = () => {
    if (getRole() == 'user') {
      navigate('/user/profile');
    } else if (getRole() == 'photographer') {
      navigate('/photographer/profile');
    }
    setState(false);
  };
  return (
    <div className="drop-down-cont">
      <p style={{ color: 'blue' }}>{user.name}</p>
      <p onClick={onClick3}>profile</p>
      <p onClick={onClick}>my bookings</p>
      <p onClick={onClick2}>logout</p>
    </div>
  );
};
