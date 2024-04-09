import './style.css';
import { getId } from '../../utils';
import { useNavigate ,Link} from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const onClick = () => {
    if (getId()) {
      localStorage.removeItem('token');
      window.location.reload()
      getId()
    } else {
      navigate('/user/login');
    }
  };
  return (
    <div className="navbar">
      <p>Lens Link</p>

      <ul>
      <Link to='/'><li>Home</li></Link>  
        <li>About</li>
        <li>Services</li>
        <li onClick={onClick} style={{ cursor: 'pointer' }}>
          {getId() ? 'logout' : 'sign up'}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
