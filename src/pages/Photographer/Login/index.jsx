import './style.css';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../utils/axios';
const Login = () => {
  const [pg, setPg] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e, key) => {
    setPg({ ...pg, [key]: e.target.value });
  };

  const onClick = async () => {
    const response = await axios.post(
      '/photographer/signin',
      pg
    );
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      navigate('/photographer/profile');
    } else {
      alert(response.data.message);
    }
  };
  console.log(pg);
  return (
    <div className="pg-login">
      <div className="login-form">
        <Input
          placeholder="email"
          className="login-inp"
          onChange={e => {
            onChange(e, 'email');
          }}
        />
        <Input
          placeholder="password"
          className="login-inp"
          onChange={e => {
            onChange(e, 'password');
          }}
        />
        <div className="login-btn-div">
          <Link to="/photographer/signup"><p style={{fontSize:'12px'}}>dont have an account?sign up</p></Link>
          <Button onClick={onClick}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
